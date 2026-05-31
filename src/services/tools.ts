import { tools, toolBySlug } from "@/data/tools";
import { proprietaryTools, proprietaryBySlug } from "@/data/alternatives";
import { categories, categoryBySlug } from "@/constants/categories";
import type {
  CategoryMeta,
  ProprietaryTool,
  SortKey,
  Tool,
} from "@/types";

/**
 * Pure data-access layer over the static catalog.
 * All functions are synchronous and safe to call from Server Components.
 */

export function getAllTools(): Tool[] {
  return tools;
}

export function getToolBySlug(slug: string): Tool | undefined {
  return toolBySlug.get(slug);
}

export function getToolSlugs(): string[] {
  return tools.map((t) => t.slug);
}

export function getToolsByCategory(categorySlug: string): Tool[] {
  return tools.filter((t) => t.categorySlug === categorySlug);
}

export function getToolsForProprietary(proprietarySlug: string): Tool[] {
  return tools.filter((t) => t.alternativeToSlugs.includes(proprietarySlug));
}

export function getCategory(slug: string): CategoryMeta | undefined {
  return categoryBySlug.get(slug);
}

export function getAllCategories(): CategoryMeta[] {
  return categories;
}

export function getProprietary(slug: string): ProprietaryTool | undefined {
  return proprietaryBySlug.get(slug);
}

export function getAllProprietary(): ProprietaryTool[] {
  return proprietaryTools;
}

export interface CategoryWithCount extends CategoryMeta {
  count: number;
  totalStars: number;
}

export function getCategoriesWithCounts(): CategoryWithCount[] {
  return categories.map((c) => {
    const inCategory = tools.filter((t) => t.categorySlug === c.slug);
    return {
      ...c,
      count: inCategory.length,
      totalStars: inCategory.reduce((sum, t) => sum + t.githubStars, 0),
    };
  });
}

export interface ProprietaryWithCount extends ProprietaryTool {
  count: number;
}

export function getProprietaryWithCounts(): ProprietaryWithCount[] {
  return proprietaryTools
    .map((p) => ({
      ...p,
      count: getToolsForProprietary(p.slug).length,
    }))
    .filter((p) => p.count > 0)
    .sort((a, b) => b.count - a.count);
}

export function getFeaturedTools(limit = 6): Tool[] {
  return tools.filter((t) => t.featured).slice(0, limit);
}

export function getTrendingTools(limit = 8): Tool[] {
  return [...tools]
    .filter((t) => t.trending)
    .sort((a, b) => b.githubStars - a.githubStars)
    .slice(0, limit);
}

export function getPopularTools(limit = 8): Tool[] {
  return [...tools].sort((a, b) => b.githubStars - a.githubStars).slice(0, limit);
}

export function getNewestTools(limit = 8): Tool[] {
  return [...tools]
    .sort((a, b) => +new Date(b.addedAt) - +new Date(a.addedAt))
    .slice(0, limit);
}

export function getAllTags(): string[] {
  const set = new Set<string>();
  for (const t of tools) for (const tag of t.tags) set.add(tag);
  return [...set].sort((a, b) => a.localeCompare(b));
}

export function sortTools(list: Tool[], sort: SortKey): Tool[] {
  const copy = [...list];
  switch (sort) {
    case "popular":
      return copy.sort((a, b) => b.githubStars - a.githubStars);
    case "rating":
      return copy.sort((a, b) => b.rating.value - a.rating.value);
    case "newest":
      return copy.sort(
        (a, b) => +new Date(b.addedAt) - +new Date(a.addedAt),
      );
    case "alphabetical":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case "trending":
      return copy.sort(
        (a, b) =>
          Number(Boolean(b.trending)) - Number(Boolean(a.trending)) ||
          b.githubStars - a.githubStars,
      );
    default:
      return copy;
  }
}

/**
 * Meaningful comparison pairs: tools that replace the same proprietary tool.
 * Deduplicated and order-normalized. Used to pre-render /compare/[slug].
 */
export function getComparisonPairs(): [string, string][] {
  const pairs: [string, string][] = [];
  const seen = new Set<string>();
  for (const p of proprietaryTools) {
    const group = getToolsForProprietary(p.slug);
    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        const a = group[i].slug;
        const b = group[j].slug;
        const key = [a, b].sort().join("|");
        if (seen.has(key)) continue;
        seen.add(key);
        pairs.push([a, b]);
      }
    }
  }
  return pairs;
}

export interface DirectoryStats {
  tools: number;
  categories: number;
  alternatives: number;
  totalStars: number;
}

export function getStats(): DirectoryStats {
  return {
    tools: tools.length,
    categories: categories.length,
    alternatives: proprietaryTools.length,
    totalStars: tools.reduce((sum, t) => sum + t.githubStars, 0),
  };
}
