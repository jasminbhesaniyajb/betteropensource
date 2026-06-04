import type { Metadata } from "next";
import { siteConfig } from "@/constants/site";
import type { BlogPost, FAQ, Tool } from "@/types";

interface BuildMetadataArgs {
  title?: string;
  description?: string;
  /** Path relative to the site root, e.g. "/tools/penpot". */
  path?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  keywords?: readonly string[];
  publishedTime?: string;
}

/**
 * Builds a consistent Metadata object. `metadataBase` is set in the root
 * layout, so canonical/OG paths can be relative.
 *
 * OG/Twitter cards use the static image at `public/betteropensource.png`
 * (set on every page so per-page openGraph doesn't drop it).
 */
export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  type = "website",
  noIndex = false,
  keywords,
  publishedTime,
}: BuildMetadataArgs = {}): Metadata {
  const fullTitle = title ?? `${siteConfig.name} — ${siteConfig.tagline}`;

  return {
    title: title ?? undefined,
    description,
    keywords: keywords ? [...keywords] : [...siteConfig.keywords],
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      title: fullTitle,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [
        {
          url: siteConfig.ogImage,
          width: siteConfig.ogImageWidth,
          height: siteConfig.ogImageHeight,
          alt: siteConfig.name,
        },
      ],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [siteConfig.ogImage],
      creator: "@BhesaniyaJb",
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

/* ───────────────────────── JSON-LD builders ───────────────────────── */

const abs = (path: string) => `${siteConfig.url}${path}`;

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/tools?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: abs("/icon.svg"),
    sameAs: [
      siteConfig.links.github,
      siteConfig.links.twitter,
      siteConfig.links.linkedin,
    ],
    founder: { "@type": "Person", name: siteConfig.author.name },
  };
}

export function softwareAppJsonLd(tool: Tool) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.tagline,
    url: abs(`/tools/${tool.slug}`),
    applicationCategory: "DeveloperApplication",
    operatingSystem: tool.selfHostable ? "Web, Self-hosted" : "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: tool.rating.value.toFixed(1),
      reviewCount: tool.rating.votes,
      bestRating: "5",
      worstRating: "1",
    },
    softwareHelp: tool.docsUrl,
    license: tool.license,
    codeRepository: tool.repoUrl,
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export function faqJsonLd(faqs: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function itemListJsonLd(tools: Tool[], name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: tools.length,
    itemListElement: tools.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: abs(`/tools/${t.slug}`),
      name: t.name,
    })),
  };
}

export function howToJsonLd(tool: Tool) {
  if (!tool.install || tool.install.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: `How to install ${tool.name}`,
    description: `Get started with ${tool.name} — ${tool.tagline}`,
    step: tool.install.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.label,
      text: s.command ?? (s.steps ? s.steps.join(" ") : s.label),
    })),
  };
}

export function blogPostingJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: { "@type": "ImageObject", url: abs("/icon.svg") },
    },
    mainEntityOfPage: abs(`/blog/${post.slug}`),
  };
}
