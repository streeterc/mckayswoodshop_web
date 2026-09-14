import enum
import uuid
from datetime import datetime

from sqlalchemy import (
    String, Integer, Boolean, DateTime, ForeignKey, Text, Enum, func
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
        return any(v.stock_count > 0 for v in self.variants)


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
    total_cents: Mapped[int] = mapped_column(Integer)
    currency: Mapped[str] = mapped_column(String(10), default="usd")

    payment_method: Mapped[PaymentMethod | None] = mapped_column(Enum(PaymentMethod), nullable=True)
    payment_reference: Mapped[str] = mapped_column(String(255), default="")  # Stripe session id / Coinbase charge id

    status: Mapped[OrderStatus] = mapped_column(Enum(OrderStatus), default=OrderStatus.pending)
    tracking_number: Mapped[str] = mapped_column(String(120), default="")
    tracking_carrier: Mapped[str] = mapped_column(String(120), default="")

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


class StoreSettings(Base):
    """Single-row table of admin-editable store settings (shipping rates, etc.)."""
    __tablename__ = "store_settings"

    id: Mapped[int] = mapped_column(primary_key=True, default=1)
    domestic_shipping_cents: Mapped[int] = mapped_column(Integer, default=500)
    intl_shipping_cents: Mapped[int] = mapped_column(Integer, default=1800)
    domestic_country_code: Mapped[str] = mapped_column(String(2), default="US")
    currency: Mapped[str] = mapped_column(String(10), default="usd")
