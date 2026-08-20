import type { Metadata } from "next";
import Link from "next/link";

import { AuthShell } from "@/features/auth/components/auth-shell";
import { RegisterForm } from "@/lib/lazy/feature-views";
import { createMetadata } from "@/lib/seo/create-metadata";

export const metadata: Metadata = createMetadata({
  title: "Create Account",
  description: "Create a Gamers Unite account to join the player community.",
  path: "/register",
  noIndex: true,
});

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create account"
      description="Join the player community with an accessible mock registration flow."
      footer={
        <>
          Already registered?{" "}
          <Link
            href="/login"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Log in
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}
