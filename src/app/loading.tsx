import { Container, Section } from "@/components/layout";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { HeroFuturisticSkeleton } from "@/components/ui/hero-futuristic-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-1 flex-col" aria-label="Loading home page">
      <Section spacing="none" className="overflow-hidden border-b p-0">
        <HeroFuturisticSkeleton />
      </Section>

      <Section>
        <Container>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-3">
              <Skeleton className="h-5 w-28" />
              <Skeleton className="h-10 w-full max-w-xl" />
              <Skeleton className="h-6 w-full max-w-2xl" />
            </div>
            <Skeleton className="h-8 w-32 rounded-lg" />
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="rounded-lg">
                <Skeleton className="h-2 w-full rounded-none" />
                <CardHeader>
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                </CardContent>
                <CardFooter className="justify-between">
                  <Skeleton className="h-5 w-10" />
                  <Skeleton className="h-7 w-16 rounded-lg" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
