import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Icon } from "@/components/common/icon";
import { cn } from "@/lib/utils";
import type { CategoryWithCount } from "@/services/tools";

export function CategoryCard({ category }: { category: CategoryWithCount }) {
  return (
    <Link href={`/categories/${category.slug}`} className="group block h-full">
      <Card className="relative h-full overflow-hidden p-5 card-hover">
        <ArrowUpRight className="absolute top-4 right-4 size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        <div
          className={cn(
            "mb-4 inline-flex size-11 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm",
            category.gradient,
          )}
        >
          <Icon name={category.icon} className="size-5" />
        </div>
        <h3 className="font-heading font-semibold">{category.name}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
          {category.description}
        </p>
        <p className="mt-3 text-xs font-medium text-primary">
          {category.count} {category.count === 1 ? "tool" : "tools"}
        </p>
      </Card>
    </Link>
  );
}
