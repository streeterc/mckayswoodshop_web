from itsdangerous import URLSafeTimedSerializer, BadSignature, SignatureExpired
from passlib.context import CryptContext
from fastapi import Request, HTTPException, status

from app.config import get_settings

settings = get_settings()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SESSION_COOKIE_NAME = "admin_session"
SESSION_MAX_AGE_SECONDS = 60 * 60 * 8  # 8 hours

_serializer = URLSafeTimedSerializer(settings.admin_session_secret, salt="admin-auth")


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(password: str, password_hash: str) -> bool:
    return pwd_context.verify(password, password_hash)


def create_session_token(username: str) -> str:
    return _serializer.dumps({"u": username})


def read_session_token(token: str) -> str | None:
    try:
        data = _serializer.loads(token, max_age=SESSION_MAX_AGE_SECONDS)
        return data.get("u")
    except (BadSignature, SignatureExpired):
        return None


def require_admin(request: Request) -> str:
    """FastAPI dependency: raises 303 redirect-to-login if not authenticated."""
    token = request.cookies.get(SESSION_COOKIE_NAME)
    username = read_session_token(token) if token else None
    if not username:
        raise HTTPException(
            status_code=status.HTTP_303_SEE_OTHER,
            headers={"Location": "/admin/login"},
        )
    return username
