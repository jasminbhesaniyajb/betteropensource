"use client";

import Link from "next/link";
import { Bookmark } from "lucide-react";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { toolBySlug } from "@/data/tools";
import { ToolCard } from "@/components/alternatives/tool-card";
import { ToolGridSkeleton } from "@/components/alternatives/tool-card-skeleton";
import { EmptyState } from "@/components/common/empty-state";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Tool } from "@/types";

export function BookmarksList() {
  const { bookmarks, hydrated } = useBookmarks();

  if (!hydrated) return <ToolGridSkeleton count={3} />;

  const tools = bookmarks
    .map((s) => toolBySlug.get(s))
    .filter((t): t is Tool => Boolean(t));

  if (tools.length === 0) {
    return (
      <EmptyState
        icon={Bookmark}
        title="No bookmarks yet"
        description="Tap the bookmark icon on any tool and it'll show up here."
        action={
          <Link href="/tools" className={cn(buttonVariants(), "mt-1")}>
            Browse tools
          </Link>
        }
      />
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map((t) => (
        <ToolCard key={t.slug} tool={t} />
      ))}
    </div>
  );
}
