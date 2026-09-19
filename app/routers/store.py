from fastapi import APIRouter, Request, Response, Depends, HTTPException, Form
from fastapi.templating import Jinja2Templates
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from sqlalchemy import select

from app.config import get_settings
from app.database import get_db
from app.models import Product, ProductVariant
from app import cart as cart_module

router = APIRouter()
templates = Jinja2Templates(directory="app/templates")
settings = get_settings()

@router.get("/shop/cart")
def cart_view(request: Request, db: Session = Depends(get_db)):
    cart = cart_module.get_cart(request)
    rows, subtotal = cart_module.resolve_cart_rows(db, cart)
    return templates.TemplateResponse(
        "store/cart.html",
        {
            "request": request, "rows": rows, "subtotal_cents": subtotal,
            "crypto_enabled": settings.enable_crypto_checkout,
        },
    )


@router.get("/shop")
def shop_list(request: Request, db: Session = Depends(get_db)):
    products = db.scalars(
        select(Product).where(Product.active.is_(True)).order_by(Product.name)
    ).all()
    return templates.TemplateResponse(
        "store/product_list.html",
        {
            "request": request, "products": products,
            "crypto_enabled": settings.enable_crypto_checkout,
        },
    )


@router.get("/shop/{slug}")
def product_detail(request: Request, slug: str, db: Session = Depends(get_db)):
    product = db.scalar(select(Product).where(Product.slug == slug))
    if not product or not product.active:
        raise HTTPException(status_code=404, detail="Product not found")
    return templates.TemplateResponse(
        "store/product_detail.html",
        {
            "request": request, "product": product,
            "crypto_enabled": settings.enable_crypto_checkout,
        },
    )


@router.post("/shop/cart/add")
def cart_add(
    request: Request,
    response: Response,
    variant_id: int = Form(...),
    quantity: int = Form(1),
    db: Session = Depends(get_db),
):
    variant = db.get(ProductVariant, variant_id)
    if not variant or not variant.active:
        raise HTTPException(status_code=404, detail="Variant not found")
    if quantity < 1 or quantity > variant.stock_count:
        raise HTTPException(status_code=400, detail="Requested quantity not available")

    cart = cart_module.add_item(request, response, variant_id, quantity)
    rows, subtotal = cart_module.resolve_cart_rows(db, cart)
    # HTMX partial: re-render the mini cart badge/dropdown
    return templates.TemplateResponse(
        "store/_cart_summary.html",
        {"request": request, "rows": rows, "subtotal_cents": subtotal},
        headers=response.headers,
    )

@router.post("/shop/buy-now")
def buy_now(
    request: Request,
    response: Response,
    variant_id: int = Form(...),
    quantity: int = Form(1),
    db: Session = Depends(get_db),
):
    variant = db.get(ProductVariant, variant_id)
    if not variant or not variant.active:
        raise HTTPException(status_code=404, detail="Variant not found")
    if quantity < 1 or quantity > variant.stock_count:
        raise HTTPException(status_code=400, detail="Requested quantity not available")

    # Adds to whatever's already in the cart rather than replacing it —
    # "Buy Now" is a shortcut past the cart page, not a separate express
    # checkout that ignores it. Real (non-htmx) POST + redirect, since this
    # needs a full navigation to /checkout, not a partial swap.
    cart_module.add_item(request, response, variant_id, quantity)
    return RedirectResponse("/checkout", status_code=303, headers=response.headers)


@router.post("/shop/cart/update")
def cart_update(
    request: Request,
    response: Response,
    variant_id: int = Form(...),
    quantity: int = Form(...),
    db: Session = Depends(get_db),
):
    cart = cart_module.set_item(request, response, variant_id, quantity)
    rows, subtotal = cart_module.resolve_cart_rows(db, cart)
    return templates.TemplateResponse(
        "store/_cart_table.html",
        {
            "request": request, "rows": rows, "subtotal_cents": subtotal,
            "crypto_enabled": settings.enable_crypto_checkout,
        },
        headers=response.headers,
    )
