"use client";

import * as React from "react";

import { useRevealOnView } from "@/hooks/use-reveal-on-view";

type RevealGroupProps = React.ComponentProps<"div">;

/**
 * Reveals direct children one after another. The stagger is expressed with
 * `nth-child` delays in CSS, so a grid of any size costs a single observer and
 * no per-item state.
 */
function RevealGroup(props: RevealGroupProps) {
  const { elementRef, isRevealed } = useRevealOnView<HTMLDivElement>();

  return (
    <div
      ref={elementRef}
      data-reveal-group="true"
      data-revealed={isRevealed}
      {...props}
    />
  );
}

export { RevealGroup };
