import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbJsonLd, pageOpenGraph } from "@/lib/seo";
import { PAYCHECK_SOURCES } from "@/lib/wealth/paycheck";
import { PaycheckBreakdown } from "./PaycheckBreakdown";

const path = "/tools/paycheck-breakdown";
const description =
  "See where your paycheck went. PaycheckOS explains federal tax estimates, shows the math, and makes a card you can share.";

export const metadata: Metadata = {
  title: { absolute: "PaycheckOS | Paycheck Breakdown | Christian Brinkley" },
  description,
  alternates: { canonical: path },
  openGraph: pageOpenGraph({ title: "PaycheckOS: where did your paycheck go?", description, path }),
};

export default function PaycheckBreakdownPage() {
  return (
    <main className="p-page pb-16 text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Free tools", path: "/tools" },
              { name: "PaycheckOS", path },
            ]),
          ),
        }}
      />
      <header className="p-hero app-shell max-w-5xl">
        <p className="p-disclosure">
          Education only, not tax advice. Christian Brinkley is not a CPA.
        </p>
        <nav aria-label="Breadcrumb" className="t-hint">
          <Link href="/tools">Free tools</Link> / PaycheckOS
        </nav>
        <p className="t-hero-eyebrow">
          PaycheckOS · <a href={PAYCHECK_SOURCES.withholding}>2026 federal rules</a>
        </p>
        <h1>
          Paycheck landed.
          <br />
          Where did it go?
        </h1>
        <p>
          Paste what you earned and what hit your bank. See the federal tax math and the amount left
          unexplained.
        </p>
      </header>
      <section
        className="app-shell p-workspace max-w-5xl"
        aria-label="Paycheck breakdown calculator"
      >
        <PaycheckBreakdown />
      </section>
      <section className="app-shell p-sources max-w-5xl" aria-labelledby="paycheck-sources">
        <h2 id="paycheck-sources">The rules behind the numbers</h2>
        <p>
          Tax amounts link to their federal source. Your pay amounts and percentages come from the
          entries you provide.
        </p>
        <ul>
          <li>
            <a href={PAYCHECK_SOURCES.withholding}>
              IRS Publication 15-T: Worksheet 1A and standard percentage tables
            </a>
          </li>
          <li>
            <a href={PAYCHECK_SOURCES.socialSecurity}>
              SSA: Social Security rate and yearly wage limit
            </a>
          </li>
          <li>
            <a href={PAYCHECK_SOURCES.medicare}>IRS Publication 15: Medicare payroll rates</a>
          </li>
          <li>
            <a href={PAYCHECK_SOURCES.additionalMedicare}>
              IRS: Additional Medicare withholding and filing thresholds
            </a>
          </li>
        </ul>
        <p>
          Compare this estimate with your pay stub. Ask payroll about any deduction you do not
          recognize.
        </p>
      </section>
    </main>
  );
}
