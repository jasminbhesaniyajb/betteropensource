/**
 * Centralized site configuration. Avoid hardcoding any of this in components.
 */

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://betteropensource.dev";

export const siteConfig = {
  name: "BetterOpenSource",
  shortName: "BetterOSS",
  tagline: "Discover the best open-source alternatives",
  description:
    "BetterOpenSource is a curated directory of the best open-source alternatives to popular proprietary software. Compare features, licenses, and GitHub activity to find self-hostable replacements that fit your workflow and cut recurring costs.",
  url: siteUrl,
  ogImage: `${siteUrl}/opengraph-image`,
  locale: "en_US",
  author: {
    name: "Jasmin Bhesaniya",
    email: "jasminbhesaniyajb@gmail.com",
    phone: "7874679215",
    phoneDisplay: "+91 78746 79215",
  },
  links: {
    github: "https://github.com/jasminbhesaniya/betteropensource",
    githubProfile: "https://github.com/jasminbhesaniya",
    twitter: "https://twitter.com/jasminbhesaniya",
    linkedin: "https://www.linkedin.com/in/jasminbhesaniya",
    portfolio: "https://jasminbhesaniya.com",
  },
  /** owner/repo that feedback Issues are filed against (overridable via env). */
  feedbackRepo:
    process.env.GITHUB_FEEDBACK_REPO ?? "jasminbhesaniya/betteropensource",
  keywords: [
    "open source alternatives",
    "open-source software",
    "self-hosted",
    "Figma alternatives",
    "Notion alternatives",
    "Slack alternatives",
    "Shopify alternatives",
    "free software",
    "FOSS",
    "developer tools",
  ],
} as const;

export type SiteConfig = typeof siteConfig;
