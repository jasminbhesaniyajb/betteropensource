import { Terminal } from "lucide-react";
import { CopyButton } from "@/components/tool/copy-button";
import type { InstallStep } from "@/types";

export function InstallGuide({ steps }: { steps: InstallStep[] }) {
  return (
    <div className="flex flex-col gap-4">
      {steps.map((step, i) => (
        <div key={i} className="flex flex-col gap-2">
          <p className="text-sm font-medium">{step.label}</p>
          {step.command ? (
            <div className="flex items-center gap-3 rounded-lg border bg-muted/50 py-2.5 pr-2.5 pl-3.5 font-mono text-sm">
              <Terminal className="size-4 shrink-0 text-muted-foreground" />
              <code className="flex-1 overflow-x-auto whitespace-pre">
                {step.command}
              </code>
              <CopyButton value={step.command} label="Copy command" />
            </div>
          ) : null}
          {step.steps ? (
            <ol className="ml-4 list-decimal space-y-1.5 text-sm text-muted-foreground marker:text-muted-foreground/60">
              {step.steps.map((s, j) => (
                <li key={j}>{s}</li>
              ))}
            </ol>
          ) : null}
        </div>
      ))}
    </div>
  );
}
