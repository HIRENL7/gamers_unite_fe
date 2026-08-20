import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles } from "lucide-react";

import { Container, Section } from "@/components/layout";
import { buttonVariants } from "@/components/ui/button";
import { createMetadata } from "@/lib/seo/create-metadata";
import { JsonLd, createBreadcrumbJsonLd } from "@/lib/seo/json-ld";

export const metadata: Metadata = createMetadata({
  title: "Membership",
  description:
    "Join Gamers Unite membership for cafe perks, community access, and upcoming member-only sessions. Coming soon.",
  path: "/membership",
  keywords: ["gaming membership", "cafe perks", "player community"],
});

export default function MembershipPage() {
  return (
    <Section>
      <JsonLd
        data={createBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Membership", path: "/membership" },
        ])}
      />
      <Container className="grid max-w-2xl gap-6 py-16">
        <div className="inline-flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Sparkles aria-hidden="true" className="size-6" />
        </div>
        <h1 className="text-heading-1 font-semibold">Membership</h1>
        <p className="text-body text-muted-foreground">
          Membership tiers with booking perks and community events are coming in
          a future phase. Explore cafes and reviews while we build it.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/cafes" className={buttonVariants()}>
            Explore cafes
          </Link>
          <Link
            href="/reviews"
            className={buttonVariants({ variant: "outline" })}
          >
            Read reviews
          </Link>
        </div>
      </Container>
    </Section>
  );
}
