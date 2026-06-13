import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getComparisonPairs,
  getToolBySlug,
} from "@/services/tools";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/common/json-ld";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { ComparisonTable } from "@/components/compare/comparison-table";
import { FeatureList } from "@/components/tool/feature-list";
import { ProsCons } from "@/components/tool/pros-cons";

function parsePair(slug: string): [string, string] | null {
  const idx = slug.indexOf("-vs-");
  if (idx <= 0) return null;
  return [slug.slice(0, idx), slug.slice(idx + 4)];
}

export function generateStaticParams() {
  return getComparisonPairs().map(([a, b]) => ({ slug: `${a}-vs-${b}` }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parsePair(slug);
  if (!parsed) return {};
  const a = getToolBySlug(parsed[0]);
  const b = getToolBySlug(parsed[1]);
  if (!a || !b) return {};
  return buildMetadata({
    title: `${a.name} vs ${b.name}`,
    description: `Compare ${a.name} and ${b.name} — two open-source tools. Features, licenses, GitHub activity, and pros & cons side by side.`,
    path: `/compare/${slug}`,
  });
}

export default async function ComparePairPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const parsed = parsePair(slug);
  if (!parsed) notFound();

  const a = getToolBySlug(parsed[0]);
  const b = getToolBySlug(parsed[1]);
  if (!a || !b || a.slug === b.slug) notFound();

  const tools = [a, b];

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Compare", href: "/compare" },
    { name: `${a.name} vs ${b.name}`, href: `/compare/${slug}` },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl container-px py-6 lg:py-8">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <div className="mb-8 flex flex-col gap-3">
        <Breadcrumbs items={crumbs} />
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          {a.name} <span className="text-muted-foreground">vs</span> {b.name}
        </h1>
        <p className="max-w-2xl text-muted-foreground text-pretty">
          A side-by-side comparison of two open-source tools to help you choose
          the right one.
        </p>
      </div>

      <ComparisonTable tools={tools} />

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {tools.map((t) => (
          <div key={t.slug} className="flex flex-col gap-4">
            <h2 className="font-heading text-xl font-semibold">
              {t.name} features
            </h2>
            <FeatureList features={t.features} />
          </div>
        ))}
      </div>

      <div className="mt-12 flex flex-col gap-8">
        {tools.map((t) => (
          <div key={t.slug} className="flex flex-col gap-4">
            <h2 className="font-heading text-xl font-semibold">
              {t.name} pros &amp; cons
            </h2>
            <ProsCons pros={t.pros} cons={t.cons} />
          </div>
        ))}
      </div>
    </div>
  );
}
