import type { Metadata } from "next";
import Script from "next/script";
import { Atkinson_Hyperlegible_Next, Source_Serif_4 } from "next/font/google";

import { Analytics } from "@/app/components/Analytics";
import { SiteFooter } from "@/app/components/SiteFooter";
import { TopRouteChrome } from "@/app/components/TopRouteChrome";
import { StickyMobileCta } from "@/components/StickyMobileCta";
import {
  localBusinessJsonLd,
  SITE_LOCALITY,
  SITE_INDEXABLE,
  SITE_NAME,
  SITE_OWNER,
  SITE_REGION,
  SITE_URL,
} from "@/lib/seo";
import "./globals.css";
import "./personal.css";
import "./home.css";

// Designed for low-vision readers, which suits an audience turning 65.
const bodyFont = Atkinson_Hyperlegible_Next({
  variable: "--font-body",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  // Next has no metric overrides for this face yet; fall back to a close system sans.
  adjustFontFallback: false,
  fallback: ["system-ui", "Segoe UI", "Arial", "sans-serif"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: "variable",
  style: ["normal", "italic"],
  display: "swap",
});

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_OWNER} | Medicare, Life Insurance & Retirement in Greensboro`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Licensed Greensboro agent Christian Brinkley helps Piedmont Triad families with Medicare, life insurance, and retirement questions. Meet in person or by phone. No cost or obligation.",
  applicationName: SITE_NAME,
  authors: [{ name: SITE_OWNER }],
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION }
      : undefined,
  },
  alternates: {
    canonical: "/",
    types: {
      "text/plain": "/llms.txt",
    },
  },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: `${SITE_OWNER} | Medicare, Life Insurance & Retirement in Greensboro`,
    description:
      "Medicare, life insurance, and retirement help from one licensed agent in Greensboro and the Piedmont Triad. Meet in person or by phone.",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${SITE_OWNER} — licensed insurance agent in ${SITE_LOCALITY}, ${SITE_REGION}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_OWNER} | Medicare, Life Insurance & Retirement in Greensboro`,
    description:
      "Medicare, life insurance, and retirement help from a licensed Greensboro agent serving the Piedmont Triad. Meet in person or by phone.",
    images: ["/twitter-image"],
  },
  robots: {
    index: SITE_INDEXABLE,
    follow: SITE_INDEXABLE,
    googleBot: {
      index: SITE_INDEXABLE,
      follow: SITE_INDEXABLE,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${sourceSerif.variable} h-full antialiased`}>
      <body className="min-h-full bg-[var(--color-paper)] pb-28 text-[var(--color-navy)] md:pb-0">
        {/* Keep author and service information consistent across public pages. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
        />
        <TopRouteChrome />
        {/* Target for the skip link; the pages render their own <main> inside. */}
        <div id="main-content" tabIndex={-1} className="outline-none">
          {children}
        </div>

        <SiteFooter />

        <StickyMobileCta />
        <Analytics />

        {TURNSTILE_SITE_KEY ? (
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js"
            strategy="afterInteractive"
            async
            defer
          />
        ) : null}
      </body>
    </html>
  );
}
