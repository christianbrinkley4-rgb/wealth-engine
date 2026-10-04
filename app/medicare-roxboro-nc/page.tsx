import type { Metadata } from "next";
import Link from "next/link";

import { ComplianceDisclosure } from "@/app/components/ComplianceDisclosure";
import { KitchenTableClose } from "@/app/components/KitchenTableClose";
import { ServiceHero } from "@/app/components/ServiceHero";
import { AGENT } from "@/lib/agent";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  localBusinessJsonLd,
  pageOpenGraph,
  serviceJsonLd,
} from "@/lib/seo";

/**
 * The Roxboro, NC town page (Person County, 27573).
 *
 * Local angle: the Person County seat, rural, Hyco Lake nearby. No invented
 * facts: no provider names, no plan outcomes promised, no claims about SHIIP
 * offerings. Library and senior center verified by web search 2026-10-04.
 */

export const metadata: Metadata = {
  title: {
    absolute: "Medicare Help in Roxboro, NC | Christian Brinkley",
  },
  description:
    "Free Medicare plan reviews in Roxboro, NC from Christian Brinkley, licensed NC agent. Plain-English help for Person County. Call (919) 408-6671.",
  alternates: { canonical: "/medicare-roxboro-nc" },
  openGraph: pageOpenGraph({
    title: "Medicare help for Roxboro and Person County.",
    description:
      "Free, no-pressure Medicare plan reviews for Roxboro and Person County from Christian Brinkley, a licensed NC agent. Call (919) 408-6671.",
    path: "/medicare-roxboro-nc",
  }),
};

const FAQ = [
  {
    q: "Do you help in Timberlake, Rougemont, and Hurdle Mills too?",
    a: "Yes. I cover all of Person County, Roxboro included and the smaller communities around it. Phone reviews work great out in the county, or we can meet in Roxboro.",
  },
  {
    q: "My doctors are in Durham. Does that matter for my plan?",
    a: "It can matter a lot. Some plans have tight local networks and some are broader. If your care stretches from Roxboro to Durham, we need to check both against the plan's network before you commit for the year.",
  },
  {
    q: "When is the Annual Enrollment Period?",
    a: "October 15 through December 7, every year. Any changes you make take effect January 1.",
  },
  {
    q: "Is the review really free?",
    a: "Yes. The review costs you nothing either way, even if you change nothing. I am a licensed insurance agent, and I am paid by the insurance companies when someone enrolls through me, not by you.",
  },
] as const;

function ReviewCta() {
  return (
    <div>
      <h2 className="text-28 font-semibold">Get your free Medicare review</h2>
      <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
        Take the 2-minute plan-fit quiz and I&apos;ll reach out, or book a time that works
        for you.
      </p>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
        <Link
          href="/plan-check"
          className="text-18 inline-flex min-h-14 items-center justify-center rounded-xl bg-[var(--color-navy)] px-8 font-semibold text-[var(--color-paper)] shadow-[0_1px_2px_rgba(21,46,52,0.08),0_2px_8px_rgba(21,46,52,0.06)] transition-all duration-200 ease-out hover:-translate-y-px hover:shadow-[0_2px_4px_rgba(21,46,52,0.1),0_4px_16px_rgba(21,46,52,0.1)] active:translate-y-0 active:shadow-[0_1px_2px_rgba(21,46,52,0.08)]"
        >
          Take the plan-fit quiz →
        </Link>
        <a
          href="https://calendly.com/christianbrinkley4/free-medicare-review-call"
          className="text-18 inline-flex min-h-14 items-center justify-center rounded-xl border-2 border-[var(--color-navy)] bg-white px-8 font-semibold text-[var(--color-navy)] shadow-[0_1px_2px_rgba(21,46,52,0.05)] transition-all duration-200 ease-out hover:-translate-y-px hover:border-[var(--color-gold-ink)] hover:text-[var(--color-gold-ink)] hover:shadow-[0_2px_4px_rgba(21,46,52,0.07),0_3px_12px_rgba(21,46,52,0.06)] active:translate-y-0"
        >
          Book a free call
        </a>
      </div>
      <p className="text-17 mt-6 leading-relaxed text-[var(--color-ink-muted)]">
        Prefer to talk?{" "}
        <a href={AGENT.phoneHref} className="underline underline-offset-2">
          Call or text {AGENT.phone}
        </a>
        .
      </p>
      <p className="text-16 mt-4 text-[var(--color-ink-muted)] italic">
        Free help from a licensed North Carolina insurance agent. No cost, no pressure, no
        obligation.
      </p>
    </div>
  );
}

export default function MedicareRoxboroPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Service area", path: "/service-area" },
              { name: "Medicare help in Roxboro, NC", path: "/medicare-roxboro-nc" },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Medicare help in Roxboro, NC, from a local licensed agent.",
              description:
                "Plain-English Medicare help for Roxboro and Person County from Christian Brinkley, a licensed insurance agent in North Carolina.",
              path: "/medicare-roxboro-nc",
              datePublished: "2026-10-04",
              dateModified: "2026-10-04",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd({
              name: "Medicare plan review in Roxboro, NC",
              description:
                "A free, no-pressure Medicare plan review with a licensed agent serving Roxboro and Person County, NC.",
              path: "/medicare-roxboro-nc",
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd()) }}
      />

      <ServiceHero
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Service area", href: "/service-area" },
          { name: "Medicare help in Roxboro, NC" },
        ]}
        eyebrow="Medicare help · Roxboro and Person County"
        title="Medicare Help in Roxboro, NC"
        lede="Roxboro is Person County&apos;s seat, surrounded by farmland and lake country, and a lot of folks here drive toward Durham when they need a specialist. I&apos;m Christian Brinkley, a licensed insurance agent in North Carolina. I help people in Roxboro and across Person County understand Medicare in plain English. Free reviews, by phone or in person."
        secondaryHref="/plan-check"
        secondaryLabel="Take the plan-fit quiz →"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Medicare in Roxboro: What Locals Run Into</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              Roxboro is the Person County seat, a small town surrounded by farmland and
              lake country, with Hyco Lake not far out of town. Life here runs at its own
              pace, and people tend to know their neighbors. When it comes to health care,
              though, a lot of Roxboro folks end up driving. Specialists often mean a trip
              toward Durham, and that is where plan networks start to matter.
            </p>
            <p>
              A plan that covers your local doctor fine can still leave you paying more for
              the specialist you see a few times a year. A twenty-minute review catches
              that before January locks it in.
            </p>
            <p>
              The other pattern here is the mail avalanche. Turn 65 in Person County and
              your mailbox fills up fast. Most of it is marketing. I will help you sort
              the real deadlines from the noise. And since Medicare Advantage availability
              can vary by county, we will check what is offered at your Person County
              address, not somebody else&apos;s.
            </p>
            <p>
              A lot of Roxboro folks are also helping a parent figure this out, which is
              its own kind of stressful. If that is you, bring them along. The review
              works the same, and the questions get answered for both of you.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Local Resources Worth Knowing</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              <strong>Person County Public Library</strong>, 319 S. Main St., Roxboro, NC
              27573. Right downtown on Main Street, with quiet tables and easy parking. If
              you would rather sit down with your plan paperwork than talk on the phone,
              it is a good spot for that.
            </p>
            <p>
              <strong>Person County Senior Center</strong>, 87 Semora Rd, Roxboro, NC
              27573. The county&apos;s senior center, running fitness programs, meals,
              education, and social activities for older adults. They also run in-home
              services for folks who can&apos;t easily get out. Worth a visit on its own
              merits, whether or not we ever talk.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Annual Enrollment: October 15 to December 7</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              Every fall, Medicare Advantage and Part D plans can change their costs, their
              drug lists, and their doctor networks for the next year. Your plan is supposed
              to mail you an Annual Notice of Change by the end of September, listing what
              is different for 2027.
            </p>
            <p>
              Bring that letter to a review and I will walk you through it in plain
              English. What changed, what it could cost you, and what you may want to
              double-check before December 7. I explain the ANOC letter in more detail on{" "}
              <Link href="/anoc" className="underline underline-offset-2">
                my ANOC page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">What a Free Review Covers</h2>
          <div className="text-17 mt-4 space-y-4 leading-relaxed text-[var(--color-ink-muted)]">
            <p>
              A free review with me is a conversation, not a sales pitch. For Roxboro folks,
              the big one is usually the driving: if your specialists are toward Durham, we
              check every one of them against next year&apos;s network before you commit.
              Here&apos;s the full list:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Your current coverage and what you pay each month</li>
              <li>Every doctor you see, local and toward Durham, checked against next year&apos;s network</li>
              <li>What your prescriptions will cost under the new plan details</li>
              <li>Whatever has been confusing you, explained straight</li>
            </ul>
            <p>
              Phone, video, or in person. Twenty minutes. Bring your spouse or a family
              member if you like. These decisions usually affect the whole household.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <ReviewCta />
        </div>
      </section>

      <section className="bg-[var(--color-paper)] py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Common Questions in Roxboro</h2>
          <div className="mt-6 space-y-6">
            {FAQ.map((item) => (
              <div key={item.q}>
                <h3 className="text-20 font-semibold">{item.q}</h3>
                <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <h2 className="text-28 font-semibold">Where I serve</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            I&apos;m based over in Creedmoor, in Granville County (
            <Link href="/medicare-creedmoor-nc" className="underline underline-offset-2">
              my home base
            </Link>
            ), and I help folks across northern North Carolina by phone, video, or in
            person. Folks over in{" "}
            <Link href="/medicare-oxford-nc" className="underline underline-offset-2">
              Oxford
            </Link>{" "}
            are covered too, and you can{" "}
            <Link href="/medicare-nc-towns/" className="underline underline-offset-2">
              see every town I serve
            </Link>
            .
          </p>
          <div className="mt-10">
            <ReviewCta />
          </div>
        </div>
      </section>

      <KitchenTableClose
        heading="Medicare help that knows Person County"
        body="About twenty minutes, free, and you&apos;ll actually understand your options. No call centers, just me."
        href="/plan-check"
        label="Take the plan-fit quiz →"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <p className="text-15 mt-8 leading-relaxed text-[var(--color-ink-muted)]">
          We do not offer every plan available in your area. Currently we represent 8 organizations
          which offer 65 products in your area. Please contact Medicare.gov or 1-800-MEDICARE to
          get information on all of your options.
        </p>
        <ComplianceDisclosure variant="medicare" />
      </div>
    </main>
  );
}
