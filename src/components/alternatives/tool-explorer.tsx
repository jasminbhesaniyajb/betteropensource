"use client";

import { useMemo, useState } from "react";
import { Server, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterPopover } from "@/components/alternatives/filter-popover";
import { ToolCard } from "@/components/alternatives/tool-card";
import { EmptyState } from "@/components/common/empty-state";
import { categories } from "@/constants/categories";
import { licenseLabel } from "@/lib/format";
import { sortTools } from "@/services/tools";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import type { SortKey, Tool } from "@/types";

const SORTS: { value: SortKey; label: string }[] = [
  { value: "popular", label: "Most stars" },
  { value: "trending", label: "Trending" },
  { value: "newest", label: "Newest" },
  { value: "rating", label: "Top rated" },
  { value: "alphabetical", label: "A–Z" },
];

interface ToolExplorerProps {
  tools: Tool[];
  showCategoryFilter?: boolean;
  initialQuery?: string;
  initialSort?: SortKey;
}

export function ToolExplorer({
  tools,
  showCategoryFilter = true,
  initialQuery = "",
  initialSort = "popular",
}: ToolExplorerProps) {
  const [query, setQuery] = useState(initialQuery);
  const debounced = useDebounce(query, 200);
  const [sort, setSort] = useState<SortKey>(initialSort);
  const [cats, setCats] = useState<string[]>([]);
  const [lics, setLics] = useState<string[]>([]);
  const [selfHost, setSelfHost] = useState(false);

  const licenseOptions = useMemo(() => {
    const set = new Set(tools.map((t) => t.license));
    return [...set].map((l) => ({ value: l, label: licenseLabel(l) }));
  }, [tools]);

  const categoryOptions = useMemo(
    () =>
      categories
        .filter((c) => tools.some((t) => t.categorySlug === c.slug))
        .map((c) => ({ value: c.slug, label: c.name })),
    [tools],
  );

  const filtered = useMemo(() => {
    const q = debounced.trim().toLowerCase();
    const list = tools.filter((t) => {
      if (cats.length && !cats.includes(t.categorySlug)) return false;
      if (lics.length && !lics.includes(t.license)) return false;
      if (selfHost && !t.selfHostable) return false;
      if (q) {
        const hay = `${t.name} ${t.tagline} ${t.tags.join(" ")} ${t.language}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    return sortTools(list, sort);
  }, [tools, debounced, cats, lics, selfHost, sort]);

  const activeCount = cats.length + lics.length + (selfHost ? 1 : 0);
  const hasContext = activeCount > 0 || debounced.trim().length > 0;

  function toggleCat(v: string) {
    setCats((p) => (p.includes(v) ? p.filter((x) => x !== v) : [...p, v]));
  }
  function toggleLic(v: string) {
    setLics((p) => (p.includes(v) ? p.filter((x) => x !== v) : [...p, v]));
  }
  function clearAll() {
    setCats([]);
    setLics([]);
    setSelfHost(false);
    setQuery("");
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tools…"
          aria-label="Search tools"
          className="h-9 lg:max-w-xs"
        />
        <div className="flex flex-wrap items-center gap-2">
          {showCategoryFilter ? (
            <FilterPopover
              label="Category"
              options={categoryOptions}
              selected={cats}
              onToggle={toggleCat}
            />
          ) : null}
          <FilterPopover
            label="License"
            options={licenseOptions}
            selected={lics}
            onToggle={toggleLic}
          />
          <button
            type="button"
            aria-pressed={selfHost}
            onClick={() => setSelfHost((s) => !s)}
            className={cn(
              "inline-flex h-8 items-center gap-1.5 rounded-lg border px-3 text-sm transition-colors",
              selfHost
                ? "border-primary bg-primary/10 text-primary"
                : "text-muted-foreground hover:border-foreground/30 hover:text-foreground",
            )}
          >
            <Server className="size-3.5" />
            Self-hostable
          </button>
        </div>
        <div className="lg:ml-auto">
          <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SORTS.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-sm">
        <span className="text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "tool" : "tools"}
        </span>
        {hasContext && activeCount > 0 ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="gap-1 text-muted-foreground"
          >
            <X className="size-3.5" />
            Clear filters
          </Button>
        ) : null}
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <ToolCard key={t.slug} tool={t} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No tools match your filters"
          description="Try removing a filter or searching for something else."
          action={
            <Button variant="outline" size="sm" onClick={clearAll}>
              Clear filters
            </Button>
          }
        />
      )}
    </div>
  );
}
