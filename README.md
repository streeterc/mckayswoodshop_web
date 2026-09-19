# McKay's Woodshop — Content Site + Store

Eric McKay's personal site: a Markdown-driven blog/portfolio with an embedded
small-catalog store, live carrier shipping quotes, sales tax, and a
multi-step quote-request wizard for custom commissions.

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
│   │   ├── checkout.py                 # Address validation → rate quote → tax → Stripe/BTCPay
│   │   ├── webhooks.py                  # Stripe + BTCPay webhook receivers (signature-verified)
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
│   │   │   └── tokens/                              # Canonical brand tokens (colors, fonts, spacing…)
│   │   └── img/
│   │       ├── carriers/                              # Canada Post/Purolator/UPS/FedEx/DHL logos (checkout)
│   │       └── products/                              # Sample catalog product photos
│   └── content/posts/                                # Blog posts as .md files (frontmatter + Markdown)
├── alembic/                     # DB migrations
├── nginx/
│   ├── nginx.dev.conf
│   └── nginx.prod.conf           # Adds SSL/Certbot config, used only in prod
├── docker-compose.yml             # Local dev (hot reload, no Nginx/SSL needed)
├── docker-compose.prod.yml         # Production overlay (Nginx + Certbot + restart policies)
├── .env.dev / .env.prod             # Not committed — see "Environment variables" below
├── Makefile                          # make up / make down / make migrate / make deploy
└── scripts/
    ├── init_db.py                     # Seed the admin user + sample catalog
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
```

There is no `.env.example` in this repo (it was intentionally removed) —
create `.env.dev` yourself with the keys listed in
[Environment variables](#3-environment-variables) below. At minimum for a
working local dev environment you need `POSTGRES_*`/`DATABASE_URL`, and
`ADMIN_SESSION_SECRET`; everything else degrades gracefully (see the table).

Then:

```bash
make up          # docker compose --env-file .env.dev up --build
make migrate     # runs alembic upgrade head inside the web container
make seed-admin  # creates your admin login + seeds the sample catalog (prompts for username/password)
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

---

## 3. Environment variables

There's no `.env.example` — this table is the source of truth. Everything
has a default (usually empty/disabled) except where noted.

| Variable | Used for | Notes |
|---|---|---|
| `ENVIRONMENT` | `development` \| `production` | Production enforces the checks in §7 below |
| `DATABASE_URL`, `POSTGRES_USER/PASSWORD/DB` | Postgres connection | `docker-compose.yml` wires the DB container's own vars into this |
| `ADMIN_SESSION_SECRET` | Signs admin session cookies | Must be a real random value in prod (`openssl rand -hex 32`) |
| `SITE_NAME`, `DOMAIN`, `BASE_URL` | Branding, Nginx/Certbot, absolute links in emails | |
| `SHIPPO_API_KEY` | Live carrier rates + address validation ([app/shipping.py](app/shipping.py)) | Checkout **blocks** if this is unset or Shippo errors — no flat-rate fallback |
| `SHOP_ADDRESS_NAME/STREET1/STREET2/CITY/STATE/ZIP/COUNTRY/PHONE` | Ship-from address for rate quotes/labels | Must be a real address Shippo can validate |
| `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET` | Card checkout + webhook verification | Also powers Stripe Tax ([app/tax.py](app/tax.py)) — **must be activated in the Stripe Dashboard (Settings → Tax) with an origin address**, or checkout blocks with a 502 |
| `BTCPAY_URL`, `BTCPAY_API_KEY`, `BTCPAY_STORE_ID`, `BTCPAY_WEBHOOK_SECRET`, `ENABLE_CRYPTO_CHECKOUT` | Crypto checkout — BTC only, via a self-hosted BTCPay Server ([app/btcpay.py](app/btcpay.py), [docker-compose.btcpay.yml](docker-compose.btcpay.yml)) | The UI (payment badges, checkout radio) always renders — shown disabled/"coming soon" until `ENABLE_CRYPTO_CHECKOUT=true` with valid keys |
| `EMAIL_PROVIDER` | `console` \| `postmark` \| `sendgrid` \| `brevo` \| `ses` | `console` just logs — nothing is actually sent. `ses` needs boto3 wired up (not implemented) |
| `EMAIL_FROM`, `NOTIFY_ADMIN_EMAIL` | Sender + where order/quote notifications go | `EMAIL_FROM` accepts `"Name <email>"` or a bare address |
| `POSTMARK_SERVER_TOKEN` / `SENDGRID_API_KEY` / `BREVO_API_KEY` | Provider credentials, matching `EMAIL_PROVIDER` | Brevo also requires the sender address be verified in your Brevo account, and (on some accounts) the calling IP be authorized under Security → Authorised IPs |
| `DEFAULT_DOMESTIC_SHIPPING_CENTS`, `DEFAULT_INTL_SHIPPING_CENTS`, `DEFAULT_CURRENCY` | Seed values for `StoreSettings` | No longer used as a checkout fallback — see the Shippo note above. Kept for the admin Settings page and `is_domestic` bookkeeping |

---

## 4. What's built

### Shop + checkout
- Guest cart via a signed cookie (no accounts).
- **Address entry**: plain, always-editable text fields (no autocomplete
  widget); country is a `<select>` covering ~188 countries (`shipping.
  country_choices()`), Canada and the US pinned first, then a "Popular
  destinations" group, then everything else alphabetically. Sanctioned/
  embargoed destinations (Cuba, Iran, North Korea, Russia, Sudan, Syria)
  are left off entirely.
- **Address format checks**: before ever calling Shippo, `shipping.
  format_errors()` runs cheap syntax checks (US ZIP / Canadian postal code
  shape, a 2-letter state/province, a street with a number) — exact for
  US/CA, a looser sanity check everywhere else since formats vary too much
  worldwide to hardcode per country. Required fields left blank, or fields
  that fail this check, return immediately with red X's on just the
  offending fields — no Shippo call, no rate quote.
- **Address validation**: once formats pass, the address is validated
  through Shippo's Addresses API. Invalid fields come back as inline
  per-field errors (HTMX out-of-band swaps); a Shippo *outage*, or a 200
  with an empty `validation_results` (seen for Canadian addresses on this
  account), is not treated as invalid — checkout falls through with the
  customer's original input rather than falsely confirming it or blocking.
  A validated address is standardized before it's used for the rate quote.
- **Live shipping rates**: quoted from Shippo, restricted to five carriers
  (Canada Post, Purolator, UPS, FedEx, DHL — see `CARRIER_LOGOS` in
  `app/shipping.py`). Each carrier is reduced to at most two rows — its
  cheapest service level and its fastest (ties broken by price, so a pricier
  tier with the same delivery estimate never wins "Fastest") — and exactly
  one row overall is tagged "Cheapest" and one "Fastest". Carrier logos
  render next to each option.
- **Sales tax**: computed via the Stripe Tax Calculation API against the
  validated address, added as its own Stripe Checkout line item (BTCPay
  gets it folded into the invoice total). Requires Stripe Tax to be activated in
  the Stripe Dashboard; if it's not, checkout blocks with a clear error
  rather than silently charging $0 tax.
- **Payment methods**: Stripe (card) and a self-hosted BTCPay Server (Bitcoin
  only, see [app/btcpay.py](app/btcpay.py) — the code requests on-chain +
  Lightning on every invoice, but Lightning only actually shows up if the
  BTCPay store also has a Lightning node configured, which neither compose
  file here sets up; on-chain-only is what you'll see in practice). The
  crypto option is always visible in the UI (payment badges + checkout
  radio) but disabled with a "coming soon" label until `ENABLE_CRYPTO_CHECKOUT`
  is turned on with real keys and the BTCPay stack (see
  [docker-compose.btcpay.yml](docker-compose.btcpay.yml)) is actually running.
- Shipping label purchase (`app/shipping.py:buy_label`) from the admin order
  detail page, once an order carries a live `shippo_rate_id`.

### Quote-request wizard
A sitewide modal (`data-quote-open` anywhere in the templates) walks a
customer through: project category (Furniture/Built-ins/Outdoor/Restoration/
Other) → size, room, material, timeline, and up to 3 reference photos →
contact info. Restoration requires at least one photo. On submit:
- The request is saved to the `quote_requests` table (visible at
  `/admin/quotes`).
- An email goes to `NOTIFY_ADMIN_EMAIL` with the full structured details and
  the photos attached directly to the email (not stored server-side).

### Admin dashboard
`/admin` (password-protected): orders (status updates, tracking, shipping
label purchase), products (stock counts + per-variant shipping dimensions,
inline-editable via HTMX), quote requests, and store settings. Every admin
page loads the same design-token stylesheets as the public site (`base.css`
+ `typography.css` + `style.css`) — a prior gap where admin pages only
loaded `style.css` and rendered mostly unstyled has been fixed.

### Homepage content
Hero → About → "What I build" (mirrors the quote wizard's categories) →
"How it works" (4-step commission process) → shop teaser → closing quote-request
CTA → blog teaser. Most copy is placeholder text (`Placeholder — ...`) for
Eric to fill in; the sample catalog (`Walnut Cutting Board`, `Wood Butter
Knife`) uses stock photos from Unsplash pending real product photography
(see `app/static/img/products/README.md` and `app/static/img/carriers/README.md`
for sourcing/licensing notes on both).

### Testing payments/shipping/tax/email locally
- **Stripe**: `stripe listen --forward-to localhost:8000/webhooks/stripe`, test card `4242 4242 4242 4242`.
- **Stripe Tax**: activate it in the Dashboard's test mode (Settings → Tax) before expecting a non-zero tax line.
- **Shippo**: get a free test API key at shippo.com; test-mode rates only return from carrier accounts you've activated under Settings → Carriers in your Shippo dashboard.
- **BTCPay Server**: `docker-compose.btcpay.yml` (mainnet) is prod-only, but `docker-compose.btcpay.regtest.yml` brings up a full regtest stack (bitcoind + NBXplorer + BTCPay Server + its own Postgres) alongside the plain dev stack for actually testing checkout -> invoice -> paid -> webhook -> order-marked-paid start to finish, with fake money and no real domain:
  ```bash
  docker compose -f docker-compose.yml -f docker-compose.btcpay.regtest.yml up -d
  ```
  One-time setup (same idea as prod's, see §6, but everything's local — no SSH tunnel needed, port 49392 is published straight to `localhost`):
  1. Visit `http://localhost:49392`, register the first account, create a store.
  2. Store -> **Bitcoin -> Create a new wallet -> Hot wallet** (default settings) — required before the store can create invoices at all.
  3. **Account -> API Keys -> Generate Key** with `btcpay.store.cancreateinvoice` -> this is `BTCPAY_API_KEY`; note the store ID from the URL -> `BTCPAY_STORE_ID`.
  4. Create the webhook via the Greenfield API (the store's own Webhooks *page* 403'd in testing even as Owner — see §6's note): generate a second key with `btcpay.store.webhooks.canmodifywebhooks`, then
     ```bash
     curl -X POST "http://localhost:49392/api/v1/stores/<BTCPAY_STORE_ID>/webhooks" \
       -H "Authorization: token <temporary-key>" -H "Content-Type: application/json" \
       -d '{"url": "http://web:8000/webhooks/btcpay", "authorizedEvents": {"everything": true}, "secret": "<make one up>", "enabled": true}'
     ```
     that `secret` is `BTCPAY_WEBHOOK_SECRET`.
  5. Set `.env.dev`'s `BTCPAY_URL=http://btcpayserver:49392`, the three values above, and `ENABLE_CRYPTO_CHECKOUT=true`; recreate the `web` container.

  There's no working "fake pay" button on this BTCPay version's checkout page (despite older docs mentioning one) — instead, pay an invoice for real with free regtest coins, using the invoice's own on-chain address (shown on its checkout page, or via `GET /api/v1/stores/<id>/invoices/<invoiceId>`):
  ```bash
  docker exec <bitcoind-container> bitcoin-cli -regtest -rpccookiefile=/data/regtest/.cookie -rpcconnect=127.0.0.1 -rpcport=43782 -rpcwallet=default \
    -named sendtoaddress address=<invoice-address> amount=<btc-amount> fee_rate=10
  docker exec <bitcoind-container> bitcoin-cli -regtest -rpccookiefile=/data/regtest/.cookie -rpcconnect=127.0.0.1 -rpcport=43782 -rpcwallet=default -generate 1
  ```
  The second command mines a confirmation block (regtest has no real miners) — BTCPay settles the invoice and fires the webhook within a few seconds after that.
- **Email**: `EMAIL_PROVIDER=console` prints to the terminal; switching to a real provider needs that provider's API key and (for Brevo) a verified sender + authorized IP.

---

## 5. Design system

The visual language (forest green + copper + warm sand palette, Fraunces
serif headings over Work Sans UI text, IBM Plex Mono for prices/dates/specs,
tight "machined" corner radii, flat cards with no shadow at rest) lives as
plain CSS custom properties in `app/static/css/base.css` and
`app/static/css/tokens/`. There's no component library or build step —
templates just reference the tokens directly (`var(--forest)`, `var(--clay)`,
`var(--radius-md)`, etc.) and layouts are done with a small set of flexbox
utility classes (`.shell`, `.grid`, `.grid-2-up`/`.grid-3-up`, `.bleed`).

The `tokens/` subdirectory is a separate, differently-named export from the
same design system (`--space-N` instead of `--sp-N`, etc.) kept for
reference only — `base.css` and `typography.css` are what's actually
`@import`ed and used; don't wire `tokens/*.css` into the page.

If you're extending a page, check `app/templates/_macros.html` first —
repeated patterns (section headings, post cards, payment badges) are
already factored out there.

---

## 6. Migrating to the DigitalOcean droplet (when ready to launch)

1. **Provision the droplet** — Ubuntu LTS, install Docker + Docker Compose plugin.
2. **Point DNS** — A record for your domain → droplet IP.
3. **Copy the repo** to the droplet (git clone, or `scripts/deploy.sh` which rsyncs).
4. Create `.env.prod` (see §3 above) and fill in:
   - `ENVIRONMENT=production`
   - **Live** Stripe keys, with **Stripe Tax activated in live mode**
   - `BTCPAY_URL`/`BTCPAY_API_KEY`/`BTCPAY_STORE_ID`/`BTCPAY_WEBHOOK_SECRET` (if enabling crypto — see step 6a below, which brings up the actual BTCPay stack these point at)
   - A **live** Shippo API key and your real ship-from address
   - Real transactional email provider credentials
   - A strong `ADMIN_SESSION_SECRET` (random 32+ byte string — `openssl rand -hex 32`)
   - `DOMAIN=yourdomain.com` (used by Certbot)
5. Bring the stack up (Nginx starts in **HTTP-only bootstrap mode** first —
   it can't start with the HTTPS config until a certificate exists):
   ```bash
   make prod-up
   make prod-migrate
   ```
6. **(Optional) Bring up the self-hosted BTCPay Server stack**, if enabling
   crypto checkout. Point a subdomain (e.g. `pay.yourdomain.com`) at this
   droplet first, then:
   ```bash
   make prod-up-btcpay
   ```
   No RPC credentials to generate — NBXplorer authenticates to bitcoind via
   a shared cookie-auth-file volume, not a password (see
   `docker-compose.btcpay.yml`'s comments). `bitcoind` then needs to fully
   sync (pruned — hours, not days, but not instant either; `make
   prod-logs-btcpay` to watch progress).

   Once synced, since `docker-compose.btcpay.yml` deliberately doesn't
   publish BTCPay's port to the host (only reachable internally, by `web`
   and by Nginx's `pay.${DOMAIN}` block once that's uncommented), reach it
   for this one-time setup via an SSH tunnel instead of opening the port:
   ```bash
   ssh -L 49392:localhost:49392 user@your-droplet-ip
   ```
   Then, with that tunnel open, visit `http://localhost:49392` in your own
   browser and:
   1. Register the first account (this becomes the BTCPay server admin) and
      create a store.
   2. Under the store, **Bitcoin -> Create a new wallet -> Hot wallet**
      (default Segwit settings are fine) — a store can't create invoices at
      all until it has a payment method configured, this is not optional.
   3. **Account -> API Keys -> Generate Key**, with at least the
      `btcpay.store.cancreateinvoice` permission (Store Mode: All Stores is
      fine for a single-store setup) — this is `BTCPAY_API_KEY`. Note the
      store ID from the store's URL (`/stores/<this-part>/...`) — this is
      `BTCPAY_STORE_ID`.
   4. Create the webhook **via the Greenfield API directly, not the store's
      Webhooks page** — that page 403'd with "missing
      btcpay.store.canmodifystoresettings" even when logged in as the
      store's Owner in testing (BTCPay v2.4.4), while the equivalent API
      call worked fine. Generate a second, temporary API key with the
      `btcpay.store.webhooks.canmodifywebhooks` permission, then:
      ```bash
      curl -X POST "http://localhost:49392/api/v1/stores/<BTCPAY_STORE_ID>/webhooks" \
        -H "Authorization: token <temporary-key>" \
        -H "Content-Type: application/json" \
        -d '{"url": "http://web:8000/webhooks/btcpay", "authorizedEvents": {"everything": true}, "secret": "<make one up>", "enabled": true}'
      ```
      That `secret` is `BTCPAY_WEBHOOK_SECRET`. Note the URL is the
      internal Docker address (`http://web:8000/...`), not the public
      domain — BTCPay delivers the webhook itself over the internal network,
      it doesn't need to leave the droplet.
   5. Put all four (`BTCPAY_API_KEY`, `BTCPAY_STORE_ID`, `BTCPAY_WEBHOOK_SECRET`,
      and `BTCPAY_URL=http://btcpayserver:49392` — also internal, `web`
      reaches it directly) in `.env.prod`, then close the SSH tunnel.
7. Obtain the certificate and switch Nginx over to HTTPS — add the BTCPay
   subdomain as a 3rd argument if you brought that stack up in step 6 (and
   uncomment its block in `nginx/nginx.prod.conf.template` first):
   ```bash
   ./scripts/init_certbot.sh yourdomain.com you@yourdomain.com [pay.yourdomain.com]
   ```
8. Seed your admin user (and sample catalog, if wanted) on the droplet:
   ```bash
   docker compose -f docker-compose.yml -f docker-compose.prod.yml exec web python scripts/init_db.py
   ```
9. Confirm `https://yourdomain.com` loads, then register a **live** Stripe
   webhook endpoint pointing at `https://yourdomain.com/webhooks/stripe`.
   (BTCPay's webhook was already registered against BTCPay itself in step 6,
   not Stripe's dashboard.)

For future deploys (code changes only, cert already issued), use
`./scripts/deploy.sh user@droplet-ip /path/on/droplet` to rsync and restart,
or just `git pull && make prod-up && make prod-migrate` directly on the droplet.

---

## 7. Open items before this is launch-ready

| Item | Status / where to set it |
|---|---|
| Real product/hero photography | Currently Unsplash stock photos (`app/static/img/products/`, `shop-interior.jpg`) — swap before launch, see the READMEs in those directories for licensing notes |
| Homepage/shop copy | Mostly placeholder text (`Placeholder — ...`) — needs Eric's actual bio, process details, etc. |
| Stripe Tax activation | Not yet active on the configured Stripe account as of this writing — checkout will 502 on the tax step until it is (Dashboard → Settings → Tax) |
| BTCPay Server (Bitcoin) | UI is built and always visible but disabled ("coming soon") — needs the `docker-compose.btcpay.yml` stack actually deployed (§6) plus `BTCPAY_URL`/`BTCPAY_API_KEY`/`BTCPAY_STORE_ID`/`BTCPAY_WEBHOOK_SECRET` + `ENABLE_CRYPTO_CHECKOUT=true` to go live |
| Shippo carrier accounts | Only whichever carriers are activated under Settings → Carriers in the Shippo dashboard will actually return rates, even though 5 are allow-listed in code |
| Stripe country/payout support | Check https://stripe.com/global before going live |
| Domain + DNS | `DOMAIN` env var, used by Nginx/Certbot config |

---

## 8. Security checklist before going live

- [ ] Admin password is strong and unique; consider adding IP allowlisting in `nginx.prod.conf` (`allow`/`deny` directives — see comments in that file)
- [ ] `ADMIN_SESSION_SECRET` is a real random value, not the placeholder
- [ ] Stripe and BTCPay webhook signature verification is on (`STRIPE_WEBHOOK_SECRET` always required; `BTCPAY_WEBHOOK_SECRET`/`BTCPAY_URL` required if `ENABLE_CRYPTO_CHECKOUT=true` — the app refuses to start in production without them, see `config.py`)
- [ ] BTCPay Server's temporary setup port (49392) is not left open to the public internet after initial store setup (§6) — Nginx's `pay.${DOMAIN}` block is the only path that should reach it
- [ ] Stripe Tax is activated in **live** mode, not just test mode
- [ ] `.env.prod` is **not** committed to git (already in `.gitignore`)
- [ ] HTTPS is enforced (Nginx redirects HTTP→HTTPS in `nginx.prod.conf`)
- [ ] Database is not exposed on a public port in `docker-compose.prod.yml` (only reachable inside the Docker network)
