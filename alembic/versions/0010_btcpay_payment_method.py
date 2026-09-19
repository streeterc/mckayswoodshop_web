"""rename coinbase to btcpay in paymentmethod enum

Coinbase Commerce is replaced by a self-hosted BTCPay Server (BTC only) —
see app/btcpay.py and docker-compose.btcpay.yml. This is a pre-launch site
(per CLAUDE.md's open-items list), so any existing "coinbase" rows are
just relabeled rather than needing a data-preserving dual-value migration.

Revision ID: 0010
Revises: 0009
Create Date: 2026-09-18

"""
from alembic import op

revision = "0010"
down_revision = "0009"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.execute("ALTER TYPE paymentmethod RENAME VALUE 'coinbase' TO 'btcpay'")


def downgrade() -> None:
    op.execute("ALTER TYPE paymentmethod RENAME VALUE 'btcpay' TO 'coinbase'")
