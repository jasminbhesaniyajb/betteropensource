import { getRelatedTools } from "@/lib/recommendations";
import { ToolCard } from "@/components/alternatives/tool-card";
import { SectionHeading } from "@/components/common/section-heading";
import type { Tool } from "@/types";

export function RelatedTools({ tool }: { tool: Tool }) {
  const related = getRelatedTools(tool, 4);
  if (related.length === 0) return null;

  return (
    <section>
      <SectionHeading
        eyebrow="You might also like"
        title="Related alternatives"
        description="Smart picks based on category, tags, and the tools this one replaces."
      />
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((t) => (
          <ToolCard key={t.slug} tool={t} />
        ))}
      </div>
    </section>
  );
}
