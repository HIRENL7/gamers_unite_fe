import dynamic from "next/dynamic";

import { Skeleton } from "@/components/ui/skeleton";
import { CafesViewSkeleton } from "@/features/cafes/components/cafes-view-skeleton";
import { ReviewsViewSkeleton } from "@/features/reviews/components/reviews-view-skeleton";
import { SearchViewSkeleton } from "@/features/search/components/search-view-skeleton";

const CafesView = dynamic(
  () =>
    import("@/features/cafes/components/cafes-view").then((module) => ({
      default: module.CafesView,
    })),
  { loading: () => <CafesViewSkeleton /> },
);

const SearchView = dynamic(
  () =>
    import("@/features/search/components/search-view").then((module) => ({
      default: module.SearchView,
    })),
  { loading: () => <SearchViewSkeleton /> },
);

const ReviewsView = dynamic(
  () =>
    import("@/features/reviews/components/reviews-view").then((module) => ({
      default: module.ReviewsView,
    })),
  { loading: () => <ReviewsViewSkeleton /> },
);

const LoginForm = dynamic(
  () =>
    import("@/features/auth/components/login-form").then((module) => ({
      default: module.LoginForm,
    })),
  { loading: () => <AuthFormSkeleton /> },
);

const RegisterForm = dynamic(
  () =>
    import("@/features/auth/components/register-form").then((module) => ({
      default: module.RegisterForm,
    })),
  { loading: () => <AuthFormSkeleton /> },
);

const ForgotPasswordForm = dynamic(
  () =>
    import("@/features/auth/components/forgot-password-form").then(
      (module) => ({
        default: module.ForgotPasswordForm,
      }),
    ),
  { loading: () => <AuthFormSkeleton /> },
);

const ResetPasswordForm = dynamic(
  () =>
    import("@/features/auth/components/reset-password-form").then((module) => ({
      default: module.ResetPasswordForm,
    })),
  { loading: () => <AuthFormSkeleton /> },
);

const OtpVerificationForm = dynamic(
  () =>
    import("@/features/auth/components/otp-verification-form").then(
      (module) => ({
        default: module.OtpVerificationForm,
      }),
    ),
  { loading: () => <AuthFormSkeleton /> },
);

function AuthFormSkeleton() {
  return (
    <div className="grid gap-4" aria-label="Loading form">
      <div className="grid gap-2">
        <Skeleton className="h-5 w-12" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
      <div className="grid gap-2">
        <Skeleton className="h-5 w-16" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
      <div className="grid gap-2">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-10 w-full rounded-md" />
      </div>
      <Skeleton className="h-8 w-full rounded-lg" />
    </div>
  );
}

export {
  CafesView,
  ForgotPasswordForm,
  LoginForm,
  OtpVerificationForm,
  RegisterForm,
  ResetPasswordForm,
  ReviewsView,
  SearchView,
};
