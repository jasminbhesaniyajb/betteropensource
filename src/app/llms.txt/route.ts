import { siteConfig } from "@/constants/site";
import {
  getAllCategories,
  getProprietaryWithCounts,
  getToolsByCategory,
} from "@/services/tools";

export const dynamic = "force-static";

/**
 * /llms.txt — an emerging convention (like robots.txt for LLMs) that gives AI
 * answer engines a clean, curated map of the site's best content.
 * Spec: https://llmstxt.org
 */
export function GET() {
  const base = siteConfig.url;
  const lines: string[] = [];

  lines.push(`# ${siteConfig.name}`);
  lines.push("");
  lines.push(`> ${siteConfig.description}`);
  lines.push("");
  lines.push(
    "Each tool below is open source and can be self-hosted or used freely. " +
      "Pages compare features, licenses, and GitHub activity against the " +
      "proprietary tools they replace.",
  );
  lines.push("");

  lines.push("## Categories");
  for (const c of getAllCategories()) {
    lines.push(`- [${c.name}](${base}/categories/${c.slug}): ${c.description}`);
  }
  lines.push("");

  lines.push("## Open-source alternatives by proprietary tool");
  for (const p of getProprietaryWithCounts()) {
    lines.push(
      `- [Best open-source ${p.name} alternatives](${base}/alternatives/${p.slug}) — ${p.count} options`,
    );
  }
  lines.push("");

  lines.push("## Tools");
  for (const c of getAllCategories()) {
    const tools = getToolsByCategory(c.slug);
    if (tools.length === 0) continue;
    lines.push(`### ${c.name}`);
    for (const t of tools) {
      lines.push(`- [${t.name}](${base}/tools/${t.slug}): ${t.tagline}`);
    }
    lines.push("");
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
