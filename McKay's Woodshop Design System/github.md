repo: streeterc/mckayswoodshop_web
branch: main

## Last sync

date: 2026-09-18T13:24:00Z

### Updated in this project

- Website UI kit rebuilt to match the shipped site: nav is now Home / Shop / Cart with a copper "Request a quote" action.
- Added Shop, Product detail, Cart and Journal screens; retired the old Work / Project detail screens.
- Quote request rebuilt as the site's 3-step wizard (category tiles, size sliders, timeline chips, photo upload).
- Display typeface switched from Newsreader to Fraunces, matching `app/static/css/base.css`.

## Screen map

| Project screen | Repo files |
| --- | --- |
| `ui_kits/website/Chrome.jsx` | `app/templates/base.html`, `app/static/css/style.css` |
| `ui_kits/website/Home.jsx` | `app/templates/content/home.html`, `app/templates/_macros.html` |
| `ui_kits/website/Shop.jsx` | `app/templates/store/product_list.html` |
| `ui_kits/website/ProductDetail.jsx` | `app/templates/store/product_detail.html` |
| `ui_kits/website/Cart.jsx` | `app/templates/store/_cart_table.html` |
| `ui_kits/website/Journal.jsx` | `app/templates/content/post_list.html` |
| `ui_kits/website/QuoteRequest.jsx` | `app/templates/content/_quote_form.html` |
| `components/navigation/NavBar.jsx` | `app/templates/base.html`, `app/static/css/style.css` |
| `tokens/fonts.css`, `tokens/typography.css` | `app/static/css/base.css` |
