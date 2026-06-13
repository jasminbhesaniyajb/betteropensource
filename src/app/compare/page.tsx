import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  getAllTools,
  getComparisonPairs,
  getToolBySlug,
} from "@/services/tools";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/common/json-ld";
import { PageHeader } from "@/components/common/page-header";
import { ComparePicker } from "@/components/compare/compare-picker";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/common/logo";
import type { Tool } from "@/types";

export const metadata = buildMetadata({
  title: "Compare Open-Source Tools",
  description:
    "Compare open-source tools side by side — features, licenses, GitHub activity, and pros & cons. Make a confident choice.",
  path: "/compare",
});

export default function ComparePage() {
  const tools = getAllTools()
    .map((t) => ({ slug: t.slug, name: t.name }))
    .sort((a, b) => a.name.localeCompare(b.name));

  const suggestions = getComparisonPairs()
    .slice(0, 8)
    .map(([a, b]) => ({ a: getToolBySlug(a), b: getToolBySlug(b) }))
    .filter((x): x is { a: Tool; b: Tool } => Boolean(x.a && x.b));

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Compare", href: "/compare" },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl container-px py-6 lg:py-8">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader
        breadcrumbs={crumbs}
        title="Compare tools side by side"
        description="Pick any two open-source tools to see how they stack up on features, licensing, and community."
        className="mb-8"
      />

      <ComparePicker tools={tools} />

      <h2 className="mt-12 mb-4 font-heading text-lg font-semibold">
        Popular comparisons
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {suggestions.map(({ a, b }) => (
          <Link
            key={`${a.slug}-${b.slug}`}
            href={`/compare/${a.slug}-vs-${b.slug}`}
            className="group block h-full"
          >
            <Card className="h-full flex-row items-center gap-3 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/5 hover:ring-primary/40">
              <div className="flex shrink-0 items-center">
                <Logo src={a.logo} name={a.name} size={30} rounded="rounded-lg" />
                <Logo
                  src={b.logo}
                  name={b.name}
                  size={30}
                  rounded="rounded-lg"
                  className="-ml-2 ring-2 ring-card"
                />
              </div>
              <span className="min-w-0 flex-1 truncate text-sm font-medium">
                {a.name} <span className="text-muted-foreground">vs</span>{" "}
                {b.name}
              </span>
              <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-foreground" />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
