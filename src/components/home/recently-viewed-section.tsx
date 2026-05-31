"use client";

import { useRecentlyViewed } from "@/hooks/use-recently-viewed";
import { toolBySlug } from "@/data/tools";
import { getSmartPicks } from "@/lib/recommendations";
import { SectionHeading } from "@/components/common/section-heading";
import { ToolCard } from "@/components/alternatives/tool-card";
import type { Tool } from "@/types";

export function RecentlyViewedSection() {
  const { recent, hydrated } = useRecentlyViewed();

  if (!hydrated || recent.length === 0) return null;

  const recentTools = recent
    .map((s) => toolBySlug.get(s))
    .filter((t): t is Tool => Boolean(t))
    .slice(0, 4);
  const picks = getSmartPicks(recent, 4);

  return (
    <section className="border-t bg-muted/30">
      <div className="mx-auto w-full max-w-7xl container-px py-16 sm:py-20">
        <SectionHeading
          eyebrow="For you"
          title="Recommended based on your activity"
          description="Smart picks generated from the tools you've recently explored — no tracking, computed right in your browser."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {picks.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>

        {recentTools.length > 0 ? (
          <>
            <h3 className="mt-12 font-heading text-lg font-semibold">
              Recently viewed
            </h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {recentTools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
