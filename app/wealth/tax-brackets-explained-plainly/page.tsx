import { SeoGuidePage, seoGuideMetadata, type SeoGuideData } from "@/app/components/SeoGuidePage";
import { SITE_INDEXABLE } from "@/lib/seo";

const data: SeoGuideData = {
  slug: "tax-brackets-explained-plainly",
  path: "/wealth/tax-brackets-explained-plainly",
  scope: "general",
  title: "Tax brackets explained with a 2026 example",
  metaTitle: "Tax Brackets Explained: 2026 Rates and an Example",
  description:
    "See tax brackets explained with 2026 federal rates and a worked example. Learn marginal versus effective rates and why a raise doesn't retax all income.",
  published: "2026-10-08",
  answer:
    "Federal income tax brackets apply different rates to different layers of taxable income. Entering a higher bracket doesn't apply that higher rate to all your income, only the portion in that bracket.",
  sections: [
    {
      title: "Taxable income comes first",
      paragraphs: [
        "Your paycheck and taxable income aren't necessarily the same. Adjustments and deductions can change the amount subject to the bracket calculation. This explanation covers ordinary federal income tax. Payroll taxes, state taxes, and some investment income follow separate rules.",
        "Your marginal bracket is the rate on your highest layer of ordinary taxable income. An effective rate is a ratio of tax to an income measure. Say whether the denominator is gross income, adjusted gross income, or taxable income before comparing percentages.",
      ],
    },
    {
      title: "The 2026 federal income tax brackets",
      paragraphs: [
        "Use these thresholds for tax year 2026, including returns filed in 2027. The table shows whole-dollar ranges for single and married filing jointly. Head of household and married filing separately have different schedules in the [IRS 2026 rate guidance](https://www.irs.gov/irb/2025-45_IRB).",
        "Read each row as another layer. A single filer's income above $50,400 can enter the 22% bracket without changing the 10% and 12% rates on earlier layers. The table doesn't calculate credits, additional taxes, or special rates for certain investment income.",
      ],
      table: {
        caption: "2026 ordinary federal income tax brackets by taxable income",
        headers: ["Rate", "Single", "Married filing jointly"],
        rows: [
          ["10%", "$0 to $12,400", "$0 to $24,800"],
          ["12%", "$12,401 to $50,400", "$24,801 to $100,800"],
          ["22%", "$50,401 to $105,700", "$100,801 to $211,400"],
          ["24%", "$105,701 to $201,775", "$211,401 to $403,550"],
          ["32%", "$201,776 to $256,225", "$403,551 to $512,450"],
          ["35%", "$256,226 to $640,600", "$512,451 to $768,700"],
          ["37%", "Over $640,600", "Over $768,700"],
        ],
      },
    },
    {
      title: "A $60,000 example, with each step shown",
      paragraphs: [
        "Assume a single filer under 65 has $60,000 of wage income, no adjustments, no additional deductions, and no credits. The 2026 standard deduction of $16,100 leaves $43,900 of taxable income.",
        "The marginal bracket in this example is 12%. Both 8.4% and 11.4% below describe a ratio, but they use different denominators. This example excludes payroll and state taxes. It isn't a personalized return calculation.",
      ],
      table: {
        caption: "Illustrative 2026 federal income tax before credits",
        headers: ["Step", "Calculation", "Result"],
        rows: [
          ["Taxable income", "$60,000 minus $16,100", "$43,900"],
          ["First layer", "$12,400 × 10%", "$1,240"],
          ["Remaining layer", "$31,500 × 12%", "$3,780"],
          ["Federal income tax", "$1,240 plus $3,780", "$5,020"],
          ["Tax divided by gross income", "$5,020 ÷ $60,000", "About 8.4%"],
          ["Tax divided by taxable income", "$5,020 ÷ $43,900", "About 11.4%"],
        ],
      },
    },
    {
      title: "The standard deduction changes the starting point",
      paragraphs: [
        "For 2026, the standard deduction is $16,100 for single filers and $32,200 for married couples filing jointly. Eligibility, filing circumstances, and additional deductions can change the result. Itemizing requires a comparison with the deductions actually available to you.",
        "Older taxpayers may have additional deduction questions. Read the [2026 deduction guide for seniors](/guides/standard-deduction-seniors-2026) rather than applying the under-65 example unchanged. The IRS source below provides the tax-year amounts.",
      ],
    },
    {
      title: "A higher bracket isn't the whole benefit calculation",
      paragraphs: [
        "The bracket system doesn't retax earlier income layers at the new rate. If another dollar falls in the 22% ordinary-income bracket, that fact alone doesn't make every earlier dollar subject to 22%.",
        "Credits, deductions, and income-tested benefits can still change when income rises. Don't use the bracket rule as a promise about every household's take-home pay. A tax professional can check the full return, especially before a retirement withdrawal or Roth conversion.",
      ],
    },
  ],
  faqs: [
    {
      q: "Does a raise put all my income in the higher bracket?",
      a: "No. The higher ordinary-income rate applies only to income in that layer. Credits, deductions, and benefits can have separate income rules.",
    },
    {
      q: "Do these brackets include North Carolina tax?",
      a: "No. They are federal ordinary-income brackets for tax year 2026. State tax and payroll taxes require separate calculations.",
    },
    {
      q: "Why is the example's effective rate 8.4%, not 11.4%?",
      a: "The 8.4% figure divides $5,020 of tax by $60,000 of gross income. The 11.4% figure divides the same tax by $43,900 of taxable income. The label needs to identify the denominator.",
    },
    {
      q: "Are these the brackets for a return I file in 2026?",
      a: "Use these brackets for tax year 2026, including a 2026 return filed in 2027. A return for tax year 2025 uses that year's rules even if you file it during 2026.",
    },
    {
      q: "Is my marginal bracket my total tax rate?",
      a: "No. It describes the rate on the highest layer of ordinary taxable income. It doesn't mean every dollar is taxed at that rate, and it doesn't include every other tax or credit.",
    },
  ],
  sources: [
    {
      label: "IRS: Federal income tax rates and brackets",
      href: "https://www.irs.gov/filing/federal-income-tax-rates-and-brackets",
    },
    {
      label: "IRS: Revenue Procedure 2025-32, 2026 inflation adjustments",
      href: "https://www.irs.gov/irb/2025-45_IRB",
    },
    {
      label: "IRS: Tax provisions for individuals and workers",
      href: "https://www.irs.gov/newsroom/working-families-tax-cuts-individuals-and-workers",
    },
  ],
  related: [
    { label: "Your first tax return, explained", href: "/wealth/first-tax-return-guide" },
    {
      label: "Additional deduction questions for older taxpayers",
      href: "/guides/standard-deduction-seniors-2026",
    },
    { label: "Roth versus traditional: the tax trade", href: "/wealth/roth-vs-traditional-taxes" },
    { label: "Retirement withdrawal exceptions", href: "/guides/72t-exceptions" },
  ],
  closing:
    "Written by Christian Brinkley, a licensed NC insurance agent in Greensboro, NC. This is general education, not personalized tax advice. For an insurance question, book a conversation or call (919) 408-6671.",
  bookingLabel: "Book an insurance conversation",
};

// Search target exception (lib/indexFocus.ts): override the /wealth layout noindex.
export const metadata = { ...seoGuideMetadata(data), robots: { index: SITE_INDEXABLE, follow: SITE_INDEXABLE } };
export default function Page() {
  return <SeoGuidePage data={data} />;
}
