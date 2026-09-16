"""restructure quote_requests for the multi-step quote wizard

Revision ID: 0005
Revises: 0004
Create Date: 2026-09-16

"""
from alembic import op
import sqlalchemy as sa

revision = "0005"
down_revision = "0004"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        "quote_requests",
        sa.Column("category", sa.String(30), server_default="other", nullable=False),
    )
    op.add_column(
        "quote_requests",
        sa.Column("size_in", sa.Integer(), server_default="0", nullable=False),
    )
    op.add_column(
        "quote_requests",
        sa.Column("wall_in", sa.Integer(), server_default="0", nullable=False),
    )
    op.add_column(
        "quote_requests",
        sa.Column("room", sa.String(60), server_default="", nullable=False),
    )
    op.add_column(
        "quote_requests",
        sa.Column("material", sa.String(60), server_default="", nullable=False),
    )
    op.add_column(
        "quote_requests",
        sa.Column("exposure", sa.String(20), server_default="", nullable=False),
    )
    op.add_column(
        "quote_requests",
        sa.Column("timeline", sa.String(40), server_default="", nullable=False),
    )
    op.add_column(
        "quote_requests",
        sa.Column("photo_count", sa.Integer(), server_default="0", nullable=False),
    )
    op.add_column(
        "quote_requests",
        sa.Column("contact_method", sa.String(20), server_default="", nullable=False),
    )
    op.alter_column("quote_requests", "phone", server_default="", nullable=False)
    op.alter_column("quote_requests", "marketing_notes", new_column_name="notes")
    op.drop_column("quote_requests", "project_details")


def downgrade() -> None:
    op.add_column(
        "quote_requests",
        sa.Column("project_details", sa.Text(), server_default="", nullable=False),
    )
    op.alter_column("quote_requests", "notes", new_column_name="marketing_notes")
    op.alter_column("quote_requests", "phone", server_default=None, nullable=False)
    op.drop_column("quote_requests", "contact_method")
    op.drop_column("quote_requests", "photo_count")
    op.drop_column("quote_requests", "timeline")
    op.drop_column("quote_requests", "exposure")
    op.drop_column("quote_requests", "material")
    op.drop_column("quote_requests", "room")
    op.drop_column("quote_requests", "wall_in")
    op.drop_column("quote_requests", "size_in")
    op.drop_column("quote_requests", "category")
