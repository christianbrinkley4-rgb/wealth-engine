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
];

export function findTrafficGuide(slug: string) {
  return TRAFFIC_GUIDES.find((guide) => guide.slug === slug);
}
