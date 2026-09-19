"""
Self-hosted BTCPay Server integration, via BTCPay's Greenfield REST API —
fully replaces Coinbase Commerce as this project's crypto checkout option.
BTC only, enforced explicitly on invoice creation below rather than left
to whatever else might be enabled on the BTCPay store itself. Requests
both on-chain and Lightning (BTC_PAYMENT_METHODS below), but Lightning
only actually appears on an invoice if the BTCPay store also has a
Lightning node configured — neither docker-compose.btcpay.yml nor
docker-compose.btcpay.regtest.yml sets one up, so on-chain-only is what
you'll actually see against those two stacks as they stand (confirmed
live against regtest: the invoice offered only BTC-CHAIN).

Assumes a self-hosted BTCPay Server instance is reachable at
settings.btcpay_url (in production, the docker-compose.btcpay.yml stack's
`btcpayserver` container, reached over the internal Docker network — see
that file and CLAUDE.md for the rest of the stack this talks to: bitcoind,
NBXplorer, and BTCPay Server's own Postgres database).
"""
import hashlib
import hmac

import httpx

from app.config import get_settings

settings = get_settings()

# Restricts the invoice to just BTC's two settlement methods regardless of
# what else might be enabled in the BTCPay store's own dashboard — "BTC
# only" is enforced here in code, not just by admin configuration, so it
# holds even if someone later enables another chain on the BTCPay side.
BTC_PAYMENT_METHODS = ["BTC", "BTC-LightningNetwork"]


class BTCPayError(Exception):
    """Raised on any BTCPay Greenfield API failure — callers should treat
    this the same as a Stripe API failure: fail the checkout attempt,
    never silently treat the order as paid."""


def create_invoice(order, redirect_url: str) -> dict:
    """Creates a BTC invoice for `order` via the Greenfield API and returns
    the response dict (notably `id` and `checkoutLink`). order.total_cents
    is priced in order.currency (e.g. "usd") — BTCPay converts to BTC at
    the current market rate itself, the same way Coinbase Commerce did.
    Raises BTCPayError on any failure to reach or authenticate with the
    BTCPay instance."""
    try:
        resp = httpx.post(
            f"{settings.btcpay_url}/api/v1/stores/{settings.btcpay_store_id}/invoices",
            headers={
                "Authorization": f"token {settings.btcpay_api_key}",
                "Content-Type": "application/json",
            },
            json={
                "amount": f"{order.total_cents / 100:.2f}",
                "currency": order.currency.upper(),
                "metadata": {"orderId": order.public_id},
                "checkout": {
                    "redirectURL": redirect_url,
                    "paymentMethods": BTC_PAYMENT_METHODS,
                },
            },
            timeout=15,
        )
        resp.raise_for_status()
    except httpx.HTTPError as e:
        raise BTCPayError(str(e)) from e
    return resp.json()


def verify_webhook_signature(payload: bytes, signature_header: str) -> bool:
    """BTCPay signs each webhook delivery as `BTCPay-Sig: sha256=<hex>` — an
    HMAC-SHA256 of the raw request body using the webhook's own secret (set
    when the webhook is created under the BTCPay store's Settings ->
    Webhooks page; see CLAUDE.md). Comparing against an empty/malformed
    header returns False rather than raising, so callers can treat any
    failure here uniformly as "reject the request"."""
    if not signature_header.startswith("sha256="):
        return False
    expected = hmac.new(
        settings.btcpay_webhook_secret.encode(), payload, hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(signature_header[len("sha256="):], expected)
