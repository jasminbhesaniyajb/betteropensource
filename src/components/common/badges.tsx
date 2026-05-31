import { Server, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { licenseLabel, pricingLabel } from "@/lib/format";
import { GithubIcon } from "@/components/common/brand-icons";
import type { LicenseId, Pricing } from "@/types";

export function OpenSourceBadge({ className }: { className?: string }) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "gap-1 border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
        className,
      )}
    >
      <GithubIcon className="size-3" />
      Open Source
    </Badge>
  );
}

export function SelfHostBadge({ className }: { className?: string }) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        "gap-1 border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-400",
        className,
      )}
    >
      <Server className="size-3" />
      Self-hostable
    </Badge>
  );
}

export function LicenseBadge({
  license,
  className,
}: {
  license: LicenseId;
  className?: string;
}) {
  return (
    <Badge variant="outline" className={cn("font-mono text-xs", className)}>
      {licenseLabel(license)}
    </Badge>
  );
}

export function PricingBadge({
  pricing,
  className,
}: {
  pricing: Pricing;
  className?: string;
}) {
  return (
    <Badge variant="secondary" className={cn("font-normal", className)}>
      {pricingLabel(pricing)}
    </Badge>
  );
}

export function StarBadge({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-sm text-muted-foreground",
        className,
      )}
    >
      <Star className="size-3.5 fill-amber-400 text-amber-400" />
      {label}
    </span>
  );
}
