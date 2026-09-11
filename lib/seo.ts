/**
 * Single source of truth for site-wide SEO constants. Imported by metadata
 * builders, JSON-LD blocks, sitemap, and robots.
 */

import type { Metadata } from "next";

import {
  AGENT,
  MEDICARE_TPMO_SCOPE,
  TPMO_ORGANIZATION_COUNT,
  TPMO_PRODUCT_COUNT,
} from "@/lib/agent";
import { placeNames, SERVICE_AREA_LEDE } from "@/lib/triad";

const LOCAL_SITE_URL = "http://localhost:3000";

const PLACEHOLDER_HOST = /(^|\.)example\.(com|org|net)$|your[-.]?domain|placeholder/i;
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "0.0.0.0", "::1"]);
const RESERVED_HOST = /\.(test|invalid|example|localhost)$/i;
const PRIVATE_IPV4 = /^(10\.|127\.|169\.254\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|0\.)/;

/** A canonical origin must be a real public HTTPS host before indexing is safe. */
export function isValidPublicSiteUrl(raw: string | undefined): boolean {
  if (!raw?.trim()) return false;
  try {
    const url = new URL(raw.trim());
    return (
      url.protocol === "https:" &&
      !url.username &&
      !url.password &&
      !LOCAL_HOSTS.has(url.hostname.toLowerCase()) &&
      !url.hostname.endsWith(".local") &&
      !RESERVED_HOST.test(url.hostname) &&
      !PRIVATE_IPV4.test(url.hostname) &&
      !url.hostname.startsWith("[") &&
      !PLACEHOLDER_HOST.test(url.hostname) &&
      url.pathname === "/" &&
      !url.search &&
      !url.hash
    );
  } catch {
    return false;
  }
}

export const SITE_URL_CONFIGURED = isValidPublicSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
const VERCEL_DEPLOYMENT_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL.replace(/^https?:\/\//, "").replace(/\/$/, "")}`
  : null;
const DEPLOYMENT_URL = [
  process.env.DEPLOY_PRIME_URL,
  process.env.URL,
  VERCEL_DEPLOYMENT_URL ?? undefined,
].find(isValidPublicSiteUrl);
export const SITE_URL = (
  SITE_URL_CONFIGURED
    ? process.env.NEXT_PUBLIC_SITE_URL!.trim()
    : (DEPLOYMENT_URL ?? LOCAL_SITE_URL)
).replace(/\/$/, "");

function configured(value: string | undefined): boolean {
  return Boolean(value?.trim()) && !/replace|placeholder|your[_-]?/i.test(value!);
}

const LEAD_CAPTURE_CONFIGURED =
  (configured(process.env.COMMAND_CENTER_INGEST_URL) &&
    /^[a-f0-9]{64}$/.test(process.env.COMMAND_CENTER_INGEST_KEY || "")) ||
  (configured(process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    configured(process.env.SUPABASE_SERVICE_ROLE_KEY)) ||
  (configured(process.env.RESEND_API_KEY) && configured(process.env.RESEND_FROM)) ||
  configured(process.env.MAKE_WEBHOOK_URL) ||
  (configured(process.env.TWILIO_ACCOUNT_SID) &&
    configured(process.env.TWILIO_AUTH_TOKEN) &&
    configured(process.env.TWILIO_FROM_NUMBER) &&
    configured(process.env.ALERT_SMS_TO));

/**
 * A real origin is not enough to make regulated lead-generation content safe
 * to index. Keep crawlers out until the Medicare TPMO scope, any conditionally
 * required counts, the final origin, and a working lead path are configured.
 */
const TPMO_MARKETING_CONFIGURED =
  MEDICARE_TPMO_SCOPE === "one-organization" ||
  (MEDICARE_TPMO_SCOPE === "multiple-organizations" &&
    Number.isInteger(TPMO_ORGANIZATION_COUNT) &&
    (TPMO_ORGANIZATION_COUNT ?? 0) > 0 &&
    Number.isInteger(TPMO_PRODUCT_COUNT) &&
    (TPMO_PRODUCT_COUNT ?? 0) > 0);

export const SITE_INDEXABLE =
  SITE_URL_CONFIGURED && TPMO_MARKETING_CONFIGURED && LEAD_CAPTURE_CONFIGURED;

/**
 * The old name ("UNCG Wealth Engine") implied a university endorsement and
 * collided with WealthEngine, an existing financial-data company. This one
 * says only true things: the place and the subject.
 */
export const SITE_NAME = AGENT.name;
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

export function pageTwitter(input: {
  title: string;
  description: string;
}): NonNullable<Metadata["twitter"]> {
  return {
    card: "summary_large_image",
    title: input.title,
    description: input.description,
    images: ["/twitter-image"],
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
 * inventing a place. The explicit city list is more honest than converting
 * "about 30 minutes" into a circular mileage claim.
 */
export function localBusinessJsonLd() {
  const areaServed = placeNames().map((name) => ({
    "@type": "City" as const,
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
          `${SITE_REGION}, and a master’s student in accounting at UNC Greensboro. ` +
          "He helps individuals and families with Medicare, life insurance, care coverage, " +
          "and annuities, and works with an advisor for financial planning.",
        image: `${SITE_URL}/christian-brinkley.jpg`,
        telephone: SITE_OWNER_PHONE,
        email: SITE_OWNER_EMAIL,
        url: `${SITE_URL}/about`,
        // Topics covered on the site; these do not assert additional credentials.
        knowsAbout: [
          "Medicare",
          "Medicare Part B premiums",
          "IRMAA income-related monthly adjustment amount",
          "Medicare Initial Enrollment Period",
          "Medicare Annual Enrollment Period",
          "Medicare Advantage open enrollment",
          "Medigap open enrollment",
          "Medicare Advantage networks",
          "Turning 65 Medicare enrollment",
          "Life insurance",
          "Term life insurance",
          "Long-term care insurance",
          "Short-term care insurance",
          "Critical illness insurance",
          "Annuities",
          "Roth conversions and Medicare premiums",
          "Social Security Form SSA-44",
          "Retirement income planning",
          "401(k) rollover tax timing",
        ],
        worksFor: { "@id": `${SITE_URL}/#service` },
        address,
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#service`,
        name: SITE_NAME,
        description:
          "Medicare initial enrollment, annual enrollment, life insurance, and " +
          "retirement income questions answered in person by one licensed agent " +
          `in ${SITE_LOCALITY}, ${SITE_REGION}. ${SERVICE_AREA_LEDE} ` +
          "Free consultation with no obligation to enroll.",
        provider: { "@id": `${SITE_URL}/#christian` },
        founder: { "@id": `${SITE_URL}/#christian` },
        serviceType: [
          "Medicare Initial Enrollment counseling",
          "Medicare Annual Enrollment review",
          "Life insurance review",
          "Long-term care insurance consultation",
          "Short-term care insurance consultation",
          "Critical illness insurance consultation",
          "Annuity consultation",
          "Retirement income and Medicare timing education",
        ],
        availableChannel: [
          {
            "@type": "ServiceChannel",
            serviceType: "In-person meeting at the client's home",
            availableLanguage: "English",
          },
          {
            "@type": "ServiceChannel",
            serviceType: "Telephone consultation",
            availableLanguage: "English",
          },
        ],
        areaServed,
        knowsLanguage: "en-US",
        telephone: SITE_OWNER_PHONE,
        email: SITE_OWNER_EMAIL,
        url: SITE_URL,
        image: `${SITE_URL}/opengraph-image`,
        // By appointment; the connected calendar supplies actual available slots.
        address,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "How a household in the Piedmont Triad gets help",
          itemListElement: [
            {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
              itemOffered: {
                "@type": "Service",
                name: "Medicare Initial Enrollment (Turning 65)",
                url: `${SITE_URL}/turning-65`,
                description:
                  "Personal review of the seven-month Initial Enrollment Period, " +
                  "coverage start dates, and the six-month Medigap window. In person " +
                  "or by phone. Free consultation with no obligation.",
                provider: { "@id": `${SITE_URL}/#christian` },
              },
            },
            {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
              itemOffered: {
                "@type": "Service",
                name: "Medicare Annual Enrollment review",
                url: `${SITE_URL}/annual-enrollment`,
                description:
                  "A fall review of the Annual Notice of Change, prescriptions, and " +
                  "doctors — including when the appropriate answer is to keep the plan you have.",
                provider: { "@id": `${SITE_URL}/#christian` },
              },
            },
            {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
              itemOffered: {
                "@type": "Service",
                name: "Life insurance review",
                url: `${SITE_URL}/life-insurance`,
                description:
                  "Review existing policies, family needs, beneficiaries, budget, " +
                  "and the differences between term and permanent coverage.",
                provider: { "@id": `${SITE_URL}/#christian` },
              },
            },
            {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
              itemOffered: {
                "@type": "Service",
                name: "Retirement income and Medicare timing",
                url: `${SITE_URL}/retirement-income`,
                description:
                  "What an old 401(k), a Roth conversion, or a large withdrawal does " +
                  "to a Medicare premium two years later. Education, not investment advice.",
                provider: { "@id": `${SITE_URL}/#christian` },
              },
            },
            ...[
              ["Long-term care insurance consultation", "/long-term-care-insurance"],
              ["Short-term care insurance consultation", "/short-term-care-insurance"],
              ["Critical illness insurance consultation", "/critical-illness-insurance"],
              ["Annuity consultation", "/annuities"],
            ].map(([name, path]) => ({
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
              description: "No-cost, no-obligation consultation. Insurance coverage is not free.",
              itemOffered: {
                "@type": "Service",
                name,
                url: `${SITE_URL}${path}`,
                provider: { "@id": `${SITE_URL}/#christian` },
              },
            })),
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
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}/#christian`,
      name: SITE_OWNER,
      url: `${SITE_URL}/about`,
    },
    publisher: { "@id": `${SITE_URL}/#service` },
    image: `${SITE_URL}/opengraph-image`,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    inLanguage: "en-US",
  };
}

/** Mark up only questions and answers that also appear on the page. */
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

/** Per-page Service markup so the four lead URLs name the offer, not only the article. */
export function serviceJsonLd(input: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: input.name,
    description: input.description,
    url: `${SITE_URL}${input.path}`,
    provider: { "@id": `${SITE_URL}/#christian` },
    areaServed: placeNames().map((name) => ({ "@type": "City", name })),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free consultation with no obligation to enroll or buy.",
    },
  };
}

/**
 * Describe visible procedures. Search engines determine presentation;
 * this markup does not promise a rich result or an assistant citation.
 */
export function howToJsonLd(input: {
  name: string;
  description: string;
  path: string;
  steps: ReadonlyArray<{ name: string; text: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: input.name,
    description: input.description,
    url: `${SITE_URL}${input.path}`,
    inLanguage: "en-US",
    author: { "@id": `${SITE_URL}/#christian` },
    step: input.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}
