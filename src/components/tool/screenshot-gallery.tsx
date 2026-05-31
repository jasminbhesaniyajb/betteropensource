import { Logo } from "@/components/common/logo";

const LABELS = ["Overview", "Workspace", "Settings"];

/**
 * Renders branded preview frames. We don't host real product screenshots,
 * so these are styled placeholders that read as intentional previews.
 */
export function ScreenshotGallery({
  name,
  logo,
}: {
  name: string;
  logo?: string;
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {LABELS.map((label) => (
        <figure
          key={label}
          className="overflow-hidden rounded-xl border bg-card"
        >
          <div className="flex items-center gap-1.5 border-b bg-muted/50 px-3 py-2">
            <span className="size-2 rounded-full bg-red-400" />
            <span className="size-2 rounded-full bg-amber-400" />
            <span className="size-2 rounded-full bg-emerald-400" />
          </div>
          <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-blue-500/10 to-sky-400/10">
            <div className="bg-grid absolute inset-0 opacity-50" aria-hidden="true" />
            <figcaption className="relative flex flex-col items-center gap-2 text-muted-foreground">
              <Logo src={logo} name={name} size={40} />
              <span className="text-xs font-medium">{`${name} · ${label}`}</span>
            </figcaption>
          </div>
        </figure>
      ))}
    </div>
  );
}
