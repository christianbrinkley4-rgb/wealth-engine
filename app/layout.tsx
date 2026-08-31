import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";

import { Analytics } from "@/app/components/Analytics";
import { SiteFooter } from "@/app/components/SiteFooter";
import { TopRouteChrome } from "@/app/components/TopRouteChrome";
import { StickyMobileCta } from "@/components/StickyMobileCta";
import { localBusinessJsonLd, SITE_NAME, SITE_OWNER, SITE_URL } from "@/lib/seo";
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
