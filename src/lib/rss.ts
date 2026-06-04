import { siteConfig } from "@/constants/site";

export function escapeXml(s: string): string {
  return s.replace(
    /[<>&'"]/g,
    (c) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "'": "&apos;",
        '"': "&quot;",
      })[c] as string,
  );
}

export interface RssItem {
  title: string;
  link: string;
  description: string;
  /** ISO date string. */
  pubDate?: string;
}

export function buildRssFeed({
  title,
  description,
  path,
  items,
}: {
  title: string;
  description: string;
  path: string;
  items: RssItem[];
}): string {
  const self = `${siteConfig.url}${path}`;
  const now = new Date().toUTCString();

  const xmlItems = items
    .map(
      (i) =>
        `    <item>
      <title>${escapeXml(i.title)}</title>
      <link>${i.link}</link>
      <guid isPermaLink="true">${i.link}</guid>
      <description>${escapeXml(i.description)}</description>${
        i.pubDate
          ? `\n      <pubDate>${new Date(i.pubDate).toUTCString()}</pubDate>`
          : ""
      }
    </item>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${siteConfig.url}</link>
    <description>${escapeXml(description)}</description>
    <language>en</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${self}" rel="self" type="application/rss+xml" />
${xmlItems}
  </channel>
</rss>`;
}
