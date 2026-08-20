import type { Metadata } from "next";
import { Suspense } from "react";

import { SearchViewSkeleton } from "@/features/search/components/search-view-skeleton";
import { SearchView } from "@/lib/lazy/feature-views";
import { createMetadata } from "@/lib/seo/create-metadata";
import { JsonLd, createBreadcrumbJsonLd } from "@/lib/seo/json-ld";

export const metadata: Metadata = createMetadata({
  title: "Search Cafes, Games, and Reviews",
  description:
    "Search gaming cafes, games, and player reviews by location, rating, and category.",
  path: "/search",
  keywords: ["gaming cafe search", "game cafe filters"],
});

export default function SearchPage() {
  return (
    <>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Search", path: "/search" },
        ])}
      />
      <Suspense fallback={<SearchViewSkeleton />}>
        <SearchView />
      </Suspense>
    </>
  );
}
