import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { EducationNote, Faq, JsonLd, NextUp, PageHead } from "@/app/wealth/ui/shell";
import { wealthArticleJsonLd, wealthMetadata } from "@/lib/wealth/seo";
import { WEALTH_FACTS } from "@/lib/wealth/site";

const path = "/wealth/rent-vs-buy-math";
const title = "Rent vs. Buy: The Math, Minus the Opinions";
const description =
  "The real inputs behind the rent-or-buy decision: PITI, maintenance, closing costs, and how long you stay.";

export const metadata: Metadata = wealthMetadata({ title, description, path });

const faqItems: Array<{ q: string; a: string }> = [
  {
    q: "What does PITI stand for?",
    a: "Principal, interest, taxes, and insurance. Lenders roll all four into one monthly payment.",
  },
  {
    q: "Do I build equity if I rent?",
    a: "No. Rent buys you a place to live for that month. A mortgage payment's principal portion builds your ownership stake.",
  },
  {
    q: "What costs surprise first-time buyers?",
    a: "Closing costs at purchase, plus maintenance and repairs after. The CFPB homebuyer guide in the sources walks through the full list.",
  },
  {
    q: "Is a bigger down payment always better?",
    a: "A bigger down payment shrinks the loan and the monthly payment. It also ties up cash you could use elsewhere. Both sides matter.",
  },
];

const sources: Array<{ label: string; href?: string }> = [
  {
    label: "CFPB: Mortgage Moves, how much can you afford?",
    href: "https://www.consumerfinance.gov/archive/blog/mortgage-moves-how-much-can-you-afford/",
  },
];

export default function RentVsBuyMathPage() {
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
        crumbs={[{ name: "Rent vs. buy", path }]}
      >
        <ul className="w-meta">
          <li>6 min read</li>
          <li>Updated October 8, 2026</li>
          <li>By Christian Brinkley</li>
        </ul>
      </PageHead>

      <article className="w-section-tight">
        <div className="w-shell w-narrow">
          <p className="w-answer">
            <span>Short answer</span>
            Renting means one monthly payment and the landlord handles repairs. Buying means a
            mortgage plus taxes, insurance, and maintenance, and you build equity as you pay down
            the loan. The honest comparison puts every cost of each side on paper for your own
            numbers. This page shows the inputs, not the answer.
          </p>

          <div className="w-prose">
            <section>
              <h2>The rent side</h2>
              <p>
                Rent is the monthly payment, plus any renter&apos;s insurance and utilities not
                included. Repairs belong to the landlord.
              </p>
              <p>Rent can rise at renewal. A lease locks the rate only for its term.</p>
            </section>

            <section>
              <h2>The buy side: PITI</h2>
              <p>
                PITI stands for principal, interest, taxes, and insurance. Principal is the loan
                balance you pay down. Interest is the lender&apos;s charge.
              </p>
              <p>
                Property taxes go to your county or city. Homeowner&apos;s insurance protects the
                property. Lenders combine all four into one monthly payment number.
              </p>
            </section>

            <section>
              <h2>The buy side: everything else</h2>
              <p>
                Closing costs are the fees to complete the purchase, paid once at the start.
                Maintenance and repairs are yours now. Roofs, HVAC systems, and appliances all age.
              </p>
              <p>
                HOA dues apply in many neighborhoods and rise over time. Selling costs money too,
                whenever that day comes.
              </p>
            </section>

            <section>
              <h2>How long you stay</h2>
              <p>
                Buying spreads its one-time costs over the years you live there. A short stay gives
                those costs less time to pay off. A long stay lets equity build as the loan balance
                drops.
              </p>
              <p>Your own timeline is one of the biggest inputs in the math.</p>
            </section>

            <section>
              <h2>Run your own numbers</h2>
              <p>
                <Link href="/tools/budget">List every monthly and one-time cost</Link> on both sides. Use real quotes for taxes,
                insurance, and HOA dues, not guesses.
              </p>
              <p>
                Compare total cost per year of staying, <Link href="/wealth/buying-first-home-money-guide">not just the monthly payment</Link>. This page
                cannot tell you which choice wins. <Link href="/tools/budget">Your numbers can</Link>.
              </p>
            </section>
          </div>

          <aside className="w-panel" style={{ marginTop: 36 }} aria-label="Keep reading">
            <p className="w-eyebrow">Keep reading · Article · 6 min</p>
            <h2 className="w-h3">Buying Your First Home: The Money Guide</h2>
            <p style={{ margin: "10px 0 0", color: "var(--w-on-ink-muted)" }}>
              If the buy side is winning for you, walk through the first-home money guide before you
              start shopping.
            </p>
            <div className="w-btn-row">
              <Link href="/wealth/buying-first-home-money-guide" className="w-btn">
                Read it <ArrowRight size={18} aria-hidden />
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
          { href: "/wealth/buying-first-home-money-guide", label: "Buying Your First Home: The Money Guide", kind: "Article" },
          { href: "/wealth/credit-cards-beginners", label: "Credit Cards for Beginners", kind: "Article" },
        ]}
      />
    </main>
  );
}
