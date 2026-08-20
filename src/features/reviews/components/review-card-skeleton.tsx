import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function ReviewCardSkeleton() {
  return (
    <Card className="rounded-lg">
      <CardHeader>
        <div className="flex items-start gap-3">
          <Skeleton className="size-11 shrink-0 rounded-md" />
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <Skeleton className="hidden h-6 w-16 rounded-md sm:block" />
        </div>
      </CardHeader>

      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <div className="flex items-center justify-between gap-3">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-10" />
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="size-4 rounded-sm" />
            ))}
          </div>
        </div>
        <div className="grid gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-7 w-16 rounded-md" />
          <Skeleton className="h-7 w-20 rounded-md" />
          <Skeleton className="h-7 w-14 rounded-md" />
        </div>
      </CardContent>

      <CardFooter className="justify-between gap-3">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-4 w-10" />
      </CardFooter>
    </Card>
  );
}

export { ReviewCardSkeleton };
