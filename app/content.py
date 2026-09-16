"""
Loads blog posts from Markdown files in app/content/posts/.

No database, no admin UI for content by design (see spec §3/§7) — you edit
files and redeploy. In production we cache the parsed posts for a short
time so we're not re-parsing Markdown on every request; in development
caching is disabled so edits show up immediately on refresh.
"""
import re
import time
from dataclasses import dataclass
from pathlib import Path

import frontmatter
import markdown as md

from app.config import get_settings

settings = get_settings()
POSTS_DIR = Path(__file__).parent / "content" / "posts"

_CACHE_TTL_SECONDS = 0 if not settings.is_production else 60
_cache: dict = {"posts": None, "loaded_at": 0.0}

_SNIPPET_MAX_CHARS = 220


@dataclass
class Post:
    slug: str
    title: str
    date: str
    summary: str
    tags: list[str]
    html: str
    snippet: str


def _make_snippet(html: str, max_chars: int = _SNIPPET_MAX_CHARS) -> str:
    """A plain-text teaser pulled from the rendered post body, for the
    homepage's featured-post card (distinct from the frontmatter summary)."""
    text = re.sub(r"<[^>]+>", " ", html)
    text = re.sub(r"\s+", " ", text).strip()
    text = re.sub(r"\s+([,;:!?])", r"\1", text)
    if len(text) <= max_chars:
        return text
    return text[:max_chars].rsplit(" ", 1)[0] + "…"


def _load_all() -> list[Post]:
    posts = []
    if not POSTS_DIR.exists():
        return posts

    for path in sorted(POSTS_DIR.glob("*.md")):
        fm = frontmatter.load(path)
        html = md.markdown(fm.content, extensions=["fenced_code", "tables"])
        posts.append(
            Post(
                slug=fm.get("slug", path.stem),
                title=fm.get("title", path.stem),
                date=str(fm.get("date", "")),
                summary=fm.get("summary", ""),
                tags=fm.get("tags", []) or [],
                html=html,
                snippet=_make_snippet(html),
            )
        )
    posts.sort(key=lambda p: p.date, reverse=True)
    return posts


def get_all_posts() -> list[Post]:
    now = time.time()
    if _cache["posts"] is None or (now - _cache["loaded_at"]) > _CACHE_TTL_SECONDS:
        _cache["posts"] = _load_all()
        _cache["loaded_at"] = now
    return _cache["posts"]


def get_post_by_slug(slug: str) -> Post | None:
    for post in get_all_posts():
        if post.slug == slug:
            return post
    return None
