import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function SearchResultCardSkeleton() {
  return (
    <Card className="rounded-lg">
      <CardHeader>
        <div className="flex items-start gap-3">
          <Skeleton className="size-10 shrink-0 rounded-md" />
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-6 w-14 rounded-md" />
            </div>
            <Skeleton className="h-4 w-48" />
          </div>
          <Skeleton className="h-7 w-14 shrink-0 rounded-md" />
        </div>
      </CardHeader>

      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-7 w-16 rounded-md" />
          <Skeleton className="h-7 w-20 rounded-md" />
          <Skeleton className="h-7 w-14 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}

export { SearchResultCardSkeleton };
