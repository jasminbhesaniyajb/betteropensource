import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function RatingStars({
  value,
  className,
  showValue = false,
}: {
  value: number;
  className?: string;
  showValue?: boolean;
}) {
  return (
    <span
      className={cn("inline-flex items-center gap-1", className)}
      aria-label={`Rated ${value.toFixed(1)} out of 5`}
    >
      <span className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              "size-4",
              i < Math.round(value)
                ? "fill-amber-400 text-amber-400"
                : "text-muted-foreground/30",
            )}
          />
        ))}
      </span>
      {showValue ? (
        <span className="text-sm font-medium">{value.toFixed(1)}</span>
      ) : null}
    </span>
  );
}
