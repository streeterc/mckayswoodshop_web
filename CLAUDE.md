# McKay's Woodshop — Project Summary & Instructions

Repo: https://github.com/streeterc/mckayswoodshop_web

## 1. What this project is

Eric McKay's personal site: a Markdown-driven blog/portfolio with an embedded small-catalog store — live carrier shipping quotes, Stripe Tax, guest checkout via Stripe (card) or a self-hosted BTCPay Server (Bitcoin only — on-chain or Lightning) — plus a multi-step quote-request wizard for custom commissions.

**Stack:** FastAPI + Jinja2 + HTMX + PostgreSQL + Docker Compose + Nginx/Certbot. There's deliberately no frontend build step — templates are server-rendered, styled with plain CSS custom properties, and there's no npm/webpack/bundler in the loop.

**Core design principle:** local dev and production run the *same containers*. Only the `.env` file's values and whether Nginx/Certbot is included in the Compose stack differ. There's no "rewrite for prod" step.

> **Before making any SEO or content change** (homepage/shop copy, meta titles/descriptions, headings, blog posts, positioning/messaging) **read [MARKET.md](MARKET.md) first.** It's the competitive research report for McKay's Woodshop — local competitor landscape, pricing bands, positioning gaps, and the reasoning behind decisions like keeping the Bitcoin payment option as a novelty rather than a marketed feature. Content changes made without it risk contradicting the positioning it lays out.

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
│   ├── btcpay.py                     # Self-hosted BTCPay Server: BTC invoice creation, webhook signature verification
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
├── docker-compose.btcpay.yml         # Optional prod-only overlay: self-hosted BTCPay Server + pruned bitcoind + NBXplorer
├── docker-compose.btcpay.regtest.yml  # Same stack on regtest (fake money) — for local start-to-finish checkout testing, see §5
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

There's no `.env.example` (removed deliberately, per git history) — create `.env.dev` yourself. Minimum to get a working dev environment: `POSTGRES_USER/PASSWORD/DB`, `DATABASE_URL`, `ADMIN_SESSION_SECRET`. Everything else (Shippo, Stripe, Stripe Tax, BTCPay, email provider) degrades gracefully or shows a "not configured" state rather than crashing — see the per-feature notes in §5.

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

**Guest cart (`app/cart.py`)** — signed cookie, `max_age` set to 400 days (`CART_COOKIE_MAX_AGE_SECONDS`), not longer — that's not an arbitrary number, it's the actual ceiling: Chrome and browsers following its lead silently clamp any cookie's Max-Age/Expires to 400 days regardless of what a larger value requests, so this is already "as long as possible." Because a cart can now realistically outlive a product, `checkout.py`'s `/checkout` order-creation loop also checks `variant.active` alongside `stock_count` before allowing a cart line through — a deactivated (soft-deleted, see `admin.py`'s product/variant CRUD) product sitting in a year-old cart is rejected with 409 rather than silently completing an order for something no longer sold.

**Buy Now (`store.py`'s `POST /shop/buy-now`, `product_list.html`, `product_detail.html`)** — adds to the cart then redirects straight to `/checkout`, same cart as "Add to cart" (not a separate express-checkout path that bypasses it). Sets the cart cookie directly on the `RedirectResponse` it returns, rather than on an injected `response: Response` dependency it then discards — the same header-merging gotcha noted elsewhere in this file (BTCPay's `product_delete`): FastAPI only carries an injected `response`'s headers over when the route returns a non-`Response` value, so returning a different `Response`/`RedirectResponse` object silently drops them unless you set cookies on that exact object. On the shop list page, each card's Buy Now button targets a default variant resolved in the template (`variants|selectattr('active')|selectattr('stock_count', 'gt', 0)|first`, i.e. the first active variant with stock — there's no explicit "default variant" concept on `Product`) since list cards have no variant picker; a product with no qualifying variant gets a disabled "Out of stock" button instead. This also required restructuring the card markup — it used to be one big `<a class="card">` wrapping everything, which can't validly contain a `<form>`/`<button>` (nested interactive content), so the anchor now wraps only the image/title/price and the Buy Now form is a sibling within an outer `<div class="card">`.

**Shipping (`app/shipping.py`, checkout.py's `/checkout/rates`)** — Shippo-backed, no flat-rate fallback:
- Address is validated via Shippo's Addresses API before quoting. Invalid → inline per-field errors via HTMX out-of-band swaps into the checkout form. Shippo *erroring* during validation ≠ invalid — falls through with the customer's raw input rather than blocking checkout. Same treatment applies when Shippo returns a 200 with an *empty* `validation_results` (no `is_valid` at all, not even `false`) — confirmed happening for Canadian addresses on this account, where a made-up CA street address validates with nothing but `{}`. `shipping.validation_state()` maps this to `"unavailable"`, not `"valid"` — do not read a missing `is_valid` as truthy/valid, that's the bug this was fixed from.
- Rates are restricted to 5 carriers (`CARRIER_LOGOS` in `shipping.py`): Canada Post, Purolator, UPS, FedEx, DHL. Only carrier accounts actually activated in the Shippo dashboard (Settings → Carriers) return rates — the code allow-list doesn't make an inactive carrier appear.
- Each carrier is reduced to at most 2 rows (its cheapest + fastest service level, tie-broken by price so a pricier tier with the same day-count never displaces the cheaper one). Exactly one row overall gets "Cheapest", one gets "Fastest" — computed globally across all carriers shown, not per carrier.

**Address entry & validation (checkout.html, checkout.py's `/checkout/rates`)** — no client-side autocomplete; address fields are always plain, editable text inputs. Validation happens server-side only, via Shippo's Addresses API (`shipping.py`'s `validate_address()`), the same call `/checkout/rates` already uses before quoting — see the Shipping note above. There used to be a Google Places (New) `PlaceAutocompleteElement` autocomplete layered on top of this; it was removed since it only assisted data entry and never did the actual validation, so dropping it doesn't change how addresses are checked. `GOOGLE_MAPS_API_KEY` no longer exists as a setting.

Country is a `<select>` (`shipping_api.country_choices()`, ~188 countries) rather than US/CA only — Canada and the US are pinned first, then a hand-picked "Popular destinations" `<optgroup>`, then everything else alphabetical. A handful of sanctioned/embargoed destinations (Cuba, Iran, North Korea, Russia, Sudan, Syria) are deliberately left out of the list entirely. Listing a country isn't a promise any configured carrier reaches it — `get_rates()` already handles "no carrier services this destination" by returning an empty list, which checkout.py surfaces as "No shipping options were found."

**Address format checks (`shipping.format_errors()`)** — a cheap pre-Shippo syntax pass, not the authoritative check (that's still `validate_address()`/Shippo). Exact-format rules (5-digit US ZIP, `A1A 1A1`-style CA postal code, 2-letter state/province) only apply to US/CA, whose formats are fixed and known; every other country gets a looser sanity check (non-empty, no stray digits in city/state, a generic alphanumeric postal code) since formats vary too much worldwide to hardcode per country. `/checkout/rates` runs this before it ever calls Shippo, and returns immediately with red X's on just the offending fields if anything fails — same OOB-swap mechanism as Shippo's own validation errors.

**Tax (`app/tax.py`, checkout.py)** — Stripe Tax Calculation API, called directly (not Checkout's `automatic_tax`) so one calculation backs both Stripe and BTCPay. **Requires Stripe Tax activated in the Dashboard (Settings → Tax) with an origin address** — until then, every checkout attempt 502s on the tax step by design (same "block, don't silently undercharge" policy as shipping). A `Transaction` is recorded from the `Calculation` only once an order is actually paid (webhooks.py), for Stripe's remittance reporting.

**Crypto checkout (`app/btcpay.py`, checkout.py, webhooks.py)** — BTC only, via a self-hosted BTCPay Server; Coinbase Commerce was fully replaced, not kept alongside it. The UI (payment badges on shop/cart/product pages, the "Bitcoin" radio on checkout) is unconditionally present, not gated behind `ENABLE_CRYPTO_CHECKOUT`. It renders disabled with a "(coming soon)" label when the flag is off; the backend still independently rejects a forged `payment_method=btcpay` submission if the flag is off, so the UI state is cosmetic, not the only guard. "BTC only" is enforced in `app/btcpay.py`'s `create_invoice()` by explicitly passing `checkout.paymentMethods: ["BTC", "BTC-LightningNetwork"]` on invoice creation — not left to whatever else might be enabled in the BTCPay store's own dashboard. In practice only on-chain BTC actually shows up on an invoice against either compose stack as they stand — Lightning needs its own node (LND/CLN) configured on the BTCPay store, which neither `docker-compose.btcpay.yml` nor the regtest variant sets up; confirmed live (see below) that a fresh store's invoice offers only BTC-CHAIN. The webhook handler (`/webhooks/btcpay`) matches the incoming `invoiceId` straight back to `Order.payment_reference` (set when the invoice was created) rather than round-tripping through BTCPay's API to read back custom metadata, since BTCPay's webhook payload itself doesn't include it. Requires `docker-compose.btcpay.yml`'s stack (bitcoind + NBXplorer + BTCPay Server + its own Postgres) actually running — see that file and README.md §6 for the one-time setup (creating a store, its on-chain wallet, a Greenfield API key, and a webhook — no RPC credentials to generate, NBXplorer authenticates to bitcoind via a shared cookie-auth-file volume). This whole flow — a real order, a real invoice via `create_invoice()`, paying it with regtest coins via `bitcoin-cli`, and the webhook correctly marking the order paid — was verified live against `docker-compose.btcpay.regtest.yml` (see README.md's "Testing BTC checkout end-to-end"), which is also how a code change here should be re-verified, not just unit-tested. Two things learned the hard way during that verification, worth knowing before touching this stack again: the store's own **Webhooks page 403s** ("missing btcpay.store.canmodifystoresettings") even for the store's Owner on BTCPay v2.4.4 — create webhooks via the Greenfield API instead; and this BTCPay version has **no working regtest "fake pay" button** on the checkout page despite what older BTCPay docs describe — pay the invoice for real with free regtest coins via `bitcoin-cli sendtoaddress` + `-generate 1` instead.

**Email (`app/email.py`)** — provider-agnostic; `send_email()` is the only thing routers call. Brevo needs the sender address verified in the Brevo account, and some accounts also enforce an IP allowlist (Security → Authorised IPs) that will 401 the API even with a correct key.

**Homepage "Ships" badge (`content/home.html`)** — server-renders the generic "Ships across Canada, US and Worldwide" text (`#ships-badge`), then client-side JS calls `https://ipapi.co/json/` (free, keyless, CORS-enabled — no server-side dependency or API key) and swaps in "Ships across Canada" or "Ships across the United States" if the visitor's `country_code` is CA/US. Any other country, a slow/failed/blocked request (2.5s timeout), or JS disabled all just leave the default text, which is why it's phrased to already be true on its own — this is a cosmetic personalization, not load-bearing, so it fails open rather than showing nothing. Sends the visitor's IP to ipapi.co like any client-side geo-IP lookup would; worth knowing if privacy posture ever needs revisiting.

**Admin product/variant CRUD (`admin.py`, `admin/product_new.html`, `admin/product_edit.html`)** — add/edit/remove products and their variants from `/admin/products`, not just the stock/dimensions edits that used to be the only thing there.
- **"Remove" is a smart delete, not always a hard delete.** `OrderItem.variant_id` is a plain FK with no `ON DELETE` behavior, so a product or variant that's ever appeared in a real order can't be hard-deleted — Postgres rejects it with an `IntegrityError`. Both `product_delete` and `variant_delete` try a real `db.delete()` first; if that raises `IntegrityError`, they roll back and set `active = False` instead (hidden from the storefront — see `store.py`'s `active` filters — but past orders keep their own snapshot fields untouched). A product/variant with zero order history is actually gone from the DB when removed. `ProductVariant.active` (migration 0007) mirrors the `Product.active` flag that already gated storefront visibility.
- **Image uploads write to disk**, not just a path string: `_save_product_image()` validates content-type (JPEG/PNG/WebP only) and a 5MB cap, then writes to `app/static/img/products/<slug>.<ext>` — filename is slug-based so re-uploading for the same product overwrites in place. **In production this requires the `product_images` named volume** added to `docker-compose.prod.yml`'s `web` service — prod otherwise runs with `volumes: []` (no bind mounts), so an uploaded file would only live in the running container and vanish on the next redeploy without it.
- **htmx non-2xx gotcha, again**: like the quote wizard, the product/variant edit forms are htmx-driven (`hx-target`+`hx-swap` self-updates) and htmx doesn't swap non-2xx responses by default — every validation-error branch on these routes returns HTTP 200 with the error message in the body, not 4xx. Product *creation* (`POST /admin/products`) is the one exception: that form is a plain (non-htmx) submit that redirects to the new product's edit page on success, so a 400 there is fine and does display correctly.
- **`response.headers[...]` vs `Response(...)`**: `product_delete` returns its own `Response(headers={"HX-Redirect": ...})` rather than mutating an injected `response: Response` dependency — FastAPI only merges that dependency's headers into the final response when the route returns a non-`Response` value (e.g. a dict or `TemplateResponse`); returning a separate `Response` object bypasses it silently. Worth remembering if another route needs to set a header on a raw `Response` return.

**Quote-request wizard (`content.py`'s `/quote`, `templates/content/_quote_form.html`)** — sitewide modal opened via `data-quote-open` on any element. Multi-step: category → size/room/material/timeline/photos → contact info. Photos (up to 3) are attached directly to the admin notification email, not stored server-side — `QuoteRequest.photo_count` just records how many were sent. Server-side validation mirrors the client-side gating and always returns HTTP 200 (even on validation failure) — this project's htmx config doesn't swap non-2xx responses, so a 4xx here would silently freeze the form with no feedback.
- **Accepted photo formats** (`content.py`'s `ALLOWED_PHOTO_CONTENT_TYPES`) are deliberately narrow — JPEG/WebP/AVIF/HEIC/HEIF, not `image/*` — chosen for being genuinely compressed (photos are email attachments here, not just stored, so size matters), while still covering what a phone's photo app actually produces: HEIC specifically because that's the default format iPhones save camera roll photos in, not an edge case. Both the client (`_quote_form.html`'s `FORMAT_LABELS`/`EXTENSION_LABELS`) and server (`_EXTENSION_CONTENT_TYPES`) fall back to the filename extension when the browser reports an empty/generic content-type — common for HEIC specifically on some mobile browsers — rather than silently dropping the photo.
- **Step 2 is category-dependent**, not one fixed field set — see `QuoteRequestIn`'s `require_room_unless_outdoor`/`require_material_unless_restoration`/`require_repair_type_for_restoration` validators for the exact rules: Outdoor skips "Room / setting" (redundant with the category itself) and gets its own weather-resistant material list (Cedar/Teak/Pressure-treated Pine/Redwood/Reclaimed) instead of the interior species list (Oak/Walnut/Maple/Cherry/Pine/Reclaimed); Built-ins gets that same interior list plus trade-standard sheet goods (Plywood/MDF/Particleboard), since shelving/cabinet carcasses commonly use those rather than solid species; Restoration skips "Wood / material preference" entirely (it's an existing piece, not a new wood choice) and instead requires a "Repair type" chip (Structural/Cosmetic-refinish/Missing-or-broken-parts/Other) alongside its existing required-photo rule, plus an optional free-text "Wood type" field (`wood_type` — separate column from `material`, since it describes the existing piece rather than expressing a new-wood preference).
- **A `hidden` field's input still submits its value** — `hidden` only affects rendering, not form participation. `_quote_form.html`'s `setFieldHidden()` helper also sets `.disabled = true` on the underlying `<select>`/`<input>` whenever its wrapper is hidden, which is what actually drops it from the submission (a real bug caught during testing: Outdoor was silently saving `room: "Living Room"` and every non-Built-ins category was saving `wall_in: 60`, both just leftover `<select>`/slider defaults, before this fix).

## 6. Testing payments/shipping/tax/email locally

- **Stripe:** `stripe listen --forward-to localhost:8000/webhooks/stripe`, test card `4242 4242 4242 4242`.
- **Stripe Tax:** activate it in test mode (Dashboard → Settings → Tax) or every checkout will 502 on the tax step.
- **Shippo:** free test API key from shippo.com; only carriers activated under Settings → Carriers in your Shippo dashboard return rates, regardless of the code's 5-carrier allow-list.
- **BTCPay Server:** `docker-compose.btcpay.yml` (mainnet) is prod-only, but `docker-compose.btcpay.regtest.yml` brings up the same stack on regtest for local start-to-finish testing — see README.md's "Testing BTC checkout end-to-end" for the exact setup and how to pay a test invoice with free regtest coins.
- **Email:** `EMAIL_PROVIDER=console` prints to the terminal; a real provider needs its API key plus (Brevo) a verified sender and possibly an IP allowlist entry.

## 7. Deploying to the DigitalOcean droplet

1. Provision the droplet — Ubuntu LTS, install Docker + Compose plugin.
2. Point DNS — A record for your domain → droplet IP.
3. Copy the repo to the droplet (`git clone`, or `scripts/deploy.sh` to rsync).
4. Create `.env.prod` (see §3) and fill in:
   - `ENVIRONMENT=production`
   - **Live** Stripe keys, with Stripe Tax activated in **live** mode
   - `BTCPAY_URL`/`BTCPAY_API_KEY`/`BTCPAY_STORE_ID`/`BTCPAY_WEBHOOK_SECRET` (if enabling crypto — see step 6 below)
   - A **live** Shippo API key + your real ship-from address
   - Real email provider creds (`EMAIL_PROVIDER=postmark|sendgrid|brevo`)
   - Strong `ADMIN_SESSION_SECRET` (`openssl rand -hex 32`)
   - `DOMAIN=yourdomain.com`
5. Bring the stack up (Nginx starts in HTTP-only bootstrap mode first, since it can't run the HTTPS config before a cert exists):
   ```bash
   make prod-up
   make prod-migrate
   ```
6. **(Optional)** Bring up `docker-compose.btcpay.yml`'s self-hosted BTCPay Server stack if enabling crypto checkout — full one-time setup (waiting for `bitcoind` to sync, creating the BTCPay store/wallet/API key/webhook) is in README.md §6, not repeated here.
7. Get the cert and switch Nginx to HTTPS — pass the BTCPay subdomain as a 3rd arg if step 6 applies:
   ```bash
   ./scripts/init_certbot.sh yourdomain.com you@yourdomain.com [pay.yourdomain.com]
   ```
8. Seed the admin user (and sample catalog, if wanted) on the droplet:
   ```bash
   docker compose -f docker-compose.yml -f docker-compose.prod.yml exec web python scripts/init_db.py
   ```
9. Confirm `https://yourdomain.com` loads, then register a **live** Stripe webhook endpoint pointing at `/webhooks/stripe`. (BTCPay's webhook is registered against BTCPay itself in step 6, not Stripe's dashboard.)

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
| BTCPay Server (Bitcoin) | UI-complete, backend disabled pending the `docker-compose.btcpay.yml` stack + real API keys |
| Shippo carrier accounts | Only carriers activated in the Shippo dashboard actually return rates |
| Stripe country/payout support | Check stripe.com/global before going live |
| Domain + DNS | `DOMAIN` env var |

## 9. Security checklist before going live

- [ ] Admin password strong/unique; consider IP allowlisting in `nginx.prod.conf`
- [ ] `ADMIN_SESSION_SECRET` is a real random value, not a placeholder
- [ ] Stripe/BTCPay webhook signature verification on (`STRIPE_WEBHOOK_SECRET` always required; `BTCPAY_WEBHOOK_SECRET`/`BTCPAY_URL` required if `ENABLE_CRYPTO_CHECKOUT=true` — app refuses to start in prod without them)
- [ ] BTCPay Server's temporary setup port (49392) is not left open to the public internet after initial store setup — only Nginx's `pay.${DOMAIN}` block should reach it
- [ ] Stripe Tax activated in live mode, not just test
- [ ] `.env.prod` not committed to git (already gitignored)
- [ ] HTTPS enforced (Nginx redirects HTTP→HTTPS in prod)
- [ ] Database not exposed on a public port in `docker-compose.prod.yml`
