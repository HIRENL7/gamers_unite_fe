"use client";

import * as React from "react";

type UseRevealOnViewOptions = {
  rootMargin?: string;
  threshold?: number;
};

/**
 * Reveals an element the first time it approaches the viewport, then stops
 * observing. One observer per revealed block keeps this far cheaper than a
 * scroll listener, and the state never flips back so content cannot disappear.
 */
export function useRevealOnView<TElement extends HTMLElement>({
  rootMargin = "0px 0px -10% 0px",
  threshold = 0,
}: UseRevealOnViewOptions = {}) {
  const elementRef = React.useRef<TElement | null>(null);
  const [isRevealed, setIsRevealed] = React.useState(false);

  React.useEffect(() => {
    const element = elementRef.current;

    if (!element || isRevealed) {
      return;
    }

    // Without observer support (older engines, test environments) nothing could
    // ever reveal the element, so show it on the next tick instead.
    if (typeof IntersectionObserver === "undefined") {
      const timeoutId = globalThis.setTimeout(() => setIsRevealed(true), 0);

      return () => {
        globalThis.clearTimeout(timeoutId);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries.some(
          (entry) =>
            // Restored scroll positions can leave a block above the viewport,
            // where it would never intersect again.
            entry.isIntersecting || entry.boundingClientRect.bottom < 0,
        );

        if (isVisible) {
          setIsRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [isRevealed, rootMargin, threshold]);

  return { elementRef, isRevealed };
}
