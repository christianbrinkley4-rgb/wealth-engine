import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { MedicareByline } from "@/app/components/MedicareByline";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import { breadcrumbJsonLd, pageOpenGraph, pageTwitter } from "@/lib/seo";

import { ChecklistActions, DeadlineNote } from "./ChecklistActions";

/**
 * One-page, shareable State Health Plan checklist for the Nov 6, 2026 deadline.
 *
 * Every fact here comes from /guides/nc-state-health-plan-medicare, which was
 * verified against shpnc.gov, the NC Treasurer's Oct 14 release, the Oct 27
 * Atrium agreement (WFDD / NC Newsroom, NC Health News) and Becker's (June 8).
 * Change a fact there first, then here. Built for Facebook and Nextdoor posts:
 * short slug, one screen per step, prints on one or two sheets.
 * After Nov 6, 2026 DeadlineNote says the window closed; retire or rewrite then.
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
    title: "On the 70/30 plan? Decide before November 6",
    body: (
      <>
        If you&apos;re on the 70/30 plan and do nothing, you&apos;re moved to the Base Medicare
        Advantage plan for 2027. To stay on the 70/30 plan, you have to choose it before November 6.
      </>
    ),
  },
  {
    title: "On a Medicare Advantage plan and happy? You can stay put",
    body: (
      <>
        If you&apos;re already on the Base or Enhanced plan and do nothing, you stay on the plan you
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
        Forest Baptist, are in network for 2027 in the plan&apos;s middle &ldquo;access&rdquo; tier.
        Not sure how your plan treats your doctors? Call the State Health Plan Medicare Support
        Center at <span className="whitespace-nowrap">833-429-5003</span>.
      </>
    ),
  },
  {
    title: "Check what you could pay",
    body: (
      <>
        The most you can pay in a year goes from $4,000 to $4,500 on the Base plan and from $3,300
        to $3,700 on the Enhanced plan. There&apos;s also a new $50 copay for Part B drugs.
      </>
    ),
  },
  {
    title: "Make any change online by November 6",
    body: (
      <>
        Changes are made in eBenefits on shpnc.gov. Questions about eligibility or enrolling go to
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
        November 6 is the State Health Plan&apos;s deadline. Medicare&apos;s Annual Enrollment,
        October 15 to December 7, is a different window, for people with their own Medicare plans.
      </>
    ),
  },
];

export const metadata: Metadata = {
  title: { absolute: "NC State Health Plan Retiree Checklist: Nov. 6, 2026 Deadline" },
  description:
    "A one-page checklist for NC state retirees on Medicare before the State Health Plan's November 6 deadline: the 70/30 auto-move, Atrium's 2027 status, new out-of-pocket limits, and who to call.",
  alternates: { canonical: PATH },
  openGraph: pageOpenGraph({
    title: "State retirees: your Nov. 6 checklist",
    description:
      "Seven quick checks before the State Health Plan's November 6 deadline. Print it or send it to a friend.",
    path: PATH,
  }),
  twitter: pageTwitter({
    title: "State retirees: your Nov. 6 checklist",
    description:
      "Seven quick checks before the State Health Plan's November 6 deadline. Print it or send it to a friend.",
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
              { name: "Nov. 6 checklist", path: PATH },
            ]),
          ),
        }}
      />

      <div className="print-hide">
        <ServiceHero
          crumbs={[
            { name: "Home", href: "/" },
            { name: "State retirees and Medicare", href: GUIDE },
            { name: "Nov. 6 checklist" },
          ]}
          eyebrow="NC State Health Plan · Updated October 27, 2026"
          title="State retirees on Medicare: your November 6 checklist"
          lede="Seven quick checks before the State Health Plan's open enrollment closes. Print it, or send it to a friend who retired from the schools or the state."
          secondaryHref="/start?topic=medicare&quick=1"
          secondaryLabel="Rather talk it through? Ask me"
        />
      </div>

      <section className="bg-white py-12">
        <div className="measure-prose app-shell max-w-3xl">
          <div className="print-only">
            <p className="text-24 font-bold">
              State retirees on Medicare: your November 6 checklist
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
          body={`Book a free phone review and I'll walk through the three options with you before November 6. Call or text ${AGENT.phone}.`}
          href="/start?topic=medicare&quick=1"
          label="Request a free review"
        />
      </div>

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
      <MedicareByline reviewed="2026-10-27" />
    </main>
  );
}
