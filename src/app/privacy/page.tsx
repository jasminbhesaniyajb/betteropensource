import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/common/json-ld";
import { PageHeader } from "@/components/common/page-header";
import { Markdown } from "@/components/blog/markdown";
import { siteConfig } from "@/constants/site";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How BetterOpenSource handles your data and privacy.",
  path: "/privacy",
});

const content = `## Overview

BetterOpenSource ("we", "us", "our") is a directory of open-source software. We are committed to keeping your data private and collecting as little as possible.

## What we collect

- **No account required.** You can browse the entire directory without signing up.
- **Local-only preferences.** Your bookmarks, recently-viewed tools, and votes are stored exclusively in your browser's local storage. They never leave your device and are not sent to us.
- **Aggregate analytics.** We may use privacy-friendly, cookie-free analytics to understand which pages are popular. This data is aggregated and does not identify you.

## Feedback and contact

When you submit feedback or use the contact form, the message you write — and your email address, if you choose to provide one — is transmitted so we can review and respond to it. Please don't include sensitive personal information in feedback.

## Cookies

We do not use tracking or advertising cookies. Your theme preference (light/dark) is stored locally for your convenience.

## Third-party links

The directory links to external websites and repositories. We are not responsible for the privacy practices of those third parties.

## Changes

We may update this policy from time to time. Material changes will be reflected on this page.

## Contact

Questions about privacy? Email us at ${siteConfig.author.email}.

_Last updated: May 2026._`;

export default function PrivacyPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Privacy Policy", href: "/privacy" },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl container-px py-10 lg:py-14">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader
        breadcrumbs={crumbs}
        title="Privacy Policy"
        className="mb-8"
      />
      <Markdown content={content} />
    </div>
  );
}
