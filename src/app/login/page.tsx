import type { Metadata } from "next";
import Link from "next/link";

import { AuthShell } from "@/features/auth/components/auth-shell";
import { LoginForm } from "@/lib/lazy/feature-views";
import { createMetadata } from "@/lib/seo/create-metadata";

export const metadata: Metadata = createMetadata({
  title: "Log In",
  description: "Log in to your Gamers Unite account.",
  path: "/login",
  noIndex: true,
});

export default function LoginPage() {
  return (
    <AuthShell
      title="Log in"
      description="Access your mock Gamers Unite account. This screen validates locally and does not call a backend."
      footer={
        <>
          New here?{" "}
          <Link
            href="/register"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Create an account
          </Link>
        </>
      }
    >
      <LoginForm />
    </AuthShell>
  );
}
