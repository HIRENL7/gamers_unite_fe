import type { Metadata } from "next";
import Link from "next/link";

import { AuthShell } from "@/features/auth/components/auth-shell";
import { ForgotPasswordForm } from "@/lib/lazy/feature-views";
import { createMetadata } from "@/lib/seo/create-metadata";

export const metadata: Metadata = createMetadata({
  title: "Forgot Password",
  description: "Request a password reset link for your Gamers Unite account.",
  path: "/forgot-password",
  noIndex: true,
});

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Forgot password"
      description="Enter your account email and stage a reset link without any backend request."
      footer={
        <Link
          href="/login"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Back to login
        </Link>
      }
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
