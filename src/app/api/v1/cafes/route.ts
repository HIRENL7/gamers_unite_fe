import { NextResponse } from "next/server";

import { mockCafes } from "@/mocks/fixtures/cafes";
import { paginate, readPagination } from "@/mocks/utils/paginate";

const DEFAULT_PAGE_SIZE = 6;

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const { page, pageSize } = readPagination(searchParams, DEFAULT_PAGE_SIZE);
  const paginated = paginate(mockCafes, page, pageSize);

  return NextResponse.json({
    cafes: paginated.items,
    page: paginated.page,
    pageSize: paginated.pageSize,
    totalItems: paginated.totalItems,
    totalPages: paginated.totalPages,
  });
}
