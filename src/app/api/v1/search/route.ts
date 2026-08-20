import { NextResponse } from "next/server";

import {
  parseMinRating,
  parseSearchDirection,
  parseSearchSort,
  parseSearchType,
} from "@/features/search/utils/search-utils";
import { simulateNetworkLatency } from "@/mocks/utils/latency";
import { paginate, readPagination } from "@/mocks/utils/paginate";
import {
  buildSearchResults,
  filterSearchResults,
  sortSearchResults,
} from "@/mocks/utils/search";

const DEFAULT_PAGE_SIZE = 5;

export async function GET(request: Request) {
  await simulateNetworkLatency();

  const { searchParams } = new URL(request.url);
  const term = searchParams.get("term") ?? "";
  const location = searchParams.get("location") ?? "";
  const type = parseSearchType(searchParams.get("type"));
  const sort = parseSearchSort(searchParams.get("sort"));
  const direction = parseSearchDirection(searchParams.get("direction"));
  const minRating = parseMinRating(searchParams.get("minRating"));
  const { page, pageSize } = readPagination(searchParams, DEFAULT_PAGE_SIZE);

  const matches = filterSearchResults(buildSearchResults(type), {
    term,
    location,
    minRating,
  });
  const sorted = sortSearchResults(matches, { term, sort, direction });
  const paginated = paginate(sorted, page, pageSize);

  return NextResponse.json({
    results: paginated.items,
    page: paginated.page,
    pageSize: paginated.pageSize,
    totalItems: paginated.totalItems,
    totalPages: paginated.totalPages,
  });
}
