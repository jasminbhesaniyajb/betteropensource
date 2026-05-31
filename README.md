# BetterOpenSource

A modern, fully responsive directory for discovering the best **open-source alternatives** to popular proprietary software (Figma → Penpot, Notion → AppFlowy, Slack → Mattermost, and more).

Built with the latest Next.js App Router, fully statically generated, deeply interlinked, and SEO-optimized.

## Tech stack

- **Next.js 16** (App Router, React 19) + **TypeScript**
- **Tailwind CSS v4** + **shadcn/ui** (Base UI primitives)
- **Lucide** icons · **Framer Motion** (`motion`) animations
- **next-themes** (light/dark, no flash) · **Fuse.js** fuzzy search
- **react-markdown** for the blog · **@vercel/analytics**

## Getting started

```bash
pnpm install
cp .env.example .env.local   # fill in values (see below)
pnpm dev                     # http://localhost:3000
```

Production:

```bash
pnpm build && pnpm start
```

## Environment variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical/OG/sitemap base URL |
| `GITHUB_TOKEN` | Token used by the feedback API to open GitHub Issues |
| `GITHUB_FEEDBACK_REPO` | `owner/repo` feedback is filed to (defaults to the project repo) |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Optional — enables the Plausible analytics script |

The feedback widget posts to `POST /api/feedback`, which opens a GitHub Issue
using `GITHUB_TOKEN`. Without a token it returns a graceful message and the UI
shows a friendly fallback — nothing breaks.

## Project structure

```
src/
 ├─ app/                  # routes: home, tools, alternatives, categories,
 │                        # compare, trending, new, blog, legal, api, sitemap…
 ├─ components/
 │   ├─ common/  layout/  home/  alternatives/  tool/  compare/  blog/  ui/
 ├─ constants/            # site config, categories, navigation
 ├─ data/                 # tools, proprietary apps, blog posts, testimonials
 ├─ hooks/                # localStorage, bookmarks, recently-viewed, votes…
 ├─ lib/                  # seo (metadata + JSON-LD), search, recommendations…
 ├─ services/             # data accessors + client API services
 └─ types/                # shared TypeScript types
```

## Editing content

All content lives in typed data files — **no hardcoded content in components**:

- `src/data/tools.ts` — the open-source tools directory
- `src/data/alternatives.ts` — proprietary tools they replace
- `src/data/blog.ts` — blog posts (Markdown)
- `src/constants/categories.ts` — category taxonomy

Add an entry to `tools.ts` and the listing, detail, category, alternative,
comparison, sitemap, and search pages all update automatically.

## Features

Home with animated hero & search · category/alternative/tool listing with
filters, fuzzy search & sort · rich tool detail pages (features, pros/cons,
install, FAQ, repo stats, comparisons) · side-by-side comparison pages ·
⌘K command menu · bookmarks, recently-viewed & voting (localStorage) ·
heuristic "recommended for you" · blog · light/dark mode · full SEO
(dynamic metadata, JSON-LD, sitemap, robots, OG images) · feedback → GitHub
Issues · accessible, responsive, reduced-motion-aware.

---

Built by **Jasmin Bhesaniya** · jasminbhesaniyajb@gmail.com
