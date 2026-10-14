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
 * Medicare and VA benefits: do you need both?
 *
 * Federal rules only. The Kernersville VA Health Care Center is named as a
 * local reference (part of the Salisbury VA Health Care System).
 */

const PATH = "/guides/medicare-and-va-benefits";

export const metadata: Metadata = {
  title: {
    absolute: "Medicare and VA Benefits: Do You Need Both?",
  },
  description: "VA health care and Medicare are separate programs that don't pay each other's bills. Here's what each one covers, why Part B timing matters, and how veterans in the Triad use both.",
  alternates: { canonical: PATH },
  openGraph: pageOpenGraph({
    title: "Medicare and VA benefits: do you need both?",
    description: "VA care and Medicare don't work together, but many veterans keep both. Here's what Medicare adds and why delaying Part B can cost you.",
    path: PATH,
  }),
  twitter: pageTwitter({
    title: "Medicare and VA benefits: do you need both?",
    description: "VA care and Medicare don't work together, but many veterans keep both. Here's what Medicare adds and why delaying Part B can cost you.",
    path: PATH,
  }),
};

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "Do I need Medicare if I have VA health care?",
    a: "You're not required to have it, but the two are separate programs. Medicare covers care from civilian doctors and hospitals, which VA health care generally doesn't cover unless the VA authorizes it. Many veterans keep both for that reason.",
  },
  {
    q: "Does VA coverage let me delay Medicare Part B without a penalty?",
    a: "No. VA health care doesn't protect you from the Part B late enrollment penalty. If you delay Part B without coverage from a current job, the premium goes up 10% for each full 12 months you waited, for as long as you have Part B.",
  },
  {
    q: "Do I need Medicare Part D if I get prescriptions from the VA?",
    a: "Not necessarily. VA prescription coverage is creditable drug coverage, so you can delay Part D without a late penalty as long as you keep it. Some veterans add Part D to fill prescriptions from civilian doctors.",
  },
  {
    q: "Can I use Medicare at a VA hospital?",
    a: "Generally no. Medicare doesn't pay for care you get at VA facilities, and the VA doesn't bill Medicare. You use your VA benefits at the VA and your Medicare coverage with civilian providers.",
  },
  {
    q: "Can a veteran have a Medicare Advantage plan and VA health care?",
    a: "Yes. You can enroll in a Medicare Advantage plan and keep using VA health care. The plan's network applies only to civilian care. Your VA care is separate and continues under VA rules.",
  },
];

export default function MedicareAndVaBenefitsPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: PATH },
              { name: "Medicare and VA benefits", path: PATH },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Medicare and VA Benefits: Do You Need Both?",
              description: "VA health care and Medicare are separate programs that don't pay each other's bills. Here's what each one covers, why Part B timing matters, and how veterans in the Triad use both.",
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
        crumbs={[{ name: "Home", href: "/" }, { name: "Guides" }, { name: "Medicare and VA benefits" }]}
        eyebrow="Guide · Updated October 13, 2026"
        title={"Medicare and VA benefits: do you need both?"}
        lede={"If you get your care through the VA, Medicare can feel like paying for something you already have. For some veterans that's true. For a lot of them it isn't. Here's how to think it through."}
        secondaryHref="/start?topic=medicare&quick=1"
        secondaryLabel="Request a free consultation"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-4xl">
          <div className="rounded-xl border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-6">
            <p className="text-19 font-semibold">In short</p>
            <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
              {"VA health care and Medicare are separate. Medicare doesn't pay for care at VA facilities, and the VA generally doesn't pay for care outside the VA unless it authorizes it first. Having both gives you more choices. If you skip Part B at 65 and want it later, you'll usually pay a late penalty, because VA coverage doesn't protect you from it."}
            </p>
          </div>

          <h2 className="text-28 mt-12 font-semibold">{"Two programs that don't talk to each other"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"This is the main thing to understand. VA health care is a benefit you earned through service, delivered through VA hospitals and clinics. Medicare is federal health insurance that works with civilian doctors and hospitals. They don't coordinate, and one doesn't fill in for the other."}
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"If you go to a VA facility, the VA covers it under VA rules. If you go to a civilian doctor or hospital, Medicare covers it under Medicare rules. You choose which benefit to use each time you get care."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"What Medicare adds if you already use the VA"}</h2>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong className="text-[var(--color-navy)]">{"Care outside the VA."}</strong>{" "}
              {"With Medicare, you can see civilian doctors and specialists and use local hospitals without needing the VA to approve it first."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"A closer option in an emergency."}</strong>{" "}
              {"If the nearest emergency room isn't a VA facility, Medicare gives you coverage there."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Protection if your VA situation changes."}</strong>{" "}
              {"VA health care depends on funding from Congress, and veterans are placed in priority groups. Medicare is a backstop that doesn't depend on either."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Flexibility if you move or travel."}</strong>{" "}
              {"Original Medicare works with any doctor in the country who accepts Medicare."}
            </li>
          </ul>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"The VA itself encourages veterans to sign up for Medicare when they become eligible, for these same reasons."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"The Part B decision"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"Most veterans get Part A at 65 with no monthly premium, the same as everyone else who worked long enough. Part B is the one with a monthly premium, and it's the one people are tempted to skip."}
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"Here's the catch. VA health care does not count as the kind of coverage that lets you delay Part B without a penalty. If you don't sign up when you're first eligible and you don't have coverage through a current job, the Part B late penalty adds 10% to your premium for each full 12 months you waited. It stays for as long as you have Part B."}
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"You'd also have to wait for the General Enrollment Period, January through March, to sign up. So skipping Part B isn't something you can easily undo. You can estimate the cost with the "}
            <Link href="/part-b-penalty" className="underline underline-offset-2">
              {"Part B penalty calculator"}
            </Link>
            {"."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"Part D is different"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"VA prescription coverage counts as creditable drug coverage. That means you can go without a Medicare drug plan and not build up a Part D late penalty, as long as you keep your VA drug coverage."}
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"Some veterans add Part D anyway so they can fill prescriptions from civilian doctors at a local pharmacy. That's a personal call. The point is that waiting on Part D doesn't carry the same risk as waiting on Part B."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"TRICARE for Life and CHAMPVA follow different rules"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"VA health care isn't the same thing as TRICARE or CHAMPVA. If you're a military retiree with TRICARE, you generally need both Part A and Part B at 65 to keep coverage through TRICARE for Life. CHAMPVA has a similar requirement for most people 65 and older. If either applies to you, confirm the rules with that program before you make a Part B decision."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"Should a veteran look at Medicare Advantage or a supplement?"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"It depends on how you plan to use each benefit. There isn't one right answer."}
          </p>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong className="text-[var(--color-navy)]">{"If you'll use the VA for nearly everything,"}</strong>{" "}
              {"you may want Medicare mainly as a backup. Some veterans keep Original Medicare alone. Others pick a Medicare Advantage plan. Either way, check what you'd pay if you did use it."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"If you'll split your care,"}</strong>{" "}
              {"look closely at which civilian doctors you see and whether a plan's network includes them."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"If you want the widest choice of civilian doctors,"}</strong>{" "}
              {"Original Medicare with a Medicare Supplement works with any doctor who accepts Medicare, though it usually has a higher monthly premium."}
            </li>
          </ul>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"Remember that a Medicare Advantage plan's network has nothing to do with the VA. Your VA care continues either way."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"For veterans in the Triad"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"A lot of veterans around here use the Kernersville VA Health Care Center, which is part of the Salisbury VA Health Care System. If that's where you get most of your care, the useful question is what you'd want covered closer to home. Think about your local hospital, a specialist you already see, or urgent care on a weekend."}
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"Once you're on Medicare, you can review your choices every fall. I explain that window on the "}
            <Link href="/aep" className="underline underline-offset-2">
              {"Annual Enrollment page"}
            </Link>
            {". If you'd like to talk through your own situation, "}
            <Link href="/start?topic=medicare&quick=1" className="underline underline-offset-2">
              {"book a free consultation"}
            </Link>
            {". I'm not part of the VA and I can't speak for it, but I can show you what the Medicare side would cost and cover."}
          </p>
          <p className="text-16 mt-8 leading-relaxed text-[var(--color-ink-muted)]">
            {"Sources, checked October 13, 2026: "}
            <a href="https://www.va.gov/salisbury-health-care/locations/kernersville-va-clinic" rel="noopener" className="underline underline-offset-2">
              {"VA Salisbury health care: Kernersville VA Clinic"}
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
            {"A veteran turning 65 and weighing Part B?"} Call or text Christian Brinkley in Greensboro, NC at {AGENT.phone}.
            The consultation is free, with no obligation.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <StandaloneRelatedLinks slug="medicare-and-va-benefits" />
          <GuideCapture />
        </div>
      </section>

      <KitchenTableClose
        heading={"See what Medicare would add to your VA care"}
        body={`${"Tell me where you get care now and what you'd want covered outside the VA. We'll look at what each Medicare option would cost and cover."} Call or text ${AGENT.phone}.`}
        href="/start?topic=medicare&quick=1"
        label="Request a free consultation"
      />

      <div className="measure-prose app-shell max-w-3xl pb-12">
        <ComplianceDisclosure variant="medicare" />
      </div>
      <MedicareByline reviewed="2026-10-13" />
    </main>
  );
}
