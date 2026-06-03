"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bookmark } from "lucide-react";
import { useBookmarks } from "@/hooks/use-bookmarks";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function BookmarksLink({ className }: { className?: string }) {
  const { bookmarks, hydrated } = useBookmarks();
  const pathname = usePathname();
  const count = hydrated ? bookmarks.length : 0;
  const active = pathname === "/bookmarks";

  return (
    <Link
      href="/bookmarks"
      aria-label={count ? `Bookmarks (${count} saved)` : "Bookmarks"}
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon" }),
        "relative",
        active && "text-primary",
        className,
      )}
    >
      <Bookmark
        className={cn("size-4", active && "fill-primary")}
      />
      {count > 0 ? (
        <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground tabular-nums">
          {count > 99 ? "99+" : count}
        </span>
      ) : null}
    </Link>
  );
}
