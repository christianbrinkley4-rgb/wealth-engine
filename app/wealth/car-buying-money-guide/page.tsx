import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { EducationNote, Faq, JsonLd, NextUp, PageHead } from "@/app/wealth/ui/shell";
import { wealthArticleJsonLd, wealthMetadata } from "@/lib/wealth/seo";
import { WEALTH_FACTS } from "@/lib/wealth/site";

const path = "/wealth/car-buying-money-guide";
const title = "The Real Cost of Buying a Car";
const description =
  "Total-cost thinking for a car purchase: price, interest, insurance, and how long you keep it.";

export const metadata: Metadata = wealthMetadata({ title, description, path });

const faqItems: Array<{ q: string; a: string }> = [
  {
    q: "Should I focus on the monthly payment or the total price?",
    a: "The total price. A low monthly payment can hide a long loan with heavy interest. Compare the out-the-door price and the loan terms together.",
  },
  {
    q: "Is it better to pay cash for a car?",
    a: "Paying cash skips interest entirely. Financing preserves your cash but adds the cost of credit. The total-cost math tells you the difference.",
  },
  {
    q: "What is an out-the-door price?",
    a: "The full price of the car including taxes and fees, before financing. The FTC suggests getting it in writing before you visit the lot.",
  },
  {
    q: "Do I need a pre-approval?",
    a: "No, but it helps. A pre-approval tells you your APR and max loan amount before a seller quotes you terms.",
  },
];

const sources: Array<{ label: string; href?: string }> = [
  {
    label: "FTC: Financing a Car, consumer tips",
    href: "https://www.ftc.gov/media/79916",
  },
];

export default function CarBuyingMoneyGuidePage() {
  return (
    <main>
      <JsonLd
        data={wealthArticleJsonLd({
          headline: title,
          description,
          path,
          datePublished: "2026-10-08",
          dateModified: "2026-10-08",
        })}
      />
      <PageHead
        eyebrow="Big decisions"
        title={title}
        lede={description}
        crumbs={[{ name: "Car buying", path }]}
      >
        <ul className="w-meta">
          <li>5 min read</li>
          <li>Updated October 8, 2026</li>
          <li>By Christian Brinkley</li>
        </ul>
      </PageHead>

      <article className="w-section-tight">
        <div className="w-shell w-narrow">
          <p className="w-answer">
            <span>Short answer</span>
            A car&apos;s real cost is the price plus interest on the loan, insurance, fuel, and
            maintenance for every year you own it. A longer loan lowers the monthly payment but
            raises the total interest. How long you keep the car changes the math more than almost
            anything else.
          </p>

          <div className="w-prose">
            <section>
              <h2>Think in total cost</h2>
              <p>
                The sticker price is only the starting number. Add interest on the loan, insurance,
                fuel, and maintenance for every year you own it.
              </p>
              <p>
                A car you keep for ten years costs far less per year than the same car kept for
                three.
              </p>
            </section>

            <section>
              <h2>How car loans work</h2>
              <p>
                Financing means paying the price over time, plus <Link href="/wealth/credit-score-basics">the cost of credit</Link>. That cost shows
                up as the APR, the annual percentage rate.
              </p>
              <p>
                A longer loan lowers the monthly payment but <Link href="/tools/debt-payoff">raises the total interest paid</Link>. The FTC
                advises shopping for financing before shopping for the car.
              </p>
              <p>
                A pre-approval gives you an APR and a max amount to compare against seller offers.
              </p>
            </section>

            <section>
              <h2>New vs. used mechanics</h2>
              <p>
                A new car loses value fastest in its earliest years. That early drop is the price of
                being the first owner.
              </p>
              <p>
                A used car skips most of that early drop, so the purchase price is lower. The
                tradeoff is uncertainty: more miles means more wear on parts.
              </p>
              <p>An independent inspection before buying answers most of that question.</p>
            </section>

            <section>
              <h2>Costs after the purchase</h2>
              <p>
                Insurance is required, and full coverage costs more than liability alone. Fuel,
                tires, and routine maintenance run every year you drive.
              </p>
              <p>
                Repairs arrive less predictably, and older cars need them more. <Link href="/tools/budget">Budgeting these as
                yearly costs</Link> keeps the total picture honest.
              </p>
            </section>
          </div>

          <aside className="w-panel" style={{ marginTop: 36 }} aria-label="Try it yourself">
            <p className="w-eyebrow">Now try it · Calculator · 2 min</p>
            <h2 className="w-h3">50/30/20 budget builder</h2>
            <p style={{ margin: "10px 0 0", color: "var(--w-on-ink-muted)" }}>
              A car payment lives inside your monthly budget. Build a 50/30/20 budget and see where
              a payment fits.
            </p>
            <div className="w-btn-row">
              <Link href="/tools/budget" className="w-btn">
                Open it <ArrowRight size={18} aria-hidden />
              </Link>
            </div>
          </aside>

          <div className="w-sources">
            <h2>Sources</h2>
            <ul>
              {sources.map((source) => (
                <li key={source.label}>
                  {source.href ? (
                    <a href={source.href} rel="noopener">
                      {source.label}
                    </a>
                  ) : (
                    source.label
                  )}
                </li>
              ))}
            </ul>
          </div>

          <EducationNote />

          <section className="w-section">
            <div style={{ textAlign: "center" }}>
              <p className="w-eyebrow">Talk it through</p>
              <h2 className="w-h2">Questions about your own money?</h2>
              <p>A free, no-obligation chat with Christian. No pressure and no sales pitch.</p>
              <div className="w-btn-row" style={{ justifyContent: "center" }}>
                <Link href="/start" className="w-btn">
                  Start here <ArrowRight size={18} aria-hidden />
                </Link>
              </div>
              <p style={{ marginTop: 18 }}>
                Christian Brinkley, Greensboro, NC,{" "}
                <a href={WEALTH_FACTS.phoneHref}>{WEALTH_FACTS.phone}</a>
              </p>
            </div>
          </section>
        </div>
      </article>

      <Faq items={faqItems} />
      <NextUp
        title="Read next"
        links={[
          { href: "/wealth", label: "Wealth home", kind: "Hub" },
          { href: "/wealth/credit-cards-beginners", label: "Credit Cards for Beginners", kind: "Article" },
          { href: "/wealth/rent-vs-buy-math", label: "Rent vs. Buy: The Math", kind: "Article" },
        ]}
      />
    </main>
  );
}
