import type { Metadata } from "next";

import { ReviewsView } from "@/lib/lazy/feature-views";
import { createMetadata } from "@/lib/seo/create-metadata";
import { JsonLd, createBreadcrumbJsonLd } from "@/lib/seo/json-ld";

export const metadata: Metadata = createMetadata({
  title: "Player Reviews",
  description:
    "Read player reviews of gaming cafes, including setup quality, crowd, and session experience.",
  path: "/reviews",
  keywords: ["player reviews", "gaming cafe reviews"],
});

export default function ReviewsPage() {
  return (
    <>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Reviews", path: "/reviews" },
        ])}
      />
      <ReviewsView />
    </>
  );
}
