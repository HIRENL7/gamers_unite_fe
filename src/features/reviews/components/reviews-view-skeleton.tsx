import { Container, Section } from "@/components/layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ReviewCardSkeleton } from "@/features/reviews/components/review-card-skeleton";

function CommentFormSkeleton() {
  return (
    <Card className="rounded-lg">
      <CardHeader>
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-56" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            <div className="grid gap-2">
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
          </div>
          <div className="grid gap-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between gap-3">
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="size-7 rounded-md" />
              ))}
            </div>
          </div>
          <div className="grid gap-2">
            <Skeleton className="h-5 w-12" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div className="grid gap-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="min-h-32 w-full rounded-md" />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Skeleton className="h-4 w-56" />
            <Skeleton className="h-8 w-36 rounded-lg" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ReviewsViewSkeleton() {
  return (
    <div className="flex flex-1 flex-col" aria-label="Loading reviews">
      <Section className="border-b bg-[linear-gradient(135deg,#f8fafc_0%,var(--background)_48%,#fff1f2_100%)] dark:bg-[linear-gradient(135deg,#111827_0%,var(--background)_48%,#3b0712_100%)]">
        <Container className="grid gap-5 py-10">
          <div className="max-w-3xl">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="mt-2 h-10 w-full max-w-xl sm:h-12 lg:h-14" />
            <Skeleton className="mt-4 h-6 w-full max-w-2xl" />
            <Skeleton className="mt-2 h-6 w-3/4 max-w-xl" />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
            <div className="grid gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <ReviewCardSkeleton key={index} />
              ))}
              <div className="bg-card flex flex-col gap-3 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between">
                <Skeleton className="h-5 w-52" />
                <div className="flex items-center gap-2">
                  <Skeleton className="size-8 rounded-lg" />
                  <Skeleton className="h-8 min-w-24 rounded-md" />
                  <Skeleton className="size-8 rounded-lg" />
                </div>
              </div>
            </div>
            <aside className="lg:sticky lg:top-20 lg:self-start">
              <CommentFormSkeleton />
            </aside>
          </div>
        </Container>
      </Section>
    </div>
  );
}

export { ReviewsViewSkeleton };
