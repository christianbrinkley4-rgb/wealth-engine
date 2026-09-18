import type { Metadata } from "next";
import Link from "next/link";
import { MedicareTimeline } from "@/components/MedicareTimeline";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { LeadCluster } from "@/app/components/LeadCluster";
import { ServiceHero } from "@/app/components/ServiceHero";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  howToJsonLd,
  pageOpenGraph,
  serviceJsonLd,
} from "@/lib/seo";

/**
 * The indexed Turning 65 page. The paid-traffic twin is /lp/turning-65
 * (noindex). This one is for search and for assistants: the seven-month
 * window, when coverage actually starts, the Medigap window most people miss,
 * and a local agent who will sit down and walk through it.
 */

export const metadata: Metadata = {
  title: { absolute: "Turning 65? Medicare Initial Enrollment in Greensboro, NC" },
  description:
    "Build your Medicare timeline around employer coverage, HSA contributions, Part B, Medigap, and a younger spouse with a local Greensboro agent.",
  alternates: { canonical: "/turning-65" },
  openGraph: pageOpenGraph({
    title: "Turning 65: your Medicare window, explained for Greensboro",
    description:
      "The seven-month Initial Enrollment Period, when coverage starts on time, and the six-month Medigap window you generally get once.",
    path: "/turning-65",
  }),
};

const STEPS = [
  {
    t: "Find the month you turn 65",
    b: "Your Initial Enrollment Period usually covers seven months: the three months before the month you turn 65, your birthday month, and the three months after. If your birthday is on the first of the month, the dates shift one month earlier.",
  },
  {
    t: "Enroll in the three months before your birthday month if you want coverage on time",
    b: "For most people, enrolling before the birthday month allows Part B to begin when they turn 65. Enrolling during or after that month generally means coverage begins the following month. Use the date tool below to check your estimated timeline.",
  },
  {
    t: "Know the Part B late penalty before you delay",
    b: "Miss the window without coverage that lets you delay, and the penalty is 10% of the standard Part B premium for every full 12 months of delay, charged for as long as you hold Part B. It is permanent. The usual exception is still working, with a group health plan based on current employment — yours or your spouse’s. A retiree plan does not count, and neither does COBRA.",
  },
  {
    t: "Mark the six-month Medigap window separately",
    b: "Your Medigap open enrollment period begins the first month you’re 65 or older and enrolled in Part B. It lasts six months and provides protections when buying a policy. Other protections may apply in certain situations, so check before changing coverage later.",
  },
] as const;

const FAQ = [
  {
    q: "When does my Medicare Initial Enrollment Period start?",
    a: "Three months before the month you turn 65. It includes that birthday month and the three months after, for seven months total. Coverage starts on time only if you enroll in the first three months of that window.",
  },
  {
    q: "I am still working. Do I have to sign up at 65?",
    a: "Not always. If you have a group health plan based on current employment — yours or your spouse’s — you can usually delay Part B without the late penalty, and you get a special enrollment period when that job-based coverage ends. Retiree coverage and COBRA do not count the same way: Medicare does not treat COBRA as coverage based on current employment. This is worth checking against your actual plan, not a rule of thumb.",
  },
  {
    q: "What is the difference between turning 65 and annual enrollment?",
    a: "Your Initial Enrollment Period is based on your 65th birthday. Annual enrollment, from October 15 to December 7, is a separate opportunity to review or change Medicare Advantage and Part D coverage. We can help you identify the dates that apply to you.",
  },
  {
    q: "Can I keep my doctor?",
    a: "Original Medicare lets you see providers who accept Medicare. Medicare Advantage plans generally use networks. We can check your doctors and hospitals for the specific plan and year you’re considering.",
  },
  {
    q: "Do you meet in person in Greensboro?",
    a: "We can meet at your home, at a convenient public location, or by phone. Your consultation is no cost, with no obligation to enroll. You’ll work directly with me.",
  },
  {
    q: "What does this cost?",
    a: "Nothing to sit down and walk through your dates, your doctors, and your options. If you enroll in a plan through me, the insurance company pays a commission. Your premium is not higher for using an agent.",
  },
] as const;

export default function Turning65Page() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Turning 65", path: "/turning-65" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Turning 65: your Medicare Initial Enrollment Period in Greensboro",
              description:
                "The seven-month window, when coverage starts on time, the Part B late penalty, and the six-month Medigap window you generally get once.",
              path: "/turning-65",
              datePublished: "2026-08-31",
              dateModified: "2026-09-10",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            howToJsonLd({
              name: "How to use your Medicare Initial Enrollment Period when you turn 65",
              description:
                "The four things to get right in the seven-month window around your 65th birthday.",
              path: "/turning-65",
              steps: STEPS.map((step) => ({ name: step.t, text: step.b })),
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd({
              name: "Medicare Initial Enrollment (Turning 65)",
              description:
                "In-person review of the seven-month Initial Enrollment Period in the Piedmont Triad. Free consultation. No obligation.",
              path: "/turning-65",
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Turning 65" }]}
        eyebrow="Initial Enrollment Period · Greensboro, NC"
        title="Build your Medicare timeline before 65"
        lede="You don’t have to sort out Medicare on your own. We can review when to enroll, how your current coverage fits, and the doctors and prescriptions you want covered. I’ll help you understand your next steps."
        secondaryHref="/start?topic=medicare&stage=turning_65_soon"
        secondaryLabel="Request a consultation →"
        note={
          <>
            Turning 65? We’ll spend at least one hour reviewing your enrollment timing, current
            coverage, doctors, and questions. No cost. No obligation. Or{" "}
            <Link href="#enrollment-dates" className="font-medium underline underline-offset-2">
              see your estimated enrollment dates without sharing contact details
            </Link>
            .
          </>
        }
      />

      <section
        id="enrollment-dates"
        className="personal-shell py-12"
        aria-label="Find your Medicare enrollment dates"
      >
        <MedicareTimeline currentYear={new Date().getUTCFullYear()} />
      </section>
      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">The four things to get right</h2>
          <ol className="mt-8 flex flex-col gap-6">
            {STEPS.map((item, index) => (
              <li key={item.t} className="flex gap-5 border-t border-gray-300 pt-5">
                <span className="text-18 flex size-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy)] font-bold text-[var(--color-paper)]">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-20 font-semibold">{item.t}</h3>
                  <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                    {item.b}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          {/* Someone who has already missed the window needs to hear that
              there is another door, not only that this one closed. */}
          <p className="text-17 mt-8 leading-relaxed text-[var(--color-ink-muted)]">
            If your seven-month window has already passed, there is a General Enrollment Period
            every year from January 1 through March 31, and Part B coverage starts the month after
            you sign up. A late penalty can still apply —{" "}
            <Link href="/part-b-penalty" className="font-medium underline underline-offset-2">
              work out what it would cost in your case
            </Link>
            , and see{" "}
            <Link href="/medicare-costs-2026" className="font-medium underline underline-offset-2">
              what the premiums and deductibles are this year
            </Link>
            .{" "}
            <a
              href="https://www.medicare.gov/basics/get-started-with-medicare/sign-up/when-does-medicare-coverage-start"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-2"
            >
              Medicare.gov explains when coverage starts
            </a>
            .
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">
            {" "}
            Your doctors and the plans available where you live{" "}
          </h2>
          <p className="text-18 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Medicare Advantage options can vary by county. A personal review starts with where you
            live, the doctors you see, and the care you need. We’ll check prescription coverage
            too.{" "}
          </p>
          <p className="text-18 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Provider networks and prescription coverage can change. Check the doctors and
            medications you need for the plan year you’re considering.{" "}
          </p>
          <GuideTownLinks />
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Already on Medicare instead?</h2>
          <p className="text-18 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Already on Medicare? Annual enrollment runs from October 15 through December 7. It’s a
            chance to review your coverage for the coming year and decide whether to keep it or make
            a change.{" "}
          </p>
          <p className="text-17 mt-4">
            <Link href="/annual-enrollment" className="font-medium underline underline-offset-2">
              Medicare annual enrollment →
            </Link>
          </p>
          <LeadCluster current="/turning-65" heading="More help as you prepare for retirement" />
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Questions people ask before they turn 65</h2>
          <dl className="mt-8 flex flex-col gap-7">
            {FAQ.map((item) => (
              <div key={item.q} className="border-t border-gray-300 pt-6">
                <dt className="text-19 font-semibold">{item.q}</dt>
                <dd className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ)) }}
          />
        </div>
      </section>

      <KitchenTableClose
        heading="Ready to review your Medicare timeline?"
        body="Request a consultation and we’ll spend at least one hour on your enrollment timing, current coverage, doctors, and questions. Meet in person or by phone. No cost. No obligation. A request needs confirmation and is not a reserved appointment."
        href="/start?topic=medicare&stage=turning_65_soon"
        label="Request a consultation →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
