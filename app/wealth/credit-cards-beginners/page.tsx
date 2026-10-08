import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { EducationNote, Faq, JsonLd, NextUp, PageHead } from "@/app/wealth/ui/shell";
import { wealthArticleJsonLd, wealthMetadata } from "@/lib/wealth/seo";
import { WEALTH_FACTS } from "@/lib/wealth/site";

const path = "/wealth/credit-cards-beginners";
const title = "Credit Cards for Beginners";
const description =
  "How credit cards work, how interest adds up, and why paying the full balance changes everything.";

export const metadata: Metadata = wealthMetadata({ title, description, path });

const faqItems: Array<{ q: string; a: string }> = [
  {
    q: "Is one credit card enough to build credit?",
    a: "Yes. One card, used lightly and paid in full each month, builds a solid payment history over time.",
  },
  {
    q: "What happens if I miss a payment?",
    a: "The issuer can charge a late fee and report the late payment to credit bureaus. Your APR can rise too.",
  },
  {
    q: "Does closing a card hurt my credit?",
    a: "It can. Closing a card lowers your total available credit, which can raise the share of credit you use.",
  },
  {
    q: "Are debit cards the same thing?",
    a: "No. A debit card spends money already in your bank account. A credit card borrows money you repay later.",
  },
];

const sources: Array<{ label: string; href?: string }> = [
  {
    label: "CFPB: How does my credit card company calculate the amount of interest I owe?",
    href: "https://consumerfinance.gov:443/ask-cfpb/how-does-my-credit-card-company-calculate-the-amount-of-interest-i-owe-en-51/",
  },
];

export default function CreditCardsBeginnersPage() {
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
        eyebrow="Credit basics"
        title={title}
        lede={description}
        crumbs={[{ name: "Credit cards", path }]}
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
            A credit card lets you borrow money up to a limit and pay it back later. Pay the full
            statement balance by the due date and you pay no interest on purchases. Carry a balance
            and interest accrues daily on what you owe. Your payment history feeds your credit score.
          </p>

          <div className="w-prose">
            <section>
              <h2>How a credit card works</h2>
              <p>
                The card issuer sets a credit limit based on your application. Each purchase draws
                from that limit, and each payment restores it.
              </p>
              <p>
                Every month the issuer sends a statement with your balance, minimum payment, and due
                date. The billing cycle is the period that statement covers: roughly one month.
              </p>
            </section>

            <section>
              <h2>How interest works</h2>
              <p>
                APR stands for annual percentage rate. It is the yearly cost of borrowing. Most
                issuers divide the APR by 365 to get a daily rate, then apply that rate to your
                average balance each day.
              </p>
              <p>
                Interest accrues daily, so a balance grows a little every single day it sits there.
                Cash advances and balance transfers carry separate rates, higher than the purchase
                rate.
              </p>
            </section>

            <section>
              <h2>Why paying in full matters</h2>
              <p>
                Most cards have a grace period on purchases. Pay the full statement balance by the
                due date and you owe no interest on those purchases.
              </p>
              <p>
                Carry any balance and the grace period disappears. New purchases then start accruing
                interest immediately, from the day they post.
              </p>
              <p>
                Paying only the minimum keeps the account current but shrinks the balance slowly.
                The rest of the balance keeps accruing interest.
              </p>
            </section>

            <section>
              <h2>How cards connect to your credit score</h2>
              <p>
                Your credit history is a record of how you handle borrowed money. On-time payments
                build that record. Late payments damage it.
              </p>
              <p>
                The share of your limit you use also matters, so a maxed-out card drags on your
                score. Carrying a balance does not help your score. Paying on time does.
              </p>
            </section>
          </div>

          <aside className="w-panel" style={{ marginTop: 36 }} aria-label="Try it yourself">
            <p className="w-eyebrow">Now try it · Calculator · 3 min</p>
            <h2 className="w-h3">Debt payoff: avalanche vs snowball</h2>
            <p style={{ margin: "10px 0 0", color: "var(--w-on-ink-muted)" }}>
              Credit cards are one type of debt. Add your balances to the calculator and compare both
              payoff paths, in months and in interest.
            </p>
            <div className="w-btn-row">
              <Link href="/wealth/calculators/debt-payoff" className="w-btn">
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
          { href: "/wealth/rent-vs-buy-math", label: "Rent vs. Buy: The Math", kind: "Article" },
          { href: "/wealth/car-buying-money-guide", label: "The Real Cost of Buying a Car", kind: "Article" },
        ]}
      />
    </main>
  );
}
