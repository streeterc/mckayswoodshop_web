import enum
import uuid
from datetime import datetime

from sqlalchemy import (
    String, Integer, Boolean, DateTime, ForeignKey, Text, Enum, Float, func
)
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


def gen_uuid() -> str:
    return str(uuid.uuid4())


class OrderStatus(str, enum.Enum):
    pending = "pending"          # created, awaiting payment confirmation
    paid = "paid"                # payment webhook confirmed
    fulfilled = "fulfilled"      # picked/packed, not yet shipped
    shipped = "shipped"          # tracking added
    cancelled = "cancelled"


class PaymentMethod(str, enum.Enum):
    stripe = "stripe"
    coinbase = "coinbase"


class Product(Base):
    __tablename__ = "products"

    id: Mapped[int] = mapped_column(primary_key=True)
    slug: Mapped[str] = mapped_column(String(120), unique=True, index=True)
    name: Mapped[str] = mapped_column(String(200))
    description: Mapped[str] = mapped_column(Text, default="")
    base_price_cents: Mapped[int] = mapped_column(Integer)  # used if a variant has no override
    active: Mapped[bool] = mapped_column(Boolean, default=True)
    image_path: Mapped[str] = mapped_column(String(300), default="")
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())

    variants: Mapped[list["ProductVariant"]] = relationship(
        back_populates="product", cascade="all, delete-orphan"
    )

    @property
    def in_stock(self) -> bool:
        return any(v.active and v.stock_count > 0 for v in self.variants)


class ProductVariant(Base):
    __tablename__ = "product_variants"

    id: Mapped[int] = mapped_column(primary_key=True)
    product_id: Mapped[int] = mapped_column(ForeignKey("products.id"))
    sku: Mapped[str] = mapped_column(String(64), unique=True)
    # e.g. "Size: M / Color: Black" — kept as a simple label rather than a
    # generic option system, since the catalog is small (<50 products).
    label: Mapped[str] = mapped_column(String(200))
    price_override_cents: Mapped[int | None] = mapped_column(Integer, nullable=True)
    stock_count: Mapped[int] = mapped_column(Integer, default=0)
    # Soft-delete flag — a variant that's ever appeared in an OrderItem can't
    # be hard-deleted (the FK would reject it), so "removing" it from the
    # admin instead sets this to False: hidden from the storefront, past
    # orders keep their own snapshot fields untouched (see OrderItem).
    active: Mapped[bool] = mapped_column(Boolean, default=True)

    # Parcel dimensions used for live Shippo rate quotes (see app/shipping.py).
    weight_oz: Mapped[float] = mapped_column(Float, default=8.0)
    length_in: Mapped[float] = mapped_column(Float, default=6.0)
    width_in: Mapped[float] = mapped_column(Float, default=6.0)
    height_in: Mapped[float] = mapped_column(Float, default=6.0)

    product: Mapped["Product"] = relationship(back_populates="variants")

    def price_cents(self) -> int:
        return self.price_override_cents if self.price_override_cents is not None else self.product.base_price_cents


class Order(Base):
    __tablename__ = "orders"

    id: Mapped[int] = mapped_column(primary_key=True)
    public_id: Mapped[str] = mapped_column(String(36), unique=True, default=gen_uuid, index=True)

    customer_email: Mapped[str] = mapped_column(String(255))
    shipping_name: Mapped[str] = mapped_column(String(200))
    shipping_address_line1: Mapped[str] = mapped_column(String(255))
    shipping_address_line2: Mapped[str] = mapped_column(String(255), default="")
    shipping_city: Mapped[str] = mapped_column(String(120))
    shipping_state: Mapped[str] = mapped_column(String(120), default="")
    shipping_postal_code: Mapped[str] = mapped_column(String(30))
    shipping_country: Mapped[str] = mapped_column(String(2))  # ISO 3166-1 alpha-2

    is_domestic: Mapped[bool] = mapped_column(Boolean, default=True)
    shipping_cents: Mapped[int] = mapped_column(Integer)
    subtotal_cents: Mapped[int] = mapped_column(Integer)
    # Computed via Stripe Tax (app/tax.py) from the shipping address —
    # included in total_cents below for both Stripe and Coinbase checkout.
    tax_cents: Mapped[int] = mapped_column(Integer, default=0)
    # The Stripe Tax Calculation backing tax_cents, recorded into a
    # Transaction once the order is paid (see webhooks.py) so it counts
    # toward Stripe Tax's remittance reporting.
    tax_calculation_id: Mapped[str] = mapped_column(String(64), default="")
    total_cents: Mapped[int] = mapped_column(Integer)
    currency: Mapped[str] = mapped_column(String(10), default="usd")

    payment_method: Mapped[PaymentMethod | None] = mapped_column(Enum(PaymentMethod), nullable=True)
    payment_reference: Mapped[str] = mapped_column(String(255), default="")  # Stripe session id / Coinbase charge id

    status: Mapped[OrderStatus] = mapped_column(Enum(OrderStatus), default=OrderStatus.pending)
    tracking_number: Mapped[str] = mapped_column(String(120), default="")
    tracking_carrier: Mapped[str] = mapped_column(String(120), default="")

    # The live Shippo rate quoted and accepted at checkout, re-verified before
    # a label is purchased for it. label_url is set once the label is bought
    # (see app/shipping.py:buy_label, admin order fulfillment).
    shippo_rate_id: Mapped[str] = mapped_column(String(64), default="")
    label_url: Mapped[str] = mapped_column(String(500), default="")

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    items: Mapped[list["OrderItem"]] = relationship(back_populates="order", cascade="all, delete-orphan")


class OrderItem(Base):
    __tablename__ = "order_items"

    id: Mapped[int] = mapped_column(primary_key=True)
    order_id: Mapped[int] = mapped_column(ForeignKey("orders.id"))
    variant_id: Mapped[int] = mapped_column(ForeignKey("product_variants.id"))

    # Snapshot fields — captured at time of purchase so later product edits
    # never rewrite historical orders.
    product_name: Mapped[str] = mapped_column(String(200))
    variant_label: Mapped[str] = mapped_column(String(200))
    unit_price_cents: Mapped[int] = mapped_column(Integer)
    quantity: Mapped[int] = mapped_column(Integer)

    order: Mapped["Order"] = relationship(back_populates="items")
    variant: Mapped["ProductVariant"] = relationship()


class AdminUser(Base):
    __tablename__ = "admin_users"

    id: Mapped[int] = mapped_column(primary_key=True)
    username: Mapped[str] = mapped_column(String(80), unique=True)
    password_hash: Mapped[str] = mapped_column(String(255))
    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class QuoteRequest(Base):
    """A lead submitted through the site-wide 'Request a quote' popup."""
    __tablename__ = "quote_requests"

    id: Mapped[int] = mapped_column(primary_key=True)

    # Step 1 — project category
    category: Mapped[str] = mapped_column(String(30))

    # Step 2 — structured project details
    size_in: Mapped[int] = mapped_column(Integer, default=0)
    wall_in: Mapped[int] = mapped_column(Integer, default=0)
    # Room and material are category-dependent — not asked (blank) for
    # Outdoor (room) or Restoration (material, since it's an existing piece
    # rather than a new-build wood choice); see schemas.QuoteRequestIn.
    room: Mapped[str] = mapped_column(String(60), default="")
    material: Mapped[str] = mapped_column(String(60), default="")
    exposure: Mapped[str] = mapped_column(String(20), default="")
    # Restoration-only: structural / cosmetic / missing parts / other.
    repair_type: Mapped[str] = mapped_column(String(40), default="")
    # Restoration-only, free text and optional — what the existing piece is
    # made of (helps with matching stain/finish), distinct from `material`
    # above which is a *new*-wood preference and doesn't apply here.
    wood_type: Mapped[str] = mapped_column(String(60), default="")
    timeline: Mapped[str] = mapped_column(String(40), default="")
    # Photos are attached to the admin notification email, not stored
    # server-side — this just records how many were sent (see app/shipping.py
    # sibling app/email.py for the attachment path).
    photo_count: Mapped[int] = mapped_column(Integer, default=0)

    # Step 3 — contact info
    name: Mapped[str] = mapped_column(String(200))
    phone: Mapped[str] = mapped_column(String(40), default="")
    email: Mapped[str] = mapped_column(String(255), default="")
    city: Mapped[str] = mapped_column(String(120))
    contact_method: Mapped[str] = mapped_column(String(20), default="")
    notes: Mapped[str] = mapped_column(Text, default="")

    created_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())


class StoreSettings(Base):
    """Single-row table of admin-editable store settings (shipping rates, etc.)."""
    __tablename__ = "store_settings"

    id: Mapped[int] = mapped_column(primary_key=True, default=1)
    domestic_shipping_cents: Mapped[int] = mapped_column(Integer, default=500)
    intl_shipping_cents: Mapped[int] = mapped_column(Integer, default=1800)
    domestic_country_code: Mapped[str] = mapped_column(String(2), default="US")
    currency: Mapped[str] = mapped_column(String(10), default="usd")
