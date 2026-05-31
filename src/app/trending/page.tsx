import { getAllTools } from "@/services/tools";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/common/json-ld";
import { PageHeader } from "@/components/common/page-header";
import { ToolExplorer } from "@/components/alternatives/tool-explorer";

export const metadata = buildMetadata({
  title: "Trending Open-Source Tools",
  description:
    "The open-source tools the community is starring and switching to right now. Sorted by momentum and GitHub activity.",
  path: "/trending",
});

export default function TrendingPage() {
  const tools = getAllTools();

  return (
    <div className="mx-auto w-full max-w-7xl container-px py-6 lg:py-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Trending", path: "/trending" },
        ])}
      />
      <PageHeader
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Trending" }]}
        title="Trending open-source tools"
        description="What developers are starring and adopting right now."
        className="mb-8"
      />
      <ToolExplorer tools={tools} initialSort="trending" />
    </div>
  );
}
