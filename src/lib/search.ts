import Fuse from "fuse.js";
import { tools } from "@/data/tools";
import { categories } from "@/constants/categories";
import { proprietaryTools } from "@/data/alternatives";

export type SearchType = "tool" | "category" | "alternative";

export interface SearchItem {
  type: SearchType;
  title: string;
  subtitle: string;
  href: string;
  keywords: string;
  logo?: string;
  icon?: string;
}

/** Unified, client-bundleable search index across the catalog. */
export const searchIndex: SearchItem[] = [
  ...tools.map((t) => ({
    type: "tool" as const,
    title: t.name,
    subtitle: t.tagline,
    href: `/tools/${t.slug}`,
    keywords: [...t.tags, t.categorySlug, ...t.alternativeToSlugs, t.language].join(" "),
    logo: t.logo,
  })),
  ...categories.map((c) => ({
    type: "category" as const,
    title: c.name,
    subtitle: c.description,
    href: `/categories/${c.slug}`,
    keywords: c.shortName,
    icon: c.icon,
  })),
  ...proprietaryTools.map((p) => ({
    type: "alternative" as const,
    title: `${p.name} alternatives`,
    subtitle: p.description,
    href: `/alternatives/${p.slug}`,
    keywords: `${p.name} replace switch from`,
    logo: p.logo,
  })),
];

const fuse = new Fuse(searchIndex, {
  keys: [
    { name: "title", weight: 3 },
    { name: "keywords", weight: 2 },
    { name: "subtitle", weight: 1 },
  ],
  threshold: 0.38,
  ignoreLocation: true,
  minMatchCharLength: 2,
});

export function searchAll(query: string, limit = 12): SearchItem[] {
  const q = query.trim();
  if (!q) return [];
  return fuse.search(q, { limit }).map((r) => r.item);
}
