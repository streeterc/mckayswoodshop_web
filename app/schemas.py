from pydantic import BaseModel, EmailStr, field_validator, model_validator


class ShippingAddressIn(BaseModel):
    name: str
    email: EmailStr
    address_line1: str
    address_line2: str = ""
    city: str
    state: str = ""
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
    "other": "Not sure yet",
}


class QuoteRequestIn(BaseModel):
    category: str
    size_in: int
    wall_in: int = 0
    room: str
    material: str
    exposure: str = ""
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

    @field_validator("name", "city", "room", "material", "timeline")
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


class CartLineIn(BaseModel):
    variant_id: int
    quantity: int

    @field_validator("quantity")
    @classmethod
    def positive_qty(cls, v: int) -> int:
        if v < 1 or v > 99:
            raise ValueError("quantity must be between 1 and 99")
        return v
