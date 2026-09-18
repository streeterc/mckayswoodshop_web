# Website UI kit

Screens mirror the shipped site in `streeterc/mckayswoodshop_web` (`app/templates/`).

| File | Repo source |
| --- | --- |
| `Chrome.jsx` | `templates/base.html`, `static/css/style.css` (header, footer, glyph row) |
| `Home.jsx` | `templates/content/home.html` |
| `Shop.jsx` | `templates/store/product_list.html` |
| `ProductDetail.jsx` | `templates/store/product_detail.html` |
| `Cart.jsx` | `templates/store/_cart_table.html` |
| `Journal.jsx` | `templates/content/post_list.html` |
| `QuoteRequest.jsx` | `templates/content/_quote_form.html` (3-step wizard) |

Nav is Home / Shop / Cart with a copper "Request a quote" action, matching `base.html`.
Placeholder copy from the repo templates is filled in here with representative shop copy so
the kit reads as a finished page; the structure and all real strings are unchanged.
