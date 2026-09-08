import type { Metadata } from "next";
import Link from "next/link";

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
      "The seven-month Initial Enrollment Period, when coverage starts on time, and the Medigap window that does not reopen.",
    path: "/turning-65",
  }),
};

const STEPS = [
  {
    t: "Find the month you turn 65",
    b: "The Initial Enrollment Period is seven months: the three months before the month you turn 65, that month, and the three months after. It is already running if your birthday is inside that stretch. It is not a year. It is not the fall annual window — that one is for people already on Medicare.",
  },
  {
    t: "Enroll in the three months before your birthday month if you want coverage on time",
    b: "Sign up in those first three months and Part B starts the month you turn 65. Sign up during your birthday month or later in the window and coverage starts the first of the month after you enroll. That gap is how people end up uncovered for a stretch they thought was already handled.",
  },
  {
    t: "Know the Part B late penalty before you delay",
    b: "Miss the window without other creditable coverage and the penalty is 10% of the standard Part B premium for every full 12 months of delay, charged for as long as you hold Part B. It is permanent. The usual exception is still working, with coverage through a current employer that Medicare counts as creditable — not a retiree plan, and not COBRA.",
  },
  {
    t: "Mark the six-month Medigap window separately",
    b: "It begins the first month you are both 65 and enrolled in Part B. Inside it, no insurer in North Carolina may refuse you or charge more because of health history. It does not reopen. People mix this up with the seven-month Medicare window and lose guaranteed-issue rights they cannot get back.",
  },
] as const;

const FAQ = [
  {
    q: "When does my Medicare Initial Enrollment Period start?",
    a: "Three months before the month you turn 65. It includes that birthday month and the three months after, for seven months total. Coverage starts on time only if you enroll in the first three months of that window.",
  },
  {
    q: "I am still working. Do I have to sign up at 65?",
    a: "Not always. If you have coverage through a current employer that Medicare treats as creditable, you can usually delay Part B without the late penalty and get a special enrollment period when that coverage ends. Retiree coverage and COBRA generally do not count the same way. This is worth checking against your actual plan, not a rule of thumb.",
  },
  {
    q: "What is the difference between turning 65 and annual enrollment?",
    a: "Turning 65 is the Initial Enrollment Period — a one-time seven-month window around your 65th birthday. Annual enrollment is October 15 to December 7 every year, for people already on Medicare who might change an Advantage or Part D plan. They are different doors, for different people, at different times.",
  },
  {
    q: "Can I keep my doctor?",
    a: "Original Medicare lets you see any doctor who accepts it. Medicare Advantage uses networks, and those networks are redrawn every year. Around here that usually means Cone Health, Novant, or Atrium Health Wake Forest Baptist — and the answer has to be checked by name, for the year your coverage starts, not guessed from a table.",
  },
  {
    q: "Do you meet in person in Greensboro?",
    a: "Meet in person or by phone. Free consultation with no obligation either way. I read every case myself — there is no national phone service behind this page.",
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
                "The seven-month window, when coverage starts on time, the Part B late penalty, and the six-month Medigap window that does not reopen.",
              path: "/turning-65",
              datePublished: "2026-08-31",
              dateModified: "2026-08-31",
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
        lede="Coordinate Part B, employer coverage, HSA contributions, Medigap timing, physicians, and coverage for a younger spouse. Christian will personally review your dates and explain the next steps."
        secondaryHref="/start?topic=medicare&stage=turning_65_soon"
        secondaryLabel="Review my Medicare timeline →"
        note={
          <>
            Or{" "}
            <Link href="/remind-me" className="font-medium underline underline-offset-2">
              get your exact dates without giving a phone number
            </Link>
            .
          </>
        }
      />

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
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">
            What this looks like within 30 minutes of Greensboro
          </h2>
          <p className="text-18 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Medicare Advantage and Part D plans are sold by county. Guilford, Forsyth, Randolph,
            Davidson, Alamance, and Rockingham all show up inside a half-hour drive of downtown
            Greensboro. Kernersville sits on a county line. Archdale is Randolph next to High Point.
            That is the kind of thing a national phone service will not know, and it is why
            I can sit down with your doctors’ names than mail you a packet.
          </p>
          <p className="text-18 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Around here the first question is almost always whether a specific doctor at Cone
            Health, Novant, or Wake Forest Baptist stays in network. You can find that out before
            you sign anything. You cannot find it from a table on a website — those contracts get
            renegotiated every year.
          </p>
          <GuideTownLinks />
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Already on Medicare instead?</h2>
          <p className="text-18 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            This page is for the first enrollment. If you already have Medicare and the mail is
            piling up this fall, that is a different window — October 15 to December 7 — and most
            people should keep the plan they have.
          </p>
          <p className="text-17 mt-4">
            <Link href="/annual-enrollment" className="font-medium underline underline-offset-2">
              Medicare annual enrollment →
            </Link>
          </p>
          <LeadCluster
            current="/turning-65"
            heading="Life, retirement, and the other Medicare door"
          />
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
        body="Get a personal review of your dates, current coverage, and next steps. Meet in person or by phone."
        href="/start?topic=medicare&stage=turning_65_soon"
        label="Review my timeline →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
