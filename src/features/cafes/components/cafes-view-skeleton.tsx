import { Container, Section } from "@/components/layout";
import { Skeleton } from "@/components/ui/skeleton";
import { CafeLoadingSkeleton } from "@/features/cafes/components/cafe-loading-skeleton";

function CafesViewSkeleton() {
  return (
    <div className="flex flex-1 flex-col" aria-label="Loading cafes">
      <Section className="border-b bg-[linear-gradient(135deg,#f8fafc_0%,var(--background)_46%,#ecfeff_100%)] dark:bg-[linear-gradient(135deg,#111827_0%,var(--background)_46%,#083344_100%)]">
        <Container className="grid gap-6 py-10">
          <div className="max-w-3xl">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="mt-2 h-10 w-full max-w-xl sm:h-12 lg:h-14" />
            <Skeleton className="mt-4 h-6 w-full max-w-2xl" />
            <Skeleton className="mt-2 h-6 w-4/5 max-w-xl" />
          </div>
          <Skeleton className="h-11 w-full max-w-2xl rounded-lg" />
        </Container>
      </Section>

      <Section>
        <Container>
          <CafeLoadingSkeleton />
        </Container>
      </Section>
    </div>
  );
}

export { CafesViewSkeleton };
