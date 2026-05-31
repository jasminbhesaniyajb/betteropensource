import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/common/section-heading";
import { Reveal } from "@/components/common/reveal";
import { CategoryCard } from "@/components/alternatives/category-card";
import { buttonVariants } from "@/components/ui/button";
import { getCategoriesWithCounts } from "@/services/tools";
import { cn } from "@/lib/utils";

export function PopularCategories() {
  const categories = getCategoriesWithCounts();

  return (
    <section className="border-y bg-muted/30">
      <div className="mx-auto w-full max-w-7xl container-px py-16 sm:py-20">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Browse by category"
            title="Find tools for every job"
            description="From design to deployment, explore open-source software organized the way you work."
          />
          <Link
            href="/categories"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "hidden shrink-0 gap-1 sm:inline-flex",
            )}
          >
            All categories <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map((category, i) => (
            <Reveal key={category.slug} className="h-full" delay={i * 0.03}>
              <CategoryCard category={category} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
