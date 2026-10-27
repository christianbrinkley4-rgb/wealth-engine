import { RelatedMedicareGuides } from "@/app/components/RelatedMedicareGuides";
import { MedicareByline } from "@/app/components/MedicareByline";
import { pageTwitter } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "@/components/Link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph } from "@/lib/seo";

/**
 * Large-Print Turning 65 Timeline.
 *
 * Designed for seniors: large type, high contrast, single column,
 * print-friendly. A linkable asset libraries and senior centers can
 * share. All timing follows real Medicare Initial Enrollment Period rules.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Turning 65 Timeline: Month-by-Month Medicare Checklist (Large Print)",
  },
  description:
    "A large-print, easy-to-read timeline for turning 65: when your Medicare enrollment window opens, when coverage starts, and the deadlines that matter. Free local help in Greensboro.",
  alternates: { canonical: "/turning-65-timeline" },
  openGraph: pageOpenGraph({
    title: "Turning 65? Here is your month-by-month timeline",
    description:
      "Large-print Medicare timeline: when to enroll, when coverage starts, and the penalties to avoid. Print it and put it on the fridge.",
    path: "/turning-65-timeline",
  }),
  twitter: pageTwitter({
    title: "Turning 65? Here is your month-by-month timeline",
    description:
      "Large-print Medicare timeline: when to enroll, when coverage starts, and the penalties to avoid.",
    path: "/turning-65-timeline",
  }),
};

const TIMELINE = [
  {
    when: "6 months before you turn 65",
    title: "Start learning",
    what: "Take stock of the health coverage you have now. If you are still working, ask your HR department how your employer plan works with Medicare. Start reading about your two main paths: Original Medicare plus a supplement, or a Medicare Advantage plan.",
    why: "Medicare has real deadlines, and the choices are easier when you are not rushed. Six months out gives you time to ask questions and compare without pressure.",
  },
  {
    when: "3 months before you turn 65",
    title: "Your enrollment window opens",
    what: "This is the start of your Initial Enrollment Period. It is a 7-month window: the 3 months before your birthday month, your birthday month, and the 3 months after. Enroll in Medicare Parts A and B now if you want coverage to start on time. Compare your plan options and pick what fits your doctors and prescriptions.",
    why: "Enrolling in these 3 months means your coverage can start on the 1st of the month you turn 65. No gaps, no scrambling.",
  },
  {
    when: "The month you turn 65",
    title: "Coverage can begin",
    what: "If you enrolled in the 3 months before your birthday month, your Medicare coverage starts on the 1st of this month. Make sure your doctors have your new Medicare information. If you chose a Medicare Advantage or Part D drug plan, confirm it is active.",
    why: "Starting coverage on time means no gap between your old coverage and Medicare. Call each doctor's office once to confirm they have your new card on file.",
  },
  {
    when: "3 months after you turn 65",
    title: "Your enrollment window closes",
    what: "Your Initial Enrollment Period ends at the close of the 3rd month after your birthday month. If you have not enrolled in Part B by now and you do not have qualifying employer coverage, you may face a late enrollment penalty and have to wait for the General Enrollment Period (January through March each year).",
    why: "Missing this window is the most expensive mistake in Medicare. The Part B penalty adds 10% to your premium for every full 12-month period you delayed, and it lasts as long as you have Part B.",
  },
] as const;

const WARNINGS = [
  {
    title: "The Part B late penalty is permanent",
    text: "If you delay Part B without qualifying coverage from current employment, your monthly premium goes up 10% for each full year you waited. That higher premium stays with you for as long as you have Part B. There is no going back.",
  },
  {
    title: "Stop HSA contributions when Medicare starts",
    text: "Once you are enrolled in Medicare, even just Part A, you can no longer put money into a Health Savings Account. Contributions made after Medicare starts can trigger tax penalties. Stop contributions the month your Medicare begins.",
  },
  {
    title: "Still working? Check before you delay",
    text: "If you or your spouse has health coverage through current employment at a company with 20 or more employees, you can usually delay Part B without penalty and enroll later under a Special Enrollment Period. Confirm this with your HR department in writing before you decide.",
  },
] as const;

const FAQ = [
  {
    q: "When exactly does my Medicare enrollment window open?",
    a: "Your Initial Enrollment Period is 7 months long. It starts 3 months before the month you turn 65, includes your birthday month, and ends 3 months after. For example, if you turn 65 in June, your window runs from March 1 through September 30.",
  },
  {
    q: "When will my Medicare coverage start?",
    a: "It depends on when you enroll. If you sign up in the 3 months before your birthday month, coverage starts on the 1st of your birthday month. If you enroll during your birthday month or the 3 months after, your start date is later. Enrolling early is the way to avoid a gap.",
  },
  {
    q: "What happens if I miss my enrollment window?",
    a: "You will generally have to wait for the General Enrollment Period, which runs January through March each year, and your coverage would not start until July. You may also owe a Part B late enrollment penalty of 10% for each full 12-month period you delayed. The exception is if you had qualifying employer coverage, which gives you a Special Enrollment Period.",
  },
  {
    q: "Can I delay Medicare if I am still working at 65?",
    a: "Often, yes. If you or your spouse has group health coverage through current employment at an employer with 20 or more employees, you can usually delay Part B without penalty and enroll later when that coverage ends. Get this confirmed by your HR department before you decide, and keep the confirmation.",
  },
  {
    q: "Do I need to do anything about my HSA when I turn 65?",
    a: "Yes. Once your Medicare coverage begins, including Part A, you must stop contributing to your Health Savings Account. You can still use the money already in the account for qualified medical expenses. If you apply for Social Security after 65, Part A can backdate up to 6 months, so plan your last HSA contribution with that in mind.",
  },
] as const;

export default function Turning65TimelinePage() {
  return (
    <main className="bg-white text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Turning 65 timeline", path: "/turning-65-timeline" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Turning 65 timeline: a large-print month-by-month Medicare checklist",
              description:
                "When your Medicare enrollment window opens, when coverage starts, and the deadlines that matter. Large print, easy to read, easy to print.",
              path: "/turning-65-timeline",
              datePublished: "2026-10-13",
              dateModified: "2026-10-13",
            }),
          ),
        }}
      />

      {/* Hero: large type, high contrast, print friendly */}
      <section className="bg-white py-12 print:py-6">
        <div className="app-shell max-w-3xl">
          <p className="text-[22px] font-semibold uppercase tracking-wide text-[var(--color-ink-muted)]">
            Large print · Easy to read · Print this page
          </p>
          <h1 className="mt-4 text-[40px] font-bold leading-tight">
            Your Turning 65 Timeline
          </h1>
          <p className="mt-5 text-[22px] leading-relaxed">
            Turning 65 comes with real deadlines. This page walks you through them
            month by month, in plain language and large print. Print it out and
            stick it on the fridge.
          </p>
          <p className="mt-4 text-[22px] leading-relaxed">
            The key fact: your Medicare enrollment window is{" "}
            <strong>7 months long</strong>. It starts 3 months before the month
            you turn 65 and ends 3 months after.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row print:hidden">
            <Link
              href="/start?topic=medicare&quick=1"
              className="rounded-lg bg-[var(--color-navy)] px-8 py-4 text-center text-[22px] font-semibold text-white"
            >
              Request a free consultation
            </Link>
            <a
              href="tel:+19194086671"
              className="rounded-lg border-2 border-[var(--color-navy)] px-8 py-4 text-center text-[22px] font-semibold"
            >
              Call (919) 408-6671
            </a>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-10 print:py-6">
        <div className="app-shell max-w-3xl">
          <h2 className="text-[32px] font-bold">The timeline</h2>
          <ol className="mt-8 flex flex-col gap-10">
            {TIMELINE.map((step, index) => (
              <li
                key={step.when}
                className="border-t-4 border-[var(--color-navy)] pt-6"
              >
                <p className="text-[20px] font-semibold uppercase tracking-wide text-[var(--color-ink-muted)]">
                  Step {index + 1} · {step.when}
                </p>
                <h3 className="mt-2 text-[30px] font-bold">{step.title}</h3>
                <p className="mt-4 text-[22px] leading-relaxed">
                  <strong>What to do:</strong> {step.what}
                </p>
                <p className="mt-3 text-[22px] leading-relaxed">
                  <strong>Why it matters:</strong> {step.why}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Warnings */}
      <section className="bg-[var(--color-paper)] py-10 print:bg-white print:py-6">
        <div className="app-shell max-w-3xl">
          <h2 className="text-[32px] font-bold">Three things to get right</h2>
          <p className="mt-3 text-[22px] leading-relaxed">
            These are the mistakes I see most often. Each one is avoidable if
            you know about it in time.
          </p>
          <div className="mt-8 flex flex-col gap-8">
            {WARNINGS.map((warning, index) => (
              <div
                key={warning.title}
                className="rounded-xl border-2 border-[var(--color-navy)] bg-white p-6 print:border-black"
              >
                <h3 className="text-[26px] font-bold">
                  {index + 1}. {warning.title}
                </h3>
                <p className="mt-3 text-[22px] leading-relaxed">{warning.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-10 print:py-6">
        <div className="app-shell max-w-3xl">
          <h2 className="text-[32px] font-bold">Common questions about turning 65</h2>
          <dl className="mt-8 flex flex-col gap-8">
            {FAQ.map((item) => (
              <div key={item.q} className="border-t-2 border-gray-300 pt-6">
                <dt className="text-[24px] font-bold">{item.q}</dt>
                <dd className="mt-2 text-[22px] leading-relaxed">{item.a}</dd>
              </div>
            ))}
          </dl>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ)) }}
          />
        </div>
      </section>

      <div className="print:hidden">
        <KitchenTableClose
          heading="Turning 65 soon? Let's walk through it together."
          body="Bring your questions and your current coverage details. I will go through your timeline one step at a time. Free consultation, no obligation, and your family is welcome."
          href="/start?topic=medicare&quick=1"
          label="Request a free consultation →"
        />
      </div>

      <div className="app-shell max-w-3xl pb-12">
        <p className="mb-8 text-[22px] leading-relaxed">
          For a deeper walkthrough of your options, see{" "}
          <Link href="/turning-65" className="underline underline-offset-2">
            my turning 65 guide
          </Link>
          . For free, unbiased counseling, see{" "}
          <Link href="/medicare-help-directory" className="underline underline-offset-2">
            the free Medicare help directory
          </Link>
          .
        </p>
        <ComplianceDisclosure variant="medicare" />
      </div>
      <MedicareByline reviewed="2026-10-13" />
      <RelatedMedicareGuides />
    </main>
  );
}
