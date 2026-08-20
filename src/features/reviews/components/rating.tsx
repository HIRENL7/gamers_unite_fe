"use client";

import { Star } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type RatingProps = {
  value: number;
  label?: string;
  onChange?: (value: number) => void;
  error?: string;
};

function Rating({ value, label = "Rating", onChange, error }: RatingProps) {
  const isInteractive = Boolean(onChange);
  const roundedValue = Math.round(value);
  const generatedId = React.useId();
  const errorId = `${generatedId}-error`;

  return (
    <div className="grid min-w-0 gap-2">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-muted-foreground">
          {value > 0 ? value.toFixed(1) : "Not rated"}
        </span>
      </div>

      <div
        className={cn(
          "flex flex-wrap items-center",
          isInteractive ? "-ml-2 gap-0.5" : "gap-1",
        )}
        role={isInteractive ? "radiogroup" : "img"}
        aria-label={`${label}: ${value > 0 ? `${value} out of 5` : "not rated"}`}
        aria-describedby={error ? errorId : undefined}
      >
        {Array.from({ length: 5 }).map((_, index) => {
          const starValue = index + 1;
          const isActive = starValue <= roundedValue;

          if (isInteractive) {
            return (
              <Button
                key={starValue}
                type="button"
                variant="ghost"
                size="icon"
                role="radio"
                aria-checked={value === starValue}
                aria-label={`${starValue} star${starValue === 1 ? "" : "s"}`}
                className="size-10 text-amber-500"
                onClick={() => onChange?.(starValue)}
              >
                <Star
                  aria-hidden="true"
                  className={cn("size-5", isActive && "fill-current")}
                />
              </Button>
            );
          }

          return (
            <Star
              key={starValue}
              aria-hidden="true"
              className={cn("size-4 text-amber-500", isActive && "fill-current")}
            />
          );
        })}
      </div>

      {error ? (
        <p id={errorId} className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export { Rating };
