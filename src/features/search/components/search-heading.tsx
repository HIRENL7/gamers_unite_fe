function SearchHeading() {
  return (
    <div className="max-w-3xl">
      <p className="text-muted-foreground text-sm font-medium">Search</p>
      <h1 className="text-heading-1 mt-2 font-semibold">
        Search cafes, games, and reviews.
      </h1>
      <p className="text-body text-muted-foreground mt-4">
        Use debounced search, filters, sorting, and infinite loading
        against mock data wired through TanStack Query.
      </p>
    </div>
  );
}

export { SearchHeading };
