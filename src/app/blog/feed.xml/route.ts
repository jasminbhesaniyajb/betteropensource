import { siteConfig } from "@/constants/site";
import { blogPosts } from "@/data/blog";
import { buildRssFeed } from "@/lib/rss";

export const dynamic = "force-static";

export function GET() {
  const posts = [...blogPosts].sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt),
  );
  const xml = buildRssFeed({
    title: `${siteConfig.name} Blog`,
    description: "Guides, comparisons, and migration playbooks for open-source software.",
    path: "/blog/feed.xml",
    items: posts.map((p) => ({
      title: p.title,
      link: `${siteConfig.url}/blog/${p.slug}`,
      description: p.excerpt,
      pubDate: p.publishedAt,
    })),
  });

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
