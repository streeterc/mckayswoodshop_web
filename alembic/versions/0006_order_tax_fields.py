"""add tax fields to orders

Revision ID: 0006
Revises: 0005
Create Date: 2026-09-16

"""
from alembic import op
import sqlalchemy as sa

revision = "0006"
down_revision = "0005"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        "orders",
        sa.Column("tax_cents", sa.Integer(), server_default="0", nullable=False),
    )
    op.add_column(
        "orders",
        sa.Column("tax_calculation_id", sa.String(64), server_default="", nullable=False),
    )


def downgrade() -> None:
    op.drop_column("orders", "tax_calculation_id")
    op.drop_column("orders", "tax_cents")
