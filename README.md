# McKay's Woodshop — Content Site + Store

Eric McKay's personal site: a Markdown-driven blog/portfolio with an embedded
small-catalog store supporting fiat (Stripe) and crypto (Coinbase Commerce)
checkout.

Stack: **FastAPI + Jinja2 + HTMX + PostgreSQL + Docker Compose + Nginx/Certbot**.
No frontend build step — templates are server-rendered and styled with plain
CSS custom properties, so there's no npm/webpack/bundler in the loop.

This repo is built so that **local dev and production are the same containers**,
just with different `.env` files and a different Compose file. There is no
"rewrite it for prod" step — you build the habit locally, then point it at a
droplet.

---

## 1. Directory layout

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

**Why this matters for "easy migration":** the only things that differ between
your laptop and the droplet are (1) the `.env` file's values and (2) whether
Nginx/Certbot is in the Compose stack. The app code, Dockerfile, and DB schema
are identical in both places.

---

## 2. Local development setup

### Prerequisites
- Docker + Docker Compose installed locally
- Python 3.12 only needed if you want to run things outside Docker (optional)

### Steps

```bash
git clone <your-repo-url> mckayswoodshop-web
cd mckayswoodshop-web
cp .env.example .env.dev
```

Edit `.env.dev`:
- Leave `ENVIRONMENT=development`
- Fill in **test-mode** Stripe keys (`sk_test_...`, `pk_test_...`) from your Stripe dashboard
- Fill in Coinbase Commerce **sandbox/test** API key if available, or leave blank to disable crypto checkout locally
- `EMAIL_PROVIDER=console` — this makes emails print to the terminal instead of actually sending, so you don't need email provider credentials to develop

Then:

```bash
make up          # docker compose up --build
make migrate     # runs alembic upgrade head inside the web container
make seed-admin  # creates your admin login (prompts for username/password)
```

Visit:
- `http://localhost:8000/` — home, with the latest blog post featured
- `http://localhost:8000/blog` — all posts, paginated 3 at a time
- `http://localhost:8000/shop` — the store
- `http://localhost:8000/admin` — admin dashboard (login with seeded credentials)

### Blog posts

Drop `.md` files into `app/content/posts/`, each with frontmatter:

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

- The homepage always features the single most recent post (by `date`), with
  a title, the frontmatter `summary`, and an auto-generated plain-text
  **snippet** pulled from the rendered post body (see `_make_snippet` in
  `app/content.py`).
- `/blog` lists every post, newest first, 3 per page, with `?page=N` pagination.
- Each post's own page lives at `/blog/{slug}` — give every post a distinct
  `slug` in its frontmatter, or duplicate files will collide on the same URL.

No redeploy needed in dev — the content loader re-reads the folder on request
(cached briefly in prod, see `content.py`).

### Testing payments locally
- **Stripe**: use the Stripe CLI (`stripe listen --forward-to localhost:8000/webhooks/stripe`) to forward webhook events to your local server, and Stripe's test card `4242 4242 4242 4242`.
- **Coinbase Commerce**: their sandbox is limited; easiest is to build/test the flow end-to-end against production with a $0.01–1.00 test product before real launch, or mock the webhook payload manually against `/webhooks/coinbase`.

---

## 3. Design system

The visual language (forest green + copper + warm sand palette, Newsreader
serif headings over Work Sans UI text, IBM Plex Mono for prices/dates/specs,
tight "machined" corner radii, flat cards with no shadow at rest) lives as
plain CSS custom properties in `app/static/css/base.css` and
`app/static/css/tokens/`. There's no component library or build step —
templates just reference the tokens directly (`var(--forest)`, `var(--clay)`,
`var(--radius-md)`, etc.) and layouts are done with a small set of flexbox
utility classes (`.shell`, `.grid`, `.grid-2-up`/`.grid-3-up`, `.bleed`).

If you're extending a page, check `app/templates/_macros.html` first —
repeated patterns (section headings, post cards) are already factored out
there.

---

## 4. Migrating to the DigitalOcean droplet (when ready to launch)

1. **Provision the droplet** — Ubuntu LTS, install Docker + Docker Compose plugin.
2. **Point DNS** — A record for your domain → droplet IP.
3. **Copy the repo** to the droplet (git clone, or `scripts/deploy.sh` which rsyncs).
4. `cp .env.example .env.prod` and fill in:
   - `ENVIRONMENT=production`
   - **Live** Stripe keys
   - Live Coinbase Commerce API key + webhook shared secret
   - Real transactional email provider credentials (`EMAIL_PROVIDER=postmark|sendgrid|ses`)
   - A strong `ADMIN_SESSION_SECRET` (random 32+ byte string — `openssl rand -hex 32`)
   - `DOMAIN=yourdomain.com` (used by Certbot)
5. Bring the stack up (Nginx starts in **HTTP-only bootstrap mode** first —
   it can't start with the HTTPS config until a certificate exists):
   ```bash
   make prod-up
   make prod-migrate
   ```
6. Obtain the certificate and switch Nginx over to HTTPS:
   ```bash
   ./scripts/init_certbot.sh yourdomain.com you@yourdomain.com
   ```
7. Seed your admin user on the droplet:
   ```bash
   docker compose -f docker-compose.yml -f docker-compose.prod.yml exec web python scripts/init_db.py
   ```
8. Confirm `https://yourdomain.com` loads, then register **live** webhook
   endpoints in the Stripe and Coinbase Commerce dashboards pointing at
   `https://yourdomain.com/webhooks/stripe` and `/webhooks/coinbase`.

For future deploys (code changes only, cert already issued), use
`./scripts/deploy.sh user@droplet-ip /path/on/droplet` to rsync and restart,
or just `git pull && make prod-up && make prod-migrate` directly on the droplet.

---

## 5. Open items before this is launch-ready

These are intentionally left as environment variables / config so you can
decide later without touching code:

| Item | Where to set it |
|---|---|
| Transactional email provider | `EMAIL_PROVIDER` in `.env` (`postmark`/`sendgrid`/`ses`/`console`) |
| Flat shipping rates (domestic/intl) | Admin dashboard → Settings, stored in `store_settings` table, or `DEFAULT_DOMESTIC_SHIPPING_CENTS`/`DEFAULT_INTL_SHIPPING_CENTS` env vars as initial seed |
| Stripe country/payout support | Check https://stripe.com/global before going live |
| Domain + DNS | `DOMAIN` env var, used by Nginx/Certbot config |
| Real product/hero photography | Product and hero photo placeholders currently render as labeled boxes (`.photo-placeholder` in `base.css`) until real images are dropped into `app/static/img/` and referenced |

---

## 6. Security checklist before going live

- [ ] Admin password is strong and unique; consider adding IP allowlisting in `nginx.prod.conf` (`allow`/`deny` directives — see comments in that file)
- [ ] `ADMIN_SESSION_SECRET` is a real random value, not the placeholder
- [ ] Stripe and Coinbase webhook signature verification is on (`STRIPE_WEBHOOK_SECRET`, `COINBASE_WEBHOOK_SHARED_SECRET` set — the app refuses to start in production without them, see `config.py`)
- [ ] `.env.prod` is **not** committed to git (already in `.gitignore`)
- [ ] HTTPS is enforced (Nginx redirects HTTP→HTTPS in `nginx.prod.conf`)
- [ ] Database is not exposed on a public port in `docker-compose.prod.yml` (only reachable inside the Docker network)
