import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { MedicareByline } from "@/app/components/MedicareByline";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import { ENGINE_BOOKING_URL } from "@/lib/leadEnginePublic";
import { breadcrumbJsonLd, pageOpenGraph, pageTwitter } from "@/lib/seo";

import { ChecklistActions, DeadlineNote } from "./ChecklistActions";

/**
 * One-page, shareable State Health Plan checklist for 2027 retiree coverage.
 *
 * Every fact here comes from /guides/nc-state-health-plan-medicare, which was
 * verified against shpnc.gov, the NC Treasurer's Oct 14 release, the Oct 27
 * Atrium agreement (WFDD / NC Newsroom, NC Health News) and Becker's (June 8).
 * Change a fact there first, then here. Built for Facebook and Nextdoor posts:
 * short slug, one screen per step, prints on one or two sheets.
 * Open enrollment closed Nov 6, 2026; deadline steps are in past tense (Nov 9).
 * DeadlineNote also says the window closed.
 */

const PATH = "/state-health-plan-checklist";
const GUIDE = "/guides/nc-state-health-plan-medicare";

const STEPS: ReadonlyArray<{ title: string; body: React.ReactNode }> = [
  {
    title: "Know which plan you're on now",
    body: (
      <>
        Retirees on Medicare are on one of three State Health Plan options: the Base Medicare
        Advantage plan, the Enhanced Medicare Advantage plan, or the 70/30 plan. You can see yours
        when you log in to eBenefits through shpnc.gov.
      </>
    ),
  },
  {
    title: "On the 70/30 plan? The deadline was November 6",
    body: (
      <>
        If you were on the 70/30 plan and did nothing, you were moved to the Base Medicare
        Advantage plan for 2027. To stay on the 70/30 plan, you had to choose it by November 6, 2026.
      </>
    ),
  },
  {
    title: "On a Medicare Advantage plan? If you did nothing, you stayed put",
    body: (
      <>
        If you were already on the Base or Enhanced plan and did nothing, you stayed on the plan you
        have.
      </>
    ),
  },
  {
    title: "Check your doctors",
    body: (
      <>
        The 70/30 plan uses a three-tier provider network in 2027, and the tier your doctor is in
        can change what you pay. Atrium Health update, October 27: Atrium and the State Health Plan
        reached an agreement, so all Atrium doctors and hospitals, including Atrium Health Wake
        Forest Baptist, are in network for 2027 in the plan&apos;s middle &ldquo;access&rdquo; tier,
        at about today&apos;s costs. Not sure how your plan treats your doctors? Call the State
        Health Plan Medicare Support Center at <span className="whitespace-nowrap">833-429-5003</span>.
      </>
    ),
  },
  {
    title: "Check what you could pay",
    body: (
      <>
        The medical out-of-pocket limit, the most you can pay for medical care in a year, goes
        from $4,000 to $4,500 on the Base plan and from $3,300 to $3,700 on the Enhanced plan. Drug
        costs have a separate out-of-pocket limit. There&apos;s also a new $50 copay for Part B
        drugs on both plans.
      </>
    ),
  },
  {
    title: "Changes were due online by November 6",
    body: (
      <>
        The deadline to change plans was November 6, 2026. Changes were made in eBenefits on
        shpnc.gov. Questions about eligibility or enrolling go to
        the State Health Plan at <span className="whitespace-nowrap">855-859-0966</span>. The
        Medicare Support Center (<span className="whitespace-nowrap">833-429-5003</span>) can answer
        questions about the plans, but it can&apos;t enroll you in a different one.
      </>
    ),
  },
  {
    title: "Don't mix up the two deadlines",
    body: (
      <>
        November 6 was the State Health Plan&apos;s deadline. Medicare&apos;s Annual Enrollment,
        October 15 to December 7, is a different window, for people with their own Medicare plans.
      </>
    ),
  },
];

export const metadata: Metadata = {
  title: { absolute: "NC State Health Plan Retiree Checklist for 2027" },
  description:
    "A one-page checklist for NC state retirees on Medicare: what changed for 2027, Atrium's network status, out-of-pocket limits, and who to call with questions.",
  alternates: { canonical: PATH },
  openGraph: pageOpenGraph({
    title: "State retirees on Medicare: your 2027 checklist",
    description:
      "Quick checks on your 2027 State Health Plan coverage, and who to call. Print it or send it to a friend.",
    path: PATH,
  }),
  twitter: pageTwitter({
    title: "State retirees on Medicare: your 2027 checklist",
    description:
      "Quick checks on your 2027 State Health Plan coverage, and who to call. Print it or send it to a friend.",
    path: PATH,
  }),
};

export default function StateHealthPlanChecklistPage() {
  return (
    <main className="text-[var(--color-navy)]" data-shp-checklist>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "State retirees and Medicare", path: GUIDE },
              { name: "Retiree checklist", path: PATH },
            ]),
          ),
        }}
      />

      <div className="print-hide">
        <ServiceHero
          crumbs={[
            { name: "Home", href: "/" },
            { name: "State retirees and Medicare", href: GUIDE },
            { name: "Retiree checklist" },
          ]}
          eyebrow="NC State Health Plan · Updated October 27, 2026"
          title="State retirees on Medicare: your 2027 checklist"
          lede="Quick checks on your 2027 State Health Plan coverage. Open enrollment closed November 6, 2026. Print it, or send it to a friend who retired from the schools or the state."
          secondaryHref="/start?topic=medicare&quick=1"
          secondaryLabel="Rather talk it through? Ask me"
        />
      </div>

      <section className="bg-white py-12">
        <div className="measure-prose app-shell max-w-3xl">
          <div className="print-only">
            <p className="text-24 font-bold">
              State retirees on Medicare: your 2027 checklist
            </p>
            <p className="text-15 mt-1 mb-4">
              NC State Health Plan · Updated October 27, 2026 ·
              christianbrinkleync.com/state-health-plan-checklist
            </p>
          </div>
          <DeadlineNote />
          <ol className="flex flex-col gap-4">
            {STEPS.map((step, index) => (
              <li
                key={step.title}
                className="rounded-xl border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-5"
              >
                <p className="text-19 flex items-start gap-3 font-semibold">
                  <span
                    aria-hidden
                    className="text-15 mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-md border-2 border-[var(--color-navy)] bg-white"
                  >
                    {index + 1}
                  </span>
                  <span>{step.title}</span>
                </p>
                <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>

          <p className="text-17 mt-6 rounded-xl border-2 border-[var(--color-navy)] bg-white p-4 leading-relaxed">
            <strong>Warning:</strong> if you join a Medicare Advantage plan or a Part D drug plan
            outside the State Health Plan, your State Health Plan Medicare Advantage coverage is
            cancelled and you are moved to the 70/30 plan.
          </p>

          <ChecklistActions />

          <p className="text-17 mt-10 leading-relaxed text-[var(--color-ink-muted)]">
            Want the details behind each step?{" "}
            <Link href={GUIDE} className="font-semibold underline underline-offset-2">
              Read the full State Health Plan guide
            </Link>
            . Hired by the state on or after January 1, 2021? You aren&apos;t eligible for retiree
            medical coverage, so your Medicare choices are on the open market:{" "}
            <Link href="/turning-65" className="underline underline-offset-2">
              start with the turning 65 guide
            </Link>
            .
          </p>
          <p className="text-15 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            Sources: State Health Plan 2027 open enrollment page for Medicare members (shpnc.gov);
            NC Department of State Treasurer, October 14, 2026; WFDD / NC Newsroom and North
            Carolina Health News, October 27, 2026; Becker&apos;s Payer Issues, June 8, 2026.
            Confirm anything that matters to you with the State Health Plan.
          </p>
        </div>
      </section>

      <p className="print-only measure-prose app-shell text-15 mt-4">
        Questions? Christian Brinkley, licensed insurance agent, Greensboro · {AGENT.phone} ·
        christianbrinkleync.com
      </p>
      <div className="print-hide">
        <KitchenTableClose
          heading="Want someone to go through it with you?"
          body={`Book a phone review and I'll walk through your 2027 coverage with you. Call or text ${AGENT.phone}.`}
          href={ENGINE_BOOKING_URL}
          label="Request a review"
        />
      </div>

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
      <MedicareByline reviewed="2026-10-27" />
    </main>
  );
}
