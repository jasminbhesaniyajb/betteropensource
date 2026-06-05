# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

> Per AGENTS.md: this is a newer Next.js than your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing framework code, and heed deprecation notices.

## What this is

**BetterOpenSource** — a statically-generated directory of open-source alternatives to proprietary software (Figma→Penpot, Notion→AppFlowy, Clerk→Better Auth, etc.). Next.js 16 App Router + React 19, TypeScript, Tailwind v4, shadcn/ui. Package manager is **pnpm**. Path alias `@/*` → `src/`.

## Commands

```bash
pnpm dev                 # dev server (Turbopack), localhost:3000
pnpm build               # production build — this IS the test suite (typechecks + lints + prerenders every route)
pnpm start               # serve the production build
pnpm lint                # eslint
npx tsc --noEmit         # standalone typecheck (faster than a full build while iterating)
```

There is **no unit-test framework**. Verify changes with `npx tsc --noEmit` + `pnpm build`, then smoke-test routes against `pnpm start` (e.g. fetch pages/feeds and grep the HTML).

### ⚠️ Stale build cache after editing data
After editing anything under `src/data/*` (or other imported static-data modules), a normal `pnpm build` can leave SSG pages **stale** — routes exist and return 200 but render old/empty content (default `<title>`, missing items). Always:

```bash
rm -rf .next && pnpm build
```

Dev mode (HMR) is unaffected.

## Architecture: data-driven directory

Everything flows from typed static data. **Never hardcode content in components** — it lives in `src/data/` and `src/constants/`.

- `src/data/tools.ts` — the core `Tool[]` (the open-source tools). `src/data/alternatives.ts` — `ProprietaryTool[]` (the apps they replace). Also `blog.ts`, `testimonials.ts`.
- `src/constants/` — `categories.ts` (taxonomy), `site.ts` (single source of truth for URLs, social links, author, OG image, feedback repo), `navigation.ts`.
- `src/services/tools.ts` — the **only** data-access layer pages use (`getAllTools`, `getToolsForProprietary`, `getCategoriesWithCounts`, `getComparisonPairs`, `sortTools`, `getStats`, …). Pure, synchronous, safe in Server Components.
- `src/types/index.ts` — domain types (`Tool`, `ProprietaryTool`, `CategoryMeta`, `BlogPost`, `FeedbackPayload`, …).

**Adding a tool = add one object to `tools.ts`** (and a `ProprietaryTool` to `alternatives.ts` if it's a new target). The tool page, category page, alternative hub, comparison pages, search index, sitemap, `llms.txt`, and OG metadata all update automatically. A tool maps to the proprietary tools it replaces via `alternativeToSlugs`.

Dynamic routes that enumerate all slugs (`/tools/[slug]`, `/categories/[slug]`, `/alternatives/[slug]`, `/blog/[slug]`) set `export const dynamicParams = false` so unknown slugs hard-404. `/compare/[slug]` stays dynamic (arbitrary `a-vs-b` pairs).

## shadcn/ui is Base UI, NOT Radix (style: `base-nova`)

`src/components/ui/*` wrap **`@base-ui/react`**, not Radix. This trips up Radix muscle memory:
- **Composition uses a `render` prop**, not `asChild`. To style a `Link`/`a` as a button, apply `buttonVariants({ ... })` via `cn()` rather than wrapping.
- **`Card` forces `flex flex-col gap-4 py-4` and uses a `ring`, not a `border`.** For a horizontal card add `flex-row`; for hover highlight use `hover:ring-*` (not `hover:border-*`). The `.card-hover` utility in `globals.css` already uses `ring`.
- **`Select` `onValueChange` receives `string | null`** — coalesce: `onValueChange={(v) => setX(v ?? "")}`.
- Dialog/Sheet/Popover use `open` / `onOpenChange`.

**Icons:** `lucide-react` v1 **dropped brand glyphs** (GitHub/X/LinkedIn). Use `src/components/common/brand-icons.tsx`; string-named icons resolve through `src/components/common/icon.tsx`.

## SEO / GEO (a primary goal of this project)

- `src/lib/seo.ts` — `buildMetadata()` (call from every route's `generateMetadata`; `metadataBase` is set in `app/layout.tsx` so paths are relative) + JSON-LD builders (`softwareAppJsonLd`, `faqJsonLd`, `howToJsonLd`, `breadcrumbJsonLd`, `itemListJsonLd`, `websiteJsonLd`, …), injected via `src/components/common/json-ld.tsx`.
- **Answer-first blocks** (`src/components/common/answer-box.tsx`) lead alternatives/category pages so AI engines can extract/cite them.
- Generated routes: `app/sitemap.ts`, `app/robots.ts`, `app/llms.txt/route.ts`, `app/feed.xml/route.ts`, `app/blog/feed.xml/route.ts`, `app/badge.svg/route.ts` — all iterate the service layer, so they stay in sync as data grows.
- **OG/Twitter image** is the static `public/betteropensource.png`, referenced via `siteConfig.ogImage` in both `buildMetadata` and the root layout (Base metadata overwrites `openGraph` per route, so the image must be set in both). Per-page dynamic OG generators were intentionally removed.

## Client state & integrations

- **localStorage** (bookmarks, recently-viewed, votes) goes through `src/hooks/use-local-storage.ts` — a shared store built on `useSyncExternalStore`. Every write reads the latest stored value first, so multiple component instances stay in sync within a tab (don't reintroduce per-instance `useState` mirrors). Built on it: `use-bookmarks`, `use-recently-viewed`, `use-votes`.
- **Feedback / submit-a-tool** → `app/api/feedback/route.ts` opens a GitHub Issue using `GITHUB_TOKEN` (repo from `GITHUB_FEEDBACK_REPO` / `siteConfig.feedbackRepo`). Without a token it returns a graceful 503 and the UI shows a fallback — keep that behavior. `/api/newsletter` and `/api/contact` are validation stubs to be wired to providers later.
- **Theme:** `next-themes` (class strategy, `suppressHydrationWarning` in layout). Animations via `motion` — always gate on `prefers-reduced-motion` (see `src/components/common/reveal.tsx`).

## Env vars (`.env.example`)

`NEXT_PUBLIC_SITE_URL` (canonical/OG/sitemap base), `GITHUB_TOKEN` + `GITHUB_FEEDBACK_REPO` (feedback issues), `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (optional analytics).

## Roadmap docs

`GROWTH.md` (traffic strategy checklist — classic SEO ✅, GEO ✅, off-site/UGC ✅) and `LAUNCH.md` (Product Hunt / HN / distribution playbook).
