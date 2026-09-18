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
from app import tax as tax_module

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
            "country_groups": shipping_api.country_choices(),
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
    state: str = Form(...),
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
    field_errors: dict[str, str] = {}
    # Only populated once a Shippo validation call actually completes — left
    # empty (no check/x shown) when Shippo is unconfigured or unreachable,
    # since we have no basis to claim a field is valid in that case.
    field_status: dict[str, str] = {}
    validated_fields = ["address_line1", "city", "state", "postal_code", "country"]
    # Every address field must be filled in before we even ask Shippo, let
    # alone quote a rate.
    required_fields = {
        "address_line1": address_line1,
        "city": city,
        "state": state,
        "postal_code": postal_code,
        "country": country_code,
    }
    missing_fields = [field for field, value in required_fields.items() if not value.strip()]
    if missing_fields:
        return templates.TemplateResponse(
            "store/_rates_response.html",
            {
                "request": request,
                "rates": [],
                "error": "Please fill in the highlighted fields before calculating shipping.",
                "field_errors": {field: "Required" for field in missing_fields},
                "field_status": {field: "invalid" for field in missing_fields},
            },
        )

    if not settings.shippo_api_key:
        error = "Shipping is not configured for this store yet — please contact us to place an order."
    else:
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

        # Cheap syntax checks (zip/postal format, 2-letter state, a street
        # with a number) run before spending a Shippo call — malformed input
        # never reaches Shippo, and the customer gets a specific message.
        format_errors = shipping_api.format_errors(address)
        if format_errors:
            return templates.TemplateResponse(
                "store/_rates_response.html",
                {
                    "request": request,
                    "rates": [],
                    "error": "Please fix the highlighted fields before calculating shipping.",
                    "field_errors": format_errors,
                    "field_status": {field: "invalid" for field in format_errors},
                },
            )

        # Validate before quoting — a bad address should be caught here,
        # not discovered when the rate call fails or a label can't print
        # later. A validation-call failure (Shippo down, etc.) is treated
        # as "unavailable", not "invalid" — fall through with raw input
        # rather than stranding the customer. Shippo can also return a
        # 200 with an *empty* validation_results (no is_valid at all) —
        # observed for Canadian addresses on this account — which is the
        # same "unavailable" case, not a silent pass; see
        # shipping.validation_state().
        try:
            validated = shipping_api.validate_address(address)
        except shipping_api.ShippoError:
            validated = None

        if validated is not None and shipping_api.validation_state(validated) != "unavailable":
            field_errors = shipping_api.field_errors_from_validation(validated)
            field_status = {
                field: "invalid" if field in field_errors else "valid"
                for field in validated_fields
            }
            if field_errors:
                return templates.TemplateResponse(
                    "store/_rates_response.html",
                    {
                        "request": request,
                        "rates": [],
                        "error": "We couldn't verify this address — check the highlighted fields.",
                        "field_errors": field_errors,
                        "field_status": field_status,
                    },
                )
            # Use Shippo's standardized address for the rate quote, not
            # the raw input — what gets quoted should match what's
            # actually deliverable.
            address["address_line1"] = validated.street1
            address["address_line2"] = validated.street2 or ""
            address["city"] = validated.city
            address["state"] = validated.state or ""
            address["postal_code"] = validated.zip
            address["country"] = validated.country

        try:
            fetched_rates = shipping_api.get_rates(address, rows)
            # get_rates() already trims each carrier to (at most) its own
            # cheapest + fastest. The badges here are a separate, global
            # judgment across every carrier shown — "Cheapest" and
            # "Fastest" each mark exactly one row (the same row, if a
            # single option happens to be both), not one pair per carrier.
            rates = [
                {
                    "id": rate.object_id,
                    "provider": rate.provider,
                    "logo": shipping_api.carrier_logo(rate.provider),
                    "service": rate.servicelevel.name,
                    "amount_cents": round(float(rate.amount) * 100),
                    "days": rate.estimated_days,
                }
                for rate in fetched_rates
            ]
            if rates:
                cheapest = min(rates, key=lambda r: r["amount_cents"])
                fastest = min(
                    rates,
                    key=lambda r: (r["days"] is None, r["days"] or 0, r["amount_cents"]),
                )
                for r in rates:
                    r["is_cheapest"] = r is cheapest
                    r["is_fastest"] = r is fastest
            if not rates:
                error = "No shipping options were found for that address. Please double-check it and try again."
        except shipping_api.ShippoError:
            error = "Live shipping rates are temporarily unavailable. Please try again in a moment."

    return templates.TemplateResponse(
        "store/_rates_response.html",
        {
            "request": request,
            "rates": rates,
            "error": error,
            "field_errors": field_errors,
            "field_status": field_status,
        },
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
    state: str = Form(...),
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

    # Tax is required, not best-effort — an undercharged order is a real
    # compliance problem, so a failed calculation blocks checkout rather
    # than silently charging $0 (same call as the shipping rate above).
    try:
        tax_calc = tax_module.calculate_tax(
            shipping_address={
                "address_line1": shipping.address_line1,
                "address_line2": shipping.address_line2,
                "city": shipping.city,
                "state": shipping.state,
                "postal_code": shipping.postal_code,
                "country": shipping.country,
            },
            subtotal_cents=subtotal_cents,
            shipping_cents=shipping_cents,
            currency=store_settings.currency,
        )
    except tax_module.TaxError:
        raise HTTPException(
            status_code=502,
            detail="Couldn't calculate tax for your order — please try again in a moment.",
        )
    tax_cents = tax_calc.tax_amount_exclusive

    total_cents = subtotal_cents + shipping_cents + tax_cents

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
        tax_cents=tax_cents,
        tax_calculation_id=tax_calc.id,
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
        redirect_url = _create_stripe_session(order, order_items, shipping_cents, tax_cents)
        order.payment_method = PaymentMethod.stripe
    else:
        redirect_url = _create_coinbase_charge(order)
        order.payment_method = PaymentMethod.coinbase
    db.commit()

    cart_module.clear_cart(response)
    resp = RedirectResponse(redirect_url, status_code=303)
    resp.delete_cookie(cart_module.CART_COOKIE_NAME)
    return resp


def _create_stripe_session(order: Order, order_items, shipping_cents: int, tax_cents: int) -> str:
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
    if tax_cents:
        # Charged as a plain line item, not Checkout's automatic_tax —
        # the amount is already authoritative from Stripe Tax's
        # Calculation API (see app/tax.py), computed against the address
        # collected on our own form rather than Stripe's hosted page.
        line_items.append(
            {
                "price_data": {
                    "currency": order.currency,
                    "unit_amount": tax_cents,
                    "product_data": {"name": "Tax"},
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
