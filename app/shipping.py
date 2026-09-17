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

# The only carriers this shop quotes/ships with — everything else Shippo
# might return (USPS, Sendle, etc.) is filtered out in get_rates(). Keyed by
# Shippo's `rate.provider` string, lowercased, to a logo file under
# app/static/img/carriers/ (see that directory's README for sourcing/usage).
CARRIER_LOGOS = {
    "canada post": "canada-post.svg",
    "purolator": "purolator.svg",
    "ups": "ups.svg",
    "fedex": "fedex.svg",
    "dhl express": "dhl.svg",
    "dhl": "dhl.svg",
}


def carrier_logo(provider: str) -> str | None:
    filename = CARRIER_LOGOS.get(provider.strip().lower())
    return f"/static/img/carriers/{filename}" if filename else None


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
    rows from cart.resolve_cart_rows(). Returns at most two Shippo Rate
    objects per carrier — its cheapest service level and its fastest — so
    the checkout picker doesn't drown customers in every service tier a
    carrier offers, sorted overall by price. Raises
    shippo.models.errors.SDKError on a Shippo API failure."""
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
    rates = [r for r in rates if r.provider.strip().lower() in CARRIER_LOGOS]

    by_carrier: dict[str, list] = {}
    for r in rates:
        by_carrier.setdefault(r.provider.strip().lower(), []).append(r)

    selected = []
    for carrier_rates in by_carrier.values():
        cheapest = min(carrier_rates, key=lambda r: float(r.amount))
        # Rates with no delivery estimate sort last so they never edge out
        # an actual fastest option; if that's all a carrier has, fastest
        # just collapses to the same rate as cheapest below. Price is the
        # tiebreaker so that among rates tied on days, "fastest" never
        # picks a pricier one that isn't actually any quicker.
        fastest = min(
            carrier_rates,
            key=lambda r: (r.estimated_days is None, r.estimated_days or 0, float(r.amount)),
        )
        selected.append(cheapest)
        if fastest.object_id != cheapest.object_id:
            selected.append(fastest)

    return sorted(selected, key=lambda r: float(r.amount))


def validate_address(address: dict) -> components.Address:
    """address: same shape as get_rates()'s address param. Raises
    shippo.models.errors.SDKError on a Shippo API failure — callers should
    treat that as "validation unavailable", not "address invalid"."""
    request = components.AddressCreateRequest(
        name=address.get("name") or "Customer",
        street1=address["address_line1"],
        street2=address.get("address_line2") or None,
        city=address["city"],
        state=address.get("state") or None,
        zip=address["postal_code"],
        country=address["country"],
        email=address.get("email") or None,
        validate=True,
    )
    return _client().addresses.create(request)


# Shippo's validation messages are free text with no field pointer, so this
# is a best-effort keyword match — falls back to address_line1 (the most
# common real failure) rather than a field the UI can't show anywhere.
_FIELD_KEYWORDS = [
    ("postal_code", ("zip", "postal")),
    ("city", ("city",)),
    ("state", ("state", "province")),
    ("country", ("country",)),
]


def field_errors_from_validation(addr: components.Address) -> dict[str, str]:
    """Returns {field_name: message}, only for fields Shippo flagged.
    Empty dict when addr.validation_results.is_valid is True."""
    errors: dict[str, str] = {}
    results = addr.validation_results
    if not results or results.is_valid:
        return errors
    for msg in (results.messages or []):
        text = (msg.text or "").strip()
        if not text:
            continue
        lowered = text.lower()
        field = next(
            (f for f, kws in _FIELD_KEYWORDS if any(kw in lowered for kw in kws)),
            "address_line1",
        )
        # First message per field wins; don't overwrite with a second guess.
        errors.setdefault(field, text)
    return errors


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
