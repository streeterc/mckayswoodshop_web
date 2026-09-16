"""
Provider-agnostic transactional email.

Swap providers purely via EMAIL_PROVIDER in .env — no code changes needed
elsewhere in the app, since routers only ever call `send_email(...)`.
"""
import base64
import logging

import httpx

from app.config import get_settings

logger = logging.getLogger("email")
settings = get_settings()

# (filename, raw bytes, content type)
Attachment = tuple[str, bytes, str]


def send_email(
    to: str,
    subject: str,
    html_body: str,
    text_body: str = "",
    attachments: list[Attachment] | None = None,
) -> None:
    attachments = attachments or []
    provider = settings.email_provider.lower()

    if provider == "console":
        logger.info("=== EMAIL (console provider) ===")
        logger.info("To: %s", to)
        logger.info("Subject: %s", subject)
        logger.info("Body:\n%s", text_body or html_body)
        for filename, content, content_type in attachments:
            logger.info("Attachment: %s (%s, %d bytes)", filename, content_type, len(content))
        return

    if provider == "postmark":
        _send_postmark(to, subject, html_body, text_body, attachments)
    elif provider == "sendgrid":
        _send_sendgrid(to, subject, html_body, text_body, attachments)
    elif provider == "ses":
        _send_ses(to, subject, html_body, text_body)
    else:
        raise ValueError(f"Unknown EMAIL_PROVIDER: {provider}")


def _send_postmark(
    to: str, subject: str, html_body: str, text_body: str, attachments: list[Attachment]
) -> None:
    payload = {
        "From": settings.email_from,
        "To": to,
        "Subject": subject,
        "HtmlBody": html_body,
        "TextBody": text_body or html_body,
    }
    if attachments:
        payload["Attachments"] = [
            {"Name": filename, "Content": base64.b64encode(content).decode(), "ContentType": content_type}
            for filename, content, content_type in attachments
        ]
    resp = httpx.post(
        "https://api.postmarkapp.com/email",
        headers={
            "X-Postmark-Server-Token": settings.postmark_server_token,
            "Content-Type": "application/json",
        },
        json=payload,
        timeout=30,
    )
    resp.raise_for_status()


def _send_sendgrid(
    to: str, subject: str, html_body: str, text_body: str, attachments: list[Attachment]
) -> None:
    payload = {
        "personalizations": [{"to": [{"email": to}]}],
        "from": {"email": settings.email_from},
        "subject": subject,
        "content": [
            {"type": "text/plain", "value": text_body or html_body},
            {"type": "text/html", "value": html_body},
        ],
    }
    if attachments:
        payload["attachments"] = [
            {
                "content": base64.b64encode(content).decode(),
                "filename": filename,
                "type": content_type,
                "disposition": "attachment",
            }
            for filename, content, content_type in attachments
        ]
    resp = httpx.post(
        "https://api.sendgrid.com/v3/mail/send",
        headers={
            "Authorization": f"Bearer {settings.sendgrid_api_key}",
            "Content-Type": "application/json",
        },
        json=payload,
        timeout=30,
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
