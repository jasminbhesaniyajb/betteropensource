import { cn } from "@/lib/utils";

/** Decorative aurora/blob background (pure CSS animations, reduced-motion safe). */
export function AnimatedBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      <div className="absolute top-[-12%] left-1/2 size-[42rem] -translate-x-1/2 animate-aurora rounded-full bg-blue-500/20 blur-3xl" />
      <div className="absolute top-[15%] right-[2%] size-[28rem] animate-blob rounded-full bg-sky-400/20 blur-3xl" />
      <div className="absolute bottom-[-5%] left-[2%] size-[24rem] animate-float rounded-full bg-violet-500/15 blur-3xl" />
      <div className="absolute inset-0 bg-grid opacity-60" />
    </div>
  );
}
