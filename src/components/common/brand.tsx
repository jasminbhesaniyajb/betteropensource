import Link from "next/link";
import { Sparkles } from "lucide-react";
import { siteConfig } from "@/constants/site";
import { cn } from "@/lib/utils";

export function Brand({
  className,
  withWordmark = true,
}: {
  className?: string;
  withWordmark?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} home`}
      className={cn("group flex items-center gap-2", className)}
    >
      <span className="relative flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-sky-400 text-white shadow-sm shadow-blue-500/30 transition-transform group-hover:scale-105">
        <Sparkles className="size-4" />
      </span>
      {withWordmark ? (
        <span className="font-heading text-lg font-bold tracking-tight">
          Better<span className="text-primary">OpenSource</span>
        </span>
      ) : null}
    </Link>
  );
}
