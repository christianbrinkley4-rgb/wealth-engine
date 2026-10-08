import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FileSpreadsheet, Globe, MessageCircle, Sparkles, Terminal } from "lucide-react";

import { wealthMetadata } from "@/lib/wealth/seo";
import { JsonLd } from "@/app/wealth/ui/shell";
import { SITE_URL } from "@/lib/seo";
import { ANALYZER_FILE, BUDGET_FILE, EDUCATION_NOTE, WEALTH_BRAND, WEALTH_FACTS } from "@/lib/wealth/site";

import "../wealth/wealth.css";

/**
 * Link-in-bio page for social profiles. Five links, nothing else to load, and
 * no site header or footer in the way.
 */
export const metadata: Metadata = wealthMetadata({
  title: "Free Money Tools & Links",
  description:
    "Free budget spreadsheet, Financial Statement Analyzer, money calculators and quizzes from Christian Brinkley in Greensboro, NC.",
  path: "/links",
});

const LINKS = [
  {
    href: BUDGET_FILE,
    download: true,
    icon: FileSpreadsheet,
    title: "Free budget spreadsheet",
    note: "Excel file. Formulas already built.",
  },
  {
    href: ANALYZER_FILE,
    download: true,
    icon: Terminal,
    title: "Financial Statement Analyzer",
    note: "10 ratios. Python download. Free.",
  },
  {
    href: "/wealth",
    icon: Sparkles,
    title: "Money calculators and quizzes",
    note: "Compound interest, budgets, debt, Roth vs traditional.",
  },
  {
    href: "/",
    icon: Globe,
    title: "christianbrinkleync.com",
    note: "Medicare and retirement help in the Piedmont Triad.",
  },
  {
    href: WEALTH_FACTS.smsHref,
    icon: MessageCircle,
    title: `Call or text ${WEALTH_FACTS.phone}`,
    note: "It's just me on the other end.",
  },
] as const;

export default function LinksPage() {
  return (
    <div className="w-root">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Christian Brinkley's links", url: `${SITE_URL}/links`, hasPart: LINKS.filter((link) => link.href.startsWith("/")).map((link) => ({ "@type": "WebPage", name: link.title, url: `${SITE_URL}${link.href}` })) }} />
      <main className="w-links">
        <Image
          src="/christian-brinkley-square.jpg"
          alt="Christian Brinkley"
          width={208}
          height={208}
          sizes="104px"
          priority
          className="w-links-face"
        />
        <h1>Christian Brinkley</h1>
        <p className="w-eyebrow" style={{ margin: 0 }}>
          {WEALTH_BRAND}
        </p>
        <p style={{ margin: "12px auto 0", maxWidth: "34ch", color: "var(--w-muted)" }}>
          21. Licensed insurance agent in NC. Accounting senior at UNCG. Free money tools below.
        </p>
        <ul className="w-links-list">
          {LINKS.map((link) => {
            const Icon = link.icon;
            const inner = (
              <>
                <span className="w-links-icon">
                  <Icon size={22} aria-hidden />
                </span>
                <span>
                  <strong>{link.title}</strong>
                  <small>{link.note}</small>
                </span>
                <ArrowUpRight size={20} aria-hidden />
              </>
            );
            return (
              <li key={link.href}>
                {link.href.startsWith("/") && !("download" in link) ? (
                  <Link href={link.href}>{inner}</Link>
                ) : (
                  <a href={link.href} download={"download" in link ? true : undefined}>
                    {inner}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
        <p className="w-note" style={{ textAlign: "left" }}>
          {EDUCATION_NOTE}
        </p>
      </main>
    </div>
  );
}
