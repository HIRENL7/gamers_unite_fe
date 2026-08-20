import type { Review } from "@/features/reviews/types/review";
import { mockReviews } from "@/mocks/fixtures/reviews";

/**
 * Reviews created through the mock API live in module scope, so they survive
 * for the lifetime of the server process but reset on restart. Swapping
 * NEXT_PUBLIC_API_BASE_URL back to the real backend replaces this entirely.
 */
const createdReviews: Review[] = [];

export function listReviews(): Review[] {
  return [...createdReviews, ...mockReviews];
}

export function addReview(review: Review): Review {
  createdReviews.unshift(review);

  return review;
}
