import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight, MessageCircle } from "lucide-react";

import { HeroDemo } from "@/app/wealth/ui/HeroDemo";
import { EducationNote, Faq, JsonLd } from "@/app/wealth/ui/shell";
import { ToolGrid } from "@/app/wealth/ui/ToolGrid";
import { SITE_URL } from "@/lib/seo";
import { wealthMetadata } from "@/lib/wealth/seo";
import { JOURNEY, PILLARS, WEALTH_BRAND, WEALTH_FACTS, WEALTH_TOOLS } from "@/lib/wealth/site";

const description =
  "Free money calculators, quizzes and plain-English guides for your 20s and 30s. Built by Christian Brinkley, a 21-year-old licensed agent and accounting senior in Greensboro, NC.";

export const metadata: Metadata = wealthMetadata({
  title: "Money tools for your 20s: calculators, quizzes and guides",
  description,
  path: "/wealth",
});

const TICKER = [
  "Free tools",
  "No stock picks",
  "No course to sell",
  "Real math you can check",
  "Built in Greensboro",
  "Education, not advice",
  "Nothing to sign up for",
];

const FAQ = [
  {
    q: "Is everything here actually free?",
    a: "Yes. The calculators, quizzes, articles and both downloads are free. There's no account to make and nothing to pay for.",
  },
  {
    q: "Are you a financial advisor?",
    a: "No. I'm a licensed insurance agent in North Carolina (NC Life & Health) and an accounting senior at UNCG. I'm not securities licensed, so I don't recommend investments. This is education: how things work and how to run the numbers yourself.",
  },
  {
    q: "Who is this for?",
    a: "People in their 20s and early 30s who never got a real money class. First job, first budget, first time hearing the words Roth IRA.",
  },
  {
    q: "Do the calculators save my numbers anywhere?",
    a: "Only in your own browser, so they're still there when you come back. Nothing you type into a calculator or quiz is sent to me or stored on a server.",
  },
  {
    q: "How accurate are the calculators?",
    a: "The math is exact for the numbers you enter. The future isn't. Returns, tax rates and interest rates change, so treat every result as an estimate to learn from, not a forecast.",
  },
];

export default function WealthHome() {
  const latest = JOURNEY[0];
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${WEALTH_BRAND}: money tools for your 20s`,
          description,
          url: `${SITE_URL}/wealth`,
          author: { "@id": `${SITE_URL}/#christian` },
          hasPart: WEALTH_TOOLS.map((tool) => ({
            "@type": tool.kind === "Download" ? "DigitalDocument" : "WebApplication",
            name: tool.title,
            url: `${SITE_URL}${tool.href}`,
          })),
        }}
      />

      <section className="w-hero">
        <div className="w-shell w-hero-grid">
          <div>
            <p className="w-eyebrow">{WEALTH_BRAND}</p>
            <h1 className="w-h1">
              Nobody taught you about money. <span className="w-mark">I&apos;m 21 and licensed.</span>
            </h1>
            <p className="w-lede">
              So I&apos;m building the money class I wanted. Calculators you can play with, quizzes that
              take a minute, and guides in plain English. All free. No stock picks.
            </p>
            <div className="w-btn-row">
              <a href="#tools" className="w-btn w-btn-ink">
                Play with the tools <ArrowDown size={18} aria-hidden />
              </a>
            </div>
            <ul className="w-hero-proof" aria-label="About Christian">
              <li className="w-chip">NC Life &amp; Health licensed</li>
              <li className="w-chip">UNCG accounting senior</li>
              <li className="w-chip">Excel certified</li>
              <li className="w-chip">Builds in Python</li>
            </ul>
          </div>
          <HeroDemo />
        </div>
      </section>

      <div className="w-ticker" aria-hidden>
        <div className="w-ticker-track">
          {[0, 1].map((copy) => (
            <ul key={copy}>
              {TICKER.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <section className="w-section" id="tools" style={{ scrollMarginTop: 110 }}>
        <div className="w-shell">
          <p className="w-eyebrow">Pick one and start clicking</p>
          <h2 className="w-h2">
            Eight tools. <span className="w-mark">Zero sign-ups.</span>
          </h2>
          <p className="w-lede" style={{ marginBottom: 28 }}>
            Every one runs right here in your browser. Change a number and watch what happens.
          </p>
          <ToolGrid />
        </div>
      </section>

      <section className="w-section" style={{ paddingTop: 0 }}>
        <div className="w-shell">
          <p className="w-eyebrow">What I cover</p>
          <h2 className="w-h2" style={{ marginBottom: 28 }}>
            Four things, on repeat.
          </h2>
          <div className="w-grid w-grid-4">
            {PILLARS.map((pillar, index) => (
              <Link key={pillar.id} href={pillar.href} className="w-pillar" data-reveal>
                <b>0{index + 1}</b>
                <strong>{pillar.title}</strong>
                <span>{pillar.line}</span>
                <span>{pillar.cta}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="w-section w-band-ink">
        <div className="w-shell w-split">
          <div>
            <p className="w-eyebrow">Who&apos;s behind this</p>
            <h2 className="w-h2">I&apos;m Christian. Here&apos;s the honest resume.</h2>
            <p className="w-lede">
              No big wins to flex yet. That&apos;s the point. You get to watch the whole thing from day one.
            </p>
            <ul className="w-facts">
              <li>
                <b>01</b>
                <span>
                  {WEALTH_FACTS.age} years old, based in {WEALTH_FACTS.city}.
                </span>
              </li>
              <li>
                <b>02</b>
                <span>{WEALTH_FACTS.license}. Insurance, not securities.</span>
              </li>
              <li>
                <b>03</b>
                <span>
                  {WEALTH_FACTS.school}. {WEALTH_FACTS.gpa}.
                </span>
              </li>
              <li>
                <b>04</b>
                <span>{WEALTH_FACTS.excel}, and I write Python.</span>
              </li>
              <li>
                <b>05</b>
                <span>
                  I work with a financial advisor. I&apos;ve reviewed 100+ client files and sat in on dozens
                  of client money appointments.
                </span>
              </li>
            </ul>
          </div>
          <article className="w-panel" data-reveal>
            <p className="w-eyebrow">Latest from the journey</p>
            <h3 className="w-h3">{latest.title}</h3>
            <p style={{ color: "var(--w-on-ink-muted)", margin: "12px 0 0" }}>{latest.body[1]}</p>
            <div className="w-btn-row">
              <Link href="/wealth/journey" className="w-btn">
                Read the whole thing <ArrowRight size={18} aria-hidden />
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="w-section" id="drops">
        <div className="w-shell w-split">
          <div>
            <p className="w-eyebrow">Tool drops</p>
            <h2 className="w-h2">
              Want the next tool <span className="w-mark">when it drops?</span>
            </h2>
            <p className="w-lede">
              Text me the word DROPS. It comes straight to my phone, not a call center, and I&apos;ll send
              new tools as I finish them.
            </p>
          </div>
          <div className="w-card">
            <h3 className="w-h3">Text Christian</h3>
            <p style={{ margin: "10px 0 0", color: "var(--w-muted)" }}>
              {WEALTH_FACTS.phone}. Standard message rates apply. Text STOP any time and I&apos;ll take you
              off the list.
            </p>
            <div className="w-btn-row">
              <a href={`${WEALTH_FACTS.smsHref}?&body=DROPS`} className="w-btn">
                <MessageCircle size={18} aria-hidden /> Text DROPS
              </a>
            </div>
          </div>
        </div>
      </section>

      <Faq items={FAQ} title="Before you start clicking" />

      <div className="w-shell" style={{ paddingBottom: 56 }}>
        <EducationNote />
      </div>
    </main>
  );
}
