import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import {
  getAllTools,
  getCategory,
  getProprietary,
  getToolBySlug,
} from "@/services/tools";
import {
  breadcrumbJsonLd,
  buildMetadata,
  faqJsonLd,
  howToJsonLd,
  softwareAppJsonLd,
} from "@/lib/seo";
import { JsonLd } from "@/components/common/json-ld";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LicenseBadge, PricingBadge } from "@/components/common/badges";
import { ToolHeader } from "@/components/tool/tool-header";
import { RepoStats } from "@/components/tool/repo-stats";
import { FeatureList } from "@/components/tool/feature-list";
import { ProsCons } from "@/components/tool/pros-cons";
import { ScreenshotGallery } from "@/components/tool/screenshot-gallery";
import { InstallGuide } from "@/components/tool/install-guide";
import { FaqAccordion } from "@/components/tool/faq-accordion";
import { ProprietaryComparison } from "@/components/tool/proprietary-comparison";
import { RelatedTools } from "@/components/tool/related-tools";
import { ShareButtons } from "@/components/tool/share-buttons";
import { TrackView } from "@/components/tool/track-view";
import { BadgeEmbed } from "@/components/tool/badge-embed";
import { formatDate, hostFromUrl, licenseLabel } from "@/lib/format";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTools().map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  const category = getCategory(tool.categorySlug);
  const replaces = tool.alternativeToSlugs
    .map((s) => getProprietary(s)?.name)
    .filter(Boolean)[0];

  // Keyword-intent title/description: target "[tool] open source" and
  // "[proprietary] alternative" search queries.
  const title = replaces
    ? `${tool.name} — Open-Source ${replaces} Alternative`
    : `${tool.name} — ${tool.tagline}`;
  const description = (
    replaces
      ? `${tool.name} is a free, open-source alternative to ${replaces}. ${tool.tagline}`
      : tool.description
  ).slice(0, 158);

  return buildMetadata({
    title,
    description,
    path: `/tools/${slug}`,
    keywords: [
      tool.name,
      `${tool.name} open source`,
      ...(replaces
        ? [`${replaces} alternative`, `open source ${replaces} alternative`]
        : []),
      ...tool.tags,
      category?.shortName ?? "open source",
    ],
  });
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="font-heading text-xl font-semibold tracking-tight">
        {title}
      </h2>
      {children}
    </section>
  );
}

function ExternalRow({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
    >
      <span>{label}</span>
      <span className="inline-flex items-center gap-1 text-foreground/80">
        {hostFromUrl(href)}
        <ExternalLink className="size-3.5" />
      </span>
    </a>
  );
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const category = getCategory(tool.categorySlug);
  const replaces = tool.alternativeToSlugs
    .map((s) => getProprietary(s)?.name)
    .filter(Boolean)
    .join(", ");

  return (
    <div className="mx-auto w-full max-w-7xl container-px py-6 lg:py-8">
      <JsonLd
        data={[
          softwareAppJsonLd(tool),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
            { name: tool.name, path: `/tools/${slug}` },
          ]),
          faqJsonLd(tool.faqs),
          howToJsonLd(tool),
        ].filter(Boolean) as object[]}
      />
      <TrackView slug={tool.slug} />
      <ToolHeader tool={tool} />

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="flex min-w-0 flex-col gap-10">
          <Section title="Overview">
            <p className="text-base font-medium text-foreground">
              {tool.name} is a free, open-source tool
              {replaces
                ? ` and a self-hostable alternative to ${replaces}`
                : ""}
              . It&apos;s licensed under {licenseLabel(tool.license)} and written
              in {tool.language}.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              {tool.description}
            </p>
          </Section>

          <ProprietaryComparison tool={tool} />

          <Section title="Key features">
            <FeatureList features={tool.features} />
          </Section>

          <Section title="Pros & cons">
            <ProsCons pros={tool.pros} cons={tool.cons} />
          </Section>

          <Section title="Screenshots">
            <ScreenshotGallery name={tool.name} logo={tool.logo} />
          </Section>

          <Section title="Installation">
            <InstallGuide steps={tool.install} />
          </Section>

          <Section title="Frequently asked questions">
            <FaqAccordion faqs={tool.faqs} />
          </Section>
        </div>

        <aside className="flex flex-col gap-6 lg:sticky lg:top-20 lg:self-start">
          <Card className="flex flex-col gap-4 p-5">
            <h2 className="font-heading font-semibold">Quick info</h2>
            <RepoStats tool={tool} />
            <div className="flex flex-wrap gap-2">
              <LicenseBadge license={tool.license} />
              <PricingBadge pricing={tool.pricing} />
              {category ? (
                <Link href={`/categories/${category.slug}`}>
                  <Badge variant="outline">{category.name}</Badge>
                </Link>
              ) : null}
            </div>
            <div className="flex flex-col gap-2 border-t pt-3">
              <ExternalRow href={tool.websiteUrl} label="Website" />
              <ExternalRow href={tool.repoUrl} label="Repository" />
              {tool.docsUrl ? (
                <ExternalRow href={tool.docsUrl} label="Documentation" />
              ) : null}
              {tool.demoUrl ? (
                <ExternalRow href={tool.demoUrl} label="Live demo" />
              ) : null}
            </div>
            <p className="text-xs text-muted-foreground">
              Last updated {formatDate(tool.updatedAt)}
            </p>
          </Card>

          <div className="flex flex-col gap-3">
            <ShareButtons title={`${tool.name} — open-source alternative`} />
          </div>

          <BadgeEmbed slug={tool.slug} />
        </aside>
      </div>

      <div className="mt-16">
        <RelatedTools tool={tool} />
      </div>
    </div>
  );
}
