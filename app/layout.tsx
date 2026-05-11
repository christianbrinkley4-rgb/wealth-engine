import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TopRouteChrome } from "@/app/components/TopRouteChrome";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { FooterSubscribe } from "@/components/FooterSubscribe";
import { ScrollTriggerBanner } from "@/components/ScrollTriggerBanner";
import { TimedEngagementPopup } from "@/components/TimedEngagementPopup";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Christian Brinkley | UNCG Wealth Engine",
    template: "Christian Brinkley | UNCG Wealth Engine",
  },
  description:
    "UNCG Wealth Engine — free tools helping Greensboro-area retirees understand Medicare premiums and 2026 tax changes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-[var(--color-paper)] text-[var(--color-navy)]">
        <TopRouteChrome />
        {children}
        <ExitIntentPopup />
        <ScrollTriggerBanner
          suppressOnPaths={["/medicare", "/taxes", "/thank-you"]}
        />
        <TimedEngagementPopup
          suppressOnPaths={["/medicare", "/taxes", "/thank-you"]}
          primaryCtaPath="/medicare"
        />
        <FooterSubscribe />
        <footer className="app-shell border-t border-gray-300 py-8 text-[18px] leading-relaxed text-[var(--color-navy)]">
          Copyright 2026 Christian Brinkley | UNCG Student Research | This tool is for
          educational purposes only and does not constitute financial or legal advice.
        </footer>
      </body>
    </html>
  );
}
