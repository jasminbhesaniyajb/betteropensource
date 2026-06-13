import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/common/json-ld";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { SubmitToolForm } from "@/components/submit/submit-tool-form";

export const metadata = buildMetadata({
  title: "Submit an Open-Source Tool",
  description:
    "Know a great open-source alternative we're missing? Suggest it and we'll review it for the directory.",
  path: "/submit",
});

export default function SubmitPage() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Submit a tool", href: "/submit" },
  ];

  return (
    <div className="mx-auto w-full max-w-2xl container-px py-6 lg:py-8">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader
        breadcrumbs={crumbs}
        title="Submit an open-source tool"
        description="Spotted a great open-source alternative we're missing? Suggest it below — submissions open a GitHub issue for review."
        className="mb-8"
      />
      <Card className="p-6">
        <SubmitToolForm />
      </Card>
    </div>
  );
}
