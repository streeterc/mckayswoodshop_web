"""add quote_requests table

Revision ID: 0004
Revises: 0003
Create Date: 2026-09-16

"""
from alembic import op
import sqlalchemy as sa

revision = "0004"
down_revision = "0003"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "quote_requests",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("name", sa.String(200), nullable=False),
        sa.Column("phone", sa.String(40), nullable=False),
        sa.Column("email", sa.String(255), server_default="", nullable=False),
        sa.Column("city", sa.String(120), nullable=False),
        sa.Column("project_details", sa.Text(), nullable=False),
        sa.Column("marketing_notes", sa.Text(), server_default="", nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
    )


def downgrade() -> None:
    op.drop_table("quote_requests")
