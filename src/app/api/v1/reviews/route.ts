import { NextResponse } from "next/server";
import { z } from "zod";

import type { Review } from "@/features/reviews/types/review";
import { getInitials } from "@/features/reviews/utils/review-utils";
import { addReview, listReviews } from "@/mocks/store/review-store";
import { paginate, readPagination } from "@/mocks/utils/paginate";

const DEFAULT_PAGE_SIZE = 4;
const FALLBACK_AUTHOR_NAME = "Guest Player";

const createReviewSchema = z.object({
  cafeName: z.string().trim().min(2).max(120),
  gameTitle: z.string().trim().min(2).max(120),
  authorName: z.string().trim().min(2).max(80).optional(),
  rating: z.number().min(1).max(5),
  title: z.string().trim().min(4).max(140),
  comment: z.string().trim().min(20).max(2000),
  category: z.enum(["setup", "staff", "food", "crowd"]).default("setup"),
  tags: z.array(z.string().trim().min(1).max(40)).max(10).default([]),
});

function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const { page, pageSize } = readPagination(searchParams, DEFAULT_PAGE_SIZE);
  const paginated = paginate(listReviews(), page, pageSize);

  return NextResponse.json({
    reviews: paginated.items,
    page: paginated.page,
    pageSize: paginated.pageSize,
    totalItems: paginated.totalItems,
    totalPages: paginated.totalPages,
  });
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Request body must be valid JSON." },
      { status: 400 },
    );
  }

  const parsed = createReviewSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Some review fields are invalid.",
        errors: z.flattenError(parsed.error).fieldErrors,
      },
      { status: 422 },
    );
  }

  const authorName = parsed.data.authorName ?? FALLBACK_AUTHOR_NAME;
  const review: Review = {
    id: `${toSlug(parsed.data.title)}-${crypto.randomUUID().slice(0, 8)}`,
    cafeName: parsed.data.cafeName,
    gameTitle: parsed.data.gameTitle,
    authorName,
    authorInitials: getInitials(authorName),
    rating: parsed.data.rating,
    category: parsed.data.category,
    title: parsed.data.title,
    comment: parsed.data.comment,
    visitedAt: new Date().toISOString().slice(0, 10),
    helpfulCount: 0,
    tags: parsed.data.tags,
  };

  addReview(review);

  return NextResponse.json(review, { status: 201 });
}
