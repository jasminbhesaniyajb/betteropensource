import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/common/json-ld";
import { PageHeader } from "@/components/common/page-header";
import { Markdown } from "@/components/blog/markdown";
import { siteConfig } from "@/constants/site";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: "The terms that govern your use of BetterOpenSource.",
  path: "/terms",
});

const content = `## Acceptance of terms

By accessing BetterOpenSource, you agree to these terms. If you do not agree, please do not use the site.

## Use of the directory

BetterOpenSource provides information about open-source software for general, informational purposes. We curate and review listings carefully, but we make no guarantee that any detail — features, GitHub metrics, licenses, or availability — is complete, accurate, or current at all times.

## Third-party software

Every tool listed here is independent software governed by its own license and terms. Your use of any listed tool is subject to that project's license, not ours. Review each project's license before adopting it, especially for commercial or production use.

## No warranty

The directory is provided "as is" without warranties of any kind, express or implied. We do not warrant that the site will be uninterrupted, error-free, or free of harmful components.

## Limitation of liability

To the fullest extent permitted by law, BetterOpenSource and its maintainer shall not be liable for any indirect, incidental, or consequential damages arising from your use of the site or any tool you discover through it.

## Intellectual property

Trademarks, logos, and brand names belong to their respective owners and are used for identification only. Their inclusion does not imply endorsement.

## Changes

We may revise these terms at any time. Continued use of the site after changes constitutes acceptance of the updated terms.

## Contact

Questions about these terms? Email us at ${siteConfig.author.email}.

_Last updated: May 2026._`;

export default function TermsPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Terms of Service", href: "/terms" },
  ];

  return (
    <div className="mx-auto w-full max-w-3xl container-px py-10 lg:py-14">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader
        breadcrumbs={crumbs}
        title="Terms of Service"
        className="mb-8"
      />
      <Markdown content={content} />
    </div>
  );
}
