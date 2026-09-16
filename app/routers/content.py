from fastapi import APIRouter, Request, HTTPException
from fastapi.templating import Jinja2Templates

from app.content import get_all_posts, get_post_by_slug

router = APIRouter()
templates = Jinja2Templates(directory="app/templates")

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
