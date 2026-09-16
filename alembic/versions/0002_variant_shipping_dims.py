"""add shipping dimensions to product_variants

Revision ID: 0002
Revises: 0001
Create Date: 2026-09-16

"""
from alembic import op
import sqlalchemy as sa

revision = "0002"
down_revision = "0001"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        "product_variants",
        sa.Column("weight_oz", sa.Float, server_default="8.0", nullable=False),
    )
    op.add_column(
        "product_variants",
        sa.Column("length_in", sa.Float, server_default="6.0", nullable=False),
    )
    op.add_column(
        "product_variants",
        sa.Column("width_in", sa.Float, server_default="6.0", nullable=False),
    )
    op.add_column(
        "product_variants",
        sa.Column("height_in", sa.Float, server_default="6.0", nullable=False),
    )


def downgrade() -> None:
    op.drop_column("product_variants", "height_in")
    op.drop_column("product_variants", "width_in")
    op.drop_column("product_variants", "length_in")
    op.drop_column("product_variants", "weight_oz")
