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
        "group inline-flex h-9 items-center gap-2 rounded-lg border bg-muted/40 px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
        className,
      )}
    >
      <Search className="size-4" />
      <span className="hidden lg:inline">Search alternatives…</span>
      <kbd className="ml-auto hidden items-center gap-0.5 rounded border bg-background px-1.5 py-0.5 font-mono text-[10px] font-medium text-muted-foreground lg:inline-flex">
        ⌘K
      </kbd>
    </button>
  );
}
