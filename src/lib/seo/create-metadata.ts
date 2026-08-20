import type { Metadata } from "next";

import { siteConfig } from "@/lib/seo/site-config";

interface CreateMetadataOptions {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
  absoluteTitle?: boolean;
}

function formatSocialTitle(title: string, absoluteTitle: boolean) {
  if (absoluteTitle || title === siteConfig.name) {
    return title;
  }

  return `${title} | ${siteConfig.name}`;
}

function createMetadata({
  title,
  description,
  path,
  keywords = [],
  noIndex = false,
  absoluteTitle = false,
}: CreateMetadataOptions): Metadata {
  const canonicalUrl = path
    ? new URL(path, siteConfig.url).toString()
    : undefined;
  const socialTitle = formatSocialTitle(title, absoluteTitle);
  const mergedKeywords = [...siteConfig.keywords, ...keywords];
  const socialImage = {
    url: "/opengraph-image",
    width: 1200,
    height: 630,
    alt: siteConfig.name,
  };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords: mergedKeywords,
    ...(canonicalUrl
      ? {
          alternates: {
            canonical: canonicalUrl,
          },
        }
      : {}),
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: socialTitle,
      description,
      ...(canonicalUrl ? { url: canonicalUrl } : {}),
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [socialImage.url],
    },
  };
}

export { createMetadata };
