import httpx
import stripe
from fastapi import APIRouter, Request, Response, Depends, HTTPException, Form
from fastapi.templating import Jinja2Templates
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from sqlalchemy import select
from pydantic import ValidationError

from app.config import get_settings
from app.database import get_db
from app.models import ProductVariant, Order, OrderItem, StoreSettings, OrderStatus, PaymentMethod
from app.schemas import ShippingAddressIn
from app import cart as cart_module
from app import shipping as shipping_api

router = APIRouter()
templates = Jinja2Templates(directory="app/templates")
settings = get_settings()
stripe.api_key = settings.stripe_secret_key

# A store owner sets this once in the admin dashboard; used to decide
# domestic vs international flat rate (spec §4.3).
def _get_store_settings(db: Session) -> StoreSettings:
    row = db.get(StoreSettings, 1)
    if not row:
        row = StoreSettings(
            id=1,
            domestic_shipping_cents=settings.default_domestic_shipping_cents,
            intl_shipping_cents=settings.default_intl_shipping_cents,
            currency=settings.default_currency,
        )
        db.add(row)
        db.commit()
        db.refresh(row)
    return row


@router.get("/checkout")
def checkout_form(request: Request, db: Session = Depends(get_db)):
    cart = cart_module.get_cart(request)
    if not cart:
        return RedirectResponse("/shop/cart", status_code=303)
    rows, subtotal = cart_module.resolve_cart_rows(db, cart)
    return templates.TemplateResponse(
        "store/checkout.html",
        {
            "request": request,
            "crypto_enabled": settings.enable_crypto_checkout,
            "rows": rows,
            "subtotal_cents": subtotal,
        },
    )


@router.post("/checkout/rates")
def checkout_rates(
    request: Request,
    db: Session = Depends(get_db),
    name: str = Form(""),
    email: str = Form(""),
    address_line1: str = Form(...),
    address_line2: str = Form(""),
    city: str = Form(...),
    state: str = Form(""),
    postal_code: str = Form(...),
    country: str = Form(...),
):
    cart = cart_module.get_cart(request)
    if not cart:
        raise HTTPException(status_code=400, detail="Your cart is empty")
    rows, _ = cart_module.resolve_cart_rows(db, cart)

    country_code = country.strip().upper()

    rates = []
    error = None
    if not settings.shippo_api_key:
        error = "Shipping is not configured for this store yet — please contact us to place an order."
    else:
        try:
            address = {
                "name": name or "Customer",
                "address_line1": address_line1,
                "address_line2": address_line2,
                "city": city,
                "state": state,
                "postal_code": postal_code,
                "country": country_code,
                "email": email,
            }
            rates = [
                {
                    "id": rate.object_id,
                    "label": f"{rate.provider} {rate.servicelevel.name}",
                    "amount_cents": round(float(rate.amount) * 100),
                    "days": rate.estimated_days,
                }
                for rate in shipping_api.get_rates(address, rows)
            ]
            if not rates:
                error = "No shipping options were found for that address. Please double-check it and try again."
        except shipping_api.ShippoError:
            error = "Live shipping rates are temporarily unavailable. Please try again in a moment."

    return templates.TemplateResponse(
        "store/_shipping_rates.html",
        {"request": request, "rates": rates, "error": error},
    )


@router.post("/checkout")
def checkout_submit(
    request: Request,
    response: Response,
    db: Session = Depends(get_db),
    name: str = Form(...),
    email: str = Form(...),
    address_line1: str = Form(...),
    address_line2: str = Form(""),
    city: str = Form(...),
    state: str = Form(""),
    postal_code: str = Form(...),
    country: str = Form(...),
    payment_method: str = Form(...),  # "stripe" | "coinbase"
    shippo_rate_id: str = Form(""),
):
    cart = cart_module.get_cart(request)
    if not cart:
        raise HTTPException(status_code=400, detail="Your cart is empty")

    try:
        shipping = ShippingAddressIn(
            name=name, email=email, address_line1=address_line1,
            address_line2=address_line2, city=city, state=state,
            postal_code=postal_code, country=country,
        )
    except ValidationError as e:
        raise HTTPException(status_code=422, detail=str(e))

    if payment_method not in ("stripe", "coinbase"):
        raise HTTPException(status_code=400, detail="Invalid payment method")
    if payment_method == "coinbase" and not settings.enable_crypto_checkout:
        raise HTTPException(status_code=400, detail="Crypto checkout is not enabled")

    store_settings = _get_store_settings(db)
    is_domestic = shipping.country == store_settings.domestic_country_code

    # Live Shippo rates are required — there is no flat-rate fallback.
    # Never trust a client-submitted rate amount, so re-fetch it from Shippo.
    if not shippo_rate_id:
        raise HTTPException(
            status_code=400, detail="Please calculate and select a shipping option before paying."
        )
    try:
        verified_rate = shipping_api.get_verified_rate(shippo_rate_id)
    except shipping_api.ShippoError:
        raise HTTPException(
            status_code=409,
            detail="That shipping rate is no longer available — please reselect shipping.",
        )
    shipping_cents = round(float(verified_rate.amount) * 100)

    # Resolve cart -> order items, re-checking stock server-side (never trust
    # client-held cart contents for pricing or availability).
    variants = {
        v.id: v
        for v in db.scalars(select(ProductVariant).where(ProductVariant.id.in_(cart.keys()))).all()
    }
    order_items = []
    subtotal_cents = 0
    for variant_id, qty in cart.items():
        variant = variants.get(variant_id)
        if not variant or variant.stock_count < qty:
            raise HTTPException(
                status_code=409,
                detail=f"'{variant.label if variant else variant_id}' no longer has enough stock",
            )
        unit_price = variant.price_cents()
        subtotal_cents += unit_price * qty
        order_items.append((variant, qty, unit_price))

    total_cents = subtotal_cents + shipping_cents

    order = Order(
        customer_email=shipping.email,
        shipping_name=shipping.name,
        shipping_address_line1=shipping.address_line1,
        shipping_address_line2=shipping.address_line2,
        shipping_city=shipping.city,
        shipping_state=shipping.state,
        shipping_postal_code=shipping.postal_code,
        shipping_country=shipping.country,
        is_domestic=is_domestic,
        shipping_cents=shipping_cents,
        subtotal_cents=subtotal_cents,
        total_cents=total_cents,
        currency=store_settings.currency,
        status=OrderStatus.pending,
        shippo_rate_id=shippo_rate_id,
    )
    for variant, qty, unit_price in order_items:
        order.items.append(
            OrderItem(
                variant_id=variant.id,
                product_name=variant.product.name,
                variant_label=variant.label,
                unit_price_cents=unit_price,
                quantity=qty,
            )
        )
    db.add(order)
    db.commit()
    db.refresh(order)

    if payment_method == "stripe":
        redirect_url = _create_stripe_session(order, order_items, shipping_cents)
        order.payment_method = PaymentMethod.stripe
    else:
        redirect_url = _create_coinbase_charge(order)
        order.payment_method = PaymentMethod.coinbase
    db.commit()

    cart_module.clear_cart(response)
    resp = RedirectResponse(redirect_url, status_code=303)
    resp.delete_cookie(cart_module.CART_COOKIE_NAME)
    return resp


def _create_stripe_session(order: Order, order_items, shipping_cents: int) -> str:
    line_items = [
        {
            "price_data": {
                "currency": order.currency,
                "unit_amount": unit_price,
                "product_data": {"name": f"{variant.product.name} — {variant.label}"},
            },
            "quantity": qty,
        }
        for variant, qty, unit_price in order_items
    ]
    if shipping_cents:
        line_items.append(
            {
                "price_data": {
                    "currency": order.currency,
                    "unit_amount": shipping_cents,
                    "product_data": {"name": "Shipping"},
                },
                "quantity": 1,
            }
        )

    session = stripe.checkout.Session.create(
        mode="payment",
        line_items=line_items,
        customer_email=order.customer_email,
        success_url=f"{settings.base_url}/order/{order.public_id}?status=success",
        cancel_url=f"{settings.base_url}/checkout",
        client_reference_id=order.public_id,
        metadata={"order_public_id": order.public_id},
    )
    order.payment_reference = session.id
    return session.url


def _create_coinbase_charge(order: Order) -> str:
    resp = httpx.post(
        "https://api.commerce.coinbase.com/charges",
        headers={
            "X-CC-Api-Key": settings.coinbase_commerce_api_key,
            "X-CC-Version": "2018-03-22",
            "Content-Type": "application/json",
        },
        json={
            "name": f"Order {order.public_id[:8]}",
            "description": f"{len(order.items)} item(s)",
            "pricing_type": "fixed_price",
            "local_price": {
                "amount": f"{order.total_cents / 100:.2f}",
                "currency": order.currency.upper(),
            },
            "metadata": {"order_public_id": order.public_id},
            "redirect_url": f"{settings.base_url}/order/{order.public_id}?status=success",
            "cancel_url": f"{settings.base_url}/checkout",
        },
        timeout=15,
    )
    resp.raise_for_status()
    data = resp.json()["data"]
    order.payment_reference = data["id"]
    return data["hosted_url"]


@router.get("/order/{public_id}")
def order_status_page(request: Request, public_id: str, db: Session = Depends(get_db)):
    order = db.scalar(select(Order).where(Order.public_id == public_id))
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return templates.TemplateResponse(
        "store/order_status.html", {"request": request, "order": order}
    )
