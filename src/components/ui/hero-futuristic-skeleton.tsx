import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface HeroFuturisticSkeletonProps {
  className?: string;
}

function HeroFuturisticSkeleton({ className }: HeroFuturisticSkeletonProps) {
  return (
    <div
      className={cn("hero-futuristic-root relative h-svh bg-black", className)}
      aria-label="Loading hero experience"
    >
      <div className="pointer-events-none absolute z-60 flex h-svh w-full flex-col items-center justify-center px-10 uppercase">
        <div className="flex space-x-2 lg:space-x-6">
          <Skeleton className="h-9 w-[4.5rem] rounded-md bg-white/15 md:h-12 md:w-24 xl:h-16 xl:w-32 2xl:h-20 2xl:w-40" />
          <Skeleton className="h-9 w-16 rounded-md bg-white/15 md:h-12 md:w-20 xl:h-16 xl:w-28 2xl:h-20 2xl:w-36" />
          <Skeleton className="h-9 w-28 rounded-md bg-white/15 md:h-12 md:w-36 xl:h-16 xl:w-48 2xl:h-20 2xl:w-56" />
        </div>
        <div className="mt-2">
          <Skeleton className="h-4 w-64 rounded-md bg-white/10 md:h-7 md:w-[28rem] xl:h-8 xl:w-[34rem] 2xl:h-9 2xl:w-[40rem]" />
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 z-70 w-[min(56rem,calc(100%-2rem))] -translate-x-1/2">
        <div className="bg-background grid gap-3 rounded-lg border p-3 shadow-sm md:grid-cols-[1fr_1fr_auto]">
          <div className="grid gap-1">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-11 w-full rounded-md" />
          </div>
          <div className="grid gap-1">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-11 w-full rounded-md" />
          </div>
          <Skeleton className="h-9 w-full self-end rounded-lg md:w-24" />
        </div>
      </div>
    </div>
  );
}

export { HeroFuturisticSkeleton };
