"use client";

import { Search } from "lucide-react";
import * as React from "react";

import { Container, Section } from "@/components/layout";
import { CafeDetail } from "@/features/cafes/components/cafe-detail";
import { CafeDetailSkeleton } from "@/features/cafes/components/cafe-detail-skeleton";
import { CafeErrorState } from "@/features/cafes/components/cafe-error-state";
import { CafeGrid } from "@/features/cafes/components/cafe-grid";
import { CafeLoadingSkeleton } from "@/features/cafes/components/cafe-loading-skeleton";
import { CafePagination } from "@/features/cafes/components/cafe-pagination";
import { useCafe, useCafes } from "@/features/cafes/hooks/use-cafes";
import type { Cafe } from "@/features/cafes/types/cafe";

const PAGE_SIZE = 4;

function CafesView() {
  const [page, setPage] = React.useState(1);
  const [selectedCafeId, setSelectedCafeId] = React.useState<string>();
  const cafesQuery = useCafes({ page, pageSize: PAGE_SIZE });
  // Defaults to the first cafe on the page until one is explicitly picked.
  const activeCafeId = selectedCafeId ?? cafesQuery.data?.cafes[0]?.id;
  const selectedCafeQuery = useCafe(activeCafeId);

  function handleSelectCafe(cafe: Cafe) {
    setSelectedCafeId(cafe.id);
  }

  return (
    <div className="flex flex-1 flex-col">
      <Section className="border-b bg-[linear-gradient(135deg,#f8fafc_0%,var(--background)_46%,#ecfeff_100%)] dark:bg-[linear-gradient(135deg,#111827_0%,var(--background)_46%,#083344_100%)]">
        <Container className="grid gap-6 py-10">
          <div className="max-w-3xl">
            <p className="text-muted-foreground text-sm font-medium">
              Cafe discovery
            </p>
            <h1 className="text-heading-1 mt-2 font-semibold">
              Find a gaming cafe that fits the session.
            </h1>
            <p className="text-body text-muted-foreground mt-4">
              Compare setup quality, seats, crowd energy, games, and amenities
              from a mock cafe catalog ready for backend wiring later.
            </p>
          </div>

          <div className="bg-background flex h-11 max-w-2xl items-center gap-2 rounded-lg border px-3 shadow-sm">
            <Search
              aria-hidden="true"
              className="text-muted-foreground size-4"
            />
            <input
              type="search"
              placeholder="Search will connect in a later phase"
              disabled
              className="placeholder:text-muted-foreground min-w-0 flex-1 bg-transparent text-sm outline-none disabled:cursor-not-allowed"
            />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          {cafesQuery.isLoading ? <CafeLoadingSkeleton /> : null}

          {cafesQuery.isError ? (
            <CafeErrorState
              message={cafesQuery.error.message}
              onRetry={() => void cafesQuery.refetch()}
            />
          ) : null}

          {cafesQuery.data ? (
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_24rem]">
              <div className="grid gap-4">
                <CafeGrid
                  cafes={cafesQuery.data.cafes}
                  selectedCafeId={activeCafeId}
                  onSelectCafe={handleSelectCafe}
                />
                <CafePagination
                  page={cafesQuery.data.page}
                  totalPages={cafesQuery.data.totalPages}
                  totalItems={cafesQuery.data.totalItems}
                  pageSize={cafesQuery.data.pageSize}
                  onPageChange={(nextPage) => {
                    setPage(nextPage);
                    setSelectedCafeId(undefined);
                  }}
                />
              </div>

              {selectedCafeQuery.isLoading ? (
                <CafeDetailSkeleton />
              ) : selectedCafeQuery.data ? (
                <CafeDetail cafe={selectedCafeQuery.data} />
              ) : (
                <div className="bg-card text-muted-foreground rounded-lg border p-6 text-sm">
                  Select a cafe to see details.
                </div>
              )}
            </div>
          ) : null}
        </Container>
      </Section>
    </div>
  );
}

export { CafesView };
