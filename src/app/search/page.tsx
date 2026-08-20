import type { Metadata } from "next";
import { Suspense } from "react";

import { SearchViewSkeleton } from "@/features/search/components/search-view-skeleton";
import { SearchView } from "@/lib/lazy/feature-views";
import { createMetadata } from "@/lib/seo/create-metadata";

export const metadata: Metadata = createMetadata({
  title: "Search",
  description:
    "Search mock gaming cafes, games, and reviews with filters, sorting, and infinite scrolling.",
  path: "/search",
  keywords: ["gaming cafe search", "game cafe filters"],
});

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchViewSkeleton />}>
      <SearchView />
    </Suspense>
  );
}
