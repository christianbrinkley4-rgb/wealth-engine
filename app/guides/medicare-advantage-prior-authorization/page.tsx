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
 * Medicare Advantage prior authorization: what to do when care is denied.
 *
 * Appeal deadlines and decision timeframes follow Medicare.gov's page on
 * appeals in a Medicare health plan, checked October 13, 2026.
 */

const PATH = "/guides/medicare-advantage-prior-authorization";

export const metadata: Metadata = {
  title: {
    absolute: "Medicare Advantage Prior Authorization: If Care Is Denied",
  },
  description: "Prior authorization means your Medicare Advantage plan has to approve some care first. Here's how it works, and the steps and deadlines if your plan says no.",
  alternates: { canonical: PATH },
  openGraph: pageOpenGraph({
    title: "Medicare Advantage prior authorization: what to do when care is denied",
    description: "If your Medicare Advantage plan denies a prior authorization, you can appeal. Here are the steps, the deadlines, and who can help.",
    path: PATH,
  }),
  twitter: pageTwitter({
    title: "Medicare Advantage prior authorization: what to do when care is denied",
    description: "If your Medicare Advantage plan denies a prior authorization, you can appeal. Here are the steps, the deadlines, and who can help.",
    path: PATH,
  }),
};

const FAQS: ReadonlyArray<{ q: string; a: string }> = [
  {
    q: "What is prior authorization in Medicare Advantage?",
    a: "Prior authorization means your plan must approve certain services or drugs before it will cover them. Your doctor's office usually sends the request along with your medical records, and the plan approves or denies it.",
  },
  {
    q: "What can I do if my Medicare Advantage plan denies a prior authorization?",
    a: "You can appeal. Start by asking your doctor to send more information, then file a reconsideration with the plan. If the plan upholds its denial, the case is automatically sent to an independent reviewer outside the plan.",
  },
  {
    q: "How long do I have to appeal a Medicare Advantage denial?",
    a: "You generally have 65 days from the date on the plan's denial notice to file an appeal. If you miss the deadline, you can still ask, but you'll need to explain why you're late.",
  },
  {
    q: "How fast does a Medicare Advantage plan have to decide an appeal?",
    a: "For a service you haven't received yet, the plan generally has 30 days. For a fast appeal, it has 72 hours. For Part B drugs, it has 7 days. For payment appeals, it has 60 days.",
  },
  {
    q: "Does Original Medicare require prior authorization?",
    a: "Only for a limited number of services. Medicare Advantage plans use prior authorization much more widely, and each plan sets its own list of services that need approval.",
  },
];

export default function MedicareAdvantagePriorAuthorizationPage() {
  return (
    <main className="text-[var(--color-navy)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Guides", path: PATH },
              { name: "Prior authorization", path: PATH },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              headline: "Medicare Advantage Prior Authorization: If Care Is Denied",
              description: "Prior authorization means your Medicare Advantage plan has to approve some care first. Here's how it works, and the steps and deadlines if your plan says no.",
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
        crumbs={[{ name: "Home", href: "/" }, { name: "Guides" }, { name: "Prior authorization" }]}
        eyebrow="Guide · Updated October 13, 2026"
        title={"Medicare Advantage prior authorization: what to do when care is denied"}
        lede={"Your doctor ordered something, and your plan said it needs approval first. Or worse, it said no. That's prior authorization. You have more options than the denial letter makes it feel like."}
        secondaryHref="/schedule?topic=medicare"
        secondaryLabel="Book a free consultation"
      />

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-4xl">
          <div className="rounded-xl border-2 border-[var(--color-navy)] bg-[var(--color-paper)] p-6">
            <p className="text-19 font-semibold">In short</p>
            <p className="text-17 mt-2 leading-relaxed text-[var(--color-ink-muted)]">
              {"Prior authorization means your Medicare Advantage plan must approve certain services or drugs before it will pay. If the plan denies the request, you can appeal. You generally have 65 days from the date on the denial notice, and your doctor can ask for a fast decision if waiting could harm your health."}
            </p>
          </div>

          <h2 className="text-28 mt-12 font-semibold">{"What prior authorization is"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"Prior authorization is a plan's way of reviewing care before it happens. Your doctor's office sends the plan the order and your medical records. The plan decides whether the service meets its coverage rules, and then approves or denies it."}
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"Medicare Advantage plans use it for things like hospital stays that aren't emergencies, rehab in a skilled nursing facility, advanced imaging, some surgeries, and certain drugs. Each plan has its own list. Emergency care doesn't need approval ahead of time."}
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"Original Medicare uses prior authorization for far fewer services. That's one of the real differences between the two paths, and it's worth knowing when you choose."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"How to avoid surprises"}</h2>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong className="text-[var(--color-navy)]">{"Ask before you schedule."}</strong>{" "}
              {"When your doctor orders a test or procedure, ask the office whether it needs prior authorization and whether they've requested it."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Get the approval details."}</strong>{" "}
              {"Ask for the authorization number and the dates it covers."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Stay in network."}</strong>{" "}
              {"An approval usually applies to a specific provider. Going somewhere else can undo it."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Check your Evidence of Coverage."}</strong>{" "}
              {"It lists which services need prior authorization under your plan."}
            </li>
          </ul>
          <h2 className="text-28 mt-12 font-semibold">{"If the plan says no"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"A denial has to come in writing. The notice explains why the plan said no and how to appeal. Read it and keep it. Then work through these steps."}
          </p>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong className="text-[var(--color-navy)]">{"Call your doctor's office first."}</strong>{" "}
              {"Many denials come from missing records or a coding problem. Your doctor can send more information or talk directly with the plan's medical reviewer."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"File an appeal with the plan."}</strong>{" "}
              {"This is called a reconsideration. You generally have 65 days from the date on the denial notice. You, your doctor, or someone you appoint can file it."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Ask for a fast appeal if your health can't wait."}</strong>{" "}
              {"If your doctor says that waiting could seriously harm your health, the plan has to give you a decision within 72 hours."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"Send supporting records."}</strong>{" "}
              {"A letter from your doctor explaining why the care is medically necessary is the most useful thing you can include."}
            </li>
          </ul>
          <h2 className="text-28 mt-12 font-semibold">{"How long the plan has to answer"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"For an appeal about a service you haven't had yet, the plan generally has 30 days to decide. For a fast appeal, it's 72 hours. For a Part B drug, it's 7 days. For an appeal about payment for care you already received, it's 60 days. In some cases the plan can take up to 14 extra days and must tell you in writing."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"If the plan still says no"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"You don't have to do anything to reach the next step. If the plan upholds its denial, your case is automatically sent to an independent reviewer outside the plan. Medicare calls this the Independent Review Entity. It looks at the case fresh."}
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"If that reviewer also says no, there are more levels, starting with a hearing before an administrative law judge, as long as the amount in dispute meets a minimum. Each decision letter explains how to ask for the next level and the deadline."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"Who can help you for free"}</h2>
          <ul className="text-17 mt-4 flex list-disc flex-col gap-3 pl-6 leading-relaxed text-[var(--color-ink-muted)]">
            <li>
              <strong className="text-[var(--color-navy)]">{"Your doctor's office."}</strong>{" "}
              {"They deal with these requests every day and have the records the plan needs."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"NC SHIIP."}</strong>{" "}
              {"Counselors can explain your appeal rights and help you with the paperwork. Call 1-855-408-1212."}
            </li>
            <li>
              <strong className="text-[var(--color-navy)]">{"1-800-MEDICARE."}</strong>{" "}
              {"They can explain the process and take a complaint about a plan."}
            </li>
          </ul>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"You can also appoint a family member or someone else you trust to handle the appeal for you. There's a Medicare form for naming a representative."}
          </p>
          <h2 className="text-28 mt-12 font-semibold">{"If this keeps happening"}</h2>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"One denial doesn't mean your plan is a bad fit. A pattern might. If you're regularly waiting on approvals for care your doctors say you need, look at your options during the fall window. I explain how that works on the "}
            <Link href="/aep" className="underline underline-offset-2">
              {"Annual Enrollment page"}
            </Link>
            {", and the "}
            <Link href="/aep-checklist" className="underline underline-offset-2">
              {"AEP checklist"}
            </Link>
            {" lists what to compare."}
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"If you're in a Medicare Advantage plan on January 1, you also get one chance to change between January 1 and March 31. Be careful about one thing: going back to Original Medicare is always possible in those windows, but getting a Medicare Supplement to go with it may require answering health questions."}
          </p>
          <p className="text-17 mt-4 leading-relaxed text-[var(--color-ink-muted)]">
            {"If you want help reading a denial letter or weighing whether to change plans, "}
            <Link href="/schedule?topic=medicare" className="underline underline-offset-2">
              {"book a free consultation"}
            </Link>
            {". I don't decide appeals, but I can help you understand the letter and your choices."}
          </p>
          <p className="text-16 mt-8 leading-relaxed text-[var(--color-ink-muted)]">
            {"Sources, checked October 13, 2026: "}
            <a href="https://www.medicare.gov/providers-services/claims-appeals-complaints/appeals/medicare-health-plans" rel="noopener" className="underline underline-offset-2">
              {"Medicare.gov: appeals in a Medicare health plan"}
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
            {"Holding a denial letter and not sure what it means?"} Call or text Christian Brinkley in Greensboro, NC at {AGENT.phone}.
            The consultation is free, with no obligation.
          </p>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="measure-prose app-shell max-w-3xl">
          <StandaloneRelatedLinks slug="medicare-advantage-prior-authorization" />
          <GuideCapture />
        </div>
      </section>

      <KitchenTableClose
        heading={"Read the denial letter with someone"}
        body={`${"Bring the letter and your plan card. We'll go through what it says, what your deadline is, and whether your plan still fits the care you need."} Call or text ${AGENT.phone}.`}
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
