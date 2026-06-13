import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarDays, Clock } from "lucide-react";
import { blogPosts, postBySlug } from "@/data/blog";
import {
  blogPostingJsonLd,
  breadcrumbJsonLd,
  buildMetadata,
} from "@/lib/seo";
import { JsonLd } from "@/components/common/json-ld";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Markdown } from "@/components/blog/markdown";
import { formatDate } from "@/lib/format";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug.get(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
    type: "article",
    publishedTime: post.publishedAt,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = postBySlug.get(slug);
  if (!post) notFound();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: post.title, href: `/blog/${slug}` },
  ];

  return (
    <article className="mx-auto w-full max-w-3xl container-px py-10 lg:py-14">
      <JsonLd data={[blogPostingJsonLd(post), breadcrumbJsonLd(crumbs)]} />
      <Breadcrumbs items={crumbs} />
      <div className="mt-5 flex flex-wrap gap-1.5">
        {post.tags.map((t) => (
          <Badge key={t} variant="secondary">
            {t}
          </Badge>
        ))}
      </div>
      <h1 className="mt-4 font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        {post.title}
      </h1>
      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <span>{post.author}</span>
        <span aria-hidden>·</span>
        <span className="inline-flex items-center gap-1">
          <CalendarDays className="size-4" />
          {formatDate(post.publishedAt)}
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock className="size-4" />
          {post.readingMinutes} min read
        </span>
      </div>
      <div className="mt-8 border-t pt-8">
        <Markdown content={post.content} />
      </div>
    </article>
  );
}
