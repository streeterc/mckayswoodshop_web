from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates

from app.content import get_all_posts, get_post_by_slug

router = APIRouter()
templates = Jinja2Templates(directory="app/templates")


@router.get("/")
def homepage(request: Request):
    posts = get_all_posts()
    return templates.TemplateResponse(
        "content/home.html", {"request": request, "posts": posts}
    )


@router.get("/blog")
def blog_list():
    return RedirectResponse(url="/")


@router.get("/blog/{slug}")
def blog_post(request: Request, slug: str):
    post = get_post_by_slug(slug)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return templates.TemplateResponse(
        "content/post_detail.html", {"request": request, "post": post}
    )
