# UI kit — marketing website

Click-through recreation of the public site at mckayswoodshop.ca as this design system would build it.

**Screens** (switched by the header nav, no routing):
- `Home.jsx` — forest-green hero with stat row, four-service grid, featured work, the six-stage process rail, testimonial.
- `Work.jsx` — filterable project index. Tags filter client-side; empty state included.
- `ProjectDetail.jsx` — hero + detail photo grid, prose, `SpecList` of job specs, shop notes.
- `QuoteRequest.jsx` — the lead form. Full `Field`/`Input`/`Select`/`Radio`/`Checkbox` coverage, a confirm `Dialog` and a success `Toast`.
- `Chrome.jsx` — `Shell`, `SiteHeader`, `SiteFooter`, `SectionHead`, `Eyebrow` and the `Photo` placeholder.

**Notes**
- Every control comes from the bundled components; the kit only composes layout.
- `Photo` is an honest placeholder. No photography was supplied with the brand assets — drop real images in where these sit.
- Content is written to the voice rules in the root readme: first-person plural, sentence case, measurements in mono with the × sign.
