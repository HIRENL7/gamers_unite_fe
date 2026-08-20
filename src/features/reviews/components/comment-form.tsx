"use client";

import { Send } from "lucide-react";
import * as React from "react";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Rating } from "@/features/reviews/components/rating";
import { createReview } from "@/features/reviews/services/review-service";
import { validateReviewForm } from "@/features/reviews/schemas/review.schema";
import type {
  ReviewFormErrors,
  ReviewFormValues,
} from "@/features/reviews/types/review";
import { queryKeys } from "@/services/query/keys";
import { ApiError } from "@/services/axios/error";
import { useAuthStore } from "@/store/auth-store";

const initialFormValues: ReviewFormValues = {
  cafeName: "",
  gameTitle: "",
  authorName: "",
  rating: 0,
  title: "",
  comment: "",
};

function CommentForm() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [values, setValues] = React.useState(initialFormValues);
  const [errors, setErrors] = React.useState<ReviewFormErrors>({});
  const [status, setStatus] = React.useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (user?.name) {
      setValues((current) => ({ ...current, authorName: user.name }));
    }
  }, [user?.name]);

  function updateField<TKey extends keyof ReviewFormValues>(
    key: TKey,
    value: ReviewFormValues[TKey],
  ) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setStatus(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isAuthenticated) {
      setStatus("Log in to publish a review.");
      return;
    }

    const validation = validateReviewForm(values);

    if (!validation.isValid) {
      setErrors(validation.errors);
      setStatus("Please fix the highlighted fields.");
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await createReview(values);
      await queryClient.invalidateQueries({ queryKey: queryKeys.reviews.lists() });
      setStatus(`Review published for ${values.cafeName.trim()}.`);
      setValues({
        ...initialFormValues,
        authorName: user?.name ?? "",
      });
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Unable to publish your review right now.";
      setStatus(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="animate-fade-in rounded-lg">
      <CardHeader>
        <CardTitle>Write a review</CardTitle>
        <p className="text-sm text-muted-foreground">
          {isAuthenticated
            ? "Share your cafe experience with the community."
            : "Log in to publish a review to the live API."}
        </p>
      </CardHeader>
      <CardContent>
        <form
          className="@container flex flex-col gap-4"
          noValidate
          onSubmit={handleSubmit}
        >
          <div className="grid items-start gap-4 @md:grid-cols-2">
            <Field
              id="review-cafe"
              label="Cafe"
              placeholder="Hyperfrag Arena"
              value={values.cafeName}
              error={errors.cafeName}
              onChange={(value) => updateField("cafeName", value)}
            />
            <Field
              id="review-game"
              label="Game"
              placeholder="Valorant"
              value={values.gameTitle}
              error={errors.gameTitle}
              onChange={(value) => updateField("gameTitle", value)}
            />
          </div>

          <Field
            id="review-author"
            label="Your name"
            placeholder="Player name"
            value={values.authorName}
            error={errors.authorName}
            onChange={(value) => updateField("authorName", value)}
          />

          <Rating
            value={values.rating}
            label="Your rating"
            error={errors.rating}
            onChange={(rating) => updateField("rating", rating)}
          />

          <Field
            id="review-title"
            label="Title"
            placeholder="Summarise your visit"
            value={values.title}
            error={errors.title}
            onChange={(value) => updateField("title", value)}
          />

          <div className="grid gap-2">
            <label className="text-sm font-medium" htmlFor="review-comment">
              Comment
            </label>
            <Textarea
              id="review-comment"
              value={values.comment}
              aria-invalid={Boolean(errors.comment)}
              aria-describedby={
                errors.comment ? "review-comment-error" : undefined
              }
              onChange={(event) => updateField("comment", event.target.value)}
              rows={5}
              placeholder="Share setup quality, staff notes, food, crowd level, or anything players should know."
            />
            {errors.comment ? (
              <span
                id="review-comment-error"
                className="text-sm text-destructive"
                role="alert"
              >
                {errors.comment}
              </span>
            ) : null}
          </div>

          <div className="flex flex-col gap-3 border-t pt-4 @sm:flex-row @sm:items-center @sm:justify-between">
            <p
              className="min-w-0 text-pretty text-sm text-muted-foreground"
              role="status"
              aria-live="polite"
            >
              {status ?? "Required fields are validated before publishing."}
            </p>
            <Button
              type="submit"
              size="lg"
              className="w-full @sm:w-auto @sm:shrink-0"
              disabled={isSubmitting}
            >
              <Send aria-hidden="true" />
              {isSubmitting ? "Publishing..." : "Publish review"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function Field({
  error,
  id,
  label,
  onChange,
  placeholder,
  value,
}: {
  error?: string;
  id: string;
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
}) {
  const errorId = `${id}-error`;

  return (
    <div className="grid min-w-0 gap-2">
      <label className="text-sm font-medium" htmlFor={id}>
        {label}
      </label>
      <Input
        id={id}
        value={value}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
      />
      {error ? (
        <span id={errorId} className="text-sm text-destructive" role="alert">
          {error}
        </span>
      ) : null}
    </div>
  );
}

export { CommentForm };
