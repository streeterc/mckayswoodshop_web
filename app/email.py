"""
Provider-agnostic transactional email.

Swap providers purely via EMAIL_PROVIDER in .env — no code changes needed
elsewhere in the app, since routers only ever call `send_email(...)`.
"""
import logging

import httpx

from app.config import get_settings

logger = logging.getLogger("email")
settings = get_settings()


def send_email(to: str, subject: str, html_body: str, text_body: str = "") -> None:
    provider = settings.email_provider.lower()

    if provider == "console":
        logger.info("=== EMAIL (console provider) ===")
        logger.info("To: %s", to)
        logger.info("Subject: %s", subject)
        logger.info("Body:\n%s", text_body or html_body)
        return

    if provider == "postmark":
        _send_postmark(to, subject, html_body, text_body)
    elif provider == "sendgrid":
        _send_sendgrid(to, subject, html_body, text_body)
    elif provider == "ses":
        _send_ses(to, subject, html_body, text_body)
    else:
        raise ValueError(f"Unknown EMAIL_PROVIDER: {provider}")


def _send_postmark(to: str, subject: str, html_body: str, text_body: str) -> None:
    resp = httpx.post(
        "https://api.postmarkapp.com/email",
        headers={
            "X-Postmark-Server-Token": settings.postmark_server_token,
            "Content-Type": "application/json",
        },
        json={
            "From": settings.email_from,
            "To": to,
            "Subject": subject,
            "HtmlBody": html_body,
            "TextBody": text_body or html_body,
        },
        timeout=10,
    )
    resp.raise_for_status()


def _send_sendgrid(to: str, subject: str, html_body: str, text_body: str) -> None:
    resp = httpx.post(
        "https://api.sendgrid.com/v3/mail/send",
        headers={
            "Authorization": f"Bearer {settings.sendgrid_api_key}",
            "Content-Type": "application/json",
        },
        json={
            "personalizations": [{"to": [{"email": to}]}],
            "from": {"email": settings.email_from},
            "subject": subject,
            "content": [
                {"type": "text/plain", "value": text_body or html_body},
                {"type": "text/html", "value": html_body},
            ],
        },
        timeout=10,
    )
    resp.raise_for_status()


def _send_ses(to: str, subject: str, html_body: str, text_body: str) -> None:
    # Uses SES's SMTP-free HTTP API via boto3 would normally be preferred;
    # kept as httpx call to SES v2 REST endpoint with SigV4 is nontrivial to
    # inline here — recommend installing boto3 and swapping this function's
    # body for `boto3.client("sesv2").send_email(...)` if you choose SES.
    raise NotImplementedError(
        "SES sending needs boto3 + AWS credentials wired up — see comment in app/email.py"
    )
