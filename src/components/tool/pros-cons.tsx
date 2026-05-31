import { Check, X } from "lucide-react";
import { Card } from "@/components/ui/card";

export function ProsCons({
  pros,
  cons,
}: {
  pros: string[];
  cons: string[];
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card className="p-5">
        <h3 className="mb-3 font-heading font-semibold text-emerald-600 dark:text-emerald-400">
          Pros
        </h3>
        <ul className="flex flex-col gap-2.5">
          {pros.map((p, i) => (
            <li key={i} className="flex gap-2.5 text-sm">
              <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </Card>
      <Card className="p-5">
        <h3 className="mb-3 font-heading font-semibold text-rose-600 dark:text-rose-400">
          Cons
        </h3>
        <ul className="flex flex-col gap-2.5">
          {cons.map((c, i) => (
            <li key={i} className="flex gap-2.5 text-sm">
              <X className="mt-0.5 size-4 shrink-0 text-rose-500" />
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
