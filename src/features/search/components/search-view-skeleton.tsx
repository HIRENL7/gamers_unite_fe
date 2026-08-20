import { Container, Section } from "@/components/layout";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchResultCardSkeleton } from "@/features/search/components/search-result-card-skeleton";

function SearchViewSkeleton() {
  return (
    <div className="flex flex-1 flex-col" aria-label="Loading search">
      <Section className="border-b bg-[linear-gradient(135deg,#f8fafc_0%,var(--background)_48%,#fef3c7_100%)] dark:bg-[linear-gradient(135deg,#111827_0%,var(--background)_48%,#451a03_100%)]">
        <Container className="grid gap-6 py-10">
          <div className="max-w-3xl">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="mt-2 h-10 w-full max-w-xl sm:h-12 lg:h-14" />
            <Skeleton className="mt-4 h-6 w-full max-w-2xl" />
            <Skeleton className="mt-2 h-6 w-3/4 max-w-xl" />
          </div>
          <div className="grid gap-2">
            <Skeleton className="h-5 w-14" />
            <Skeleton className="h-12 w-full rounded-lg" />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
            <div className="bg-card grid gap-4 rounded-lg border p-4">
              <div className="flex items-center justify-between gap-3">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-7 w-14 rounded-lg" />
              </div>
              <div className="grid gap-2">
                <Skeleton className="h-5 w-12" />
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton key={index} className="h-8 w-full rounded-lg" />
                  ))}
                </div>
              </div>
              <div className="grid gap-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
              <div className="grid gap-2">
                <Skeleton className="h-5 w-28" />
                <div className="grid grid-cols-4 gap-2 lg:grid-cols-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <Skeleton key={index} className="h-8 w-full rounded-lg" />
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="bg-card flex flex-col gap-3 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="grid gap-1 sm:min-w-48">
                  <Skeleton className="h-4 w-14" />
                  <Skeleton className="h-9 w-full rounded-md" />
                </div>
                <Skeleton className="h-8 w-32 rounded-lg" />
              </div>

              <div className="bg-card flex flex-col gap-2 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>

              {Array.from({ length: 5 }).map((_, index) => (
                <SearchResultCardSkeleton key={index} />
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

export { SearchViewSkeleton };
