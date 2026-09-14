# [Your Name] — Content Site + Store

A content-first personal site (blog/portfolio) with an embedded small-catalog
store supporting fiat (Stripe) and crypto (Coinbase Commerce) checkout.

Stack: **FastAPI + HTMX + PostgreSQL + Docker Compose + Nginx/Certbot**.

This repo is built so that **local dev and production are the same containers**,
just with different `.env` files and a different Compose file. There is no
"rewrite it for prod" step — you build the habit locally, then point it at a
droplet.

---

## 1. Directory layout

```
site-project/
├── app/                     # FastAPI application
│   ├── main.py              # App factory, mounts routers + static
│   ├── config.py            # Settings from environment (pydantic-settings)
│   ├── database.py          # SQLAlchemy engine/session
│   ├── models.py            # ORM models (Product, Variant, Order, Post cache, AdminUser)
│   ├── schemas.py           # Pydantic request/response schemas
│   ├── security.py          # Admin session auth, password hashing
│   ├── email.py             # Transactional email sending (provider-agnostic)
│   ├── content.py           # Markdown loader/renderer for blog posts
│   ├── routers/
│   │   ├── content.py       # Blog/portfolio pages
│   │   ├── store.py         # Public product listing/detail, cart (session-based)
│   │   ├── checkout.py      # Checkout flow, Stripe session creation, Coinbase charge creation
│   │   ├── webhooks.py      # Stripe + Coinbase webhook receivers (signature-verified)
│   │   └── admin.py         # Password-protected admin dashboard (orders, stock)
│   ├── templates/           # Jinja2 + HTMX templates
│   │   ├── base.html
│   │   ├── content/
│   │   ├── store/
│   │   └── admin/
│   ├── static/               # CSS/JS/images — drop your brand assets here
│   └── content/posts/        # Your blog posts as .md files
├── alembic/                  # DB migrations
├── nginx/
│   ├── nginx.dev.conf
│   └── nginx.prod.conf        # Adds SSL/Certbot config, used only in prod
├── docker-compose.yml         # Local dev (hot reload, no Nginx/SSL needed)
├── docker-compose.prod.yml    # Production overlay (Nginx + Certbot + restart policies)
├── .env.example                # Copy to .env.dev and .env.prod
├── Makefile                    # make up / make down / make migrate / make deploy
└── scripts/
    ├── init_db.py               # Seed an initial admin user
    └── deploy.sh                 # Rsync + restart on the droplet
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
git clone <your-repo-url> site-project
cd site-project
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
- `http://localhost:8000/` — the blog/portfolio homepage
- `http://localhost:8000/shop` — the store
- `http://localhost:8000/admin` — admin dashboard (login with seeded credentials)

Blog posts: drop `.md` files into `app/content/posts/`, each with frontmatter:

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

No redeploy needed in dev — the content loader re-reads the folder on request
(cached briefly in prod, see `content.py`).

### Testing payments locally
- **Stripe**: use the Stripe CLI (`stripe listen --forward-to localhost:8000/webhooks/stripe`) to forward webhook events to your local server, and Stripe's test card `4242 4242 4242 4242`.
- **Coinbase Commerce**: their sandbox is limited; easiest is to build/test the flow end-to-end against production with a $0.01–1.00 test product before real launch, or mock the webhook payload manually (see `scripts/mock_coinbase_webhook.py` if you want one — flag if you'd like this added).

---

## 3. Migrating to the DigitalOcean droplet (when ready to launch)

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

## 4. Open items before this is launch-ready (from spec §8)

These are intentionally left as environment variables / config so you can
decide later without touching code:

| Item | Where to set it |
|---|---|
| Transactional email provider | `EMAIL_PROVIDER` in `.env` (`postmark`/`sendgrid`/`ses`/`console`) |
| Flat shipping rates (domestic/intl) | Admin dashboard → Settings, stored in `store_settings` table, or `DEFAULT_DOMESTIC_SHIPPING_CENTS`/`DEFAULT_INTL_SHIPPING_CENTS` env vars as initial seed |
| Stripe country/payout support | Check https://stripe.com/global before going live |
| Domain + DNS | `DOMAIN` env var, used by Nginx/Certbot config |

---

## 5. Security checklist before going live

- [ ] Admin password is strong and unique; consider adding IP allowlisting in `nginx.prod.conf` (`allow`/`deny` directives — see comments in that file)
- [ ] `ADMIN_SESSION_SECRET` is a real random value, not the placeholder
- [ ] Stripe and Coinbase webhook signature verification is on (`STRIPE_WEBHOOK_SECRET`, `COINBASE_WEBHOOK_SHARED_SECRET` set — the app refuses to start in production without them, see `config.py`)
- [ ] `.env.prod` is **not** committed to git (already in `.gitignore`)
- [ ] HTTPS is enforced (Nginx redirects HTTP→HTTPS in `nginx.prod.conf`)
- [ ] Database is not exposed on a public port in `docker-compose.prod.yml` (only reachable inside the Docker network)
