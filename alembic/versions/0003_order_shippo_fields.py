"""add shippo rate id and label url to orders

Revision ID: 0003
Revises: 0002
Create Date: 2026-09-16

"""
from alembic import op
import sqlalchemy as sa

revision = "0003"
down_revision = "0002"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        "orders",
        sa.Column("shippo_rate_id", sa.String(64), server_default="", nullable=False),
    )
    op.add_column(
        "orders",
        sa.Column("label_url", sa.String(500), server_default="", nullable=False),
    )


def downgrade() -> None:
    op.drop_column("orders", "label_url")
    op.drop_column("orders", "shippo_rate_id")
