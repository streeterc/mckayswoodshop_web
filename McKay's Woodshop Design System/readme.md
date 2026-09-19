# McKay's Woodshop — Design System

Custom carpentry and woodworking. The shop builds kitchens, built-in cabinetry, furniture, and stairs and railings, and runs every job through the same six stages in-house: measure, design, mill, assemble, finish, install.

The brand's one fixed point is the supplied logo: a rough-hewn, hand-cut lockup — "McKAY'S" over a four-tile grid (cross, pine, buck, stacked lumber) over "WOODSHOP" — copper on forest green. **Everything built around it is refined and precise.** The mark carries the rustic; the system does not repeat it. No distressed textures, no faux-wood fills, no rope, no chalkboard type, no plaid.

## Sources given

| Source | What it was |
| --- | --- |
| `uploads/logo.png` | 1000×1000 raster logo, copper (#D17F51) on forest green (#123425). The only brand asset supplied. |
| Brief | "McKay's Woodshop. Caperentry Woodworking." + "The logo is rustic but everything else should be refined and precise." |

No codebase, Figma file, website, deck, photography or font binaries were provided. Everything below the logo — palette extensions, type, spacing, components, screens — was authored from those two inputs and is a **proposal to review**, not a recreation of existing product. Where a decision was invented rather than derived, it is flagged in this file.

---

## CONTENT FUNDAMENTALS

**Voice: the person who built it, telling you how.** Plain, specific, unhurried. The shop is confident about craft and matter-of-fact about everything else. It never sells with adjectives; it sells with facts a customer can check.

- **We, and you.** First-person plural for the shop ("We measure the room, draw the piece, mill the boards"). Second person for the customer ("Tell us about the room"). Never "McKay's Woodshop believes…" and never the passive "your project will be assessed".
- **Sentence case everywhere.** Headings, buttons, labels in source. Title Case is not used. The system uppercases button labels, eyebrows and field labels in CSS — so write `Request a quote`, not `REQUEST A QUOTE`.
- **Specifics over claims.** "Nineteen feet of frameless cabinetry cut from three logs" beats "premium craftsmanship". Numbers are welcome: `9–11 weeks`, `410 rooms`, `11/16 in out over nineteen feet`.
- **Sentence length varies; rhythm is calm.** Two or three sentences per paragraph. No one-line punchy fragments, no rhetorical questions in marketing copy.
- **No exclamation marks. No emoji, anywhere** — not in UI, not in email, not in the newsletter.
- **Measurements** are written with the multiplication sign and a unit: `96 × 40 × 30 in`. Never `96x40x30`. Feet and inches for rooms, inches for pieces, weeks for lead times. Currency is CAD, written `$48,200`.
- **Job numbers** are `MW-####` and always set in the mono face.
- **Species and finishes are named, never generalised:** "rift-sawn white oak", "hand-rubbed oil", "dovetailed maple drawer box".
- **Admit the hard parts.** The shop's most convincing copy describes what went wrong and how it was handled: "The back wall ran 11/16 in out over nineteen feet. Every scribe was cut on site."
- **Faith is present but quiet.** The cross in the mark is part of the lockup and is never removed, never explained in marketing copy, and never turned into a message. It is the shop's, not the customer's.

Examples that are on-voice:
> We measure the room, draw the piece, mill the boards and finish it by hand. Nothing is subcontracted and nothing leaves the shop unfinished.
> Rough measurements are fine. We'll read this before we call, and we'll bring a tape when we visit.
> Lost your job number? Call the shop and we'll read it off the board.

Off-voice: "Crafting dreams, one board at a time." · "Unleash your kitchen's potential." · "🪵 Handmade with love!" · "Our team of seasoned professionals leverages decades of expertise."

---

## VISUAL FOUNDATIONS

### Colour
Two brand colours, both lifted from the logo, plus one warm neutral family.

- **Forest** — `--forest-700 #123425` is the brand green (the logo field). Deeper `--forest-800/900` for portal chrome and footers, `--forest-600` for hovers, `--forest-300` for muted text on green.
- **Copper** — `--copper-600 #D17F51` is the brand copper (the logo mark). It is the accent: the section rule, the active tab underline, the marketing CTA, the switch knob. Copper is never a large field behind body text.
- **Sand** — warm neutrals only. `--sand-50` is the page, `--sand-100` panels, `--sand-200/300` rules, `--sand-700` body ink. No cool or blue-grey anywhere in the system.
- **Status** — moss (on schedule), amber (waiting on someone), barn red (blocked). Each has a pale wash for backgrounds.
- **Approved pairings**: copper on forest, forest on paper, forest on copper, paper on deep forest. Copper on paper is for accents and rules, not body text.
- **No gradients.** Not in backgrounds, not in buttons, not as image overlays. Flat fields only.

### Typography
| Role | Face | Notes |
| --- | --- | --- |
| Display / headings | **Newsreader** | Optical-size serif, regular weight, `-0.02em`, leading 1.02–1.25. Refined counterweight to the rustic mark. |
| UI / body | **Work Sans** | 17px / 1.62 for prose at a 64ch measure; 15px / 1.5 for dense UI. |
| Specs, numbers, dates | **IBM Plex Mono** | Every measurement, job number, date and dollar figure, with tabular figures. |

Structure comes from uppercase micro-caps, not from weight: eyebrows at 11px/600/`.22em` in copper, field and panel labels at 12px/600/`.14em`. Bold body text is rare; italics rarer.

**Font substitution — needs your input.** No font binaries came with the brand assets, so these three are Google Fonts stand-ins loaded from the CDN (`tokens/fonts.css`). The logo's own lettering is a hand-cut rough slab that no Google face matches closely; nothing in the system tries to imitate it — **the wordmark is always the supplied artwork, never typeset.** If the shop has licensed faces (or a vector of the wordmark), send them and I'll swap the `@font-face` rules.

### Space, grid and layout
4px-derived scale (2, 4, 6, 8, 12, 16, 20, 24, 32, 40, 56, 72, 96, 128). 1200px container, 24px gutter, 96px section rhythm (56px tight). Prose caps at 64ch. The portal uses a fixed 232px sidebar and a scrolling content column; nothing else is fixed or sticky except the quote-form summary rail — no pinned columns or intro rails on marketing pages.

### Backgrounds and imagery
Backgrounds are **flat colour fields** — paper, sand, or forest green. No repeating textures, no wood-grain tiles, no paper-fibre overlays, no full-bleed gradients. Photography is the only imagery: the shop, the crew, the wood, finished rooms. It should be **warm, natural-light, slightly underexposed, no grain filter, no black-and-white, no heavy vignette** — colour temperature that sits with the copper. Photos are placed square in their container at `--radius-image` (3px), full-bleed inside cards, never with a drop shadow and never as a scrim-and-text hero. Text goes beside a photo, not on top of it, so no protection gradients or capsules are needed anywhere in the system.

**One exception — the marketing hero.** The home hero may run its photo full-bleed and undimmed, with the text on a single **flat forest panel**: `rgba(11,33,23,.72)`, 24px padding, 5px corners, no border, no blur, no gradient, max 38rem wide, left-aligned in the container. The panel is a colour field, not a scrim — the photo is never darkened around it, and it is used on the hero only. Everywhere else, text still goes beside photos.

**No photography was supplied.** The UI kits use a labelled `Photo` placeholder where real images belong.

### Corners, borders, cards
Corners are machined, not soft: 2px (tiles, badges), 3px (buttons, fields), 5px (cards), 8px (large panels), 14px (rare), pill (tags only — the one full-round shape in the system). A card is **white, 1px `--sand-200` hairline, 5px corners, 20px padding, no shadow.** Shadow is earned: `--shadow-sm` for a panel that floats, `--shadow-md` on hover for a card that is a link, `--shadow-overlay` for modals. Warm-tinted, single-direction, low opacity — never a coloured glow. Two shadowed cards never nest; the inner one becomes `sunken` (sand fill).

Rules: 1px hairlines separate rows; 2px forest is emphasis; the brand's signature is a **48 × 3px copper rule above a display heading**. One coloured left edge exists in the whole system — the 3px status edge on `Toast` — and nothing else may borrow it.

### Motion
Short and mechanical. 80/140/200/320/560ms; `ease-out cubic-bezier(.16,.84,.44,1)` for entrances and hovers, `ease-in-out cubic-bezier(.45,0,.25,1)` for things that move or reorder. **Nothing bounces, nothing springs, nothing scales up on hover.** Reveals are a short fade plus ≤8px of travel. Cards that are links lift exactly 1px.

### Interaction states
- **Hover** — fills darken one step (forest-700 → forest-600); quiet controls take a `--sand-100` wash; linked cards gain `--shadow-md` and a 1px lift.
- **Press** — the element sinks: `translateY(1px)` plus a subtle inset shadow. Never a scale transform.
- **Focus** — 1px forest border plus a 3px translucent copper ring (`rgba(209,127,81,.22)`); global `:focus-visible` is a 2px copper outline at 2px offset. Never the browser blue.
- **Disabled** — `--sand-200` fill, `--sand-400` text, `not-allowed` cursor. No opacity fades.
- **Links** — forest green with a copper 1px underline; hover turns the text copper.

### Transparency and blur
Used three times, deliberately: the modal scrim (`rgba(8,24,15,.52)` with a 2px blur), the 18%-white hairline on forest fields, and the hero's flat text panel (`rgba(11,33,23,.72)`, no blur). No frosted panels, no translucent navigation, no glass cards.

---

## ICONOGRAPHY

**The brand ships no icon set.** The only supplied artwork is the logo, whose four tiles yield four glyphs — cross, pine, buck, stacked lumber — extracted here as PNGs in both colourways (`assets/icon-*-green.png`, `assets/icon-*-copper.png`). These are **brand stamps, not UI icons**: one per screen region at most, used as a section ornament or a quiet signature in a footer. The `Mark` component is the only way to place them.

**Functional icons are Lucide** (`lucide-static@0.544.0`, loaded per-glyph from unpkg as a CSS mask so they take `currentColor`). This is a **flagged substitution** — chosen because its 2px-nominal stroke, square terminals and geometric construction match the system's machined-corner, hairline-rule character, and because it covers the shop's vocabulary (`ruler`, `hammer`, `tree-pine`, `file-text`, `receipt`, `printer`, `map-pin`, `calendar-days`). Sizes in use: 14 inline, 18 in buttons and rows, 22–26 in feature cards, 32 in empty states. Always via the `Icon` component, never inline SVG.

**On the shipped website** the same Lucide 0.544.0 glyphs are self-hosted as SVG files (`app/static/img/icons/<name>.svg`, ISC-licensed) and drawn with the identical CSS-mask technique via a `.icon` span (`--icon: url(...)` set inline) — no CDN request, no JavaScript. Every functional icon on the site uses this; the one exception is the hero's social row, since Lucide carries no brand logos.

**Never**: emoji (in any surface), unicode characters used as icons, hand-drawn SVG, two icon families on one screen, icons as decoration next to a heading that already has an eyebrow.

If the shop owns an icon set — or wants the four glyphs turned into a proper vector set — send it and Lucide comes out.

---

## Intentional additions

No source defined a component inventory, so a standard set was authored. Two additions are brand-specific rather than conventional:

- **`SpecList`** — a woodshop describes everything in dimensions, species, finish and lead time; this is the one layout that appears on nearly every screen, so it is a primitive rather than a per-screen composition. On the home page it also carries "What I build" (Lucide icon + micro-cap label, one-line description) and "How it works" (mono step number + label, one-line description), each in the two-column split: heading and intro left, list right, 96px between the two sections.
- **`ProgressSteps`** — the shop's six stages (measure, design, mill, assemble, finish, install) are the spine of both the marketing site and the portal.
- **`Icon` / `Mark` / `Logo`** — wrappers so no consumer ever hand-rolls a glyph or retypesets the wordmark.

---

## Index

**Root**
- `styles.css` — the single stylesheet consumers link. `@import` list only.
- `tokens/` — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `radius.css`, `elevation.css`, `motion.css`, `base.css`.
- `assets/` — `logo-full.png`, `logo-full-knockout.png`, `logo-mark.png`, `logo-mark-green.png` (+ `-2x`, the four glyphs in forest green on transparent), `wordmark-mckays.png`, `wordmark-woodshop.png`, and `icon-{cross,pine,buck,lumber}-{green,copper}.png`.
- `thumbnail.html` — the system's homepage tile.
- `SKILL.md` — Agent Skills entry point.

**Components** (`components/<group>/`) — each with `.jsx`, `.d.ts`, `.prompt.md`, and one card HTML per directory.

| Group | Components |
| --- | --- |
| `brand/` | Logo, Mark, Icon |
| `core/` | Button, IconButton, Badge, Tag, Card, Divider, SpecList |
| `forms/` | Field, Input, Textarea, Select, Checkbox, Radio, Switch |
| `navigation/` | NavBar, SideNav, Tabs |
| `feedback/` | Dialog, Toast, Tooltip, ProgressSteps |

**UI kits** (`ui_kits/<product>/`)
- `website/` — marketing site: home, work index, project detail, quote request. See its README.
- `portal/` — client portal: sign-in, dashboard, project (milestones / drawings / specs / settings), invoices, messages.

**Guidelines** (`guidelines/`) — 22 specimen cards backing the sections above: colour scales and roles, the three type faces in use, spacing, radii, elevation, rules, motion, interaction states, lockups, glyphs, approved pairings.

**No slide template** was supplied, so none was invented.
