import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllCategories,
  getCategory,
  getToolsByCategory,
} from "@/services/tools";
import { buildMetadata, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/common/json-ld";
import { PageHeader } from "@/components/common/page-header";
import { ToolExplorer } from "@/components/alternatives/tool-explorer";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return buildMetadata({
    title: `Best Open-Source ${category.shortName}`,
    description: `${category.description} Compare the top open-source ${category.shortName.toLowerCase()} by features, license, and GitHub activity.`,
    path: `/categories/${slug}`,
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const tools = getToolsByCategory(slug);

  return (
    <div className="mx-auto w-full max-w-7xl container-px py-6 lg:py-8">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Categories", path: "/categories" },
            { name: category.name, path: `/categories/${slug}` },
          ]),
          itemListJsonLd(tools, `${category.name} tools`),
        ]}
      />
      <PageHeader
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: "Categories", href: "/categories" },
          { name: category.name },
        ]}
        title={`Best open-source ${category.shortName.toLowerCase()}`}
        description={category.description}
        className="mb-8"
      />
      <ToolExplorer tools={tools} showCategoryFilter={false} />

      <section className="mt-14 border-t pt-8">
        <h2 className="font-heading text-lg font-semibold">
          Browse other categories
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {getAllCategories()
            .filter((c) => c.slug !== slug)
            .map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/categories/${c.slug}`}
                  className="inline-flex rounded-full border px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  {c.name}
                </Link>
              </li>
            ))}
        </ul>
      </section>
    </div>
  );
}
