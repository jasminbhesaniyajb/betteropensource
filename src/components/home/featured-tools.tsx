import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/common/section-heading";
import { Reveal } from "@/components/common/reveal";
import { ToolCard } from "@/components/alternatives/tool-card";
import { buttonVariants } from "@/components/ui/button";
import { getFeaturedTools } from "@/services/tools";
import { cn } from "@/lib/utils";

export function FeaturedTools() {
  const tools = getFeaturedTools(6);

  return (
    <section className="mx-auto w-full max-w-7xl container-px py-16 sm:py-20">
      <div className="flex items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Editor's picks"
          title="Featured open-source tools"
          description="Standout projects we think are worth your attention — mature, well-maintained, and genuinely great."
        />
        <Link
          href="/tools"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "hidden shrink-0 gap-1 sm:inline-flex",
          )}
        >
          All tools <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool, i) => (
          <Reveal key={tool.slug} className="h-full" delay={i * 0.04}>
            <ToolCard tool={tool} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
