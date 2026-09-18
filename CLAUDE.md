# McKay's Woodshop — Project Summary & Instructions

Repo: https://github.com/streeterc/mckayswoodshop_web

## 1. What this project is

Eric McKay's personal site: a Markdown-driven blog/portfolio with an embedded small-catalog store — live carrier shipping quotes, Stripe Tax, guest checkout via Stripe (card) or Coinbase Commerce (crypto) — plus a multi-step quote-request wizard for custom commissions.

**Stack:** FastAPI + Jinja2 + HTMX + PostgreSQL + Docker Compose + Nginx/Certbot. There's deliberately no frontend build step — templates are server-rendered, styled with plain CSS custom properties, and there's no npm/webpack/bundler in the loop.

**Core design principle:** local dev and production run the *same containers*. Only the `.env` file's values and whether Nginx/Certbot is included in the Compose stack differ. There's no "rewrite for prod" step.

> **Before making any SEO or content change** (homepage/shop copy, meta titles/descriptions, headings, blog posts, positioning/messaging) **read [MARKET.md](MARKET.md) first.** It's the competitive research report for McKay's Woodshop — local competitor landscape, pricing bands, positioning gaps, and the reasoning behind decisions like keeping Coinbase as a novelty rather than a marketed feature. Content changes made without it risk contradicting the positioning it lays out.

## 2. Directory layout

```
mckayswoodshop-web/
├── app/                        # FastAPI application
│   ├── main.py                 # App factory, mounts routers + static
│   ├── config.py                # Settings from environment (pydantic-settings)
│   ├── database.py              # SQLAlchemy engine/session
│   ├── models.py                # ORM models (Product, Variant, Order, QuoteRequest, AdminUser, StoreSettings)
│   ├── schemas.py                # Pydantic request/response schemas
│   ├── security.py               # Admin session auth, password hashing
│   ├── email.py                   # Transactional email (provider-agnostic: console/postmark/sendgrid/brevo/ses)
│   ├── shipping.py                 # Shippo: address validation, live rate quotes, label purchase
│   ├── tax.py                       # Stripe Tax: order tax calculation + remittance recording
│   ├── cart.py                       # Guest cart (signed cookie) + cart→row resolution
│   ├── content.py                     # Markdown loader/renderer for blog posts
│   ├── routers/
│   │   ├── content.py                # Home, paginated post list (/blog), post detail, quote-request wizard
│   │   ├── store.py                   # Product listing/detail, cart (session-based)
│   │   ├── checkout.py                 # Address validation → rate quote → tax → Stripe/Coinbase
│   │   ├── webhooks.py                  # Stripe + Coinbase webhook receivers (signature-verified)
│   │   └── admin.py                      # Password-protected admin dashboard (orders, stock, quotes, variant dims)
│   ├── templates/                          # Jinja2 + HTMX templates, no build step
│   │   ├── base.html                        # Header/nav/footer shell + sitewide quote-request modal
│   │   ├── _macros.html                      # Shared partials (section headings, post cards, payment badges)
│   │   ├── content/                           # Home, all-posts list, post detail, quote wizard partials
│   │   ├── store/                              # Shop, product, cart, checkout, shipping-rate picker
│   │   └── admin/
│   ├── static/
│   │   ├── css/
│   │   │   ├── base.css                          # Design tokens (color/type/space/radius) + primitives
│   │   │   ├── typography.css                     # Type rules built on those tokens
│   │   │   ├── style.css                           # Header/footer chrome
│   │   │   └── tokens/                              # Raw design-system export, NOT wired into the page — see §4
│   │   └── img/
│   │       ├── carriers/                              # Canada Post/Purolator/UPS/FedEx/DHL logos (checkout)
│   │       └── products/                              # Sample catalog product photos
│   └── content/posts/                                # Blog posts as .md files (frontmatter + Markdown)
├── alembic/                     # DB migrations (currently 0001–0006)
├── nginx/
│   ├── nginx.dev.conf
│   └── nginx.prod.conf           # Adds SSL/Certbot config, used only in prod
├── docker-compose.yml             # Local dev (hot reload, no Nginx/SSL needed)
├── docker-compose.prod.yml         # Production overlay (Nginx + Certbot + restart policies)
├── .env.dev / .env.prod             # Not committed, no .env.example either — see §3
├── Makefile                          # make up / make down / make migrate / make deploy
└── scripts/
    ├── init_db.py                     # Seed the admin user + sample catalog
    ├── init_certbot.sh                 # Obtain/renew the TLS cert on the droplet
    └── deploy.sh                        # Rsync + restart on the droplet
```

There's also a top-level `McKay's Woodshop Design System/` folder alongside `app/`, `alembic/`, `nginx/`, and `scripts/` in the repo root — the source design-system export that `app/static/css/tokens/` was copied from.

## 3. Local development — step by step

**Prerequisites:** Docker + Docker Compose. Python 3.12 only needed if running things outside Docker.

```bash
git clone <your-repo-url> mckayswoodshop-web
cd mckayswoodshop-web
```

There's no `.env.example` (removed deliberately, per git history) — create `.env.dev` yourself. Minimum to get a working dev environment: `POSTGRES_USER/PASSWORD/DB`, `DATABASE_URL`, `ADMIN_SESSION_SECRET`. Everything else (Shippo, Stripe, Stripe Tax, Coinbase, Google Maps, email provider) degrades gracefully or shows a "not configured" state rather than crashing — see the per-feature notes in §5.

Set `EMAIL_PROVIDER=console` for local dev so emails print to the terminal instead of sending.

Bring it up:

```bash
make up          # docker compose --env-file .env.dev up --build
make migrate     # runs alembic upgrade head inside the web container
make seed-admin  # creates your admin login + seeds the sample catalog (prompts for username/password)
```

Then visit:
- `http://localhost:8000/` — home, featuring the latest post
- `http://localhost:8000/blog` — all posts, paginated 3/page
- `http://localhost:8000/shop` — the store
- `http://localhost:8000/admin` — admin dashboard

**Restarting after `.env.dev` changes:** Docker only reads `.env.dev` at container *start*, not live. `docker compose up -d --force-recreate web` (or `make up` again) after editing it — an easy thing to forget mid-session.

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

## 4. Design system

Palette: forest green + copper + warm sand. Headings in **Fraunces** (serif, variable — `opsz`/`SOFT`/`wght` axes loaded via Google Fonts), UI text in Work Sans, prices/dates/specs in IBM Plex Mono. Tight "machined" corner radii, flat cards with no shadow at rest.

All of this lives as CSS custom properties in `app/static/css/base.css` and `app/static/css/typography.css` — those two are what every page actually `@import`s/links, and `style.css` builds on the tokens they define (`--forest`, `--sp-N`, `--radius-N`, etc.). No component library, no build step — templates reference tokens directly and layout uses a small set of flexbox utilities (`.shell`, `.grid`, `.grid-2-up`/`.grid-3-up`, `.bleed`). Check `app/templates/_macros.html` before adding new markup — repeated patterns (section headings, post cards, payment badges) are already factored out there.

`app/static/css/tokens/` is a **separate, differently-named export** of the same design system (`--space-N` instead of `--sp-N`, `--forest-700` instead of `--forest`, etc.) kept for reference only. Nothing on the live site `@import`s it — don't wire it in; it'll conflict with the token names `base.css`/`style.css` actually use.

Every page — including `admin/*` — must link `base.css` **and** `typography.css` **and** `style.css`, in that order. A page that only links `style.css` renders mostly unstyled, since `style.css` assumes the tokens/resets from the other two are already in scope; this was a real bug on every admin page until it was fixed.

Also note: `[hidden]` needs `[hidden] { display: none !important; }` (present in `base.css`) to actually work — author-level `display` rules like `.field { display: flex }` otherwise silently override the browser's default `[hidden]` behavior regardless of selector specificity, since author styles always beat the UA stylesheet.

## 5. Feature notes (read before touching these areas)

**Shipping (`app/shipping.py`, checkout.py's `/checkout/rates`)** — Shippo-backed, no flat-rate fallback:
- Address is validated via Shippo's Addresses API before quoting. Invalid → inline per-field errors via HTMX out-of-band swaps into the checkout form. Shippo *erroring* during validation ≠ invalid — falls through with the customer's raw input rather than blocking checkout.
- Rates are restricted to 5 carriers (`CARRIER_LOGOS` in `shipping.py`): Canada Post, Purolator, UPS, FedEx, DHL. Only carrier accounts actually activated in the Shippo dashboard (Settings → Carriers) return rates — the code allow-list doesn't make an inactive carrier appear.
- Each carrier is reduced to at most 2 rows (its cheapest + fastest service level, tie-broken by price so a pricier tier with the same day-count never displaces the cheaper one). Exactly one row overall gets "Cheapest", one gets "Fastest" — computed globally across all carriers shown, not per carrier.

**Address autocomplete (checkout.html)** — Google **Places API (New)**, via `PlaceAutocompleteElement`, not the classic `google.maps.places.Autocomplete`. The classic widget depends on the legacy Places API backend and fails silently against a key that only has the New API enabled — confirmed by hitting both REST endpoints directly. Fields populate read-only after a successful lookup (`revealAddressFields(true)`); a "Can't find your address?" toggle switches to manual/editable entry for PO Boxes and anything else Places can't find. Country is a `<select>` (US/CA only, matching the autocomplete's `includedRegionCodes`) — note `readonly` has no effect on `<select>` and `disabled` would drop it from form submission, so country is deliberately left out of the read-only toggle.

**Tax (`app/tax.py`, checkout.py)** — Stripe Tax Calculation API, called directly (not Checkout's `automatic_tax`) so one calculation backs both Stripe and Coinbase. **Requires Stripe Tax activated in the Dashboard (Settings → Tax) with an origin address** — until then, every checkout attempt 502s on the tax step by design (same "block, don't silently undercharge" policy as shipping). A `Transaction` is recorded from the `Calculation` only once an order is actually paid (webhooks.py), for Stripe's remittance reporting.

**Crypto checkout** — the UI (payment badges on shop/cart/product pages, the Coinbase radio on checkout) is unconditionally present, not gated behind `ENABLE_CRYPTO_CHECKOUT`. It renders disabled with a "(coming soon)" label when the flag is off; the backend still independently rejects a forged `payment_method=coinbase` submission if the flag is off, so the UI state is cosmetic, not the only guard.

**Email (`app/email.py`)** — provider-agnostic; `send_email()` is the only thing routers call. Brevo needs the sender address verified in the Brevo account, and some accounts also enforce an IP allowlist (Security → Authorised IPs) that will 401 the API even with a correct key.

**Quote-request wizard (`content.py`'s `/quote`, `templates/content/_quote_form.html`)** — sitewide modal opened via `data-quote-open` on any element. Multi-step: category → size/room/material/timeline/photos → contact info. Photos (up to 3) are attached directly to the admin notification email, not stored server-side — `QuoteRequest.photo_count` just records how many were sent. Server-side validation mirrors the client-side gating and always returns HTTP 200 (even on validation failure) — this project's htmx config doesn't swap non-2xx responses, so a 4xx here would silently freeze the form with no feedback.

## 6. Testing payments/shipping/tax/email locally

- **Stripe:** `stripe listen --forward-to localhost:8000/webhooks/stripe`, test card `4242 4242 4242 4242`.
- **Stripe Tax:** activate it in test mode (Dashboard → Settings → Tax) or every checkout will 502 on the tax step.
- **Shippo:** free test API key from shippo.com; only carriers activated under Settings → Carriers in your Shippo dashboard return rates, regardless of the code's 5-carrier allow-list.
- **Coinbase Commerce:** sandbox is limited — easiest path is testing end-to-end against production with a $0.01–1.00 test product before launch, or manually mocking the webhook payload against `/webhooks/coinbase`.
- **Email:** `EMAIL_PROVIDER=console` prints to the terminal; a real provider needs its API key plus (Brevo) a verified sender and possibly an IP allowlist entry.

## 7. Deploying to the DigitalOcean droplet

1. Provision the droplet — Ubuntu LTS, install Docker + Compose plugin.
2. Point DNS — A record for your domain → droplet IP.
3. Copy the repo to the droplet (`git clone`, or `scripts/deploy.sh` to rsync).
4. Create `.env.prod` (see §3) and fill in:
   - `ENVIRONMENT=production`
   - **Live** Stripe keys, with Stripe Tax activated in **live** mode
   - Live Coinbase Commerce API key + webhook shared secret (if enabling crypto)
   - A **live** Shippo API key + your real ship-from address
   - A production `GOOGLE_MAPS_API_KEY`, HTTP-referrer-restricted to your domain
   - Real email provider creds (`EMAIL_PROVIDER=postmark|sendgrid|brevo`)
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
7. Seed the admin user (and sample catalog, if wanted) on the droplet:
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

## 8. Open items before launch

| Item | Status |
|---|---|
| Real product/hero photography | Currently Unsplash stock photos pending real photography — see `app/static/img/products/README.md` / `app/static/img/carriers/README.md` for sourcing |
| Homepage/shop copy | Mostly `Placeholder — ...` text, needs Eric's real bio/process/etc. |
| Stripe Tax activation | Not active on the configured account as of this writing — blocks checkout until it is |
| Coinbase Commerce | UI-complete, backend disabled pending real API keys |
| Shippo carrier accounts | Only carriers activated in the Shippo dashboard actually return rates |
| Google Maps API key | Currently unrestricted — lock to the production domain before launch |
| Stripe country/payout support | Check stripe.com/global before going live |
| Domain + DNS | `DOMAIN` env var |

## 9. Security checklist before going live

- [ ] Admin password strong/unique; consider IP allowlisting in `nginx.prod.conf`
- [ ] `ADMIN_SESSION_SECRET` is a real random value, not a placeholder
- [ ] Stripe/Coinbase webhook signature verification on (`STRIPE_WEBHOOK_SECRET`, `COINBASE_WEBHOOK_SHARED_SECRET` set — app refuses to start in prod without them)
- [ ] `GOOGLE_MAPS_API_KEY` restricted to the production domain
- [ ] Stripe Tax activated in live mode, not just test
- [ ] `.env.prod` not committed to git (already gitignored)
- [ ] HTTPS enforced (Nginx redirects HTTP→HTTPS in prod)
- [ ] Database not exposed on a public port in `docker-compose.prod.yml`
