import { MedicareByline } from "@/app/components/MedicareByline";
import { pageTwitter } from "@/lib/seo";
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
 * Atrium Health Wake Forest Baptist doctors and Medicare: how to check.
 *
 * Sibling of /guides/cone-health-medicare-doctors (Search Console position
 * 5.4, Oct 2026). Targets Winston-Salem, High Point and Lexington searches
 * like "does wake forest baptist take medicare advantage".
 *
 * Atrium / State Health Plan: reversed Oct 27, 2026 (deal; access tier).
 * Facts (verified Oct 27, 2026): hospital list from the Wikipedia list of
 * NC hospitals; accepted-plan list lives on wakehealth.edu; State Health
 * Plan tier change from the NC Treasurer's Oct 14, 2026 release. No plan or
 * carrier names and no network claims: networks change every fall.
 */

const PATH = "/guides/atrium-wake-forest-baptist-medicare-doctors";
const TITLE = "Does Atrium Health Wake Forest Baptist Take Your Medicare Plan?";
const DESCRIPTION =
  "Seeing Atrium Health Wake Forest Baptist doctors in Winston-Salem, High Point or Lexington? Medicare Advantage networks change every fall. How to check before you enroll for 2027.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: pageOpenGraph({
    title: "Does Atrium Health Wake Forest Baptist take your Medicare plan?",
    description:
      "Networks change every fall. How to check your Wake Forest Baptist doctors against next year's plan before you lock in.",
    path: PATH,
  }),
  twitter: pageTwitter({
    title: "Does Atrium Health Wake Forest Baptist take your Medicare plan?",
    description:
      "Networks change every fall. How to check your Wake Forest Baptist doctors against next year's plan before you lock in.",
    path: PATH,
  }),
};

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "Does Atrium Health Wake Forest Baptist accept Medicare?",
    a: "Original Medicare works at any doctor or hospital that accepts Medicare, and there is no network to check. Medicare Advantage is different: each plan has its own network, so whether a Wake Forest Baptist doctor is covered depends on the specific plan and the plan year.",
  },
  {
    q: "How do I check if my Wake Forest Baptist doctor is in my Medicare Advantage plan for 2027?",
    a: "Look the doctor up by name in the plan's 2027 provider directory, then call the doctor's office and ask if they're in network for that exact plan in 2027. Atrium Health Wake Forest Baptist also posts a list of the insurance plans it accepts on its website. Use all three, because any one of them can be out of date.",
  },
  {
    q: "I'm an NC state retiree. Is Atrium Health in network for me in 2027?",
    a: "Yes. The State Treasurer announced on October 14, 2026 that Atrium would move to the State Health Plan's out-of-network tier, but on October 27 the two sides reached a multi-year agreement. For 2027, all Atrium doctors and hospitals are in-network in the plan's middle \"access\" tier, at about today's costs. If you're unsure how your plan treats your Wake Forest Baptist doctors, call the State Health Plan Medicare Support Center at 833-429-5003 before open enrollment ends on November 6, 2026.",
  },
  {
    q: "What if my plan drops Wake Forest Baptist in the middle of the year?",
    a: "Call your plan first to confirm the change, then ask whether you qualify for a special enrollment period or continuity-of-care coverage, especially if you're in the middle of treatment. Neither is guaranteed, but both are worth asking about.",
  },
  {
    q: "Will a Medigap plan let me keep my Wake Forest Baptist doctors?",
    a: "Medigap plans follow Original Medicare's rules, so there's no network. Any doctor who accepts Medicare works. You pay a higher monthly premium in exchange for not having to check a network every fall.",
  },
];

export default function AtriumWakeForestBaptistMedicareDoctorsPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: PATH },
              { name: "Wake Forest Baptist and Medicare", path: PATH },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: TITLE,
              description:
                "How to check whether your Atrium Health Wake Forest Baptist doctors are in your Medicare plan's network for 2027, and what NC state retirees should know about the State Health Plan change.",
              path: PATH,
              datePublished: "2026-10-27",
              dateModified: "2026-10-27",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Guides" }, { name: "Wake Forest Baptist and Medicare" }]}
        eyebrow="Guide · Updated October 27, 2026"
        title="Does Atrium Health Wake Forest Baptist take your Medicare plan?"
        lede="If your doctors are at Wake Forest Baptist, your plan's network matters more than its brochure. Here's how to check before you lock in for 2027."
        secondaryHref="/start?topic=medicare&quick=1"
        secondaryLabel="Get a free coverage review"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-4xl">
          <div className="rounded-xl border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-6">
            <p className="text-19 font-semibold">In short</p>
            <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
              On Original Medicare, any Wake Forest Baptist doctor who accepts Medicare is covered.
              On Medicare Advantage, it depends on your plan&apos;s network for the year, and
              networks can change every fall. Check the plan&apos;s 2027 directory, check Atrium
              Health Wake Forest Baptist&apos;s accepted-insurance list, then call your
              doctor&apos;s office to confirm. Annual Enrollment ends December 7.
            </p>
          </div>

          <h2 className="text-28 mt-12 font-semibold">Where Wake Forest Baptist is in the Triad</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Atrium Health Wake Forest Baptist runs the big academic medical center in
            Winston-Salem, plus High Point Medical Center in High Point, Lexington Medical Center
            in Lexington, Davie Medical Center in Bermuda Run and Wilkes Medical Center in North
            Wilkesboro. Add the clinics and specialty practices across Forsyth, Guilford, Davidson
            and Davie counties, and a lot of people in the western Triad see a Wake Forest Baptist
            doctor for something.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            That&apos;s why the network question matters here. A Medicare Advantage plan can cover
            one system&apos;s hospitals and not another&apos;s, or cover the hospital but not every
            specialist. Your neighbor&apos;s plan working at Wake Forest Baptist doesn&apos;t tell
            you much about yours.
          </p>

          <h2 className="text-28 mt-12 font-semibold">How to check, in three steps</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            <strong className="text-[var(--color-navy)]">1. The plan&apos;s 2027 provider directory.</strong>{" "}
            Look up each doctor by name, not just the practice. Use the directory for the year
            you&apos;re enrolling in. During Annual Enrollment that means 2027, not 2026. Check
            every specialist you see regularly, not only your primary care doctor.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            <strong className="text-[var(--color-navy)]">2. Wake Forest Baptist&apos;s own list.</strong>{" "}
            Atrium Health Wake Forest Baptist posts the health insurance plans it accepts on its
            website, under billing and insurance. If your plan isn&apos;t listed, that&apos;s a
            reason to dig further before you enroll.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            <strong className="text-[var(--color-navy)]">3. A call to the doctor&apos;s office.</strong>{" "}
            Directories and lists go out of date. Call the office, give them the exact plan name,
            and ask if they&apos;ll be in network for it in 2027. When all three agree, you can
            enroll with confidence.
          </p>

          <h2 className="text-28 mt-12 font-semibold">NC state retirees: Atrium stays in network for 2027</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            If you&apos;re a retired teacher or state employee, you may have heard Atrium was
            leaving the State Health Plan&apos;s network. That was announced on October 14, 2026,
            and reversed on October 27, when Atrium and the State Health Plan reached a multi-year
            agreement. For 2027, all Atrium doctors and hospitals, including Wake Forest Baptist,
            are in-network in the plan&apos;s middle &ldquo;access&rdquo; tier, at about
            today&apos;s costs.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Open enrollment still ends November 6, 2026. If you&apos;re not sure how your plan
            treats your Wake Forest Baptist doctors, call the State Health Plan Medicare Support
            Center at 833-429-5003 and ask before then.{" "}
            <Link href="/guides/nc-state-health-plan-medicare" className="underline underline-offset-2">
              Here&apos;s everything that changes for state retirees in 2027
            </Link>
            .
          </p>
          <p className="text-15 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Sources: NC Department of State Treasurer, October 14, 2026; WFDD / NC Newsroom and
            North Carolina Health News, October 27, 2026; shpnc.gov.
          </p>

          <h2 className="text-28 mt-12 font-semibold">Emergencies are different</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Every Medicare Advantage plan has to cover emergency care, in or out of network. If you
            end up in the Wake Forest Baptist emergency room, the network question isn&apos;t the
            one to worry about. It matters for planned care: checkups, specialists, scans and
            scheduled surgery.
          </p>

          <h2 className="text-28 mt-12 font-semibold">If keeping your doctors is the whole point</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Original Medicare with a Medigap plan has no network at all. Any doctor who accepts
            Medicare works, at Wake Forest Baptist or anywhere else in the country. The tradeoff is
            a higher monthly premium.{" "}
            <Link href="/medicare-advantage-vs-medigap-greensboro-nc" className="underline underline-offset-2">
              Here&apos;s the Advantage vs. Medigap comparison in plain English
            </Link>
            . Also seeing Cone Health or Novant Health doctors?{" "}
            <Link href="/guides/cone-health-medicare-doctors" className="underline underline-offset-2">
              Cone Health
            </Link>{" "}
            and{" "}
            <Link href="/guides/novant-health-medicare-doctors" className="underline underline-offset-2">
              Novant Health
            </Link>{" "}
            have their own guides.
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
                <dd className="text-17 mt-1 leading-relaxed text-[var(--color-ink-muted)]">{item.a}</dd>
              </div>
            ))}
          </dl>
          <p className="text-17 mt-8 leading-relaxed text-[var(--color-ink-muted)]">
            Want help checking your doctors against next year&apos;s plans? Call or text Christian
            Brinkley at {AGENT.phone}. The review is free, with no obligation.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <StandaloneRelatedLinks slug="atrium-wake-forest-baptist-medicare-doctors" />
          <GuideCapture />
        </div>
      </section>

      <KitchenTableClose
        heading="Keep your doctors, pick your plan with confidence"
        body={`Tell me which doctors you see. I'll check them against next year's plans with you before Annual Enrollment ends. Call or text ${AGENT.phone}.`}
        href="/start?topic=medicare&quick=1"
        label="Request a free review"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
      <MedicareByline reviewed="2026-10-27" />
    </main>
  );
}
