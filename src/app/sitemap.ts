import type { MetadataRoute } from "next";
import { siteConfig } from "@/constants/site";
import {
  getAllCategories,
  getAllTools,
  getComparisonPairs,
  getProprietaryWithCounts,
} from "@/services/tools";
import { blogPosts } from "@/data/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticPaths = [
    "",
    "/tools",
    "/categories",
    "/alternatives",
    "/compare",
    "/trending",
    "/new",
    "/blog",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: p === "" ? 1 : 0.6,
  }));

  const toolEntries: MetadataRoute.Sitemap = getAllTools().map((t) => ({
    url: `${base}/tools/${t.slug}`,
    lastModified: new Date(t.updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const categoryEntries: MetadataRoute.Sitemap = getAllCategories().map((c) => ({
    url: `${base}/categories/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const alternativeEntries: MetadataRoute.Sitemap = getProprietaryWithCounts().map(
    (p) => ({
      url: `${base}/alternatives/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }),
  );

  const compareEntries: MetadataRoute.Sitemap = getComparisonPairs().map(
    ([a, b]) => ({
      url: `${base}/compare/${a}-vs-${b}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    }),
  );

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    ...staticEntries,
    ...toolEntries,
    ...categoryEntries,
    ...alternativeEntries,
    ...compareEntries,
    ...blogEntries,
  ];
}
