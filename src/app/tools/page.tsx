import { getAllTools } from "@/services/tools";
import { buildMetadata, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/common/json-ld";
import { PageHeader } from "@/components/common/page-header";
import { ToolExplorer } from "@/components/alternatives/tool-explorer";

export const metadata = buildMetadata({
  title: "All Open-Source Tools",
  description:
    "Browse the full BetterOpenSource directory of open-source software. Filter by category, license, and self-hostability to find your next tool.",
  path: "/tools",
});

export default async function ToolsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const tools = getAllTools();
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Tools", href: "/tools" },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl container-px py-6 lg:py-8">
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          itemListJsonLd(tools, "Open-source tools"),
        ]}
      />
      <PageHeader
        breadcrumbs={crumbs}
        title="Browse all open-source tools"
        description={`${tools.length} hand-reviewed open-source tools you can adopt or self-host today.`}
        className="mb-8"
      />
      <ToolExplorer tools={tools} initialQuery={q ?? ""} />
    </div>
  );
}
