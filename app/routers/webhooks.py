import hashlib
import hmac

import stripe
from fastapi import APIRouter, Request, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select

from app.config import get_settings
from app.database import get_db
from app.models import Order, OrderStatus
from app.email import send_email

router = APIRouter()
settings = get_settings()


def _mark_paid_and_notify(db: Session, order: Order) -> None:
    if order.status != OrderStatus.pending:
        return  # idempotency guard — webhooks can be delivered more than once
    order.status = OrderStatus.paid
    db.commit()

    send_email(
        to=order.customer_email,
        subject=f"Order confirmed — #{order.public_id[:8]}",
        html_body=(
            f"<p>Thanks for your order! We'll email you again once it ships.</p>"
            f"<p>Order lookup: {settings.base_url}/order/{order.public_id}</p>"
        ),
        text_body=f"Thanks for your order! Track it at {settings.base_url}/order/{order.public_id}",
    )
    send_email(
        to=settings.notify_admin_email,
        subject=f"New order received — #{order.public_id[:8]}",
        html_body=f"<p>New paid order totaling {order.total_cents / 100:.2f} {order.currency.upper()}.</p>"
                  f"<p>{settings.base_url}/admin/orders/{order.id}</p>",
    )


@router.post("/webhooks/stripe")
async def stripe_webhook(request: Request, db: Session = Depends(get_db)):
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature", "")

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.stripe_webhook_secret
        )
    except (ValueError, stripe.error.SignatureVerificationError):
        raise HTTPException(status_code=400, detail="Invalid Stripe signature")

    if event["type"] == "checkout.session.completed":
        session_obj = event["data"]["object"]
        public_id = session_obj.get("client_reference_id") or session_obj.get("metadata", {}).get(
            "order_public_id"
        )
        order = db.scalar(select(Order).where(Order.public_id == public_id))
        if order:
            _mark_paid_and_notify(db, order)

    return {"received": True}


@router.post("/webhooks/coinbase")
async def coinbase_webhook(request: Request, db: Session = Depends(get_db)):
    payload = await request.body()
    sig = request.headers.get("x-cc-webhook-signature", "")

    expected_sig = hmac.new(
        settings.coinbase_webhook_shared_secret.encode(), payload, hashlib.sha256
    ).hexdigest()
    if not hmac.compare_digest(sig, expected_sig):
        raise HTTPException(status_code=400, detail="Invalid Coinbase webhook signature")

    body = await request.json()
    event = body.get("event", {})
    event_type = event.get("type", "")

    if event_type == "charge:confirmed":
        charge = event.get("data", {})
        public_id = charge.get("metadata", {}).get("order_public_id")
        order = db.scalar(select(Order).where(Order.public_id == public_id))
        if order:
            _mark_paid_and_notify(db, order)

    return {"received": True}
