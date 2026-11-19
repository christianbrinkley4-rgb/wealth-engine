import { ENGINE_BOOKING_URL } from "@/lib/leadEnginePublic";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, Mail, Phone } from "lucide-react";

import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { AGENT } from "@/lib/agent";
import { breadcrumbJsonLd, pageOpenGraph } from "@/lib/seo";

const title = "Christian Brinkley in the Press | As Featured In";
const description =
  "Where Christian Brinkley's answers have run: Stonebridge Herald and Insurance News. A licensed NC insurance agent in Greensboro, quoted on Medicare, retirement, and insurance in plain language.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/press" },
  openGraph: {
    ...pageOpenGraph({
      title,
      description,
      path: "/press",
    }),
  },
};

const FEATURES = [
  {
    outlet: "Stonebridge Herald",
    date: "November 19, 2026",
    title: "Early Withdrawal from 401k Penalties: 14 Advisers Explain the Costs",
    href: "https://stonebridgeherald.com/article/early-withdrawal-from-401k-penalties/",
    quote:
      "If you left your job at 55 or later, the Rule of 55 can waive the 10 percent penalty on that employer's plan. A first-time home purchase and college costs waive the penalty for IRAs, not for 401(k)s, and that trips people up.",
    note: "Quoted on the exceptions people miss when they take money out of a 401(k) early.",
  },
  {
    outlet: "Insurance News",
    date: "November 17, 2026",
    title: "How Insurance Teams Simplify Coverage Choices",
    href: "https://insurancenews.io/qa/how-insurance-teams-simplify-coverage-choices/",
    quote:
      "If I cannot explain a plan in plain language in about a minute, the client does not understand it yet, no matter how good the brochure looks.",
    note: "Quoted on explaining coverage in plain language, starting with the client, not the brochure.",
  },
  {
    outlet: "Insurance News",
    date: "November 16, 2026",
    title: "How Insurance Teams Help Customers Understand Coverage Changes",
    href: "https://insurancenews.io/qa/how-insurance-teams-help-customers-understand-coverage-changes/",
    quote:
      "I start with their doctors and their prescriptions, and I check those against the plan live, before anything is signed.",
    note: "Quoted on how to explain a coverage change so people know what it means for them.",
  },
] as const;

export default function PressPage() {
  return (
    <main className="ab">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Press", path: "/press" },
            ]),
          ),
        }}
      />

      <section className="ab-hero">
        <div className="shell ab-hero-grid">
          <div className="ab-hero-copy">
            <p className="eyebrow">Press</p>
            <h1>
              As featured in.
            </h1>
            <p className="ab-lede">
              Reporters ask me about Medicare, retirement, and insurance, and I answer the
              same way I talk to clients: plain language, real numbers, no jargon. Here is
              where those answers have run.
            </p>
            <p className="ab-license">
              Licensed agent · {AGENT.licenseLine} · Greensboro, NC
            </p>
            <div className="ab-actions" id="page-hero-actions">
              <a href={AGENT.phoneHref} className="btn btn-outline">
                <Phone size={18} aria-hidden /> <span>Call or text:{" "}<span className="whitespace-nowrap">{AGENT.phone}</span></span>
              </a>
              <Link
                href={ENGINE_BOOKING_URL}
                className="btn"
                target="_blank"
                rel="noopener"
              >
                <CalendarDays size={18} aria-hidden /> Book a 45-minute phone review
              </Link>
              <a href={`mailto:${AGENT.email}`} className="link-draw">
                <Mail size={17} aria-hidden /> <span>Email me</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section-tight" aria-labelledby="press-list-heading">
        <div className="shell">
          <h2 id="press-list-heading" className="ab-h2" data-reveal>
            Recent features.
          </h2>
          <ul className="ab-start-grid">
            {FEATURES.map((feature, index) => (
              <li key={feature.href} data-reveal style={{ "--i": index } as React.CSSProperties}>
                <a
                  href={feature.href}
                  className="card ab-start-card"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="ab-start-num">{feature.outlet}</span>
                  <span className="ab-start-label">{feature.title}</span>
                  <span className="ab-start-text">{feature.date}</span>
                  <span className="ab-start-text">&ldquo;{feature.quote}&rdquo;</span>
                  <span className="ab-start-text">{feature.note}</span>
                  <span className="ab-start-text">
                    Read it on {feature.outlet} <ArrowRight size={18} aria-hidden />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-tight" aria-labelledby="press-reporters-heading">
        <div className="shell">
          <p className="eyebrow" data-reveal>
            For reporters
          </p>
          <h2 id="press-reporters-heading" className="ab-h2" data-reveal>
            Working on a story?
          </h2>
          <p className="ab-lede" data-reveal>
            I answer questions on Medicare, retirement timing, and insurance in plain
            language, on the record. Call or text {AGENT.phone}, or email me, and I will
            get back to you quickly.
          </p>
        </div>
      </section>

      <KitchenTableClose
        heading="What are you trying to figure out?"
        body="Tell me what is on your mind. I can set up a call at no cost and with no obligation about your coverage and next steps."
        href="/start"
        label="Ask your question"
      />
    </main>
  );
}
