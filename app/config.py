from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    environment: str = "development"

    database_url: str = "postgresql+psycopg://siteapp:devpassword@db:5432/siteapp"

    site_name: str = "McKay's Woodshop"
    domain: str = "localhost"
    base_url: str = "http://localhost:8000"

    admin_session_secret: str = "change-me-dev-only-not-secure"

    default_domestic_shipping_cents: int = 500
    default_intl_shipping_cents: int = 1800
    default_currency: str = "usd"

    # Fallback flat rates are still used if Shippo has no API key configured
    # or a live rate lookup fails (spec: never block checkout on a carrier API).
    shippo_api_key: str = ""
    shop_address_name: str = "McKay's Woodshop"
    shop_address_street1: str = ""
    shop_address_street2: str = ""
    shop_address_city: str = ""
    shop_address_state: str = ""
    shop_address_zip: str = ""
    shop_address_country: str = "US"
    shop_address_phone: str = ""

    stripe_secret_key: str = ""
    stripe_publishable_key: str = ""
    stripe_webhook_secret: str = ""

    coinbase_commerce_api_key: str = ""
    coinbase_webhook_shared_secret: str = ""
    enable_crypto_checkout: bool = False

    email_provider: str = "console"
    email_from: str = "orders@example.com"
    notify_admin_email: str = "you@example.com"
    postmark_server_token: str = ""
    sendgrid_api_key: str = ""
    aws_ses_region: str = ""
    aws_access_key_id: str = ""
    aws_secret_access_key: str = ""

    @property
    def is_production(self) -> bool:
        return self.environment.lower() == "production"


@lru_cache
def get_settings() -> Settings:
    settings = Settings()

    if settings.is_production:
        problems = []
        if settings.admin_session_secret == "change-me-dev-only-not-secure":
            problems.append("ADMIN_SESSION_SECRET is still the placeholder value")
        if settings.stripe_secret_key.startswith("sk_test_") or not settings.stripe_secret_key:
            problems.append("STRIPE_SECRET_KEY is missing or still a test key")
        if not settings.stripe_webhook_secret:
            problems.append("STRIPE_WEBHOOK_SECRET is not set — Stripe webhooks cannot be verified")
        if settings.enable_crypto_checkout and not settings.coinbase_webhook_shared_secret:
            problems.append("Crypto checkout enabled but COINBASE_WEBHOOK_SHARED_SECRET is not set")
        if problems:
            raise RuntimeError(
                "Refusing to start in production with unsafe configuration:\n- "
                + "\n- ".join(problems)
            )

    return settings
