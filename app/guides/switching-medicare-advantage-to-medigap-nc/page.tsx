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
 * Switching from Medicare Advantage to Medigap in North Carolina.
 *
 * NC underwriting rule verified against NCDOI's Medicare supplement page on
 * October 13, 2026. Guaranteed issue and trial rights are the federal rules
 * in Medicare's Medigap guide.
 */

const PATH = "/guides/switching-medicare-advantage-to-medigap-nc";

export const metadata: Metadata = {
  title: {
    absolute: "Switching From Medicare Advantage to Medigap in NC",
  },
  description: "You can leave Medicare Advantage each fall, but getting a Medigap policy in North Carolina usually means health questions. Here's when you have a guaranteed right.",
  alternates: { canonical: PATH },
  openGraph: pageOpenGraph({
    title: "Can you switch from Medicare Advantage to Medigap in North Carolina?",
    description: "Leaving Medicare Advantage is the easy part. Getting a Medicare Supplement afterward is where North Carolina's rules matter. Here's how it works.",
    path: PATH,
  }),
  twitter: pageTwitter({
    title: "Can you switch from Medicare Advantage to Medigap in North Carolina?",
    description: "Leaving Medicare Advantage is the easy part. Getting a Medicare Supplement afterward is where North Carolina's rules matter. Here's how it works.",
    path: PATH,
  }),
};

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "Can I switch from Medicare Advantage to Medigap in North Carolina?",
    a: "Yes, but it takes two steps. You can return to Original Medicare during the fall enrollment period or from January 1 to March 31. Getting a Medigap policy usually requires passing medical underwriting unless you have a guaranteed issue right.",
  },
  {
    q: "Can a Medigap company deny me in North Carolina?",
    a: "Yes, outside your one-time six-month open enrollment period. The NC Department of Insurance says companies can use medical underwriting to decide whether to accept an application, unless you qualify for a guaranteed issue right.",
  },
  {
    q: "What is the Medicare Advantage trial right?",
    a: "If you joined a Medicare Advantage plan when you first became eligible for Medicare at 65, or dropped a Medigap policy to try Medicare Advantage for the first time, you generally have 12 months to switch back with a guaranteed right to buy a Medigap policy.",
  },
  {
    q: "When can I leave my Medicare Advantage plan?",
    a: "During the Annual Enrollment Period, October 15 to December 7, with changes starting January 1. If you're in a Medicare Advantage plan on January 1, you can also make one change between January 1 and March 31.",
  },
  {
    q: "Should I drop my Medicare Advantage plan before applying for Medigap?",
    a: "No. Apply for the Medigap policy first and wait for written approval and a start date. If you leave your Medicare Advantage plan first and are declined, you'd have Original Medicare with no supplement.",
  },
];

export default function SwitchingMedicareAdvantageToMedigapNcPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: PATH },
              { name: "Advantage to Medigap in NC", path: PATH },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Switching From Medicare Advantage to Medigap in NC",
              description: "You can leave Medicare Advantage each fall, but getting a Medigap policy in North Carolina usually means health questions. Here's when you have a guaranteed right.",
              path: PATH,
              datePublished: "2026-10-13",
              dateModified: "2026-10-13",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }}
      />

      <ServiceHero
        crumbs={[{ name: "Home", href: "/" }, { name: "Guides" }, { name: "Advantage to Medigap in NC" }]}
        eyebrow="Guide · Updated October 13, 2026"
        title={"Can you switch from Medicare Advantage to Medigap in North Carolina?"}
        lede={"Yes, you can leave a Medicare Advantage plan. The harder question is whether a Medicare Supplement company will take you afterward. In North Carolina, that often depends on your health."}
        secondaryHref="/schedule?topic=medicare"
        secondaryLabel="Book a free consultation"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-4xl">
          <div className="rounded-xl border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-6">
            <p className="text-19 font-semibold">In short</p>
            <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
              {"You can go back to Original Medicare during the fall window or between January 1 and March 31. Getting a Medigap policy is a separate step. In North Carolina, outside your one-time open enrollment period, companies can use medical underwriting unless you have a guaranteed issue right. Apply and get approved before you leave your Advantage plan."}
            </p>
          </div>

          <h2 className="text-28 mt-12 font-semibold">{"Two separate steps"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"People think of this as one switch. It's really two, with two different sets of rules."}
          </p>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong className="text-[var(--color-navy)]">{"Step one: leave Medicare Advantage."}</strong>{" "}
              {"You can return to Original Medicare during the Annual Enrollment Period, October 15 to December 7, with the change starting January 1. If you're in a Medicare Advantage plan on January 1, you can also make one change between January 1 and March 31."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Step two: get a Medicare Supplement."}</strong>{" "}
              {"This is a private insurance policy, and whether a company has to accept you depends on your timing and situation."}
            </li>
          </ul>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"Step one is guaranteed. Step two is not. That gap is where people get stuck."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"What North Carolina's rules say"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"Your open enrollment period for a Medicare Supplement is a one-time, six-month window. It begins the first month you're both 65 or older and enrolled in Part B. During it, you can buy any plan from any company, and they can't turn you down or charge more because of your health."}
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"After that window, the NC Department of Insurance says companies can use medical underwriting to decide whether to accept your application. In plain terms, they can ask health questions and say no. A company may also apply a waiting period for pre-existing conditions, which can't be longer than six months."}
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"So for most people who've been in a Medicare Advantage plan for a few years, switching to a Medicare Supplement in North Carolina means applying and passing underwriting."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"When you have a guaranteed right anyway"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"Federal rules give you a guaranteed issue right in certain situations. In these, a company must sell you a policy without health questions. The most common ones:"}
          </p>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong className="text-[var(--color-navy)]">{"You joined Medicare Advantage when you first became eligible at 65."}</strong>{" "}
              {"If you're within your first 12 months in the plan and decide to go back to Original Medicare, you can buy any Medicare Supplement sold in the state."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"You dropped a Medicare Supplement to try Medicare Advantage for the first time."}</strong>{" "}
              {"If you've been in the plan less than 12 months, you can generally go back to the policy you had, if that company still sells it."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Your plan is leaving."}</strong>{" "}
              {"If your Medicare Advantage plan stops serving your area or leaves Medicare, you have a guaranteed right to certain supplement plans. See "}
              <Link href="/guides/medicare-advantage-plans-leaving-nc-2027" className="underline underline-offset-2">
                {"Medicare Advantage plans leaving NC in 2027"}
              </Link>
              {"."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"You move out of your plan's service area."}</strong>{" "}
              {"A move that takes you outside the plan's area also opens this right."}
            </li>
          </ul>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"These rights have deadlines. In general, you need to apply for the supplement no later than 63 days after your Medicare Advantage coverage ends. Keep any letters from your plan, because the supplement company will ask for proof."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"The safe order of steps"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"If you don't have a guaranteed right, do it in this order."}
          </p>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong className="text-[var(--color-navy)]">{"Apply for the Medicare Supplement first."}</strong>{" "}
              {"Stay in your Medicare Advantage plan while the company reviews your application."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Wait for a written approval."}</strong>{" "}
              {"Don't treat a phone conversation as an approval. Get the decision and a start date in writing."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Line up a Part D drug plan."}</strong>{" "}
              {"Medicare Supplements don't cover prescriptions, so you'll need a separate drug plan."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Then leave your Advantage plan."}</strong>{" "}
              {"Do it during a window when you're allowed to, and time it so the new coverage starts when the old coverage ends."}
            </li>
          </ul>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"The mistake to avoid is dropping your Medicare Advantage plan first and applying second. If you're declined, you'd have Original Medicare with no supplement and no yearly limit on your costs."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"If you're declined"}</h2>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong className="text-[var(--color-navy)]">{"Ask another company."}</strong>{" "}
              {"Underwriting rules differ. One company's no isn't every company's no."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Stay where you are for now."}</strong>{" "}
              {"You can keep your Medicare Advantage plan, or pick a different one in the fall that fits better."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Watch for a guaranteed right later."}</strong>{" "}
              {"If your plan leaves or you move, the door can reopen."}
            </li>
          </ul>
          <h2 className="text-28 mt-12 font-semibold">{"Is switching the right move?"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"That depends on what's bothering you about your current plan. If it's one doctor or one drug, a different Medicare Advantage plan might solve it. If you want to stop dealing with networks and approvals altogether, a supplement does that, usually for a higher monthly premium. I compare the two in "}
            <Link href="/medicare-advantage-vs-medigap-greensboro-nc" className="underline underline-offset-2">
              {"Advantage vs. Medigap"}
            </Link>
            {"."}
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"The fall window is the natural time to look at this, and I explain it on the "}
            <Link href="/aep" className="underline underline-offset-2">
              {"Annual Enrollment page"}
            </Link>
            {". If you'd like to find out whether you'd likely be approved before you change anything, "}
            <Link href="/schedule?topic=medicare" className="underline underline-offset-2">
              {"book a free consultation"}
            </Link>
            {". For a second opinion from someone who doesn't sell insurance, NC SHIIP is at 1-855-408-1212."}
          </p>
          <p className="text-16 mt-8 leading-relaxed text-[var(--color-ink-muted)]">
            {"Sources, checked October 13, 2026: "}
            <a href="https://www.ncdoi.gov/consumers/medicare-and-seniors-health-insurance-information-program-shiip/medicare-supplement-medigap-plans" rel="noopener" className="underline underline-offset-2">
              {"NC Department of Insurance: Medicare supplement plans"}
            </a>
            {"; "}
            <a href="https://www.medicare.gov/publications/02110-medigap-guide-health-insurance.pdf" rel="noopener" className="underline underline-offset-2">
              {"Medicare.gov: Choosing a Medigap Policy (official guide, PDF)"}
            </a>
            {"."}
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
            {"Thinking about moving from Medicare Advantage to a supplement?"} Call or text Christian Brinkley in Greensboro, NC at {AGENT.phone}.
            The consultation is free, with no obligation.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <StandaloneRelatedLinks slug="switching-medicare-advantage-to-medigap-nc" />
          <GuideCapture />
        </div>
      </section>

      <KitchenTableClose
        heading={"Find out where you stand before you switch"}
        body={`${"Tell me when you joined your Medicare Advantage plan and what's prompting the change. We'll check whether you have a guaranteed right and what the safe order of steps looks like."} Call or text ${AGENT.phone}.`}
        href="/schedule?topic=medicare"
        label="Book a free consultation"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
      <MedicareByline reviewed="2026-10-13" />
    </main>
  );
}
