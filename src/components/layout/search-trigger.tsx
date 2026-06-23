"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { openCommandMenu } from "./command-menu";

export function SearchTrigger({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={openCommandMenu}
      aria-label="Search (Command or Control + K)"
      className={cn(
        // Compact square icon button — sits flush with the other nav icons.
        "group inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-transparent text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
        // xl and up: expand into a fixed-width search field that never wraps.
        "xl:w-48 xl:justify-start xl:gap-2 xl:border-border xl:bg-muted/40 xl:px-3",
        className,
      )}
    >
      <Search className="size-4 shrink-0" />
      <span className="hidden whitespace-nowrap text-sm xl:inline">Search…</span>
      <kbd className="ml-auto hidden shrink-0 items-center gap-0.5 rounded border bg-background px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground xl:inline-flex">
        ⌘K
      </kbd>
    </button>
  );
}
