import re

from pydantic import BaseModel, EmailStr, field_validator, model_validator


class ShippingAddressIn(BaseModel):
    name: str
    email: EmailStr
    address_line1: str
    address_line2: str = ""
    city: str
    state: str
    postal_code: str
    country: str  # ISO 3166-1 alpha-2, e.g. "US"

    @field_validator("country")
    @classmethod
    def upper_country(cls, v: str) -> str:
        v = v.strip().upper()
        if len(v) != 2:
            raise ValueError("country must be a 2-letter ISO country code (e.g. US, CA, GB)")
        return v


QUOTE_CATEGORIES = {
    "furniture": "Furniture",
    "builtins": "Built-ins",
    "outdoor": "Outdoor",
    "restoration": "Restoration",
}


class QuoteRequestIn(BaseModel):
    category: str
    size_in: int
    wall_in: int = 0
    # Room and material are asked conditionally per category (the wizard
    # hides/disables them), so they're optional here — enforced per-category
    # below instead of unconditionally, the same way photo_count already is.
    room: str = ""
    material: str = ""
    exposure: str = ""
    repair_type: str = ""
    # Restoration-only, free text, optional — describes the existing piece
    # rather than expressing a preference, so it's never required.
    wood_type: str = ""
    timeline: str
    photo_count: int = 0
    name: str
    phone: str = ""
    email: str = ""
    city: str
    contact_method: str = ""
    notes: str = ""

    @field_validator("category")
    @classmethod
    def valid_category(cls, v: str) -> str:
        if v not in QUOTE_CATEGORIES:
            raise ValueError("Invalid project category")
        return v

    @field_validator("name", "city", "timeline")
    @classmethod
    def not_blank(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("This field is required")
        return v

    @field_validator("size_in", "wall_in")
    @classmethod
    def positive_dimension(cls, v: int) -> int:
        if v < 0:
            raise ValueError("Dimensions cannot be negative")
        return v

    @model_validator(mode="after")
    def require_contact(self):
        if not self.email.strip() and not self.phone.strip():
            raise ValueError("Provide an email or phone number so we can reach you")
        return self

    @model_validator(mode="after")
    def require_photo_for_restoration(self):
        if self.category == "restoration" and self.photo_count < 1:
            raise ValueError("Please attach at least one photo of the piece")
        return self

    @model_validator(mode="after")
    def require_room_unless_outdoor(self):
        # Outdoor is the one category where "room / setting" doesn't apply —
        # the wizard hides the field for it (see _quote_form.html).
        if self.category != "outdoor" and not self.room.strip():
            raise ValueError("Room / setting is required")
        return self

    @model_validator(mode="after")
    def require_material_unless_restoration(self):
        # Restoration is repairing an existing piece, not choosing a new
        # wood species — the wizard hides the field for it.
        if self.category != "restoration" and not self.material.strip():
            raise ValueError("Material is required")
        return self

    @model_validator(mode="after")
    def require_repair_type_for_restoration(self):
        if self.category == "restoration" and not self.repair_type.strip():
            raise ValueError("Please tell us what kind of repair is needed")
        return self


_SLUG_RE = re.compile(r"[a-z0-9]+(?:-[a-z0-9]+)*")


class ProductIn(BaseModel):
    name: str
    slug: str
    description: str = ""
    base_price_cents: int
    active: bool = True

    @field_validator("name", "slug")
    @classmethod
    def not_blank(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("This field is required")
        return v

    @field_validator("slug")
    @classmethod
    def slug_format(cls, v: str) -> str:
        v = v.strip().lower()
        if not _SLUG_RE.fullmatch(v):
            raise ValueError("Slug must be lowercase letters, numbers, and hyphens only")
        return v

    @field_validator("base_price_cents")
    @classmethod
    def non_negative_price(cls, v: int) -> int:
        if v < 0:
            raise ValueError("Price cannot be negative")
        return v


class ProductVariantIn(BaseModel):
    sku: str
    label: str
    price_override_cents: int | None = None
    stock_count: int = 0

    @field_validator("sku", "label")
    @classmethod
    def not_blank(cls, v: str) -> str:
        v = v.strip()
        if not v:
            raise ValueError("This field is required")
        return v

    @field_validator("price_override_cents")
    @classmethod
    def non_negative_override(cls, v: int | None) -> int | None:
        if v is not None and v < 0:
            raise ValueError("Price cannot be negative")
        return v

    @field_validator("stock_count")
    @classmethod
    def non_negative_stock(cls, v: int) -> int:
        if v < 0:
            raise ValueError("Stock cannot be negative")
        return v


class CartLineIn(BaseModel):
    variant_id: int
    quantity: int

    @field_validator("quantity")
    @classmethod
    def positive_qty(cls, v: int) -> int:
        if v < 1 or v > 99:
            raise ValueError("quantity must be between 1 and 99")
        return v
