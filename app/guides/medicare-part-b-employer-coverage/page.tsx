import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { GuideCapture } from "@/app/components/GuideCapture";
import { StandaloneRelatedLinks } from "@/app/components/StandaloneRelatedLinks";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * Do I need Medicare Part B if I have employer insurance?
 *
 * Targets "do I need medicare part B if I have employer insurance at 65".
 * The 20-employee rule, the 8-month SEP, and the COBRA trap.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Do I Need Part B If I Have Employer Insurance at 65?",
  },
  description:
    "Working past 65? Whether you need Medicare Part B depends on your employer's size. The 20-employee rule, the 8-month special enrollment period, the COBRA trap.",
  alternates: { canonical: "/guides/medicare-part-b-employer-coverage" },
  openGraph: pageOpenGraph({
    title: "Do I need Part B if I have employer insurance at 65?",
    description:
      "The 20-employee rule decides whether you can delay Part B. How the special enrollment period works and why COBRA does not count.",
    path: "/guides/medicare-part-b-employer-coverage",
  }),
};

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "Do I need Medicare Part B if I am still working at 65?",
    a: "It depends on your employer's size. With 20 or more employees, you can usually delay Part B with no penalty. With fewer than 20, you must enroll at 65 because Medicare becomes your primary insurance.",
  },
  {
    q: "Does COBRA let me delay Medicare Part B?",
    a: "No. COBRA does not count as active employer coverage for delaying Part B. If you are 65 or older on COBRA, enroll in Parts A and B. Otherwise you risk late penalties and coverage gaps.",
  },
  {
    q: "How long is the special enrollment period after my job ends?",
    a: "You get 8 months after your employment or group coverage ends, whichever comes first. Enroll during that window to avoid the Part B late penalty.",
  },
  {
    q: "What if my spouse's employer covers me?",
    a: "The same rules apply. If your spouse is actively working for an employer with 20 or more employees, you can delay Part B under their group coverage. When it ends, your 8-month special enrollment period begins.",
  },
  {
    q: "Should I enroll in Part A while I delay Part B?",
    a: "Premium-free Part A costs nothing, so many people take it. But enrolling in any part of Medicare ends your HSA contribution eligibility. If you have an HSA, weigh that before signing up.",
  },
  {
    q: "What happens if I miss the 8-month special enrollment period?",
    a: "You wait for the General Enrollment Period, January 1 to March 31, with coverage starting July 1. The Part B late penalty may apply for the months you delayed without creditable coverage.",
  },
];

export default function MedicarePartBEmployerCoveragePage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: "/guides/medicare-part-b-employer-coverage" },
              { name: "Part B and employer coverage", path: "/guides/medicare-part-b-employer-coverage" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Do I Need Part B If I Have Employer Insurance at 65?",
              description:
                "Whether to delay Medicare Part B while working: the 20-employee rule, the 8-month special enrollment period, and the COBRA trap.",
              path: "/guides/medicare-part-b-employer-coverage",
              datePublished: "2026-10-08",
              dateModified: "2026-10-08",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }}
      />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Guides" },
          { name: "Part B and employer coverage" },
        ]}
        eyebrow="Guide · Updated October 8, 2026"
        title="Do I need Part B if I have employer insurance at 65?"
        lede="Still working with good health coverage? You may be able to skip Part B for now. One number decides it: how many people your employer has."
        secondaryHref="/start?topic=medicare&stage=turning_65"
        secondaryLabel="Get free help with the timing"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-4xl">
          <div className="rounded-xl border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-6">
            <p className="text-19 font-semibold">In short</p>
            <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
              Part B covers doctor visits and outpatient care, and it has a monthly premium ($202.90
              in 2026). If your employer has 20 or more employees, you can delay Part B while you
              keep working, with no late penalty. Below 20 employees, Medicare becomes primary at
              65 and you must enroll.
            </p>
          </div>

          <h2 className="text-28 mt-12 font-semibold">The 20-employee rule</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left">
              <caption className="sr-only">
                Part B enrollment rules by employer size
              </caption>
              <thead>
                <tr className="border-b-2 border-[var(--color-navy)]">
                  <th scope="col" className="text-16 py-3 pr-4 font-semibold">
                    Employer size
                  </th>
                  <th scope="col" className="text-16 py-3 font-semibold">
                    What to do at 65
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-300 align-top">
                  <th scope="row" className="text-16 py-4 pr-4 font-semibold">
                    20 or more employees
                  </th>
                  <td className="text-16 py-4 leading-relaxed text-[var(--color-ink-muted)]">
                    You can delay Part B with no penalty while you have active group coverage. Your
                    employer plan stays primary. Enroll later through a special enrollment period.
                  </td>
                </tr>
                <tr className="border-b border-gray-300 align-top">
                  <th scope="row" className="text-16 py-4 pr-4 font-semibold">
                    Fewer than 20 employees
                  </th>
                  <td className="text-16 py-4 leading-relaxed text-[var(--color-ink-muted)]">
                    Enroll in Parts A and B at 65. Medicare becomes your primary insurance. Your
                    employer plan pays second. Skipping Part B can leave bills unpaid.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            Federal law also protects you at work. Employers with 20 or more workers must offer you
            the same health benefits at 65 that younger workers get. They cannot push you onto
            Medicare to save money.
          </p>

          <h2 className="text-28 mt-12 font-semibold">The 8-month special enrollment period</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            When your employment ends, or your group coverage ends, an 8-month special enrollment
            period begins. During it you can sign up for Part B with no late penalty. The clock
            starts at whichever happens first: the job ending or the coverage ending. Do not let
            this window pass. After it closes, you wait for the General Enrollment Period and the
            penalty can apply.
          </p>

          <h2 className="text-28 mt-12 font-semibold">The COBRA trap</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            COBRA lets you keep your old employer plan after you leave the job, but it does not
            count as active employer coverage. If you are 65 or older and on COBRA, you still need
            Parts A and B. People who treat COBRA as a reason to delay Part B end up with penalties
            and gaps. Retiree health coverage from a former employer has the same problem.
          </p>

          <h2 className="text-28 mt-12 font-semibold">The HSA wrinkle</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Enrolling in premium-free Part A sounds free, and the premium is. But any Medicare
            enrollment ends your HSA contribution eligibility. If you fund an HSA through work,
            delaying Part A along with Part B keeps the HSA alive.{" "}
            <Link
              href="/guides/medicare-hsa-contributions"
              className="underline underline-offset-2"
            >
              Here are the full HSA and Medicare rules
            </Link>
            .
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Turning 65 soon?{" "}
            <Link href="/turning-65" className="underline underline-offset-2">
              Here is the full turning-65 walkthrough
            </Link>
            . Leaving a job changes more than health coverage:{" "}
            <Link href="/special-enrollment" className="underline underline-offset-2">
              here is how special enrollment periods work
            </Link>
            .
          </p>
          <GuideTownLinks />
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Common questions</h2>
          <dl className="mt-8 flex flex-col gap-6">
            {FAQS.map((item) => (
              <div key={item.q} className="border-t border-gray-300 pt-5">
                <dt className="text-19 font-semibold">{item.q}</dt>
                <dd className="text-17 mt-1 leading-relaxed text-[var(--color-ink-muted)]">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
          <p className="text-17 mt-8 leading-relaxed text-[var(--color-ink-muted)]">
            Working past 65 and unsure what to enroll in? Call or text Christian Brinkley in
            Greensboro, NC at {AGENT.phone}. The review is free, with no obligation.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <StandaloneRelatedLinks slug="medicare-part-b-employer-coverage" />
          <GuideCapture />
        </div>
      </section>

      <KitchenTableClose
        heading="Time your Medicare start around your work"
        body={`Tell me about your employer coverage and your retirement date. We will map the enrollment steps so you skip the penalties. Call or text ${AGENT.phone}.`}
        href="/start?topic=medicare&stage=turning_65"
        label="Get free help with the timing"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
