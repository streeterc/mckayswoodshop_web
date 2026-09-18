"""add repair_type to quote_requests

Revision ID: 0008
Revises: 0007
Create Date: 2026-09-18

"""
from alembic import op
import sqlalchemy as sa

revision = "0008"
down_revision = "0007"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        "quote_requests",
        sa.Column("repair_type", sa.String(40), server_default="", nullable=False),
    )


def downgrade() -> None:
    op.drop_column("quote_requests", "repair_type")
