from fastapi import APIRouter, Request, Response, Depends, HTTPException, Form
from fastapi.templating import Jinja2Templates
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from sqlalchemy import select

from app.database import get_db
from app.models import Order, OrderStatus, Product, ProductVariant, AdminUser, StoreSettings, QuoteRequest
from app.schemas import QUOTE_CATEGORIES
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
    return RedirectResponse("/admin/settings", status_code=303)
