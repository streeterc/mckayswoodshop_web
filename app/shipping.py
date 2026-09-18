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
import re

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


# Checkout country <select> options, as (ISO 3166-1 alpha-2 code, name).
# Between them, UPS/FedEx/DHL Express reach nearly every country here; Canada
# Post and Purolator are Canada/US-focused, but that's fine — Shippo just
# returns whichever configured carrier account actually services a given
# destination at rate-quote time, and get_rates() already handles "none did"
# by returning an empty list (checkout.py then shows "No shipping options
# were found"). A handful of sanctioned/embargoed destinations (Cuba, Iran,
# North Korea, Russia, Sudan, Syria) are deliberately left off since no
# carrier here would ever quote them.
#
# CA/US are pinned first (the shop's home country + its most common
# destination), then a hand-picked "popular" tier, then everything else
# alphabetical by name.
PINNED_COUNTRIES = [
    ("CA", "Canada"),
    ("US", "United States"),
]

POPULAR_COUNTRIES = [
    ("GB", "United Kingdom"),
    ("AU", "Australia"),
    ("DE", "Germany"),
    ("FR", "France"),
    ("MX", "Mexico"),
    ("JP", "Japan"),
    ("NZ", "New Zealand"),
    ("IE", "Ireland"),
    ("IT", "Italy"),
    ("ES", "Spain"),
    ("NL", "Netherlands"),
    ("CH", "Switzerland"),
    ("SE", "Sweden"),
    ("CN", "China"),
    ("KR", "South Korea"),
    ("SG", "Singapore"),
    ("BR", "Brazil"),
    ("IN", "India"),
    ("AE", "United Arab Emirates"),
    ("HK", "Hong Kong"),
]

OTHER_COUNTRIES = [
    ("AF", "Afghanistan"), ("AL", "Albania"), ("DZ", "Algeria"), ("AD", "Andorra"),
    ("AO", "Angola"), ("AG", "Antigua and Barbuda"), ("AR", "Argentina"), ("AM", "Armenia"),
    ("AT", "Austria"), ("AZ", "Azerbaijan"), ("BS", "Bahamas"), ("BH", "Bahrain"),
    ("BD", "Bangladesh"), ("BB", "Barbados"), ("BY", "Belarus"), ("BE", "Belgium"),
    ("BZ", "Belize"), ("BJ", "Benin"), ("BT", "Bhutan"), ("BO", "Bolivia"),
    ("BA", "Bosnia and Herzegovina"), ("BW", "Botswana"), ("BN", "Brunei"), ("BG", "Bulgaria"),
    ("BF", "Burkina Faso"), ("BI", "Burundi"), ("KH", "Cambodia"), ("CM", "Cameroon"),
    ("CV", "Cape Verde"), ("CF", "Central African Republic"), ("TD", "Chad"), ("CL", "Chile"),
    ("CO", "Colombia"), ("KM", "Comoros"), ("CG", "Congo"), ("CD", "Congo (DRC)"),
    ("CR", "Costa Rica"), ("CI", "Côte d'Ivoire"), ("HR", "Croatia"), ("CY", "Cyprus"),
    ("CZ", "Czechia"), ("DK", "Denmark"), ("DJ", "Djibouti"), ("DM", "Dominica"),
    ("DO", "Dominican Republic"), ("EC", "Ecuador"), ("EG", "Egypt"), ("SV", "El Salvador"),
    ("GQ", "Equatorial Guinea"), ("ER", "Eritrea"), ("EE", "Estonia"), ("SZ", "Eswatini"),
    ("ET", "Ethiopia"), ("FJ", "Fiji"), ("FI", "Finland"), ("GA", "Gabon"),
    ("GM", "Gambia"), ("GE", "Georgia"), ("GH", "Ghana"), ("GR", "Greece"),
    ("GD", "Grenada"), ("GT", "Guatemala"), ("GN", "Guinea"), ("GW", "Guinea-Bissau"),
    ("GY", "Guyana"), ("HT", "Haiti"), ("HN", "Honduras"), ("HU", "Hungary"),
    ("IS", "Iceland"), ("ID", "Indonesia"), ("IQ", "Iraq"), ("IL", "Israel"),
    ("JM", "Jamaica"), ("JO", "Jordan"), ("KZ", "Kazakhstan"), ("KE", "Kenya"),
    ("KI", "Kiribati"), ("KW", "Kuwait"), ("KG", "Kyrgyzstan"), ("LA", "Laos"),
    ("LV", "Latvia"), ("LB", "Lebanon"), ("LS", "Lesotho"), ("LR", "Liberia"),
    ("LY", "Libya"), ("LI", "Liechtenstein"), ("LT", "Lithuania"), ("LU", "Luxembourg"),
    ("MO", "Macao"), ("MG", "Madagascar"), ("MW", "Malawi"), ("MY", "Malaysia"),
    ("MV", "Maldives"), ("ML", "Mali"), ("MT", "Malta"), ("MH", "Marshall Islands"),
    ("MR", "Mauritania"), ("MU", "Mauritius"), ("MD", "Moldova"), ("MC", "Monaco"),
    ("MN", "Mongolia"), ("ME", "Montenegro"), ("MA", "Morocco"), ("MZ", "Mozambique"),
    ("MM", "Myanmar"), ("NA", "Namibia"), ("NR", "Nauru"), ("NP", "Nepal"),
    ("NI", "Nicaragua"), ("NE", "Niger"), ("NG", "Nigeria"), ("MK", "North Macedonia"),
    ("NO", "Norway"), ("OM", "Oman"), ("PK", "Pakistan"), ("PW", "Palau"),
    ("PA", "Panama"), ("PG", "Papua New Guinea"), ("PY", "Paraguay"), ("PE", "Peru"),
    ("PH", "Philippines"), ("PL", "Poland"), ("PT", "Portugal"), ("QA", "Qatar"),
    ("RO", "Romania"), ("RW", "Rwanda"), ("KN", "Saint Kitts and Nevis"), ("LC", "Saint Lucia"),
    ("VC", "Saint Vincent and the Grenadines"), ("WS", "Samoa"), ("SM", "San Marino"),
    ("ST", "Sao Tome and Principe"), ("SA", "Saudi Arabia"), ("SN", "Senegal"), ("RS", "Serbia"),
    ("SC", "Seychelles"), ("SL", "Sierra Leone"), ("SK", "Slovakia"), ("SI", "Slovenia"),
    ("SB", "Solomon Islands"), ("ZA", "South Africa"), ("LK", "Sri Lanka"), ("SR", "Suriname"),
    ("TW", "Taiwan"), ("TJ", "Tajikistan"), ("TZ", "Tanzania"), ("TH", "Thailand"),
    ("TL", "Timor-Leste"), ("TG", "Togo"), ("TO", "Tonga"), ("TT", "Trinidad and Tobago"),
    ("TN", "Tunisia"), ("TR", "Turkey"), ("TM", "Turkmenistan"), ("TV", "Tuvalu"),
    ("UG", "Uganda"), ("UA", "Ukraine"), ("UY", "Uruguay"), ("UZ", "Uzbekistan"),
    ("VU", "Vanuatu"), ("VA", "Vatican City"), ("VE", "Venezuela"), ("VN", "Vietnam"),
    ("YE", "Yemen"), ("ZM", "Zambia"), ("ZW", "Zimbabwe"),
]

ALL_COUNTRY_CODES = {code for code, _ in PINNED_COUNTRIES + POPULAR_COUNTRIES + OTHER_COUNTRIES}


def country_choices() -> list[tuple[str | None, list[tuple[str, str]]]]:
    """(group_label, [(code, name), ...]) groups for the checkout country
    <select>, in display order. group_label is None for the pinned CA/US
    pair, which renders as plain options rather than an <optgroup>."""
    return [
        (None, PINNED_COUNTRIES),
        ("Popular destinations", POPULAR_COUNTRIES),
        ("All other countries", OTHER_COUNTRIES),
    ]


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


_US_ZIP_RE = re.compile(r"^\d{5}(-\d{4})?$")
_CA_POSTAL_RE = re.compile(r"^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$")
_STATE_RE = re.compile(r"^[A-Za-z]{2}$")
# US/CA postal/state formats are well-known and checked exactly; the rest of
# the world's formats vary too much (length, letters vs. digits, or no postal
# code system at all) to check precisely without a per-country table, so
# elsewhere this is a lenient "looks like a real value" check — Shippo's own
# validate_address() call remains the actual authority on those.
_GENERIC_POSTAL_RE = re.compile(r"^[A-Za-z0-9][A-Za-z0-9 -]{1,9}$")
_HAS_DIGIT_RE = re.compile(r"\d")
# City/state names shouldn't contain digits — true worldwide regardless of
# script/accents, unlike an ASCII letters-only pattern which would wrongly
# reject e.g. "Zürich" or "Québec".
_CITY_RE = re.compile(r"^(?!.*\d).{1,}$")
# Requires at least one letter and one digit (street number + name) rather
# than just "non-empty" — catches obvious junk like "asdf" without a real
# API call. PO boxes ("PO Box 123") and rural routes still have a digit.
# Only applied to US/CA, where "number + street name" is a safe assumption;
# addressing conventions elsewhere vary too much to require a digit.
_STREET_RE = re.compile(r"^(?=.*[A-Za-z])(?=.*\d).{3,}$")


def format_errors(address: dict) -> dict[str, str]:
    """Cheap, purely syntactic checks run before ever calling Shippo — catches
    obviously malformed input (letters in a US zip, a street with no number,
    a country outside the checkout's supported list) so it never costs an
    API call and the customer gets an immediate, specific message. address:
    same shape as validate_address()'s, with country already the 2-letter
    code. Precise, exact-format checks only apply to US/CA, whose formats
    are known and fixed-shape; everywhere else gets a looser sanity check,
    with Shippo's own validate_address() as the real authority."""
    errors: dict[str, str] = {}

    country = (address.get("country") or "").strip().upper()
    if country not in ALL_COUNTRY_CODES:
        errors["country"] = "Select a country from the list."

    street1 = (address.get("address_line1") or "").strip()
    if country in ("US", "CA"):
        if not _STREET_RE.match(street1):
            errors["address_line1"] = "Enter a street number and name (e.g. 123 Main St)."
    elif len(street1) < 3 or street1.isdigit():
        # Only rejects the truly degenerate case elsewhere (too short, or
        # nothing but a number) — see docstring on why a digit isn't
        # required outside US/CA.
        errors["address_line1"] = "Enter a valid street address."

    city = (address.get("city") or "").strip()
    if not _CITY_RE.match(city):
        errors["city"] = "City can only contain letters, spaces, and punctuation — no digits."

    state = (address.get("state") or "").strip()
    if country in ("US", "CA"):
        if not _STATE_RE.match(state):
            errors["state"] = "Use the 2-letter state/province code (e.g. NY, ON)."
    elif not state or _HAS_DIGIT_RE.search(state):
        errors["state"] = "State/province can only contain letters, spaces, and punctuation."

    postal_code = (address.get("postal_code") or "").strip()
    if country == "US":
        if not _US_ZIP_RE.match(postal_code):
            errors["postal_code"] = "Enter a 5-digit ZIP code (e.g. 12345 or 12345-6789)."
    elif country == "CA":
        if not _CA_POSTAL_RE.match(postal_code):
            errors["postal_code"] = "Enter a Canadian postal code (e.g. A1A 1A1)."
    elif not _GENERIC_POSTAL_RE.match(postal_code):
        errors["postal_code"] = "Enter a valid postal code."

    return errors


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


def validation_state(addr: components.Address) -> str:
    """"valid", "invalid", or "unavailable". "unavailable" covers Shippo
    returning an empty validation_results object (is_valid absent, not just
    False) — observed for Canadian addresses on this account, where
    addresses.create(validate=True) succeeds but performs no actual check.
    Treating that as "valid" (the old behavior, since `is_valid or ...`
    reads None as falsy either way) let made-up CA addresses through with
    no error. Callers should treat "unavailable" the same as a ShippoError:
    fall through with the customer's raw input rather than claim it's
    confirmed."""
    results = addr.validation_results
    if results is None or results.is_valid is None:
        return "unavailable"
    return "valid" if results.is_valid else "invalid"


def field_errors_from_validation(addr: components.Address) -> dict[str, str]:
    """Returns {field_name: message}, only for fields Shippo flagged.
    Empty dict unless validation_state(addr) == "invalid"."""
    errors: dict[str, str] = {}
    if validation_state(addr) != "invalid":
        return errors
    results = addr.validation_results
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
