"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { MapPin, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import "./hero-futuristic.css";

const HeroFuturisticScene = dynamic(
  () => import("@/components/ui/hero-futuristic-scene"),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full bg-black" aria-hidden="true" />
    ),
  },
);

interface HeroFuturisticProps {
  className?: string;
  title?: string;
  subtitle?: string;
}

export function HeroFuturistic({
  className,
  title = "Build Your Dreams",
  subtitle = "AI-powered creativity for the next generation.",
}: HeroFuturisticProps) {
  const titleWords = useMemo(() => title.split(" "), [title]);
  const [visibleWords, setVisibleWords] = useState(0);
  const [subtitleVisible, setSubtitleVisible] = useState(false);

  // Deterministic delays avoid hydration drift while keeping staggered glitch timing.
  const delays = useMemo(
    () => titleWords.map((_, index) => ((index * 17) % 7) * 0.01),
    [titleWords],
  );
  const subtitleDelay = useMemo(
    () => ((titleWords.length * 13) % 10) * 0.01,
    [titleWords.length],
  );

  useEffect(() => {
    if (visibleWords < titleWords.length) {
      const timeout = setTimeout(() => {
        setVisibleWords((current) => current + 1);
      }, 600);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => setSubtitleVisible(true), 800);
    return () => clearTimeout(timeout);
  }, [visibleWords, titleWords.length]);

  return (
    <div
      className={cn("hero-futuristic-root relative h-svh bg-black", className)}
    >
      <div className="pointer-events-none absolute z-60 flex h-svh w-full flex-col items-center justify-center px-10 uppercase">
        <div className="text-3xl font-extrabold md:text-5xl xl:text-6xl 2xl:text-7xl">
          <div className="flex space-x-2 overflow-hidden text-white lg:space-x-6">
            {titleWords.map((word, index) => (
              <div
                key={`${word}-${index}`}
                className={index < visibleWords ? "fade-in" : undefined}
                style={{
                  animationDelay: `${index * 0.13 + (delays[index] || 0)}s`,
                  opacity: index < visibleWords ? undefined : 0,
                }}
              >
                {word}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-2 overflow-hidden text-xs font-bold text-white md:text-xl xl:text-2xl 2xl:text-3xl">
          <div
            className={subtitleVisible ? "fade-in-subtitle" : undefined}
            style={{
              animationDelay: `${titleWords.length * 0.13 + 0.2 + subtitleDelay}s`,
              opacity: subtitleVisible ? undefined : 0,
            }}
          >
            {subtitle}
          </div>
        </div>
      </div>

      <form
        action="/search"
        role="search"
        className="hero-search-form animate-enter bg-background grid w-[min(56rem,calc(100%-2rem))] gap-3 rounded-lg border p-3 shadow-sm md:grid-cols-[1fr_1fr_auto]"
        style={{ animationDelay: "2.2s" }}
      >
        <label className="grid gap-1">
          <span className="text-sm font-medium">Search cafes or games</span>
          <span className="bg-background flex h-11 items-center gap-2 rounded-md border px-3">
            <Search
              aria-hidden="true"
              className="text-muted-foreground size-4"
            />
            <input
              name="q"
              type="search"
              placeholder="Try Valorant, console lounge, Koramangala"
              className="placeholder:text-muted-foreground min-w-0 flex-1 bg-transparent text-sm outline-none"
            />
          </span>
        </label>
        <label className="grid gap-1">
          <span className="text-sm font-medium">Location</span>
          <span className="bg-background flex h-11 items-center gap-2 rounded-md border px-3">
            <MapPin
              aria-hidden="true"
              className="text-muted-foreground size-4"
            />
            <input
              name="location"
              type="search"
              placeholder="Neighborhood or city"
              className="placeholder:text-muted-foreground min-w-0 flex-1 bg-transparent text-sm outline-none"
            />
          </span>
        </label>
        <Button className="self-end" size="lg" type="submit">
          Search
        </Button>
      </form>

      <HeroFuturisticScene />
    </div>
  );
}

/** @deprecated Prefer `HeroFuturistic` named export */
export const Html = HeroFuturistic;

export default HeroFuturistic;
