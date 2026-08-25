/**
 * Single source of truth for site-wide SEO constants. Imported by metadata
 * builders, JSON-LD blocks, sitemap, and robots.
 */

import type { Metadata } from "next";

import { AGENT } from "@/lib/agent";

const FALLBACK_SITE_URL = "https://wealth-engine.app";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || FALLBACK_SITE_URL).replace(
  /\/$/,
  "",
);

/**
 * The old name ("UNCG Wealth Engine") implied a university endorsement and
 * collided with WealthEngine, an existing financial-data company. This one
 * says only true things: the place and the subject.
 */
export const SITE_NAME = "Triad Retirement Guidance";
export const SITE_OWNER = AGENT.name;
export const SITE_OWNER_PHONE = "+1-919-408-6671";
export const SITE_OWNER_EMAIL = AGENT.email;
export const SITE_LOCALITY = AGENT.city;
export const SITE_REGION = AGENT.state;

/**
 * Per-page Open Graph, merged with the site-wide bits.
 *
 * Next replaces the parent segment's `openGraph` object wholesale when a page
 * declares its own — it does not merge. Six pages declared a title and
 * description and in doing so dropped og:image, og:site_name and og:locale, so
 * the landing pages that get shared to Facebook and Nextdoor were the only
 * ones posting as a bare grey box. Build the object here instead of by hand.
 */
export function pageOpenGraph(input: {
  title: string;
  description: string;
  path: string;
}): NonNullable<Metadata["openGraph"]> {
  return {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    title: input.title,
    description: input.description,
    url: input.path,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${SITE_OWNER} — licensed insurance agent in ${SITE_LOCALITY}, ${SITE_REGION}`,
      },
    ],
  };
}

export function absoluteUrl(path: string): string {
  if (!path.startsWith("/")) return `${SITE_URL}/${path}`;
  return `${SITE_URL}${path}`;
}

/**
 * A person who provides a service — not an EducationalOrganization, which is
 * a real-world entity claim Google treats as institutional.
 */
export function localBusinessJsonLd() {
  const areaServed = [
    "Greensboro",
    "High Point",
    "Winston-Salem",
    "Summerfield",
    "Kernersville",
  ].map((name) => ({ "@type": "City", name }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#christian`,
        name: SITE_OWNER,
        jobTitle: "Licensed Insurance Agent",
        image: `${SITE_URL}/christian-brinkley.jpg`,
        telephone: SITE_OWNER_PHONE,
        email: SITE_OWNER_EMAIL,
        url: SITE_URL,
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "University of North Carolina at Greensboro",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: SITE_LOCALITY,
          addressRegion: SITE_REGION,
          addressCountry: "US",
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#service`,
        name: SITE_NAME,
        description:
          "Medicare, retirement income, and life insurance questions answered by a licensed agent in Greensboro, NC. No cost to talk.",
        provider: { "@id": `${SITE_URL}/#christian` },
        areaServed,
        telephone: SITE_OWNER_PHONE,
        email: SITE_OWNER_EMAIL,
        url: SITE_URL,
        priceRange: "Free consultation",
        address: {
          "@type": "PostalAddress",
          addressLocality: SITE_LOCALITY,
          addressRegion: SITE_REGION,
          addressCountry: "US",
        },
      },
    ],
  };
}
