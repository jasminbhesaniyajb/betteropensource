/**
 * Core domain types for BetterOpenSource.
 * All site content is modeled here and lives in `src/data` / `src/constants`.
 */

export type Pricing = "open-source" | "freemium" | "free";

export type LicenseId =
  | "MIT"
  | "Apache-2.0"
  | "AGPL-3.0"
  | "GPL-3.0"
  | "GPL-2.0"
  | "LGPL-3.0"
  | "MPL-2.0"
  | "BSD-3-Clause"
  | "BSL-1.1"
  | "SSPL"
  | "Elastic-2.0"
  | "EUPL-1.2"
  | "Other";

export interface CategoryMeta {
  slug: string;
  /** Lucide icon name, resolved via the icon map in `lib/icon-map`. */
  icon: string;
  name: string;
  /** Short noun phrase, e.g. "Design Tools". */
  shortName: string;
  description: string;
  /** Tailwind gradient stops, e.g. "from-blue-500 to-sky-400". */
  gradient: string;
}

export interface ProprietaryTool {
  slug: string;
  name: string;
  description: string;
  /** Logo URL (Simple Icons CDN or similar); falls back to initials. */
  logo: string;
  categorySlug: string;
}

export interface InstallStep {
  label: string;
  /** A single shell command (rendered as a copyable code block). */
  command?: string;
  /** Ordered prose steps when a single command is not enough. */
  steps?: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ToolRating {
  /** Average rating, 0–5. */
  value: number;
  votes: number;
}

export interface Screenshot {
  src?: string;
  alt: string;
  /** Optional caption shown under a placeholder/preview frame. */
  caption?: string;
}

export interface Tool {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  logo: string;
  websiteUrl: string;
  repoUrl: string;
  docsUrl?: string;
  demoUrl?: string;
  githubStars: number;
  githubForks?: number;
  contributors?: number;
  lastCommit?: string;
  license: LicenseId;
  language: string;
  categorySlug: string;
  tags: string[];
  pricing: Pricing;
  isOpenSource: boolean;
  selfHostable: boolean;
  /** Slugs referencing entries in `data/alternatives`. */
  alternativeToSlugs: string[];
  features: string[];
  pros: string[];
  cons: string[];
  install: InstallStep[];
  screenshots: Screenshot[];
  faqs: FAQ[];
  rating: ToolRating;
  /** ISO date — when added to the directory. */
  addedAt: string;
  /** ISO date — last reviewed/updated. */
  updatedAt: string;
  featured?: boolean;
  trending?: boolean;
}

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  initials: string;
  avatar?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  cover?: string;
  author: string;
  publishedAt: string;
  readingMinutes: number;
  tags: string[];
  /** Markdown body, rendered with react-markdown + remark-gfm. */
  content: string;
}

export type FeedbackType = "bug" | "feature" | "tool-suggestion" | "general";

export interface FeedbackPayload {
  type: FeedbackType;
  message: string;
  email?: string;
  page?: string;
}

export type SortKey = "popular" | "trending" | "newest" | "alphabetical" | "rating";
