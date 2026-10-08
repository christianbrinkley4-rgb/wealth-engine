import { TrafficGuideLinks } from "@/app/components/TrafficGuideLinks";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";

import { DropsForm } from "@/app/wealth/ui/DropsForm";
import { HeroDemo } from "@/app/wealth/ui/HeroDemo";
import { EducationNote, Faq, JsonLd } from "@/app/wealth/ui/shell";
import { ToolGrid } from "@/app/wealth/ui/ToolGrid";
import { SITE_URL } from "@/lib/seo";
import { wealthMetadata } from "@/lib/wealth/seo";
import { JOURNEY, PILLARS, WEALTH_BRAND, WEALTH_FACTS, WEALTH_TOOLS } from "@/lib/wealth/site";

const description =
  "Free money calculators, quizzes and plain-English guides for your 20s and 30s, built by Christian Brinkley, a licensed agent and accounting senior.";

export const metadata: Metadata = wealthMetadata({
  title: "Money tools for your 20s",
  description,
  path: "/wealth",
});

const HOOK = ["Nobody", "taught", "you", "about", "money."];
const HOOK_MARK = ["I\u2019m", "21", "and", "licensed."];

const TICKER = [
  "Free tools",
  "No stock picks",
  "No course to sell",
  "Real math you can check",
  "Built in Greensboro",
  "Education, not advice",
  "No paywall, no account",
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
    a: "Only in your own browser, so they're still there when you come back. Nothing you type into a calculator or quiz is sent to me or stored on a server. The one exception is the email box, and only if you fill it in.",
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
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          url: `${SITE_URL}/wealth`,
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: [".w-h1", ".w-lede"],
          },
        }}
      />

      <section className="w-hero" data-spot>
        <div className="w-shell w-hero-grid">
          <div>
            <p className="w-eyebrow">{WEALTH_BRAND}</p>
            <h1 className="w-h1" aria-label={[...HOOK, ...HOOK_MARK].join(" ")}>
              <span aria-hidden>
                {HOOK.map((word, index) => (
                  <span key={word} className="w-word" style={{ "--i": index } as React.CSSProperties}>
                    {`${word} `}
                  </span>
                ))}
                <span className="w-mark">
                  {HOOK_MARK.map((word, index) => (
                    <span
                      key={word}
                      className="w-word"
                      style={{ "--i": HOOK.length + index } as React.CSSProperties}
                    >
                      {index === HOOK_MARK.length - 1 ? word : `${word} `}
                    </span>
                  ))}
                </span>
              </span>
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

      <section className="w-section" style={{ paddingBottom: 0 }}>
        <div className="w-shell">
          <Link
            href="/numbers"
            className="w-panel"
            data-reveal
            style={{ display: "block", textDecoration: "none", color: "inherit" }}
          >
            <p className="w-eyebrow">The 2026-2027 numbers hub</p>
            <h2 className="w-h2">
              Every money number that matters, <span className="w-mark">in one place.</span>
            </h2>
            <p className="w-lede" style={{ margin: "12px 0 20px" }}>
              Tax brackets, 401(k) and IRA limits, HSA caps, Social Security, Medicare costs. Every
              figure sourced from the IRS, SSA, or CMS. Bookmark it.
            </p>
            <span className="w-btn w-btn-ink">
              Browse the numbers <ArrowRight size={18} aria-hidden />
            </span>
          </Link>
        </div>
      </section>

      <section className="w-section" id="tools" style={{ scrollMarginTop: 110 }}>
        <div className="w-shell">
          <p className="w-eyebrow">Pick one and start clicking</p>
          <h2 className="w-h2">
            Eight tools. <span className="w-mark">Zero paywalls.</span>
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

      <section className="w-section" id="library" style={{ paddingTop: 0, scrollMarginTop: 110 }}>
        <div className="w-shell">
          <p className="w-eyebrow">The library</p>
          <h2 className="w-h2" style={{ marginBottom: 12 }}>
            Money guides, <span className="w-mark">by life stage.</span>
          </h2>
          <p className="w-lede" style={{ marginBottom: 28 }}>
            Twenty-eight short guides. Pick where you are and start reading. Each one takes about
            five minutes.
          </p>
          <div className="w-lib-grid">
            <div className="w-lib-group" data-reveal>
              <h3>Start here</h3>
              <ul>
                <li><Link href="/wealth/money-moves-in-your-20s">Five money moves for your 20s</Link></li>
                <li><Link href="/wealth/roth-ira-explained">Roth IRA, explained</Link></li>
                <li><Link href="/wealth/building-in-public">Building in public: the manifesto</Link></li>
              </ul>
            </div>
            <div className="w-lib-group" data-reveal>
              <h3>Teens</h3>
              <ul>
                <li><Link href="/wealth/teens-first-job-money-guide">Your First Job: A Teen Money Guide</Link></li>
                <li><Link href="/wealth/credit-score-basics">Credit Scores, Explained Plainly</Link></li>
              </ul>
            </div>
            <div className="w-lib-group" data-reveal>
              <h3>Your 20s</h3>
              <ul>
                <li><Link href="/wealth/budgeting-that-actually-works">Budgeting That Actually Works</Link></li>
                <li><Link href="/wealth/student-loans-payoff-plan">A Student Loan Payoff Plan That Fits on One Page</Link></li>
                <li><Link href="/wealth/credit-cards-beginners">Credit Cards for Beginners</Link></li>
                <li><Link href="/wealth/emergency-fund-guide">The Emergency Fund Guide</Link></li>
              </ul>
            </div>
            <div className="w-lib-group" data-reveal>
              <h3>Your 30s and 40s</h3>
              <ul>
                <li><Link href="/wealth/buying-first-home-money-guide">Buying Your First Home: The Money Parts</Link></li>
                <li><Link href="/wealth/401k-explained">Your 401(k), Explained</Link></li>
                <li><Link href="/wealth/life-insurance-explained">Life Insurance, Explained in Plain English</Link></li>
                <li><Link href="/wealth/529-college-savings-basics">529 College Savings Plans, Explained</Link></li>
                <li><Link href="/wealth/529-vs-roth-for-college">529 vs. Roth IRA for College</Link></li>
                <li><Link href="/wealth/hsa-explained">The HSA, Explained in Plain English</Link></li>
                <li><Link href="/wealth/rent-vs-buy-math">Rent vs. Buy: The Math, Minus the Opinions</Link></li>
                <li><Link href="/wealth/car-buying-money-guide">The Real Cost of Buying a Car</Link></li>
                <li><Link href="/wealth/side-hustle-taxes">Side-Hustle Taxes, Explained in Plain English</Link></li>
              </ul>
            </div>
            <div className="w-lib-group" data-reveal>
              <h3>Taxes</h3>
              <ul>
                <li><Link href="/wealth/first-tax-return-guide">Your First Tax Return, Explained</Link></li>
                <li><Link href="/wealth/tax-brackets-explained-plainly">Tax Brackets, Explained Plainly</Link></li>
                <li><Link href="/wealth/roth-vs-traditional-taxes">Roth vs Traditional: The Tax Trade</Link></li>
              </ul>
            </div>
            <div className="w-lib-group" data-reveal>
              <h3>Insurance</h3>
              <ul>
                <li><Link href="/wealth/disability-insurance-explained">Disability Insurance, Explained</Link></li>
                <li><Link href="/wealth/health-insurance-basics">Health Insurance Basics</Link></li>
              </ul>
            </div>
            <div className="w-lib-group" data-reveal>
              <h3>Approaching retirement</h3>
              <ul>
                <li><Link href="/wealth/catch-up-contributions-after-50">Catch-Up Contributions After 50</Link></li>
                <li><Link href="/wealth/pre-retirement-5-year-checklist">Your 5-Year Pre-Retirement Checklist</Link></li>
                <li><Link href="/wealth/social-security-explained">Social Security, Explained in Plain English</Link></li>
                <li><Link href="/wealth/rmd-explained-73">RMDs at 73, Explained in Plain English</Link></li>
              </ul>
            </div>
            <div className="w-lib-group" data-reveal>
              <h3>When money is tight</h3>
              <ul>
                <li><Link href="/wealth/broke-money-reset-plan">The Broke Money Reset Plan</Link></li>
              </ul>
            </div>
          </div>
          <div className="w-lib-more">
            <Link href="/ai" className="w-pillar" data-reveal>
              <strong>AI in daily life</strong>
              <span>What AI can actually do for a normal person. Honest about limits.</span>
              <span>Read the guides</span>
            </Link>
            <Link href="/start" className="w-pillar" data-reveal>
              <strong>Get the drops by email</strong>
              <span>One email when something new is built. It comes from me.</span>
              <span>Start here</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="w-section w-band-ink" data-spot>
        <div className="w-shell w-split">
          <div>
            <p className="w-eyebrow">Who&apos;s behind this</p>
            <h2 className="w-h2">I&apos;m Christian. Here&apos;s the honest resume.</h2>
            <p className="w-lede">
              21 years old. Accounting at UNCG. Here are the facts behind the tools.
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

      <section className="w-section" id="drops" style={{ scrollMarginTop: 110 }}>
        <div className="w-shell w-split">
          <div>
            <p className="w-eyebrow">Tool drops</p>
            <h2 className="w-h2">
              Get the next tool <span className="w-mark">the day it drops.</span>
            </h2>
            <p className="w-lede">
              One email when something new is built. It comes from me, not a marketing robot. That&apos;s
              the whole deal.
            </p>
          </div>
          <DropsForm />
        </div>
      </section>

      <Faq items={FAQ} title="Before you start clicking" />

      <div className="w-shell" style={{ paddingBottom: 56 }}>
        <EducationNote />
      </div>
    <TrafficGuideLinks
        slugs={[
          "overtime-tax-deduction-2026",
          "tips-tax-deduction-2026",
          "teen-tax-return-dependent",
          "unemployment-tax-withholding",
          "backdoor-roth-ira-steps",
          "tax-loss-harvesting-wash-sale",
          "i-bonds-vs-tips",
          "credit-utilization-explained",
          "social-security-62-vs-70",
          "roth-ira-mistakes-to-avoid",
          "child-tax-credit-2026",
          "sep-ira-vs-solo-401k",
          "social-security-survivor-benefits",
          "hard-inquiry-vs-soft-inquiry",
        ]}
      />
    </main>
  );
}
