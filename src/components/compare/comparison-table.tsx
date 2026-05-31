import Link from "next/link";
import { Check, Minus } from "lucide-react";
import { Logo } from "@/components/common/logo";
import { formatStars, licenseLabel, pricingLabel } from "@/lib/format";
import { getProprietary } from "@/services/tools";
import type { Tool } from "@/types";

interface Row {
  label: string;
  render: (t: Tool) => React.ReactNode;
}

const ROWS: Row[] = [
  { label: "Summary", render: (t) => t.tagline },
  { label: "GitHub stars", render: (t) => formatStars(t.githubStars) },
  { label: "License", render: (t) => licenseLabel(t.license) },
  { label: "Language", render: (t) => t.language },
  { label: "Pricing", render: (t) => pricingLabel(t.pricing) },
  {
    label: "Self-hostable",
    render: (t) =>
      t.selfHostable ? (
        <Check className="size-4 text-emerald-500" />
      ) : (
        <Minus className="size-4 text-muted-foreground" />
      ),
  },
  {
    label: "Replaces",
    render: (t) =>
      t.alternativeToSlugs
        .map((s) => getProprietary(s)?.name)
        .filter(Boolean)
        .join(", ") || "—",
  },
  { label: "Rating", render: (t) => `${t.rating.value.toFixed(1)} / 5` },
];

export function ComparisonTable({ tools }: { tools: Tool[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b bg-muted/40">
            <th className="w-36 p-4 text-left font-medium text-muted-foreground">
              Feature
            </th>
            {tools.map((t) => (
              <th key={t.slug} className="p-4 text-left align-bottom">
                <div className="flex items-center gap-2">
                  <Logo src={t.logo} name={t.name} size={32} />
                  <Link
                    href={`/tools/${t.slug}`}
                    className="font-heading font-semibold hover:text-primary"
                  >
                    {t.name}
                  </Link>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr key={row.label} className="border-t">
              <th className="p-4 text-left align-top font-medium text-muted-foreground">
                {row.label}
              </th>
              {tools.map((t) => (
                <td key={t.slug} className="p-4 align-top">
                  {row.render(t)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
