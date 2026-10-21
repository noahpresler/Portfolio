# presler.me

Personal site and portfolio. Next.js 16 (App Router), Tailwind 4, Motion, Lenis.

```sh
npm install
npm run dev
```

## Content

Everything on the page is driven by two files:

- `content/projects.json` — personal projects. `display` picks which screenshots are featured and whether the main one gets a browser frame; `tint` colors the card glow.
- `content/wearables.json` — Fitbit & Pixel Watch devices, newest first. Each accolade keeps the full verified `quote` plus a `short` excerpt that must be a verbatim substring of it. `firstLook: true` labels coverage as an early hands-on.

`content/research/` holds the unedited research (all sourced facts, images and quotes) these were curated from.

Images live in `public/projects/<slug>/` and `public/wearables/<slug>/`; keep `width`/`height` in the JSON in sync with the files.

Contact links are in `lib/site.ts`.
