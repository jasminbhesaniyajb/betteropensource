import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/common/logo";
import { getProprietary } from "@/services/tools";
import type { ProprietaryTool, Tool } from "@/types";

export function ProprietaryComparison({ tool }: { tool: Tool }) {
  const targets = tool.alternativeToSlugs
    .map((s) => getProprietary(s))
    .filter((p): p is ProprietaryTool => Boolean(p));
  if (targets.length === 0) return null;

  const main = targets[0];
  const reasons = [
    `Own your data instead of trusting ${main.name}'s servers`,
    "No per-seat pricing — grow without ballooning costs",
    `${tool.name} is open source: audit it, fork it, extend it`,
    tool.selfHostable
      ? "Self-host for full privacy and compliance control"
      : "Backed by a transparent, community-driven roadmap",
  ];

  return (
    <Card className="flex flex-col gap-5 p-6">
      <div className="flex items-center gap-3">
        <Logo src={tool.logo} name={tool.name} size={40} />
        <span className="text-muted-foreground">vs</span>
        <Logo src={main.logo} name={main.name} size={40} />
        <p className="text-sm">
          Why pick <span className="font-semibold">{tool.name}</span> over{" "}
          <span className="font-semibold">{main.name}</span>
        </p>
      </div>
      <ul className="grid gap-2.5 sm:grid-cols-2">
        {reasons.map((r, i) => (
          <li key={i} className="flex gap-2.5 text-sm">
            <Check className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>{r}</span>
          </li>
        ))}
      </ul>
      <Link
        href={`/alternatives/${main.slug}`}
        className="inline-flex w-fit items-center gap-1 text-sm font-medium text-primary hover:underline"
      >
        See all open-source {main.name} alternatives
        <ArrowRight className="size-4" />
      </Link>
    </Card>
  );
}
