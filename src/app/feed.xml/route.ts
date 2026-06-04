import { siteConfig } from "@/constants/site";
import { getNewestTools } from "@/services/tools";
import { buildRssFeed } from "@/lib/rss";

export const dynamic = "force-static";

export function GET() {
  const tools = getNewestTools(50);
  const xml = buildRssFeed({
    title: `${siteConfig.name} — New Open-Source Tools`,
    description:
      "The latest open-source alternatives added to BetterOpenSource.",
    path: "/feed.xml",
    items: tools.map((t) => ({
      title: `${t.name} — ${t.tagline}`,
      link: `${siteConfig.url}/tools/${t.slug}`,
      description: t.tagline,
      pubDate: t.addedAt,
    })),
  });

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
