import { SeoGuidePage, seoGuideMetadata, type SeoGuideData } from "@/app/components/SeoGuidePage";
import {
  IRS_IR_2026_133_URL,
  IRS_RP_2026_35_URL,
  STANDARD_DEDUCTION_MFJ_2027,
  STANDARD_DEDUCTION_SINGLE_2027,
  TAX_BRACKETS_MFJ_2027,
  TAX_BRACKETS_SINGLE_2027,
} from "@/lib/irsSsaFigures";
import { SITE_INDEXABLE } from "@/lib/seo";

const data: SeoGuideData = {
  slug: "tax-brackets-explained-plainly",
  path: "/wealth/tax-brackets-explained-plainly",
  scope: "general",
  title: "Tax brackets explained with a 2027 example",
  metaTitle: "Tax Brackets Explained: 2027 Rates and an Example",
  description:
    "See tax brackets explained with 2027 federal rates and a worked example. Learn marginal versus effective rates and why a raise doesn't retax all income.",
  published: "2026-10-08",
  reviewed: "2026-11-18",
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
      title: "The 2027 federal income tax brackets",
      paragraphs: [
        "Use these thresholds for tax year 2027, including returns filed in 2028. The table shows whole-dollar ranges for single and married filing jointly. Head of household and married filing separately have different schedules in the [IRS 2027 inflation adjustments](" + IRS_IR_2026_133_URL + ").",
        "Read each row as another layer. A single filer's income above $52,025 can enter the 22% bracket without changing the 10% and 12% rates on earlier layers. The table doesn't calculate credits, additional taxes, or special rates for certain investment income.",
      ],
      table: {
        caption: "2027 ordinary federal income tax brackets by taxable income",
        headers: ["Rate", "Single", "Married filing jointly"],
        rows: [
          ["10%", TAX_BRACKETS_SINGLE_2027[0], TAX_BRACKETS_MFJ_2027[0]],
          ["12%", TAX_BRACKETS_SINGLE_2027[1], TAX_BRACKETS_MFJ_2027[1]],
          ["22%", TAX_BRACKETS_SINGLE_2027[2], TAX_BRACKETS_MFJ_2027[2]],
          ["24%", TAX_BRACKETS_SINGLE_2027[3], TAX_BRACKETS_MFJ_2027[3]],
          ["32%", TAX_BRACKETS_SINGLE_2027[4], TAX_BRACKETS_MFJ_2027[4]],
          ["35%", TAX_BRACKETS_SINGLE_2027[5], TAX_BRACKETS_MFJ_2027[5]],
          ["37%", TAX_BRACKETS_SINGLE_2027[6], TAX_BRACKETS_MFJ_2027[6]],
        ],
      },
    },
    {
      title: "A $60,000 example, with each step shown",
      paragraphs: [
        "Assume a single filer under 65 has $60,000 of wage income, no adjustments, no additional deductions, and no credits. The 2027 standard deduction of " + STANDARD_DEDUCTION_SINGLE_2027 + " leaves $43,400 of taxable income.",
        "The marginal bracket in this example is 12%. Both 8.3% and 11.4% below describe a ratio, but they use different denominators. This example excludes payroll and state taxes. It isn't a personalized return calculation.",
      ],
      table: {
        caption: "Illustrative 2027 federal income tax before credits",
        headers: ["Step", "Calculation", "Result"],
        rows: [
          ["Taxable income", "$60,000 minus " + STANDARD_DEDUCTION_SINGLE_2027, "$43,400"],
          ["First layer", "$12,800 × 10%", "$1,280"],
          ["Remaining layer", "$30,600 × 12%", "$3,672"],
          ["Federal income tax", "$1,280 plus $3,672", "$4,952"],
          ["Tax divided by gross income", "$4,952 ÷ $60,000", "About 8.3%"],
          ["Tax divided by taxable income", "$4,952 ÷ $43,400", "About 11.4%"],
        ],
      },
    },
    {
      title: "The standard deduction changes the starting point",
      paragraphs: [
        "For 2027, the standard deduction is " + STANDARD_DEDUCTION_SINGLE_2027 + " for single filers and " + STANDARD_DEDUCTION_MFJ_2027 + " for married couples filing jointly. Eligibility, filing circumstances, and additional deductions can change the result. Itemizing requires a comparison with the deductions actually available to you.",
        "Older taxpayers may have additional deduction questions. The [2026 deduction guide for seniors](/guides/standard-deduction-seniors-2026) still walks through 2026 amounts. Use the 2027 figures above for tax year 2027. The IRS source below provides the tax-year amounts.",
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
      a: "No. They are federal ordinary-income brackets for tax year 2027. State tax and payroll taxes require separate calculations.",
    },
    {
      q: "Why is the example's effective rate 8.3%, not 11.4%?",
      a: "The 8.3% figure divides $4,952 of tax by $60,000 of gross income. The 11.4% figure divides the same tax by $43,400 of taxable income. The label needs to identify the denominator.",
    },
    {
      q: "Are these the brackets for a return I file in 2027?",
      a: "Use these brackets for tax year 2027, including a 2027 return filed in 2028. A return for tax year 2026 uses that year's rules even if you file it during 2027.",
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
      label: "IRS: IR-2026-133, tax year 2027 inflation adjustments",
      href: IRS_IR_2026_133_URL,
    },
    {
      label: "IRS: Revenue Procedure 2026-35",
      href: IRS_RP_2026_35_URL,
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
