import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllCategories,
  getCategory,
  getToolsByCategory,
  sortTools,
} from "@/services/tools";
import { buildMetadata, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/common/json-ld";
import { PageHeader } from "@/components/common/page-header";
import { AnswerBox } from "@/components/common/answer-box";
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
  const top = sortTools(tools, "popular").slice(0, Math.min(5, tools.length));

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories" },
    { name: category.name, href: `/categories/${slug}` },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl container-px py-6 lg:py-8">
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          itemListJsonLd(tools, `${category.name} tools`),
        ]}
      />
      <PageHeader
        breadcrumbs={crumbs}
        title={`Best open-source ${category.shortName.toLowerCase()}`}
        description={category.description}
        className="mb-8"
      />

      {top.length > 0 ? (
        <div className="mb-8">
          <AnswerBox>
            Top open-source picks in {category.name} are{" "}
            {top.map((t, i) => {
              const sep =
                i === 0
                  ? ""
                  : i === top.length - 1
                    ? top.length > 2
                      ? ", and "
                      : " and "
                    : ", ";
              return (
                <span key={t.slug}>
                  {sep}
                  <Link
                    href={`/tools/${t.slug}`}
                    className="font-medium text-primary hover:underline"
                  >
                    {t.name}
                  </Link>
                </span>
              );
            })}
            . Compare all {tools.length} below by features, license, and GitHub
            activity.
          </AnswerBox>
        </div>
      ) : null}

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
