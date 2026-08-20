import type { Metadata } from "next";

import { CafesView } from "@/lib/lazy/feature-views";
import { createMetadata } from "@/lib/seo/create-metadata";
import { JsonLd, createBreadcrumbJsonLd } from "@/lib/seo/json-ld";

export const metadata: Metadata = createMetadata({
  title: "Browse Gaming Cafes",
  description:
    "Browse gaming cafes, compare prices, amenities, games, and seat availability to find your next session.",
  path: "/cafes",
  keywords: ["gaming cafe listings", "gaming cafe availability"],
});

export default function CafesPage() {
  return (
    <>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Cafes", path: "/cafes" },
        ])}
      />
      <CafesView />
    </>
  );
}
