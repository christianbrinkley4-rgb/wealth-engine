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
 * Can you keep your Cone Health doctors on Medicare? How to check.
 *
 * Targets "which medicare plans work with cone health doctors" /
 * "cone health medicare advantage". Local angle national sites cannot copy.
 * No plan names, no network claims: this is a how-to-check guide, because
 * networks change every fall.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Which Medicare Plans Work With Cone Health Doctors?",
  },
  description:
    "Wondering if your Cone Health doctor takes your Medicare plan? Networks change every fall. Here is how to check before you enroll, in Greensboro and the Triad.",
  alternates: { canonical: "/guides/cone-health-medicare-doctors" },
  openGraph: pageOpenGraph({
    title: "Which Medicare plans work with Cone Health doctors?",
    description:
      "Networks change every fall. How to check whether your Cone Health doctor is in your plan's network before you lock in for the year.",
    path: "/guides/cone-health-medicare-doctors",
  }),
  twitter: pageTwitter({
    title: "Which Medicare plans work with Cone Health doctors?",
    description:
      "Networks change every fall. How to check whether your Cone Health doctor is in your plan's network before you lock in for the year.",
    path: "/guides/cone-health-medicare-doctors",
  }),
};

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "How do I check if my Cone Health doctor accepts my Medicare plan?",
    a: "Use the plan's provider directory for the upcoming plan year, not last year's. Search your doctor by name, not just the practice. Then call the doctor's office and confirm they are in network for that specific plan. Directories can be out of date, so the call matters.",
  },
  {
    q: "Do all Medicare Advantage plans in Greensboro work with Cone Health?",
    a: "No. Each Medicare Advantage plan contracts with its own network of doctors and hospitals. Some include Cone Health facilities and physicians, some do not. Check the specific plan's directory every fall before you enroll.",
  },
  {
    q: "Does Original Medicare work with Cone Health doctors?",
    a: "Original Medicare works with any doctor or hospital that accepts Medicare, which includes Cone Health facilities. There is no network to check. If your doctor accepts Medicare patients, your coverage applies.",
  },
  {
    q: "What happens if my doctor leaves my plan's network mid-year?",
    a: "You may qualify for a special enrollment period to switch plans. Call your plan first to confirm the change, then ask about your options. This is one reason to check the directory every fall during Annual Enrollment.",
  },
  {
    q: "Can I keep my Cone Health doctor if I switch to a Medigap plan?",
    a: "Medigap plans follow Original Medicare's rules, so there is no network. Any doctor who accepts Medicare works. This is the main reason people who are attached to specific doctors choose Medigap over Medicare Advantage.",
  },
];

export default function ConeHealthMedicareDoctorsPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: "/guides/cone-health-medicare-doctors" },
              { name: "Cone Health and Medicare", path: "/guides/cone-health-medicare-doctors" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Which Medicare Plans Work With Cone Health Doctors?",
              description:
                "How to check whether your Cone Health doctor is in your Medicare plan's network, why networks change every fall, and the questions to ask before Annual Enrollment.",
              path: "/guides/cone-health-medicare-doctors",
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
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Guides" },
          { name: "Cone Health and Medicare" },
        ]}
        eyebrow="Guide · Updated October 13, 2026"
        title="Which Medicare plans work with Cone Health doctors?"
        lede="Your doctor matters more than your plan's brochure. Here is how to make sure the two still go together before you enroll for 2027."
        secondaryHref="/schedule?topic=medicare"
        secondaryLabel="Get a free coverage review"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-4xl">
          <div className="rounded-xl border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-6">
            <p className="text-19 font-semibold">In short</p>
            <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
              No article can give you a permanent list of plans that work with Cone Health,
              because networks change every fall. The reliable answer is a process: check the
              plan&apos;s current provider directory, then call your doctor&apos;s office to confirm.
              That two-step check takes twenty minutes and can save you a year of out-of-network bills.
            </p>
          </div>

          <h2 className="text-28 mt-12 font-semibold">Why this question is harder than it looks</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Cone Health is the big health system in Greensboro. Moses Cone Hospital on North Elm
            Street, Wesley Long Hospital on West Friendly Avenue, the Behavioral Health Hospital on
            Walter Reed Drive, plus Alamance Regional in Burlington and Annie Penn in Reidsville.
            Add in the MedCenters in High Point and Kernersville and the Cone Health Medical Group
            practices scattered across Guilford, Forsyth, Alamance, Randolph, and Rockingham
            counties. If you live in the Triad, there is a good chance your doctor is a Cone Health
            doctor.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Medicare Advantage plans each negotiate their own contracts with health systems. A plan
            that included Cone Health last year might not include it next year, or it might include
            the hospitals but not every specialist. That is why &ldquo;my neighbor has this plan and sees
            a Cone Health doctor&rdquo; is not enough. You need to check your plan, your doctor, for the
            plan year you are enrolling in.
          </p>

          <h2 className="text-28 mt-12 font-semibold">The two-step check that actually works</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            <strong className="text-[var(--color-navy)]">Step 1: the plan&apos;s provider directory.</strong>{" "}
            Every Medicare Advantage plan publishes a directory of in-network doctors and hospitals.
            Use the directory for the year you are enrolling in. During this fall&apos;s Annual
            Enrollment, that means the 2027 directory, not the 2026 one. Search your doctor by name,
            not just the practice name. Confirm each specialist you see regularly, not just your
            primary care physician.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            <strong className="text-[var(--color-navy)]">Step 2: call the doctor&apos;s office.</strong>{" "}
            Provider directories can be out of date. Call your doctor&apos;s office and ask, by name,
            whether they are in network for the specific plan you are considering. The billing staff
            deals with this question all day. Give them the exact plan name and they will tell you.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Do both steps. The directory tells you what the plan claims. The phone call tells you
            what the doctor&apos;s office believes. When they agree, you can enroll with confidence.
          </p>

          <h2 className="text-28 mt-12 font-semibold">Questions worth asking before Annual Enrollment</h2>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              Are my primary care doctor and every specialist I see in this plan&apos;s network for
              2027?
            </li>
            <li>
              If I need a referral to a specialist, does it have to stay inside the network?
            </li>
            <li>
              Which hospitals does this plan cover for a planned surgery, not just the emergency room?
            </li>
            <li>
              If my doctor leaves the network mid-year, what are my options?
            </li>
            <li>
              Does this plan cover out-of-network care at all, and at what cost?
            </li>
          </ul>

          <h2 className="text-28 mt-12 font-semibold">What &ldquo;in network&rdquo; actually costs you</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Being out of network is not a minor inconvenience. On most Medicare Advantage plans,
            seeing an out-of-network doctor for routine care means you pay the full bill yourself,
            or close to it. A specialist visit, a round of imaging, a planned procedure: those add
            up fast when the plan is not contributing. This is why the directory check is worth
            twenty minutes of your time. One out-of-network surgery can cost more than a year of
            premiums.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Emergency care is the exception. Federal rules require every Medicare Advantage plan to
            cover emergency care anywhere in the country at in-network rates. If you end up in a
            Cone Health emergency room with chest pain, your plan covers it. The network question
            only applies to planned, routine care: checkups, specialists, elective procedures.
          </p>

          <h2 className="text-28 mt-12 font-semibold">Check during Annual Enrollment, not after</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Networks reset every year. The plan that covered your Cone Health cardiologist in 2026
            might drop that contract for 2027, and you will find out when your Annual Notice of
            Change arrives in September. Read it. Then run the two-step check again before December
            7. Annual Enrollment is your yearly chance to switch plans for any reason, no health
            questions asked. After December 7, you are generally locked in until the next fall,
            with only narrow exceptions.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            If you are mid-treatment when a network changes, talk to your plan before you panic.
            Some plans offer continuity-of-care coverage for a limited time when a provider leaves
            the network. It is not guaranteed, but it is worth asking about, especially for
            ongoing cancer treatment or a scheduled surgery.
          </p>

          <h2 className="text-28 mt-12 font-semibold">The Medigap alternative</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            There is a way to skip the network question entirely. Original Medicare plus a Medigap
            plan has no network. Any doctor who accepts Medicare works, Cone Health included. You
            pay a higher monthly premium, but you never have to check a directory again.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            That tradeoff is the whole decision, really. Medicare Advantage asks you to trade
            network flexibility for lower premiums. Medigap asks you to trade higher premiums for
            total flexibility. If keeping your exact doctors is non-negotiable, the math usually
            favors Medigap.{" "}
            <Link href="/medicare-advantage-vs-medigap-greensboro-nc" className="underline underline-offset-2">
              Here is the full Advantage vs. Medigap comparison in plain English
            </Link>
            .
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Worried about losing your doctor on your current plan?{" "}
            <Link href="/medicare-advantage-doctor-networks" className="underline underline-offset-2">
              Here is how to check any Medicare Advantage network
            </Link>
            . Shopping for next year?{" "}
            <Link href="/aep" className="underline underline-offset-2">
              Here is what to review during Annual Enrollment
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
            Want help checking your doctors against next year&apos;s plans? Call or text Christian
            Brinkley in Greensboro, NC at {AGENT.phone}. The review is free, with no obligation.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <StandaloneRelatedLinks slug="cone-health-medicare-doctors" />
          <GuideCapture />
        </div>
      </section>

      <KitchenTableClose
        heading="Keep your doctors, pick your plan with confidence"
        body={`Tell me which doctors you see. We will check them against next year's plans together, before Annual Enrollment ends. Call or text ${AGENT.phone}.`}
        href="/schedule?topic=medicare"
        label="Book a free review"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
      <MedicareByline reviewed="2026-10-13" />
    </main>
  );
}
