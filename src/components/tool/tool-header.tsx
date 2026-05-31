import { ExternalLink, Star } from "lucide-react";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { Logo } from "@/components/common/logo";
import { OpenSourceBadge, SelfHostBadge } from "@/components/common/badges";
import { RatingStars } from "@/components/tool/rating-stars";
import { BookmarkButton } from "@/components/tool/bookmark-button";
import { GithubIcon } from "@/components/common/brand-icons";
import { buttonVariants } from "@/components/ui/button";
import { getProprietary } from "@/services/tools";
import { formatStars } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Tool } from "@/types";

export function ToolHeader({ tool }: { tool: Tool }) {
  const altNames = tool.alternativeToSlugs
    .map((s) => getProprietary(s)?.name)
    .filter(Boolean)
    .join(", ");

  return (
    <div className="flex flex-col gap-5">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Tools", href: "/tools" },
          { name: tool.name },
        ]}
      />

      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <Logo src={tool.logo} name={tool.name} size={72} rounded="rounded-2xl" />
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-heading text-3xl font-bold tracking-tight">
              {tool.name}
            </h1>
            <OpenSourceBadge />
            {tool.selfHostable ? <SelfHostBadge /> : null}
          </div>
          <p className="mt-1.5 text-lg text-muted-foreground">{tool.tagline}</p>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <RatingStars value={tool.rating.value} showValue />
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1">
              <Star className="size-3.5 fill-amber-400 text-amber-400" />
              {formatStars(tool.githubStars)} stars
            </span>
            {altNames ? (
              <>
                <span aria-hidden>·</span>
                <span>
                  Alternative to{" "}
                  <span className="text-foreground">{altNames}</span>
                </span>
              </>
            ) : null}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={tool.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants(), "h-10 gap-2 px-5")}
            >
              Visit website <ExternalLink className="size-4" />
            </a>
            <a
              href={tool.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline" }), "h-10 gap-2 px-4")}
            >
              <GithubIcon className="size-4" />
              GitHub
            </a>
            {tool.docsUrl ? (
              <a
                href={tool.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "h-10 px-4",
                )}
              >
                Docs
              </a>
            ) : null}
            <BookmarkButton
              slug={tool.slug}
              withLabel
              className={cn(buttonVariants({ variant: "outline" }), "h-10 px-4")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
