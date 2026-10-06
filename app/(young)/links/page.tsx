import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { pageOpenGraph, pageTwitter } from "@/lib/seo";
import { WealthLane } from "@/lib/wealthLane";

const title = "Links";
const description =
  "Christian Brinkley’s links for money lessons, plus Medicare help if you are here for a parent.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/links" },
  robots: { index: false, follow: true },
  openGraph: pageOpenGraph({ title, description, path: "/links" }),
  twitter: pageTwitter({ title, description }),
};

export default function LinksPage() {
  return (
    <main className="wealth-links">
      <div className="wealth-shell">
        <h1>{WealthLane.linksTitle()}</h1>
        <p className="wealth-lede">{WealthLane.linksLede()}</p>
        <Link href={WealthLane.hubPath} className="wealth-cta">
          {WealthLane.linksCta()}
          <ArrowRight size={20} aria-hidden />
        </Link>
        <ul className="wealth-link-list">
          {WealthLane.bioLinks().map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="wealth-link-row">
                <strong>{item.label}</strong>
                <span>{item.note}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
