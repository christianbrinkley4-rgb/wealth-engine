import { SeoGuidePage, seoGuideMetadata, type SeoGuideData } from "@/app/components/SeoGuidePage";

const data: SeoGuideData = {
  slug: "72t-exceptions",
  scope: "general",
  title: "72t exceptions for retirement account withdrawals",
  metaTitle: "72t Exceptions: IRA, 401k, and SEPP Rules",
  description:
    "Compare 72t exceptions for retirement withdrawals. See why IRA and 401k rules differ, how SEPP payments work, and which tax can still apply.",
  published: "2026-11-05",
  answer:
    "Section 72(t) generally adds a 10% tax to taxable early retirement distributions unless an exception applies. The exceptions differ by account type, and substantially equal periodic payments are only one exception.",
  sections: [
    {
      title: "Start with the account type and the tax",
      paragraphs: [
        "An exception to the additional early distribution tax doesn't automatically remove ordinary income tax. It also doesn't require an employer plan to allow a withdrawal. Access to funds and the tax treatment are separate questions.",
        "Identify the account, your age, the reason for the withdrawal, and the applicable year before comparing exceptions. This guide summarizes selected rules for IRAs and workplace plans. It isn't a complete list or a personalized withdrawal recommendation.",
      ],
    },
    {
      title: "IRA and 401(k) exceptions don't match",
      paragraphs: [
        "These examples come from the [IRS early-distribution exception chart](https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-exceptions-to-tax-on-early-distributions). Each has its own eligibility conditions. A Roth account's tax treatment requires additional analysis.",
        "A hardship withdrawal by itself isn't an exception to the additional tax. An employer plan's ability to release money doesn't establish an IRS exception. See [401k-specific early withdrawal exceptions](/guides/401k-early-withdrawal-exceptions) for that account's rules.",
      ],
      table: {
        caption: "Selected exceptions to the additional early distribution tax",
        headers: ["Reason", "IRA", "401(k) or similar qualified plan"],
        rows: [
          [
            "Qualified higher education expenses",
            "An exception can apply",
            "This IRA exception doesn't apply",
          ],
          [
            "Qualified first home purchase",
            "An exception can apply, with a lifetime limit",
            "This IRA exception doesn't apply",
          ],
          [
            "Separation in or after the year you turn 55",
            "Doesn't apply to an IRA",
            "Can apply to distributions from the employer plan tied to that separation",
          ],
          [
            "Qualified domestic relations order",
            "The workplace-plan exception doesn't apply",
            "Can apply to an alternate payee under a qualifying order",
          ],
          [
            "Substantially equal periodic payments",
            "Can apply if the series meets the rules",
            "Can apply, with separation from service required before payments begin",
          ],
          ["Qualifying disability", "An exception can apply", "An exception can apply"],
        ],
      },
    },
    {
      title: "What people mean by a 72(t) plan",
      paragraphs: [
        "People often use that phrase to mean a series of substantially equal periodic payments, or SEPP. The IRS also uses SoSEPP. It's one route under Section 72(t), not a name for every early withdrawal exception.",
        "IRS guidance describes required minimum distribution, fixed amortization, and fixed annuitization methods. The payment isn't simply any amount you'd like to withdraw. Method, account balance, life expectancy, and any applicable interest assumptions affect the calculation. Have a qualified tax professional check the schedule before starting.",
      ],
    },
    {
      title: "How long must SEPP payments continue?",
      paragraphs: [
        "The usual restriction lasts until the later of the fifth anniversary of the first payment or the date you reach age 59½. Reaching 59½ alone doesn't end a series that hasn't lasted long enough. Starting young can mean a much longer commitment than five years.",
        "Before that date, an impermissible change can trigger recapture of the additional tax previously avoided, plus interest. Extra withdrawals and additions to the account can create problems. The IRS describes limited exceptions and permitted changes, including a qualifying one-time switch from a fixed method to the required minimum distribution method. Don't treat every adjustment as allowed, or assume every change has the same consequence.",
      ],
    },
    {
      title: "Keep the schedule and tax records together",
      bullets: [
        "Identify exactly which account is in the payment series.",
        "Keep the original calculation, method, account balance, and start date.",
        "Record each distribution and check the annual amount before taking another withdrawal.",
        "Review Form 1099-R and determine whether Form 5329 is needed.",
        "Ask a tax professional before transferring money, adding funds, or changing payments.",
      ],
      paragraphs: [
        "The IRS says Form 5329 is used when an eligible exception isn't shown correctly in box 7 of Form 1099-R. A distribution code doesn't replace checking whether you actually qualify.",
      ],
    },
    {
      title: "SEPP isn't a Roth conversion ladder",
      paragraphs: [
        "A SEPP schedule follows payment rules for an early distribution exception. A [Roth conversion ladder](/guides/roth-conversion-ladder-explained) involves conversions and separate Roth IRA ordering and holding-period rules. Neither label makes taxable income disappear. Compare the rules with a qualified professional rather than choosing by a nickname.",
      ],
    },
  ],
  faqs: [
    {
      q: "Are 72(t) withdrawals income tax-free?",
      a: "Not automatically. A qualifying exception can remove the additional early distribution tax while ordinary income tax still applies to taxable amounts.",
    },
    {
      q: "Can I stop SEPP payments at 59½?",
      a: "Only after the applicable restriction has ended. The usual test is the later of age 59½ or the fifth anniversary of the first payment.",
    },
    {
      q: "Can I choose any annual SEPP withdrawal amount?",
      a: "No. The schedule must meet the relevant calculation and payment rules. A qualified tax professional should review the method and amount before distributions begin.",
    },
    {
      q: "Do IRA and 401(k) exceptions match?",
      a: "No. For example, the qualified education exception is available for IRAs, while the separation-from-service exception generally applies to qualifying workplace plan distributions, not IRAs.",
    },
  ],
  sources: [
    {
      label: "IRS: Exceptions to tax on early distributions",
      href: "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-exceptions-to-tax-on-early-distributions",
    },
    {
      label: "IRS: Substantially equal periodic payments",
      href: "https://www.irs.gov/retirement-plans/substantially-equal-periodic-payments",
    },
    {
      label: "IRS: Notice 2022-6 SEPP guidance",
      href: "https://www.irs.gov/irb/2022-05_IRB#NOT-2022-6",
    },
    { label: "IRS: About Form 5329", href: "https://www.irs.gov/forms-pubs/about-form-5329" },
  ],
  related: [
    {
      label: "401k-specific withdrawal exceptions",
      href: "/guides/401k-early-withdrawal-exceptions",
    },
    {
      label: "How a Roth conversion ladder works",
      href: "/guides/roth-conversion-ladder-explained",
    },
    { label: "Tax brackets explained", href: "/wealth/tax-brackets-explained-plainly" },
  ],
  closing:
    "Written by Christian Brinkley, a licensed NC insurance agent in Greensboro, NC. This is general education, not a withdrawal recommendation. A qualified tax professional should review a payment schedule. For an insurance question, request a conversation. (919) 408-6671",
  bookingLabel: "Book an insurance conversation",
};

export const metadata = seoGuideMetadata(data);
export default function Page() {
  return <SeoGuidePage data={data} />;
}
