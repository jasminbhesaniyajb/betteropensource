import Link from "next/link";
import { CalendarDays, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/format";
import type { BlogPost } from "@/types";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Card className="group relative flex h-full flex-col gap-3 p-5 card-hover">
      <div className="flex flex-wrap gap-1.5">
        {post.tags.slice(0, 2).map((t) => (
          <Badge key={t} variant="secondary">
            {t}
          </Badge>
        ))}
      </div>
      <h2 className="font-heading text-lg leading-snug font-semibold">
        <Link
          href={`/blog/${post.slug}`}
          className="after:absolute after:inset-0 after:rounded-xl"
        >
          {post.title}
        </Link>
      </h2>
      <p className="line-clamp-2 text-sm text-muted-foreground">
        {post.excerpt}
      </p>
      <div className="mt-auto flex items-center gap-4 pt-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <CalendarDays className="size-3.5" />
          {formatDate(post.publishedAt)}
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock className="size-3.5" />
          {post.readingMinutes} min read
        </span>
      </div>
    </Card>
  );
}
