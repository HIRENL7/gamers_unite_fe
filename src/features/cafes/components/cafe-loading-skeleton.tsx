import { Skeleton } from "@/components/ui/skeleton";
import { CafeCardSkeleton } from "@/features/cafes/components/cafe-card-skeleton";
import { CafeDetailSkeleton } from "@/features/cafes/components/cafe-detail-skeleton";

function CafeLoadingSkeleton() {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
      <div className="grid gap-4">
        <div className="grid gap-4 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <CafeCardSkeleton key={index} />
          ))}
        </div>
        <div className="bg-card flex flex-col gap-3 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between">
          <Skeleton className="h-5 w-48" />
          <div className="flex items-center gap-2">
            <Skeleton className="size-8 rounded-lg" />
            <Skeleton className="h-8 min-w-24 rounded-md" />
            <Skeleton className="size-8 rounded-lg" />
          </div>
        </div>
      </div>

      <CafeDetailSkeleton />
    </div>
  );
}

export { CafeLoadingSkeleton };
