import type { Metadata } from "next";
import Link from "next/link";

import { GuideTownLinks } from "@/app/components/GuideTownLinks";
import { ResponsiveTable } from "@/app/components/ResponsiveTable";
import { ServiceHero } from "@/app/components/ServiceHero";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd, pageOpenGraph, pageTwitter } from "@/lib/seo";

/**
 * Medicare plan ending hub page, Phase A draft only.
 * This page is published: indexable, in the sitemap,
 * and no link from any live page points to it.
 * Phase A rules: no plan names, no plan IDs, no carrier names,
 * no member counts, and no county ending or replaced counts as verified
 * facts in the rendered page, its metadata, or its schema. County ending
 * and replaced counts in the briefs come from two lookup sites, not from
 * the CMS 2027 crosswalk file, so they are not printed here.
 * County pages are listed as text only. They are unpublished Phase A
 * drafts on separate branches, so they are not linked from this page
 * until they are live. Do not add county links until those pages publish.
 * TPMO disclaimer uses the confirmed count, 8 organizations and
 * 65 products, matching lib/agent.ts. FMO is to confirm which SHIP
 * wording 2027 materials require before publishing.
 * Do not publish this page until the CMS crosswalk check and FMO or
 * carrier compliance review are both complete.
 * This page uses a custom disclosure block with the confirmed disclaimer
 * text, not the standard disclosure component, so the disclaimer text
 * stays exactly as specified. It uses the exact PlanCheckCta component
 * twice, not a close component that hardcodes a consultation note, so
 * the CTA wording stays exactly as specified.
 */

const PAGE_PATH = "/medicare-plans-ending-2027";
const BOOKING_URL =
  "https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3o4z5ujB5EOQfw_2jXZkdwBwskeVEb8VdziguWf5GQy9-5J0UgTxjbnXe0F_856Iti_noWHjdZ";
const PHONE = "(919) 408-6671";

export const metadata: Metadata = {
  title: {
    absolute: "Medicare Plans Ending in 2027 | Christian Brinkley",
  },
  description:
    "If you got a letter saying your plan is ending, find what to do next, the dates that matter, and local help in the Triad. Plan year 2027.",
  robots: { index: true, follow: true },
  alternates: { canonical: PAGE_PATH },
  openGraph: pageOpenGraph({
    title: "Medicare Plans Ending in 2027",
    description:
      "If you got a letter saying your plan is ending, find what to do next, the dates that matter, and local help in the Triad. Plan year 2027.",
    path: PAGE_PATH,
  }),
  twitter: pageTwitter({
    title: "Medicare Plans Ending in 2027",
    description:
      "If you got a letter saying your plan is ending, find what to do next, the dates that matter, and local help in the Triad. Plan year 2027.",
    path: PAGE_PATH,
  }),
};

const FAQ = [
  {
    q: "How do I know if my plan is ending?",
    a: "Your plan sends you a letter saying it is ending. The letter comes from your plan, not from Medicare. Keep that letter. You may need it later.",
  },
  {
    q: "What does it mean if my plan is being replaced?",
    a: "A replaced plan moves you to another plan from the same company. Read your Annual Notice of Change. Check your drug coverage anyway, because the new plan can differ.",
  },
  {
    q: "What happens if I do nothing?",
    a: "You would move to Original Medicare on January 1, 2027. If your plan covered drugs, you would have no Medicare drug coverage. Do not let that happen by accident.",
  },
  {
    q: "What is my deadline to pick a new plan?",
    a: "Open Enrollment runs October 15 to December 7, 2026. If your plan is not renewing, Medicare.gov says you can also switch from December 8 to the last day of February 2027. Picking early avoids a gap.",
  },
  {
    q: "Can I go back to Original Medicare and buy a Medigap policy without health questions?",
    a: "Medicare.gov says you may have a guaranteed issue right when your plan leaves Medicare or stops serving your area. You only get it if you switch to Original Medicare. Apply inside the window and keep your letter.",
  },
  {
    q: "Who can help me compare plans in the Triad?",
    a: "NC SHIIP offers unbiased counseling at 855-408-1212. Medicare is at 1-800-MEDICARE. Christian also meets locally in Greensboro.",
  },
] as const;

const CHECKLIST = [
  {
    t: "Find and read your letter",
    b: "Look for a letter from your plan saying it is ending, or your Annual Notice of Change. It comes from your plan, not Medicare. Keep it. You may need it for a Medigap application.",
  },
  {
    t: "Match your plan ID",
    b: "Find the plan ID on your member card. It starts with a letter, then numbers. Compare it to the letter from your plan, not to a table on this page.",
  },
  {
    t: "Mark December 7",
    b: "Pick a new plan by December 7, 2026, so it starts January 1, 2027. You may have extra time to the end of February, but waiting risks a gap.",
  },
  {
    t: "Know your guaranteed issue right",
    b: "If you want Original Medicare plus a Medigap policy, you may be able to buy one without health questions. Apply inside the window. See the Medigap section below.",
  },
  {
    t: "Check your doctors and hospitals",
    b: "Confirm each doctor is in the new plan network for 2027. Ask the office. Check the plan directory for 2027.",
  },
  {
    t: "Check every drug and your pharmacy",
    b: "Enter each drug on Medicare Plan Finder. Confirm costs with the plan before you enroll.",
  },
  {
    t: "Get a second set of eyes",
    b: "NC SHIIP is at 855-408-1212. Medicare is at 1-800-MEDICARE. A local licensed agent can also go through your letter with you.",
  },
] as const;

const DATES = [
  {
    date: "October 15 to December 7, 2026",
    what: "Medicare Open Enrollment. Changes start January 1, 2027.",
    source: "Medicare.gov Open Enrollment page.",
  },
  {
    date: "December 8, 2026 to February 28, 2027",
    what: "Special Enrollment Period when a plan contract is not renewed. Confirm it applies to your plan in your letter.",
    source: "Medicare.gov Special Enrollment Periods page.",
  },
  {
    date: "January 1, 2027",
    what: "New coverage starts. Ending plans stop.",
    source: "Medicare.gov Open Enrollment page.",
  },
  {
    date: "January 1 to March 31, 2027",
    what: "Medicare Advantage Open Enrollment. This is for people already in a Medicare Advantage plan.",
    source: "Medicare.gov joining a plan page.",
  },
] as const;

const COUNTIES = [
  {
    name: "Guilford County",
    path: "/medicare-plans-ending-2027/guilford-county",
    towns: "Greensboro, High Point, Jamestown, and Summerfield.",
  },
  {
    name: "Alamance County",
    path: "/medicare-plans-ending-2027/alamance-county",
    towns: "Burlington, Graham, Mebane, Elon, Haw River, and Gibsonville.",
  },
  {
    name: "Granville County",
    path: "/medicare-plans-ending-2027/granville-county",
    towns: "Oxford, Creedmoor, Butner, Stem, and Stovall.",
  },
] as const;

function PlanCheckCta() {
  return (
    <div>
      <p>
        Want a calm second look at your letter? Book a same-day plan check:{" "}
        <Link href={BOOKING_URL} className="underline underline-offset-2">
          book a 45-minute phone plan check
        </Link>{" "}
        or call {PHONE}.
      </p>
      <p className="text-16 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
        The booking page must capture a Scope of Appointment before any Medicare Advantage or Part D discussion.
      </p>
    </div>
  );
}

export default function PlanEndingHubPhaseAPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Medicare plan ending 2027", path: PAGE_PATH },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Is your Medicare plan ending in 2027?",
              description:
                "If you got a letter saying your plan is ending, find what to do next, the dates that matter, and local help in the Triad. Plan year 2027.",
              path: PAGE_PATH,
              datePublished: "2026-10-26",
              dateModified: "2026-10-26",
            }),
          ),
        }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Medicare plan ending 2027" }]}
        eyebrow="Plan year 2027"
        title="Is your Medicare plan ending in 2027?"
        lede="If you got a letter saying your plan is ending, start here. It is for residents in Guilford, Alamance, and Granville counties, and for adult children helping a parent who got such a letter. It gives calm, plain steps, not a sales pitch."
        variant="info"
        proof={[
          "Licensed agent in Greensboro",
          "One local person, not a call center",
          "Meet by phone or in person",
        ]}
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <p className="text-16 leading-relaxed text-[var(--color-ink-muted)]">
            Last checked 2026-10-26. Plan year 2027. Sources re-checked 2026-10-26, and must be re-checked
            every Monday through February 28, 2027.
          </p>
          <h2 className="text-28 mt-8 font-semibold">What to do, key dates, and help</h2>
          <ul className="mt-4 flex flex-col gap-2 text-17 leading-relaxed">
            <li>
              <a href="#counties" className="underline underline-offset-2">
                Counties covered
              </a>
            </li>
            <li>
              <a href="#ending-vs-replaced" className="underline underline-offset-2">
                Ending versus replaced
              </a>
            </li>
            <li>
              <a href="#what-to-do" className="underline underline-offset-2">
                What to do
              </a>
            </li>
            <li>
              <a href="#key-dates" className="underline underline-offset-2">
                Key dates
              </a>
            </li>
            <li>
              <a href="#medigap-right" className="underline underline-offset-2">
                Your Medigap right
              </a>
            </li>
            <li>
              <a href="#get-help" className="underline underline-offset-2">
                Get help
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section id="counties" className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Counties covered</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            This hub covers three counties. Each county has its own page, linked below.
            Use your letter from your plan. That letter is the
            source that matters for your own coverage.
          </p>
          <ul className="mt-8 flex flex-col gap-6">
            {COUNTIES.map((county) => (
              <li key={county.name} className="border-t border-gray-300 pt-5">
                <h3 className="text-20 font-semibold"><Link href={county.path} className="underline underline-offset-2">{county.name}</Link></h3>
                <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                  Towns include {county.towns}
                </p>
              </li>
            ))}
          </ul>
          <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            The plan list for each county is held for verification. It is not printed here yet.
            A list is only published after the CMS 2027 crosswalk is checked, with matching plan
            IDs, and after compliance review.
          </p>
        </div>
      </section>

      <section id="ending-vs-replaced" className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Ending versus replaced, in plain words</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            An ending plan stops on December 31, 2026. You need a new plan for January 1, 2027,
            or you move to Original Medicare. A replaced plan moves you to another plan from the
            same company. You stay covered, but costs, doctors, or drugs may change.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            The way to tell which one you have is your letter. An ending letter says your plan
            is ending. A replaced plan sends an Annual Notice of Change. Read that notice. It
            tells you what changes for 2027.
          </p>
        </div>
      </section>

      <section id="what-to-do" className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">What to do now: a checklist</h2>
          <ol className="mt-8 flex flex-col gap-6">
            {CHECKLIST.map((item, index) => (
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
          <div className="mt-8 border-t border-gray-300 pt-6 text-18 leading-relaxed">
            <PlanCheckCta />
          </div>
          <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            Want help reading your Annual Notice of Change?{" "}
            <Link href="/anoc" className="underline underline-offset-2">
              How to read your Annual Notice of Change
            </Link>
            . For Open Enrollment dates, see{" "}
            <Link href="/aep" className="underline underline-offset-2">
              Medicare Open Enrollment, October 15 to December 7
            </Link>
            . For 2027 changes in general, see{" "}
            <Link href="/medicare-changes-2027" className="underline underline-offset-2">
              Medicare changes for 2027
            </Link>
            .
          </p>
        </div>
      </section>

      <section id="key-dates" className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Key dates for ending plan members</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            These dates are from Medicare.gov. Your own letter still controls your own case.
            Confirm each date that applies to you in that letter.
          </p>
          <ResponsiveTable className="mt-8 w-full border-collapse text-17 leading-relaxed">
            <thead>
              <tr>
                <th className="border-b border-gray-300 py-2 pr-4 text-left">Date</th>
                <th className="border-b border-gray-300 py-2 pr-4 text-left">What it is</th>
                <th className="border-b border-gray-300 py-2 text-left">Source</th>
              </tr>
            </thead>
            <tbody>
              {DATES.map((row) => (
                <tr key={row.date}>
                  <td className="border-b border-gray-200 py-3 pr-4 align-top">{row.date}</td>
                  <td className="border-b border-gray-200 py-3 pr-4 align-top">{row.what}</td>
                  <td className="border-b border-gray-200 py-3 align-top">{row.source}</td>
                </tr>
              ))}
            </tbody>
          </ResponsiveTable>
          <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
            Coverage start dates by month are not printed here. They were marked for verification
            in the brief, and they rest on lookup site text, not on Medicare.gov wording.
          </p>
        </div>
      </section>

      <section id="medigap-right" className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Your Medigap guaranteed issue right</h2>
          <h3 className="text-20 mt-6 font-semibold">What it is</h3>
          <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
            Medicare.gov says you may have a guaranteed issue right when your Medicare Advantage
            plan leaves Medicare, or stops serving your area. That right lets you buy a Medigap
            policy without health questions in some cases.
          </p>
          <h3 className="text-20 mt-6 font-semibold">Who gets it</h3>
          <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
            You only have this right if you switch to Original Medicare. It does not apply if you
            join another Medicare Advantage plan instead.
          </p>
          <h3 className="text-20 mt-6 font-semibold">Timing</h3>
          <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
            You must apply 60 days before your Medicare Advantage plan coverage ends. You must
            apply no more than 63 days after your coverage ends. Medigap coverage cannot start
            until your Medicare Advantage plan coverage ends.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            In plain terms, the window is generally from about 60 days before your plan ends until
            63 days after it ends. Keep your letter. It may be needed for a Medigap application.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Doctors, hospitals, and drugs: check before you choose</h2>
          <h3 className="text-20 mt-6 font-semibold">Check your doctors</h3>
          <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
            Confirm each doctor is in the new plan network for 2027. Ask the office. Check the
            plan directory for 2027. Do not assume a doctor who was in network last year is
            still in network.
          </p>
          <h3 className="text-20 mt-6 font-semibold">Check every drug and your pharmacy</h3>
          <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
            Enter each drug on Medicare Plan Finder. Confirm costs with the plan before you enroll.
            Check your pharmacy too, not just the drug list.
          </p>
          <h3 className="text-20 mt-6 font-semibold">Bring these to a review</h3>
          <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
            Bring your Medicare card, your plan card, the letter, your drug list, and your doctor
            list. Those five items let a reviewer check your case without guessing.
          </p>
        </div>
      </section>

      <section id="get-help" className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Local help</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            NC SHIIP offers unbiased counseling at 855-408-1212. Medicare is at 1-800-MEDICARE.
            Medicare Plan Finder is at{" "}
            <Link href="https://www.medicare.gov/plan-compare" className="underline underline-offset-2">
              medicare.gov/plan-compare
            </Link>
            . Christian meets locally in Greensboro.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            For Greensboro help, see{" "}
            <Link href="/medicare-agent-greensboro-nc" className="underline underline-offset-2">
              Medicare help in Greensboro
            </Link>
            . For new to Medicare help, see{" "}
            <Link href="/turning-65" className="underline underline-offset-2">
              new to Medicare this year
            </Link>
            . To book a plan check, see{" "}
            <Link href="/plan-check" className="underline underline-offset-2">
              book a plan check
            </Link>
            . For counties served, see{" "}
            <Link href="/service-area" className="underline underline-offset-2">
              counties Christian serves
            </Link>
            .
          </p>
          <GuideTownLinks />
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Questions people ask</h2>
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

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <div className="text-18 leading-relaxed">
            <PlanCheckCta />
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Disclosures and sources</h2>
          <p className="text-17 mt-4 leading-relaxed">
            We do not offer every plan available in your area. Currently we represent 8 organizations which offer 65 products in your area. Please contact Medicare.gov or 1-800-MEDICARE to get information on all of your options.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Christian Brinkley is a licensed insurance agent. Not connected with or endorsed by
            the U.S. government or the federal Medicare program.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Sources, with dates: Medicare.gov Open Enrollment page; Medicare.gov Special
            Enrollment Periods page; Medicare.gov joining a plan page; Medicare.gov Medigap
            page. Lookup sites used only for the held county tables, not for this page:
            ismyplanending.com, CMS data as of October 18, 2026; plainmedicare.com, CMS 2027
            landscape files September 22, 2026, revised September 30, 2026, and the October 1,
            2026 crosswalk. Re-check both lookup pages on publish day.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            This page names no plan and no carrier. It recommends no replacement plan. It states
            no prices, no star ratings, and no counts of ending plans. Every number on this page
            cites a source and a date above, or is a calendar date from Medicare.gov, or is the
            confirmed TPMO count in the disclaimer above.
          </p>
        </div>
      </section>
    </main>
  );
}
