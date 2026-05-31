import { ToolGridSkeleton } from "@/components/alternatives/tool-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-7xl container-px py-6 lg:py-8">
      <div className="mb-8 space-y-3">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-9 w-80 max-w-full" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>
      <div className="mb-5 flex gap-2">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-24" />
      </div>
      <ToolGridSkeleton count={9} />
    </div>
  );
}
