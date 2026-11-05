# Talha — Developer Portfolio

**Engineering ideas into digital experiences.**

The central portfolio hub for [@talhadev-pk](https://github.com/talhadev-pk) — a single-page, fully static showcase of six real software projects, each with its own public repository, README and (where deployed) live demo.

**Live:** https://talhadev-pk.github.io/

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6.svg)

---

## The collection

| # | Project | What it is | Repository | Live |
|---|---------|------------|------------|------|
| 01 | **FlowPilot** | Visual workflow-automation SaaS (React Flow builder, simulated runs) | [flowpilot](https://github.com/talhadev-pk/flowpilot) | [demo](https://talhadev-pk.github.io/flowpilot/) |
| 02 | **CommerceOS** | E-commerce management & business intelligence platform | [commerceos](https://github.com/talhadev-pk/commerceos) | [demo](https://talhadev-pk.github.io/commerceos/) |
| 03 | **ProseQ AI** | Honest-AI writing workspace (Tiptap editor, rule-based tools) | [proseq-ai](https://github.com/talhadev-pk/proseq-ai) | [demo](https://talhadev-pk.github.io/proseq-ai/) |
| 04 | **TrackSphere** | Project & team operations workspace (Kanban, timeline, workload) | [tracksphere](https://github.com/talhadev-pk/tracksphere) | [demo](https://talhadev-pk.github.io/tracksphere/) |
| 05 | **NexaCore** | Local-first enterprise BI (KPIs, CSV pipelines, OLS forecasting) | [nexacore](https://github.com/talhadev-pk/nexacore) | [demo](https://talhadev-pk.github.io/nexacore/#/app) |
| 06 | **RestaurantOS** | Browser-native restaurant simulation (29-table IndexedDB, POS/KDS) | [restaurantos](https://github.com/talhadev-pk/restaurantos) | [demo](https://talhadev-pk.github.io/restaurantos/) |

All descriptions, capabilities and screenshots on the site are grounded in each repository's own documentation — no invented metrics.

## Features

- Interactive project constellation hero (canvas) with clickable project nodes
- Search + category filtering across the project catalogue
- Deep-linkable project modals (`#/project/flowpilot`) with screenshot galleries, prev/next and keyboard navigation
- Dark / light themes with persisted preference
- Editable profile settings (name, role, tagline, email) persisted to `localStorage`
- Scroll progress, scroll-spy navigation, back-to-top, toasts, custom 404 route
- Fully static; deploys to GitHub Pages via Actions with zero configuration

## Tech stack

**React 19 · TypeScript · Vite 7 · Tailwind CSS 4 · Framer Motion · Lucide icons** — no backend, no database, no paid services. Project screenshots are real captures from the repositories; the three projects that intentionally ship none are represented with clearly-labelled identity artwork.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # preview the production build
```

Requires Node.js 18+.

## Editing content

Everything presentation-level lives in **one file**:

```
src/config/portfolio.ts   ← profile, projects, skills, process, stats
```

Profile fields (display name, role, tagline, email, WhatsApp) can also be changed at runtime from the in-app settings drawer (gear icon, top-right).

> **Privacy note:** settings-drawer edits are stored in `localStorage` **in your browser only** — they are never uploaded, never committed, and visitors still see the defaults from `src/config/portfolio.ts`. To change a value permanently for everyone, edit the config file and push.

## Adding your own project screenshots

FlowPilot, CommerceOS and ProseQ AI already show **real captures**, loaded directly from each repository's own `docs/screenshots` (or `screenshots/`) folder via GitHub's CDN — see `REPO_RAW` in `src/config/portfolio.ts`. The site therefore always mirrors the repos.

To add screenshots for **TrackSphere, NexaCore or RestaurantOS** (or replace existing ones with repo-local files):

**Fastest path — the built-in capture helper:**

```bash
npx playwright install chromium   # one-time setup
node capture.mjs tracksphere "https://talhadev-pk.github.io/tracksphere/#/app/overview" overview
node capture.mjs tracksphere "https://talhadev-pk.github.io/tracksphere/#/app/board" kanban
```

This captures at exactly the card size (1440×900 @2x retina) and saves files to `public/shots/tracksphere/` automatically, then prints the exact config line to paste.

**Manual path — browser DevTools:** open the app, press <kbd>F12</kbd> → <kbd>Ctrl/Cmd + Shift + M</kbd> (device toolbar) → size **1440×900**, DPR 2 → <kbd>Ctrl/Cmd + Shift + P</kbd> → **“Capture screenshot”** (viewport) or **“Capture full size screenshot”** (whole scrollable page). Save the PNG to `public/shots/<project-id>/<name>.png`. Keep images under ~250 KB (export at 1440px wide; use [squoosh.app](https://squoosh.app) to compress or convert to `.webp`).

Then **register the file** in `src/config/portfolio.ts` — find the project (Ctrl+F for `id: "tracksphere"`) and fill in its `screenshots` array:
   ```ts
   screenshots: [
     { src: "shots/tracksphere/kanban.png",
       alt: "TrackSphere Kanban board with drag-and-drop tasks",
       caption: "Kanban — drag changes persist" },
   ],
   ```
   - `src` — path relative to `public/` (no leading slash, case-sensitive). The **first** entry is the one shown on the project card.
   - `alt` — accessibility text; `caption` — shown under the image in the modal gallery.
4. **For TrackSphere / NexaCore / RestaurantOS:** also delete the `artwork: { … }` block — the “identity artwork” label disappears automatically once `screenshots` is non-empty. (Once the screenshots live in the project repo itself, you can alternately point `src` at its raw URL, like the other projects do.)
5. **Verify locally:** `npm run dev` → open the project card → Details → gallery. Then `npm run build` (and optionally `node qa.mjs`, which asserts screenshots load).
6. **Ship it:** `git add public/shots src/config/portfolio.ts && git commit -m "add tracksphere screenshots" && git push`. GitHub Actions redeploys in about a minute.

The same captures are worth committing to each project repo’s `docs/screenshots/` folder too, so the project README and the portfolio stay in sync.

## Deployment (GitHub Pages)

This repo is designed to be the **user site** `talhadev-pk.github.io`:

1. Push the code to the repository named `talhadev-pk.github.io`.
2. In **Settings → Pages**, set Source to **GitHub Actions**.
3. Push to `main` — `.github/workflows/deploy.yml` builds and publishes automatically.

The Vite base path is `/` (correct for a user/organization Pages site), and routing is hash-based, so deep links like `/#/project/commerceos` never 404 on static hosting.

## Browser QA

```bash
npm run build && (cd dist && python3 -m http.server 4173 &)
npx playwright install chromium   # first run only
node qa.mjs                       # 22 checks: routes, modal, search, themes, persistence, overflow
```

The suite asserts zero console errors, verifies real screenshot loading, theme & settings persistence across reloads, hash deep links, the custom 404, and horizontal-overflow freedom at desktop and mobile widths.

## Project structure

```
src/
  config/portfolio.ts     all site content (single source of truth)
  lib/app.tsx             theme + editable-settings store, toasts, hash router
  components/
    Hero.tsx  SystemMap.tsx  FlowField.tsx   opening experience
    Work.tsx  ProjectModal.tsx               project catalogue + details
    Expertise.tsx  Process.tsx  About.tsx    story sections
    Contact.tsx  Footer.tsx                  contact + attribution
    Nav.tsx  SettingsDrawer.tsx  NotFound.tsx  chrome
    ui.tsx  icons.tsx                        shared primitives
public/
  shots/                  real screenshots from the six repositories
  art/                    identity artwork + OG image
.github/workflows/deploy.yml
```

## License

MIT — see [LICENSE](LICENSE).

Made with ♥ by Talha
