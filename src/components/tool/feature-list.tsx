import { Check } from "lucide-react";

export function FeatureList({ features }: { features: string[] }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {features.map((feature, i) => (
        <li key={i} className="flex gap-2.5 text-sm">
          <Check className="mt-0.5 size-4 shrink-0 text-primary" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}
