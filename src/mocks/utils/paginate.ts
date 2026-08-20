import { clampPage } from "@/lib/utils";

const MAX_PAGE_SIZE = 50;

export interface PaginatedItems<TItem> {
  items: TItem[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

function readPositiveInteger(
  value: string | null,
  fallback: number,
  max: number,
) {
  const parsed = Number(value);

  if (!Number.isFinite(parsed) || parsed < 1) {
    return fallback;
  }

  return Math.min(Math.floor(parsed), max);
}

export function readPagination(
  searchParams: URLSearchParams,
  fallbackPageSize: number,
) {
  return {
    page: readPositiveInteger(
      searchParams.get("page"),
      1,
      Number.MAX_SAFE_INTEGER,
    ),
    pageSize: readPositiveInteger(
      searchParams.get("pageSize"),
      fallbackPageSize,
      MAX_PAGE_SIZE,
    ),
  };
}

export function paginate<TItem>(
  items: TItem[],
  page: number,
  pageSize: number,
): PaginatedItems<TItem> {
  const totalItems = items.length;
  const totalPages = Math.max(Math.ceil(totalItems / pageSize), 1);
  const safePage = clampPage(page, totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    page: safePage,
    pageSize,
    totalItems,
    totalPages,
  };
}
