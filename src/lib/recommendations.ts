import { tools } from "@/data/tools";
import type { Tool } from "@/types";

/**
 * Heuristic recommendation engine (no external API).
 * Scores similarity between tools using category, tags, the proprietary tools
 * they replace, license family, and self-hostability.
 */

function jaccard(a: string[], b: string[]): number {
  if (a.length === 0 && b.length === 0) return 0;
  const setA = new Set(a);
  const setB = new Set(b);
  let intersection = 0;
  for (const x of setA) if (setB.has(x)) intersection++;
  const union = new Set([...a, ...b]).size;
  return union === 0 ? 0 : intersection / union;
}

function sharedCount(a: string[], b: string[]): number {
  const setB = new Set(b);
  return a.reduce((n, x) => n + (setB.has(x) ? 1 : 0), 0);
}

function similarityScore(base: Tool, other: Tool): number {
  let score = 0;
  if (base.categorySlug === other.categorySlug) score += 3;
  score += jaccard(base.tags, other.tags) * 4;
  score += sharedCount(base.alternativeToSlugs, other.alternativeToSlugs) * 2.5;
  if (base.license === other.license) score += 0.6;
  if (base.selfHostable === other.selfHostable) score += 0.4;
  // mild popularity nudge so ties favor healthier projects
  score += Math.min(other.githubStars / 100000, 0.5);
  return score;
}

/** Most similar tools to `tool`, excluding itself. */
export function getRelatedTools(tool: Tool, limit = 4): Tool[] {
  return tools
    .filter((t) => t.slug !== tool.slug)
    .map((t) => ({ tool: t, score: similarityScore(tool, t) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.tool);
}

/**
 * "Smart picks" given a set of seed slugs (e.g. bookmarks / recently viewed).
 * Aggregates similarity across all seeds and excludes the seeds themselves.
 * Falls back to popular tools when there are no seeds.
 */
export function getSmartPicks(seedSlugs: string[], limit = 6): Tool[] {
  const seeds = seedSlugs
    .map((s) => tools.find((t) => t.slug === s))
    .filter((t): t is Tool => Boolean(t));

  if (seeds.length === 0) {
    return [...tools]
      .sort((a, b) => b.githubStars - a.githubStars)
      .slice(0, limit);
  }

  const seedSet = new Set(seedSlugs);
  const scored = new Map<string, { tool: Tool; score: number }>();

  for (const seed of seeds) {
    for (const candidate of tools) {
      if (seedSet.has(candidate.slug)) continue;
      const prev = scored.get(candidate.slug);
      const score = (prev?.score ?? 0) + similarityScore(seed, candidate);
      scored.set(candidate.slug, { tool: candidate, score });
    }
  }

  return [...scored.values()]
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.tool);
}
