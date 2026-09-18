from pathlib import Path

from fastapi import APIRouter, Request, Response, Depends, HTTPException, Form, UploadFile, File
from fastapi.templating import Jinja2Templates
from fastapi.responses import RedirectResponse
from pydantic import ValidationError
from sqlalchemy.orm import Session
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError

from app.database import get_db
from app.models import Order, OrderStatus, Product, ProductVariant, AdminUser, StoreSettings, QuoteRequest
from app.schemas import QUOTE_CATEGORIES, ProductIn, ProductVariantIn
from app.security import (
    verify_password, create_session_token, require_admin,
    SESSION_COOKIE_NAME, SESSION_MAX_AGE_SECONDS,
)
from app.email import send_email
from app.config import get_settings
from app import shipping as shipping_api

router = APIRouter(prefix="/admin")
templates = Jinja2Templates(directory="app/templates")
settings = get_settings()


@router.get("/login")
def login_form(request: Request):
    return templates.TemplateResponse("admin/login.html", {"request": request, "error": None})


@router.post("/login")
def login_submit(
    request: Request,
    response: Response,
    username: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db),
):
    user = db.scalar(select(AdminUser).where(AdminUser.username == username))
    if not user or not verify_password(password, user.password_hash):
        return templates.TemplateResponse(
            "admin/login.html",
            {"request": request, "error": "Invalid username or password"},
            status_code=401,
        )
    token = create_session_token(user.username)
    resp = RedirectResponse("/admin/orders", status_code=303)
    resp.set_cookie(
        SESSION_COOKIE_NAME, token, max_age=SESSION_MAX_AGE_SECONDS,
        httponly=True, samesite="strict", secure=settings.is_production,
    )
    return resp


@router.get("/logout")
def logout():
    resp = RedirectResponse("/admin/login", status_code=303)
    resp.delete_cookie(SESSION_COOKIE_NAME)
    return resp


@router.get("/orders")
def orders_list(request: Request, db: Session = Depends(get_db), admin: str = Depends(require_admin)):
    orders = db.scalars(select(Order).order_by(Order.created_at.desc())).all()
    return templates.TemplateResponse(
        "admin/orders.html", {"request": request, "orders": orders, "admin": admin}
    )


@router.get("/orders/{order_id}")
def order_detail(
    request: Request, order_id: int, db: Session = Depends(get_db), admin: str = Depends(require_admin)
):
    order = db.get(Order, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return templates.TemplateResponse(
        "admin/order_detail.html", {"request": request, "order": order}
    )


@router.post("/orders/{order_id}/status")
def order_update_status(
    request: Request,
    order_id: int,
    status: str = Form(...),
    tracking_number: str = Form(""),
    tracking_carrier: str = Form(""),
    db: Session = Depends(get_db),
    admin: str = Depends(require_admin),
):
    order = db.get(Order, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if status not in OrderStatus.__members__:
        raise HTTPException(status_code=400, detail="Invalid status")

    was_shipped_before = order.status == OrderStatus.shipped
    order.status = OrderStatus(status)
    if tracking_number:
        order.tracking_number = tracking_number
    if tracking_carrier:
        order.tracking_carrier = tracking_carrier
    db.commit()

    # Fire the shipping-update email only on the transition into "shipped",
    # not on every subsequent edit to the same order (spec §4.7).
    if order.status == OrderStatus.shipped and not was_shipped_before:
        send_email(
            to=order.customer_email,
            subject=f"Your order has shipped — #{order.public_id[:8]}",
            html_body=(
                f"<p>Your order is on its way!</p>"
                f"<p>Tracking: {order.tracking_carrier} {order.tracking_number}</p>"
                f"<p>{settings.base_url}/order/{order.public_id}</p>"
            ),
        )

    return templates.TemplateResponse(
        "admin/_order_status_badge.html", {"request": request, "order": order}
    )


@router.post("/orders/{order_id}/buy-label")
def buy_shipping_label(
    request: Request, order_id: int, db: Session = Depends(get_db), admin: str = Depends(require_admin)
):
    order = db.get(Order, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    if not order.shippo_rate_id:
        raise HTTPException(
            status_code=400, detail="This order was placed with flat-rate shipping — no live rate to buy a label for"
        )
    if not order.label_url:
        try:
            tracking_number, label_url = shipping_api.buy_label(order.shippo_rate_id)
        except (shipping_api.ShippoError, RuntimeError) as e:
            raise HTTPException(status_code=502, detail=str(e))
        order.tracking_number = tracking_number
        order.label_url = label_url
        db.commit()
    return templates.TemplateResponse(
        "admin/_label_section.html", {"request": request, "order": order}
    )


@router.get("/products")
def products_list(request: Request, db: Session = Depends(get_db), admin: str = Depends(require_admin)):
    products = db.scalars(select(Product).order_by(Product.name)).all()
    return templates.TemplateResponse(
        "admin/products.html", {"request": request, "products": products}
    )


@router.get("/products/new")
def product_new_form(request: Request, admin: str = Depends(require_admin)):
    return templates.TemplateResponse(
        "admin/product_new.html", {"request": request, "product": None, "error": None}
    )


# Only these are accepted for a product photo upload — mirrors the quote
# wizard's content-type check (content.py) but also fixes the on-disk
# extension from the content type rather than trusting the client's
# filename, and caps at 5MB (product photos are a single hero image, not a
# multi-attachment email, so no need for the wizard's tighter 6MB/photo cap
# reasoning — this is just a sane upper bound for a web image).
PRODUCT_IMAGE_EXTENSIONS = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
}
MAX_PRODUCT_IMAGE_BYTES = 5 * 1024 * 1024
PRODUCT_IMAGE_DIR = Path("app/static/img/products")


async def _save_product_image(slug: str, image: UploadFile | None, old_image_path: str) -> str | None:
    """Validates and writes an uploaded product photo to disk, named after
    the product's slug so re-uploading for the same product overwrites in
    place. Returns the new /static/... path, or None if no file was
    actually chosen (an empty file input still arrives as an UploadFile
    with no filename — same convention the quote wizard uses for its
    optional photos). Raises ValueError on an invalid file, which callers
    should treat as a form error, not a 500."""
    if not image or not image.filename:
        return None
    ext = PRODUCT_IMAGE_EXTENSIONS.get(image.content_type or "")
    if not ext:
        raise ValueError("Image must be a JPEG, PNG, or WebP file")
    raw = await image.read()
    if not raw:
        return None
    if len(raw) > MAX_PRODUCT_IMAGE_BYTES:
        raise ValueError("Image must be under 5MB")

    dest = PRODUCT_IMAGE_DIR / f"{slug}{ext}"
    # Clean up a stale file left over from a previous upload in a different
    # format (e.g. was .png, re-uploaded as .jpg) — same slug, different
    # extension, so the old one would otherwise never get removed.
    if old_image_path and old_image_path.startswith("/static/img/products/"):
        old_file = Path("app") / old_image_path.lstrip("/")
        if old_file.exists() and old_file != dest:
            old_file.unlink(missing_ok=True)

    PRODUCT_IMAGE_DIR.mkdir(parents=True, exist_ok=True)
    dest.write_bytes(raw)
    return f"/static/img/products/{slug}{ext}"


@router.post("/products")
async def product_create(
    request: Request,
    db: Session = Depends(get_db),
    admin: str = Depends(require_admin),
    name: str = Form(...),
    slug: str = Form(...),
    description: str = Form(""),
    base_price_cents: int = Form(...),
    active: bool = Form(False),
    image: UploadFile | None = File(None),
):
    # Stands in for `product` when re-rendering the form with what was just
    # typed — Jinja's attribute lookup (`product.name`) works on a dict just
    # as well as an ORM object, so _product_form.html doesn't need to care
    # which one it got.
    resubmitted = {
        "id": None, "name": name, "slug": slug, "description": description,
        "base_price_cents": base_price_cents, "active": active, "image_path": "",
    }

    try:
        data = ProductIn(
            name=name, slug=slug, description=description,
            base_price_cents=base_price_cents, active=active,
        )
    except ValidationError:
        return templates.TemplateResponse(
            "admin/product_new.html",
            {"request": request, "product": resubmitted, "error": "Please check the highlighted fields."},
            status_code=400,
        )

    if db.scalar(select(Product).where(Product.slug == data.slug)):
        return templates.TemplateResponse(
            "admin/product_new.html",
            {"request": request, "product": resubmitted, "error": f'Slug "{data.slug}" is already in use.'},
            status_code=400,
        )

    product = Product(
        name=data.name, slug=data.slug, description=data.description,
        base_price_cents=data.base_price_cents, active=data.active,
    )
    db.add(product)
    db.flush()  # assigns product.id, needed to name the uploaded image file

    try:
        image_path = await _save_product_image(product.slug, image, "")
    except ValueError as e:
        db.rollback()
        return templates.TemplateResponse(
            "admin/product_new.html",
            {"request": request, "product": resubmitted, "error": str(e)},
            status_code=400,
        )
    if image_path:
        product.image_path = image_path

    db.commit()
    return RedirectResponse(f"/admin/products/{product.id}/edit", status_code=303)


@router.get("/products/{product_id}/edit")
def product_edit_form(
    request: Request, product_id: int, db: Session = Depends(get_db), admin: str = Depends(require_admin)
):
    product = db.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return templates.TemplateResponse(
        "admin/product_edit.html", {"request": request, "product": product, "error": None}
    )


@router.post("/products/{product_id}")
async def product_update(
    request: Request,
    product_id: int,
    db: Session = Depends(get_db),
    admin: str = Depends(require_admin),
    name: str = Form(...),
    slug: str = Form(...),
    description: str = Form(""),
    base_price_cents: int = Form(...),
    active: bool = Form(False),
    image: UploadFile | None = File(None),
):
    product = db.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    resubmitted = {
        "id": product.id, "name": name, "slug": slug, "description": description,
        "base_price_cents": base_price_cents, "active": active, "image_path": product.image_path,
    }

    try:
        data = ProductIn(
            name=name, slug=slug, description=description,
            base_price_cents=base_price_cents, active=active,
        )
    except ValidationError:
        # 200, not 400 — this form is htmx-driven (hx-target="#product-form"),
        # and htmx doesn't swap non-2xx responses by default (same gotcha
        # documented on the quote wizard in content.py/CLAUDE.md); a 4xx here
        # would silently freeze the form with no visible error.
        return templates.TemplateResponse(
            "admin/_product_form.html",
            {"request": request, "product": resubmitted, "error": "Please check the highlighted fields."},
        )

    existing = db.scalar(select(Product).where(Product.slug == data.slug, Product.id != product.id))
    if existing:
        return templates.TemplateResponse(
            "admin/_product_form.html",
            {"request": request, "product": resubmitted, "error": f'Slug "{data.slug}" is already in use.'},
        )

    try:
        image_path = await _save_product_image(data.slug, image, product.image_path)
    except ValueError as e:
        return templates.TemplateResponse(
            "admin/_product_form.html",
            {"request": request, "product": resubmitted, "error": str(e)},
        )

    product.name = data.name
    product.slug = data.slug
    product.description = data.description
    product.base_price_cents = data.base_price_cents
    product.active = data.active
    if image_path:
        product.image_path = image_path
    db.commit()

    return templates.TemplateResponse(
        "admin/_product_form.html", {"request": request, "product": product, "saved": True}
    )


@router.post("/products/{product_id}/delete")
def product_delete(
    product_id: int,
    db: Session = Depends(get_db),
    admin: str = Depends(require_admin),
):
    product = db.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    # A product (or any of its variants) that's ever been ordered can't be
    # hard-deleted — OrderItem's FK would reject the DELETE. Fall back to
    # deactivating it instead, which already hides it from the storefront
    # (see store.py) without touching past orders' own snapshot fields.
    try:
        db.delete(product)
        db.commit()
    except IntegrityError:
        db.rollback()
        product = db.get(Product, product_id)
        product.active = False
        db.commit()

    # This route is only ever called via htmx (hx-confirm on the delete
    # button in product_edit.html), so an HX-Redirect is what actually
    # navigates the browser back to the list — a plain 303 here would just
    # be swapped into the page as inert response body. Set on the Response
    # actually being returned, not the injected `response` dependency —
    # FastAPI only merges that dependency's headers in when the route
    # returns a non-Response value; returning our own Response bypasses it.
    return Response(status_code=200, headers={"HX-Redirect": "/admin/products"})


@router.post("/products/{product_id}/variants")
def variant_create(
    request: Request,
    product_id: int,
    sku: str = Form(...),
    label: str = Form(...),
    price_override_cents: str = Form(""),
    stock_count: int = Form(0),
    db: Session = Depends(get_db),
    admin: str = Depends(require_admin),
):
    product = db.get(Product, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    try:
        data = ProductVariantIn(
            sku=sku, label=label,
            price_override_cents=int(price_override_cents) if price_override_cents.strip() else None,
            stock_count=stock_count,
        )
    except (ValidationError, ValueError):
        # 200, not 400 — see the matching comment in product_update; this
        # form is htmx-driven and a non-2xx response wouldn't get swapped in.
        return templates.TemplateResponse(
            "admin/_variants_table.html",
            {"request": request, "product": product, "error": "Please check the highlighted fields."},
        )

    if db.scalar(select(ProductVariant).where(ProductVariant.sku == data.sku)):
        return templates.TemplateResponse(
            "admin/_variants_table.html",
            {"request": request, "product": product, "error": f'SKU "{data.sku}" is already in use.'},
        )

    variant = ProductVariant(
        sku=data.sku, label=data.label,
        price_override_cents=data.price_override_cents, stock_count=data.stock_count,
    )
    product.variants.append(variant)
    db.commit()

    return templates.TemplateResponse(
        "admin/_variants_table.html", {"request": request, "product": product}
    )


@router.post("/variants/{variant_id}/core")
def variant_update_core(
    request: Request,
    variant_id: int,
    sku: str = Form(...),
    label: str = Form(...),
    price_override_cents: str = Form(""),
    db: Session = Depends(get_db),
    admin: str = Depends(require_admin),
):
    variant = db.get(ProductVariant, variant_id)
    if not variant:
        raise HTTPException(status_code=404, detail="Variant not found")

    try:
        data = ProductVariantIn(
            sku=sku, label=label,
            price_override_cents=int(price_override_cents) if price_override_cents.strip() else None,
            stock_count=variant.stock_count,  # unchanged — stock has its own form
        )
    except (ValidationError, ValueError):
        # 200, not 400 — see the matching comment in product_update; this
        # form is htmx-driven and a non-2xx response wouldn't get swapped in.
        return templates.TemplateResponse(
            "admin/_variant_row.html",
            {"request": request, "variant": variant, "error": "Please check the highlighted fields."},
        )

    existing = db.scalar(
        select(ProductVariant).where(ProductVariant.sku == data.sku, ProductVariant.id != variant.id)
    )
    if existing:
        return templates.TemplateResponse(
            "admin/_variant_row.html",
            {"request": request, "variant": variant, "error": f'SKU "{data.sku}" is already in use.'},
        )

    variant.sku = data.sku
    variant.label = data.label
    variant.price_override_cents = data.price_override_cents
    db.commit()

    return templates.TemplateResponse(
        "admin/_variant_row.html", {"request": request, "variant": variant}
    )


@router.post("/variants/{variant_id}/delete")
def variant_delete(
    request: Request,
    variant_id: int,
    db: Session = Depends(get_db),
    admin: str = Depends(require_admin),
):
    variant = db.get(ProductVariant, variant_id)
    if not variant:
        raise HTTPException(status_code=404, detail="Variant not found")

    # Same hard-delete-if-safe, deactivate-if-ordered logic as product_delete.
    try:
        db.delete(variant)
        db.commit()
        return Response(status_code=200)  # row's outerHTML swaps to nothing — it vanishes
    except IntegrityError:
        db.rollback()
        variant = db.get(ProductVariant, variant_id)
        variant.active = False
        db.commit()
        return templates.TemplateResponse(
            "admin/_variant_row.html", {"request": request, "variant": variant}
        )


@router.post("/variants/{variant_id}/stock")
def update_stock(
    request: Request,
    variant_id: int,
    stock_count: int = Form(...),
    db: Session = Depends(get_db),
    admin: str = Depends(require_admin),
):
    variant = db.get(ProductVariant, variant_id)
    if not variant:
        raise HTTPException(status_code=404, detail="Variant not found")
    variant.stock_count = max(0, stock_count)
    db.commit()
    return templates.TemplateResponse(
        "admin/_stock_input.html", {"request": request, "variant": variant}
    )


@router.post("/variants/{variant_id}/dimensions")
def update_variant_dimensions(
    request: Request,
    variant_id: int,
    weight_oz: float = Form(...),
    length_in: float = Form(...),
    width_in: float = Form(...),
    height_in: float = Form(...),
    db: Session = Depends(get_db),
    admin: str = Depends(require_admin),
):
    variant = db.get(ProductVariant, variant_id)
    if not variant:
        raise HTTPException(status_code=404, detail="Variant not found")
    variant.weight_oz = max(0.1, weight_oz)
    variant.length_in = max(0.1, length_in)
    variant.width_in = max(0.1, width_in)
    variant.height_in = max(0.1, height_in)
    db.commit()
    return templates.TemplateResponse(
        "admin/_variant_dims_input.html", {"request": request, "variant": variant}
    )


@router.get("/quotes")
def quotes_list(request: Request, db: Session = Depends(get_db), admin: str = Depends(require_admin)):
    quotes = db.scalars(select(QuoteRequest).order_by(QuoteRequest.created_at.desc())).all()
    return templates.TemplateResponse(
        "admin/quotes.html",
        {"request": request, "quotes": quotes, "admin": admin, "category_labels": QUOTE_CATEGORIES},
    )


@router.get("/settings")
def settings_form(request: Request, db: Session = Depends(get_db), admin: str = Depends(require_admin)):
    store_settings = db.get(StoreSettings, 1)
    return templates.TemplateResponse(
        "admin/settings.html", {"request": request, "settings": store_settings}
    )


@router.post("/settings")
def settings_update(
    request: Request,
    db: Session = Depends(get_db),
    admin: str = Depends(require_admin),
    domestic_shipping_cents: int = Form(...),
    intl_shipping_cents: int = Form(...),
    domestic_country_code: str = Form(...),
):
    store_settings = db.get(StoreSettings, 1)
    store_settings.domestic_shipping_cents = domestic_shipping_cents
    store_settings.intl_shipping_cents = intl_shipping_cents
    store_settings.domestic_country_code = domestic_country_code.strip().upper()[:2]
    db.commit()
    return templates.TemplateResponse(
        "admin/_settings_form.html", {"request": request, "settings": store_settings, "saved": True}
    )
