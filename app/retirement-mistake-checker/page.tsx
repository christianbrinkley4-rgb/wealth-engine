import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { MedicareByline } from "@/app/components/MedicareByline";
import { ServiceHero } from "@/app/components/ServiceHero";
import { breadcrumbJsonLd, faqJsonLd, pageOpenGraph, pageTwitter } from "@/lib/seo";

import { CheckerForm } from "./CheckerForm";

/**
 * Retirement mistake checker. Logic and sources: lib/retirementChecker.ts.
 * Runs entirely in the browser; nothing is stored or submitted.
 */

const PATH = "/retirement-mistake-checker";
const UPDATED = "2026-11-05";
const TITLE = "Retirement Mistake Checker: Medicare, HSA, COBRA & IRMAA Traps";
const DESCRIPTION =
  "Answer a few questions and see which costly Medicare, Social Security and tax traps apply to you: the Part B penalty, COBRA, HSA contributions, Roth conversions and IRMAA.";

const TRAPS = [
  {
    q: "Can COBRA cause a Medicare penalty?",
    a: "Yes. Only coverage from a current job lets you delay Part B. Your 8-month window to sign up starts when the job ends, even if you choose COBRA. Miss it and the Part B late penalty is 10% for each full year, usually for as long as you have Part B.",
  },
  {
    q: "When should I stop contributing to my HSA before Medicare?",
    a: "Six months before you apply for Medicare or Social Security. If you sign up after 65, Part A can start up to 6 months before you apply, and HSA contributions during those months can bring a tax penalty.",
  },
  {
    q: "Can a Roth conversion raise my Medicare premium?",
    a: "It can. Medicare's income-related surcharge (IRMAA) uses your tax return from two years earlier, so a large conversion this year can raise your Part B and Part D premiums two years from now.",
  },
  {
    q: "Is my information saved?",
    a: "No. The checker runs on your own device. Nothing you enter is stored or sent anywhere.",
  },
];

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: pageOpenGraph({
    title: "Free retirement mistake checker",
    description:
      "See which Medicare, HSA, COBRA and IRMAA traps apply to you in about two minutes. Nothing is saved.",
    path: PATH,
  }),
  twitter: pageTwitter({
    title: "Free retirement mistake checker",
    description:
      "See which Medicare, HSA, COBRA and IRMAA traps apply to you in about two minutes. Nothing is saved.",
    path: PATH,
  }),
};

const APP_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Retirement Mistake Checker",
  url: `https://christianbrinkleync.com${PATH}`,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Any",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: DESCRIPTION,
};

const P = "text-17 leading-relaxed text-[var(--color-ink-muted)]";

export default function RetirementMistakeCheckerPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Retirement mistake checker", path: PATH },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(TRAPS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(APP_JSON_LD) }}
      />

      <ServiceHero
        variant="compact"
        crumbs={[{ name: "Home", href: "/" }, { name: "Retirement mistake checker" }]}
        eyebrow="Free tool · About 2 minutes · Nothing saved"
        title="Check for the retirement mistakes that cost real money"
        lede="Medicare, Social Security, taxes and health coverage each have their own rules. The expensive mistakes happen where they collide. Answer a few questions and see which ones apply to you."
        secondaryHref="/start?topic=medicare&quick=1"
        secondaryLabel="Or ask me directly"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-2xl">
          <CheckerForm />

          <h2 className="text-28 mt-16 font-semibold">The traps it checks</h2>
          <div className="mt-4 space-y-6">
            {TRAPS.slice(0, 3).map((item) => (
              <div key={item.q}>
                <h3 className="text-19 font-semibold">{item.q}</h3>
                <p className={`${P} mt-2`}>{item.a}</p>
              </div>
            ))}
            <div>
              <h3 className="text-19 font-semibold">And a few more</h3>
              <p className={`${P} mt-2`}>
                Your first sign-up window, small-employer coverage where Medicare pays first,
                Marketplace savings that end with Part A, the one-time Medigap window, lowering a
                surcharge after retirement or a spouse&apos;s death, and Social Security held back
                when you work while collecting before full retirement age. Each result links to the
                official source and to a plain-English guide like{" "}
                <Link href="/part-b-penalty" className="underline underline-offset-2">
                  how the Part B penalty works
                </Link>
                .
              </p>
            </div>
          </div>

          <p className="text-15 mt-12 leading-relaxed text-[var(--color-ink-muted)]">
            This tool is educational. It doesn&apos;t recommend a plan, and it isn&apos;t tax or
            legal advice. Surcharge estimates use 2026 Medicare brackets, which change every year.
            Rules checked against Medicare.gov, HealthCare.gov and the Social Security
            Administration on November 5, 2026.
          </p>
        </div>
      </section>

      <ComplianceDisclosure variant="medicare" />
      <MedicareByline reviewed={UPDATED} />
    </main>
  );
}
