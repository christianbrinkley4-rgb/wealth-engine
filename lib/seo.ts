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
 * The entity graph.
 *
 * This used to render on the home page alone, which meant every other page —
 * including the ones that answer real questions and are the likeliest to be
 * quoted — carried no statement of who wrote them or where he works. Search
 * engines and language models both build confidence about an entity from
 * repetition across a site, so it now ships in the root layout and appears
 * everywhere.
 *
 * Deliberately a service-area business rather than a storefront: there is no
 * public street address, so this describes where he works rather than
 * inventing a place. `GeoCircle` says that honestly; a `geo` point on a
 * building he does not have would not.
 */
export function localBusinessJsonLd() {
  const areaServed = [
    "Greensboro",
    "High Point",
    "Winston-Salem",
    "Kernersville",
    "Summerfield",
    "Jamestown",
    "Oak Ridge",
    "Clemmons",
    "Archdale",
    "Thomasville",
  ].map((name) => ({
    "@type": "City",
    name,
    address: { "@type": "PostalAddress", addressRegion: SITE_REGION, addressCountry: "US" },
  }));

  const address = {
    "@type": "PostalAddress",
    addressLocality: SITE_LOCALITY,
    addressRegion: SITE_REGION,
    addressCountry: "US",
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: "en-US",
        publisher: { "@id": `${SITE_URL}/#christian` },
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#christian`,
        name: SITE_OWNER,
        jobTitle: "Licensed Insurance Agent",
        description:
          `${SITE_OWNER} is a licensed insurance agent in ${SITE_LOCALITY}, ` +
          `${SITE_REGION}, who answers Medicare, retirement income, and life ` +
          "insurance questions for households across the Piedmont Triad.",
        image: `${SITE_URL}/christian-brinkley.jpg`,
        telephone: SITE_OWNER_PHONE,
        email: SITE_OWNER_EMAIL,
        url: `${SITE_URL}/about`,
        /*
         * What this person is a credible source on. Language models lean on
         * this when deciding whether a page is worth quoting on a topic.
         */
        knowsAbout: [
          "Medicare",
          "Medicare Part B premiums",
          "IRMAA income-related monthly adjustment amount",
          "Medicare Initial Enrollment Period",
          "Medigap open enrollment",
          "Medicare Advantage networks",
          "Roth conversions and Medicare premiums",
          "Social Security Form SSA-44",
          "Retirement income planning",
        ],
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "University of North Carolina at Greensboro",
        },
        worksFor: { "@id": `${SITE_URL}/#service` },
        address,
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#service`,
        name: SITE_NAME,
        description:
          "Medicare, retirement income, and life insurance questions answered " +
          `by a licensed agent in ${SITE_LOCALITY}, ${SITE_REGION}. No cost to talk.`,
        provider: { "@id": `${SITE_URL}/#christian` },
        founder: { "@id": `${SITE_URL}/#christian` },
        areaServed,
        /* A service area, stated as one, rather than a shopfront that does not exist. */
        serviceArea: {
          "@type": "GeoCircle",
          geoMidpoint: {
            "@type": "GeoCoordinates",
            // The centre of Greensboro, as the middle of the area served.
            latitude: 36.0726,
            longitude: -79.792,
          },
          geoRadius: "48000",
        },
        knowsLanguage: "en-US",
        telephone: SITE_OWNER_PHONE,
        email: SITE_OWNER_EMAIL,
        url: SITE_URL,
        image: `${SITE_URL}/opengraph-image`,
        /*
         * The hours are published in prose in the footer of every page and were
         * never marked up, which is a plain local-search signal left on the
         * floor. CONFIRM the Saturday window — the copy says "Saturday
         * mornings" and this encodes that as 9am to noon.
         */
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "19:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: "Saturday",
            opens: "09:00",
            closes: "12:00",
          },
        ],
        address,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "What this costs",
          itemListElement: [
            {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
              description:
                "There is no fee to ask a question, to compare coverage, or for " +
                "help after you enrol. Insurance companies pay a commission when " +
                "someone enrols through an agent; your premium is not higher for it.",
            },
          ],
        },
      },
    ],
  };
}

/** Breadcrumbs, so a result shows a path rather than a bare URL. */
export function breadcrumbJsonLd(trail: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}

/**
 * The guide pages are articles and were not saying so. Article markup is what
 * lets a search engine attribute a piece of writing to a person, and the
 * author link is what ties it back to the entity above.
 */
export function articleJsonLd(input: {
  headline: string;
  description: string;
  path: string;
  /** ISO date. Real dates only — a fabricated freshness signal is a lie. */
  datePublished: string;
  dateModified: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.headline,
    description: input.description,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}${input.path}` },
    author: { "@id": `${SITE_URL}/#christian` },
    publisher: { "@id": `${SITE_URL}/#service` },
    image: `${SITE_URL}/opengraph-image`,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    inLanguage: "en-US",
  };
}

/** FAQ blocks, which are the most quotable thing on any of these pages. */
export function faqJsonLd(items: ReadonlyArray<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
