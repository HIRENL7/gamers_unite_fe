import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function CafeDetailSkeleton() {
  return (
    <aside
      className="sticky top-20 grid gap-4 self-start"
      aria-label="Loading cafe details"
    >
      <Card className="rounded-lg">
        <Skeleton className="h-48 w-full rounded-none" />

        <CardHeader>
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-7 w-24 rounded-md" />
            <Skeleton className="h-7 w-20 rounded-md" />
            <Skeleton className="h-7 w-16 rounded-md" />
          </div>
        </CardHeader>

        <CardContent className="grid gap-5">
          <div className="grid gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          <div className="grid gap-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="grid grid-cols-[1rem_1fr] gap-x-3 gap-y-1"
              >
                <Skeleton className="mt-0.5 size-4 rounded" />
                <div className="space-y-1">
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-4 w-40" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-lg" size="sm">
        <CardHeader>
          <Skeleton className="h-5 w-32" />
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-8 w-24 rounded-md" />
          ))}
        </CardContent>
      </Card>

      <Card className="rounded-lg" size="sm">
        <CardHeader>
          <Skeleton className="h-5 w-24" />
        </CardHeader>
        <CardContent className="grid gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="inline-flex items-center gap-2">
              <Skeleton className="size-4 rounded" />
              <Skeleton className="h-4 w-36" />
            </div>
          ))}
        </CardContent>
      </Card>
    </aside>
  );
}

export { CafeDetailSkeleton };
