import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
      <p className="font-heading text-6xl font-bold text-gradient">404</p>
      <h1 className="font-heading text-2xl font-bold tracking-tight">
        Page not found
      </h1>
      <p className="text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <div className="mt-2 flex flex-wrap justify-center gap-2">
        <Link href="/" className={cn(buttonVariants())}>
          Back home
        </Link>
        <Link
          href="/tools"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          Browse tools
        </Link>
      </div>
    </div>
  );
}
