"""initial schema

Revision ID: 0001
Revises:
Create Date: 2026-09-14

"""
from alembic import op
import sqlalchemy as sa

revision = "0001"
down_revision = None
branch_labels = None
depends_on = None

order_status_enum = sa.Enum(
    "pending", "paid", "fulfilled", "shipped", "cancelled", name="orderstatus"
)
payment_method_enum = sa.Enum("stripe", "coinbase", name="paymentmethod")


def upgrade() -> None:
    op.create_table(
        "products",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("slug", sa.String(120), unique=True, index=True, nullable=False),
        sa.Column("name", sa.String(200), nullable=False),
        sa.Column("description", sa.Text, server_default=""),
        sa.Column("base_price_cents", sa.Integer, nullable=False),
        sa.Column("active", sa.Boolean, server_default=sa.true()),
        sa.Column("image_path", sa.String(300), server_default=""),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )

    op.create_table(
        "product_variants",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("product_id", sa.Integer, sa.ForeignKey("products.id"), nullable=False),
        sa.Column("sku", sa.String(64), unique=True, nullable=False),
        sa.Column("label", sa.String(200), nullable=False),
        sa.Column("price_override_cents", sa.Integer, nullable=True),
        sa.Column("stock_count", sa.Integer, server_default="0"),
    )

    op.create_table(
        "admin_users",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("username", sa.String(80), unique=True, nullable=False),
        sa.Column("password_hash", sa.String(255), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )

    op.create_table(
        "store_settings",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("domestic_shipping_cents", sa.Integer, server_default="500"),
        sa.Column("intl_shipping_cents", sa.Integer, server_default="1800"),
        sa.Column("domestic_country_code", sa.String(2), server_default="US"),
        sa.Column("currency", sa.String(10), server_default="usd"),
    )

    op.create_table(
        "orders",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("public_id", sa.String(36), unique=True, index=True, nullable=False),
        sa.Column("customer_email", sa.String(255), nullable=False),
        sa.Column("shipping_name", sa.String(200), nullable=False),
        sa.Column("shipping_address_line1", sa.String(255), nullable=False),
        sa.Column("shipping_address_line2", sa.String(255), server_default=""),
        sa.Column("shipping_city", sa.String(120), nullable=False),
        sa.Column("shipping_state", sa.String(120), server_default=""),
        sa.Column("shipping_postal_code", sa.String(30), nullable=False),
        sa.Column("shipping_country", sa.String(2), nullable=False),
        sa.Column("is_domestic", sa.Boolean, server_default=sa.true()),
        sa.Column("shipping_cents", sa.Integer, nullable=False),
        sa.Column("subtotal_cents", sa.Integer, nullable=False),
        sa.Column("total_cents", sa.Integer, nullable=False),
        sa.Column("currency", sa.String(10), server_default="usd"),
        sa.Column("payment_method", payment_method_enum, nullable=True),
        sa.Column("payment_reference", sa.String(255), server_default=""),
        sa.Column("status", order_status_enum, server_default="pending"),
        sa.Column("tracking_number", sa.String(120), server_default=""),
        sa.Column("tracking_carrier", sa.String(120), server_default=""),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )

    op.create_table(
        "order_items",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("order_id", sa.Integer, sa.ForeignKey("orders.id"), nullable=False),
        sa.Column("variant_id", sa.Integer, sa.ForeignKey("product_variants.id"), nullable=False),
        sa.Column("product_name", sa.String(200), nullable=False),
        sa.Column("variant_label", sa.String(200), nullable=False),
        sa.Column("unit_price_cents", sa.Integer, nullable=False),
        sa.Column("quantity", sa.Integer, nullable=False),
    )


def downgrade() -> None:
    op.drop_table("order_items")
    op.drop_table("orders")
    op.drop_table("store_settings")
    op.drop_table("admin_users")
    op.drop_table("product_variants")
    op.drop_table("products")
    order_status_enum.drop(op.get_bind(), checkfirst=True)
    payment_method_enum.drop(op.get_bind(), checkfirst=True)
