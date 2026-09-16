"""
Order tax calculation via Stripe Tax.

Uses the Tax Calculation API (`stripe.tax.Calculation.create`) directly —
the same jurisdiction/rate data that powers Checkout's `automatic_tax`,
but callable on its own so a single calculation backs both payment paths:
Stripe Checkout (added as an explicit line item, see routers/checkout.py)
and Coinbase Commerce, which has no tax feature of its own and just gets
the pre-computed amount folded into the charge total.

Requires Stripe Tax to be activated for the account (Dashboard -> Settings
-> Tax, with an origin address set) — a one-time manual setup step this
code can't do for you. Until that's done, every calculation raises
TaxError and checkout blocks rather than silently charging $0 tax.

The whole order is sent as a single line item rather than one per cart
row — fine for a catalog that's entirely standard tangible goods with no
mixed tax-exempt items; revisit if that ever changes.
"""
import logging

import stripe

logger = logging.getLogger("tax")


class TaxError(Exception):
    """Stripe Tax couldn't produce a calculation (not activated, bad address, etc.)."""


def calculate_tax(shipping_address: dict, subtotal_cents: int, shipping_cents: int, currency: str):
    """shipping_address: the ShippingAddressIn-shaped dict from checkout.
    Returns the Stripe Tax Calculation object — use .tax_amount_exclusive
    for the cents to add on top of subtotal + shipping."""
    kwargs = {
        "currency": currency,
        "line_items": [{"amount": subtotal_cents, "reference": "order_subtotal"}],
        "customer_details": {
            "address": {
                "line1": shipping_address["address_line1"],
                "line2": shipping_address.get("address_line2") or None,
                "city": shipping_address["city"],
                "state": shipping_address.get("state") or None,
                "postal_code": shipping_address["postal_code"],
                "country": shipping_address["country"],
            },
            "address_source": "shipping",
        },
    }
    if shipping_cents:
        kwargs["shipping_cost"] = {"amount": shipping_cents}

    try:
        return stripe.tax.Calculation.create(**kwargs)
    except stripe.error.InvalidRequestError as e:
        raise TaxError(str(e)) from e


def record_tax_transaction(order) -> None:
    """Turns a Calculation into a Transaction once an order is actually
    paid, so it counts toward Stripe Tax's remittance reporting. Never
    raises — a failure here shouldn't block order confirmation, but is
    worth logging loudly since it means tax collected isn't being tracked
    for filing purposes."""
    if not order.tax_calculation_id:
        return
    try:
        stripe.tax.Transaction.create_from_calculation(
            calculation=order.tax_calculation_id,
            reference=order.public_id,
        )
    except stripe.error.StripeError:
        logger.error(
            "Failed to record Stripe Tax transaction for order %s (calculation %s)",
            order.public_id, order.tax_calculation_id, exc_info=True,
        )
