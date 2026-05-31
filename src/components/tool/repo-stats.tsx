import { Code2, GitFork, History, Scale, Star, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { formatDate, formatNumber, formatStars, licenseLabel } from "@/lib/format";
import type { Tool } from "@/types";

export function RepoStats({ tool }: { tool: Tool }) {
  const items: { icon: LucideIcon; label: string; value: string }[] = [
    { icon: Star, label: "Stars", value: formatStars(tool.githubStars) },
  ];
  if (tool.githubForks != null)
    items.push({ icon: GitFork, label: "Forks", value: formatStars(tool.githubForks) });
  if (tool.contributors != null)
    items.push({
      icon: Users,
      label: "Contributors",
      value: formatNumber(tool.contributors),
    });
  items.push({ icon: Code2, label: "Language", value: tool.language });
  items.push({ icon: Scale, label: "License", value: licenseLabel(tool.license) });
  if (tool.lastCommit)
    items.push({
      icon: History,
      label: "Last commit",
      value: formatDate(tool.lastCommit),
    });

  return (
    <dl className="grid grid-cols-2 gap-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-lg border bg-muted/30 p-3"
        >
          <dt className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <item.icon className="size-3.5" />
            {item.label}
          </dt>
          <dd className="mt-1 truncate text-sm font-semibold" title={item.value}>
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
