"use client";

import { ChevronRight, Gamepad2, MapPin, Star, type LucideIcon } from "lucide-react";
import Link from "next/link";
import type { ComponentProps } from "react";

import { FlickeringGrid } from "@/components/ui/flickering-grid";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

interface FlickeringFooterLink {
  id: string;
  title: string;
  url: string;
}

interface FlickeringFooterColumn {
  title: string;
  links: FlickeringFooterLink[];
}

interface FlickeringFooterHighlight {
  label: string;
  icon: LucideIcon;
}

interface FlickeringFooterProps extends ComponentProps<"footer"> {
  brand?: string;
  description?: string;
  columns?: FlickeringFooterColumn[];
  highlights?: FlickeringFooterHighlight[];
  gridText?: string;
  compactGridText?: string;
}

const defaultColumns: FlickeringFooterColumn[] = [
  {
    title: "Discover",
    links: [
      { id: "cafes", title: "Cafes", url: "/cafes" },
      { id: "games", title: "Games", url: "/games" },
      { id: "reviews", title: "Reviews", url: "/reviews" },
    ],
  },
  {
    title: "Players",
    links: [
      { id: "search", title: "Search", url: "/search" },
      { id: "membership", title: "Membership", url: "/membership" },
    ],
  },
  {
    title: "Account",
    links: [
      { id: "login", title: "Log in", url: "/login" },
      { id: "register", title: "Sign up", url: "/register" },
    ],
  },
];

const defaultHighlights: FlickeringFooterHighlight[] = [
  { label: "Cafe discovery", icon: MapPin },
  { label: "Game catalogs", icon: Gamepad2 },
  { label: "Player reviews", icon: Star },
];

function FlickeringFooter({
  brand = "Gamers Unite",
  description = "Discover gaming cafes, compare prices, browse games, and read trusted player reviews.",
  columns = defaultColumns,
  highlights = defaultHighlights,
  gridText = "Find your next place to play",
  compactGridText = "Gamers Unite",
  className,
  ...props
}: FlickeringFooterProps) {
  const isCompact = useMediaQuery("(max-width: 1024px)");

  return (
    <footer
      id="footer"
      data-slot="footer"
      className={cn("w-full overflow-hidden border-t bg-background pb-0", className)}
      {...props}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-(--spacing-page) py-10 md:flex-row md:items-start md:justify-between">
        <div className="mx-0 flex max-w-xs flex-col items-start justify-start gap-y-5">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <Gamepad2 className="size-8 text-primary" aria-hidden="true" />
            <p className="text-xl font-semibold text-primary">{brand}</p>
          </Link>
          <p className="font-medium tracking-tight text-muted-foreground">
            {description}
          </p>
          <ul className="flex flex-wrap items-center gap-2">
            {highlights.map((highlight) => {
              const Icon = highlight.icon;

              return (
                <li
                  key={highlight.label}
                  className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur-sm"
                >
                  <Icon className="size-3.5" aria-hidden="true" />
                  {highlight.label}
                </li>
              );
            })}
          </ul>
        </div>

        <nav className="pt-5 md:w-1/2 md:pt-0" aria-label="Footer">
          <div className="flex flex-col items-start justify-start gap-y-8 md:flex-row md:items-start md:justify-between md:gap-y-5 lg:pl-10">
            {columns.map((column) => (
              <ul key={column.title} className="flex flex-col gap-y-2">
                <li className="mb-2 text-sm font-semibold text-primary">
                  {column.title}
                </li>
                {column.links.map((link) => (
                  <li
                    key={link.id}
                    className="group inline-flex items-center justify-start gap-1 text-[15px]/snug text-muted-foreground"
                  >
                    <Link
                      href={link.url}
                      className="rounded-sm outline-none transition-colors hover:text-foreground focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    >
                      {link.title}
                    </Link>
                    <span className="flex size-4 translate-x-0 items-center justify-center rounded border border-border opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100 group-focus-within:translate-x-1 group-focus-within:opacity-100">
                      <ChevronRight className="size-3" aria-hidden="true" />
                    </span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </nav>
      </div>

      <div className="relative z-0 mt-3 h-48 w-full m md:h-64">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-transparent from-40% to-background" />
        <div className="absolute inset-0 ">
          <FlickeringGrid
            text={isCompact ? compactGridText : gridText}
            fontSize={isCompact ? 70 : 90}
            className="h-full w-full"
            squareSize={2}
            gridGap={isCompact ? 2 : 3}
            color="var(--muted-foreground)"
            maxOpacity={0.3}
            flickerChance={0.1}
          />
        </div>
      </div>
    </footer>
  );
}

export {
  FlickeringFooter,
  type FlickeringFooterColumn,
  type FlickeringFooterHighlight,
  type FlickeringFooterLink,
  type FlickeringFooterProps,
};
