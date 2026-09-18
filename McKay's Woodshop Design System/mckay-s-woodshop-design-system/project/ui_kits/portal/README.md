# UI kit — client portal

Where a client watches their job move through the shop. Opens on sign-in; the sidebar switches screens.

**Screens**
- `Login.jsx` — split screen: forest-green brand panel, white sign-in card. Email + job number, no password.
- `Dashboard.jsx` — build-stage rail, the one item needing the client, recent activity, job specs, next site date.
- `Project.jsx` — tabbed: milestones (six shop stages), drawings table with approval flow, specs, notification settings. Contains the approval `Dialog` and success `Toast`.
- `Invoices.jsx` — three summary figures, the invoice table, the payment schedule.
- `Messages.jsx` — thread with the shop floor; client bubbles are forest green, shop bubbles are sand.
- `PortalChrome.jsx` — `PortalShell` (SideNav + content column), `TopBar`, `Content`, `PanelTitle`.

**Notes**
- Numbers, dates, dimensions and money are all set in IBM Plex Mono with tabular figures. Currency is CAD.
- Job numbers follow `MW-####`.
- Every table row and status marker uses the bundled `Badge`; nothing is restyled locally.
