import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getProprietaryWithCounts } from "@/services/tools";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/common/json-ld";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/common/logo";

export const metadata = buildMetadata({
  title: "Find Open-Source Alternatives",
  description:
    "Pick the proprietary app you want to replace — Figma, Notion, Slack, Zapier, and more — and discover the best open-source alternatives.",
  path: "/alternatives",
});

export default function AlternativesPage() {
  const items = getProprietaryWithCounts();
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Alternatives", href: "/alternatives" },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl container-px py-6 lg:py-8">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader
        breadcrumbs={crumbs}
        title="Find an open-source alternative"
        description="Choose the proprietary tool you want to replace and we'll show you the best open-source options."
        className="mb-8"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <Link
            key={p.slug}
            href={`/alternatives/${p.slug}`}
            className="group block h-full"
          >
            <Card className="h-full flex-row items-center gap-3.5 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/5 hover:ring-primary/40">
              <Logo
                src={p.logo}
                name={p.name}
                size={48}
                rounded="rounded-xl"
              />
              <div className="min-w-0 flex-1">
                <h2 className="truncate font-heading font-semibold leading-tight">
                  {p.name}
                </h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  <span className="font-semibold text-primary">{p.count}</span>{" "}
                  open-source{" "}
                  {p.count === 1 ? "alternative" : "alternatives"}
                </p>
              </div>
              <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-foreground" />
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
