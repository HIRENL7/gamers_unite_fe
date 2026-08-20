"use client";

import * as React from "react";

import { useRevealOnView } from "@/hooks/use-reveal-on-view";

type RevealVariant = "fade-up" | "fade" | "scale-in";

type RevealStyle = React.CSSProperties & {
  "--reveal-delay"?: string;
};

type RevealProps = React.ComponentProps<"div"> & {
  variant?: RevealVariant;
  delayMs?: number;
};

/**
 * Marks a block for the CSS reveal system and flips it on once it nears the
 * viewport. Only the wrapper is a Client Component, so anything rendered inside
 * stays a Server Component and ships no extra JavaScript.
 */
function Reveal({
  variant = "fade-up",
  delayMs,
  style,
  ...props
}: RevealProps) {
  const { elementRef, isRevealed } = useRevealOnView<HTMLDivElement>();

  const revealStyle: RevealStyle | undefined =
    delayMs === undefined
      ? style
      : { ...style, "--reveal-delay": `${delayMs}ms` };

  return (
    <div
      ref={elementRef}
      data-reveal={variant}
      data-revealed={isRevealed}
      style={revealStyle}
      {...props}
    />
  );
}

export { Reveal, type RevealVariant };
