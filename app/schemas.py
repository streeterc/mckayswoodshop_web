from pydantic import BaseModel, EmailStr, field_validator


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


class CartLineIn(BaseModel):
    variant_id: int
    quantity: int

    @field_validator("quantity")
    @classmethod
    def positive_qty(cls, v: int) -> int:
        if v < 1 or v > 99:
            raise ValueError("quantity must be between 1 and 99")
        return v
