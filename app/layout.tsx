import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Inter } from "next/font/google";

import { Analytics } from "@/app/components/Analytics";
import { TopRouteChrome } from "@/app/components/TopRouteChrome";
import { StickyMobileCta } from "@/components/StickyMobileCta";
import { AGENT, GOVERNMENT_DISCLAIMER } from "@/lib/agent";
import { localBusinessJsonLd, SITE_NAME, SITE_OWNER, SITE_URL } from "@/lib/seo";
import { TRIAD_CITIES } from "@/lib/triad";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    "Medicare, retirement income, and life insurance questions answered by a licensed agent in Greensboro, NC. No cost to talk, and your information is never sold.",
  applicationName: SITE_NAME,
  authors: [{ name: SITE_OWNER }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    url: SITE_URL,
    title: `${SITE_OWNER} | ${SITE_NAME}`,
    description:
      "Two questions and a real answer, from a licensed agent in Greensboro — before you give up your phone number.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_OWNER} | ${SITE_NAME}`,
    description:
      "Medicare and retirement questions answered by a licensed agent in Greensboro, NC.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const year = new Date().getFullYear();

  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
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

        <footer className="app-shell text-17 border-t border-gray-300 py-10 leading-relaxed text-[var(--color-navy)]">
          <p className="text-18 font-semibold">{AGENT.name}</p>
          <p className="mt-1 text-[var(--color-ink-muted)]">
            Licensed insurance agent · {AGENT.city}, {AGENT.state} ·{" "}
            <a href={AGENT.phoneHref} className="underline underline-offset-2">
              {AGENT.phone}
            </a>
          </p>
          <p className="text-16 mt-1 text-[var(--color-ink-muted)]">
            {AGENT.hours} {AGENT.afterHoursPromise}
          </p>

          <p className="text-15 mt-5 max-w-[72ch] text-[var(--color-ink-muted)]">
            {GOVERNMENT_DISCLAIMER} This site is operated by {AGENT.name}, a licensed insurance
            agent who represents a limited number of insurance companies. It is not affiliated with
            the University of North Carolina at Greensboro. Nothing here is tax, legal, or
            investment advice.
          </p>

          <p className="text-16 mt-5 flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/start" className="underline underline-offset-2">
              Ask a question
            </Link>
            <Link href="/keep-my-doctor" className="underline underline-offset-2">
              Keep my doctor?
            </Link>
            <Link href="/irmaa-appeal" className="underline underline-offset-2">
              Appeal a high premium
            </Link>
            <Link href="/helping-a-parent" className="underline underline-offset-2">
              Helping a parent
            </Link>
            <Link href="/remind-me" className="underline underline-offset-2">
              Remind me later
            </Link>
            <Link href="/annuities" className="underline underline-offset-2">
              Annuities
            </Link>
            <Link href="/life-insurance" className="underline underline-offset-2">
              Life insurance
            </Link>
            <Link href="/retirement-income" className="underline underline-offset-2">
              401(k) at retirement
            </Link>
            <Link href="/about" className="underline underline-offset-2">
              About
            </Link>
            <Link href="/plan" className="underline underline-offset-2">
              Conversion timing planner
            </Link>
            <Link href="/medicare" className="underline underline-offset-2">
              Medicare estimate
            </Link>
            <Link href="/roth-window" className="underline underline-offset-2">
              Roth estimate
            </Link>
            <Link href="/privacy" className="underline underline-offset-2">
              Privacy
            </Link>
          </p>

          {/*
            A crawler reaches a page through a link or not at all, and these
            city pages have no other route in from every page on the site.
          */}
          <p className="text-16 mt-5 flex flex-wrap gap-x-5 gap-y-2">
            <span className="text-[var(--color-ink-muted)]">Medicare help near you:</span>
            {TRIAD_CITIES.map((city) => (
              <Link
                key={city.slug}
                href={`/medicare-in/${city.slug}`}
                className="underline underline-offset-2"
              >
                {city.name}
              </Link>
            ))}
          </p>

          <p className="text-15 mt-5 text-[var(--color-ink-muted)]">
            © {year} {AGENT.name}. All rights reserved.
          </p>
        </footer>

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
