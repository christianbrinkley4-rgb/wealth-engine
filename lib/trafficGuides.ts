/** Research reviewed October 8, 2026. Federal education unless marked Triad-local. */
export type TrafficGuide = {
  slug: string;
  title: string;
  description: string;
  answer: string;
  scope?: "medicare";
  sections: { title: string; body: string }[];
  comparison: { caption: string; headers: [string, string]; rows: [string, string][] };
  checklist: string[];
  faqs: { q: string; a: string }[];
  sources: { title: string; url: string }[];
  related: { title: string; href: string }[];
  query: string;
  opportunity: string;
  intent: "informational" | "transactional" | "navigational";
};

export const TRAFFIC_GUIDE_DATE = "2026-10-08";
export const TRAFFIC_GUIDES: TrafficGuide[] = [
  {
    slug: "overtime-tax-deduction-2026",
    title: "Overtime Tax Deduction 2026: What Actually Qualifies",
    description:
      "Not every overtime dollar qualifies. Check the federal overtime deduction, filing rules, payroll records, and what still gets taxed in 2026.",
    query: "does all overtime qualify for no tax on overtime 2026",
    opportunity:
      "Fresh deduction confusion. Narrow the broad headline to qualifying pay and records; national publisher and IRS competition remains strong.",
    intent: "informational",
    answer:
      "The federal overtime deduction covers qualifying overtime premiums required by the Fair Labor Standards Act. It doesn't exclude your whole overtime paycheck from tax.",
    sections: [
      {
        title: "Start with the premium, not the paycheck",
        body: "For ordinary time-and-a-half pay, the qualifying amount is generally the extra half above your regular rate. Extra pay for a holiday or weekend isn't automatically qualified overtime. Ask payroll which amount is required under the federal law. A contract or state rule can require extra pay without making all of it eligible for this federal deduction.",
      },
      {
        title: "The 2026 limits and filing rules",
        body: "The annual maximum is $12,500, or $25,000 on a joint return. The deduction starts shrinking above modified adjusted gross income of $150,000, or $300,000 jointly. Married taxpayers must file jointly to qualify. A valid Social Security number is required. The provision applies to tax years 2025 through 2028 and is available whether you itemize or take the standard deduction.",
      },
      {
        title: "Why your paystub still shows taxes",
        body: "A deduction lowers taxable income. It isn't a dollar-for-dollar refund. Social Security and Medicare payroll taxes still apply. State treatment can differ. Use the tax-year instructions and your employer's reporting, rather than multiplying total overtime wages by your tax rate.",
      },
    ],
    comparison: {
      caption: "Overtime amounts are not interchangeable",
      headers: ["Pay item", "Federal deduction treatment"],
      rows: [
        ["Regular wages for extra hours", "Not the qualifying premium"],
        ["FLSA-required overtime premium", "May qualify, subject to limits"],
        ["Weekend or holiday premium", "Not automatically eligible"],
      ],
    },
    checklist: [
      "Save year-end paystubs and your W-2.",
      "Ask payroll to identify qualified overtime separately.",
      "Check filing status and modified adjusted gross income.",
      "Use the applicable Schedule 1-A instructions with a qualified tax preparer.",
    ],
    faqs: [
      {
        q: "Does no tax on overtime mean no payroll tax?",
        a: "No. The deduction concerns federal income tax. It doesn't remove Social Security or Medicare payroll taxes.",
      },
      {
        q: "Can I claim it if I take the standard deduction?",
        a: "Yes, if you meet the eligibility rules. Itemizing isn't required.",
      },
    ],
    sources: [
      {
        title: "IRS: Overtime deduction rules",
        url: "https://www.irs.gov/newsroom/what-to-know-about-the-no-tax-on-overtime-deduction",
      },
      {
        title: "IRS: Tips and overtime deductions",
        url: "https://www.irs.gov/newsroom/one-big-beautiful-bill-how-to-take-advantage-of-no-tax-on-tips-and-overtime",
      },
    ],
    related: [
      { title: "How tax brackets work", href: "/wealth/tax-brackets-explained-plainly" },
      { title: "Qualified tips deduction", href: "/guides/tips-tax-deduction-2026" },
    ],
  },
  {
    slug: "tips-tax-deduction-2026",
    title: "No Tax on Tips 2026: Tips vs. Service Charges",
    description:
      "See which tips may qualify for the federal deduction, why service charges differ, and which records tipped workers need for 2026 taxes.",
    query: "no tax on tips 2026 service charges qualify",
    opportunity:
      "Separate voluntary tips from automatic charges. The new rules create a records-focused long-tail opening beyond generic deduction explainers.",
    intent: "informational",
    answer:
      "Qualified tips may receive a federal income tax deduction. Mandatory service charges don't qualify as tips, and the deduction doesn't erase reporting or payroll taxes.",
    sections: [
      {
        title: "A tip has to be voluntary",
        body: "The customer must be free to choose the amount. Cash and charged tips can qualify, including qualifying tip-sharing arrangements. A mandatory charge added to a bill is different, even if your employer passes it to you. Keep the two categories separate in your records.",
      },
      {
        title: "Eligibility goes beyond the payment",
        body: "The deduction applies to qualified tips in occupations that customarily and regularly received tips before 2025. The IRS maintains the occupation list. Specified service businesses face restrictions. Self-employed workers also face a net-income limit. Check the current IRS guidance for your work rather than deciding from a job title alone.",
      },
      {
        title: "The cap isn't a promised refund",
        body: "The maximum annual deduction is $25,000 for tax years 2025 through 2028. It begins to phase out above $150,000 of modified adjusted gross income, or $300,000 jointly. Married taxpayers must file jointly, and a valid Social Security number is required. Eligible filers can claim it with either the standard deduction or itemized deductions. Federal payroll taxes and state rules are separate.",
      },
    ],
    comparison: {
      caption: "Classify the payment before claiming a deduction",
      headers: ["Payment", "What to check"],
      rows: [
        ["Voluntary customer tip", "Occupation, reporting, and income limits"],
        ["Tip pool distribution", "Qualified tip and reporting rules"],
        ["Mandatory service charge", "Non-tip wages when paid to an employee"],
      ],
    },
    checklist: [
      "Keep a daily tip record.",
      "Separate service charges from voluntary tips.",
      "Reconcile your records with employer tax statements.",
      "Check the IRS occupation list and the current Schedule 1-A instructions.",
    ],
    faqs: [
      {
        q: "Do I stop reporting tips to my employer?",
        a: "No. The deduction doesn't remove tip reporting duties. Keep your records and follow the IRS reporting rules.",
      },
      {
        q: "Are credit card tips excluded?",
        a: "No. Voluntary charged tips can qualify. The payment method alone doesn't decide eligibility.",
      },
    ],
    sources: [
      {
        title: "IRS: Tip recordkeeping and reporting",
        url: "https://www.irs.gov/businesses/small-businesses-self-employed/tip-recordkeeping-and-reporting",
      },
      {
        title: "IRS: Tips and overtime deductions",
        url: "https://www.irs.gov/newsroom/one-big-beautiful-bill-how-to-take-advantage-of-no-tax-on-tips-and-overtime",
      },
    ],
    related: [
      { title: "Your first tax return", href: "/wealth/first-tax-return-guide" },
      { title: "Overtime deduction rules", href: "/guides/overtime-tax-deduction-2026" },
    ],
  },
  {
    slug: "teen-tax-return-dependent",
    title: "Does My Teen Need to File a Tax Return?",
    description:
      "A dependent teen may still need a tax return. Separate wages, side-job profit, and interest, then check filing rules and possible refunds.",
    query: "does my teenager need to file taxes if I claim them",
    opportunity:
      "Existing teen first-job content covers paychecks. This page addresses the parent-dependent filing decision and self-employment exception.",
    intent: "informational",
    answer:
      "Being claimed as a dependent doesn't automatically excuse a teen from filing. Wages, investment income, and self-employment each affect the answer.",
    sections: [
      {
        title: "Sort the income before checking a threshold",
        body: "A W-2 job, bank interest, and a small business aren't the same tax situation. Dependent filing rules consider earned income, unearned income, and their combination. Use the IRS dependent table for the year the money was earned. Don't use an adult's standard deduction as a universal cutoff.",
      },
      {
        title: "A small side job can change the answer",
        body: "Net self-employment earnings of $400 or more generally require a federal return, even when no regular income tax is due. Net earnings aren't the same as total customer payments. Keep records of income and business expenses. Not getting a tax form doesn't make business income disappear.",
      },
      {
        title: "Check for a refund even when filing isn't required",
        body: "A teen may need to file to recover federal income tax withheld from wages. Check the W-2 rather than assuming every paycheck deduction is refundable. Social Security and Medicare taxes are different. Parents generally don't add a child's wages to their own return. A limited election for certain investment income is a separate rule.",
      },
    ],
    comparison: {
      caption: "Three income types to collect",
      headers: ["Income", "Filing question"],
      rows: [
        ["Employee wages", "What does the dependent earned-income rule require?"],
        ["Interest or other investment income", "Does unearned or combined income trigger filing?"],
        ["Self-employment", "Are net earnings at least $400?"],
      ],
    },
    checklist: [
      "Gather every W-2, income statement, and work-expense record.",
      "Confirm whether someone can claim the teen as a dependent.",
      "Use the IRS filing tool for the correct tax year.",
      "Check state filing rules separately.",
    ],
    faqs: [
      {
        q: "Does filing their own return stop me from claiming my child?",
        a: "Not by itself. Dependency depends on the applicable relationship, age, support, residency, and other tests.",
      },
      {
        q: "Can a teen owe tax without receiving a 1099?",
        a: "Yes. Filing and income-reporting duties don't depend solely on whether a payer sends a form.",
      },
    ],
    sources: [
      { title: "IRS: Students and taxes", url: "https://www.irs.gov/individuals/students" },
      {
        title: "IRS: Check whether you must file",
        url: "https://www.irs.gov/individuals/check-if-you-need-to-file-a-tax-return",
      },
      {
        title: "IRS: Self-employed tax center",
        url: "https://www.irs.gov/businesses/small-businesses-self-employed/self-employed-individuals-tax-center",
      },
    ],
    related: [
      { title: "First-job money guide", href: "/wealth/teens-first-job-money-guide" },
      { title: "Side-hustle taxes", href: "/wealth/side-hustle-taxes" },
    ],
  },
  {
    slug: "1099-k-personal-items-sold-at-loss",
    title: "1099-K for Personal Items Sold at a Loss",
    description:
      "A 1099-K doesn't mean every dollar is profit. Learn how personal sales, business sales, gifts, and reporting errors differ.",
    query: "1099 k personal items sold at a loss what to do",
    opportunity:
      "Records and classification are more useful than another reporting-threshold headline. Connect the existing side-hustle guide to a specific filing problem.",
    intent: "informational",
    answer:
      "Selling a personal item for less than you paid generally doesn't create taxable profit. A 1099-K reports payments, so you still need records explaining the sale.",
    sections: [
      {
        title: "Start with what you sold",
        body: "A used household item is different from inventory you bought to resell. For a personal item, compare the selling proceeds with your cost. Personal losses aren't deductible. Personal gains can be taxable. When some items sold at gains and others at losses, don't simply net everything together.",
      },
      {
        title: "Match the form to the transactions",
        body: "Download the marketplace transaction history. Match dates, refunds, fees, and sale amounts to receipts or other cost records. Keep a separate category for business sales. Gross payments on a form aren't automatically your taxable profit. The IRS provides reporting instructions for personal items sold at a loss.",
      },
      {
        title: "If the form includes money that wasn't a sale",
        body: "Check for gifts, shared-expense reimbursements, duplicate forms, or payments that belong to someone else. Contact the issuer for a correction and keep the correspondence. Don't ignore a tax form just because you disagree with it. If it isn't corrected, use the IRS instructions for reporting an erroneous form.",
      },
    ],
    comparison: {
      caption: "What the payment was for matters",
      headers: ["Transaction", "Federal treatment to check"],
      rows: [
        ["Personal item sold below cost", "No deductible personal loss; explain reported proceeds"],
        ["Personal item sold above cost", "Report taxable gain"],
        ["Business sale", "Report business income and eligible expenses"],
        ["Gift or reimbursement", "Not a goods-or-services sale; review errors"],
      ],
    },
    checklist: [
      "Save the form and the transaction export.",
      "Find purchase records for personal items.",
      "Separate gains, personal losses, and business receipts.",
      "Request corrections from the issuer and keep copies.",
    ],
    faqs: [
      {
        q: "Does the reporting threshold make smaller sales tax-free?",
        a: "No. A form-reporting threshold doesn't decide whether income is taxable.",
      },
      {
        q: "Can I deduct a loss on my used couch?",
        a: "A loss on personal-use property isn't deductible. Reporting proceeds correctly keeps them from being mistaken for taxable profit.",
      },
    ],
    sources: [
      {
        title: "IRS: What to do with Form 1099-K",
        url: "https://www.irs.gov/businesses/what-to-do-with-form-1099-k",
      },
      {
        title: "IRS: Form 1099-K questions",
        url: "https://www.irs.gov/businesses/understanding-your-form-1099-k",
      },
    ],
    related: [
      { title: "Side-hustle taxes", href: "/wealth/side-hustle-taxes" },
      { title: "First tax return guide", href: "/wealth/first-tax-return-guide" },
    ],
  },
  {
    slug: "tax-extension-cannot-pay",
    title: "Filed a Tax Extension but Can't Pay?",
    description:
      "A filing extension doesn't extend payment time. See how filing, partial payments, IRS payment options, and hardship requests differ.",
    query: "tax extension deadline cannot pay taxes what happens",
    opportunity:
      "Timely before the October filing-extension deadline. Answer the unpaid-balance problem without debt-relief sales pressure.",
    intent: "informational",
    answer:
      "A federal filing extension gives you more time to submit a return, not more time to pay. File even if you can't pay the full balance.",
    sections: [
      {
        title: "Keep filing and paying separate",
        body: "Waiting until you have all the money can add a filing problem to a payment problem. Submit the return by your applicable deadline and pay what you can. A valid extension doesn't generally stop interest or late-payment penalties from the original payment deadline. Disaster relief and other special rules can change deadlines.",
      },
      {
        title: "Review the options directly with the IRS",
        body: "The IRS offers payment arrangements for eligible taxpayers. Terms, fees, and eligibility vary. If paying would prevent you from meeting basic living expenses, ask about a temporary collection delay. That doesn't erase the debt. Interest and penalties can continue, and the IRS may request financial records.",
      },
      {
        title: "Don't lose the paper trail",
        body: "Keep your extension confirmation, filed return, payment receipts, and every notice. Read response dates carefully. A payment-plan request isn't proof that it was approved. Confirm the arrangement through official IRS channels. If the amount on a notice looks wrong, gather supporting records and respond using its instructions.",
      },
    ],
    comparison: {
      caption: "Different problems need different requests",
      headers: ["Situation", "What to review"],
      rows: [
        ["Return isn't ready", "Filing extension or applicable relief"],
        ["Return ready, balance unpaid", "File and review payment options"],
        ["Basic living costs prevent payment", "Hardship-based collection delay"],
        ["Notice amount seems wrong", "Notice response and supporting records"],
      ],
    },
    checklist: [
      "Confirm the tax year and your actual filing deadline.",
      "File the return and record any payment.",
      "Review IRS payment options on IRS.gov.",
      "Calendar notice-response dates and retain confirmations.",
    ],
    faqs: [
      {
        q: "Does a payment plan stop interest?",
        a: "Generally no. Interest and applicable penalties continue on an unpaid balance.",
      },
      {
        q: "Should I wait to file until I can pay everything?",
        a: "The IRS says to file even if you can't pay the full bill. Filing and payment obligations are separate.",
      },
    ],
    sources: [
      {
        title: "IRS: Extension to file",
        url: "https://www.irs.gov/filing/get-an-extension-to-file-your-tax-return",
      },
      {
        title: "IRS: Help paying a tax bill",
        url: "https://www.irs.gov/newsroom/options-for-taxpayers-who-need-help-paying-a-tax-bill",
      },
    ],
    related: [
      { title: "Money reset plan", href: "/wealth/broke-money-reset-plan" },
      { title: "First tax return guide", href: "/wealth/first-tax-return-guide" },
    ],
  },
  {
    slug: "unemployment-tax-withholding",
    title: "Is Unemployment Taxable? Withholding Explained",
    description:
      "Unemployment benefits generally count as federal taxable income. Learn about Form 1099-G, 10% withholding, and checking your full-year tax.",
    query: "is unemployment taxable should I withhold 10 percent",
    opportunity:
      "Bridge the gap between a yes/no tax answer and the specific withholding form. Useful alongside the existing money-trouble content.",
    intent: "informational",
    answer:
      "Unemployment compensation is generally taxable for federal income tax. You can request 10% federal withholding, but that isn't a promise your final bill is covered.",
    sections: [
      {
        title: "Withholding is a prepayment",
        body: "The final tax depends on your full-year income, filing status, deductions, and credits. Income from work before or after unemployment still matters. Compare expected tax with withholding across the whole year. Estimated payments are another way to pay during the year.",
      },
      {
        title: "Send the request to the payer",
        body: "Form W-4V lets you request federal withholding from unemployment compensation at 10%. The form doesn't offer a custom unemployment withholding percentage. Give it to the benefits payer, not the IRS. If the agency uses its own form, follow that process. Ask when the change takes effect.",
      },
      {
        title: "Reconcile the benefits statement",
        body: "Form 1099-G reports unemployment paid and federal tax withheld. Compare it with your agency records before filing. If it lists benefits you never received, contact the state agency about a correction and possible identity theft. State taxation is separate from the federal rule.",
      },
    ],
    comparison: {
      caption: "Three different unemployment tax numbers",
      headers: ["Number", "What it means"],
      rows: [
        ["Gross benefits", "Payments before withholding"],
        ["10% withholding", "Optional federal tax prepayment"],
        ["Final tax", "Calculated using the complete tax return"],
      ],
    },
    checklist: [
      "Gather wages, benefit payments, and withholding totals.",
      "Review the IRS withholding and estimated-tax guidance.",
      "Submit a withholding request to the payer if you choose it.",
      "Check Form 1099-G against your records.",
    ],
    faqs: [
      {
        q: "Can I choose 22% withholding from unemployment on W-4V?",
        a: "No. The unemployment option is 10%. Other percentages on that form apply to other listed payments.",
      },
      {
        q: "What if no tax was withheld?",
        a: "The benefits can still be taxable. Review estimated payments and your full-year tax position with a qualified preparer.",
      },
    ],
    sources: [
      {
        title: "IRS: Unemployment compensation",
        url: "https://www.irs.gov/individuals/employees/unemployment-compensation",
      },
      { title: "IRS: Form W-4V and instructions", url: "https://www.irs.gov/pub/irs-pdf/fw4v.pdf" },
    ],
    related: [
      { title: "Money reset plan", href: "/wealth/broke-money-reset-plan" },
      { title: "Can't pay a tax bill?", href: "/guides/tax-extension-cannot-pay" },
    ],
  },
  {
    slug: "inherited-ira-ten-year-rule",
    title: "Inherited IRA: Does the 10-Year Rule Mean Wait?",
    description:
      "Some inherited IRAs require annual withdrawals before year ten. Check beneficiary status, the owner's required beginning date, and account type.",
    query: "inherited IRA 10 year rule annual withdrawals required",
    opportunity:
      "Competitive query with consequential oversimplifications. Use a tightly scoped decision table and records checklist, without withdrawal recommendations.",
    intent: "informational",
    answer:
      "The 10-year rule doesn't always let you wait until year ten. Some beneficiaries must take annual required distributions and empty the account by the final deadline.",
    sections: [
      {
        title: "First identify which rules apply",
        body: "This guide addresses individual beneficiaries subject to the 10-year rule after an IRA owner's death in 2020 or later. Spouses, eligible designated beneficiaries, trusts, and older inheritances need separate analysis. Don't apply one inherited-account schedule to every account you own.",
      },
      {
        title: "Check the owner's required beginning date",
        body: "For a non-eligible designated beneficiary, a traditional IRA owner's death on or after the required beginning date generally means annual distributions plus the tenth-year deadline. Death before that date generally permits no annual minimum in years one through nine under the 10-year rule. The balance must still be distributed by December 31 of the tenth year after death.",
      },
      {
        title: "Bring the facts before choosing a withdrawal",
        body: "Ask the custodian to confirm the account type, beneficiary category, annual requirement, and final deadline in writing. Gather the death date, prior year-end balance, and distributions already taken. Ask a qualified tax professional how a withdrawal affects your return. This page doesn't choose an amount or an investment for you.",
      },
    ],
    comparison: {
      caption: "For an individual non-eligible designated beneficiary under the 10-year rule",
      headers: ["Inherited account situation", "Annual requirement before year ten"],
      rows: [
        [
          "Traditional IRA; death before required beginning date",
          "Generally no annual minimum in years one through nine",
        ],
        [
          "Traditional IRA; death on or after required beginning date",
          "Generally annual minimums apply",
        ],
        ["Inherited Roth IRA", "Generally treated as death before required beginning date"],
      ],
    },
    checklist: [
      "Locate the beneficiary paperwork and death date.",
      "Confirm whether this guide's beneficiary category applies.",
      "Ask the custodian for both the annual and final deadlines.",
      "Review any missed distribution promptly with a tax professional.",
    ],
    faqs: [
      {
        q: "Is the deadline ten years from when I opened the inherited account?",
        a: "No. The deadline generally follows the original owner's year of death, not your account-opening date.",
      },
      {
        q: "Does this table cover a surviving spouse?",
        a: "No. Spouses have additional options and rules. Review those before moving or withdrawing money.",
      },
    ],
    sources: [
      {
        title: "IRS: Publication 590-B, IRA beneficiaries",
        url: "https://www.irs.gov/publications/p590b",
      },
    ],
    related: [
      { title: "Required minimum distributions", href: "/wealth/rmd-explained-73" },
      { title: "How tax brackets work", href: "/wealth/tax-brackets-explained-plainly" },
    ],
  },
  {
    slug: "401k-rollover-after-leaving-job",
    title: "401(k) After Leaving a Job: Rollover Rules",
    description:
      "Compare leaving a 401(k), a direct rollover, and a payment to you. Understand the 60-day rule and withholding before requesting a check.",
    query: "401k rollover after leaving job check 20 percent withholding",
    opportunity:
      "Broad rollover results are crowded. Focus on payment mechanics and the avoidable check-payee confusion, linked from the existing 401(k) explainer.",
    intent: "informational",
    answer:
      "Leaving a job doesn't require cashing out a 401(k). Available choices can include keeping the account or moving eligible money by rollover.",
    sections: [
      {
        title: "Ask what the old and new plans allow",
        body: "You may be able to leave money in the old plan, move it to a new employer's plan, roll it to an IRA, or take a distribution. Plan rules and balances matter. Compare fees, services, withdrawal rules, and protections with a qualified professional. No destination is automatically best for everyone.",
      },
      {
        title: "The check's payee matters",
        body: "A direct rollover of eligible money to another retirement plan or IRA generally avoids mandatory withholding. If an eligible taxable employer-plan distribution is paid to you, 20% generally must be withheld. A later rollover generally has a 60-day deadline. Rolling over the whole gross amount requires replacing the withheld amount from other funds.",
      },
      {
        title: "A rollover and a conversion aren't identical",
        body: "Moving untaxed money to a Roth IRA generally creates taxable income. Cashing out can also create income tax and an additional early-distribution tax unless an exception applies. Required minimum distributions aren't eligible for rollover. An outstanding plan loan can introduce separate deadlines and tax rules.",
      },
    ],
    comparison: {
      caption: "Payment mechanics to confirm before signing",
      headers: ["Method", "Main issue to check"],
      rows: [
        ["Leave money in the plan", "Eligibility, fees, and plan rules"],
        ["Direct rollover", "Receiving account and tax character"],
        ["Eligible distribution paid to you", "Withholding and the 60-day deadline"],
        ["Cash withdrawal", "Income tax and possible additional tax"],
      ],
    },
    checklist: [
      "Request the plan's distribution and rollover notice.",
      "Separate pretax, Roth, and other after-tax amounts.",
      "Confirm the receiving institution's exact payment instructions.",
      "Keep the transaction records and year-end tax forms.",
    ],
    faqs: [
      {
        q: "Does the withheld 20% count as money I rolled over?",
        a: "Not automatically. To roll over the entire gross distribution, you generally must replace that withheld amount within the rollover deadline.",
      },
      {
        q: "Can every retirement payment be rolled over?",
        a: "No. Required minimum distributions and certain other payments are ineligible. Confirm before requesting the transaction.",
      },
    ],
    sources: [
      {
        title: "IRS: Leaving employment",
        url: "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-termination-of-employment",
      },
      {
        title: "IRS: Rollovers of retirement distributions",
        url: "https://www.irs.gov/retirement-plans/plan-participant-employee/rollovers-of-retirement-plan-and-ira-distributions",
      },
    ],
    related: [
      { title: "Your 401(k), explained", href: "/wealth/401k-explained" },
      { title: "HSA and FSA after leaving a job", href: "/guides/hsa-fsa-after-leaving-job" },
    ],
  },
  {
    slug: "hsa-fsa-after-leaving-job",
    title: "HSA vs. FSA After Leaving a Job: What Stays?",
    description:
      "Your HSA stays yours after a job change. A health FSA follows different rules. Check contribution eligibility and claim deadlines before leaving.",
    query: "what happens to HSA FSA when you leave your job",
    opportunity:
      "Existing HSA content explains tax benefits. A side-by-side departure checklist answers a different, time-sensitive question.",
    intent: "informational",
    answer:
      "Your HSA stays with you after leaving a job. A health FSA is an employer arrangement with plan-specific coverage and reimbursement deadlines.",
    sections: [
      {
        title: "Keeping an HSA isn't the same as adding to it",
        body: "You can keep an existing HSA and use it for qualified medical expenses after employment ends. New contributions depend on HSA eligibility, including qualifying coverage and other restrictions. A job change doesn't reset the annual limit. Count contributions across employers and accounts together.",
      },
      {
        title: "Get the FSA dates in writing",
        body: "Ask benefits staff for the last date an expense can be incurred and the last date a claim can be submitted. These can be different dates. A claims run-out period isn't automatically extra coverage time. Ask whether continuation coverage applies. Don't assume a remaining FSA balance transfers to a new employer.",
      },
      {
        title: "Keep access after your work login ends",
        body: "Download account statements, receipts, and the plan's reimbursement instructions before your last day. Replace a work email address with a personal one where appropriate. Record the administrator's contact details. Ask the HSA provider about fees that your employer previously covered. Keep health records private when asking for help.",
      },
    ],
    comparison: {
      caption: "HSA and health FSA are different arrangements",
      headers: ["Question", "HSA compared with health FSA"],
      rows: [
        ["Does the balance follow you?", "HSA: yes. FSA: no automatic personal-account transfer."],
        [
          "Can you keep contributing?",
          "HSA: only while eligible. FSA: follow employer plan rules.",
        ],
        [
          "Which deadline matters?",
          "HSA: eligibility and tax rules. FSA: coverage and claims dates.",
        ],
      ],
    },
    checklist: [
      "Confirm whether each account is an HSA or a health FSA.",
      "Ask for FSA coverage, claim, and continuation dates.",
      "Check HSA eligibility under your next health coverage.",
      "Save receipts and update account contact information.",
    ],
    faqs: [
      {
        q: "Do I lose my HSA if I become unemployed?",
        a: "No. The existing account stays yours. Eligibility for new contributions is a separate question.",
      },
      {
        q: "Does a claim-submission extension let me incur new FSA expenses?",
        a: "Don't assume that. Ask the administrator to distinguish the expense-incurred deadline from the claim-submission deadline.",
      },
    ],
    sources: [
      {
        title: "IRS: Publication 969, HSAs and health FSAs",
        url: "https://www.irs.gov/publications/p969",
      },
    ],
    related: [
      { title: "The HSA explained", href: "/wealth/hsa-explained" },
      { title: "Health insurance basics", href: "/wealth/health-insurance-basics" },
      { title: "401(k) after leaving a job", href: "/guides/401k-rollover-after-leaving-job" },
    ],
  },
  {
    slug: "medicare-plan-not-renewing-triad",
    title: "Medicare Plan Not Renewing? Triad NC Checklist",
    description:
      "A nonrenewal letter needs a different response from a benefit-change notice. A Medicare checklist for Greensboro and the surrounding Triad.",
    query: "Medicare plan not renewing Greensboro 2027 what to do",
    opportunity:
      "Local seasonal intent distinct from the existing automatic-renewal guide. Explain the notice workflow without naming carriers or asserting local exits.",
    intent: "transactional",
    scope: "medicare",
    answer:
      "A Medicare contract nonrenewal can give you a Special Enrollment Period. Read the notice's reason and dates before assuming ordinary automatic renewal applies.",
    sections: [
      {
        title: "First identify the kind of letter",
        body: "An Annual Notice of Change describes next year's benefits and costs. A nonrenewal notice says coverage won't continue under that contract. A move, contract termination, and nonrenewal can have different enrollment rules. Keep the full letter, including the pages explaining your rights.",
      },
      {
        title: "A special window doesn't guarantee continuous coverage",
        body: "For a Medicare contract that isn't renewed, Medicare lists a Special Enrollment Period from December 8 through the last day of February. That window doesn't mean waiting is harmless. Confirm your current coverage end date and replacement coverage start date before making a change. Ask about prescription coverage and any limited Medigap rights that apply to your situation.",
      },
      {
        title: "Bring a local coverage checklist",
        body: "For Greensboro, Winston-Salem, High Point, and Burlington residents, start with your home address, doctors, prescriptions, and pharmacy. Verify coverage details for the coming year. This guide doesn't claim that a particular contract is leaving the Triad. Your notice and Medicare's current information determine what applies.",
      },
    ],
    comparison: {
      caption: "Don't treat every fall letter as nonrenewal",
      headers: ["Notice", "Question to ask"],
      rows: [
        ["Annual Notice of Change", "What changes if coverage continues?"],
        ["Contract nonrenewal", "When does coverage end and which enrollment rights apply?"],
        ["Contract termination or service-area issue", "Does a different special window apply?"],
      ],
    },
    checklist: [
      "Save the complete notice and envelope.",
      "Write down the coverage end date.",
      "List doctors, medicines, pharmacy, and home address.",
      "Confirm enrollment rights and the effective date before submitting a change.",
    ],
    faqs: [
      {
        q: "Does a nonrenewal letter mean I lose Medicare itself?",
        a: "It concerns the coverage described in the letter. Confirm what happens to your health and drug coverage rather than assuming all Medicare ends.",
      },
      {
        q: "Can Christian help me read the letter?",
        a: "Triad residents can request an insurance conversation with Christian. You can also review your rights directly with Medicare.",
      },
    ],
    sources: [
      {
        title: "Medicare: Special Enrollment Periods",
        url: "https://www.medicare.gov/basics/get-started-with-medicare/get-more-coverage/joining-a-plan/special-enrollment-periods",
      },
    ],
    related: [
      { title: "Medicare automatic renewal", href: "/guides/medicare-automatic-renewal" },
      { title: "Special enrollment", href: "/special-enrollment" },
      { title: "Annual enrollment", href: "/annual-enrollment" },
    ],
  },
  {
    slug: "401k-loan-vs-withdrawal",
    title: "401(k) Loan vs Withdrawal: Taxes Explained",
    description: "A 401(k) loan avoids taxes when repaid on schedule; a withdrawal is taxed and usually penalized. Learn the real cost of each.",
    answer: "A loan lets you borrow from your 401(k) and pay yourself back, usually within five years, with no income tax if repaid. A withdrawal is taxable income and usually adds a 10% early-distribution penalty if you are under 59 1/2. The loan avoids the penalty when you repay on schedule.",
    sections: [
      { title: "How a 401(k) loan works", body: "IRS rules let you borrow up to the lesser of $50,000 or half your vested balance. You repay it within five years through payroll deductions with interest to yourself. Repay it late or leave your job and the balance may become a taxable distribution. Plans can refuse loans, so check your plan documents first." },
      { title: "What a withdrawal really costs", body: "Cashing out is taxed as ordinary income for the year you take it. Add the 10% early-distribution penalty when you are under 59 1/2 and no exception applies. In a 22% bracket with the penalty, nearly a third of the withdrawal disappears to taxes. Hardship withdrawals follow the same tax rules, even when the plan approves them." },
      { title: "When each choice makes sense", body: "Loans fit short-term gaps you are certain you can repay before leaving your job. Withdrawals fit true hardships where repayment is not possible. Neither choice beats building an emergency fund before you need one." },
    ],
    comparison: {
      caption: "401(k) loan vs withdrawal at a glance",
      headers: ["Topic", "How they compare"],
      rows: [
        ["Income tax if handled right", "401(k) loan: None when repaid on schedule | 401(k) withdrawal: Taxed as ordinary income"],
        ["10% early penalty", "401(k) loan: Usually none if repaid | 401(k) withdrawal: Usually applies under 59 1/2"],
        ["Repayment", "401(k) loan: Required, usually within 5 years | 401(k) withdrawal: None; the money is gone"],
      ],
    },
    checklist: [
      "Ask your plan administrator whether your plan allows loans.",
      "Borrow only what you can repay through payroll deductions.",
      "Learn your plan's rule for loans if you leave your job.",
      "Compare the loan's total cost against a withdrawal first.",
    ],
    faqs: [
      { q: "What happens to my 401(k) loan if I leave my job?", a: "Many plans demand the remaining balance soon after you leave. If you cannot repay, the unpaid amount becomes a taxable distribution. You then owe income tax and usually the 10% penalty if under 59 1/2." },
      { q: "Are hardship withdrawals free from the 10% penalty?", a: "Usually not. Hardship withdrawals are still taxed as income under 59 1/2. The 10% penalty applies unless a specific exception covers your situation." },
    ],
    sources: [
      { title: "IRS: Retirement Plans", url: "https://www.irs.gov/retirement-plans" },
      { title: "IRS: Tax Topics", url: "https://www.irs.gov/taxtopics" },
    ],
    related: [
      { title: "401(k) explained, plainly", href: "/wealth/401k-explained" },
      { title: "What to do with your 401(k) after leaving a job", href: "/guides/401k-rollover-after-leaving-job" },
    ],
    query: "401k loan vs withdrawal taxes",
    opportunity: "High-intent query from workers facing a cash crunch; thin, jargon-heavy results make a plain-English explainer winnable.",
    intent: "transactional",
  },
  {
    slug: "roth-conversion-ladder-explained",
    title: "Roth Conversion Ladder: How It Works",
    description: "Convert traditional retirement money to Roth, wait five years per conversion, then withdraw penalty-free. Here is how the ladder works.",
    answer: "You convert traditional retirement money to a Roth IRA and pay income tax on the amount. Each conversion starts a five-year clock, and when it finishes you can withdraw that principal without the 10% early penalty. Repeat yearly and you build a ladder of penalty-free withdrawals.",
    sections: [
      { title: "The ladder in three steps", body: "First, convert money from a traditional IRA or 401(k) into a Roth IRA. You pay ordinary income tax on the converted amount that year. Second, wait five tax years for that conversion's clock to run out. Third, withdraw the converted principal penalty-free, even before age 59 1/2." },
      { title: "The 5-year rule that matters", body: "Each conversion gets its own five-year clock starting January 1 of the conversion year. Touching converted dollars early can trigger the 10% penalty if you are under 59 1/2. Earnings follow separate rules and need their own five-year holding period. Keep a dated record of every conversion you make." },
      { title: "Taxes to plan for", body: "Conversions count as taxable income in the year they happen. A large conversion can push you into a higher bracket. Many people convert during low-income years to keep the tax bill small. Model the result on your own return before converting." },
    ],
    comparison: {
      caption: "Roth conversion ladder vs direct Roth withdrawal",
      headers: ["Topic", "How they compare"],
      rows: [
        ["Early access to principal", "Roth conversion ladder: Converted amounts after each 5-year clock | Direct Roth withdrawal: Contributions any time, tax-free"],
        ["10% early penalty", "Roth conversion ladder: Avoided once each clock finishes | Direct Roth withdrawal: Never applies to contributions"],
        ["Up-front cost", "Roth conversion ladder: Income tax in the conversion year | Direct Roth withdrawal: None on contributions"],
      ],
    },
    checklist: [
      "Convert during a low-income year to shrink the tax bill.",
      "Write down the date and amount of every conversion.",
      "Wait out each five-year clock before touching that rung.",
      "Keep converted principal separate from earnings in your records.",
    ],
    faqs: [
      { q: "Can I withdraw my Roth IRA earnings early?", a: "Earnings face stricter rules than contributions. For tax-free, penalty-free earnings, the account must be five tax years old and you must meet a condition like age 59 1/2. Early earnings withdrawals are usually taxed and penalized." },
      { q: "Does every conversion really get its own five-year clock?", a: "Yes. Each conversion's clock starts January 1 of the year you convert. This clock is separate from the five-year rule on your first Roth contribution." },
    ],
    sources: [
      { title: "IRS: Retirement Plans", url: "https://www.irs.gov/retirement-plans" },
      { title: "IRS Publication 590-A: Contributions to IRAs", url: "https://www.irs.gov/publications/p590a" },
    ],
    related: [
      { title: "Roth IRA explained, plainly", href: "/wealth/roth-ira-explained" },
      { title: "401(k) explained, plainly", href: "/wealth/401k-explained" },
    ],
    query: "roth conversion ladder explained",
    opportunity: "Popular early-retirement search with confusing forum answers; a clear step-by-step covering the 5-year rule can outrank them.",
    intent: "transactional",
  },
  {
    slug: "hsa-triple-tax-advantage",
    title: "HSA Triple Tax Advantage Explained",
    description: "Deductible contributions, tax-free growth, tax-free medical withdrawals. The HSA's triple tax advantage and 2026 limits, explained.",
    answer: "An HSA gives you three tax breaks in a single account. Contributions are deductible, growth is tax-free, and withdrawals for qualified medical expenses are tax-free. No other common account offers all three at once.",
    sections: [
      { title: "The three tax breaks", body: "First, contributions lower your taxable income for the year you make them. Second, interest and investment growth inside the account are never taxed. Third, withdrawals for qualified medical expenses come out tax-free at any age." },
      { title: "2026 contribution limits", body: "For 2026, you can contribute up to $4,400 with self-only coverage or $8,750 with family coverage. If you are 55 or older, you may add a $1,000 catch-up contribution. Employer contributions count toward the same cap, so track both together. Excess contributions face a 6% excise tax until you remove them." },
      { title: "Eligibility rules", body: "You must be enrolled in a qualifying high-deductible health plan to contribute. For 2026, the plan needs a minimum deductible of $1,700 for self-only or $3,400 for family coverage. Enrolling in Medicare disqualifies you from making new contributions. A general-purpose FSA held at the same time blocks you too." },
    ],
    comparison: {
      caption: "The HSA's three tax breaks",
      headers: ["Topic", "How they compare"],
      rows: [
        ["Going in", "Deductible contributions up to annual limits"],
        ["Growing", "Tax-free growth with no yearly tax bill"],
        ["Coming out", "Tax-free withdrawals for qualified medical expenses"],
      ],
    },
    checklist: [
      "Confirm your health plan meets the 2026 HDHP thresholds.",
      "Add employer and personal contributions against the $4,400 or $8,750 cap.",
      "Pay medical bills from the account, or save receipts to reimburse yourself later.",
      "After 65, non-medical withdrawals are taxed as ordinary income with no penalty.",
    ],
    faqs: [
      { q: "What happens to my HSA if I change jobs?", a: "The HSA is yours and it follows you. Your new employer does not need to offer one for you to keep the balance. You can only keep contributing while you have qualifying HDHP coverage." },
      { q: "Can I use HSA money for non-medical expenses?", a: "Before 65, non-medical withdrawals face income tax plus a 20% penalty. After 65, the penalty drops off and those withdrawals are taxed as ordinary income." },
    ],
    sources: [
      { title: "IRS Publication 969: Health Savings Accounts", url: "https://www.irs.gov/publications/p969" },
      { title: "IRS: Tax Topics", url: "https://www.irs.gov/taxtopics" },
    ],
    related: [
      { title: "HSA explained, plainly", href: "/wealth/hsa-explained" },
      { title: "What happens to your HSA or FSA after leaving a job", href: "/guides/hsa-fsa-after-leaving-job" },
    ],
    query: "hsa triple tax advantage",
    opportunity: "Evergreen benefits question asked every open enrollment; few pages lead with all three breaks in plain language.",
    intent: "informational",
  },
  {
    slug: "estimated-quarterly-taxes-guide",
    title: "Estimated Quarterly Taxes, Plainly Explained",
    description: "Freelancers and side earners pay income tax four times a year. Due dates, safe harbor rules, and how to skip the penalty.",
    answer: "You pay estimated taxes four times a year when your income has little or no withholding. That usually means freelancers, gig workers, landlords, and investors. Pay enough on time and you avoid the underpayment penalty.",
    sections: [
      { title: "Who has to pay", body: "The IRS expects estimated payments when you will owe at least $1,000 after withholding and credits. Self-employed workers pay because no employer withholds for them. People with rental or investment income may owe them too. W-2 employees with side income can fall in as well." },
      { title: "The four due dates", body: "Payments are due April 15, June 15, and September 15 of the current year. The fourth payment is due January 15 of the next year. A date that lands on a weekend or holiday moves to the next business day. Each payment covers the income earned in that slice of the year." },
      { title: "Safe harbor rules", body: "You dodge the underpayment penalty by paying 90% of this year's tax. You can also pay 100% of last year's tax as a safe harbor. If last year's AGI was above $150,000, the safe harbor rises to 110%. State rules differ, so check your state separately." },
    ],
    comparison: {
      caption: "Safe harbor methods and penalty protection",
      headers: ["Topic", "How they compare"],
      rows: [
        ["Pay 90% of current-year tax", "Protected if you hit it"],
        ["Pay 100% of prior-year tax", "Protected; 110% when AGI topped $150,000"],
        ["Pay less than safe harbor", "Underpayment penalty can apply"],
      ],
    },
    checklist: [
      "Estimate this year's income, deductions, and total tax.",
      "Divide what you will owe into four payments.",
      "Pay by April 15, June 15, September 15, and January 15.",
      "Keep proof of each payment with your tax records.",
    ],
    faqs: [
      { q: "What is the underpayment penalty?", a: "It is interest charged when you paid too little during the year. The rate changes quarterly and the IRS sets it. Hitting a safe-harbor amount protects you even if you still owe at filing." },
      { q: "Can I raise my W-2 withholding instead of paying quarterly?", a: "Yes. Withholding counts the same as estimated payments toward safe harbor. Many people with a job and a side business adjust their W-4 instead." },
    ],
    sources: [
      { title: "IRS: Small Business and Self-Employed Tax Center", url: "https://www.irs.gov/businesses/small-businesses-self-employed" },
      { title: "IRS: Tax Topics", url: "https://www.irs.gov/taxtopics" },
    ],
    related: [
      { title: "Side hustle taxes, plainly", href: "/wealth/side-hustle-taxes" },
      { title: "Filing your first tax return", href: "/wealth/first-tax-return-guide" },
    ],
    query: "estimated quarterly taxes due dates safe harbor",
    opportunity: "Freelancer staple query with year-specific dates; a current, plain guide beats dated IRS PDFs in search.",
    intent: "transactional",
  },
  {
    slug: "1099-vs-w2-classification",
    title: "1099 vs W-2: How Worker Status Changes Taxes",
    description: "W-2 employees split payroll taxes with their boss. 1099 contractors pay the full 15.3% themselves. What your worker status costs you.",
    answer: "W-2 workers are employees with tax withheld and half their payroll taxes paid by the employer. Workers paid on a 1099 are independent contractors who handle their own taxes. The trade is flexibility and deductions against self-employment tax and quarterly payments.",
    sections: [
      { title: "How the taxes differ", body: "Employees split Social Security and Medicare taxes with their employer each paycheck. Contractors pay the full 15.3% self-employment tax on 92.35% of net earnings themselves. Contractors make quarterly estimated payments instead of relying on withholding. A wider menu of business deductions offsets some of the difference." },
      { title: "What misclassification looks like", body: "Some employers label workers as contractors to skip payroll taxes and benefits. The IRS decides status from behavioral control, financial control, and the relationship itself. A worker told when, where, and how to work is usually an employee. Misclassified workers can file Form SS-8 to ask the IRS for a determination." },
      { title: "Why it matters for your paycheck", body: "Contractor pay often looks higher per hour because nothing is withheld. Once you price in the extra payroll tax, quarterly payments, and missing benefits, the gap shrinks. Employees also get unemployment insurance and workers' comp that contractors lack. Compare total compensation, not just the hourly rate." },
    ],
    comparison: {
      caption: "W-2 employee vs 1099 contractor",
      headers: ["Topic", "How they compare"],
      rows: [
        ["Income tax withholding", "W-2 employee: Withheld each paycheck | 1099 contractor: None; you pay quarterly"],
        ["Social Security and Medicare tax", "W-2 employee: Split with employer | 1099 contractor: Full 15.3% on you"],
        ["Business deductions", "W-2 employee: Very limited | 1099 contractor: Broad: home office, mileage, equipment"],
      ],
    },
    checklist: [
      "Look at who controls your schedule and methods, not your job title.",
      "Set aside a fixed share of every payment for taxes.",
      "Make quarterly estimated payments to avoid penalties.",
      "Track deductible business expenses from day one.",
    ],
    faqs: [
      { q: "Can I be a W-2 employee and a 1099 contractor at the same time?", a: "Yes, many people hold a job and freelance on the side. Each income stream follows its own tax rules. You may owe quarterly payments on freelance income even with W-2 withholding." },
      { q: "What should I do if I think I am misclassified?", a: "File Form SS-8 and let the IRS decide your worker status. Keep records of schedules, instructions, and tools your boss provided." },
    ],
    sources: [
      { title: "IRS: Independent Contractor or Employee", url: "https://www.irs.gov/businesses/small-businesses-self-employed/independent-contractor-self-employed-or-employee" },
      { title: "IRS: Small Business and Self-Employed Tax Center", url: "https://www.irs.gov/businesses/small-businesses-self-employed" },
      { title: "IRS: Tax Topics", url: "https://www.irs.gov/taxtopics" },
    ],
    related: [
      { title: "Side hustle taxes, plainly", href: "/wealth/side-hustle-taxes" },
      { title: "1099-K for personal items sold at a loss", href: "/guides/1099-k-personal-items-sold-at-loss" },
    ],
    query: "1099 vs w2 tax differences",
    opportunity: "Massive gig-economy query; most pages are payroll ads, so an education-first comparison can win clicks.",
    intent: "transactional",
  },
  {
    slug: "fsa-vs-hsa-which-is-better",
    title: "FSA vs HSA: Which Health Account Wins?",
    description: "HSAs roll over and travel with you; FSAs expire with your job. Compare eligibility, 2026 limits, and which fits your health plan.",
    answer: "An HSA pairs with a high-deductible health plan, rolls over every year, and follows you between jobs. An FSA works with most plans but is tied to your employer and mostly use-it-or-lose-it. The HSA also carries the triple tax advantage the FSA cannot match.",
    sections: [
      { title: "Eligibility and ownership", body: "You need a qualifying high-deductible health plan to open or fund an HSA. An FSA only needs an employer that offers one, and it works with most health plans. The HSA is your account forever, even after you leave the job. The FSA ends with the job, though a grace period can give you a little extra time." },
      { title: "Contribution limits for 2026", body: "HSA caps for 2026 are $4,400 self-only and $8,750 family, plus a $1,000 catch-up at 55 and older. The health FSA limit for 2026 is $3,400 per employee from salary reductions. FSA limits apply per employee, so two working spouses can each have one. Both limits adjust yearly for inflation." },
      { title: "Use-it-or-lose-it vs rollover", body: "HSA balances roll over in full every year with no deadline. FSA money generally expires at plan year-end under use-it-or-lose-it. Employers may allow up to $680 in carryover or a grace period of two and a half months. They cannot offer both, so check your plan documents." },
    ],
    comparison: {
      caption: "FSA vs HSA head to head",
      headers: ["Topic", "How they compare"],
      rows: [
        ["Needs a high-deductible plan", "HSA: Yes | FSA: No"],
        ["2026 contribution cap", "HSA: $4,400 self / $8,750 family | FSA: $3,400 per employee"],
        ["Unused money", "HSA: Rolls over fully | FSA: Use it or lose it, mostly"],
      ],
    },
    checklist: [
      "Check whether your health plan is an HSA-eligible HDHP.",
      "If you have an FSA, learn your plan's carryover or grace period.",
      "Never hold a general-purpose FSA and an HSA at the same time.",
      "Spend FSA money before the deadline or forfeit it.",
    ],
    faqs: [
      { q: "Can I have an HSA and an FSA at the same time?", a: "A general-purpose FSA disqualifies you from HSA contributions. A limited-purpose FSA for dental and vision is allowed alongside an HSA. Confirm your FSA type before funding both." },
      { q: "Which works better for predictable medical costs?", a: "An FSA can fit well when you know your expenses for the year. The full annual election is available on day one, before you finish contributing. An HSA is stronger for building a long-term medical fund." },
    ],
    sources: [
      { title: "IRS Publication 969: Health Savings Accounts", url: "https://www.irs.gov/publications/p969" },
      { title: "IRS: Tax Topics", url: "https://www.irs.gov/taxtopics" },
    ],
    related: [
      { title: "HSA explained, plainly", href: "/wealth/hsa-explained" },
      { title: "What happens to your HSA or FSA after leaving a job", href: "/guides/hsa-fsa-after-leaving-job" },
    ],
    query: "fsa vs hsa which is better",
    opportunity: "Open-enrollment classic with fresh 2026 limits; pages with current numbers and clear tables rank well.",
    intent: "transactional",
  },
  {
    slug: "tax-loss-harvesting-wash-sale",
    title: "Tax-Loss Harvesting and the Wash Sale Rule",
    description: "Sell losing investments to offset gains, use $3,000 a year against income, and dodge the 30-day wash sale rule.",
    answer: "You sell investments at a loss to offset gains, which lowers your tax bill. You can apply up to $3,000 of net losses per year against ordinary income. Unused losses carry forward to future years.",
    sections: [
      { title: "How the strategy works", body: "Sell a losing investment and use the loss to cancel out gains from winners. Short-term losses first offset short-term gains, which are taxed at higher rates. Net losses beyond your gains can offset up to $3,000 of ordinary income per year. Leftover losses carry forward to future tax years." },
      { title: "The wash sale rule", body: "You cannot claim the loss if you buy the same or a substantially identical security 30 days before or after the sale. That creates a 61-day window around your sale date. Breaking the rule disallows the loss for that year. The disallowed loss adjusts the cost basis of your replacement shares instead." },
      { title: "Limits and gotchas", body: "The $3,000 cap drops to $1,500 if you are married filing separately. The strategy applies to taxable accounts only, not IRAs or 401(k)s. Repurchasing the same fund inside your IRA can still trigger a wash sale. Track trades across every account you own." },
    ],
    comparison: {
      caption: "Tax-loss harvesting outcomes",
      headers: ["Topic", "How they compare"],
      rows: [
        ["$5,000 gain with $5,000 loss", "Gains cancel out; no tax on them"],
        ["$2,000 net loss", "Offsets up to $3,000 of ordinary income"],
        ["$10,000 net loss", "$3,000 this year; $7,000 carries forward"],
      ],
    },
    checklist: [
      "Review taxable accounts for losing positions before year-end.",
      "Sell losers and wait out the 61-day wash sale window.",
      "Apply losses to gains first, then up to $3,000 of ordinary income.",
      "Carry forward any leftover losses to next year.",
    ],
    faqs: [
      { q: "Does tax-loss harvesting work in a 401(k) or IRA?", a: "No. Trades inside retirement accounts are not taxed, so losses there have no tax value. Harvesting only works in taxable brokerage accounts." },
      { q: "What counts as substantially identical?", a: "Selling one S&P 500 index fund to buy another company's S&P 500 fund is risky. The IRS has never drawn a bright line for funds. Many investors switch to a fund tracking a different index to stay safe." },
    ],
    sources: [
      { title: "IRS Publication 550: Investment Income and Expenses", url: "https://www.irs.gov/publications/p550" },
      { title: "IRS: Tax Topics", url: "https://www.irs.gov/taxtopics" },
    ],
    related: [
      { title: "Tax brackets explained, plainly", href: "/wealth/tax-brackets-explained-plainly" },
      { title: "Compound interest calculator", href: "/tools/compound-interest" },
    ],
    query: "tax loss harvesting wash sale rule",
    opportunity: "Year-end spike query from DIY investors; a jargon-free walkthrough of the 30-day rule fills a gap.",
    intent: "transactional",
  },
  {
    slug: "tip-income-reporting-rules",
    title: "How Tipped Workers Report Income to the IRS",
    description: "All tips are taxable, including cash. Daily records, the $20 monthly rule, and Form 4137, explained for tipped workers.",
    answer: "All tips are taxable income, including cash tips and credit card tips. You must keep a daily record and report tips to your employer once they reach $20 in a month. Your employer then withholds income, Social Security, and Medicare taxes on them.",
    sections: [
      { title: "What counts as reportable income", body: "Cash tips, card tips, and tips from tip pools are all taxable. Non-cash tips like tickets or passes count too, at fair market value. Service charges your employer adds to bills are wages, not tips. Report all of it, not just what your employer already sees." },
      { title: "The $20 monthly rule", body: "Give your employer a written report when tips total $20 or more in a month. The IRS offers Form 4070 for this, though any written statement works. The report is due by the 10th of the following month. Your employer uses it to withhold income, Social Security, and Medicare taxes." },
      { title: "Daily records and Form 4137", body: "Keep a daily log of tips with the date, amount, and where you worked. The IRS offers Form 4070A as a ready-made daily record. If you never reported tips to your employer, file Form 4137 with your return. That form figures the Social Security and Medicare taxes you owe on unreported tips." },
    ],
    comparison: {
      caption: "Tip reporting steps",
      headers: ["Topic", "How they compare"],
      rows: [
        ["Daily log", "Record every tip the day you get it"],
        ["Monthly report to employer", "Report tips of $20 or more by the 10th"],
        ["Annual return", "Use Form 4137 for tips you never reported"],
      ],
    },
    checklist: [
      "Log every tip daily with the date and amount.",
      "Report monthly totals of $20 or more to your employer.",
      "Check your W-2 for allocated tips you never reported.",
      "File Form 4137 for any unreported tips.",
    ],
    faqs: [
      { q: "Are cash tips really taxable?", a: "Yes. The IRS taxes all tips, cash or not. Cash tips are income under the law, even when no one else sees them." },
      { q: "What are allocated tips on my W-2?", a: "Large food and beverage employers must allocate tips when reported tips look too low. The IRS uses 8% of gross receipts as the floor for the formula. Allocated tips appear in Box 8 of your W-2." },
    ],
    sources: [
      { title: "IRS Publication 531: Reporting Tip Income", url: "https://www.irs.gov/publications/p531" },
      { title: "IRS: Tax Topics", url: "https://www.irs.gov/taxtopics" },
    ],
    related: [
      { title: "The 2026 tips tax deduction", href: "/guides/tips-tax-deduction-2026" },
      { title: "Side hustle taxes, plainly", href: "/wealth/side-hustle-taxes" },
    ],
    query: "how to report tip income IRS",
    opportunity: "Distinct from the tips deduction guide; service workers search reporting rules year-round and official wording is dense.",
    intent: "informational",
  },
  {
    slug: "backdoor-roth-ira-steps",
    title: "Backdoor Roth IRA: Step-by-Step Guide",
    description: "How the backdoor Roth IRA works, who needs it, and the pro-rata rule to watch. Plain steps for high earners.",
    answer: "A backdoor Roth IRA is a two-step move: contribute to a traditional IRA, then convert it to a Roth. It exists because high earners lose the ability to contribute to a Roth directly once their income passes the IRS phaseout limits. It works best when you have no pre-tax IRA balance, because of the pro-rata rule.",
    sections: [
      { title: "Who actually needs this", body: "For 2026, the IRS phases out direct Roth IRA contributions for higher earners. If your income is above that range, direct contributions are off the table. The backdoor route still lets you get money into a Roth through a conversion. Check the current IRS figures to see where the phaseouts start." },
      { title: "The two steps, in order", body: "First, make a nondeductible contribution to a traditional IRA, up to the annual IRA limit ($7,500 for 2026 per the site's IRS figures). Second, convert that traditional IRA balance to a Roth IRA. The conversion itself has no income limit, which is why this path exists. You report both steps on your tax return using Form 8606." },
      { title: "The pro-rata rule warning", body: "The pro-rata rule is the trap. If you hold pre-tax money in any traditional, SEP, or SIMPLE IRA, the IRS treats your conversion as coming proportionally from all of them. That means part of your conversion is taxable, even if you converted only the new contribution. Rolling old pre-tax IRA money into a 401(k) first can clear the path." },
    ],
    comparison: {
      caption: "Direct Roth contribution vs the backdoor route",
      headers: ["Topic", "How they compare"],
      rows: [
        ["Income limits", "Direct Roth contribution: Phased out above IRS limits | Backdoor Roth IRA: Works at any income"],
        ["Steps", "Direct Roth contribution: Contribute once | Backdoor Roth IRA: Contribute, then convert"],
        ["Tax paperwork", "Direct Roth contribution: Minimal | Backdoor Roth IRA: Form 8606 each year"],
      ],
    },
    checklist: [
      "Confirm your income is above the direct Roth phaseout for the year.",
      "Make a nondeductible traditional IRA contribution within the annual limit.",
      "Convert the balance to a Roth IRA; keep the two steps documented.",
      "File Form 8606 with your tax return to track after-tax basis.",
    ],
    faqs: [
      { q: "Do I pay taxes on the backdoor Roth conversion?", a: "The conversion is tax-free if you convert only after-tax money with no earnings. Any growth before the conversion is taxable as ordinary income. This is why many people convert quickly after contributing." },
      { q: "Can I do a backdoor Roth every year?", a: "Yes, as long as you have earned income and the rules stay the same. The annual IRA contribution limit caps each year's amount. Many people repeat the two steps each January." },
    ],
    sources: [
      { title: "Source: IRS individual retirement arrangements (IRAs)", url: "https://www.irs.gov/retirement-plans/individual-retirement-arrangements-iras" },
      { title: "Source: IRS Roth IRAs", url: "https://www.irs.gov/retirement-plans/roth-iras" },
      { title: "Source: IRS Publication 590-A", url: "https://www.irs.gov/publications/p590a" },
    ],
    related: [
      { title: "Roth IRA basics", href: "/wealth/roth-ira-explained" },
      { title: "Roth vs traditional calculator", href: "/tools/roth-vs-traditional" },
    ],
    query: "backdoor roth ira steps",
    opportunity: "High search volume with mostly forum answers; a clear step-by-step guide with the pro-rata warning can win.",
    intent: "transactional",
  },
  {
    slug: "mega-backdoor-roth-explained",
    title: "Mega Backdoor Roth: How It Works",
    description: "How the mega backdoor Roth uses after-tax 401(k) contributions and an in-service rollover to fund a Roth beyond normal limits.",
    answer: "The mega backdoor Roth lets you move far more than the normal Roth IRA limit into a Roth each year. You make after-tax contributions to your 401(k), then roll them into a Roth through an in-service distribution or rollover. For 2026, the total 401(k) contribution limit is $70,000 for savers under 50. After-tax contributions fill the gap above your $24,500 elective deferral and any employer match.",
    sections: [
      { title: "What it actually is", body: "It is a strategy inside your 401(k), not an IRA trick. Your plan must allow after-tax contributions and in-service rollovers or distributions. Without both features, the mega backdoor is not available. Check your plan's summary description or ask your administrator." },
      { title: "The math for 2026", body: "The 2026 overall 401(k) limit is $70,000 for those under 50. Subtract your $24,500 elective deferral and your employer's match to find your after-tax room. Example: with a $6,000 match, you could add $39,500 after-tax. That amount then rolls into a Roth." },
      { title: "The catch to know", body: "Not every plan allows it, and some only let you roll out once a year. After-tax contributions grow tax-deferred, but gains are taxable until rolled into the Roth. Rolling promptly keeps the taxable part small. Confirm fees and timing with your plan first." },
    ],
    comparison: {
      caption: "Regular backdoor Roth vs mega backdoor Roth",
      headers: ["Topic", "How they compare"],
      rows: [
        ["Annual room", "Regular backdoor Roth: IRA limit ($7,500 for 2026) | Mega backdoor Roth: Leftover room under the $70,000 overall limit"],
        ["Where it lives", "Regular backdoor Roth: Traditional and Roth IRAs | Mega backdoor Roth: Your employer's 401(k) plan"],
        ["Plan permission needed", "Regular backdoor Roth: No | Mega backdoor Roth: Yes: after-tax plus in-service rollover"],
      ],
    },
    checklist: [
      "Confirm your 401(k) allows after-tax contributions.",
      "Confirm it allows in-service rollovers or distributions to a Roth.",
      "Contribute after-tax up to your remaining room under the $70,000 limit.",
      "Roll the after-tax balance to a Roth promptly to limit taxable growth.",
    ],
    faqs: [
      { q: "Does every 401(k) offer the mega backdoor?", a: "No. Your plan must allow after-tax contributions and an in-service rollover or distribution. Many large-company plans do, but smaller plans often skip these features. Ask your plan administrator directly." },
      { q: "Is the mega backdoor going away?", a: "Proposals to limit it have surfaced before, but the rules still allow it as of 2026. Tax law can change, so check the current IRS guidance each year. Do not plan decades ahead on one tactic." },
    ],
    sources: [
      { title: "Source: IRS 401(k) contribution limits", url: "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-401k-and-profit-sharing-plan-contribution-limits" },
      { title: "Source: IRS 401(k) plans", url: "https://www.irs.gov/retirement-plans/401k-plans" },
    ],
    related: [
      { title: "401(k) explained", href: "/wealth/401k-explained" },
      { title: "Roth IRA basics", href: "/wealth/roth-ira-explained" },
    ],
    query: "mega backdoor roth explained",
    opportunity: "Niche but high-intent query; most explainers are dense, so a plain-English version with the 2026 math stands out.",
    intent: "transactional",
  },
  {
    slug: "i-bonds-vs-tips",
    title: "I Bonds vs TIPS: Which Protects More?",
    description: "Series I bonds vs TIPS: how each tracks inflation, purchase limits, and tax treatment, explained in plain English.",
    answer: "Series I bonds and TIPS both protect against inflation, but they work differently. I bonds pay a combined rate with a fixed component plus inflation, and you can buy up to $10,000 per year electronically. TIPS adjust their principal with inflation and are usually bought at Treasury auctions or through funds, with taxes owed each year on the inflation adjustment.",
    sections: [
      { title: "How I bonds work", body: "You buy them directly from TreasuryDirect and hold them at least 12 months. Cashing out before five years costs the last three months of interest. Interest is exempt from state and local tax, and federal tax can wait until you redeem. The rate resets every six months based on inflation." },
      { title: "How TIPS work", body: "TIPS are marketable Treasury securities whose principal rises and falls with the consumer price index. You earn a fixed coupon rate on the adjusted principal. They can be bought at auction, on the secondary market, or through mutual funds. Like all Treasuries, they are exempt from state and local income tax." },
      { title: "The tax difference", body: "I bond interest is tax-deferred until you cash them in or they mature. TIPS holders owe federal tax each year on the inflation adjustment, even though they have not received it yet. Both skip state and local tax. If you hate surprise tax bills, that annual TIPS tax matters." },
    ],
    comparison: {
      caption: "I bonds vs TIPS at a glance",
      headers: ["Topic", "How they compare"],
      rows: [
        ["Inflation protection", "Series I bonds: Combined fixed + inflation rate | TIPS: Principal adjusts with CPI"],
        ["Minimum holding period", "Series I bonds: 12 months | TIPS: None if bought through a fund"],
        ["Tax timing", "Series I bonds: Federal tax deferred until redemption | TIPS: Taxed yearly on inflation adjustments"],
      ],
    },
    checklist: [
      "Decide whether you want a hold-to-maturity bond or a tradable security.",
      "Open a TreasuryDirect account if you want to buy I bonds.",
      "Compare the current I bond composite rate with TIPS yields before choosing.",
      "Plan for the tax timing: deferred with I bonds, yearly with TIPS.",
    ],
    faqs: [
      { q: "Can I lose money on I bonds?", a: "No. I bonds never go below their purchase value, and the inflation component cannot drag the combined rate below zero. TIPS can lose market value if sold before maturity, but held to maturity they return at least the original principal." },
      { q: "Which is better for an emergency fund?", a: "Neither is ideal, but I bonds work after the first 12 months since they hold value. TIPS prices can swing, so selling early can mean a loss. Keep true emergency money in an accessible savings account instead." },
    ],
    sources: [
      { title: "Source: TreasuryDirect I bonds", url: "https://www.treasurydirect.gov/savings-bonds/i-bonds/" },
      { title: "Source: TreasuryDirect home", url: "https://www.treasurydirect.gov/" },
    ],
    related: [
      { title: "Emergency fund guide", href: "/wealth/emergency-fund-guide" },
      { title: "Compound interest calculator", href: "/tools/compound-interest" },
    ],
    query: "i bonds vs tips",
    opportunity: "Steady evergreen query; TreasuryDirect pages are official but dry, leaving room for a clear side-by-side comparison.",
    intent: "transactional",
  },
  {
    slug: "hysa-vs-money-market-account",
    title: "HYSA vs Money Market Account",
    description: "High-yield savings vs money market accounts: FDIC insurance, liquidity, and how rates work, compared side by side.",
    answer: "Both are safe, liquid places to park cash, and both carry FDIC insurance up to $250,000 per depositor per bank. A high-yield savings account is built for saving, with a variable rate and easy transfers. A money market account often adds check-writing and a debit card, which suits cash you touch more often.",
    sections: [
      { title: "What they share", body: "Each is offered by a bank or credit union and pays a variable interest rate. Each is insured up to $250,000 per depositor per insured bank when held at an FDIC member bank. Rates on both tend to move with the broader interest-rate environment. Neither is an investment account, and neither buys stocks." },
      { title: "Where they differ", body: "Money market accounts usually offer check-writing or a debit card, while savings accounts usually do not. High-yield savings accounts sometimes pay slightly higher rates because they are simpler to run. Either way, compare the actual rate, not the account label. Fees and minimums vary by bank, so read the fine print." },
      { title: "How to choose", body: "Pick the savings account if the money is for a goal you rarely touch. Pick the money market account if you want to write the occasional check from it. Splitting across two banks keeps you under the $250,000 insurance limit if your balance is large. Rate-shop once or twice a year, since rates drift." },
    ],
    comparison: {
      caption: "High-yield savings vs money market account",
      headers: ["Topic", "How they compare"],
      rows: [
        ["FDIC insurance", "High-yield savings account: Up to $250,000 per depositor per bank | Money market account: Up to $250,000 per depositor per bank"],
        ["Check writing", "High-yield savings account: Usually not offered | Money market account: Often included"],
        ["Best for", "High-yield savings account: Goals you rarely touch | Money market account: Cash you access more often"],
      ],
    },
    checklist: [
      "Confirm the bank is FDIC-insured before opening anything.",
      "Compare the current APY, fees, and minimum balance requirements.",
      "Match the account to your habit: hands-off saving or occasional checks.",
      "Keep balances under the $250,000 insurance limit per bank.",
    ],
    faqs: [
      { q: "Is my money safe in a high-yield savings account?", a: "Yes, up to $250,000 per depositor per insured bank under FDIC insurance. That covers principal plus earned interest. Use the FDIC's BankFind tool to verify a bank's coverage." },
      { q: "Can rates on these accounts drop?", a: "Yes. Both pay variable rates that move with the economy, so your APY can fall. The account itself stays safe and liquid either way. That is why rate-shopping once or twice a year pays off." },
    ],
    sources: [
      { title: "Source: FDIC deposit insurance", url: "https://www.fdic.gov/resources/deposit-insurance/" },
      { title: "Source: FDIC home", url: "https://www.fdic.gov/" },
    ],
    related: [
      { title: "Emergency fund guide", href: "/wealth/emergency-fund-guide" },
      { title: "Compound interest calculator", href: "/tools/compound-interest" },
    ],
    query: "hysa vs money market account",
    opportunity: "High-volume comparison query; bank pages push products, so a neutral FDIC-grounded guide can earn the click.",
    intent: "transactional",
  },
  {
    slug: "credit-utilization-explained",
    title: "Credit Utilization Ratio Explained",
    description: "What your credit utilization ratio is, why the 30% guideline matters, and how fast it changes your score.",
    answer: "Your credit utilization ratio is the share of your available credit that you are using. It is your total card balances divided by your total credit limits, and scoring models weigh it heavily. Keeping it under 30% is the common guideline, with lower generally scoring better.",
    sections: [
      { title: "How it is calculated", body: "Add up the balances reported on all your cards, then divide by the sum of their credit limits. A $2,000 balance on $10,000 of total limits is 20%. Both the overall ratio and each card's individual ratio matter. Maxing out one card can hurt even if your total stays low." },
      { title: "Why 30% is the line", body: "Credit scoring models treat utilization as a strong signal of risk. Balances above 30% of your limits suggest you may be stretched. Under 10% tends to score best for most people. There is no bonus for hitting exactly zero, so do not stress about that." },
      { title: "How fast it updates", body: "Card issuers usually report your balance to the bureaus once a month, often on your statement date. Paying down a balance can lift your score within one or two reporting cycles. The effect is not permanent: utilization has no memory, so old spikes stop mattering once balances fall. That makes it one of the fastest levers you control." },
    ],
    comparison: {
      caption: "What moves your utilization",
      headers: ["Topic", "How they compare"],
      rows: [
        ["Paying down a balance", "Lowers the ratio"],
        ["Getting a limit increase", "Lowers the ratio without paying"],
        ["Opening a new card", "Adds limit, which can lower the ratio"],
        ["Closing an old card", "Removes limit, which can raise the ratio"],
      ],
    },
    checklist: [
      "List every card's balance and limit, then compute your overall ratio.",
      "Pay down the highest-utilization cards first for the fastest effect.",
      "Ask for a limit increase instead of opening cards you do not need.",
      "Keep new spending under 30% of your limits each month.",
    ],
    faqs: [
      { q: "Should I pay my card before the statement date?", a: "It can help, since issuers often report the statement balance. Paying early lowers the reported balance and your utilization. Just make sure at least the minimum payment posts by the due date." },
      { q: "Does carrying a balance help my score?", a: "No. Paying in full each month gives you the same utilization benefit without interest. Carrying a balance only costs you money. The myth that it builds credit faster is just wrong." },
    ],
    sources: [
      { title: "Source: CFPB credit reports and scores", url: "https://www.consumerfinance.gov/consumer-tools/credit-reports-and-scores/" },
      { title: "Source: CFPB home", url: "https://www.consumerfinance.gov/" },
    ],
    related: [
      { title: "Credit score basics", href: "/wealth/credit-score-basics" },
      { title: "Emergency fund guide", href: "/wealth/emergency-fund-guide" },
    ],
    query: "credit utilization explained",
    opportunity: "Huge search volume and lots of thin content; a precise explanation of per-card vs overall utilization can rank.",
    intent: "informational",
  },
  {
    slug: "401k-early-withdrawal-exceptions",
    title: "401(k) Early Withdrawal Exceptions",
    description: "The 10% early withdrawal penalty on 401(k) plans, and the exceptions that waive it: rule of 55, SEPP, hardship, and more.",
    answer: "Withdrawals from a 401(k) before age 59 and a half usually face income tax plus a 10% early withdrawal penalty. Congress created exceptions that waive the penalty in specific situations, though the income tax usually still applies. Knowing them can save you thousands if you must tap the account early.",
    sections: [
      { title: "The penalty in plain English", body: "The IRS adds a 10% penalty on top of ordinary income tax for most withdrawals before 59 and a half. It applies to both pre-tax and Roth earnings taken early. Your own Roth contributions are the main exception, since you already paid tax on them. The penalty exists to discourage raiding retirement savings." },
      { title: "Exceptions that waive the penalty", body: "Leaving your job at 55 or later lets you withdraw from that employer's plan penalty-free. Substantially equal periodic payments, called SEPP or 72(t), allow scheduled withdrawals at any age. Disability, death, certain medical expenses, and court-ordered divorce settlements also qualify. Hardship withdrawals ease access rules but do not always waive the penalty." },
      { title: "What still costs you", body: "Even when the penalty is waived, the withdrawal is usually still taxable income. A big withdrawal can also push you into a higher tax bracket for the year. Rolling the money into an IRA instead keeps it growing tax-deferred. Treat early withdrawals as a last resort, not a plan." },
    ],
    comparison: {
      caption: "Common penalty exceptions compared",
      headers: ["Topic", "How they compare"],
      rows: [
        ["Age 59 and a half or older", "Yes"],
        ["Left job at 55 or later", "Yes, from that employer's plan"],
        ["SEPP / 72(t) payments", "Yes, if schedule is followed"],
        ["Hardship withdrawal", "Not always: check the specific rule"],
      ],
    },
    checklist: [
      "Confirm you are truly under 59 and a half before worrying about the penalty.",
      "See if your situation matches a listed exception like the rule of 55.",
      "Estimate the income tax you will still owe on the withdrawal.",
      "Consider a rollover to an IRA instead of taking the cash.",
    ],
    faqs: [
      { q: "Does the rule of 55 work if I quit at 54?", a: "No. You must separate from service in the calendar year you turn 55 or later. Quitting at 54 and withdrawing at 55 does not qualify. Public safety employees have a lower threshold of 50." },
      { q: "Are hardship withdrawals penalty-free?", a: "Not automatically. Hardship rules let you access the money, but the 10% penalty still applies unless a separate exception covers you. Medical expenses above a set share of income are one exception that can pair with hardship. Check the IRS list before you withdraw." },
    ],
    sources: [
      { title: "Source: IRS tax on early 401(k) distributions", url: "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-tax-on-early-distributions" },
      { title: "Source: IRS 401(k) plans", url: "https://www.irs.gov/retirement-plans/401k-plans" },
    ],
    related: [
      { title: "401(k) explained", href: "/wealth/401k-explained" },
      { title: "401(k) rollover after leaving a job", href: "/guides/401k-rollover-after-leaving-job" },
    ],
    query: "401k early withdrawal exceptions",
    opportunity: "Strong intent query from people facing real decisions; IRS pages list rules but a plain-English exception guide fills the gap.",
    intent: "transactional",
  },
  {
    slug: "roth-ira-five-year-rule",
    title: "Roth IRA 5-Year Rule Explained",
    description: "How the Roth IRA 5-year rules work: the contributions clock, the conversion clock, and when earnings come out tax-free.",
    answer: "The Roth IRA 5-year rule decides when your money comes out tax-free and penalty-free. Your own contributions can be withdrawn anytime with no tax or penalty. Earnings need two things: an account open for five years, and a qualifying reason like turning 59 and a half.",
    sections: [
      { title: "Clock one: contributions", body: "Every Roth IRA has a five-year clock that starts with your first contribution to any Roth IRA. Once it is satisfied and you are 59 and a half, earnings come out tax-free. Disability and a first-home purchase also count as qualifying reasons. This clock never resets, no matter how many accounts you open." },
      { title: "Clock two: conversions", body: "Each Roth conversion starts its own separate five-year clock. Withdrawing converted principal within five years triggers the 10% penalty if you are under 59 and a half. The tax was already paid at conversion, so only the penalty is at stake. Track each conversion year carefully." },
      { title: "How the clocks interact", body: "Contributions always come out first, then conversions, then earnings. That ordering means your own contributions are the easiest money to reach. Conversions sit in the middle with their own clocks. Earnings are last in line and face the strictest test." },
    ],
    comparison: {
      caption: "What you can withdraw, and when",
      headers: ["Topic", "How they compare"],
      rows: [
        ["Your contributions", "Tax-free and penalty-free anytime"],
        ["Converted amounts", "Penalty may apply if under 59.5"],
        ["Earnings", "Tax plus penalty unless an exception applies"],
      ],
    },
    checklist: [
      "Note the tax year of your very first Roth IRA contribution.",
      "Log the year of every Roth conversion separately.",
      "Withdraw contributions first if you need cash before 59 and a half.",
      "Wait for both the clock and a qualifying reason before touching earnings.",
    ],
    faqs: [
      { q: "Does opening a second Roth IRA restart the clock?", a: "No. The five-year clock for earnings starts with your first contribution to any Roth IRA. A new account inherits the old clock. Conversions are the exception: each one starts its own clock." },
      { q: "What counts as a qualifying reason for earnings?", a: "Reaching 59 and a half is the most common one. Disability and a first-time home purchase up to $10,000 also qualify. Without a qualifying reason, earnings withdrawn early face tax and usually a penalty." },
    ],
    sources: [
      { title: "Source: IRS Roth IRAs", url: "https://www.irs.gov/retirement-plans/roth-iras" },
      { title: "Source: IRS individual retirement arrangements (IRAs)", url: "https://www.irs.gov/retirement-plans/individual-retirement-arrangements-iras" },
    ],
    related: [
      { title: "Roth IRA basics", href: "/wealth/roth-ira-explained" },
      { title: "Roth vs traditional calculator", href: "/tools/roth-vs-traditional" },
    ],
    query: "roth ira five year rule",
    opportunity: "Confusing topic with scattered answers; one page covering both clocks and their interaction can own the query.",
    intent: "informational",
  },
  {
    slug: "social-security-62-vs-70",
    title: "Social Security: Claim at 62 or 70?",
    description: "Claiming Social Security at 62 vs 70: how benefits shrink or grow, and how to think about the break-even point.",
    answer: "Claiming at 62 locks in a permanently reduced benefit, roughly 70 to 77 percent of your full amount depending on your full retirement age. Waiting until 70 grows it to roughly 124 to 132 percent through delayed retirement credits. There is no bonus for waiting past 70, so the choice is really about timing and longevity.",
    sections: [
      { title: "What claiming at 62 costs", body: "Your full retirement age is 66 or 67 depending on your birth year. Claiming at 62 means up to five years of early-claiming reductions. The reduction is permanent and also lowers survivor benefits for a spouse. Filing early can still make sense if you need the income or expect a shorter life." },
      { title: "What waiting until 70 gains", body: "After your full retirement age, benefits grow about 8% per year until age 70. That growth is guaranteed and inflation-adjusted for life. A larger benefit also means a larger survivor benefit for your spouse. The tradeoff is eight years of checks you will never get back." },
      { title: "The break-even way to think", body: "Break-even is the age where total lifetime benefits from waiting catch up to filing early. It often lands in the late 70s or early 80s, but it is only an estimate. Health, other income, and whether you keep working all shift the math. This is a personal tradeoff, not financial advice." },
    ],
    comparison: {
      caption: "Claiming at 62 vs 70",
      headers: ["Topic", "How they compare"],
      rows: [
        ["Benefit size", "Claiming at 62: Roughly 70 to 77% of full benefit | Claiming at 70: Roughly 124 to 132% of full benefit"],
        ["Monthly checks", "Claiming at 62: More checks, smaller each | Claiming at 70: Fewer checks, larger each"],
        ["Survivor benefit", "Claiming at 62: Smaller for a surviving spouse | Claiming at 70: Larger for a surviving spouse"],
      ],
    },
    checklist: [
      "Find your full retirement age based on your birth year.",
      "Get your benefit estimates at 62, full retirement age, and 70.",
      "Weigh your health, savings, and whether you plan to keep working.",
      "Remember there is no advantage to waiting past 70.",
    ],
    faqs: [
      { q: "Can I change my mind after claiming?", a: "You have 12 months to withdraw your application and repay what you received. After that, the decision is mostly permanent. There is also a one-time option to suspend benefits at full retirement age and earn delayed credits." },
      { q: "Does working affect my benefit if I claim early?", a: "Yes. If you claim before full retirement age and keep working, earnings above an annual limit reduce your checks. The withheld amount is credited back later through a recalculation. Once you reach full retirement age, the earnings limit disappears." },
    ],
    sources: [
      { title: "Source: SSA retirement benefits", url: "https://www.ssa.gov/benefits/retirement/" },
      { title: "Source: SSA home", url: "https://www.ssa.gov/" },
    ],
    related: [
      { title: "Social Security explained", href: "/wealth/social-security-explained" },
      { title: "Retirement projector", href: "/tools/retirement-projector" },
    ],
    query: "social security 62 vs 70",
    opportunity: "One of the biggest retirement queries; SSA pages are factual but a clear 62-vs-70 framing with break-even math wins.",
    intent: "informational",
  },
  {
    slug: "roth-ira-mistakes-to-avoid",
    title: "7 Roth IRA Mistakes That Cost Real Money",
    description: "The seven Roth IRA mistakes that drain your retirement money, from income limits to the 5-year rule.",
    answer: "Roth IRA mistakes usually come down to contributing when you are not eligible, breaking the 5-year rule, or withdrawing earnings too early. Each one can trigger taxes or penalties you never needed to pay. A few minutes of checking the rules saves real money.",
    sections: [
      { title: "Mistake 1: Contributing over the income limit", body: "Roth IRA eligibility phases out above certain income levels set by the IRS. If you earn too much and contribute directly anyway, that contribution counts as excess. It faces a 6% penalty tax each year it stays in the account. Check the current limit before you contribute, or use a backdoor Roth through a traditional IRA if you qualify." },
      { title: "Mistake 2: Ignoring the 5-year rule", body: "Even after age 59 and a half, your Roth IRA must be at least five years old for qualified withdrawals. The clock starts on January 1 of the first tax year you contributed. Withdraw earnings before the rule is met and the earnings become taxable income." },
      { title: "Mistake 3: Withdrawing earnings early", body: "You can always withdraw your own contributions tax-free and penalty-free. Earnings are a different story: taking them out before age 59 and a half usually means income tax plus a 10% early withdrawal penalty. Keep contributions and earnings separate in your head, and treat earnings as locked up." },
      { title: "Mistake 4: Forgetting the beneficiary", body: "A Roth IRA passes outside your will directly to the named beneficiary. If the beneficiary line is blank or outdated, the account may go to your estate instead. That means probate instead of a direct transfer to your family. Review your beneficiary designation once a year and after every major life change." },
      { title: "Mistake 5: Missing the pro-rata rule on conversions", body: "If you hold both pre-tax and after-tax money in traditional IRAs, a Roth conversion cannot cherry-pick only the after-tax dollars. The IRS treats every conversion as a proportional mix of both, so part of it is taxable. Run the numbers with a tax professional before converting large balances." },
      { title: "Mistake 6: Overcontributing past the annual limit", body: "For 2026 the IRA contribution limit is $7,500 across all your traditional and Roth IRAs combined. Put in more and the excess is hit with a 6% excise tax every year until you fix it. Track contributions across every account, not just one." },
      { title: "Mistake 7: Assuming an employer plan blocks you", body: "Having a 401(k) at work does not disqualify you from a Roth IRA. Eligibility depends on your income, not on whether you have a workplace plan. Plenty of people contribute to both every year, and the Roth gives you tax-free growth on top of the match." },
    ],
    comparison: {
      caption: "Roth IRA mistakes and the fix for each",
      headers: ["Topic", "How they compare"],
      rows: [
        ["Contributing over the income limit", "Check the IRS limit first, or use a backdoor Roth"],
        ["Ignoring the 5-year rule", "Start the clock early, even with a small contribution"],
        ["Withdrawing earnings early", "Touch contributions only; leave earnings alone"],
        ["Forgetting the beneficiary", "Name a beneficiary and review it yearly"],
        ["Missing the pro-rata rule", "Model the tax cost before converting"],
        ["Overcontributing past $7,500", "Track all IRA accounts together"],
        ["Assuming an employer plan blocks you", "Use the Roth alongside your 401(k)"],
      ],
    },
    checklist: [
      "Confirm your income is under the Roth IRA phase-out range before contributing.",
      "Make at least a small contribution to start your 5-year clock now.",
      "Keep contributions and earnings mentally separate, and never plan on earnings early.",
      "Name a beneficiary on every IRA and review it after life changes.",
    ],
    faqs: [
      { q: "Can I contribute to a Roth IRA if I have a 401(k)?", a: "Yes. A workplace plan does not block Roth IRA eligibility. The limit that matters is your income, not your 401(k). You can fund both in the same year." },
      { q: "What happens if I put too much into my Roth IRA?", a: "The excess faces a 6% excise tax each year it remains in the account. You can remove the excess plus any earnings before the tax deadline to fix it. Track all your IRAs together, since the $7,500 limit is shared." },
    ],
    sources: [
      { title: "IRS: Roth IRAs", url: "https://www.irs.gov/retirement-plans/roth-iras" },
      { title: "IRS: Retirement Plans", url: "https://www.irs.gov/retirement-plans" },
    ],
    related: [
      { title: "Roth IRA explained in plain English", href: "/wealth/roth-ira-explained" },
      { title: "Roth vs Traditional calculator", href: "/tools/roth-vs-traditional" },
      { title: "Tax brackets explained plainly", href: "/wealth/tax-brackets-explained-plainly" },
    ],
    query: "roth ira mistakes to avoid",
    opportunity: "High-intent listicle query with weak, thin answers in the current top results. A complete, IRS-cited guide can win the featured snippet and AI citations.",
    intent: "informational",
  },
  {
    slug: "hsa-mistakes-to-avoid",
    title: "5 HSA Mistakes That Drain Your Savings",
    description: "Five common HSA mistakes, from contributing on Medicare to overfunding, and how to fix each one.",
    answer: "The most expensive HSA mistakes are contributing while on Medicare and overfunding the account, since both trigger penalty taxes. Others are quieter, like leaving the balance in cash instead of investing it. A few checks each year keep the triple tax advantage intact.",
    sections: [
      { title: "Mistake 1: Contributing while on Medicare", body: "Once you enroll in any part of Medicare, you can no longer contribute to an HSA, even if you still work. Contributions made after Medicare enrollment are excess and get taxed plus penalized. If you work past 65 and delay Medicare, you can keep contributing. Stop six months before you file for Social Security because of retroactive Part A." },
      { title: "Mistake 2: Overcontributing past the limit", body: "For 2026 the HSA limit is $4,400 for self-only coverage and $8,750 for family coverage, including what your employer puts in. Go over and the excess faces a 6% excise tax each year until removed. Add up your payroll deductions and employer contributions midyear so there are no surprises in December." },
      { title: "Mistake 3: Not investing the balance", body: "Most HSA providers let you invest once your balance clears a threshold. Money sitting in cash earns almost nothing, while invested money grows tax-free for medical costs later. Treat the HSA like a retirement account after you have a cash buffer for this year's deductible." },
      { title: "Mistake 4: Missing the 55-plus catch-up", body: "If you are 55 or older, you can add an extra $1,000 to your HSA each year on top of the regular limit. Many people near retirement miss this simply because nobody tells them. If your spouse is also 55 or older, they need their own HSA to make their own catch-up." },
      { title: "Mistake 5: Using it for non-medical costs before 65", body: "Spending HSA money on non-medical expenses before age 65 triggers income tax plus a 20% additional tax. After 65 the penalty goes away and non-medical withdrawals are taxed like retirement account distributions. Keep receipts for medical costs so you can reimburse yourself years later, tax-free." },
    ],
    comparison: {
      caption: "HSA mistakes and the fix for each",
      headers: ["Topic", "How they compare"],
      rows: [
        ["Contributing while on Medicare", "Stop contributions before Medicare starts"],
        ["Overcontributing past the limit", "Count employer contributions toward the cap"],
        ["Not investing the balance", "Invest above your cash buffer"],
        ["Missing the 55-plus catch-up", "Add the extra $1,000 at 55"],
        ["Non-medical spending before 65", "Save receipts and reimburse later"],
      ],
    },
    checklist: [
      "Confirm you are not on Medicare before contributing each year.",
      "Total your contributions plus employer contributions against the $4,400 or $8,750 limit.",
      "Invest the balance above your deductible cash buffer.",
      "At 55, add the $1,000 catch-up contribution.",
    ],
    faqs: [
      { q: "Can I contribute to an HSA if I am on Medicare?", a: "No. Medicare enrollment ends HSA eligibility, even if you keep working. Stop contributions the month Medicare begins. You can still spend existing HSA money tax-free on qualified medical costs." },
      { q: "What happens if I overcontribute to my HSA?", a: "The excess is hit with a 6% excise tax every year it stays in the account. Withdraw the excess plus earnings before the tax filing deadline to avoid the penalty. Employer contributions count toward the same $4,400 or $8,750 limit." },
    ],
    sources: [
      { title: "IRS: Publication 969, Health Savings Accounts", url: "https://www.irs.gov/publications/p969" },
      { title: "IRS: Retirement Plans", url: "https://www.irs.gov/retirement-plans" },
    ],
    related: [
      { title: "HSA explained in plain English", href: "/wealth/hsa-explained" },
      { title: "Roth IRA explained in plain English", href: "/wealth/roth-ira-explained" },
      { title: "Compound interest calculator", href: "/tools/compound-interest" },
    ],
    query: "hsa mistakes to avoid",
    opportunity: "Medicare-age workers search this before turning 65, and most answers skip the retroactive Part A trap. A clear IRS-backed listicle can own this niche.",
    intent: "informational",
  },
  {
    slug: "tax-deductions-side-hustlers-miss",
    title: "6 Tax Deductions Side Hustlers Miss",
    description: "Six deductions side hustlers leave on the table every year, from the home office to retirement savings.",
    answer: "Side hustlers routinely miss the home office deduction, mileage, the business share of phone and internet, self-employed health insurance, retirement contributions, and ordinary supplies. Each one lowers your taxable profit. Tracking them as you go is easier than reconstructing them in April.",
    sections: [
      { title: "Mistake 1: Skipping the home office simplified method", body: "If you work from a dedicated space at home, the simplified method is built for you. It lets you deduct $5 per square foot up to $1,500 with no receipts to track. Many people skip it because they assume the regular method is too much paperwork. The simplified option takes about a minute on the tax return." },
      { title: "Mistake 2: Not logging mileage", body: "Business miles you drive for your side hustle are deductible at the IRS standard rate, but only if you have a log. A phone app that records trips automatically is enough. Commuting from home to a regular job does not count, but driving to clients, suppliers, and gigs does." },
      { title: "Mistake 3: Forgetting the business share of phone and internet", body: "If you use your phone and home internet for the side hustle, the business percentage is deductible. Estimate it honestly, such as 40% if the side hustle drives that share of use. You cannot deduct the whole bill, but the real portion is money back." },
      { title: "Mistake 4: Missing self-employed health insurance", body: "Self-employed people can deduct health insurance premiums for themselves, their spouse, and dependents as an adjustment to income. You do not need to itemize to get it. If the side hustle is your only self-employment income, the deduction is limited to your net profit from it." },
      { title: "Mistake 5: Skipping retirement contributions", body: "A SEP IRA or Solo 401(k) lets you shelter side-hustle profit and cut this year's tax bill. Contributions for a Solo 401(k) can be large relative to the income, which makes it powerful even for modest gigs. The deduction lands on top of your other business write-offs." },
      { title: "Mistake 6: Ignoring software and supplies", body: "Subscriptions, apps, shipping, packaging, and small tools used for the business are fully deductible ordinary expenses. People forget them because each one feels too small to matter. Together they often add up to hundreds of dollars a year." },
    ],
    comparison: {
      caption: "Missed side-hustle deductions and how to claim each",
      headers: ["Topic", "How they compare"],
      rows: [
        ["Skipping the home office", "Use the $5 per square foot simplified method"],
        ["Not logging mileage", "Run an automatic mileage tracker"],
        ["Forgetting phone and internet", "Deduct the honest business percentage"],
        ["Missing health insurance", "Claim the self-employed premium adjustment"],
        ["Skipping retirement contributions", "Open a SEP IRA or Solo 401(k)"],
        ["Ignoring software and supplies", "Track every subscription and supply"],
      ],
    },
    checklist: [
      "Measure your home office and claim the simplified deduction.",
      "Start an automatic mileage log before your next business trip.",
      "Estimate the business share of your phone and internet bills.",
      "Price out a SEP IRA or Solo 401(k) for this year's profit.",
    ],
    faqs: [
      { q: "Do I need to itemize to claim side-hustle deductions?", a: "No. Business deductions go on Schedule C against your business income, completely separate from itemizing. The self-employed health insurance deduction is an adjustment to income, so it helps even if you take the standard deduction." },
      { q: "Can I deduct my home office if I also have a regular job?", a: "Yes, if the space is used regularly and exclusively for the side business. Having a W-2 job does not disqualify you. The simplified method needs no receipts, just the square footage up to 300 square feet." },
    ],
    sources: [
      { title: "IRS: Small Business and Self-Employed Tax Center", url: "https://www.irs.gov/businesses/small-businesses-self-employed" },
      { title: "IRS: Filing", url: "https://www.irs.gov/filing" },
    ],
    related: [
      { title: "Side hustle taxes, plain English", href: "/wealth/side-hustle-taxes" },
      { title: "Tax brackets explained plainly", href: "/wealth/tax-brackets-explained-plainly" },
      { title: "What to do if you cannot pay your taxes", href: "/guides/tax-extension-cannot-pay" },
    ],
    query: "tax deductions side hustlers miss",
    opportunity: "Gig workers search for write-offs every tax season and existing lists are thin or outdated. A complete IRS-grounded listicle fits the search intent exactly.",
    intent: "informational",
  },
  {
    slug: "401k-mistakes-to-avoid",
    title: "5 401(k) Mistakes That Shrink Retirement",
    description: "Five 401(k) mistakes that quietly shrink your retirement, from skipping the match to cashing out.",
    answer: "The costliest 401(k) mistakes are leaving the employer match on the table and cashing out when you change jobs. Add borrowing without a repayment plan, ignoring fees, and never rebalancing. None of them feel like mistakes in the moment, but all of them compound for decades.",
    sections: [
      { title: "Mistake 1: Not capturing the full employer match", body: "Many employers match a percentage of your contributions, and it is free money with no catch. Contributing less than the match threshold leaves part of your compensation unclaimed. At minimum, contribute enough to get every matching dollar before funding anything else." },
      { title: "Mistake 2: Cashing out when changing jobs", body: "Cashing out a 401(k) when you leave a job triggers income tax on the full amount. If you are under 59 and a half, you also owe a 10% early withdrawal penalty. A direct rollover to an IRA or your new employer's plan moves the money with no tax and no penalty." },
      { title: "Mistake 3: Taking loans without a repayment plan", body: "A 401(k) loan is not taxed if you repay it, but the payments come from your paycheck with after-tax dollars. If you leave the job, most plans demand full repayment quickly or the balance becomes a taxable distribution. Borrow only for true needs, and know the payoff date before you sign." },
      { title: "Mistake 4: Ignoring fees", body: "Fund expense ratios and plan fees quietly eat returns year after year. Two funds that look alike can differ by a full percentage point in cost, which adds up to tens of thousands over a career. Check your plan's fee disclosure once a year and favor low-cost index options." },
      { title: "Mistake 5: Keeping a stale portfolio", body: "A portfolio picked at age 25 should not look the same at 45. Target-date funds adjust automatically, but custom mixes need a yearly rebalance back to your target allocation. For 2026 the elective deferral limit is $24,500, so make sure rising contributions follow your allocation too." },
    ],
    comparison: {
      caption: "401(k) mistakes and the fix for each",
      headers: ["Topic", "How they compare"],
      rows: [
        ["Not capturing the full match", "Contribute at least to the match threshold"],
        ["Cashing out when changing jobs", "Do a direct rollover to an IRA or new plan"],
        ["Loans without a repayment plan", "Borrow only with a payoff date set"],
        ["Ignoring fees", "Review fee disclosures yearly, favor index funds"],
        ["Keeping a stale portfolio", "Rebalance to your target allocation yearly"],
      ],
    },
    checklist: [
      "Confirm your contribution rate captures the full employer match.",
      "Roll old 401(k)s over directly, never as a check to you.",
      "Read your plan's fee disclosure and note your total costs.",
      "Rebalance your allocation once a year, or use a target-date fund.",
    ],
    faqs: [
      { q: "Is it ever okay to cash out a 401(k) when changing jobs?", a: "Almost never. You pay income tax plus a 10% penalty under age 59 and a half, and you lose decades of growth. A direct rollover to an IRA keeps the money growing with no tax event." },
      { q: "How much can I contribute to a 401(k) in 2026?", a: "The elective deferral limit is $24,500 for 2026. That cap is just your own contributions, and employer matches sit on top of it. Maxing it out is a goal, but capturing the match comes first." },
    ],
    sources: [
      { title: "IRS: 401(k) Plans", url: "https://www.irs.gov/retirement-plans/401k-plans" },
      { title: "IRS: Retirement Plans", url: "https://www.irs.gov/retirement-plans" },
    ],
    related: [
      { title: "401(k) explained in plain English", href: "/wealth/401k-explained" },
      { title: "Rollover guide after leaving a job", href: "/guides/401k-rollover-after-leaving-job" },
      { title: "Compound interest calculator", href: "/tools/compound-interest" },
    ],
    query: "401k mistakes to avoid",
    opportunity: "Evergreen personal-finance query with broad volume. A tight, IRS-cited listicle distinct from loan and withdrawal guides can rank alongside the big publishers.",
    intent: "informational",
  },
  {
    slug: "tax-filing-mistakes-first-timers",
    title: "7 Tax Filing Mistakes First-Timers Make",
    description: "Seven first-time tax filing mistakes that delay refunds or cost money, and the simple fix for each.",
    answer: "First-time filers most often pick the wrong filing status, skip income they forgot about, and make math errors that slow refunds. Missing the deadline and filing on paper add more delays. Every one of these has a simple fix that takes minutes.",
    sections: [
      { title: "Mistake 1: Picking the wrong filing status", body: "Your filing status changes your standard deduction and your tax brackets. Single people sometimes file as head of household without qualifying, or married couples file separately and lose credits. For 2026 the standard deduction is $16,100 for single filers and $32,200 for joint filers, so the status you pick moves real money." },
      { title: "Mistake 2: Missing the standard deduction", body: "Most first-timers should take the standard deduction instead of itemizing. Itemizing only wins if your deductions beat the standard amount, which is rare without a mortgage. Software handles this choice automatically, but paper filers sometimes leave the standard deduction unclaimed." },
      { title: "Mistake 3: Forgetting 1099 income", body: "Freelance gigs, bank interest, and stock sales all generate 1099 forms that the IRS already has. Leave one off your return and you will get a notice months later with interest. Gather every 1099 before you start, including ones from banks you barely use." },
      { title: "Mistake 4: Making math errors", body: "Simple arithmetic mistakes are one of the top reasons returns get delayed. E-filing with tax software nearly eliminates them because the math is automatic. If you file on paper, double-check every line and have someone else review it." },
      { title: "Mistake 5: Missing the deadline", body: "The filing deadline is usually April 15, and missing it without an extension triggers a failure-to-file penalty. If you cannot finish in time, file for an extension, which gives you six more months to file. An extension extends the paperwork, not the payment, so pay what you owe by April." },
      { title: "Mistake 6: Not keeping copies", body: "Keep a copy of your return and every supporting document for at least three years. You will need them for loans, financial aid, and any IRS questions. A simple folder on your computer or a scanned PDF backup is enough." },
      { title: "Mistake 7: Filing a slow paper return", body: "Paper returns take weeks longer to process than e-filed ones, and refund delays stretch into months. E-filing with direct deposit is the fastest way to get your refund. There is rarely a reason for a first-timer to mail a return." },
    ],
    comparison: {
      caption: "First-timer filing mistakes and the fix for each",
      headers: ["Topic", "How they compare"],
      rows: [
        ["Wrong filing status", "Match your status to IRS rules, not habit"],
        ["Missing the standard deduction", "Take it unless itemizing clearly wins"],
        ["Forgetting 1099 income", "Collect every 1099 before you start"],
        ["Math errors", "E-file so software does the math"],
        ["Missing the deadline", "File an extension, and pay by April"],
        ["Not keeping copies", "Save returns and documents three years"],
        ["Filing a slow paper return", "E-file with direct deposit"],
      ],
    },
    checklist: [
      "Confirm your filing status matches IRS rules for your situation.",
      "Collect every W-2 and 1099 before you start the return.",
      "E-file and choose direct deposit for the fastest refund.",
      "Save a copy of the return and all documents for three years.",
    ],
    faqs: [
      { q: "What happens if I miss the tax filing deadline?", a: "You face a failure-to-file penalty that grows monthly on unpaid tax. File for an extension to get six more months for the paperwork. The extension does not delay payment, so pay what you estimate you owe by April 15." },
      { q: "Should a first-timer itemize or take the standard deduction?", a: "Take the standard deduction unless your itemized deductions clearly beat it. For 2026 it is $16,100 single and $32,200 joint. Most first-timers without a mortgage come out ahead with the standard deduction." },
    ],
    sources: [
      { title: "IRS: Filing", url: "https://www.irs.gov/filing" },
      { title: "IRS: Small Business and Self-Employed Tax Center", url: "https://www.irs.gov/businesses/small-businesses-self-employed" },
    ],
    related: [
      { title: "Your first tax return, start to finish", href: "/wealth/first-tax-return-guide" },
      { title: "Tax brackets explained plainly", href: "/wealth/tax-brackets-explained-plainly" },
      { title: "Teen tax return as a dependent", href: "/guides/teen-tax-return-dependent" },
    ],
    query: "tax filing mistakes first timers",
    opportunity: "Seasonal spike every January through April with genuinely confused searchers. A beginner-friendly, IRS-cited listicle matches the intent better than dense IRS pages.",
    intent: "informational",
  },
];

export function findTrafficGuide(slug: string) {
  return TRAFFIC_GUIDES.find((guide) => guide.slug === slug);
}
