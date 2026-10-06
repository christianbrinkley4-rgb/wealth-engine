import type { Metadata } from "next";

import { SITE_OWNER, SITE_URL } from "@/lib/seo";
import { WEALTH_BRAND } from "@/lib/wealth/site";

const SHARE_IMAGE = {
  url: "/wealth/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${WEALTH_BRAND}: free money tools from ${SITE_OWNER}`,
};

/**
 * Metadata for a hub page. Titles are absolute so they carry the hub's name
 * instead of the Medicare site's title template.
 */
export function wealthMetadata(input: { title: string; description: string; path: string }): Metadata {
  const title = `${input.title} | ${WEALTH_BRAND}`;
  return {
    title: { absolute: title },
    description: input.description,
    alternates: { canonical: input.path },
    openGraph: {
      type: "website",
      siteName: WEALTH_BRAND,
      locale: "en_US",
      title,
      description: input.description,
      url: input.path,
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: input.description,
      images: [SHARE_IMAGE.url],
    },
  };
}

/** Calculators and quizzes are free web apps, and can say so. */
export function webAppJsonLd(input: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: input.name,
    description: input.description,
    url: `${SITE_URL}${input.path}`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    author: { "@id": `${SITE_URL}/#christian` },
    inLanguage: "en-US",
  };
}
