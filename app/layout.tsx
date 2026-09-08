import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Source_Serif_4 } from "next/font/google";

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

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_OWNER} | ${SITE_NAME}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Licensed Greensboro agent Christian Brinkley reviews Medicare (turning 65 and AEP), life insurance, and retirement questions in person — at your kitchen table. No cost, no call center.",
  applicationName: SITE_NAME,
  authors: [{ name: SITE_OWNER }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: `${SITE_OWNER} | ${SITE_NAME}`,
    description:
      "Medicare, life insurance, and retirement help from one licensed agent in the Triad. Kitchen table, not a call center.",
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
    title: `${SITE_OWNER} | ${SITE_NAME}`,
    description:
      "Medicare, life insurance, and retirement help from a licensed Greensboro agent. Kitchen table, not a call center.",
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
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable} h-full antialiased`}>
      <body className="min-h-full bg-[var(--color-paper)] pb-20 text-[var(--color-navy)] md:pb-0">
        {/*
          Site-wide, because an entity a search engine or a language model only
          sees on one page is an entity it is not confident about.
        */}
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
