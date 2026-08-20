import type { Cafe } from "@/features/cafes/types/cafe";
import type { Review } from "@/features/reviews/types/review";
import type {
  SearchResult,
  SearchSort,
  SearchSortDirection,
  SearchTypeFilter,
} from "@/features/search/types/search";
import { mockCafes } from "@/mocks/fixtures/cafes";
import { mockGames, type MockGame } from "@/mocks/fixtures/games";
import { listReviews } from "@/mocks/store/review-store";

function toCafeResult(cafe: Cafe): SearchResult {
  return {
    id: cafe.id,
    type: "cafe",
    title: cafe.name,
    subtitle: `${cafe.neighborhood}, ${cafe.city}`,
    description: cafe.description,
    rating: cafe.rating,
    location: cafe.neighborhood,
    tags: [...cafe.featuredGames, ...cafe.amenities],
    popularity: Math.round(cafe.rating * 20),
  };
}

function toGameResult(game: MockGame): SearchResult {
  return {
    id: game.id,
    type: "game",
    title: game.title,
    subtitle: game.subtitle,
    description: game.description,
    rating: game.rating,
    tags: game.tags,
    popularity: game.popularity,
  };
}

function toReviewResult(review: Review): SearchResult {
  return {
    id: review.id,
    type: "review",
    title: review.title,
    subtitle: `Review for ${review.cafeName}`,
    description: review.comment,
    rating: review.rating,
    location: review.cafeName,
    tags: review.tags,
    popularity: review.helpfulCount,
  };
}

export function buildSearchResults(type: SearchTypeFilter): SearchResult[] {
  const includesType = (candidate: SearchTypeFilter) =>
    type === "all" || type === candidate;

  return [
    ...(includesType("cafe") ? mockCafes.map(toCafeResult) : []),
    ...(includesType("game") ? mockGames.map(toGameResult) : []),
    ...(includesType("review") ? listReviews().map(toReviewResult) : []),
  ];
}

function getHaystack(result: SearchResult) {
  return [
    result.title,
    result.subtitle,
    result.description,
    result.location,
    ...result.tags,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

export function filterSearchResults(
  results: SearchResult[],
  filters: { term: string; location: string; minRating: number | null },
) {
  const normalizedTerm = filters.term.toLowerCase().trim();
  const normalizedLocation = filters.location.toLowerCase().trim();

  return results.filter((result) => {
    const matchesTerm = normalizedTerm
      ? getHaystack(result).includes(normalizedTerm)
      : true;
    const matchesLocation = normalizedLocation
      ? Boolean(result.location?.toLowerCase().includes(normalizedLocation))
      : true;
    const matchesRating =
      filters.minRating === null ? true : result.rating >= filters.minRating;

    return matchesTerm && matchesLocation && matchesRating;
  });
}

function getRelevanceScore(result: SearchResult, term: string) {
  const normalizedTerm = term.toLowerCase().trim();

  if (!normalizedTerm) {
    return result.popularity;
  }

  if (result.title.toLowerCase().includes(normalizedTerm)) {
    return 100 + result.popularity;
  }

  return getHaystack(result).includes(normalizedTerm)
    ? 50 + result.popularity
    : 0;
}

export function sortSearchResults(
  results: SearchResult[],
  options: {
    term: string;
    sort: SearchSort;
    direction: SearchSortDirection;
  },
) {
  const modifier = options.direction === "asc" ? 1 : -1;

  return [...results].sort((left, right) => {
    if (options.sort === "name") {
      return left.title.localeCompare(right.title) * modifier;
    }

    if (options.sort === "rating") {
      return (left.rating - right.rating) * modifier;
    }

    if (options.sort === "popularity") {
      return (left.popularity - right.popularity) * modifier;
    }

    return (
      (getRelevanceScore(left, options.term) -
        getRelevanceScore(right, options.term)) *
      modifier
    );
  });
}
