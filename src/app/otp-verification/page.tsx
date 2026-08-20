import type { Metadata } from "next";
import Link from "next/link";

import { AuthShell } from "@/features/auth/components/auth-shell";
import { OtpVerificationForm } from "@/lib/lazy/feature-views";
import { createMetadata } from "@/lib/seo/create-metadata";

export const metadata: Metadata = createMetadata({
  title: "Verify OTP",
  description: "Enter your one-time password to finish signing in to Gamers Unite.",
  path: "/otp-verification",
  noIndex: true,
});

export default function OtpVerificationPage() {
  return (
    <AuthShell
      title="OTP verification"
      description="Enter a 6 digit code to complete the mock verification step."
      footer={
        <Link
          href="/login"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Use another account
        </Link>
      }
    >
      <OtpVerificationForm />
    </AuthShell>
  );
}
