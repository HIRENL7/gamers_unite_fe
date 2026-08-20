import * as React from "react";

import {
  FlickeringFooter,
  type FlickeringFooterColumn,
} from "@/components/ui/flickering-footer";
import { siteConfig } from "@/lib/seo/site-config";

type FooterLink = {
  label: string;
  href: string;
};

type FooterProps = React.ComponentProps<"footer"> & {
  links?: FooterLink[];
};

function toFooterColumns(links: FooterLink[]): FlickeringFooterColumn[] {
  return [
    {
      title: "Explore",
      links: links.map((link) => ({
        id: link.href,
        title: link.label,
        url: link.href,
      })),
    },
  ];
}

function Footer({ links, className, ...props }: FooterProps) {
  return (
    <FlickeringFooter
      brand={siteConfig.name}
      description={siteConfig.description}
      columns={links ? toFooterColumns(links) : undefined}
      gridText={siteConfig.tagline}
      compactGridText={siteConfig.name}
      className={className}
      {...props}
    />
  );
}

export { Footer, type FooterLink };
