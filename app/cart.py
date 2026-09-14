"""
Guest cart stored in a signed cookie as {variant_id: quantity}.

Kept out of the database entirely — carts are ephemeral and there's no
customer account to attach them to (guest checkout by design, spec §4.2).
The cookie is signed (not encrypted) so the browser can't tamper with
quantities/variant ids without invalidating the signature.
"""
import json

from itsdangerous import URLSafeSerializer, BadSignature
from fastapi import Request, Response

from app.config import get_settings

settings = get_settings()
CART_COOKIE_NAME = "cart"
_serializer = URLSafeSerializer(settings.admin_session_secret, salt="cart")


def get_cart(request: Request) -> dict[int, int]:
    raw = request.cookies.get(CART_COOKIE_NAME)
    if not raw:
        return {}
    try:
        data = _serializer.loads(raw)
        return {int(k): int(v) for k, v in data.items()}
    except (BadSignature, ValueError, TypeError):
        return {}


def save_cart(response: Response, cart: dict[int, int]) -> None:
    token = _serializer.dumps({str(k): v for k, v in cart.items()})
    response.set_cookie(
        CART_COOKIE_NAME, token, max_age=60 * 60 * 24 * 14, httponly=True, samesite="lax"
    )


def add_item(request: Request, response: Response, variant_id: int, quantity: int) -> dict[int, int]:
    cart = get_cart(request)
    cart[variant_id] = cart.get(variant_id, 0) + quantity
    save_cart(response, cart)
    return cart


def set_item(request: Request, response: Response, variant_id: int, quantity: int) -> dict[int, int]:
    cart = get_cart(request)
    if quantity <= 0:
        cart.pop(variant_id, None)
    else:
        cart[variant_id] = quantity
    save_cart(response, cart)
    return cart


def clear_cart(response: Response) -> None:
    response.delete_cookie(CART_COOKIE_NAME)
