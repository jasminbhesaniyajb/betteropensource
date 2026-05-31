import Link from "next/link";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/common/logo";
import { LicenseBadge, OpenSourceBadge } from "@/components/common/badges";
import { BookmarkButton } from "@/components/tool/bookmark-button";
import { formatStars } from "@/lib/format";
import { getProprietary } from "@/services/tools";
import { cn } from "@/lib/utils";
import type { Tool } from "@/types";

export function ToolCard({
  tool,
  className,
}: {
  tool: Tool;
  className?: string;
}) {
  const altNames = tool.alternativeToSlugs
    .map((s) => getProprietary(s)?.name)
    .filter(Boolean)
    .slice(0, 2)
    .join(", ");

  return (
    <Card
      className={cn(
        "group relative flex h-full flex-col gap-3 p-5 card-hover",
        className,
      )}
    >
      <BookmarkButton
        slug={tool.slug}
        className="absolute top-4 right-4 z-10"
      />

      <div className="flex items-start gap-3">
        <Logo src={tool.logo} name={tool.name} size={44} />
        <div className="min-w-0 pr-6">
          <h3 className="font-heading text-base leading-tight font-semibold">
            <Link
              href={`/tools/${tool.slug}`}
              className="outline-none after:absolute after:inset-0 after:rounded-xl focus-visible:after:ring-2 focus-visible:after:ring-ring"
            >
              {tool.name}
            </Link>
          </h3>
          {altNames ? (
            <p className="mt-0.5 truncate text-xs text-muted-foreground">
              Alternative to {altNames}
            </p>
          ) : null}
        </div>
      </div>

      <p className="line-clamp-2 text-sm text-muted-foreground">
        {tool.tagline}
      </p>

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-1">
        <OpenSourceBadge />
        <LicenseBadge license={tool.license} />
        <span className="ml-auto inline-flex items-center gap-1 text-sm font-medium text-muted-foreground">
          <Star className="size-3.5 fill-amber-400 text-amber-400" />
          {formatStars(tool.githubStars)}
        </span>
      </div>
    </Card>
  );
}
