import { Sparkles } from "lucide-react";

/**
 * Answer-first "Quick answer" callout for GEO (AI search). Placing a concise,
 * fact-rich summary at the top of a page makes it easy for ChatGPT / Perplexity
 * / AI Overviews to extract and cite.
 */
export function AnswerBox({
  label = "Quick answer",
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
      <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold tracking-wide text-primary uppercase">
        <Sparkles className="size-3.5" />
        {label}
      </p>
      <p className="text-[15px] leading-relaxed text-foreground/90">{children}</p>
    </div>
  );
}
