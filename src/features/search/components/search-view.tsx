"use client";

import { Loader2, Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

import { Container, Section } from "@/components/layout";
import { SearchBar } from "@/features/search/components/search-bar";
import { SearchFilters } from "@/features/search/components/search-filters";
import { SearchHeading } from "@/features/search/components/search-heading";
import { SearchResultCardSkeleton } from "@/features/search/components/search-result-card-skeleton";
import { SearchResultsList } from "@/features/search/components/search-results-list";
import { SearchSorting } from "@/features/search/components/search-sorting";
import { useDebouncedValue } from "@/features/search/hooks/use-debounced-value";
import { useSearchResults } from "@/features/search/hooks/use-search-results";
import type { SearchFilters as SearchFiltersState } from "@/features/search/types/search";
import {
  searchFiltersFromParams,
  searchFiltersToParams,
} from "@/features/search/utils/search-utils";

const RESULT_SKELETON_COUNT = 5;

function SearchView() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filters, setFilters] = React.useState<SearchFiltersState>(() =>
    searchFiltersFromParams(searchParams),
  );
  const debouncedTerm = useDebouncedValue(filters.term, 350);
  const debouncedLocation = useDebouncedValue(filters.location, 350);
  const queryFilters = React.useMemo(
    () => ({
      ...filters,
      term: debouncedTerm,
      location: debouncedLocation,
    }),
    [
      debouncedLocation,
      debouncedTerm,
      filters.direction,
      filters.minRating,
      filters.sort,
      filters.type,
    ],
  );
  const searchQuery = useSearchResults(queryFilters);
  const results = React.useMemo(
    () =>
      searchQuery.data?.pages.flatMap((page) =>
        Array.isArray(page.results) ? page.results : [],
      ) ?? [],
    [searchQuery.data?.pages],
  );
  const totalItems = searchQuery.data?.pages[0]?.totalItems ?? 0;
  // Typing has not reached the query layer yet, so the visible results are
  // already stale and must not be presented as the answer to the new input.
  const isDebouncePending =
    filters.term !== debouncedTerm || filters.location !== debouncedLocation;
  const isSearching =
    isDebouncePending ||
    searchQuery.isPending ||
    (searchQuery.isFetching && !searchQuery.isFetchingNextPage);

  React.useEffect(() => {
    const params = searchFiltersToParams(queryFilters);
    const queryString = params.toString();
    const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;

    if (searchParams.toString() !== queryString) {
      router.replace(nextUrl, { scroll: false });
    }
  }, [pathname, queryFilters, router, searchParams]);

  const loadMore = React.useCallback(() => {
    if (searchQuery.hasNextPage && !searchQuery.isFetchingNextPage) {
      void searchQuery.fetchNextPage();
    }
  }, [
    searchQuery.fetchNextPage,
    searchQuery.hasNextPage,
    searchQuery.isFetchingNextPage,
  ]);

  return (
    <div className="flex flex-1 flex-col">
      <Section className="border-b bg-[linear-gradient(135deg,#f8fafc_0%,var(--background)_48%,#fef3c7_100%)] dark:bg-[linear-gradient(135deg,#111827_0%,var(--background)_48%,#451a03_100%)]">
        <Container className="grid gap-6 py-10">
          <SearchHeading />

          <SearchBar
            value={filters.term}
            onChange={(term) => setFilters((current) => ({ ...current, term }))}
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid items-start gap-6 lg:grid-cols-[18rem_minmax(0,1fr)]">
            <aside
              aria-label="Search filters"
              className="lg:sticky lg:top-24 lg:max-h-[calc(100dvh-7rem)] lg:overflow-y-auto lg:overscroll-contain"
            >
              <SearchFilters filters={filters} onChange={setFilters} />
            </aside>

            <div className="grid content-start gap-4">
              <SearchSorting filters={filters} onChange={setFilters} />

              <div className="bg-card flex flex-col gap-2 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium">Results</p>
                  <p className="text-muted-foreground text-sm">
                    {isSearching
                      ? "Searching..."
                      : `${totalItems} result${totalItems === 1 ? "" : "s"}`}
                  </p>
                </div>
                {isSearching ? (
                  <span className="text-muted-foreground inline-flex items-center gap-2 text-sm">
                    <Loader2
                      aria-hidden="true"
                      className="size-4 animate-spin"
                    />
                    Updating
                  </span>
                ) : null}
              </div>

              {isSearching ? (
                <div
                  className="grid gap-4"
                  role="status"
                  aria-busy="true"
                  aria-label="Loading search results"
                >
                  {Array.from({ length: RESULT_SKELETON_COUNT }).map(
                    (_, index) => (
                      <SearchResultCardSkeleton key={index} />
                    ),
                  )}
                </div>
              ) : null}

              {searchQuery.isError && !isSearching ? (
                <div className="border-destructive/30 bg-destructive/5 rounded-lg border p-6">
                  <div className="flex items-start gap-3">
                    <Search
                      aria-hidden="true"
                      className="text-destructive mt-0.5 size-5"
                    />
                    <div>
                      <h2 className="font-semibold">Search unavailable</h2>
                      <p className="text-muted-foreground mt-1 text-sm">
                        {searchQuery.error.message}
                      </p>
                    </div>
                  </div>
                </div>
              ) : null}

              {searchQuery.data && !isSearching ? (
                <SearchResultsList
                  results={results}
                  hasNextPage={Boolean(searchQuery.hasNextPage)}
                  isFetchingNextPage={searchQuery.isFetchingNextPage}
                  onLoadMore={loadMore}
                />
              ) : null}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

export { SearchView };
