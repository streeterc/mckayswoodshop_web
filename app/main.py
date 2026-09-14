from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from app.config import get_settings
from app.routers import content, store, checkout, webhooks, admin

settings = get_settings()

app = FastAPI(title=settings.site_name, docs_url=None if settings.is_production else "/docs")

app.mount("/static", StaticFiles(directory="app/static"), name="static")

app.include_router(content.router)
app.include_router(store.router)
app.include_router(checkout.router)
app.include_router(webhooks.router)
app.include_router(admin.router)


@app.get("/healthz")
def healthz():
    return {"status": "ok"}
