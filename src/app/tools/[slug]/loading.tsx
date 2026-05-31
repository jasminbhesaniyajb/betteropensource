import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-7xl container-px py-6 lg:py-8">
      <div className="flex flex-col gap-5">
        <Skeleton className="h-4 w-48" />
        <div className="flex gap-5">
          <Skeleton className="size-[72px] rounded-2xl" />
          <div className="flex-1 space-y-3 pt-1">
            <Skeleton className="h-8 w-64 max-w-full" />
            <Skeleton className="h-5 w-80 max-w-full" />
            <Skeleton className="h-4 w-56 max-w-full" />
          </div>
        </div>
      </div>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
        <Skeleton className="h-72 w-full rounded-xl" />
      </div>
    </div>
  );
}
