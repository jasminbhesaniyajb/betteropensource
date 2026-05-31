import { getAllTools } from "@/services/tools";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/common/json-ld";
import { PageHeader } from "@/components/common/page-header";
import { ToolExplorer } from "@/components/alternatives/tool-explorer";

export const metadata = buildMetadata({
  title: "New Open-Source Tools",
  description:
    "The latest open-source tools added to the BetterOpenSource directory. Discover fresh alternatives before everyone else.",
  path: "/new",
});

export default function NewPage() {
  const tools = getAllTools();

  return (
    <div className="mx-auto w-full max-w-7xl container-px py-6 lg:py-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "New", path: "/new" },
        ])}
      />
      <PageHeader
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "New Tools" }]}
        title="Newly added tools"
        description="The freshest open-source projects in the directory."
        className="mb-8"
      />
      <ToolExplorer tools={tools} initialSort="newest" />
    </div>
  );
}
