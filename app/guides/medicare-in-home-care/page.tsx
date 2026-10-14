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
 * Does Medicare pay for in-home care?
 *
 * Targets "does medicare pay for in-home care". One of the most-asked family
 * questions. Clear line between what Medicare covers (skilled, short-term)
 * and what it does not (custodial long-term care).
 */

export const metadata: Metadata = {
  title: {
    absolute: "Does Medicare Pay for In-Home Care?",
  },
  description:
    "Medicare covers some in-home care but not the kind most families need. Here is the line between skilled home health and custodial care, and what your options are.",
  alternates: { canonical: "/guides/medicare-in-home-care" },
  openGraph: pageOpenGraph({
    title: "Does Medicare pay for in-home care?",
    description:
      "Medicare covers skilled, short-term home health care. It does not cover long-term help with daily living. Here is where the line falls.",
    path: "/guides/medicare-in-home-care",
  }),
  twitter: pageTwitter({
    title: "Does Medicare pay for in-home care?",
    description:
      "Medicare covers skilled, short-term home health care. It does not cover long-term help with daily living. Here is where the line falls.",
    path: "/guides/medicare-in-home-care",
  }),
};

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "Does Medicare pay for someone to help my parent at home?",
    a: "It depends on the kind of help. Medicare covers skilled home health care ordered by a doctor, like nursing or physical therapy after a hospital stay. It does not cover long-term help with bathing, dressing, cooking, or housekeeping.",
  },
  {
    q: "What home health care does Medicare cover?",
    a: "Part A and Part B cover intermittent skilled nursing care, physical therapy, occupational therapy, speech therapy, and part-time home health aide services, when a doctor orders them and you are homebound. There is no copay for these covered services.",
  },
  {
    q: "Does Medicare cover 24-hour care at home?",
    a: "No. Medicare does not cover 24-hour-a-day care at home, meal delivery, or homemaker services when that is the only care needed. These are considered custodial care, which Medicare excludes.",
  },
  {
    q: "What does homebound mean for Medicare home health coverage?",
    a: "Homebound means leaving home takes considerable effort, and you generally need help to do it. You can still leave for medical appointments, religious services, or occasional outings. Your doctor must certify that you are homebound.",
  },
  {
    q: "How do families pay for long-term in-home care?",
    a: "Common options include paying privately, long-term care insurance if it was purchased earlier, Medicaid for those who qualify financially, and VA benefits for eligible veterans. Medicare is not designed to fund ongoing custodial care.",
  },
];

export default function MedicareInHomeCarePage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: "/guides/medicare-in-home-care" },
              { name: "In-Home Care", path: "/guides/medicare-in-home-care" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Does Medicare Pay for In-Home Care?",
              description:
                "The line between skilled home health care Medicare covers and custodial care it does not, plus how families actually pay for long-term help at home.",
              path: "/guides/medicare-in-home-care",
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
          { name: "In-Home Care" },
        ]}
        eyebrow="Guide · Updated October 13, 2026"
        title="Does Medicare pay for in-home care?"
        lede="This is one of the most painful misunderstandings in Medicare. Families assume help at home is covered. Then they learn the line Medicare draws, and it is not where they expected."
        secondaryHref="/start?topic=medicare&quick=1"
        secondaryLabel="Get a free coverage review"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-4xl">
          <div className="rounded-xl border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-6">
            <p className="text-19 font-semibold">In short</p>
            <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
              Medicare covers skilled, short-term home health care ordered by a doctor: nursing
              visits, physical therapy, speech therapy, and part-time aide services while you
              recover. It does not cover long-term custodial care: help with bathing, dressing,
              meals, and housekeeping. That second category is what most families actually need,
              and it is the part Medicare will not pay for.
            </p>
          </div>

          <h2 className="text-28 mt-12 font-semibold">The two kinds of home care</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            <strong className="text-[var(--color-navy)]">Skilled home health care</strong> is
            medical care delivered at home by licensed professionals. A nurse changing a wound
            dressing. A physical therapist rebuilding strength after a hip replacement. A speech
            therapist after a stroke. Medicare covers this when a doctor orders it, you are
            homebound, and the agency is Medicare-certified. There is typically no copay and no
            deductible for these services.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            <strong className="text-[var(--color-navy)]">Custodial care</strong> is help with daily
            living. Bathing, getting dressed, cooking, cleaning, companionship, someone nearby in
            case of a fall. This is what families mean when they say &ldquo;Mom needs help at home.&rdquo;
            Medicare does not cover it. Not under Part A, not under Part B, not under any
            Medicare Advantage plan as a standard benefit. The exclusion is written into the law.
          </p>

          <h2 className="text-28 mt-12 font-semibold">What Medicare home health actually requires</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            Coverage is not automatic. Four conditions have to be true at once. A doctor must
            order the care and create a plan for it. You must be homebound, meaning leaving home
            takes considerable effort. The care must be intermittent and skilled, not full-time
            or purely personal. And the home health agency must be Medicare-certified.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            A common scenario where it all lines up: your dad has knee replacement surgery. The
            surgeon orders home physical therapy three times a week for six weeks. A nurse stops
            by to check the incision. A part-time aide helps him shower safely while he cannot
            put weight on the leg. Medicare covers all of that. When the therapy ends and he can
            manage on his own, coverage ends too.
          </p>

          <h2 className="text-28 mt-12 font-semibold">What families usually need, and who pays</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            The harder scenario is the slow decline. Mom is safe living alone for now, but she
            needs help getting dressed, someone to cook, a person nearby during the day. That is
            custodial care, and the bill lands on the family. Full-time home care aides are one
            of the most expensive kinds of long-term care, often comparable to assisted living
            costs.
          </p>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong className="text-[var(--color-navy)]">Paying privately.</strong> Most
              families start here, spending down savings. It is worth getting a written care
              plan from the doctor first, so you buy only the hours you need.
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">Long-term care insurance.</strong> If
              a policy was bought years earlier, now is when it pays. Check what the policy
              covers and what triggers benefits.
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">Medicaid.</strong> In North Carolina,
              Medicaid can cover home and community-based services for people who meet income
              and asset limits. The application process takes time, so start early.
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">VA benefits.</strong> Eligible
              veterans and surviving spouses may qualify for VA home care programs.{" "}
              <Link href="/medicare-help-directory" className="underline underline-offset-2">
                Free local counselors can help you sort out what you qualify for
              </Link>
              .
            </li>
          </ul>

          <h2 className="text-28 mt-12 font-semibold">Watch out for the nursing home question too</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            The same misunderstanding applies to nursing homes. Medicare covers short-term skilled
            nursing facility stays after a qualifying hospital stay, up to 100 days with
            cost-sharing after day 20. It does not cover long-term custodial nursing home care.
            Families who assume Medicare will cover a parent&apos;s nursing home find out
            otherwise at the worst possible moment. If a nursing home stay might be in your
            family&apos;s future, plan for it the same way you plan for home care: with eyes
            open about what Medicare does and does not pay for.
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            If your mom or dad needs help at home now, the first step is a conversation with
            their doctor about what kind of care is medically needed. A doctor&apos;s order is
            what unlocks the Medicare-covered part. For the rest, knowing your options early
            gives you time to plan instead of scrambling.{" "}
            <Link href="/aep" className="underline underline-offset-2">
              Reviewing your coverage during Annual Enrollment is a good time to ask these questions
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
            Caring for a parent and confused about what Medicare covers? Call or text Christian
            Brinkley in Greensboro, NC at {AGENT.phone}. The review is free, with no obligation.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <StandaloneRelatedLinks slug="medicare-in-home-care" />
          <GuideCapture />
        </div>
      </section>

      <KitchenTableClose
        heading="Get clear answers about home care coverage"
        body={`Tell me what kind of help your family needs. We will sort out what Medicare covers and what your options are for the rest. Call or text ${AGENT.phone}.`}
        href="/start?topic=medicare&quick=1"
        label="Book a free review"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
      <MedicareByline reviewed="2026-10-13" />
    </main>
  );
}
