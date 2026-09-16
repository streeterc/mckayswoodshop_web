"""
Live carrier rate quotes and label purchase via Shippo.

Uses the current `shippo` SDK (v3, a typed client — `Shippo(api_key_header=...)`
plus `shippo.models.components` request objects), not the older module-level
`shippo.Shipment.create(...)` API some docs/snippets still show.

Parcel dimensions come from each cart line's ProductVariant
(weight_oz/length_in/width_in/height_in, see models.py) combined into a
single parcel sized to the largest item in the cart — real box-packing
logic is overkill for a catalog this small (<50 SKUs).
"""
from shippo import Shippo
from shippo.models import components
from shippo.models.errors import SDKError

from app.config import get_settings

settings = get_settings()


def _client() -> Shippo:
    return Shippo(api_key_header=settings.shippo_api_key)


def _shop_origin() -> components.AddressCreateRequest:
    return components.AddressCreateRequest(
        name=settings.shop_address_name,
        street1=settings.shop_address_street1,
        street2=settings.shop_address_street2 or None,
        city=settings.shop_address_city,
        state=settings.shop_address_state,
        zip=settings.shop_address_zip,
        country=settings.shop_address_country,
        phone=settings.shop_address_phone or None,
    )


def get_rates(address: dict, cart_rows: list[dict]) -> list:
    """address: the ShippingAddressIn-shaped dict collected on the checkout
    form. cart_rows: the {"variant": ProductVariant, "quantity": int, ...}
    rows from cart.resolve_cart_rows(). Returns Shippo Rate objects, cheapest
    first. Raises shippo.models.errors.SDKError on a Shippo API failure."""
    total_weight_oz = sum(
        row["variant"].weight_oz * row["quantity"] for row in cart_rows
    )
    length = max((row["variant"].length_in for row in cart_rows), default=6.0)
    width = max((row["variant"].width_in for row in cart_rows), default=6.0)
    height = max((row["variant"].height_in for row in cart_rows), default=6.0)

    address_to = components.AddressCreateRequest(
        name=address["name"],
        street1=address["address_line1"],
        street2=address.get("address_line2") or None,
        city=address["city"],
        state=address.get("state") or None,
        zip=address["postal_code"],
        country=address["country"],
        email=address.get("email") or None,
    )
    parcel = components.ParcelCreateRequest(
        length=str(length), width=str(width), height=str(height),
        distance_unit=components.DistanceUnitEnum.IN,
        weight=str(total_weight_oz), mass_unit=components.WeightUnitEnum.OZ,
    )
    request = components.ShipmentCreateRequest(
        address_from=_shop_origin(),
        address_to=address_to,
        parcels=[parcel],
        async_=False,
    )
    shipment = _client().shipments.create(request)
    rates = shipment.rates or []
    return sorted(rates, key=lambda r: float(r.amount))


def get_verified_rate(rate_id: str):
    """Re-fetch a rate server-side before charging for it — never trust the
    price a client submitted back with the form."""
    return _client().rates.get(rate_id)


def buy_label(rate_id: str) -> tuple[str, str]:
    """Purchase the shipping label for a previously-quoted rate. Returns
    (tracking_number, label_url).

    Raises RuntimeError if Shippo couldn't produce a purchasable label —
    in test mode this includes rates from carrier accounts that aren't
    activated for your Shippo account yet (Settings -> Carriers in the
    Shippo dashboard)."""
    request = components.TransactionCreateRequest(
        rate=rate_id,
        label_file_type=components.LabelFileTypeEnum.PDF,
        async_=False,
    )
    transaction = _client().transactions.create(request)
    if transaction.status != components.TransactionStatusEnum.SUCCESS:
        reason = "; ".join(m.text for m in (transaction.messages or []))
        raise RuntimeError(reason or "Shippo could not create a label for this rate.")
    return transaction.tracking_number, transaction.label_url


# Re-exported so callers only need to import this module, not reach into
# the shippo package directly to catch API failures.
ShippoError = SDKError
