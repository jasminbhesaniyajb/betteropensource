import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getProprietary,
  getProprietaryWithCounts,
  getToolsForProprietary,
} from "@/services/tools";
import { buildMetadata, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/common/json-ld";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { Logo } from "@/components/common/logo";
import { ToolExplorer } from "@/components/alternatives/tool-explorer";

export const dynamicParams = false;

export function generateStaticParams() {
  return getProprietaryWithCounts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const proprietary = getProprietary(slug);
  if (!proprietary) return {};
  const count = getToolsForProprietary(slug).length;
  return buildMetadata({
    title: `Best Open-Source ${proprietary.name} Alternatives`,
    description: `${count} open-source alternatives to ${proprietary.name}. Compare features, licenses, and GitHub activity to find a self-hostable replacement.`,
    path: `/alternatives/${slug}`,
  });
}

export default async function AlternativePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const proprietary = getProprietary(slug);
  if (!proprietary) notFound();

  const tools = getToolsForProprietary(slug);
  if (tools.length === 0) notFound();

  return (
    <div className="mx-auto w-full max-w-7xl container-px py-6 lg:py-8">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Alternatives", path: "/alternatives" },
            { name: proprietary.name, path: `/alternatives/${slug}` },
          ]),
          itemListJsonLd(tools, `Open-source ${proprietary.name} alternatives`),
        ]}
      />

      <div className="mb-8 flex flex-col gap-4">
        <Breadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: "Alternatives", href: "/alternatives" },
            { name: proprietary.name },
          ]}
        />
        <div className="flex items-center gap-4">
          <Logo src={proprietary.logo} name={proprietary.name} size={56} />
          <div>
            <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Open-source {proprietary.name} alternatives
            </h1>
            <p className="text-muted-foreground">
              {tools.length} self-hostable{" "}
              {tools.length === 1 ? "option" : "options"} to consider
            </p>
          </div>
        </div>
        <p className="max-w-2xl text-muted-foreground text-pretty">
          Replace {proprietary.name} with an open-source tool you can host and
          control. Compare features, licenses, and community activity below.
        </p>
      </div>

      <ToolExplorer tools={tools} showCategoryFilter={false} />
    </div>
  );
}
