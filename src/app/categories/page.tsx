import { getCategoriesWithCounts } from "@/services/tools";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/common/json-ld";
import { PageHeader } from "@/components/common/page-header";
import { CategoryCard } from "@/components/alternatives/category-card";

export const metadata = buildMetadata({
  title: "Categories",
  description:
    "Explore open-source software by category — design, productivity, developer tools, hosting, analytics, and more.",
  path: "/categories",
});

export default function CategoriesPage() {
  const categories = getCategoriesWithCounts();
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Categories", href: "/categories" },
  ];

  return (
    <div className="mx-auto w-full max-w-7xl container-px py-6 lg:py-8">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader
        breadcrumbs={crumbs}
        title="Explore by category"
        description="Open-source software organized the way you work — pick a category to see the best tools in it."
        className="mb-8"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </div>
  );
}
