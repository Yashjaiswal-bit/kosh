# Kosh

A manual money tracker. Accounts, credit-card billing cycles, shared bills, category
ceilings and a live interest engine — built to a design of my own, and running entirely
in the browser.

Nothing is sent anywhere. The whole ledger lives in `localStorage` on the device you
open it on. There is no account, no server and no sync.

## What it does

- **Overview** — net worth, month-to-date movement, and three tiles: came in, went out, invested.
- **Accounts** — grouped by how fast the money moves (liquid, locked, cash), with a
  compounding interest engine you set the rate on.
- **Cards** — statement day and payment due day per card, with cycle-by-cycle outstanding.
  Payments clear the oldest balance first, the way an issuer applies them.
- **Quick log** — amount, tag, done. Money out or money in.
- **Shared** — split a bill equally or by weight, settle it, see who owes whom.
- **Trends** — spend against a monthly ceiling per category.
- **Insights** — rules that fire off real numbers: ceilings broken, statements due,
  cash that has drifted, bills left open a fortnight.

## Running it locally

Any static server will do. It needs `http://`, not `file://`, because of the service worker.

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Layout

```
index.html            document shell
styles.css            the Organic design system, light and dark
app.js                model, screens, sheets, actions
sw.js                 offline cache for the app shell
manifest.webmanifest  PWA metadata
assets/               icons
fonts/                Caprasimo + Figtree, bundled so it works offline
```

## Your data

- It is stored per origin. The copy at `https://you.github.io/kosh/` is a different
  origin from anywhere else you have run this, so ledgers do **not** carry over.
  Move one with **Settings → Data → JSON**, then **Restore** on the other.
- Clearing site data in the browser erases it. Export now and then.
- Everything is derived from the entries you type. Balances, cycles, ceilings and
  interest are all computed — delete an entry and every figure re-derives.

## Fonts

Caprasimo and Figtree are bundled under the SIL Open Font License 1.1. See `fonts/OFL.txt`.
