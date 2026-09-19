import stripe
from fastapi import APIRouter, Request, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import select

from app.config import get_settings
from app.database import get_db
from app.models import Order, OrderStatus
from app.email import send_email
from app import tax as tax_module
from app import btcpay as btcpay_module

router = APIRouter()
settings = get_settings()


def _mark_paid_and_notify(db: Session, order: Order) -> None:
    if order.status != OrderStatus.pending:
        return  # idempotency guard — webhooks can be delivered more than once
    order.status = OrderStatus.paid
    db.commit()

    tax_module.record_tax_transaction(order)

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


@router.post("/webhooks/btcpay")
async def btcpay_webhook(request: Request, db: Session = Depends(get_db)):
    payload = await request.body()
    sig = request.headers.get("btcpay-sig", "")

    if not btcpay_module.verify_webhook_signature(payload, sig):
        raise HTTPException(status_code=400, detail="Invalid BTCPay webhook signature")

    body = await request.json()

    # "InvoiceSettled" is BTCPay's final, fully-confirmed state — matches
    # the same "only act on the definitively-paid event" policy as the
    # Stripe handler above (checkout.session.completed), not an earlier
    # "processing"/unconfirmed event.
    if body.get("type") == "InvoiceSettled":
        invoice_id = body.get("invoiceId", "")
        order = db.scalar(select(Order).where(Order.payment_reference == invoice_id))
        if order:
            _mark_paid_and_notify(db, order)

    return {"received": True}
