import type { Metadata } from "next";

import { articleJsonLd, SITE_OWNER, SITE_URL } from "@/lib/seo";
import { WEALTH_BRAND } from "@/lib/wealth/site";

const SHARE_IMAGE = {
  url: "/wealth/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${WEALTH_BRAND}: free money tools from ${SITE_OWNER}`,
};

/** Keep article imagery and authorship within the education hub. */
export function wealthArticleJsonLd(input: Parameters<typeof articleJsonLd>[0]) {
  const article = articleJsonLd({
    ...input,
    speakableSelectors: input.speakableSelectors ?? ["h1", ".w-lede"],
  });
  return {
    ...article,
    image: `${SITE_URL}${SHARE_IMAGE.url}`,
    author: { ...article.author, url: `${SITE_URL}/wealth/journey` },
    publisher: { "@type": "Person", "@id": `${SITE_URL}/#christian`, name: SITE_OWNER },
    isPartOf: { "@id": `${SITE_URL}/wealth#hub` },
  };
}

/**
 * Metadata for a hub page. Titles are absolute so they carry the hub's name
 * instead of the Medicare site's title template.
 */
export function wealthMetadata(input: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const title = `${input.title} | ${WEALTH_BRAND}`;
  return {
    title: { absolute: title },
    description: input.description,
    applicationName: WEALTH_BRAND,
    authors: [{ name: SITE_OWNER, url: `${SITE_URL}/wealth/journey` }],
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
    "@id": `${SITE_URL}${input.path}#app`,
    name: input.name,
    description: input.description,
    url: `${SITE_URL}${input.path}`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    author: { "@id": `${SITE_URL}/#christian` },
    isPartOf: { "@id": `${SITE_URL}/wealth#hub` },
    inLanguage: "en-US",
  };
}

export function wealthHubJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/wealth#hub`,
    url: `${SITE_URL}/wealth`,
    name: WEALTH_BRAND,
    description: "Free money calculators, quizzes and guides for people in their 20s and 30s.",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    publisher: { "@id": `${SITE_URL}/#christian` },
    inLanguage: "en-US",
  };
}
