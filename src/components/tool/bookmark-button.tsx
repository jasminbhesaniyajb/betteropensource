"use client";

import { Bookmark } from "lucide-react";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { cn } from "@/lib/utils";

interface BookmarkButtonProps {
  slug: string;
  className?: string;
  withLabel?: boolean;
}

export function BookmarkButton({
  slug,
  className,
  withLabel = false,
}: BookmarkButtonProps) {
  const { isBookmarked, toggle, hydrated } = useBookmarks();
  const active = hydrated && isBookmarked(slug);

  return (
    <button
      type="button"
      aria-pressed={active}
      aria-label={active ? "Remove bookmark" : "Add bookmark"}
      title={active ? "Remove bookmark" : "Save for later"}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
      }}
      className={cn(
        "inline-flex items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground",
        withLabel && "gap-2",
        className,
      )}
    >
      <Bookmark
        className={cn("size-4", active && "fill-primary text-primary")}
      />
      {withLabel ? (
        <span className="text-sm font-medium">{active ? "Saved" : "Save"}</span>
      ) : null}
    </button>
  );
}
