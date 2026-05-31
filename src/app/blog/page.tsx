import { blogPosts } from "@/data/blog";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/common/json-ld";
import { PageHeader } from "@/components/common/page-header";
import { BlogCard } from "@/components/blog/blog-card";

export const metadata = buildMetadata({
  title: "Blog",
  description:
    "Guides, comparisons, and migration playbooks for adopting open-source software and going self-hosted.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = [...blogPosts].sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt),
  );

  return (
    <div className="mx-auto w-full max-w-7xl container-px py-6 lg:py-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <PageHeader
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Blog" }]}
        title="Guides & playbooks"
        description="Comparisons, migration guides, and deep dives on going open-source."
        className="mb-8"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
