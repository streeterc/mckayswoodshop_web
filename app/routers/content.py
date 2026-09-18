from fastapi import APIRouter, Request, HTTPException, Depends, Form, UploadFile, File
from fastapi.templating import Jinja2Templates
from sqlalchemy.orm import Session
from pydantic import ValidationError

from app.content import get_all_posts, get_post_by_slug
from app.database import get_db
from app.models import QuoteRequest
from app.schemas import QuoteRequestIn, QUOTE_CATEGORIES
from app.email import send_email
from app.config import get_settings

router = APIRouter()
templates = Jinja2Templates(directory="app/templates")
settings = get_settings()

POSTS_PER_PAGE = 3


@router.get("/")
def homepage(request: Request):
    posts = get_all_posts()
    return templates.TemplateResponse(
        "content/home.html", {"request": request, "posts": posts}
    )


@router.get("/blog")
def blog_list(request: Request, page: int = 1):
    all_posts = get_all_posts()
    total_pages = max((len(all_posts) + POSTS_PER_PAGE - 1) // POSTS_PER_PAGE, 1)
    page = max(1, min(page, total_pages))
    start = (page - 1) * POSTS_PER_PAGE
    posts = all_posts[start : start + POSTS_PER_PAGE]
    return templates.TemplateResponse(
        "content/post_list.html",
        {
            "request": request,
            "posts": posts,
            "page": page,
            "has_prev": page > 1,
            "has_next": page < total_pages,
        },
    )


@router.get("/blog/{slug}")
def blog_post(request: Request, slug: str):
    post = get_post_by_slug(slug)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return templates.TemplateResponse(
        "content/post_detail.html", {"request": request, "post": post}
    )


MAX_QUOTE_PHOTOS = 3
MAX_PHOTO_BYTES = 6 * 1024 * 1024  # 6MB/photo — keeps a 3-photo email under most providers' size caps


@router.post("/quote")
async def quote_submit(
    request: Request,
    db: Session = Depends(get_db),
    category: str = Form(...),
    size_in: int = Form(...),
    wall_in: int = Form(0),
    room: str = Form(""),
    material: str = Form(""),
    exposure: str = Form(""),
    repair_type: str = Form(""),
    wood_type: str = Form(""),
    timeline: str = Form(...),
    contact_method: str = Form(""),
    name: str = Form(...),
    phone: str = Form(""),
    email: str = Form(""),
    city: str = Form(...),
    notes: str = Form(""),
    photos: list[UploadFile] = File(default=[]),
):
    photos = [p for p in photos if p.filename]

    attachments = []
    for photo in photos[:MAX_QUOTE_PHOTOS]:
        content_type = photo.content_type or ""
        if not content_type.startswith("image/"):
            continue
        raw = await photo.read()
        if not raw or len(raw) > MAX_PHOTO_BYTES:
            continue
        attachments.append((photo.filename, raw, content_type))

    try:
        data = QuoteRequestIn(
            category=category, size_in=size_in, wall_in=wall_in, room=room,
            material=material, exposure=exposure, repair_type=repair_type,
            wood_type=wood_type, timeline=timeline,
            photo_count=len(attachments), name=name,
            phone=phone, email=email, city=city,
            contact_method=contact_method, notes=notes,
        )
    except ValidationError:
        return templates.TemplateResponse(
            "content/_quote_form.html",
            {
                "request": request,
                "error": "Something didn't look right — please fill out the form again.",
            },
        )

    quote = QuoteRequest(
        category=data.category, size_in=data.size_in, wall_in=data.wall_in,
        room=data.room, material=data.material, exposure=data.exposure,
        repair_type=data.repair_type, wood_type=data.wood_type,
        timeline=data.timeline, photo_count=data.photo_count, name=data.name,
        phone=data.phone, email=data.email, city=data.city,
        contact_method=data.contact_method, notes=data.notes,
    )
    db.add(quote)
    db.commit()

    category_label = QUOTE_CATEGORIES.get(data.category, data.category)
    lines = [
        f"<p><strong>Project:</strong> {category_label}</p>",
        f"<p><strong>Approximate size:</strong> {data.size_in} in</p>",
    ]
    if data.category == "builtins":
        lines.append(f"<p><strong>Wall width:</strong> {data.wall_in} in</p>")
    if data.room:
        lines.append(f"<p><strong>Room / setting:</strong> {data.room}</p>")
    if data.material:
        lines.append(f"<p><strong>Material:</strong> {data.material}</p>")
    if data.category == "outdoor" and data.exposure:
        lines.append(f"<p><strong>Exposure:</strong> {data.exposure.title()}</p>")
    if data.category == "restoration" and data.repair_type:
        lines.append(f"<p><strong>Repair type:</strong> {data.repair_type}</p>")
    if data.category == "restoration" and data.wood_type:
        lines.append(f"<p><strong>Wood type:</strong> {data.wood_type}</p>")
    lines.append(f"<p><strong>Timeline:</strong> {data.timeline}</p>")
    lines.append(f"<p><strong>Photos attached:</strong> {len(attachments)}</p>")
    lines.append(f"<p><strong>Name:</strong> {data.name}</p>")
    lines.append(f"<p><strong>City:</strong> {data.city}</p>")
    lines.append(f"<p><strong>Phone:</strong> {data.phone or '—'}</p>")
    lines.append(f"<p><strong>Email:</strong> {data.email or '—'}</p>")
    if data.contact_method:
        lines.append(f"<p><strong>Prefers:</strong> {data.contact_method}</p>")
    if data.notes:
        lines.append(f"<p><strong>Other details:</strong><br>{data.notes}</p>")

    send_email(
        to=settings.notify_admin_email,
        subject=f"New quote request — {data.name} ({category_label})",
        html_body="".join(lines),
        attachments=attachments,
    )

    return templates.TemplateResponse(
        "content/_quote_success.html", {"request": request, "quote": quote, "category_label": category_label}
    )
