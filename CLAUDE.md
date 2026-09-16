# McKay's Woodshop — Project Summary & Instructions

Repo: https://github.com/streeterc/mckayswoodshop_web

## 1. What this project is

Eric McKay's personal site: a Markdown-driven blog/portfolio with a small embedded store, supporting both fiat (Stripe) and crypto (Coinbase Commerce) checkout.

**Stack:** FastAPI + Jinja2 + HTMX + PostgreSQL + Docker Compose + Nginx/Certbot. There's deliberately no frontend build step — templates are server-rendered, styled with plain CSS custom properties, and there's no npm/webpack/bundler in the loop.

**Core design principle:** local dev and production run the *same containers*. Only the `.env` file's values and whether Nginx/Certbot is included in the Compose stack differ. There's no "rewrite for prod" step.

## 2. Directory layout

```
mckayswoodshop-web/
├── app/                        # FastAPI application
│   ├── main.py                 # App factory, mounts routers + static
│   ├── config.py                # Settings from environment (pydantic-settings)
│   ├── database.py              # SQLAlchemy engine/session
│   ├── models.py                # ORM models (Product, Variant, Order, AdminUser, StoreSettings)
│   ├── schemas.py                # Pydantic request/response schemas
│   ├── security.py               # Admin session auth, password hashing
│   ├── email.py                   # Transactional email sending (provider-agnostic)
│   ├── cart.py                     # Guest cart (signed cookie) + cart→row resolution
│   ├── content.py                   # Markdown loader/renderer for blog posts
│   ├── routers/
│   │   ├── content.py                # Home, paginated post list (/blog), post detail
│   │   ├── store.py                   # Product listing/detail, cart (session-based)
│   │   ├── checkout.py                 # Checkout flow, Stripe session + Coinbase charge creation
│   │   ├── webhooks.py                  # Stripe + Coinbase webhook receivers (signature-verified)
│   │   └── admin.py                      # Password-protected admin dashboard (orders, stock)
│   ├── templates/                          # Jinja2 + HTMX templates, no build step
│   │   ├── base.html                        # Header/nav/footer shell
│   │   ├── _macros.html                      # Shared partials (section headings, post cards)
│   │   ├── content/                           # Home, all-posts list, post detail
│   │   ├── store/                              # Shop, product, cart, checkout
│   │   └── admin/
│   ├── static/
│   │   ├── css/
│   │   │   ├── base.css                          # Design tokens (color/type/space/radius) + primitives
│   │   │   ├── typography.css                     # Type rules built on those tokens
│   │   │   ├── style.css                           # Header/footer chrome
│   │   │   └── tokens/                              # Canonical brand tokens (colors, fonts, spacing…)
│   │   └── img/                                      # Logo + brand glyph assets
│   └── content/posts/                                # Blog posts as .md files (frontmatter + Markdown)
├── alembic/                     # DB migrations
├── nginx/
│   ├── nginx.dev.conf
│   └── nginx.prod.conf           # Adds SSL/Certbot config, used only in prod
├── docker-compose.yml             # Local dev (hot reload, no Nginx/SSL needed)
├── docker-compose.prod.yml         # Production overlay (Nginx + Certbot + restart policies)
├── .env.example                     # Copy to .env.dev and .env.prod
├── Makefile                          # make up / make down / make migrate / make deploy
└── scripts/
    ├── init_db.py                     # Seed an initial admin user
    ├── init_certbot.sh                 # Obtain/renew the TLS cert on the droplet
    └── deploy.sh                        # Rsync + restart on the droplet
```

There's also a top-level `McKay's Woodshop Design System/` folder alongside `app/`, `alembic/`, `nginx/`, and `scripts/` in the repo root.

## 3. Local development — step by step

**Prerequisites:** Docker + Docker Compose. Python 3.12 only needed if running things outside Docker.

```bash
git clone <your-repo-url> mckayswoodshop-web
cd mckayswoodshop-web
cp .env.example .env.dev
```

Edit `.env.dev`:
- Leave `ENVIRONMENT=development`
- Fill in **test-mode** Stripe keys (`sk_test_...`, `pk_test_...`)
- Fill in Coinbase Commerce sandbox/test key, or leave blank to disable crypto checkout locally
- Set `EMAIL_PROVIDER=console` so emails print to the terminal instead of sending

Bring it up:

```bash
make up          # docker compose up --build
make migrate     # runs alembic upgrade head inside the web container
make seed-admin  # creates your admin login (prompts for username/password)
```

Then visit:
- `http://localhost:8000/` — home, featuring the latest post
- `http://localhost:8000/blog` — all posts, paginated 3/page
- `http://localhost:8000/shop` — the store
- `http://localhost:8000/admin` — admin dashboard

### Adding blog posts

Drop `.md` files into `app/content/posts/` with frontmatter:

```markdown
---
title: "My First Post"
date: 2026-09-14
slug: my-first-post
summary: "A short teaser shown on the post list"
tags: [personal, updates]
---

Your Markdown content here.
```

- The homepage always features the single most recent post by `date`.
- `/blog` lists everything newest-first, 3/page, `?page=N` pagination.
- Each post lives at `/blog/{slug}` — slugs must be unique or pages collide.
- No redeploy needed — content is re-read from disk on request (briefly cached in prod).

### Testing payments locally

- **Stripe:** `stripe listen --forward-to localhost:8000/webhooks/stripe`, test card `4242 4242 4242 4242`.
- **Coinbase Commerce:** sandbox is limited — easiest path is testing end-to-end against production with a $0.01–1.00 test product before launch, or manually mocking the webhook payload against `/webhooks/coinbase`.

## 4. Design system

Palette: forest green + copper + warm sand. Headings in Newsreader (serif), UI text in Work Sans, prices/dates/specs in IBM Plex Mono. Tight "machined" corner radii, flat cards with no shadow at rest.

All of this lives as CSS custom properties in `app/static/css/base.css` and `app/static/css/tokens/`. No component library, no build step — templates reference tokens directly (`var(--forest)`, `var(--clay)`, `var(--radius-md)`) and layout uses a small set of flexbox utilities (`.shell`, `.grid`, `.grid-2-up`/`.grid-3-up`, `.bleed`). Check `app/templates/_macros.html` before adding new markup — repeated patterns (section headings, post cards) are already factored out there.

> Note: this README's palette/type description (Newsreader + copper/sand) is from the repo itself — your project notes describe a different pairing already agreed for this site (forest green `#143525`, clay/terracotta `#d17f50`, parchment `#f2e9d8`, Work Sans headings + Karla body). Worth reconciling which is current before touching `base.css` or the token files.

## 5. Deploying to the DigitalOcean droplet

1. Provision the droplet — Ubuntu LTS, install Docker + Compose plugin.
2. Point DNS — A record for your domain → droplet IP.
3. Copy the repo to the droplet (`git clone`, or `scripts/deploy.sh` to rsync).
4. `cp .env.example .env.prod` and fill in:
   - `ENVIRONMENT=production`
   - **Live** Stripe keys
   - Live Coinbase Commerce API key + webhook shared secret
   - Real email provider creds (`EMAIL_PROVIDER=postmark|sendgrid|ses`)
   - Strong `ADMIN_SESSION_SECRET` (`openssl rand -hex 32`)
   - `DOMAIN=yourdomain.com`
5. Bring the stack up (Nginx starts in HTTP-only bootstrap mode first, since it can't run the HTTPS config before a cert exists):
   ```bash
   make prod-up
   make prod-migrate
   ```
6. Get the cert and switch Nginx to HTTPS:
   ```bash
   ./scripts/init_certbot.sh yourdomain.com you@yourdomain.com
   ```
7. Seed the admin user on the droplet:
   ```bash
   docker compose -f docker-compose.yml -f docker-compose.prod.yml exec web python scripts/init_db.py
   ```
8. Confirm `https://yourdomain.com` loads, then register **live** webhook endpoints in the Stripe and Coinbase dashboards, pointing at `/webhooks/stripe` and `/webhooks/coinbase`.

For future code-only deploys (cert already issued):
```bash
./scripts/deploy.sh user@droplet-ip /path/on/droplet
# or, directly on the droplet:
git pull && make prod-up && make prod-migrate
```

## 6. Open items before launch (per repo README)

| Item | Where to set it |
|---|---|
| Transactional email provider | `EMAIL_PROVIDER` in `.env` |
| Flat shipping rates (domestic/intl) | Admin dashboard → Settings, or `DEFAULT_DOMESTIC_SHIPPING_CENTS`/`DEFAULT_INTL_SHIPPING_CENTS` env vars |
| Stripe country/payout support | Check stripe.com/global before going live |
| Domain + DNS | `DOMAIN` env var |
| Real product/hero photography | Currently render as labeled `.photo-placeholder` boxes until real images land in `app/static/img/` |

> Note: the flat-shipping-rate item above is the README's original spec. Your project notes say this is being replaced with live carrier rate quotes via Shippo — address collected on-site before Stripe, a new `/checkout/rates` step calling Shippo before `/checkout/pay` creates the Stripe session, and new `weight_oz`/`length_in`/`width_in`/`height_in` fields on the `Variant` model, editable per-variant in the admin dashboard. That work isn't reflected in the current README/repo state described above — worth checking whether it's landed in a branch, or still to be built against `models.py`, `routers/checkout.py`, and `routers/store.py`.

## 7. Security checklist before going live

- [ ] Admin password strong/unique; consider IP allowlisting in `nginx.prod.conf`
- [ ] `ADMIN_SESSION_SECRET` is a real random value, not a placeholder
- [ ] Stripe/Coinbase webhook signature verification on (`STRIPE_WEBHOOK_SECRET`, `COINBASE_WEBHOOK_SHARED_SECRET` set — app refuses to start in prod without them)
- [ ] `.env.prod` not committed to git (already gitignored)
- [ ] HTTPS enforced (Nginx redirects HTTP→HTTPS in prod)
- [ ] Database not exposed on a public port in `docker-compose.prod.yml`