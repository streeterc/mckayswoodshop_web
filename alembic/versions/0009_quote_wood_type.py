"""add wood_type to quote_requests

Revision ID: 0009
Revises: 0008
Create Date: 2026-09-18

"""
from alembic import op
import sqlalchemy as sa

revision = "0009"
down_revision = "0008"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        "quote_requests",
        sa.Column("wood_type", sa.String(60), server_default="", nullable=False),
    )


def downgrade() -> None:
    op.drop_column("quote_requests", "wood_type")
