import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calculator, LineChart, Percent } from "lucide-react";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { RetirementTimeline } from "@/components/RetirementTimeline";
import { articleText } from "@/lib/articles";
import { breadcrumbJsonLd, pageOpenGraph } from "@/lib/seo";
import { TAX_ARTICLES } from "@/lib/taxArticles";

const title = "Taxes & Retirement in Plain English | Christian Brinkley, Greensboro";
const description =
  "Plain-English explainers on Social Security taxes, RMDs, Roth conversions, and how retirement income affects Medicare costs. Educational, not tax advice.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/taxes-and-retirement" },
  openGraph: pageOpenGraph({ title: "Taxes & retirement, in plain English", description, path: "/taxes-and-retirement" }),
};

const TOOLS = [
  {
    icon: Calculator,
    href: "/roth-window",
    title: "Roth conversion window",
    text: "How many lower-income years you might have before RMDs start.",
  },
  {
    icon: LineChart,
    href: "/plan",
    title: "Conversion and Medicare timing",
    text: "Line up conversions with the years Medicare looks at your income.",
  },
  {
    icon: Percent,
    href: "/medicare",
    title: "Part B and IRMAA estimate",
    text: "See what your income could mean for your Medicare premiums.",
  },
] as const;

export default function TaxesAndRetirementPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Taxes & retirement", path: "/taxes-and-retirement" },
            ]),
          ),
        }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Taxes & retirement" }]}
        eyebrow="Taxes & retirement"
        title="The tax side of retirement, in plain English."
        lede="I’m an insurance agent today and an accounting student on the CPA track. This is where I explain how retirement income gets taxed, and how it connects to what Medicare costs you. Educational, not tax advice."
        secondaryHref="/start?topic=financial_planning"
        secondaryLabel="Ask me a question"
        proof={[
          "Plain English, with sources",
          "How taxes connect to Medicare costs",
          "No products pitched on these pages",
          "Free to read. No email wall.",
        ]}
      />

      <section className="section tr-timeline" aria-labelledby="tr-timeline-heading">
        <div className="shell">
          <div className="section-head split">
            <div>
              <p className="eyebrow" data-reveal>
                The retirement timeline
              </p>
              <h2 id="tr-timeline-heading" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
                The birthdays that <em>change the rules.</em>
              </h2>
            </div>
            <p data-reveal style={{ "--i": 2 } as React.CSSProperties}>
              Retirement isn’t one date. It’s a string of ages where the tax and benefit rules
              shift. Scroll through them. The one at 63 surprises almost everybody.
            </p>
          </div>
          <RetirementTimeline />
        </div>
      </section>

      <section className="section-tight tr-explainers" aria-labelledby="tr-explainers-heading">
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow" data-reveal>
              Explainers
            </p>
            <h2 id="tr-explainers-heading" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
              Start with the question you have.
            </h2>
          </div>
          <ul className="lib-grid">
            {TAX_ARTICLES.map((article, index) => (
              <li key={article.slug} data-reveal style={{ "--i": index } as React.CSSProperties}>
                <Link href={`/taxes-and-retirement/${article.slug}`} className="card lib-card">
                  <span className="lib-kind">
                    Explainer ·{" "}
                    {Math.max(2, Math.round(articleText(article).split(/\s+/).length / 220))} min
                    read
                  </span>
                  <span className="lib-title">{article.title}</span>
                  <span className="lib-blurb">{article.lede}</span>
                  <ArrowRight size={20} className="lib-arrow" aria-hidden />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-tight tr-tools" aria-labelledby="tr-tools-heading">
        <div className="shell">
          <div className="section-head">
            <p className="eyebrow" data-reveal>
              Tools
            </p>
            <h2 id="tr-tools-heading" data-reveal style={{ "--i": 1 } as React.CSSProperties}>
              Run your own numbers.
            </h2>
          </div>
          <ul className="tr-tool-grid">
            {TOOLS.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <li key={tool.href} data-reveal style={{ "--i": index } as React.CSSProperties}>
                  <Link href={tool.href} className="card tr-tool">
                    <span className="sit-icon" aria-hidden>
                      <Icon size={22} strokeWidth={1.75} />
                    </span>
                    <span>
                      <span className="tr-tool-title">{tool.title}</span>
                      <span className="tr-tool-text">{tool.text}</span>
                    </span>
                    <ArrowRight size={20} className="tr-tool-arrow" aria-hidden />
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="tr-honest" data-reveal>
            <h3>What I can and can’t do here</h3>
            <p>
              I can explain how these rules work, and how your income choices connect to your
              Medicare premiums and coverage. I’m not a CPA yet, and I don’t prepare tax returns or
              give investment advice. When your question needs that, I’ll say so, and I can
              introduce you to the advisor I work with.
            </p>
          </div>
        </div>
      </section>

      <KitchenTableClose
        heading="Not sure where your situation fits?"
        body="Tell me what you’re weighing. I’ll explain what I can, and point you to the right person for the rest."
        href="/start?topic=financial_planning"
        label="Ask me a question"
      />

      <div className="shell pb-12">
        <ComplianceDisclosure showEstimateNote />
      </div>
    </main>
  );
}
