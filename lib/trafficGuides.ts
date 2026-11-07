/** Research reviewed October 8, 2026. Federal education unless marked Triad-local. */
export type TrafficGuide = {
  slug: string;
  title: string;
  metaTitle?: string;
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
  datePublished?: string;
  dateModified?: string;
};

export const TRAFFIC_GUIDE_DATE = "2026-10-08";
export const TRAFFIC_GUIDES: TrafficGuide[] = [
  {
    slug: "overtime-tax-deduction-2026",
    title: "Overtime Tax Deduction 2026: What Actually Qualifies",
    description:
      "Not every overtime dollar qualifies. Check the federal overtime deduction, filing rules, payroll records, and what still gets taxed in 2026. Learn more.",
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
      { title: "Take-home pay calculator", href: "/tools/take-home-pay" },
    ],
  },
  {
    slug: "tips-tax-deduction-2026",
    title: "No Tax on Tips 2026: Tips vs. Service Charges",
    description:
      "See which tips may qualify for the federal deduction, why service charges differ, and which records tipped workers need for 2026 taxes. Read the guide.",
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
      { title: "How tipped workers report income", href: "/guides/tip-income-reporting-rules" },
    ],
  },
  {
    slug: "teen-tax-return-dependent",
    title: "Does My Teen Need to File a Tax Return?",
    description:
      "A dependent teen may still need a tax return. Separate wages, side-job profit, and interest, then check filing rules and possible refunds. Learn more.",
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
      { title: "Tax filing mistakes first-timers make", href: "/guides/tax-filing-mistakes-first-timers" },
    ],
  },
  {
    slug: "1099-k-personal-items-sold-at-loss",
    title: "1099-K for Personal Items Sold at a Loss",
    description:
      "A 1099-K doesn't mean every dollar is profit. Learn how personal sales, business sales, gifts, and reporting errors differ. Read the plain-English guide.",
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
      { title: "1099 vs W-2 classification", href: "/guides/1099-vs-w2-classification" },
    ],
  },
  {
    slug: "tax-extension-cannot-pay",
    title: "Filed a Tax Extension but Can't Pay?",
    description:
      "A filing extension doesn't extend payment time. See how filing, partial payments, IRS payment options, and hardship requests differ. Explore the guide.",
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
      { title: "Estimated quarterly taxes", href: "/guides/estimated-quarterly-taxes-guide" },
    ],
  },
  {
    slug: "unemployment-tax-withholding",
    title: "Is Unemployment Taxable? Withholding Explained",
    description:
      "Unemployment benefits generally count as federal taxable income. Learn about Form 1099-G, 10% withholding, and checking your full-year tax. Learn more.",
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
      { title: "Take-home pay calculator", href: "/tools/take-home-pay" },
    ],
  },
  {
    slug: "inherited-ira-ten-year-rule",
    title: "Inherited IRA: Does the 10-Year Rule Mean Wait?",
    description:
      "Some inherited IRAs require annual withdrawals before year ten. Check beneficiary status, the owner's required beginning date, and account type. Read on.",
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
        title: "An example ten-year timeline",
        body: "Say the owner dies in 2026. The tenth year after death is 2036, so the account must be empty by December 31, 2036. If the owner died on or after the required beginning date, annual distributions generally apply in 2027 through 2035, with the rest out by the 2036 deadline. If the owner died before that date, there is generally no annual minimum in 2027 through 2035, but the full balance still has to come out by December 31, 2036. Waiting until the last year can push a large amount into one tax year, so ask a tax professional about spreading withdrawals before you decide.",
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
      { title: "Roth conversion ladder", href: "/guides/roth-conversion-ladder-explained" },
    ],
  },
  {
    slug: "401k-rollover-after-leaving-job",
    title: "401(k) After Leaving a Job: Rollover Rules",
    description:
      "Compare leaving a 401(k), a direct rollover, and a payment to you. Understand the 60-day rule and withholding before requesting a check. Read the guide.",
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
      { title: "401(k) loan vs withdrawal", href: "/guides/401k-loan-vs-withdrawal" },
    ],
  },
  {
    slug: "hsa-fsa-after-leaving-job",
    title: "HSA vs. FSA After Leaving a Job: What Stays?",
    description:
      "Your HSA stays yours after a job change. A health FSA follows different rules. Check contribution eligibility and claim deadlines before leaving. Read on.",
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
      "A nonrenewal letter needs a different response from a benefit-change notice. A Medicare checklist for Greensboro and the surrounding Triad. Learn more.",
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
      { title: "If you do nothing, you land on Original Medicare", body: "When a Medicare Advantage plan's contract ends and you don't join another plan, Medicare puts you on Original Medicare starting January 1. That means Parts A and B only. No drug coverage, no yearly cap on what you pay, none of the extra benefits your old plan had. A stand-alone Part D drug plan needs its own enrollment, and going 63 days or more without drug coverage can add a late enrollment penalty to your premium for as long as you carry Part D. Doing nothing is still a choice, so treat it like one." },
      { title: "Work the window month by month", body: "The Special Enrollment Period runs December 8 through the last day of February. Use December to compare plans with your doctors and prescriptions in front of you. Enrollments made in January or February take effect the first day of the next month, so there is no backdating to guess about. For Greensboro, Winston-Salem, High Point, and Burlington residents, start with your home address, your doctors, your pharmacy, and every prescription you take. Your letter tells you when the old coverage ends. The new plan tells you when the new coverage starts. Get both dates in writing." },
      { title: "Free help reading the letter in North Carolina", body: "You don't have to decode the letter alone. Every state has a State Health Insurance Assistance Program with free, unbiased Medicare counseling, and the counselors don't sell anything. In North Carolina the program is called SHIIP, run through the Department of Insurance, with trained counselors in every county. You can also call 1-800-MEDICARE with questions about your rights. Triad residents can ask Christian to walk through the letter too. Either way, keep the full letter and the envelope it came in, since they prove your enrollment rights." },
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
      { q: "If my plan is not renewing, can I use the special window to join any Medicare Advantage plan?", a: "The Special Enrollment Period runs December 8 through the last day of February. Inside it you can join another Medicare Advantage plan, with or without drug coverage, or return to Original Medicare and add a stand-alone Part D plan. Coverage starts the first of the month after the plan receives your request." },
      { q: "What if the nonrenewal letter arrived late and my coverage already ended?", a: "The Special Enrollment Period still runs through the last day of February, so move quickly. Call 1-800-MEDICARE or North Carolina's SHIIP program and ask about your options for any months you went uncovered, including drug coverage so you don't rack up a late enrollment penalty." },
    ],
    sources: [
      {
        title: "Medicare: Special Enrollment Periods",
        url: "https://www.medicare.gov/basics/get-started-with-medicare/get-more-coverage/joining-a-plan/special-enrollment-periods",
      },
      { title: "CMS: Part D creditable coverage and late enrollment penalty", url: "https://www.cms.gov/medicare/enrollment-renewal/part-d-plans/creditable-coverage-and-late-enrollment-penalty" },
      { title: "SSA: Medicare premiums and free SHIP counseling help", url: "https://www.ssa.gov/benefits/medicare/medicare-premiums.html" },
    ],
    related: [
      { title: "Medicare automatic renewal", href: "/guides/medicare-automatic-renewal" },
      { title: "Medicare Advantage Open Enrollment, January through March", href: "/guides/medicare-advantage-open-enrollment-period" },
      { title: "Medicare Advantage plan cancelled: what it means", href: "/answers/medicare-advantage-plan-cancelled" },
      { title: "Special enrollment", href: "/special-enrollment" },
      { title: "Annual enrollment", href: "/aep" },
    ],
  },
  {
    slug: "401k-loan-vs-withdrawal",
    title: "401(k) Loan vs Withdrawal: Taxes Explained",
    description: "A 401(k) loan avoids taxes when repaid on schedule; a withdrawal is taxed and usually penalized. Learn the real cost of each. Read the plain-English guide.",
    answer: "A loan lets you borrow from your 401(k) and pay yourself back, usually within five years, with no income tax if repaid. A withdrawal is taxable income and usually adds a 10% early-distribution penalty if you are under 59 1/2. The loan avoids the penalty when you repay on schedule.",
    sections: [
      { title: "How a 401(k) loan works", body: "IRS rules let you borrow up to the lesser of $50,000 or half your vested balance. You repay it within five years through payroll deductions with interest to yourself. Repay it late or leave your job and the balance may become a taxable distribution. Plans can refuse loans, so check your plan documents first." },
      { title: "What a withdrawal really costs", body: "Cashing out is taxed as ordinary income for the year you take it. Add the 10% early-distribution penalty when you are under 59 1/2 and no exception applies. In a 22% bracket with the penalty, nearly a third of the withdrawal disappears to taxes. Hardship withdrawals follow the same tax rules, even when the plan approves them." },
      { title: "When each choice makes sense", body: "Loans fit short-term gaps you are certain you can repay before leaving your job. Withdrawals fit true hardships where repayment is not possible. Neither choice beats building an emergency fund before you need one." },
      { title: "An old loan shrinks your next one", body: "The $50,000 cap isn't always $50,000. The IRS reduces it by the gap between your highest outstanding loan balance in the last 12 months and what you still owe today. Say you borrowed $20,000 last spring and owe $12,000 now. Your new ceiling is $50,000 minus that $8,000 difference, or $42,000, and the 50%-of-vested-balance test still applies on top. Borrowing again and again quietly eats your room. The IRS loan rules walk through the exact math." },
      { title: "Buying a home gets you more time", body: "The five-year repayment clock has one big exception. If you use the loan to buy your principal residence, the plan can stretch repayment beyond five years. Every other purpose has to fit inside five years with payments at least quarterly. Fall behind the schedule and the IRS treats the balance as a distribution, taxed and possibly penalized. Check your plan's loan policy before you count on the longer timeline." },
      { title: "Leaving your job with a loan: the rollover deadline", body: "Most plans demand full repayment soon after you leave. If you can't pay, the unpaid balance becomes a distribution and shows up on Form 1099-R. Here is the part people miss: you can still roll that amount into an IRA or a new employer's plan by the due date of your tax return, extensions included, and avoid the tax hit entirely. Miss that deadline and it's taxable income, plus the 10% penalty if you're under 59 and a half." },
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
      { q: "Is the interest I pay on my 401(k) loan tax-deductible?", a: "No. You repay the loan with after-tax dollars, and the interest goes back into your own account. When you withdraw that money in retirement, it gets taxed again. That double taxation on the interest is one of the hidden costs of borrowing from yourself." },
      { q: "Can I take a 401(k) loan from an IRA?", a: "No. IRAs and IRA-based plans like SEPs and SIMPLE IRAs can't offer participant loans at all. Trying to borrow from an IRA counts as a prohibited transaction and can blow up the account's tax status. Loans only exist inside employer plans such as 401(k)s, 403(b)s, and 457(b)s." },
    ],
    sources: [
      { title: "IRS: Retirement Plans", url: "https://www.irs.gov/retirement-plans" },
      { title: "IRS: Tax Topics", url: "https://www.irs.gov/taxtopics" },
      { title: "IRS: Retirement Topics - Loans", url: "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-loans" },
      { title: "IRS: Retirement Plans FAQs Regarding Loans", url: "https://www.irs.gov/retirement-plans/retirement-plans-faqs-regarding-loans" },
    ],
    related: [
      { title: "401(k) explained, plainly", href: "/wealth/401k-explained" },
      { title: "What to do with your 401(k) after leaving a job", href: "/guides/401k-rollover-after-leaving-job" },
      { title: "401(k) early withdrawal exceptions", href: "/guides/401k-early-withdrawal-exceptions" },
    ],
    query: "401k loan vs withdrawal taxes",
    opportunity: "High-intent query from workers facing a cash crunch; thin, jargon-heavy results make a plain-English explainer winnable.",
    intent: "transactional",
  },

  {
    slug: "roth-conversion-ladder-explained",
    title: "Roth ladder: how a conversion ladder works",
    metaTitle: "Roth Ladder: Conversion Timing, Taxes, and Rules",
    description:
      "A Roth ladder uses conversions across tax years. Learn separate five-year rules, taxable portions, withdrawal ordering, and records to check before acting.",
    answer:
      "A Roth ladder uses a series of conversions to move retirement money into a Roth IRA over time. The taxable portion of each conversion can create income tax, and early withdrawals can face additional tax unless the timing and ordering rules are satisfied.",
    sections: [
      {
        title: "What the ladder is designed to do",
        body: "A ladder spreads conversions across tax years so that converted amounts have different timing records. It can be part of an early-retirement plan, but it does not guarantee tax savings, accessible income, or sufficient retirement assets. Before using it, distinguish the money converted from later investment earnings and identify the funds that would pay living expenses during the waiting period.",
      },
      {
        title: "The taxable portion of a conversion",
        body: "Pre-tax retirement money generally creates income when converted to a Roth IRA. After-tax basis can make part of a conversion nontaxable. For traditional IRAs, the calculation can involve aggregated traditional, SEP, and SIMPLE IRA balances rather than a chosen account alone. Form 8606 is used when applicable. Ask a tax professional to check your records; do not assume the entire conversion is always taxable or that after-tax money can always be isolated.",
      },
      {
        title: "Two five-year rules with different purposes",
        body: "Each conversion has a separate five-tax-year period relevant to the additional tax on certain early distributions of converted taxable amounts. The period begins January 1 of the conversion year. Qualified Roth IRA distributions follow another five-tax-year rule measured from the first tax year for which a contribution was made to a Roth IRA for you, plus a qualifying condition such as age 59½. Completing a conversion clock does not by itself make early earnings withdrawals qualified.",
      },
      {
        title: "Which dollars come out first",
        body: "For nonqualified Roth IRA distributions, IRS ordering rules generally treat regular contributions as coming out first, then conversions and rollovers in order, then earnings. Within a conversion, the taxable portion generally comes out before the nontaxable portion. Apply these rules across the Roth IRAs as directed by the IRS. A separate account label does not allow you to choose earnings or a particular conversion ahead of the ordering rules.",
      },
      {
        title: "A hypothetical timing example, without investment assumptions",
        body: "For a conversion made in tax year 2026, the separate conversion period starts January 1, 2026. Its five tax years are 2026 through 2030. A later conversion in 2027 has its own period starting January 1, 2027. This example only illustrates the clocks. Age, exceptions, distribution ordering, basis, and the separate earnings rules still determine the tax treatment of an actual withdrawal.",
      },
      {
        title: "Funding the wait and checking other income effects",
        body: "Identify how expenses would be funded before planned converted amounts are available under the relevant rules. Conversion income can affect tax brackets and income-tested items, including some credits, health coverage assistance, and Medicare income-related premiums. These effects depend on the applicable tax year and household circumstances. Do not convert simply because a headline calls a year low-income. Compare the full return and coverage effects with a qualified professional.",
      },
      {
        title: "Records and reporting",
        body: "Keep conversion dates, amounts, account statements, after-tax basis records, prior Forms 8606, and distribution records. Confirm when the custodian actually completed the conversion. A request submitted near year-end does not establish the completion year by itself. Check reporting forms against those records, and ask a tax professional to evaluate the plan before starting or changing a series of conversions.",
      },
    ],
    comparison: {
      caption: "Different Roth IRA rules answer different questions",
      headers: ["Question", "Rule to check"],
      rows: [
        [
          "Tax on the conversion",
          "Pre-tax amounts and any after-tax basis determine the taxable portion.",
        ],
        [
          "Early withdrawal of converted amounts",
          "Separate conversion clocks, ordering, age, and exceptions matter.",
        ],
        [
          "Tax-free earnings",
          "Qualified-distribution requirements include a separate five-year rule and a qualifying condition.",
        ],
      ],
    },
    checklist: [
      "Check account type and after-tax basis.",
      "Separate the conversion clock from the qualified-distribution rule.",
      "Identify money available during any waiting period.",
      "Review tax and income-tested benefit effects.",
      "Keep dates, amounts, Forms 8606, and custodian statements.",
    ],
    faqs: [
      {
        q: "Does every conversion have a clock?",
        a: "Each conversion has its own five-tax-year period for the relevant early-distribution additional-tax rule. Age and other exceptions can affect whether that rule results in tax.",
      },
      {
        q: "Is the full conversion always taxable?",
        a: "No. After-tax basis can affect the taxable portion. The applicable calculation may involve more than one IRA.",
      },
      {
        q: "Can I withdraw earnings tax-free after five years regardless of age?",
        a: "No. The qualified-distribution rule also requires a qualifying condition. A conversion clock alone does not qualify earnings.",
      },
      {
        q: "How does a ladder differ from 72(t) payments?",
        a: "A conversion ladder and substantially equal periodic payments use different rules. The latter generally require a continuing payment schedule and can impose consequences for an impermissible change.",
      },
    ],
    sources: [
      {
        title: "IRS Publication 590-B: Distributions from IRAs",
        url: "https://www.irs.gov/publications/p590b",
      },
      {
        title: "IRS Publication 590-A: Contributions to IRAs",
        url: "https://www.irs.gov/publications/p590a",
      },
      {
        title: "IRS: Substantially equal periodic payments",
        url: "https://www.irs.gov/retirement-plans/substantially-equal-periodic-payments",
      },
    ],
    related: [
      {
        title: "The different Roth five-year rules",
        href: "/guides/roth-ira-five-year-rule",
      },
      {
        title: "Roth ladder calculator",
        href: "/tools/roth-conversion-ladder",
      },
      {
        title: "72(t) exceptions by account type",
        href: "/guides/72t-exceptions",
      },
      {
        title: "Roth IRA basics",
        href: "/wealth/roth-ira-explained",
      },
      {
        title: "401(k) early withdrawal exceptions",
        href: "/guides/401k-early-withdrawal-exceptions",
      },
      {
        title: "Inherited IRA ten-year rule",
        href: "/guides/inherited-ira-ten-year-rule",
      },
    ],
    query: "roth ladder",
    opportunity:
      "A primary-source explanation with distinct timing rules. Broader financial visibility needs useful original teaching and trusted references.",
    intent: "informational",
    datePublished: "2026-10-08",
    dateModified: "2026-11-07",
  },
  {
    slug: "hsa-triple-tax-advantage",
    title: "HSA Triple Tax Advantage Explained",
    description: "Deductible contributions, tax-free growth, tax-free medical withdrawals. The HSA's triple tax advantage and 2026 limits, explained. Explore the guide.",
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
      { title: "HSA mistakes to avoid", href: "/guides/hsa-mistakes-to-avoid" },
    ],
    query: "hsa triple tax advantage",
    opportunity: "Evergreen benefits question asked every open enrollment; few pages lead with all three breaks in plain language.",
    intent: "informational",
  },
  {
    slug: "estimated-quarterly-taxes-guide",
    title: "Estimated Quarterly Taxes, Plainly Explained",
    description: "Freelancers and side earners pay income tax four times a year. Due dates, safe harbor rules, and how to skip the penalty. Read the plain-English guide.",
    answer: "You pay estimated taxes four times a year when your income has little or no withholding. That usually means freelancers, gig workers, landlords, and investors. Pay enough on time and you avoid the underpayment penalty.",
    sections: [
      { title: "Who has to pay", body: "The IRS expects estimated payments when you will owe at least $1,000 after withholding and credits. Self-employed workers pay because no employer withholds for them. People with rental or investment income may owe them too. W-2 employees with side income can fall in as well." },
      { title: "The four due dates", body: "Payments are due April 15, June 15, and September 15 of the current year. The fourth payment is due January 15 of the next year. A date that lands on a weekend or holiday moves to the next business day. Each payment covers the income earned in that slice of the year." },
      { title: "Safe harbor rules", body: "You dodge the underpayment penalty by paying 90% of this year's tax. You can also pay 100% of last year's tax as a safe harbor. If last year's AGI was above $150,000, the safe harbor rises to 110%. State rules differ, so check your state separately." },
      { title: "The 2026 dates on the calendar", body: "For 2026 income, payments land on April 15, June 15, and September 15, 2026, with the final one due January 15, 2027. If a date falls on a weekend or holiday, it slides to the next business day. The year gets sliced into uneven chunks: the June payment covers only two months of income while the September one covers three. That's why the IRS calls them payment periods, not quarters." },
      { title: "How to actually send the money", body: "The fastest route is IRS Direct Pay or the IRS2Go app, straight from your bank account, and you get a confirmation number on the spot. EFTPS works too once you're enrolled. Paper filers mail Form 1040-ES with a voucher and a check. You can also pay weekly or monthly as long as each period's total is in by its due date. Whichever way you pay, save the confirmation with your tax records." },
      { title: "Uneven income gets its own method", body: "If most of your money arrives late in the year, equal quarterly payments can overpay early and still leave you penalized. The IRS lets you annualize: match each payment to the income actually earned in that period, using Schedule AI of Form 2210. Freelancers with lumpy income, landlords with a big fourth-quarter sale, and anyone with a mid-year windfall should know this exists. It takes more math, but it can cut the penalty down to size." },
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
      { q: "I missed a quarterly payment. What now?", a: "Pay it as soon as you can. The penalty is figured period by period, so catching up stops the meter from running. File Form 2210 with your return to let the IRS compute the penalty, or let your tax software handle it." },
      { q: "Does the underpayment penalty apply if I get a refund?", a: "It can. The penalty looks at whether you paid enough during the year, not at your final balance. Paying in April what you owed in June can still trigger it, even if your return shows a refund." },
    ],
    sources: [
      { title: "IRS: Small Business and Self-Employed Tax Center", url: "https://www.irs.gov/businesses/small-businesses-self-employed" },
      { title: "IRS: Tax Topics", url: "https://www.irs.gov/taxtopics" },
      { title: "IRS: Estimated Taxes", url: "https://www.irs.gov/businesses/small-businesses-self-employed/estimated-taxes" },
      { title: "IRS: About Form 1040-ES, Estimated Tax for Individuals", url: "https://www.irs.gov/forms-pubs/about-form-1040-es" },
    ],
    related: [
      { title: "Side hustle taxes, plainly", href: "/wealth/side-hustle-taxes" },
      { title: "Filing your first tax return", href: "/wealth/first-tax-return-guide" },
      { title: "SEP IRA vs solo 401(k)", href: "/guides/sep-ira-vs-solo-401k" },
    ],
    query: "estimated quarterly taxes due dates safe harbor",
    opportunity: "Freelancer staple query with year-specific dates; a current, plain guide beats dated IRS PDFs in search.",
    intent: "transactional",
  },
  {
    slug: "1099-vs-w2-classification",
    title: "1099 vs W-2: How Worker Status Changes Taxes",
    description: "W-2 employees split payroll taxes with their boss. 1099 contractors pay the full 15.3% themselves. What your worker status costs you. Explore the guide.",
    answer: "W-2 workers are employees with tax withheld and half their payroll taxes paid by the employer. Workers paid on a 1099 are independent contractors who handle their own taxes. The trade is flexibility and deductions against self-employment tax and quarterly payments.",
    sections: [
      { title: "How the taxes differ", body: "Employees split Social Security and Medicare taxes with their employer each paycheck. Contractors pay the full 15.3% self-employment tax on 92.35% of net earnings themselves. Contractors make quarterly estimated payments instead of relying on withholding. A wider menu of business deductions offsets some of the difference." },
      { title: "What misclassification looks like", body: "Some employers label workers as contractors to skip payroll taxes and benefits. The IRS decides status from behavioral control, financial control, and the relationship itself. A worker told when, where, and how to work is usually an employee. Misclassified workers can file Form SS-8 to ask the IRS for a determination." },
      { title: "Why it matters for your paycheck", body: "Contractor pay often looks higher per hour because nothing is withheld. Once you price in the extra payroll tax, quarterly payments, and missing benefits, the gap shrinks. Employees also get unemployment insurance and workers' comp that contractors lack. Compare total compensation, not just the hourly rate." },
      { title: "You get to deduct half the self-employment tax", body: "The IRS lets you deduct the employer-equivalent half of self-employment tax from your income when you file. That's 7.65% of 92.35% of your net earnings, claimed on Schedule 1 of Form 1040. It lowers your income tax, not the self-employment tax itself. Employees can't deduct their half at all. It softens the gap between the two statuses, but it doesn't close it." },
      { title: "High earners pay an extra 0.9% Medicare tax", body: "Above $200,000 of wages or self-employment income ($250,000 joint, $125,000 married filing separately), an additional 0.9% Medicare tax kicks in. Employees see it in withholding. Contractors figure it on Form 8959. It hits both statuses the same way, so it's not a reason to prefer one, but 1099 earners have to plan for it because nothing is withheld automatically." },
      { title: "The 12.4% Social Security part has a ceiling", body: "Social Security's 12.4% stops at the annual wage base, which is $184,500 for 2026. The 2.9% Medicare part has no cap at all. W-2 wages and self-employment income share a single wage base per person, with wages counted first. Once your combined earnings pass the base, only the Medicare piece keeps going." },
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
      { q: "What is Form 8919?", a: "If your employer treated you as a contractor but you believe you're an employee, Form 8919 lets you report your share of Social Security and Medicare taxes on those wages. You pay the employee half instead of the full self-employment tax. It doesn't settle the classification question, but it fixes your tax bill while you sort it out." },
      { q: "Should I file Form SS-8 early if I think I'm misclassified?", a: "Yes. The IRS processes determinations in the order received and they take time, so filing early protects you. Keep working and paying tax as a contractor in the meantime, and keep records of schedules, instructions, and tools your boss provided." },
    ],
    sources: [
      { title: "IRS: Independent Contractor or Employee", url: "https://www.irs.gov/businesses/small-businesses-self-employed/independent-contractor-self-employed-or-employee" },
      { title: "IRS: Small Business and Self-Employed Tax Center", url: "https://www.irs.gov/businesses/small-businesses-self-employed" },
      { title: "IRS: Tax Topics", url: "https://www.irs.gov/taxtopics" },
      { title: "IRS: Self-Employment Tax (Social Security and Medicare Taxes)", url: "https://www.irs.gov/businesses/small-businesses-self-employed/self-employment-tax-social-security-and-medicare-taxes" },
      { title: "SSA: Contribution and Benefit Base", url: "https://www.ssa.gov/oact/cola/cbb.html" },
      { title: "IRS: About Form 8919, Uncollected Social Security and Medicare Tax on Wages", url: "https://www.irs.gov/forms-pubs/about-form-8919" },
    ],
    related: [
      { title: "Side hustle taxes, plainly", href: "/wealth/side-hustle-taxes" },
      { title: "1099-K for personal items sold at a loss", href: "/guides/1099-k-personal-items-sold-at-loss" },
      { title: "Estimated quarterly taxes", href: "/guides/estimated-quarterly-taxes-guide" },
    ],
    query: "1099 vs w2 tax differences",
    opportunity: "Massive gig-economy query; most pages are payroll ads, so an education-first comparison can win clicks.",
    intent: "transactional",
  },
  {
    slug: "fsa-vs-hsa-which-is-better",
    title: "FSA vs HSA: Which Health Account Wins?",
    description: "HSAs roll over and travel with you; FSAs expire with your job. Compare eligibility, 2026 limits, and which fits your health plan. Read the details here.",
    answer: "An HSA pairs with a high-deductible health plan, rolls over every year, and follows you between jobs. An FSA works with most plans but is tied to your employer and mostly use-it-or-lose-it. The HSA also carries the triple tax advantage the FSA cannot match.",
    sections: [
      { title: "Eligibility and ownership", body: "You need a qualifying high-deductible health plan to open or fund an HSA. An FSA only needs an employer that offers one, and it works with most health plans. The HSA is your account forever, even after you leave the job. The FSA ends with the job, though a grace period can give you a little extra time." },
      { title: "Contribution limits for 2026", body: "HSA caps for 2026 are $4,400 self-only and $8,750 family, plus a $1,000 catch-up at 55 and older. The health FSA limit for 2026 is $3,400 per employee from salary reductions. FSA limits apply per employee, so two working spouses can each have one. Both limits adjust yearly for inflation." },
      { title: "Use-it-or-lose-it vs rollover", body: "HSA balances roll over in full every year with no deadline. FSA money generally expires at plan year-end under use-it-or-lose-it. Employers may allow up to $680 in carryover or a grace period of two and a half months. They cannot offer both, so check your plan documents." },
      { title: "Medicare enrollment ends HSA contributions", body: "The month you enroll in Medicare, including premium-free Part A, your HSA eligibility stops. You keep the account and can spend what's in it, but new contributions become excess contributions with a 6% penalty for each year they stay in. The trap: if you sign up for Medicare after 65, Part A backdates up to six months, which can retroactively disqualify contributions you already made. People working past 65 often stop HSA contributions six months before filing for Medicare or Social Security." },
      { title: "The dependent care FSA is a different animal", body: "Separate from the health FSA, the dependent care FSA pays for childcare or adult dependent care so you can work. For 2026 the limit jumps to $7,500 ($3,750 married filing separately), the first increase since 1986. It covers kids under 13, daycare, preschool, and day camps, but not overnight camps. Unlike the health FSA, there's no carryover at all, though some plans offer a short grace period. And it has nothing to do with your health plan choice." },
      { title: "Your HSA can double as a retirement account", body: "After 65, the 20% penalty on non-medical HSA withdrawals disappears. Withdrawals for anything other than medical expenses are taxed as income, like a traditional IRA, but there's no penalty and no required withdrawals ever. That's why some people pay medical bills out of pocket, save the receipts, and let the HSA compound for decades. The IRS lets you reimburse yourself years later as long as the expense happened after the HSA was opened." },
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
      { q: "I'm 66, still working, and on my employer's plan. Can I keep funding my HSA?", a: "Only if you're not enrolled in Medicare. Once Part A starts, contributions have to stop. If you delayed Medicare past 65, remember Part A backdates up to six months, so stop contributing at least six months before you apply." },
      { q: "What are the 2026 HDHP minimums to qualify for an HSA?", a: "The plan must have a deductible of at least $1,700 self-only or $3,400 family, and out-of-pocket maximums no higher than $8,500 self-only or $17,000 family. If your plan's numbers don't clear both bars, it's not HSA-eligible no matter what HR calls it." },
    ],
    sources: [
      { title: "IRS Publication 969: Health Savings Accounts", url: "https://www.irs.gov/publications/p969" },
      { title: "IRS: Tax Topics", url: "https://www.irs.gov/taxtopics" },
      { title: "IRS: Publication 503, Child and Dependent Care Expenses", url: "https://www.irs.gov/publications/p503" },
      { title: "IRS: Revenue Procedure 2025-19, 2026 HSA and HDHP figures", url: "https://www.irs.gov/pub/irs-drop/rp-25-19.pdf" },
    ],
    related: [
      { title: "HSA explained, plainly", href: "/wealth/hsa-explained" },
      { title: "What happens to your HSA or FSA after leaving a job", href: "/guides/hsa-fsa-after-leaving-job" },
      { title: "HSA triple tax advantage", href: "/guides/hsa-triple-tax-advantage" },
    ],
    query: "fsa vs hsa which is better",
    opportunity: "Open-enrollment classic with fresh 2026 limits; pages with current numbers and clear tables rank well.",
    intent: "transactional",
  },
  {
    slug: "tax-loss-harvesting-wash-sale",
    title: "Tax-Loss Harvesting and the Wash Sale Rule",
    description: "Sell losing investments to offset gains, use $3,000 a year against income, and dodge the 30-day wash sale rule. Explore the steps in Christian Brinkley's guide.",
    answer: "You sell investments at a loss to offset gains, which lowers your tax bill. You can apply up to $3,000 of net losses per year against ordinary income. Unused losses carry forward to future years.",
    sections: [
      { title: "How the strategy works", body: "Sell a losing investment and use the loss to cancel out gains from winners. Short-term losses first offset short-term gains, which are taxed at higher rates. Net losses beyond your gains can offset up to $3,000 of ordinary income per year. Leftover losses carry forward to future tax years." },
      { title: "The wash sale rule", body: "You cannot claim the loss if you buy the same or a substantially identical security 30 days before or after the sale. That creates a 61-day window around your sale date. Breaking the rule disallows the loss for that year. The disallowed loss adjusts the cost basis of your replacement shares instead." },
      { title: "Limits and gotchas", body: "The $3,000 cap drops to $1,500 if you are married filing separately. The strategy applies to taxable accounts only, not IRAs or 401(k)s. Repurchasing the same fund inside your IRA can still trigger a wash sale. Track trades across every account you own." },
      { title: "Automatic dividend reinvestment counts as buying", body: "If your fund reinvests dividends automatically, each reinvestment is a purchase. One landing inside the 61-day window around your sale can trigger the wash sale rule on that lot. Before you harvest, turn off automatic reinvestment on the security you're selling, in every account including your IRA. You can turn it back on after the window closes." },
      { title: "The rule follows you across accounts, even your spouse's", body: "The IRS doesn't limit the wash sale rule to the account where you sold. Buying substantially identical securities in your IRA, your 401(k), or your spouse's accounts inside the window can still disallow the loss. When you harvest, check every account you and your spouse control for 30 days before and after the sale date." },
      { title: "How the loss actually reaches your tax return", body: "Every sale gets reported on Form 8949, with the totals flowing to Schedule D. Your broker sends Form 1099-B, but its cost-basis numbers can be incomplete, especially for older positions or transferred accounts. Keep your own trade confirmations. If the wash sale rule disallowed part of a loss, that amount gets added to the basis of your replacement shares, which lowers your gain or raises your loss when you eventually sell those." },
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
      { q: "Does the wash sale rule apply to cryptocurrency?", a: "Currently no. The IRS treats crypto as property, not a security, so the wash sale rule's stock-and-securities language doesn't reach it. Congress has proposed changing this more than once, so check the current law before you harvest crypto losses." },
      { q: "Can I harvest losses in December and buy back in January?", a: "Only if January is more than 30 days after the sale. A December 20 sale means waiting until at least January 20. Count the days on a calendar. The window is 30 days before and after, 61 days total including the sale date." },
    ],
    sources: [
      { title: "IRS Publication 550: Investment Income and Expenses", url: "https://www.irs.gov/publications/p550" },
      { title: "IRS: Tax Topics", url: "https://www.irs.gov/taxtopics" },
      { title: "IRS: Topic 409, Capital Gains and Losses", url: "https://www.irs.gov/taxtopics/tc409" },
    ],
    related: [
      { title: "Tax brackets explained, plainly", href: "/wealth/tax-brackets-explained-plainly" },
      { title: "Compound interest calculator", href: "/tools/compound-interest" },
      { title: "Roth vs traditional taxes", href: "/wealth/roth-vs-traditional-taxes" },
    ],
    query: "tax loss harvesting wash sale rule",
    opportunity: "Year-end spike query from DIY investors; a jargon-free walkthrough of the 30-day rule fills a gap.",
    intent: "transactional",
  },
  {
    slug: "tip-income-reporting-rules",
    title: "How Tipped Workers Report Income to the IRS",
    description: "All tips are taxable, including cash. Daily records, the $20 monthly rule, and Form 4137, explained for tipped workers. Explore the plain-English guide.",
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
      { title: "Overtime tax deduction 2026", href: "/guides/overtime-tax-deduction-2026" },
    ],
    query: "how to report tip income IRS",
    opportunity: "Distinct from the tips deduction guide; service workers search reporting rules year-round and official wording is dense.",
    intent: "informational",
  },
  {
    slug: "backdoor-roth-ira-steps",
    title: "Backdoor Roth IRA: Step-by-Step Guide",
    description: "How the backdoor Roth IRA works, who needs it, and the pro-rata rule to watch. Plain steps for high earners. Explore the steps in Christian Brinkley's guide.",
    answer: "A backdoor Roth IRA is a two-step move: contribute to a traditional IRA, then convert it to a Roth. It exists because high earners lose the ability to contribute to a Roth directly once their income passes the IRS phaseout limits. It works best when you have no pre-tax IRA balance, because of the pro-rata rule.",
    sections: [
      { title: "Who actually needs this", body: "For 2026, the IRS phases out direct Roth IRA contributions for higher earners. If your income is above that range, direct contributions are off the table. The backdoor route still lets you get money into a Roth through a conversion. Check the current IRS figures to see where the phaseouts start." },
      { title: "The two steps, in order", body: "First, make a nondeductible contribution to a traditional IRA, up to the annual IRA limit ($7,500 for 2026 per the site's IRS figures). Second, convert that traditional IRA balance to a Roth IRA. The conversion itself has no income limit, which is why this path exists. You report both steps on your tax return using Form 8606." },
      { title: "The pro-rata rule warning", body: "The pro-rata rule is the trap. If you hold pre-tax money in any traditional, SEP, or SIMPLE IRA, the IRS treats your conversion as coming proportionally from all of them. That means part of your conversion is taxable, even if you converted only the new contribution. Rolling old pre-tax IRA money into a 401(k) first can clear the path." },
      { title: "The calendar split: contribute for last year, convert this year", body: "You can make a prior-year IRA contribution up until the tax filing deadline, usually April 15. The conversion, though, always counts in the calendar year it happens. Contribute in February for the prior year, convert in March, and your paperwork spans two tax years: the contribution on last year's Form 8606, the conversion on this year's. That's normal. Just don't mix up which form reports which step." },
      { title: "The paper trail: 5498, 1099-R, and 8606", body: "Your custodian reports the contribution to the IRS on Form 5498 and the conversion on Form 1099-R. Your job is Form 8606, where you report the nondeductible contribution and figure the taxable part of the conversion. File it every year you touch this strategy, even in years you only contributed and didn't convert. Skipping it is how after-tax basis gets lost and conversions get taxed twice." },
      { title: "You need earned income to play", body: "IRA contributions require compensation: wages, salaries, self-employment income, and a few similar kinds. Investment income, rental income, and Social Security don't count. Your contribution can't exceed what you earned that year. A nonworking spouse can still contribute through a spousal IRA as long as the working spouse earned enough to cover both." },
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
      { q: "Can I undo a backdoor Roth if I mess it up?", a: "Conversions can't be undone. Congress eliminated recharacterization of Roth conversions starting in 2018. If you converted the wrong amount or at the wrong time, it stays converted. That's why people convert quickly after contributing and double-check the pro-rata math first." },
      { q: "What are the 2026 Roth IRA income limits that make the backdoor necessary?", a: "Direct Roth contributions phase out from $153,000 to $168,000 of modified adjusted gross income for single filers, and $242,000 to $252,000 for joint filers. Above those ranges, the backdoor route is the way in." },
    ],
    sources: [
      { title: "Source: IRS individual retirement arrangements (IRAs)", url: "https://www.irs.gov/retirement-plans/individual-retirement-arrangements-iras" },
      { title: "Source: IRS Roth IRAs", url: "https://www.irs.gov/retirement-plans/roth-iras" },
      { title: "Source: IRS Publication 590-A", url: "https://www.irs.gov/publications/p590a" },
      { title: "IRS: About Form 8606, Nondeductible IRAs", url: "https://www.irs.gov/forms-pubs/about-form-8606" },
    ],
    related: [
      { title: "Roth IRA basics", href: "/wealth/roth-ira-explained" },
      { title: "Roth vs traditional calculator", href: "/tools/roth-vs-traditional" },
      { title: "Roth IRA 5-year rule", href: "/guides/roth-ira-five-year-rule" },
    ],
    query: "backdoor roth ira steps",
    opportunity: "High search volume with mostly forum answers; a clear step-by-step guide with the pro-rata warning can win.",
    intent: "transactional",
  },
  {
    slug: "mega-backdoor-roth-explained",
    title: "Mega Backdoor Roth: How It Works",
    description: "How the mega backdoor Roth uses after-tax 401(k) contributions and an in-service rollover to fund a Roth beyond normal limits. Read the plain-English guide.",
    answer: "The mega backdoor Roth lets you move far more than the normal Roth IRA limit into a Roth each year. You make after-tax contributions to your 401(k), then roll them into a Roth through an in-service distribution or rollover. For 2026, the total 401(k) contribution limit is $72,000 for savers under 50. After-tax contributions fill the gap above your $24,500 elective deferral and any employer match.",
    sections: [
      { title: "What it actually is", body: "It is a strategy inside your 401(k), not an IRA trick. Your plan must allow after-tax contributions and in-service rollovers or distributions. Without both features, the mega backdoor is not available. Check your plan's summary description or ask your administrator." },
      { title: "The math for 2026", body: "The 2026 overall 401(k) limit is $72,000 for those under 50. Subtract your $24,500 elective deferral and your employer's match to find your after-tax room. Example: with a $6,000 match, you could add $41,500 after-tax. That amount then rolls into a Roth." },
      { title: "The catch to know", body: "Not every plan allows it, and some only let you roll out once a year. After-tax contributions grow tax-deferred, but gains are taxable until rolled into the Roth. Rolling promptly keeps the taxable part small. Confirm fees and timing with your plan first." },
      { title: "After-tax is not Roth: don't mix them up", body: "After-tax 401(k) contributions and Roth 401(k) contributions are different buckets. Roth contributions count against your $24,500 elective deferral limit. After-tax contributions don't. They use the leftover room under the $72,000 overall limit. The money also behaves differently: Roth grows tax-free, while after-tax grows tax-deferred with taxable earnings until you roll it out. Ask your plan which bucket your contributions are actually landing in." },
      { title: "Two doors into the Roth", body: "Once the after-tax money is in, you have two ways to get it into Roth status. An in-service rollover moves it to a Roth IRA while you're still employed. An in-plan Roth rollover converts it to the Roth side of your 401(k) without leaving the plan. Some plans auto-convert after-tax contributions every paycheck, which keeps taxable growth near zero. Each path has different paperwork and timing, so ask your administrator which ones your plan allows." },
      { title: "Testing can shrink the room for high earners", body: "After-tax contributions face nondiscrimination testing, the same kind that limits how much highly paid employees can defer. If your plan fails the test, some of your after-tax money comes back to you as a taxable refund. That's one reason smaller companies often don't offer after-tax contributions at all. If you're highly compensated, ask whether the plan has passed testing in recent years before you build a strategy around it." },
    ],
    comparison: {
      caption: "Regular backdoor Roth vs mega backdoor Roth",
      headers: ["Topic", "How they compare"],
      rows: [
        ["Annual room", "Regular backdoor Roth: IRA limit ($7,500 for 2026) | Mega backdoor Roth: Leftover room under the $72,000 overall limit"],
        ["Where it lives", "Regular backdoor Roth: Traditional and Roth IRAs | Mega backdoor Roth: Your employer's 401(k) plan"],
        ["Plan permission needed", "Regular backdoor Roth: No | Mega backdoor Roth: Yes: after-tax plus in-service rollover"],
      ],
    },
    checklist: [
      "Confirm your 401(k) allows after-tax contributions.",
      "Confirm it allows in-service rollovers or distributions to a Roth.",
      "Contribute after-tax up to your remaining room under the $72,000 limit.",
      "Roll the after-tax balance to a Roth promptly to limit taxable growth.",
    ],
    faqs: [
      { q: "Does every 401(k) offer the mega backdoor?", a: "No. Your plan must allow after-tax contributions and an in-service rollover or distribution. Many large-company plans do, but smaller plans often skip these features. Ask your plan administrator directly." },
      { q: "Is the mega backdoor going away?", a: "Proposals to limit it have surfaced before, but the rules still allow it as of 2026. Tax law can change, so check the current IRS guidance each year. Do not plan decades ahead on one tactic." },
      { q: "Does my employer match after-tax contributions?", a: "Usually not. Matches are typically calculated on pre-tax or Roth elective deferrals, not after-tax contributions. Your plan document spells out the match formula, so check it before you redirect deferrals into the after-tax bucket." },
      { q: "What's the 2026 math if I'm over 50?", a: "Catch-up contributions sit on top of the $72,000 overall limit: $80,000 total with the standard $8,000 catch-up, or $83,250 if you're 60 to 63 with the $11,250 super catch-up. That raises the ceiling for after-tax contributions too." },
    ],
    sources: [
      { title: "Source: IRS 401(k) contribution limits", url: "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-401k-and-profit-sharing-plan-contribution-limits" },
      { title: "Source: IRS 401(k) plans", url: "https://www.irs.gov/retirement-plans/401k-plans" },
      { title: "IRS: Retirement Topics - Catch-Up Contributions", url: "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-catch-up-contributions" },
    ],
    related: [
      { title: "401(k) explained", href: "/wealth/401k-explained" },
      { title: "Roth IRA basics", href: "/wealth/roth-ira-explained" },
      { title: "Backdoor Roth IRA steps", href: "/guides/backdoor-roth-ira-steps" },
    ],
    query: "mega backdoor roth explained",
    opportunity: "Niche but high-intent query; most explainers are dense, so a plain-English version with the 2026 math stands out.",
    intent: "transactional",
  },
  {
    slug: "i-bonds-vs-tips",
    title: "I Bonds vs TIPS: Which Protects More?",
    description: "Series I bonds vs TIPS: how each tracks inflation, purchase limits, and tax treatment, explained in plain English. Learn more in this practical guide.",
    answer: "Series I bonds and TIPS both protect against inflation, but they work differently. I bonds pay a combined rate with a fixed component plus inflation, and you can buy up to $10,000 per year electronically. TIPS adjust their principal with inflation and are usually bought at Treasury auctions or through funds, with taxes owed each year on the inflation adjustment.",
    sections: [
      { title: "How I bonds work", body: "You buy them directly from TreasuryDirect and hold them at least 12 months. Cashing out before five years costs the last three months of interest. Interest is exempt from state and local tax, and federal tax can wait until you redeem. The rate resets every six months based on inflation." },
      { title: "How TIPS work", body: "TIPS are marketable Treasury securities whose principal rises and falls with the consumer price index. You earn a fixed coupon rate on the adjusted principal. They can be bought at auction, on the secondary market, or through mutual funds. Like all Treasuries, they are exempt from state and local income tax." },
      { title: "The tax difference", body: "I bond interest is tax-deferred until you cash them in or they mature. TIPS holders owe federal tax each year on the inflation adjustment, even though they have not received it yet. Both skip state and local tax. If you hate surprise tax bills, that annual TIPS tax matters." },
      { title: "The May and November rate resets", body: "The I bond composite rate resets every May 1 and November 1. Whatever rate is in effect when you buy sticks for your first six months, then your bond picks up the new rate. People who watch inflation data sometimes time purchases around a reset, buying before a drop is announced or waiting when a rise looks likely. Either way, the fixed-rate portion of your bond never changes for its 30-year life." },
      { title: "Paper bonds through your tax refund", body: "On top of the $10,000 electronic limit per person per year, you can buy up to $5,000 in paper I bonds with your federal tax refund using Form 8888. The bonds arrive by mail in your name. It's the only way to get paper bonds anymore, and it effectively raises one person's annual purchase ceiling to $15,000." },
      { title: "The education tax break", body: "I bond interest can be completely federal-tax-free when you use it for qualified higher education expenses, tuition and fees at eligible schools. The bonds must be in your name, not your child's, you must have been at least 24 when they were issued, and income limits apply. It's one of the few ways to make I bond interest permanently tax-free instead of just tax-deferred." },
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
      { q: "What's the minimum purchase for each?", a: "I bonds start at $25 electronically through TreasuryDirect. TIPS start at $100 at auction or through TreasuryDirect. Both are within reach for small savers. You don't need thousands to start." },
      { q: "How long do I bonds last?", a: "Thirty years. They stop earning interest at final maturity, so there's no reason to hold past that. You can cash them any time after 12 months, with a three-month interest penalty if you cash out before five years." },
    ],
    sources: [
      { title: "Source: TreasuryDirect I bonds", url: "https://www.treasurydirect.gov/savings-bonds/i-bonds/" },
      { title: "Source: TreasuryDirect home", url: "https://www.treasurydirect.gov/" },
      { title: "TreasuryDirect: TIPS", url: "https://www.treasurydirect.gov/marketable-securities/tips/" },
      { title: "IRS: About Form 8888, Allocation of Refund", url: "https://www.irs.gov/forms-pubs/about-form-8888" },
    ],
    related: [
      { title: "Emergency fund estimate", href: "/tools/emergency-fund" },
      { title: "Emergency fund guide", href: "/wealth/emergency-fund-guide" },
      { title: "Compound interest calculator", href: "/tools/compound-interest" },
      { title: "HYSA vs money market account", href: "/guides/hysa-vs-money-market-account" },
    ],
    query: "i bonds vs tips",
    opportunity: "Steady evergreen query; TreasuryDirect pages are official but dry, leaving room for a clear side-by-side comparison.",
    intent: "transactional",
  },
  {
    slug: "hysa-vs-money-market-account",
    title: "HYSA vs Money Market Account",
    description: "High-yield savings vs money market accounts: FDIC insurance, liquidity, and how rates work, compared side by side. Learn more in this practical guide.",
    answer: "Both are safe, liquid places to park cash, and both carry FDIC insurance up to $250,000 per depositor per bank. A high-yield savings account is built for saving, with a variable rate and easy transfers. A money market account often adds check-writing and a debit card, which suits cash you touch more often.",
    sections: [
      { title: "What they share", body: "Each is offered by a bank or credit union and pays a variable interest rate. Each is insured up to $250,000 per depositor per insured bank when held at an FDIC member bank. Rates on both tend to move with the broader interest-rate environment. Neither is an investment account, and neither buys stocks." },
      { title: "Where they differ", body: "Money market accounts usually offer check-writing or a debit card, while savings accounts usually do not. High-yield savings accounts sometimes pay slightly higher rates because they are simpler to run. Either way, compare the actual rate, not the account label. Fees and minimums vary by bank, so read the fine print." },
      { title: "How to choose", body: "Pick the savings account if the money is for a goal you rarely touch. Pick the money market account if you want to write the occasional check from it. Splitting across two banks keeps you under the $250,000 insurance limit if your balance is large. Rate-shop once or twice a year, since rates drift." },
      { title: "A money market fund is a different product entirely", body: "The similar name confuses everyone. A money market account is a bank deposit, covered by FDIC insurance up to the limit. A money market fund is a mutual fund, an investment product, and FDIC insurance does not cover investments. Funds aim to hold a $1 share price, but they can lose money. If the word fund is in the name, it's the investment version, not the bank account." },
      { title: "Ownership categories stretch the $250,000", body: "FDIC insurance is per depositor, per insured bank, per ownership category. Your single accounts are one category. Joint accounts are another. A couple with $250,000 in individual accounts plus a $500,000 joint account can be fully covered at one bank because the categories are insured separately. The FDIC's online estimator walks through your exact setup before you move money." },
      { title: "Sweep accounts: follow the deposit", body: "Some fintech apps and brokerages sweep your cash to partner banks behind the scenes. FDIC insurance applies at the bank actually holding the deposit, and pass-through coverage has conditions the app has to meet. Before you park serious money somewhere new, confirm which bank holds it and verify that bank on the FDIC's BankFind tool. The brand on the app isn't what the insurance follows." },
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
      { q: "Are online-only banks FDIC-insured?", a: "Many are, but check. Use the FDIC's BankFind tool and confirm the bank's name, not just the app's brand. Some fintech apps sweep your cash to partner banks, so make sure you know whose name is on the insurance." },
      { q: "Does FDIC insurance cover the interest I've earned?", a: "Yes. Coverage includes both principal and accrued interest, up to the $250,000 limit per depositor per ownership category. If your balance plus earned interest pushes past the limit, the excess isn't covered." },
    ],
    sources: [
      { title: "Source: FDIC deposit insurance", url: "https://www.fdic.gov/resources/deposit-insurance/" },
      { title: "Source: FDIC home", url: "https://www.fdic.gov/" },
    ],
    related: [
      { title: "CD or savings questions", href: "/tools/cd-or-savings-quiz" },
      { title: "Emergency fund guide", href: "/wealth/emergency-fund-guide" },
      { title: "Compound interest calculator", href: "/tools/compound-interest" },
      { title: "CD or savings quiz", href: "/tools/cd-or-savings-quiz" },
    ],
    query: "hysa vs money market account",
    opportunity: "High-volume comparison query; bank pages push products, so a neutral FDIC-grounded guide can earn the click.",
    intent: "transactional",
  },
  {
    slug: "credit-utilization-explained",
    title: "Credit Utilization Ratio Explained",
    description: "What your credit utilization ratio is, why the 30% guideline matters, and how fast it changes your score. Explore the steps in Christian Brinkley's guide.",
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
      { title: "Hard vs soft inquiries", href: "/guides/hard-inquiry-vs-soft-inquiry" },
    ],
    query: "credit utilization explained",
    opportunity: "Huge search volume and lots of thin content; a precise explanation of per-card vs overall utilization can rank.",
    intent: "informational",
  },

  {
    slug: "401k-early-withdrawal-exceptions",
    title: "Early withdrawal 401k exceptions",
    metaTitle: "Early Withdrawal 401k Exceptions: Rules and Taxes",
    description:
      "Review early withdrawal 401k exceptions, the rule of 55, hardship limits, and Roth 401k treatment. Check when the 10% tax differs from ordinary income tax.",
    answer:
      "A 401(k) withdrawal before age 59½ can trigger income tax and an additional 10% tax, unless an exception applies. A penalty exception doesn't automatically make the withdrawal tax-free or require your employer's plan to release the money.",
    sections: [
      {
        title: "Common exceptions and their limits",
        body: "The table below lists the dollar limits for the exceptions people ask about most. The figures come from the current IRS exceptions chart. An exception removes the 10% additional tax, not the income tax, and your plan still has to allow the distribution. Check the current IRS chart for account type, limits, dates, and documentation.",
      },
      {
        title: "The rule of 55 uses the calendar year",
        body: "The general separation exception applies when you leave during or after the year you turn 55. Leaving at age 54 can meet the age-year requirement if you turn 55 in that same calendar year. Leaving in an earlier calendar year doesn't become eligible merely because you later reach 55. Rolling that plan into an IRA can change which exceptions are available. Certain public-safety workers have different rules. Source: IRS Publication 575.",
      },
      {
        title: "A hardship withdrawal isn't automatically penalty-free",
        body: "Hardship rules can permit access. A separate exception determines whether the additional tax is waived. A hardship withdrawal lets the plan release the money. It does not by itself remove the 10 percent additional tax. A plan loan is also different from a distribution and depends on the plan allowing loans and the loan meeting its rules. Source: IRS hardships, withdrawals, and loans.",
      },
      {
        title: "Roth 401(k) isn't Roth IRA contribution ordering",
        body: "A nonqualified Roth 401(k) distribution generally contains a proportional share of contributions and earnings. Don't assume you can take contributions first under the Roth IRA ordering rules. The taxable earnings portion can also face the additional tax unless an exception applies. Source: IRS designated Roth account FAQs.",
      },
      {
        title: "Before requesting money",
        body: "Identify the account, ask the plan administrator whether the distribution is allowed, and have a tax professional check the exception and reporting. Compare the effect on current taxes and retirement assets. Don't roll over or withdraw solely on the assumption that two retirement accounts have identical rules.",
      },
      {
        title: "Substantially equal payments are a continuing commitment",
        body: "A qualifying substantially equal periodic payment schedule generally must continue until the later of five years or age 59½. Employer-plan payments have additional conditions, including separation from service. An impermissible change can trigger additional tax and interest on prior payments. This is different from a one-time hardship withdrawal. Have a qualified tax professional check the schedule before the first payment and before making later changes.",
      },
    ],
    comparison: {
      caption: "401k early withdrawal exceptions and their limits",
      headers: ["Situation", "The limit"],
      rows: [
        [
          "Birth or adoption",
          "Up to $5,000 per birth or adoption, from a qualifying plan",
        ],
        [
          "Emergency personal expense",
          "Up to $1,000, one distribution per calendar year",
        ],
        [
          "Domestic abuse victim distribution",
          "The lesser of $10,000 or 50 percent of the vested balance. The $10,000 figure is indexed for inflation, so confirm the current amount on the IRS chart",
        ],
        [
          "Terminal illness",
          "No dollar cap stated. Requires physician certification",
        ],
        [
          "Qualified disaster recovery distribution",
          "Up to $22,000, for a federally declared disaster where you live",
        ],
        [
          "Separation from service in or after the year you turn 55",
          "The rule of 55, covered in its own section below. No fixed dollar amount",
        ],
        [
          "Substantially equal periodic payments",
          "No fixed dollar amount. The schedule must run until the later of 5 years or age 59 and a half",
        ],
      ],
    },
    checklist: [
      "Identify whether the account is a workplace plan or an IRA.",
      "Ask the plan administrator whether the distribution is permitted.",
      "Check the IRS exception for that account type and distribution date.",
      "Confirm income tax, additional tax, and reporting with a tax professional.",
      "Keep the plan documents and evidence supporting the exception.",
    ],
    faqs: [
      {
        q: "Does hardship eliminate the 10% additional tax?",
        a: "Not automatically. It can permit access without meeting a tax exception.",
      },
      {
        q: "Can education or a first home qualify for a 401(k) exception?",
        a: "The commonly cited education and first-home exceptions apply to IRAs, not generally to 401(k) distributions.",
      },
      {
        q: "Can I take Roth 401(k) contributions first?",
        a: "Don't apply Roth IRA ordering rules. A nonqualified Roth 401(k) distribution generally includes contributions and earnings proportionally.",
      },
      {
        q: "How much can I withdraw penalty-free for a birth or adoption?",
        a: "Up to $5,000 per birth or adoption from a qualifying plan, if the plan allows it. Income tax can still apply. Verify the current rule on the IRS exceptions chart before withdrawing.",
      },
      {
        q: "What is the rule of 55?",
        a: "If you leave your employer during or after the year you turn 55, distributions from that employer's plan may avoid the 10% additional tax. Rolling the money into an IRA can remove that option, so check before you roll over.",
      },
    ],
    sources: [
      {
        title: "current IRS chart",
        url: "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-exceptions-to-tax-on-early-distributions",
      },
      {
        title: "IRS Publication 575",
        url: "https://www.irs.gov/publications/p575",
      },
      {
        title: "IRS hardships, withdrawals, and loans",
        url: "https://www.irs.gov/retirement-plans/hardships-early-withdrawals-and-loans",
      },
      {
        title: "IRS designated Roth account FAQs",
        url: "https://www.irs.gov/retirement-plans/retirement-plans-faqs-on-designated-roth-accounts",
      },
      {
        title: "IRS: Substantially equal periodic payments",
        url: "https://www.irs.gov/retirement-plans/substantially-equal-periodic-payments",
      },
    ],
    related: [
      {
        title: "72(t) exceptions across retirement account types",
        href: "/guides/72t-exceptions",
      },
      {
        title: "Roth ladder timing and taxes",
        href: "/guides/roth-conversion-ladder-explained",
      },
      {
        title: "How a 401(k) works",
        href: "/wealth/401k-explained",
      },
    ],
    query: "early withdrawal 401k exceptions",
    opportunity:
      "Clarify the actual rules, answer directly, and link readers to primary sources. Ranking improvement remains uncertain.",
    intent: "informational",
    datePublished: "2026-10-08",
    dateModified: "2026-11-07",
  },
  {
    slug: "roth-ira-five-year-rule",
    title: "Roth IRA 5-Year Rule Explained",
    description: "How the Roth IRA 5-year rules work: the contributions clock, the conversion clock, and when earnings come out tax-free. Explore the plain-English guide.",
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
      { title: "Backdoor Roth IRA steps", href: "/guides/backdoor-roth-ira-steps" },
    ],
    query: "roth ira five year rule",
    opportunity: "Confusing topic with scattered answers; one page covering both clocks and their interaction can own the query.",
    intent: "informational",
  },
  {
    slug: "social-security-62-vs-70",
    title: "Social Security: Claim at 62 or 70?",
    description: "Claiming Social Security at 62 vs 70: how benefits shrink or grow, and how to think about the break-even point. Explore the steps in Christian Brinkley's guide.",
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
      { title: "Working while collecting Social Security", href: "/guides/working-while-collecting-social-security" },
    ],
    query: "social security 62 vs 70",
    opportunity: "One of the biggest retirement queries; SSA pages are factual but a clear 62-vs-70 framing with break-even math wins.",
    intent: "informational",
  },
  {
    slug: "roth-ira-mistakes-to-avoid",
    title: "7 Roth IRA Mistakes That Cost Real Money",
    description: "The seven Roth IRA mistakes that drain your retirement money, from income limits to the 5-year rule. Read this plain-English guide from Christian Brinkley.",
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
    description: "Five common HSA mistakes, from contributing on Medicare to overfunding, and how to fix each one. Read this plain-English guide from Christian Brinkley.",
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
    description: "Six deductions side hustlers leave on the table every year, from the home office to retirement savings. Explore the steps in Christian Brinkley's guide.",
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
    description: "Five 401(k) mistakes that quietly shrink your retirement, from skipping the match to cashing out. Read this plain-English guide from Christian Brinkley.",
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
    description: "Seven first-time tax filing mistakes that delay refunds or cost money, and the simple fix for each. Read this plain-English guide from Christian Brinkley.",
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
  {
    slug: "child-tax-credit-2026",
    title: "Child Tax Credit 2026: The $2,200 Rules, Explained",
    description:
      "What the 2026 Child Tax Credit is worth, who counts as a qualifying child, the income limits, and how the refundable part works. Read the details here.",
    query: "child tax credit 2026 how much per child who qualifies",
    opportunity:
      "NerdWallet, Bankrate, and IRS pages dominate this high-volume family-tax query. No site coverage exists. A plain-English 2026 guide built around the $2,200 amount, the new parent-SSN rule, and the refund math fills the gap.",
    intent: "informational",
    answer:
      "For 2026, the Child Tax Credit is worth up to $2,200 per qualifying child under age 17. The full credit starts phasing out above $200,000 of modified adjusted gross income, or $400,000 on a joint return. Up to $1,700 can come back as a refund through the Additional Child Tax Credit.",
    sections: [
      {
        title: "What changed for 2026",
        body: "The One, Big, Beautiful Bill made the Child Tax Credit permanent at $2,200 per qualifying child, up from $2,000, and tied it to inflation starting with the 2026 tax year. The refundable portion, called the Additional Child Tax Credit, goes up to $1,700 per child. There is no monthly advance payment; the credit is claimed once a year on your tax return.",
      },
      {
        title: "Who counts as a qualifying child",
        body: "The child must be under 17 at the end of the tax year, and must be your son, daughter, stepchild, foster child, sibling, or a descendant of one of them. The child must live with you for more than half the year, not provide more than half of their own support, be claimed as your dependent, and be a U.S. citizen, national, or resident alien with a valid Social Security number issued before your return's due date.",
      },
      {
        title: "The income limits",
        body: "You get the full credit with modified adjusted gross income up to $200,000, or $400,000 if you file jointly. Above that, the credit shrinks by $50 for each $1,000 of extra income. Higher earners can still end up with a partial credit before it disappears completely.",
      },
      {
        title: "The refundable part",
        body: "The Child Tax Credit first wipes out your tax bill. If anything is left over, the Additional Child Tax Credit can refund up to $1,700 of it per child, but you need more than $2,500 of earned income. The refund equals 15 percent of your earned income above $2,500, up to the cap, so very low earners get a smaller amount.",
      },
      {
        title: "The parent Social Security number rule",
        body: "Starting with 2025 returns, the taxpayer claiming the credit, or at least one spouse on a joint return, must have a valid Social Security number issued before the return's due date. Filing with an ITIN on the filer line disqualifies the whole credit, even when the child has an SSN.",
      },
    ],
    comparison: {
      caption: "Which credit fits the dependent",
      headers: ["Dependent", "Credit available"],
      rows: [
        ["Qualifying child under 17", "Child Tax Credit, up to $2,200"],
        ["Dependent 17 or older, or another relative", "Credit for Other Dependents, up to $500"],
        ["Qualifying child but little or no tax owed", "Additional Child Tax Credit, up to $1,700 refund"],
        ["Child without a valid SSN", "No Child Tax Credit; check the Credit for Other Dependents"],
      ],
    },
    checklist: [
      "Confirm each child is under 17 at the end of the tax year.",
      "Make sure every SSN, yours and each child's, is valid and issued before the filing due date.",
      "Check your modified adjusted gross income against the $200,000 or $400,000 phaseout.",
      "If you owe little tax, confirm you have more than $2,500 of earned income for the refundable part.",
      "Claim the credit on Form 1040 with Schedule 8812.",
    ],
    faqs: [
      {
        q: "Can I get the Child Tax Credit if I owe no tax?",
        a: "You cannot get the nonrefundable part without a tax bill, but you may get the Additional Child Tax Credit as a refund, up to $1,700 per child, if you have more than $2,500 of earned income.",
      },
      {
        q: "Does a 17-year-old qualify?",
        a: "No. The child must be under 17 at the end of the tax year. An older teen may qualify you for the Credit for Other Dependents, worth up to $500.",
      },
      {
        q: "What if my spouse and I file separately?",
        a: "You can still claim the credit, but the phaseout starts at $200,000 of modified adjusted gross income. The $400,000 joint-return threshold does not apply.",
      },
    ],
    sources: [
      {
        title: "IRS: Tax credits for individuals",
        url: "https://www.irs.gov/newsroom/tax-credits-for-individuals",
      },
      {
        title: "IRS: Does my child qualify for the Child Tax Credit?",
        url: "https://www.irs.gov/help/ita/does-my-childdependent-qualify-for-the-child-tax-credit-or-the-credit-for-other-dependents",
      },
      {
        title: "IRS: How to avoid Child Tax Credit errors",
        url: "https://www.irs.gov/tax-professionals/eitc-central/how-to-avoid-child-tax-credit-errors",
      },
    ],
    related: [
      { title: "Your first tax return, start to finish", href: "/wealth/first-tax-return-guide" },
      { title: "Tax brackets explained plainly", href: "/wealth/tax-brackets-explained-plainly" },
      { title: "Teen tax return as a dependent", href: "/guides/teen-tax-return-dependent" },
    ],
  },
  {
    slug: "sep-ira-vs-solo-401k",
    title: "SEP IRA vs Solo 401(k): 2026 Limits Compared",
    description:
      "SEP IRA or solo 401(k)? Compare the 2026 contribution limits, catch-up rules, and deadlines, then see which plan lets a one-person business save more.",
    query: "sep ira vs solo 401k which is better self employed 2026 limits",
    opportunity:
      "Investopedia, NerdWallet, and Bankrate all rank for this freelancer query with 2026 limit tables. No site coverage exists. A plain-English comparison with verified 2026 numbers fits the side-hustle and tax clusters.",
    intent: "informational",
    answer:
      "For an owner-only business, a solo 401(k) usually wins because it adds a $24,500 employee deferral for 2026 on top of the employer share. A SEP IRA only allows employer contributions. Both plans cap total additions at $72,000 for 2026.",
    sections: [
      {
        title: "The one structural difference",
        body: "A SEP IRA has a single contribution lane: employer money only, capped at 25% of compensation, which works out to about 20% of net self-employment earnings after the deductible half of self-employment tax. A solo 401(k) has the same employer lane plus an employee lane: the $24,500 elective deferral for 2026. That extra lane is why the solo 401(k) shelters more at the same income.",
      },
      {
        title: "2026 limits, line by line",
        body: "Employee deferral: $24,500, solo 401(k) only, and no deferral exists for a SEP. Age-50 catch-up: $8,000, solo 401(k) only. Super catch-up for ages 60 through 63: $11,250, solo 401(k) only. Total annual additions: $72,000 under both plans. Compensation that can count: up to $360,000. A SEP IRA has no deferral and no catch-up at any age.",
      },
      {
        title: "Where the solo 401(k) pulls ahead",
        body: "Take a freelancer with about $100,000 of net self-employment income. A SEP IRA allows roughly the employer share, about $18,500. A solo 401(k) allows the same employer share plus the full $24,500 deferral, about $43,000 combined. The gap closes only at very high incomes, where 25% of compensation reaches the $72,000 cap on its own.",
      },
      {
        title: "The tradeoffs that come with the solo 401(k)",
        body: "A solo 401(k) can allow loans up to 50% of the balance or $50,000, and it supports Roth contributions. But it is only for businesses with no employees other than the owner and a spouse; hire someone and the plan has to change. If plan assets pass $250,000, you file Form 5500-EZ each year. A SEP IRA is simpler to open and run, which is its main selling point.",
      },
      {
        title: "Deadlines and the fine print",
        body: "A SEP IRA can be set up and funded as late as your tax return due date, including extensions. A solo 401(k) involves more setup, usually needs an employer identification number, and the employee deferral election has its own timing rules. Because self-employment math and deadlines bite, run your exact number through IRS Publication 560 or a qualified tax pro before you file.",
      },
    ],
    comparison: {
      caption: "SEP IRA vs solo 401(k), 2026 rules",
      headers: ["Feature", "How they compare"],
      rows: [
        ["Employee deferral", "None with a SEP IRA; $24,500 with a solo 401(k)"],
        ["Catch-up at 50+", "None with a SEP IRA; $8,000 with a solo 401(k)"],
        ["Catch-up at 60 to 63", "None with a SEP IRA; $11,250 with a solo 401(k)"],
        ["Total additions, 2026", "$72,000 under both plans"],
        ["Loans", "Not allowed from a SEP IRA; allowed if the solo 401(k) plan permits"],
        ["Employees", "SEP can cover employees; solo 401(k) is owner and spouse only"],
      ],
    },
    checklist: [
      "Confirm your business has no employees other than you and your spouse before choosing a solo 401(k).",
      "Use IRS Publication 560 to compute your real employer-share percentage.",
      "Make the employee deferral election on time if you use a solo 401(k).",
      "Do not count on catching up with a SEP IRA after 50; it has no catch-up lane.",
      "File Form 5500-EZ once a solo 401(k) passes $250,000 in assets.",
    ],
    faqs: [
      {
        q: "Can I have a SEP IRA and a solo 401(k) at the same time?",
        a: "Yes, but the totals still share the $72,000 annual additions limit per employer, and the employer pieces share the 25% compensation limit. Talk to a tax pro before splitting contributions.",
      },
      {
        q: "Can I contribute if my W-2 job already maxes my 401(k)?",
        a: "Your $24,500 employee deferral limit is per person across all 401(k) plans, so a maxed-out W-2 deferral leaves only the employer lane open for your solo plan.",
      },
      {
        q: "Which is easier to open?",
        a: "A SEP IRA. It takes minutes at most brokerages with almost no paperwork. A solo 401(k) needs a plan document and usually an EIN, plus ongoing attention once assets grow.",
      },
    ],
    sources: [
      {
        title: "IRS: One-participant 401(k) plans",
        url: "https://www.irs.gov/retirement-plans/one-participant-401k-plans",
      },
      {
        title: "IRS: SEP contribution limits",
        url: "https://www.irs.gov/retirement-plans/plan-participant-employee/sep-contribution-limits-including-grandfathered-sarseps",
      },
    ],
    related: [
      { title: "Side-hustle taxes, explained in plain English", href: "/wealth/side-hustle-taxes" },
      { title: "Estimated quarterly taxes, explained", href: "/guides/estimated-quarterly-taxes-guide" },
      { title: "Your 401(k), explained", href: "/wealth/401k-explained" },
    ],
  },
  {
    slug: "social-security-survivor-benefits",
    title: "Survivor Benefits: Who Qualifies and What You Get",
    description:
      "Widow and widower benefits, surviving children, and dependent parents: the eligibility rules, benefit percentages, and the $255 lump-sum payment. Read on.",
    query: "social security survivor benefits widow how much age 60",
    opportunity:
      "High-volume SSA query dominated by federal and publisher pages. The site's retirement cluster covers claiming age and taxation but not survivors. A plain-English who-qualifies guide closes the gap.",
    intent: "informational",
    answer:
      "A surviving spouse can collect up to 100% of the deceased worker's benefit at full retirement age, reduced to 71.5% if claimed at 60. Surviving children can get up to 75%. SSA generally pays from the date you apply, so apply promptly.",
    sections: [
      {
        title: "Who can qualify",
        body: "A widow or widower age 60 or older, or 50 to 59 with a disability, who was married at least 9 months and has not remarried before 60, or before 50 if disabled. A surviving ex-spouse qualifies with a 10-year marriage. Children qualify if they are under 18, or 18 to 19 and in school full time, or disabled before age 22. Dependent parents qualify at 62 or older if they received at least half their support from the worker.",
      },
      {
        title: "What each person receives",
        body: "A surviving spouse at full retirement age gets up to 100% of the worker's benefit; at 60 it is 71.5%, and the reduction is permanent. A spouse caring for the worker's child under 16 gets 75% at any age. Each eligible child gets up to 75%. One surviving dependent parent gets up to 82.5%; two get up to 75% each. A family maximum of 150% to 180% of the worker's benefit can trim individual shares. There is also a one-time $255 lump-sum death payment.",
      },
      {
        title: "Why claiming age changes the check",
        body: "Survivor benefits grow the longer you wait, from 71.5% at age 60 to 100% at full retirement age. If the worker claimed early, special rules set a floor under the survivor amount. You receive one benefit, the higher of your own or the survivor's, not both stacked together. SSA runs the exact math when you apply.",
      },
      {
        title: "How to apply without losing months",
        body: "Call SSA at 1-800-772-1213 or visit a local office; survivor applications cannot be completed online. Have proof of death, marriage and birth certificates, and both Social Security numbers ready. SSA accepts that you may not have every document yet, so file first and let them help you gather the rest.",
      },
    ],
    comparison: {
      caption: "Survivor benefit amounts as a share of the worker's benefit",
      headers: ["Who receives it", "Share"],
      rows: [
        ["Surviving spouse at full retirement age", "Up to 100%"],
        ["Surviving spouse at age 60", "71.5%"],
        ["Disabled widow or widower, 50 to 59", "71.5%"],
        ["Spouse caring for the worker's young child", "75%"],
        ["Each eligible child", "Up to 75%"],
        ["One dependent parent, 62+", "Up to 82.5%"],
        ["Two dependent parents, 62+", "Up to 75% each"],
      ],
    },
    checklist: [
      "Apply as soon as you can; some benefits start from the application date.",
      "Gather proof of death, the marriage certificate, and birth certificates.",
      "Bring both Social Security numbers and last year's W-2 or tax return.",
      "Ask SSA to compare your own benefit against the survivor benefit.",
      "Report the death to SSA even if the funeral home already did.",
    ],
    faqs: [
      {
        q: "Can I get my own retirement benefit and survivor benefits together?",
        a: "SSA pays the higher of the two, not both stacked. Many survivors take one early and switch to the larger one later.",
      },
      {
        q: "What happens if I remarry?",
        a: "Remarrying before 60, or before 50 if disabled, generally ends survivor eligibility. Remarrying at 60 or later does not.",
      },
      {
        q: "Does working reduce survivor benefits?",
        a: "The earnings test can reduce benefits if you are under full retirement age and earn over the annual limit. SSA withholds part of the check, and the withheld money is credited back later.",
      },
    ],
    sources: [
      {
        title: "SSA: Survivors benefits",
        url: "https://www.SSA.gov/marketing/assets/materials/EN-05-10402.pdf",
      },
      {
        title: "SSA: Apply for widow's or widower's benefits",
        url: "https://www.ssa.gov/forms/ssa-10.html?embedded_webview=true",
      },
    ],
    related: [
      { title: "Social Security, explained in plain English", href: "/wealth/social-security-explained" },
      { title: "Social Security at 62 vs 70", href: "/guides/social-security-62-vs-70" },
      { title: "Working while collecting Social Security", href: "/guides/working-while-collecting-social-security" },
    ],
  },
  {
    slug: "hard-inquiry-vs-soft-inquiry",
    title: "Hard Inquiry vs Soft Inquiry: What Each Does to Your Score",
    description:
      "A hard inquiry can dent your score when you apply for credit. Checking your own credit never does. See which pulls count and how to handle a strange one.",
    query: "hard inquiry vs soft inquiry does checking credit hurt score",
    opportunity:
      "Massive beginner-credit query owned by the bureaus and big publishers. The site's credit cluster covers scores, utilization, and cards but not inquiries. A CFPB-cited explainer fits the gap.",
    intent: "informational",
    answer:
      "A hard inquiry happens when you apply for credit and can temporarily lower your score. A soft inquiry, like checking your own credit or prequalifying for a card, never affects your score.",
    sections: [
      {
        title: "The one-line difference",
        body: "A hard inquiry is a lender pulling your full credit file to decide whether to lend to you. It can shave a few points off your score for a while. A soft inquiry is a look at your file that decides nothing: you checking your own score, a prequalification, an employer background check, or your own card company reviewing your account.",
      },
      {
        title: "What counts as which",
        body: "Hard: applying for a credit card, mortgage, auto loan, or student loan, and sometimes an apartment application. Soft: checking your own report or score, prequalifying without applying, promotional offers, and account reviews by lenders you already have.",
      },
      {
        title: "How long they stick around",
        body: "A hard inquiry stays on your credit report for up to two years, though scoring models weigh recent activity most and the effect fades with time. Soft inquiries show on the copy you pull for yourself, but other lenders cannot see them and scores ignore them.",
      },
      {
        title: "What to do about an unfamiliar inquiry",
        body: "First check the date and company name, then think about anything you applied for around then. If you still do not recognize it, contact the company listed. If it was not authorized, dispute it with the credit bureau that shows it. Unauthorized inquiries can be a sign of identity theft, and you can place a fraud alert or freeze while you sort it out.",
      },
    ],
    comparison: {
      caption: "Hard vs soft inquiry, side by side",
      headers: ["Hard inquiry", "Soft inquiry"],
      rows: [
        ["Applying for credit triggers it", "Checking your own credit, prequalifying, or account reviews"],
        ["Can lower your score temporarily", "Never affects your score"],
        ["Other lenders can see it", "Only you can see it on your own copy"],
        ["Stays on your report up to two years", "Scores ignore it entirely"],
      ],
    },
    checklist: [
      "Prequalify with a soft pull before you apply.",
      "Group rate-shopping applications close together.",
      "Pull your own reports free each week to see every inquiry.",
      "Dispute any inquiry you did not authorize.",
      "Remember that checking your own score never hurts it.",
    ],
    faqs: [
      {
        q: "Does checking my own credit score lower it?",
        a: "No. Checking your own credit is always a soft inquiry and never affects your score, no matter how often you look.",
      },
      {
        q: "How many points does a hard inquiry cost?",
        a: "Usually just a few, and the effect is temporary. Inquiries matter more when your file is thin or you apply for several kinds of credit at once.",
      },
      {
        q: "Can I get a hard inquiry removed?",
        a: "Only if it was unauthorized or an error. A legitimate inquiry from an application you approved stays until it ages off, up to two years.",
      },
    ],
    sources: [
      {
        title: "CFPB: When can a credit card company look at my credit reports?",
        url: "https://www.consumerfinance.gov/ask-cfpb/when-can-a-credit-card-company-look-at-my-credit-reports-en-3/?ref=theupturn.org",
      },
      {
        title: "CFPB: Credit reports and scores",
        url: "https://www.consumerfinance.gov/consumer-tools/credit-reports-and-scores/",
      },
    ],
    related: [
      { title: "Credit scores, explained plainly", href: "/wealth/credit-score-basics" },
      { title: "Credit cards for beginners", href: "/wealth/credit-cards-beginners" },
      { title: "Credit utilization, explained", href: "/guides/credit-utilization-explained" },
    ],
  },
  {
    slug: "medicare-dual-eligible-snp-triad",
    title: "Dual Eligible in the Triad? What a D-SNP Does for You",
    description:
      "Have both Medicare and Medicaid in Greensboro, High Point, or Winston-Salem? See what Dual Special Needs Plans cover and when you can enroll. Read on.",
    scope: "medicare",
    query: "dual eligible special needs plan greensboro nc medicare medicaid",
    opportunity:
      "D-SNP queries spike every AEP. National carriers and NC brokers rank; the site has no D-SNP coverage despite deep Medicare content. A Triad-framed guide captures the local dual-eligible search during enrollment season.",
    intent: "informational",
    answer:
      "Dual Special Needs Plans are Medicare Advantage plans built for people who have both Medicare and Medicaid. They coordinate your Medicare and Medicaid benefits under one plan and include prescription drug coverage. If you live in the Triad, compare the options available at your home address.",
    sections: [
      {
        title: "What dual eligible means",
        body: "You have Medicare and full Medicaid at the same time. Medicare pays first for Medicare-covered services, and Medicaid pays last, after Medicare and any other insurance you have. Your prescription drug coverage comes through Medicare, not Medicaid. In North Carolina, you can check your Medicaid status with your county Department of Social Services. Full dual eligible and partial dual eligible are different categories; the answer to what dual eligible means explains the difference.",
      },
      {
        title: "What a D-SNP actually is",
        body: "A Special Needs Plan is a Medicare Advantage plan tailored to a specific group. The dual-eligible kind, a D-SNP, serves people with both Medicare and Medicaid. Like all Medicare Advantage plans it covers your Part A and Part B benefits, and every SNP includes Part D drug coverage. SNPs add care coordination and benefits shaped for their members. They come as HMO or PPO plan types, and they are not offered in every area, so availability depends on your address.",
      },
      {
        title: "When you can enroll or switch",
        body: "Annual Enrollment runs October 15 through December 7 each year. Dual-eligible enrollment rules changed in 2025, so if you remember the old quarterly switch window, check the current rules before assuming it still works. Having Medicaid also gives you more chances to join or switch plans during the year than Medicare alone does.",
      },
      {
        title: "The Triad check before you choose",
        body: "Confirm any plan serves your home address in Greensboro, High Point, Winston-Salem, or your town. Check that your doctors and pharmacy are in the network. Bring your Medicare and Medicaid cards to the conversation. A local licensed agent can compare the D-SNPs available at your address during Annual Enrollment and year-round.",
      },
    ],
    comparison: {
      caption: "Your coverage paths as a dual eligible",
      headers: ["Option", "What it does"],
      rows: [
        ["Dual Special Needs Plan", "One Medicare Advantage plan coordinates Medicare and Medicaid, with drug coverage included"],
        ["Original Medicare plus Medicaid", "Medicare pays first, Medicaid last; drugs through a separate Medicare drug plan"],
        ["Medicare-Medicaid Plan", "Available only in some states; coordinates both programs under one plan"],
      ],
    },
    checklist: [
      "Confirm you have both Medicare Parts A and B and full Medicaid.",
      "Check which D-SNPs serve your home address in the Triad.",
      "Confirm your doctors and pharmacy are in the plan's network.",
      "Bring both your Medicare and Medicaid cards to enrollment.",
      "Review your plan every Annual Enrollment, October 15 to December 7.",
    ],
    faqs: [
      {
        q: "Does a D-SNP cost extra?",
        a: "Plan premiums vary by area and plan. Many D-SNPs charge no premium, but confirm the details for your address before enrolling.",
      },
      {
        q: "Will joining a D-SNP affect my Medicaid?",
        a: "No. D-SNPs contract with your state Medicaid program to coordinate benefits. Joining one does not cancel your Medicaid.",
      },
      {
        q: "Can I change plans outside Annual Enrollment?",
        a: "People with Medicaid get more chances to join or switch plans during the year. The exact windows changed in 2025, so check the current rules or ask a local agent.",
      },
    ],
    sources: [
      {
        title: "Medicare: Special Needs Plans",
        url: "https://www.medicare.gov/health-drug-plans/health-plans/your-health-plan-options/SNP",
      },
      {
        title: "Medicare: Medicaid",
        url: "https://www.medicare.gov/basics/costs/help/medicaid",
      },
      {
        title: "Medicare: Health plans that lower costs",
        url: "https://www.medicare.gov/basics/costs/help/medicare-lower-costs",
      },
    ],
    related: [
      { title: "What dual eligible means", href: "/answers/what-does-it-mean-to-be-dual-eligible-for-medicare-and-medicaid" },
      { title: "Medicare Annual Enrollment", href: "/aep" },
      { title: "When your Medicare plan is not renewing", href: "/guides/medicare-plan-not-renewing-triad" },
      { title: "Medicare help in the Triad", href: "/medicare" },
    ],
  },

  {
    slug: "medicare-part-b-giveback-plans",
    title: "Medicare Part B giveback plans: how they work",
    metaTitle: "Medicare Part B Giveback Plans: What to Check",
    description:
      "See how Medicare Part B giveback plans work, who can use the benefit, and how to check doctors, prescriptions, payment timing, and the full cost of a plan.",
    answer:
      "Medicare Part B giveback plans are Medicare Advantage plans that pay part or all of your Part B premium. The benefit depends on the specific plan and where you live, so a number in an advertisement may not apply to you.",
    sections: [
      {
        title: "How you receive the reduction",
        body: "If your Part B premium comes out of your Social Security payment, the reduction generally lowers that deduction. If you pay Medicare directly, it generally appears as a credit or a smaller premium bill. It isn't a separate government cash payment. Processing can take time, so keep paying the amount on your bill until it changes. Ask the plan how it handles any adjustment for earlier eligible months.",
      },
      {
        title: "Who can use the benefit",
        body: "You need Medicare Parts A and B and must join a Medicare Advantage plan offering the benefit in your service area. If Medicaid or another program pays your Part B premium, ask how that affects the benefit. A giveback and a Medicare Savings Program aren't the same thing. Medicare explains programs that help with costs.",
      },
      {
        title: "Find the amount for your address",
        body: "Enter your ZIP code and correct county in Medicare Plan Compare. Choose the coverage year and open the plan details. Look for a Part B premium reduction, then verify it in the plan's Summary of Benefits or Evidence of Coverage. Check again each year. Don't assume a neighbor's amount applies to you.",
      },
    ],
    comparison: {
      caption: "Compare the whole plan",
      headers: ["Check", "What to confirm"],
      rows: [
        ["Premium reduction", "The amount for the exact plan and coverage year"],
        ["Doctors and hospitals", "Each provider's participation in that plan"],
        ["Prescriptions", "Whether drug coverage is included, plus your drugs and pharmacy"],
        ["Medical costs", "Deductibles, copays, coinsurance, and the medical out-of-pocket limit"],
        ["Other coverage", "How joining affects employer, retiree, or military benefits"],
      ],
    },
    checklist: [
      "Confirm Parts A and B and your county of residence.",
      "Choose the correct coverage year in Medicare Plan Compare.",
      "Verify the exact reduction in the plan documents.",
      "Check doctors, hospitals, each medicine, and pharmacy.",
      "Compare medical cost sharing and the out-of-pocket limit.",
      "Ask how direct billing or premium assistance affects the benefit.",
    ],
    faqs: [
      {
        q: "Do I receive a separate giveback check?",
        a: "Usually the benefit reduces your Part B premium deduction or bill. Ask the plan about processing and adjustments.",
      },
      {
        q: "Does Medigap offer this benefit?",
        a: "A Part B giveback is a feature of certain Medicare Advantage plans. It isn't a standard Medigap benefit.",
      },
      {
        q: "Does a giveback mean the plan costs less overall?",
        a: "The reduction alone doesn't answer that. Compare medical costs, drug coverage, and access to your providers.",
      },
    ],
    sources: [
      {
        title: "Medicare explains programs that help with costs",
        url: "https://www.medicare.gov/basics/costs/help/medicare-savings-programs",
      },
      {
        title: "Medicare Plan Compare",
        url: "https://www.medicare.gov/plan-compare/",
      },
    ],
    related: [
      {
        title: "Help paying Medicare premiums in NC",
        href: "/guides/extra-help-medicare-savings-programs-nc",
      },
      {
        title: "Compare Medicare Advantage and Medigap",
        href: "/medicare-advantage-vs-medigap",
      },
      {
        title: "Medicare costs in 2026",
        href: "/medicare-costs-2026",
      },
    ],
    query: "medicare part b giveback plans",
    opportunity:
      "Clarify the actual rules, answer directly, and link readers to primary sources. Ranking improvement remains uncertain.",
    intent: "informational",
    datePublished: "2026-10-10",
    dateModified: "2026-11-05",
    scope: "medicare",
  },
  {
    slug: "medicare-advantage-open-enrollment-period",
    title: "Medicare Advantage Open Enrollment: Jan-Mar Guide",
    description:
      "Missed the fall deadline? If you are already in a Medicare Advantage plan, the Jan 1 through Mar 31 window gives you one more chance to switch or leave.",
    query: "medicare advantage open enrollment",
    opportunity:
      "The January window drives a fresh wave of switcher intent every year, and most Triad coverage explains it in passing. A dedicated local guide ranks for the post-holiday searches when people are already sitting in a plan they dislike.",
    intent: "informational",
    scope: "medicare",
    datePublished: "2026-10-10",
    dateModified: "2026-10-10",
    answer:
      "The Medicare Advantage Open Enrollment Period runs January 1 through March 31 each year. It is only for people already enrolled in a Medicare Advantage plan. During it you can switch to a different Advantage plan or drop your plan and return to Original Medicare. You get one change, and it takes effect the first of the month after you enroll.",
    sections: [
      {
        title: "What this window actually is",
        body: "Every year, January 1 through March 31, Medicare gives Advantage members a second chance to fix their coverage. Call it the do-over window. You already picked a plan in the fall. If it turns out to be the wrong one, this is your one clean shot to change it without waiting until next fall.",
      },
      {
        title: "Who can use it",
        body: "Only people already enrolled in a Medicare Advantage plan when the window opens. That is the whole eligibility test. If you have Original Medicare plus a stand-alone drug plan, this window is not for you. If you are on Original Medicare and want to join an Advantage plan for the first time, you cannot do it here either. You would wait for the fall Annual Enrollment or qualify for a Special Enrollment Period.",
      },
      {
        title: "The changes you are allowed to make",
        body: "You have two choices. Switch to a different Medicare Advantage plan, with or without drug coverage. Or drop your Advantage plan and go back to Original Medicare. If you go back to Original Medicare, you can also pick up a stand-alone Part D drug plan so your prescriptions stay covered. That is it. That is the full menu.",
      },
      {
        title: "What you cannot do",
        body: "You cannot join a Medicare Advantage plan from Original Medicare during this window. You cannot change your stand-alone Part D drug plan while keeping Original Medicare. And you cannot make more than one change. The window gives you a single move. Make it count, because once you use it, it is gone until next year.",
      },
      {
        title: "How it differs from fall Annual Enrollment",
        body: "Annual Enrollment, October 15 through December 7, is for everyone. You can join, switch, or drop Advantage and drug plans freely, change your mind as many times as you want, and everything takes effect January 1. The January window is smaller. It is only for Advantage members, it allows just one change, and your new coverage starts the first of the month after the plan gets your request. Enroll in February and your new plan starts March 1.",
      },
      {
        title: "The Greensboro check before you move",
        body: "January is a good time to ask what is actually going wrong with your current plan. Did your doctor leave the network? Did a prescription get more expensive? Did the plan change something in its January letter? Triad residents can sit down with Christian and compare what is available at their address, no cost and no obligation. Free help also exists through North Carolina's SHIIP counseling program and at 1-800-MEDICARE. One warning worth knowing: if you leave Advantage for Original Medicare, a Medigap plan is not guaranteed outside your first enrollment. In most cases the insurer can ask health questions and charge you more. Check that before you switch.",
      },
    ],
    comparison: {
      caption: "Fall Annual Enrollment vs. the January Advantage window",
      headers: ["Topic", "How they differ"],
      rows: [
        ["Dates", "Annual Enrollment: Oct 15 to Dec 7 | Advantage Open Enrollment: Jan 1 to Mar 31"],
        ["Who can use it", "Annual Enrollment: Everyone on Medicare | Advantage Open Enrollment: Only current Advantage members"],
        ["Number of changes", "Annual Enrollment: As many as you want | Advantage Open Enrollment: One"],
        ["Joining Advantage from Original Medicare", "Annual Enrollment: Yes | Advantage Open Enrollment: No"],
        ["When changes take effect", "Annual Enrollment: January 1 | Advantage Open Enrollment: First of the month after enrollment"],
      ],
    },
    checklist: [
      "Confirm you are currently enrolled in a Medicare Advantage plan.",
      "List what is wrong with the current plan: doctors, drugs, costs.",
      "Compare other Advantage plans at your home address.",
      "Remember you only get one change, so decide before you act.",
      "If going back to Original Medicare, line up a Part D drug plan.",
      "Ask about Medigap underwriting before leaving your Advantage plan.",
    ],
    faqs: [
      {
        q: "I have Original Medicare. Can I use this window to join an Advantage plan?",
        a: "No. The Medicare Advantage Open Enrollment Period is only for people already in a Medicare Advantage plan. If you have Original Medicare, you cannot use it to join an Advantage plan.",
      },
      {
        q: "How many times can I change plans between January and March?",
        a: "Once. You get a single enrollment change during the window. After you make it, you are done until the next opportunity.",
      },
      {
        q: "When does my new plan start?",
        a: "The first day of the month after the plan receives your enrollment request. If you enroll in February, coverage starts March 1.",
      },
      {
        q: "If I drop my Advantage plan, can I buy a Medigap plan?",
        a: "Maybe, but it is not guaranteed. Outside your first Medigap enrollment period, insurers in most states can use health questions and charge higher premiums. Check your Medigap options before you give up your Advantage plan.",
      },
      {
        q: "What happens to my drug coverage if I leave my Advantage plan?",
        a: "If your Advantage plan included drug coverage and you return to Original Medicare, you lose that drug coverage. You can join a stand-alone Part D plan during this same window. Do it promptly so you do not go without coverage.",
      },
    ],
    sources: [
      {
        title: "Medicare: Special Enrollment Periods",
        url: "https://www.medicare.gov/basics/get-started-with-medicare/get-more-coverage/joining-a-plan/special-enrollment-periods",
      },
      {
        title: "Medicare: Your coverage options",
        url: "https://www.medicare.gov/basics/get-started-with-medicare/get-more-coverage/your-coverage-options",
      },
      {
        title: "Medicare: Find health and drug plans",
        url: "https://www.medicare.gov/plan-compare",
      },
    ],
    related: [
      { title: "Medicare Annual Enrollment", href: "/aep" },
      { title: "When your Medicare plan is not renewing", href: "/guides/medicare-plan-not-renewing-triad" },
      { title: "Medicare help in the Triad", href: "/medicare" },
    ],
  },
  {
    slug: "how-to-compare-medicare-advantage-plans-2027-nc",
    title: "How to Compare Medicare Advantage Plans 2027 NC",
    description:
      "Compare 2027 Medicare Advantage plans in North Carolina by network, drugs, costs, and star ratings. A county-by-county method, no rankings and no hype.",
    query: "how to compare medicare advantage plans 2027 north carolina",
    opportunity:
      "County-level comparison method for 2027, with star ratings and the new out-of-pocket ceiling, without ranking carriers or naming a best plan.",
    intent: "informational",
    scope: "medicare",
    answer:
      "Start with your county, your doctors, and your drugs. Compare the same facts on every plan: network, drug list, total yearly cost, and the CMS star rating. No single plan fits everyone in North Carolina.",
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
    sections: [
      {
        title: "Start with your county, not the state",
        body: "CMS lists 179 Medicare Advantage plans in North Carolina for 2027 in its landscape file, up from 175 in 2026. That statewide count misleads more than it helps. Plans are approved county by county, so the list you can actually join is set by your home address. Guilford County and Wake County do not offer the same plans. Check every plan at your ZIP code, in the Medicare plan finder at medicare.gov, before you compare anything else.",
      },
      {
        title: "Check your doctors and your drugs first",
        body: "A plan that excludes your doctor or drops your drug is the wrong plan at any premium. Ask three questions of every plan: is each of my doctors in network, and what do I pay if one is not; is each of my drugs on the formulary, and on which tier; and is my pharmacy preferred or standard. HMO plans generally require in-network care except in emergencies. PPO plans cover some out-of-network care at higher cost. Get the answers in writing from the plan's own documents, not from an advertisement.",
      },
      {
        title: "Read the total year, not the premium",
        body: "A $0 premium plan is not a $0 plan. You still pay the Part B premium, plus copays, coinsurance, and any drug deductible when you use care. Add 12 months of premium to your expected copays and drug costs, then compare that yearly total. CMS caps what a 2027 plan can set as its in-network out-of-pocket limit at $9,850, up from $9,250 in 2026, and at $14,800 counting in-network and out-of-network care combined for PPO plans. The median in-network limit rose to $6,600 in 2027 from $5,900 in 2026, in an analysis of the CMS landscape files. CMS projects the average Advantage premium at about $12 a month in 2027, down from $14.37 in 2026. Averages describe the market, not your plan. Your Annual Notice of Change has your plan's real numbers.",
      },
      {
        title: "What the star ratings do and do not tell you",
        body: "CMS rates Medicare Advantage contracts from 1 to 5 stars each fall, on quality and performance measures such as preventive care, chronic condition management, and member experience. The ratings published in October 2026 apply to 2027 plans. In North Carolina, 172 of the 179 plans have a 2027 rating, 125 are rated 4 stars or more, and 2 are rated 5 stars. Ratings are per contract, so every plan under one contract shares its rating, and a new or small contract may have no rating yet. A 5-star rating does not mean your doctor is in network or your drug is covered. Use ratings as a quality check after the network and drug checks pass, not before.",
      },
      {
        title: "Extra benefits are real but secondary",
        body: "Many Advantage plans add dental, vision, hearing, over-the-counter allowances, and fitness benefits. These extras have their own limits, networks, and rules, and they change every year. A grocery allowance never outweighs a plan that excludes your cardiologist or drops your prescription. Compare extras last, after network, drugs, and yearly cost.",
      },
      {
        title: "Your 2027 decision dates",
        body: "Annual Enrollment runs October 15 through December 7, 2026, for coverage starting January 1, 2027. If you are already in a Medicare Advantage plan, the Medicare Advantage Open Enrollment Period runs January 1 through March 31, 2027, and gives you one change. A move, a plan leaving your county, or losing other coverage can open a Special Enrollment Period outside those windows. North Carolina enrollment help is local: Christian walks Triad residents through the comparison at no charge, and the state's free SHIIP counselors do the same in every county.",
      },
    ],
    comparison: {
      caption: "Compare the same facts on every plan",
      headers: ["What to check", "Why it matters"],
      rows: [
        ["Doctors in network", "Out-of-network care can cost more than the premium saves"],
        ["Drugs on the formulary", "A drug off the list, or on a high tier, changes your year"],
        ["Yearly out-of-pocket limit", "The ceiling on covered in-network care, at most $9,850 in 2027"],
        ["Star rating", "A quality signal for the contract, not a guarantee of fit"],
        ["Extra benefits", "Nice to have, never the deciding factor"],
      ],
    },
    checklist: [
      "List every doctor, drug, dose, and pharmacy before you compare.",
      "Confirm each doctor is in network for the 2027 plan, not the 2026 one.",
      "Price your full drug list under each plan's tiers.",
      "Add 12 months of premium to expected copays and drug costs.",
      "Read the Annual Notice of Change before December 7.",
    ],
    faqs: [
      {
        q: "How many Medicare Advantage plans are in North Carolina for 2027?",
        a: "CMS lists 179 plans statewide in its 2027 landscape file, up from 175 in 2026. Your county list is much smaller, because plans are approved county by county. Check your ZIP code in the Medicare plan finder.",
      },
      {
        q: "What is the highest out-of-pocket limit a 2027 plan can set?",
        a: "CMS caps the in-network limit at $9,850 for 2027, up from $9,250 in 2026. For PPO plans, the combined in-network and out-of-network limit is capped at $14,800. Most plans set lower limits, so read your plan's number.",
      },
      {
        q: "Do star ratings rank plans from best to worst?",
        a: "No. Star ratings measure a contract's quality and performance, from 1 to 5 stars, on measures such as preventive care and member experience. They do not measure whether your doctor is in network or your drug is covered.",
      },
      {
        q: "Is a $0 premium Medicare Advantage plan free?",
        a: "No. You still pay the Part B premium, and you pay copays, coinsurance, and drug costs when you use care. A $0 premium plan can still cost thousands in a heavy year, up to its out-of-pocket limit.",
      },
      {
        q: "When can I change my Medicare Advantage plan for 2027?",
        a: "During Annual Enrollment, October 15 through December 7, 2026, for coverage starting January 1, 2027. If you are already in an Advantage plan, the Medicare Advantage Open Enrollment Period, January 1 through March 31, 2027, gives you one change.",
      },
    ],
    sources: [
      {
        title: "CMS: CY2027 Medicare Advantage and Part D Rate Announcement",
        url: "https://www.cms.gov/medicare/payment/medicare-advantage-rates-statistics/announcements-and-documents",
      },
      {
        title: "Medicare: Find health and drug plans",
        url: "https://www.medicare.gov/plan-compare",
      },
      {
        title: "Medicare: Your coverage options",
        url: "https://www.medicare.gov/basics/get-started-with-medicare/get-more-coverage/your-coverage-options",
      },
    ],
    related: [
      { title: "Medicare Advantage in North Carolina", href: "/medicare-advantage-north-carolina" },
      { title: "Medicare Part D plans in North Carolina for 2027", href: "/guides/medicare-part-d-plans-2027-nc" },
      { title: "Medicare Advantage Open Enrollment, January through March", href: "/guides/medicare-advantage-open-enrollment-period" },
      { title: "Medicare Advantage vs Medigap", href: "/medicare-advantage-vs-medigap" },
      { title: "Medicare Annual Enrollment", href: "/aep" },
    ],
  },
  {
    slug: "medicare-part-d-plans-2027-nc",
    title: "Medicare Part D Plans 2027: North Carolina Guide",
    description:
      "North Carolina has 11 standalone Part D plans for 2027. The $700 deductible, the $2,400 cap, the $35 insulin limit, and how to compare them fairly in 2027.",
    query: "medicare part d plans 2027 north carolina",
    opportunity:
      "NC plan count from the CMS landscape file plus the final 2027 benefit numbers, with the insulin cap, coverage phases, and Extra Help as sections.",
    intent: "informational",
    scope: "medicare",
    answer:
      "North Carolina has 11 standalone Part D plans for 2027. Every one follows the same federal limits: a deductible of no more than $700, a $2,400 yearly cap on covered drug costs, and no more than $35 a month for each covered insulin.",
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
    sections: [
      {
        title: "The 2027 numbers are final",
        body: "CMS finalized the 2027 Part D standard benefit in its Rate Announcement on April 6, 2026. The maximum deductible rises to $700, from $615 in 2026. The annual out-of-pocket cap rises to $2,400, from $2,100. The national base beneficiary premium is $41.33 a month, up from $38.99. These are final figures, not projections. The deductible, copays, and coinsurance you pay for covered drugs count toward the $2,400 cap. Premiums do not. Once your out-of-pocket costs for covered drugs reach the cap, you pay $0 for covered drugs for the rest of the year.",
      },
      {
        title: "North Carolina's 11 plans",
        body: "North Carolina has 11 standalone Part D plans for 2027, down from 12 in 2026, according to the state's SHIIP program. Part D plans are sold by region, not by county, so everyone in North Carolina sees the same standalone list. CMS puts the lowest standalone premium at $5.30 a month in most states for 2027, and projects the average standalone premium at about $36 a month. KFF found a different number for people who stay in the same plan: an average of $51 a month nationally. The federal program that held standalone premiums down ends after 2026, so premiums can move more freely for 2027. Your plan's own premium is the only one that matters, and it is in your Annual Notice of Change.",
      },
      {
        title: "How to compare: your drugs, your pharmacy, your year",
        body: "Set the premium aside first. Multiply it by 12, then add what your drugs cost under each plan's rules: deductible, copays or coinsurance by tier, and whether your pharmacy is preferred. The plan with the lowest premium often loses on the total. Then check the formulary itself. Plans change which drugs they cover and which tier each drug sits in every year. Enter your exact drugs, doses, and pharmacy into the Medicare plan finder at medicare.gov to see your real total by plan. A plan that suits someone else's prescriptions can still be the wrong plan for yours.",
      },
      {
        title: "The $35 insulin cap",
        body: "A month's supply of each Part D-covered insulin costs no more than $35, and the Part D deductible does not apply to insulin. The cap applies per insulin product, per month, so if you take two insulins, each one has its own $35 ceiling. It applies in every coverage phase, and it applies to people with Extra Help too. Insulin used with a traditional pump covered under Part B is also capped at $35 for a month's supply. The cap covers insulin on your plan's formulary. If your insulin is not covered, ask your doctor about a formulary alternative or an exception.",
      },
      {
        title: "Coverage phases in 2027",
        body: "A Part D year has three phases in 2027. First, the deductible phase: you pay the plan price for covered drugs until you meet the deductible, which can be no more than $700. Some plans charge no deductible, or none for lower tiers. Second, initial coverage: in the standard benefit you pay 25 percent coinsurance until your out-of-pocket costs reach $2,400. Third, catastrophic coverage: you pay $0 for covered drugs for the rest of the year. There is no coverage gap phase. The gap, once called the donut hole, ended with the $2,000 cap in 2025 and stays gone in 2027.",
      },
      {
        title: "Extra Help and benchmark plans",
        body: "Extra Help, also called the Low Income Subsidy, pays part or all of the Part D premium, deductible, and copays for people with limited income and resources. Each year CMS sets a benchmark premium amount for each region. If you have full Extra Help, a plan with a premium at or below the benchmark costs you $0 in premium. Plans above the benchmark cost you the difference. You apply for Extra Help through Social Security, and North Carolina's SHIIP counselors can walk through the application with you at no charge.",
      },
      {
        title: "Smoothing payments across the year",
        body: "The Medicare Prescription Payment Plan lets you spread out-of-pocket drug costs into monthly payments across the year instead of paying large amounts in January and February. It is optional, it costs nothing to join, and it is not a discount: the total you owe stays the same. It helps most when your drug costs are highest early in the year. Ask your plan about it during Open Enrollment, before December 7.",
      },
    ],
    comparison: {
      caption: "Part D limits, 2026 and 2027",
      headers: ["Part D feature", "2026 / 2027"],
      rows: [
        ["Maximum standard deductible", "$615 / $700"],
        ["Annual out-of-pocket cap", "$2,100 / $2,400"],
        ["Insulin, per month's supply", "$35 / $35"],
        ["Coverage gap phase", "Gone in 2025 / Still gone"],
      ],
    },
    checklist: [
      "Bring your full drug list, doses, and pharmacy name.",
      "Read the Annual Notice of Change before you compare anything.",
      "Enter your exact drugs into the Medicare plan finder.",
      "Add 12 months of premium to your drug costs for each plan.",
      "Check insulin, deductible, and tier rules for your drugs.",
    ],
    faqs: [
      {
        q: "How many standalone Part D plans does North Carolina have for 2027?",
        a: "Eleven, down from 12 in 2026, according to the state's SHIIP program. Part D plans are sold by region, so the same 11 plans are offered across the state. Medicare Advantage plans with drug coverage are separate, and their drug lists differ.",
      },
      {
        q: "What are the 2027 Part D deductible and out-of-pocket cap?",
        a: "CMS finalized them in the CY2027 Rate Announcement on April 6, 2026: the standard deductible rises to a $700 maximum, from $615, and the annual out-of-pocket cap rises to $2,400, from $2,100. Once your out-of-pocket costs for covered drugs reach the cap, you pay $0 for covered drugs the rest of the year.",
      },
      {
        q: "Does the $35 insulin cap apply if I have Extra Help?",
        a: "Yes. Medicare.gov states the $35 limit applies to everyone who takes insulin, even with Extra Help. The cap is $35 for a one-month supply of each covered insulin, with no deductible, in every coverage phase.",
      },
      {
        q: "What is a benchmark plan?",
        a: "Each year CMS sets a benchmark premium amount for each region. If you have full Extra Help, a plan priced at or below the benchmark costs you $0 in premium. A plan above it costs you the difference between its premium and the benchmark.",
      },
      {
        q: "When can I change my Part D plan for 2027?",
        a: "During Open Enrollment, October 15 through December 7, 2026. Changes take effect January 1, 2027. Outside that window you generally need a Special Enrollment Period, such as a move or losing other drug coverage.",
      },
    ],
    sources: [
      {
        title: "CMS: CY2027 Medicare Advantage and Part D Rate Announcement",
        url: "https://www.cms.gov/files/document/2027-announcement.pdf",
      },
      {
        title: "Medicare: Insulin costs",
        url: "https://www.medicare.gov/coverage/insulin",
      },
      {
        title: "Medicare: Find health and drug plans",
        url: "https://www.medicare.gov/plan-compare",
      },
    ],
    related: [
      { title: "How do I compare Medicare drug plans during Open Enrollment?", href: "/answers/compare-part-d-plans-open-enrollment-2027" },
      { title: "Do I need Medicare drug coverage?", href: "/answers/do-i-need-medicare-drug-coverage" },
      { title: "The Part D late enrollment penalty", href: "/answers/medicare-part-d-late-penalty" },
      { title: "The Part D cap, explained", href: "/medicare-part-d-donut-hole-2027" },
      { title: "Every 2027 Medicare cost, final vs projected", href: "/medicare-costs-2027" },
    ],
  },
  {
    slug: "medicare-enrollment-periods-iep-gep-sep-aep",
    title: "Medicare Enrollment Periods: IEP, GEP, SEP, AEP",
    description:
      "Four Medicare enrollment windows, mapped: the 7-month Initial period, General Enrollment, Special Enrollment, and Annual Enrollment, with dates and penalties.",
    query: "medicare enrollment periods iep gep sep aep explained",
    opportunity:
      "One page mapping all four enrollment periods with dates and penalties, with the 7-month Initial Enrollment window as a section.",
    intent: "informational",
    scope: "medicare",
    answer:
      "Most people get one seven-month window when they turn 65. Miss it without employer coverage and you wait for General Enrollment, pay a penalty, and risk months without coverage.",
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
    sections: [
      {
        title: "Initial Enrollment Period: your seven months",
        body: "Your Initial Enrollment Period runs for seven months: the three months before the month you turn 65, your birthday month, and the three months after. If you sign up in the three months before you turn 65, coverage can start the first day of your birthday month. If your birthday falls on the first of the month, the window shifts one month earlier. If you already receive Social Security benefits, Medicare enrolls you automatically in Parts A and B. Everyone else must sign up. This is the only window with no penalty for signing up on time.",
      },
      {
        title: "General Enrollment Period: January 1 to March 31",
        body: "General Enrollment runs January 1 through March 31 each year, for people who missed their Initial Enrollment Period and do not qualify for a Special Enrollment Period. Coverage starts the month after you sign up. That start date changed in 2023. Before then, coverage waited until July 1. Late enrollment penalties can still apply, and the months you went without coverage are months you pay for yourself.",
      },
      {
        title: "Annual Enrollment Period: October 15 to December 7",
        body: "Annual Enrollment, also called Open Enrollment, runs October 15 through December 7 each year. It is the window to join, switch, or drop a Medicare Advantage plan or a Part D drug plan, for coverage starting January 1. It is not the window to join Part B for the first time. That is what the Initial and General Enrollment Periods are for. If your plan still fits, you do not have to do anything, but read the Annual Notice of Change first, because premiums, drug lists, and networks change every year.",
      },
      {
        title: "Medicare Advantage Open Enrollment: January 1 to March 31",
        body: "If you are already in a Medicare Advantage plan, the Medicare Advantage Open Enrollment Period runs January 1 through March 31. It gives you one change: switch to another Advantage plan, or return to Original Medicare and add a Part D drug plan. Coverage starts the first day of the month after the plan receives your request. You cannot use this window to join an Advantage plan from Original Medicare.",
      },
      {
        title: "Special Enrollment Periods: life changes",
        body: "A Special Enrollment Period opens when life changes. A move to a new service area, losing employer coverage, a plan leaving your county, and gaining or losing Medicaid can each open one. The length varies by event. Most last two months after the event. The rule most people use is the employer rule: if you had group health coverage through current employment with 20 or more employees, you get eight months to join Part B after that employment or coverage ends, with no late penalty. COBRA and Marketplace plans do not count as employer coverage for this rule, so they do not delay the penalty.",
      },
      {
        title: "The penalties for waiting",
        body: "The Part B penalty adds 10 percent to your monthly premium for each full 12-month period you went without Part B or employer group coverage, and it generally lasts as long as you have Part B. The Part D penalty adds 1 percent of the national base beneficiary premium for each month you went without creditable drug coverage, and it also generally lasts as long as you have Part D. For 2027 the base beneficiary premium is $41.33 a month, so a year without drug coverage adds about $5 a month to your premium. Penalties are the reason the first window matters most.",
      },
    ],
    comparison: {
      caption: "The four windows at a glance",
      headers: ["Window", "When it runs"],
      rows: [
        ["Initial Enrollment Period", "7 months around your 65th birthday"],
        ["General Enrollment Period", "January 1 to March 31"],
        ["Annual Enrollment Period", "October 15 to December 7"],
        ["Medicare Advantage Open Enrollment", "January 1 to March 31, one change"],
      ],
    },
    checklist: [
      "Mark your 65th birthday month and count three months back.",
      "Confirm whether your employer coverage counts for a delay.",
      "Keep proof of employer coverage from the day it ends.",
      "Read the Annual Notice of Change every September.",
      "Ask about a Special Enrollment Period before you assume you must wait.",
    ],
    faqs: [
      {
        q: "When should I sign up for Medicare?",
        a: "In the three months before the month you turn 65, so coverage can start the first day of your birthday month. If you already receive Social Security, Medicare enrolls you automatically. If you have employer coverage from a job with 20 or more employees, you can delay Part B without penalty.",
      },
      {
        q: "What happens if I miss my Initial Enrollment Period?",
        a: "You generally wait for General Enrollment, January 1 through March 31, and coverage starts the month after you sign up. A late enrollment penalty can apply to Part B and Part D, unless you had employer group coverage or another qualifying event.",
      },
      {
        q: "Can I change plans outside Annual Enrollment?",
        a: "Only with a qualifying event that opens a Special Enrollment Period, such as a move or losing employer coverage, or during the Medicare Advantage Open Enrollment Period, January 1 through March 31, if you are already in an Advantage plan.",
      },
      {
        q: "Does COBRA delay the Part B penalty?",
        a: "No. COBRA and Marketplace plans do not count as employer group coverage for Medicare's delay rules. If you are 65 or older and relying on COBRA, enroll in Part B on time or the penalty can apply.",
      },
      {
        q: "How long does the Part B penalty last?",
        a: "Generally as long as you have Part B. It adds 10 percent to your premium for each full 12-month period you went without Part B or employer group coverage.",
      },
    ],
    sources: [
      {
        title: "Medicare: When you can join, switch, or drop a plan",
        url: "https://www.medicare.gov/basics/get-started-with-medicare/get-more-coverage/joining-a-plan",
      },
      {
        title: "Medicare: Special Enrollment Periods",
        url: "https://www.medicare.gov/basics/get-started-with-medicare/get-more-coverage/joining-a-plan/special-enrollment-periods",
      },
      {
        title: "SSA: Medicare premiums",
        url: "https://www.ssa.gov/benefits/medicare/medicare-premiums.html",
      },
    ],
    related: [
      { title: "Missed Medicare enrollment", href: "/guides/missed-medicare-enrollment" },
      { title: "Medicare Advantage Open Enrollment, January through March", href: "/guides/medicare-advantage-open-enrollment-period" },
      { title: "Medicare automatic renewal", href: "/guides/medicare-automatic-renewal" },
      { title: "Turning 65 in North Carolina", href: "/turning-65" },
      { title: "Medicare Annual Enrollment", href: "/aep" },
    ],
  },
  {
    slug: "what-is-medigap-medicare-supplement-nc",
    title: "What Is Medigap? Medicare Supplement in NC",
    description:
      "Medigap fills the gaps Original Medicare leaves: deductibles, coinsurance, excess charges. The ten standardized plans, what they do not cover, and NC timing.",
    query: "what is medigap medicare supplement north carolina",
    opportunity:
      "Medigap hub for North Carolina: standardized plans, what it pays, what it never covers, and the 6-month guaranteed-issue window at 65.",
    intent: "informational",
    scope: "medicare",
    answer:
      "Medigap is private insurance that pays some of the costs Original Medicare leaves you, like deductibles and 20 percent coinsurance. It works only with Original Medicare, and it never includes drug coverage.",
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
    sections: [
      {
        title: "What Medigap pays",
        body: "Original Medicare leaves you with real bills. The Part A hospital deductible is $1,736 per benefit period in 2026. Part B pays 80 percent of most outpatient care and leaves you the other 20 percent, with no yearly limit. A skilled nursing stay costs $217 a day for days 21 through 100 in 2026. Medigap pays some or all of these gaps, depending on the plan letter: the Part A deductible, Part A and Part B coinsurance, the first three pints of blood, hospice coinsurance, and skilled nursing coinsurance. Some plans also pay Part B excess charges and 80 percent of emergency care abroad, after a $250 deductible, up to a $50,000 lifetime limit.",
      },
      {
        title: "The ten standardized letters",
        body: "Federal law standardizes ten Medigap plans: A, B, C, D, F, G, K, L, M, and N. A Plan G from one company covers exactly what a Plan G from another company covers. Only the premium and the service differ. Every plan covers Part A coinsurance and 365 extra hospital days. Plans C and F are closed to anyone who became eligible for Medicare on or after January 1, 2020, because they cover the Part B deductible. Plan G is the most complete plan open to new enrollees: it covers everything Plan F did except the Part B deductible. Plan N covers most of what G covers, with copays of up to $20 for some office visits and up to $50 for an emergency room visit that does not lead to admission, and no excess-charge coverage. Plans K and L pay 50 percent and 75 percent of most benefits, with an annual out-of-pocket limit.",
      },
      {
        title: "What Medigap does not cover",
        body: "No Medigap plan covers prescription drugs. Policies sold since 2006 have no drug coverage, so nearly everyone with Medigap also buys a separate Part D plan. No plan covers routine dental or vision care, eyeglasses, hearing aids, private-duty nursing, or long-term custodial care. Medigap also cannot be paired with a Medicare Advantage plan. The two are mutually exclusive: you either have Original Medicare plus Medigap, or you have a Medicare Advantage plan, not both.",
      },
      {
        title: "When to buy in North Carolina",
        body: "Your best window is the six-month Medigap Open Enrollment Period that starts the month you turn 65 and enroll in Part B. During it, insurers must sell you any plan they offer, with no health questions and no higher premium for health reasons. Outside that window, North Carolina insurers can ask health questions, charge higher premiums, and turn you down. That is why the decision belongs in the months around 65, not years later. People under 65 on disability face different rules in North Carolina, so check with the state's free SHIIP counselors before assuming a plan is available.",
      },
      {
        title: "What it costs",
        body: "A Medigap premium is separate from the Part B premium, and it is separate from any Part D premium. Nationally, Medigap policyholders paid an average of $244 a month in 2025, according to KFF, up 7 percent from the year before. Your premium depends on your age, your ZIP code, the plan letter, and how the insurer sets rates. Some insurers raise premiums as you age. Others set the rate by your age at purchase. No page can quote your price. Compare the same letter across companies, and ask how the premium has changed over the past five years.",
      },
    ],
    comparison: {
      caption: "Medigap or Medicare Advantage, the core trade",
      headers: ["Choice", "What you get"],
      rows: [
        ["Original Medicare plus Medigap", "Any doctor who takes Medicare, predictable costs, separate drug plan"],
        ["Medicare Advantage", "One plan with network rules, a yearly out-of-pocket limit, drug coverage often built in"],
        ["Original Medicare alone", "No yearly limit on your 20 percent share of Part B"],
      ],
    },
    checklist: [
      "Enroll in Parts A and B first. Medigap needs both.",
      "Buy inside the six-month window at 65, when no health questions apply.",
      "Compare the same letter across companies, not different letters.",
      "Add a separate Part D plan for prescriptions.",
      "Ask how the premium is rated and how it has changed.",
    ],
    faqs: [
      {
        q: "Does Medigap cover prescription drugs?",
        a: "No. No Medigap policy sold since 2006 includes drug coverage. You need a separate Part D plan for outpatient prescriptions, and the Part D deductible and $2,400 cap for 2027 apply to that plan.",
      },
      {
        q: "Can I have Medigap and a Medicare Advantage plan?",
        a: "No. Medigap works only with Original Medicare. If you join a Medicare Advantage plan, you cannot use a Medigap policy to pay its copays, and you cannot buy one to go with it.",
      },
      {
        q: "When is the best time to buy Medigap?",
        a: "During the six-month Medigap Open Enrollment Period that starts the month you turn 65 and enroll in Part B. Insurers must sell you any plan they offer, with no health questions. Outside that window, insurers in North Carolina can use underwriting.",
      },
      {
        q: "Is Plan G the same from every company?",
        a: "Yes, in benefits. Federal law standardizes the plans, so a Plan G from one company covers exactly what a Plan G from another covers. Premiums, rate history, and service differ, so compare those.",
      },
      {
        q: "Does my Medigap policy follow me if I move?",
        a: "Yes. A Medigap policy travels with you anywhere in the United States, as long as you keep Original Medicare. Tell your insurer your new address. Your premium may change with the move.",
      },
    ],
    sources: [
      {
        title: "Medicare: What is Medicare Supplement Insurance (Medigap)?",
        url: "https://www.medicare.gov/supplements-other-insurance/whats-medicare-supplement-insurance-medigap",
      },
      {
        title: "Medicare: Your coverage options",
        url: "https://www.medicare.gov/basics/get-started-with-medicare/get-more-coverage/your-coverage-options",
      },
      {
        title: "CMS: CY2027 Medicare Advantage and Part D Rate Announcement",
        url: "https://www.cms.gov/medicare/payment/medicare-advantage-rates-statistics/announcements-and-documents",
      },
    ],
    related: [
      { title: "Plan G vs Plan N in North Carolina", href: "/guides/medigap-plan-g-vs-plan-n-nc" },
      { title: "Medigap or Medicare Advantage: which one fits me?", href: "/answers/medigap-or-medicare-advantage-which-one-fits-me" },
      { title: "Medicare Advantage vs Medigap", href: "/medicare-advantage-vs-medigap" },
      { title: "Switching from Medicare Advantage to Medigap in NC", href: "/guides/switching-medicare-advantage-to-medigap-nc" },
      { title: "Every 2027 Medicare cost, final vs projected", href: "/medicare-costs-2027" },
    ],
  },
  {
    slug: "health-insurance-marketplace-north-carolina",
    title: "Health Insurance Marketplace North Carolina 2027",
    description:
      "North Carolina uses HealthCare.gov. Open Enrollment runs November 1, 2026 to January 15, 2027. Metal tiers, subsidies, and the five 2027 insurers statewide.",
    query: "health insurance marketplace north carolina",
    opportunity:
      "NC marketplace hub for 2027: how it works, metal tiers, open and special enrollment, cost by tier and age, and subsidies with the 400% cliff back.",
    intent: "informational",
    answer:
      "North Carolina uses the federal Marketplace at HealthCare.gov. Open Enrollment for 2027 runs November 1, 2026 to January 15, 2027, and December 15 is the last day to enroll for coverage starting January 1.",
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
    sections: [
      {
        title: "How the Marketplace works in North Carolina",
        body: "North Carolina has no state exchange. Residents buy individual and family coverage through the federal Marketplace at HealthCare.gov, by phone, or with a licensed agent. One application checks Marketplace coverage and, in North Carolina, Medicaid, since the state expanded Medicaid to adults earning up to 138 percent of the federal poverty level. Plans on the Marketplace cover essential health benefits, cannot turn you down for a pre-existing condition, and cannot charge you more for being sick. Your price depends on your income, age, household size, county, and the plan you pick.",
      },
      {
        title: "Open Enrollment dates for 2027",
        body: "Open Enrollment for 2027 coverage runs November 1, 2026 through January 15, 2027. Enroll by December 15, 2026 for coverage starting January 1, 2027. Enroll December 16 through January 15 and coverage starts February 1. Outside Open Enrollment you generally need a qualifying life event, such as losing job-based coverage, moving, marrying, or having a child. That opens a Special Enrollment Period, usually 60 days from the event. Missing the window without a qualifying event generally means waiting for the next Open Enrollment.",
      },
      {
        title: "Metal tiers: Bronze, Silver, Gold, Platinum",
        body: "Marketplace plans come in four metal tiers that describe how costs split between you and the insurer. Bronze plans pay about 60 percent of average costs, Silver about 70 percent, Gold about 80 percent, and Platinum about 90 percent. Bronze has the lowest monthly premium and the highest costs when you need care. Platinum is the reverse. Silver is the middle ground, and it is the only tier with cost-sharing reductions, which lower deductibles and copays for people who qualify. Pick the tier by how much care you expect to use, not by the premium alone.",
      },
      {
        title: "Health insurance cost: what drives your price",
        body: "Four things move your price most: your age, your tier, your county, and whether you use tobacco. Under federal rules an older adult can be charged up to three times what a younger adult pays for the same plan. In 2026 the average Marketplace enrollee paid $178 a month after tax credits, up 58 percent from $113 in 2025, according to a KFF analysis of actual enrollment data from May 2026. The average deductible rose 37 percent to $3,786 in 2026. For 2027, North Carolina's average approved rate increase is about 14.1 percent, and KFF found insurers proposed a median increase of 15 percent nationally. Your price on HealthCare.gov is the only one that counts. Enter your own income and household size there before you decide anything.",
      },
      {
        title: "Subsidies: premium tax credits and cost-sharing reductions",
        body: "Two kinds of help exist. The premium tax credit lowers your monthly premium, and cost-sharing reductions lower what you pay at the visit. The credit is set by the price of the benchmark plan in your area, the second-lowest-cost Silver plan, and your household income. For 2027 coverage the credit is available to households earning 100 to 400 percent of the federal poverty level. The enhanced credits that removed the income ceiling expired on December 31, 2025, so the 400 percent cliff is back: earn a dollar over 400 percent, about $63,840 for one person or $86,560 for a couple in 2027, and the credit drops to zero. You can take the credit in advance each month, but you reconcile it on Form 8962 with your tax return, and a 2025 federal law removed the cap on repaying excess advance credit for tax year 2026 onward. Report income changes to the Marketplace as they happen. Cost-sharing reductions are available only on Silver plans, for income up to 250 percent of poverty.",
      },
      {
        title: "North Carolina's 2027 insurers",
        body: "Five insurers offer Marketplace plans in North Carolina for 2027: Ambetter of North Carolina, AmeriHealth Caritas North Carolina, Blue Cross and Blue Shield of NC, Oscar, and UnitedHealthcare. Blue Cross and Blue Shield of NC is the only insurer with plans in all 100 counties. Availability varies by county, so check your ZIP code. Cigna is leaving the individual market after 2026, and Aetna left after 2025. Approved 2027 rate increases from the state filings include 8.4 percent for Ambetter, 15.8 percent for Blue Cross and Blue Shield of NC, and 27.4 percent for UnitedHealthcare. Those are averages across each insurer's plans, not your premium.",
      },
      {
        title: "Self-employed and between jobs",
        body: "If you are self-employed, estimate your annual income for the year ahead and update it when work changes, because your credit is set by that estimate. If you lose job-based coverage, you have two doors at once: COBRA, which keeps your employer plan for up to 18 months at up to 102 percent of the full premium, and a Marketplace plan through a 60-day Special Enrollment Period. Compare both before the 60 days run out. At 65, Medicare becomes your coverage. A Marketplace plan does not replace Medicare, and keeping one past 65 can cost you a late enrollment penalty, so plan the switch in the months before your 65th birthday.",
      },
    ],
    comparison: {
      caption: "Metal tiers at a glance",
      headers: ["Tier", "What it means"],
      rows: [
        ["Bronze", "Lowest premium, highest costs when you need care"],
        ["Silver", "Middle ground, and the only tier with cost-sharing reductions"],
        ["Gold", "Higher premium, lower costs at the visit"],
        ["Platinum", "Highest premium, lowest costs at the visit"],
      ],
    },
    checklist: [
      "Check your ZIP code: plans and prices vary by county.",
      "Enroll by December 15, 2026 for coverage starting January 1.",
      "Enter your income and household size on HealthCare.gov before you pick a tier.",
      "Compare the total year, premium plus deductible, not the premium alone.",
      "Report income changes to the Marketplace as they happen.",
    ],
    faqs: [
      {
        q: "When is Open Enrollment for 2027 in North Carolina?",
        a: "November 1, 2026 through January 15, 2027, on HealthCare.gov. Enroll by December 15, 2026 for coverage starting January 1, 2027. Enrollments from December 16 through January 15 start February 1.",
      },
      {
        q: "Do I still get a subsidy in 2027?",
        a: "Yes, if your household income is between 100 and 400 percent of the federal poverty level. The enhanced credits expired on December 31, 2025, so above 400 percent, about $63,840 for one person in 2027, the premium tax credit drops to zero.",
      },
      {
        q: "What is the cheapest Marketplace plan?",
        a: "Bronze plans have the lowest monthly premiums, but they also have the highest deductibles and out-of-pocket costs. If you expect regular care, a Silver plan with cost-sharing reductions can cost less over the year, even with a higher premium.",
      },
      {
        q: "What if I miss Open Enrollment?",
        a: "You generally wait for the next Open Enrollment unless a qualifying life event opens a Special Enrollment Period, usually 60 days from the event. Losing job-based coverage, moving, marrying, and having a child are common qualifying events.",
      },
      {
        q: "Can I keep a Marketplace plan after I turn 65?",
        a: "You can, but it is usually not the right choice. At 65 Medicare becomes your coverage, and a Marketplace plan does not replace it. Keeping Marketplace coverage past 65 can cost you a Medicare late enrollment penalty, so plan the switch before your 65th birthday.",
      },
    ],
    sources: [
      {
        title: "IRS: The premium tax credit",
        url: "https://www.irs.gov/affordable-care-act/individuals-and-families/the-premium-tax-credit",
      },
      {
        title: "Medicare: When you can join, switch, or drop a plan",
        url: "https://www.medicare.gov/basics/get-started-with-medicare/get-more-coverage/joining-a-plan",
      },
    ],
    related: [
      { title: "COBRA vs Marketplace health insurance", href: "/answers/cobra-vs-marketplace-health-insurance" },
      { title: "COBRA vs Medicare at 65", href: "/guides/cobra-vs-medicare-at-65" },
      { title: "Turning 65 and the Marketplace", href: "/guides/turning-65-aca-marketplace-plan" },
      { title: "Turning 65 in North Carolina", href: "/turning-65" },
      { title: "Special enrollment", href: "/special-enrollment" },
    ],
  },
  {
    slug: "401k-contribution-limits-2026",
    title: "401(k) Contribution Limits for 2026",
    description:
      "Check the 2026 401(k) limits: $24,500 under 50, $32,500 at 50 and older, $35,750 at 60 to 63, and $72,000 with employer money. See the Roth catch-up rule too.",
    query: "401k contribution limits 2026",
    opportunity:
      "The 2026 limits are fresh from IRS Notice 2025-67. A plain table by age answers the question directly, with the new Roth catch-up rule as the differentiator.",
    intent: "informational",
    answer:
      "For 2026 you can defer $24,500 of your own pay into a 401(k). The limit rises to $32,500 at age 50 and older, and to $35,750 if you turn 60, 61, 62, or 63 during the year. With employer money included, the total cap is $72,000.",
    sections: [
      {
        title: "The 2026 limits at a glance",
        body: "The employee deferral limit is $24,500 for 2026, up from $23,500 in 2025. The standard catch-up for age 50 and older is $8,000, which brings the total to $32,500. The larger catch-up for ages 60 to 63 is $11,250, which brings the total to $35,750. The overall annual additions limit, employee plus employer contributions, is $72,000 or 100 percent of compensation, whichever is lower. These figures come from IRS Notice 2025-67, published November 13, 2025.",
      },
      {
        title: "The age 60 to 63 catch-up replaces the regular one",
        body: "The $11,250 catch-up for people who turn 60, 61, 62, or 63 during the year replaces the $8,000 catch-up. It does not stack on top of it. So the most you can defer at those ages is $24,500 plus $11,250, or $35,750. The test is the age you reach during the calendar year, not your age on January 1. Your plan has to offer the larger catch-up, so confirm it with your plan administrator.",
      },
      {
        title: "The Roth catch-up rule for higher earners",
        body: "Starting in 2026, if your wages from the employer sponsoring the plan were more than $150,000 in the prior year, any catch-up contribution must go into a Roth account. That means the catch-up is after tax, with no upfront deduction. The $150,000 test counts wages from that one employer only, not all of your income. If your plan has no Roth option, you may not be able to make a catch-up contribution at all. Ask your plan administrator how your plan handles it.",
      },
      {
        title: "How much should you contribute",
        body: "The limit is a ceiling, not a target. A common first step is contributing enough to get the full employer match, since that is money your employer adds for participating. After that, many savers raise the percentage a little each year or when pay rises. What fits depends on your debts, your emergency fund, and your other goals. This guide is educational only. It does not recommend a contribution amount for your situation.",
      },
    ],
    comparison: {
      caption: "2026 401(k) limits by age",
      headers: ["Your age in 2026", "Most you can defer"],
      rows: [
        ["Under 50", "$24,500"],
        ["50 to 59, and 64 and older", "$32,500"],
        ["60 to 63", "$35,750"],
        ["Any age, with employer contributions", "$72,000 total, or 100 percent of pay if lower"],
      ],
    },
    checklist: [
      "Confirm your plan's deferral limit and whether it offers the age 60 to 63 catch-up.",
      "Check whether your prior-year wages from that employer were over $150,000, which makes catch-ups Roth.",
      "Set your deferral percentage before the year's last payroll if you want to use the full limit.",
      "Keep your pay stubs and plan statements showing what you deferred.",
      "If you have two 401(k)s, remember the $24,500 limit applies across all of them combined.",
    ],
    faqs: [
      {
        q: "Does the $24,500 limit include my employer's match?",
        a: "No. The $24,500 is your own deferrals only. Employer contributions count toward the separate $72,000 total.",
      },
      {
        q: "Can I contribute to a 401(k) and an IRA in the same year?",
        a: "Yes. The limits are separate. For 2026 you can put up to $7,500 in an IRA, or $8,600 at 50 and older, in addition to your 401(k) deferrals.",
      },
      {
        q: "What happens if I contribute too much?",
        a: "Tell your plan administrator right away. Excess deferrals generally need to come out by April 15 of the next year to avoid double taxation. Ask a tax professional how to report it.",
      },
    ],
    sources: [
      {
        title: "IRS: 2026 limits (IR-2025-111)",
        url: "https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500",
      },
      {
        title: "IRS: 401(k) contribution limits",
        url: "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-401k-and-profit-sharing-plan-contribution-limits",
      },
    ],
    related: [
      { title: "401(k) early withdrawal exceptions", href: "/guides/401k-early-withdrawal-exceptions" },
      { title: "401(k) rollover after leaving a job", href: "/guides/401k-rollover-after-leaving-job" },
      { title: "How a 401(k) works", href: "/wealth/401k-explained" },
    ],
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
  },
  {
    slug: "social-security-spousal-benefits",
    title: "Social Security Spousal Benefits Explained",
    description:
      "A spouse can collect up to half of a worker's full retirement benefit. See the 2026 maximum, the cost of claiming at 62, and the rules for divorced spouses.",
    query: "social security spousal benefits how much",
    opportunity:
      "Spousal rules are widely misunderstood, especially the 50 percent base and the early-claiming cut. A short guide with the 2026 maximum answers the question directly.",
    intent: "informational",
    answer:
      "A spouse can collect up to 50 percent of the worker's primary insurance amount, which is the monthly benefit the worker would receive at full retirement age. In 2026 the highest possible spousal benefit is $2,076 a month. Claiming early cuts it for good, and waiting past full retirement age does not raise it.",
    sections: [
      {
        title: "The 50 percent rule, and what it is 50 percent of",
        body: "The spousal benefit is based on the worker's primary insurance amount, not on the check the worker actually receives. If the worker claimed early, your spousal benefit is still figured from the full retirement age amount. If the worker delayed past full retirement age, your spousal benefit does not grow with the delayed credits. The maximum primary insurance amount at full retirement age in 2026 is $4,152 a month, so the highest possible spousal benefit is half of that, $2,076 a month. Most couples see less, because the worker's earnings record sets the number.",
      },
      {
        title: "Claiming early shrinks it for good",
        body: "You can claim a spousal benefit as early as 62, but the reduction is permanent. With a full retirement age of 67, claiming at 62 leaves you with about 32.5 percent of the worker's primary insurance amount instead of 50 percent. The reduction is 25/36 of one percent per month for the first 36 months early, then 5/12 of one percent per month after that. Unlike a worker's own benefit, a spousal benefit does not grow if you wait past full retirement age, so there is no reason to delay past that age for the spousal benefit alone.",
      },
      {
        title: "You get whichever benefit is higher",
        body: "Social Security does not pay both amounts stacked together. If you worked enough to earn your own retirement benefit, the agency pays your own benefit first, then adds a spousal top-up only if the spousal amount is higher. Many people with a solid work record find their own benefit is the larger one. Check your own record at ssa.gov/myaccount before deciding when to claim.",
      },
      {
        title: "Divorced spouses and working while collecting",
        body: "A divorced spouse can claim on an ex-spouse's record if the marriage lasted at least 10 years, you are unmarried, and you are 62 or older. Your ex-spouse does not need to have claimed, and your claim does not reduce what your ex-spouse or their current spouse receives. If you claim before full retirement age and keep working, the earnings test applies: in 2026 Social Security withholds $1 in benefits for every $2 earned above $24,480. The withheld money is not lost forever; your benefit is recalculated at full retirement age.",
      },
    ],
    comparison: {
      caption: "Spousal benefit by claiming age, full retirement age 67",
      headers: ["You claim at", "Share of the worker's PIA"],
      rows: [
        ["62", "About 32.5 percent"],
        ["63", "About 35 percent"],
        ["64", "About 37.5 percent"],
        ["65", "About 41.7 percent"],
        ["67, full retirement age", "50 percent"],
        ["68 to 70", "Still 50 percent, it does not grow"],
      ],
    },
    checklist: [
      "Find the worker's primary insurance amount on their Social Security statement.",
      "Confirm your own full retirement age, 67 if you were born in 1960 or later.",
      "Compare your own benefit with the spousal amount before choosing a claiming age.",
      "If divorced, check the 10-year marriage rule and your current marital status.",
      "If you will keep working, check the 2026 earnings limit of $24,480.",
    ],
    faqs: [
      {
        q: "Can I collect a spousal benefit if my spouse has not claimed yet?",
        a: "Yes, if your spouse is at least 62 and eligible, you can claim a spousal benefit even if your spouse has not filed. A divorced spouse can also claim if the ex-spouse is 62 or older.",
      },
      {
        q: "Does my spousal benefit grow if I wait until 70?",
        a: "No. Spousal benefits top out at 50 percent of the worker's primary insurance amount at your full retirement age. Delayed retirement credits do not apply to spousal benefits.",
      },
      {
        q: "What if my spouse dies?",
        a: "Survivor benefits follow different rules and can be higher than a spousal benefit. A widow or widower can receive up to 100 percent of the worker's benefit. See the survivor benefits guide for the details.",
      },
    ],
    sources: [
      {
        title: "SSA: Benefits for spouses",
        url: "https://www.ssa.gov/benefits/retirement/planner/applying7.html",
      },
      {
        title: "SSA: Early retirement reduction",
        url: "https://www.ssa.gov/benefits/retirement/planner/agereduction.html",
      },
      {
        title: "SSA: Working while collecting benefits",
        url: "https://www.ssa.gov/benefits/retirement/planner/whileworking.html",
      },
    ],
    related: [
      { title: "Social Security at 62 or 70", href: "/guides/social-security-62-vs-70" },
      { title: "Social Security survivor benefits", href: "/guides/social-security-survivor-benefits" },
      { title: "Social Security, explained", href: "/wealth/social-security-explained" },
    ],
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
  },
  {
    slug: "roth-ira-contribution-limits-2026",
    title: "Roth IRA Contribution Limits 2026",
    description:
      "Put up to $7,500 in a Roth IRA for 2026, or $8,600 at 50 and older, if your income fits. Check the income phase-out ranges and the April 15, 2027 deadline.",
    query: "roth ira contribution limits 2026",
    opportunity:
      "The 2026 limits are fresh from IRS Notice 2025-67. A plain table of limits and phase-outs answers the question in one screen.",
    intent: "informational",
    answer:
      "For 2026 you can contribute up to $7,500 to a Roth IRA, or $8,600 if you are 50 or older by December 31. The limit is shared across all your IRAs, and your income has to fit under the phase-out ranges. You have until April 15, 2027 to contribute for 2026.",
    sections: [
      {
        title: "The 2026 limits",
        body: "The IRA limit for 2026 is $7,500 if you are under 50, and $8,600 if you are 50 or older, which includes a $1,100 catch-up. The limit applies per person, not per account, and it covers all your traditional and Roth IRAs combined. You also need at least that much taxable compensation for the year. The figures come from IRS Notice 2025-67, published November 13, 2025.",
      },
      {
        title: "The income phase-outs",
        body: "Your ability to contribute directly to a Roth IRA depends on modified adjusted gross income. For single filers and heads of household, the full contribution is available below $153,000, it shrinks between $153,000 and $168,000, and no direct contribution is allowed at $168,000 or more. For married couples filing jointly, the range is $242,000 to $252,000. Married filing separately has a $0 to $10,000 range. The IRS worksheet in Publication 590-A works out the exact reduced amount.",
      },
      {
        title: "What to do if your income is too high",
        body: "If your income is above the phase-out, a direct Roth IRA contribution is not allowed. Some people contribute to a traditional IRA and then convert it, which is often called a backdoor Roth IRA. That path has its own rules, including the pro-rata rule if you hold other pre-tax IRA money. It also creates a taxable event in the year of the conversion. This is educational information, not tax advice. Talk with a tax professional before using it.",
      },
    ],
    comparison: {
      caption: "2026 Roth IRA limits and phase-outs",
      headers: ["Your situation", "The 2026 limit"],
      rows: [
        ["Under 50", "$7,500"],
        ["50 or older", "$8,600"],
        ["Single, full contribution", "Modified AGI below $153,000"],
        ["Single, phased out", "No direct contribution at $168,000 or more"],
        ["Joint, full contribution", "Modified AGI below $242,000"],
        ["Joint, phased out", "No direct contribution at $252,000 or more"],
      ],
    },
    checklist: [
      "Confirm your taxable compensation covers the amount you plan to contribute.",
      "Check your modified AGI against the phase-out range for your filing status.",
      "Remember the $7,500 covers all your IRAs combined, not each one.",
      "Note the deadline: April 15, 2027 for 2026 contributions.",
      "If you already contributed and your income came in too high, ask a tax professional about fixing it before the deadline.",
    ],
    faqs: [
      {
        q: "Can I contribute to a Roth IRA and a 401(k) in the same year?",
        a: "Yes. The IRA and 401(k) limits are separate, so a 401(k) does not reduce your Roth IRA limit. Your income still has to fit the Roth phase-out.",
      },
      {
        q: "Is there an age limit for Roth IRA contributions?",
        a: "No. There is no maximum age. You need taxable compensation, and your income has to fit the phase-out ranges.",
      },
      {
        q: "Does the limit apply per account or per person?",
        a: "Per person. The $7,500 or $8,600 is the total across every traditional and Roth IRA you own.",
      },
    ],
    sources: [
      {
        title: "IRS: 2026 limits (IR-2025-111)",
        url: "https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500",
      },
      {
        title: "IRS: IRA contribution limits",
        url: "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-ira-contribution-limits",
      },
      {
        title: "IRS: Roth IRAs",
        url: "https://www.irs.gov/retirement-plans/roth-iras",
      },
    ],
    related: [
      { title: "Backdoor Roth IRA steps", href: "/guides/backdoor-roth-ira-steps" },
      { title: "The Roth IRA five-year rule", href: "/guides/roth-ira-five-year-rule" },
      { title: "Roth IRA, explained", href: "/wealth/roth-ira-explained" },
    ],
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
  },
  {
    slug: "qualified-charitable-distribution-qcd",
    title: "Qualified Charitable Distribution (QCD)",
    description:
      "Give up to $111,000 from your IRA straight to charity in 2026 without it counting as taxable income. See the age 70 and a half rule and how it covers your RMD.",
    query: "qualified charitable distribution qcd rules 2026",
    opportunity:
      "QCDs sit at the overlap of RMDs, charitable giving, and IRMAA. The 2026 cap is fresh, and the RMD page already draws readers who need this.",
    intent: "informational",
    answer:
      "A qualified charitable distribution lets you send up to $111,000 in 2026 directly from your IRA to a charity, without any of it counting as taxable income. You must be at least 70 and a half when the distribution happens. It counts toward your required minimum distribution and can keep your income lower for Medicare premiums.",
    sections: [
      {
        title: "Who can make one",
        body: "You must have actually reached age 70 and a half on the date of the distribution, not just during that calendar year. The money has to come from an IRA: a traditional, rollover, or inherited IRA. A distribution from a 401(k) or other workplace plan does not qualify. The transfer must go directly from the IRA custodian to the charity. If the money passes through your hands first, it is an ordinary taxable distribution.",
      },
      {
        title: "The 2026 limit",
        body: "The annual cap for 2026 is $111,000 per person, up from $108,000 in 2025, and it is indexed for inflation. A married couple where each spouse has an IRA and each meets the age rule can exclude up to $222,000 combined. There is also a once-in-a-lifetime election to direct up to $55,000 of a year's QCD to a split-interest entity such as a charitable remainder trust or a charitable gift annuity, and that counts against the $111,000 cap. If you made deductible IRA contributions after turning 70 and a half, those contributions reduce the amount you can exclude.",
      },
      {
        title: "How it helps with RMDs and IRMAA",
        body: "If you are 73 or older and owe a required minimum distribution, a QCD counts toward it dollar for dollar, up to the cap. The difference from taking the RMD and then donating is that the QCD never enters your adjusted gross income at all. That matters because adjusted gross income drives how much of your Social Security is taxed and whether you owe IRMAA surcharges on Medicare Part B and Part D two years later. A QCD also helps if you take the standard deduction, since you get the benefit without needing to itemize.",
      },
      {
        title: "What does not count",
        body: "The charity must be a public charity eligible for tax-deductible contributions. Donor-advised funds, private foundations, and supporting organizations are excluded. You cannot receive goods or services in return. The QCD must be completed by December 31 of the tax year. This is educational information, not tax advice. Confirm the charity's status and your own situation with a tax professional before making one.",
      },
    ],
    comparison: {
      caption: "QCD or take the RMD and donate",
      headers: ["Choice", "How it is taxed"],
      rows: [
        ["Qualified charitable distribution", "Never enters adjusted gross income, up to $111,000 in 2026"],
        ["Take the RMD, then donate", "The RMD is taxable income first; a deduction only helps if you itemize"],
        ["QCD and the standard deduction", "Still helps, no itemizing needed"],
        ["QCD and Medicare premiums", "Lower income can mean lower IRMAA two years later"],
      ],
    },
    checklist: [
      "Confirm you are 70 and a half on the date of the transfer.",
      "Ask your IRA custodian to send the money directly to the charity.",
      "Confirm the charity is a qualifying public charity, not a donor-advised fund or private foundation.",
      "Complete the transfer by December 31 for it to count that tax year.",
      "Check your Form 1099-R and tell your tax preparer, since custodians often do not code QCDs separately.",
    ],
    faqs: [
      {
        q: "Does a QCD count toward my required minimum distribution?",
        a: "Yes. A QCD counts toward your RMD dollar for dollar, up to the $111,000 annual cap, as long as you meet the age and direct-transfer rules.",
      },
      {
        q: "Can I make a QCD from a 401(k)?",
        a: "No. QCDs can only come from IRAs. You would need to roll the money into an IRA first, and that rollover has its own rules and timing.",
      },
      {
        q: "Can my spouse and I each make a QCD?",
        a: "Yes, if each of you has an IRA and each meets the age rule. The $111,000 cap is per person, so a couple can exclude up to $222,000 combined in 2026.",
      },
    ],
    sources: [
      {
        title: "IRS: RMD FAQs",
        url: "https://www.irs.gov/retirement-plans/retirement-plan-and-ira-required-minimum-distributions-faqs",
      },
      {
        title: "IRS Publication 590-B",
        url: "https://www.irs.gov/publications/p590b",
      },
      {
        title: "IRS Topic 451, IRAs",
        url: "https://www.irs.gov/taxtopics/tc451",
      },
    ],
    related: [
      { title: "RMDs at 73, explained", href: "/wealth/rmd-explained-73" },
      { title: "IRMAA brackets 2026", href: "/guides/irmaa-brackets-2026" },
      { title: "Roth conversion taxes", href: "/guides/roth-conversion-taxes" },
    ],
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
  },
  {
    slug: "capital-gains-tax-rates-2026",
    title: "Capital Gains Tax Rates 2026",
    description:
      "Long-term gains are taxed at 0, 15, or 20 percent based on total taxable income. See the 2026 thresholds, the 3.8 percent surtax, and how gains stack.",
    query: "capital gains tax rates 2026",
    opportunity:
      "The 2026 thresholds are fresh from Rev. Proc. 2025-32. Retirees selling investments need the stacking rule, not just the rates.",
    intent: "informational",
    answer:
      "Long-term capital gains are taxed at 0, 15, or 20 percent, based on your total taxable income. For 2026 the 0 percent rate reaches $49,450 for single filers and $98,900 for married couples filing jointly. A separate 3.8 percent surtax can apply above $200,000 of modified AGI, or $250,000 jointly.",
    sections: [
      {
        title: "Long-term or short-term",
        body: "The holding period decides the rate. Sell an asset you held more than one year and the gain is long-term, taxed at 0, 15, or 20 percent. Sell within a year and the gain is short-term, taxed as ordinary income at rates from 10 to 37 percent. The clock runs from the day after you buy to the day you sell. Losses can offset gains, and up to $3,000 of net capital losses can offset ordinary income each year, or $1,500 if married filing separately.",
      },
      {
        title: "The 2026 thresholds",
        body: "The rate depends on your total taxable income, not on the size of the gain alone. Your wages, pension, and IRA withdrawals fill the lower bands first, and the gain stacks on top. For 2026 the 0 percent rate applies to taxable income up to $49,450 single or $98,900 joint. The 15 percent rate runs to $545,500 single or $613,700 joint, and 20 percent applies above that. Heads of household get 0 percent up to $66,200 and 15 percent up to $579,600. These figures come from IRS Revenue Procedure 2025-32.",
      },
      {
        title: "The 3.8 percent net investment income tax",
        body: "On top of the capital gains rates, a 3.8 percent net investment income tax can apply to the lesser of your net investment income or the amount of modified AGI above $200,000 single or $250,000 joint. Those thresholds are fixed by law and are not adjusted for inflation. That can bring the top federal rate on a long-term gain to 23.8 percent. This is educational information, not tax advice. A tax professional can work out how the surtax applies to your return.",
      },
      {
        title: "How gains stack on other income",
        body: "Retirement income fills the bands first. Required minimum distributions, pensions, and part-time wages all count as taxable income before your gain is figured. That is why a retiree with a modest gain can still owe 15 percent: the RMDs and Social Security already used up the 0 percent room. Selling in a year with lower other income, or spreading sales across years, changes which band the gain lands in. Run the numbers before you sell, not after.",
      },
    ],
    comparison: {
      caption: "2026 long-term capital gains rates",
      headers: ["Your taxable income", "The rate"],
      rows: [
        ["Single, up to $49,450", "0 percent"],
        ["Single, $49,451 to $545,500", "15 percent"],
        ["Single, above $545,500", "20 percent"],
        ["Joint, up to $98,900", "0 percent"],
        ["Joint, $98,901 to $613,700", "15 percent"],
        ["Joint, above $613,700", "20 percent"],
      ],
    },
    checklist: [
      "Check whether you held the asset more than one year.",
      "Add up your other taxable income first, since it fills the lower bands.",
      "Check the 3.8 percent surtax thresholds of $200,000 single or $250,000 joint.",
      "Keep purchase records and sale confirmations for your cost basis.",
      "Ask a tax professional before selling, especially if the sale is large.",
    ],
    faqs: [
      {
        q: "Do I pay capital gains tax if my income is low?",
        a: "Possibly nothing. If your total taxable income stays under $49,450 single or $98,900 joint in 2026, long-term gains are taxed at 0 percent federally. State tax can still apply.",
      },
      {
        q: "Are short-term gains taxed the same way?",
        a: "No. Gains on assets held one year or less are taxed as ordinary income, at rates from 10 to 37 percent in 2026.",
      },
      {
        q: "Does North Carolina tax capital gains at 0 percent too?",
        a: "No. North Carolina taxes capital gains as ordinary income at its flat 3.99 percent rate for 2026. The federal 0 percent rate does not carry over to the state return.",
      },
    ],
    sources: [
      {
        title: "IRS Topic 409, capital gains and losses",
        url: "https://www.irs.gov/taxtopics/tc409",
      },
      {
        title: "IRS: Net investment income tax",
        url: "https://www.irs.gov/individuals/net-investment-income-tax",
      },
      {
        title: "IRS: 2026 inflation adjustments (IR-2025-103)",
        url: "https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill",
      },
    ],
    related: [
      { title: "Tax-loss harvesting and the wash sale rule", href: "/guides/tax-loss-harvesting-wash-sale" },
      { title: "Federal tax brackets 2026", href: "/guides/federal-tax-brackets-2026" },
      { title: "How are capital gains taxed", href: "/answers/how-are-capital-gains-taxed" },
    ],
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
  },
  {
    slug: "roth-conversion-taxes",
    title: "Roth Conversion Taxes, Explained",
    description:
      "A Roth conversion is taxed as ordinary income in the year you convert. See how it can lift your bracket, raise IRMAA later, and when the 5-year rule applies.",
    query: "roth conversion taxes how much",
    opportunity:
      "Conversions are the top Roth question after contribution limits. The IRMAA ripple is the part most guides skip.",
    intent: "informational",
    answer:
      "A Roth conversion moves pre-tax money from a traditional IRA or 401(k) into a Roth account, and the converted amount is taxed as ordinary income in the year you convert. It stacks on top of your other income, so it can push you into a higher bracket and raise your Medicare premiums two years later. The conversion itself carries no 10 percent early withdrawal penalty.",
    sections: [
      {
        title: "How the tax works",
        body: "The amount you convert is added to your taxable income for the year, and taxed at your ordinary rates, from 10 to 37 percent in 2026. There is no 10 percent early withdrawal penalty on the conversion itself, even if you are under 59 and a half. But if you withdraw converted money within five years and you are under 59 and a half, the 10 percent penalty can apply to that withdrawal. After-tax basis in the account is not taxed again, which is where the pro-rata rule comes in.",
      },
      {
        title: "The pro-rata rule",
        body: "If your IRA holds both pre-tax and after-tax money, you cannot convert only the after-tax part. Each conversion is treated as a proportional mix of the two. The IRS looks at all your traditional, SEP, and SIMPLE IRAs together when it works out the mix. That surprises people who made nondeductible contributions expecting to convert them tax-free. Form 8606 is where the basis is tracked, so keep it current.",
      },
      {
        title: "The IRMAA and Social Security ripple",
        body: "A conversion raises your modified adjusted gross income, and that number is what sets your Medicare premiums two years later. A conversion that pushes income over $109,000 single or $218,000 joint can add the first IRMAA tier, $81.20 a month on Part B in 2026, plus $14.50 on Part D. It can also make more of your Social Security taxable. A conversion in a low-income year, such as the years between retiring and starting Social Security, usually costs less tax than the same conversion in a high-income year.",
      },
      {
        title: "What to check before converting",
        body: "Your required minimum distribution for the year has to come out before any conversion, and the RMD itself cannot be converted. There is no income limit on conversions and no age limit, and a conversion cannot be undone once it is done. This is educational information, not tax advice. Run the numbers with a tax professional, including the IRMAA effect two years out, before converting.",
      },
    ],
    comparison: {
      caption: "What gets taxed in a Roth conversion",
      headers: ["The money", "How it is taxed"],
      rows: [
        ["Pre-tax IRA or 401(k) dollars", "Ordinary income in the year you convert"],
        ["After-tax basis", "Not taxed again, but the pro-rata rule mixes it with pre-tax money"],
        ["Earnings after the conversion", "Tax-free if the withdrawal is qualified"],
        ["The required minimum distribution", "Must come out first and cannot be converted"],
      ],
    },
    checklist: [
      "Take your RMD for the year before converting anything.",
      "Estimate the tax on the converted amount at your marginal rate.",
      "Check whether the conversion pushes your income over an IRMAA threshold.",
      "Track your after-tax basis on Form 8606.",
      "Ask a tax professional to model the conversion before you do it.",
    ],
    faqs: [
      {
        q: "Is there an income limit on Roth conversions?",
        a: "No. Anyone can convert, whatever their income. The income limits apply to Roth IRA contributions, not conversions.",
      },
      {
        q: "Can I undo a Roth conversion?",
        a: "No. Recharacterization of conversions ended with the 2017 tax law. Once a conversion is done, it stays done.",
      },
      {
        q: "Does a conversion avoid the 10 percent early withdrawal penalty?",
        a: "The conversion itself has no 10 percent penalty. But withdrawing converted money within five years before age 59 and a half can trigger the penalty on that withdrawal.",
      },
    ],
    sources: [
      {
        title: "IRS Topic 451, IRAs",
        url: "https://www.irs.gov/taxtopics/tc451",
      },
      {
        title: "IRS: Roth IRAs",
        url: "https://www.irs.gov/retirement-plans/roth-iras",
      },
      {
        title: "IRS: RMD FAQs",
        url: "https://www.irs.gov/retirement-plans/retirement-plan-and-ira-required-minimum-distributions-faqs",
      },
    ],
    related: [
      { title: "Roth conversion ladder, explained", href: "/guides/roth-conversion-ladder-explained" },
      { title: "Backdoor Roth IRA steps", href: "/guides/backdoor-roth-ira-steps" },
      { title: "RMDs at 73, explained", href: "/wealth/rmd-explained-73" },
    ],
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
  },
  {
    slug: "average-401k-balance-by-age",
    title: "Average 401(k) Balance by Age",
    description:
      "The average 401(k) balance is $167,970 and the median is $44,115, per Vanguard's 2026 report. Compare your balance by age and see why the median matters more.",
    query: "average 401k balance by age",
    opportunity:
      "Vanguard's 2026 report is fresh and widely cited. The median-versus-average framing is the honest angle other roundups skip.",
    intent: "informational",
    answer:
      "Vanguard's How America Saves 2026 report, with balances as of December 31, 2025, puts the average 401(k) balance at $167,970 and the median at $44,115. For ages 55 to 64 the average is $305,006 and the median is $107,269. The median is the better benchmark, because a few very large accounts pull the average up.",
    sections: [
      {
        title: "Average or median, which one matters",
        body: "The average is pulled up by a small number of very large accounts. The median is the balance held by the participant right in the middle, half above and half below, so it describes a typical saver far better. Across all Vanguard participants the average is $167,970 and the median is $44,115, which means the typical balance is about a quarter of the average. Compare yourself with the median for your age, not the average.",
      },
      {
        title: "The balances by age",
        body: "Balances rise with age, because older workers have had more years to contribute and more years of growth. Workers under 25 average $7,259 with a median of $2,234. Ages 25 to 34 average $50,261 with a median of $18,732. Ages 35 to 44 average $120,742 with a median of $46,919. Ages 45 to 54 average $214,991 with a median of $78,730. Ages 55 to 64 average $305,006 with a median of $107,269. At 65 and older the average is $330,186 with a median of $103,202. These figures cover about 4.6 million participants in the plans Vanguard administers.",
      },
      {
        title: "Why your balance may look different",
        body: "Vanguard's figures count only the money in one employer's plan. They leave out IRAs, former employers' plans, pensions, and home equity, so they understate many people's total retirement savings. They also reflect one provider's participants, not the whole country. Tenure matters too: a worker who changed jobs often may hold several smaller balances instead of one large one. The numbers are a yardstick, not a verdict.",
      },
      {
        title: "What to do with the comparison",
        body: "If your balance is below the median for your age, the useful question is what you can change: your contribution rate, whether you capture the full employer match, and whether old accounts are tracked in one place. If you are above the median, the same questions still apply, because the balance has to last through retirement. This guide is educational only. It does not recommend a savings target for your situation.",
      },
    ],
    comparison: {
      caption: "Average and median 401(k) balances by age",
      headers: ["Age group", "Average and median"],
      rows: [
        ["Under 25", "$7,259 average, $2,234 median"],
        ["25 to 34", "$50,261 average, $18,732 median"],
        ["35 to 44", "$120,742 average, $46,919 median"],
        ["45 to 54", "$214,991 average, $78,730 median"],
        ["55 to 64", "$305,006 average, $107,269 median"],
        ["65 and older", "$330,186 average, $103,202 median"],
      ],
    },
    checklist: [
      "Compare your balance with the median for your age, not the average.",
      "Add up every 401(k) from former employers, not just the current one.",
      "Check whether you are capturing the full employer match.",
      "Remember IRAs and pensions sit outside these figures.",
      "Recheck each year, since Vanguard publishes the report annually.",
    ],
    faqs: [
      {
        q: "What is the average 401(k) balance overall?",
        a: "Vanguard's How America Saves 2026 report puts the average at $167,970 and the median at $44,115, with balances as of December 31, 2025.",
      },
      {
        q: "Why is the median so much lower than the average?",
        a: "A small number of very large accounts pulls the average up. The median describes the middle participant, which is the better yardstick for most people.",
      },
      {
        q: "Do these figures include my IRA?",
        a: "No. They count only money inside the 401(k) or defined contribution plan Vanguard administers. IRAs, pensions, and other savings sit outside them.",
      },
    ],
    sources: [
      {
        title: "IRS: 401(k) plans",
        url: "https://www.irs.gov/retirement-plans/401k-plans",
      },
      {
        title: "IRS: 401(k) contribution limits",
        url: "https://www.irs.gov/retirement-plans/plan-participant-employee/retirement-topics-401k-and-profit-sharing-plan-contribution-limits",
      },
    ],
    related: [
      { title: "401(k) contribution limits for 2026", href: "/guides/401k-contribution-limits-2026" },
      { title: "401(k) early withdrawal exceptions", href: "/guides/401k-early-withdrawal-exceptions" },
      { title: "How a 401(k) works", href: "/wealth/401k-explained" },
    ],
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
  },
  {
    slug: "how-much-emergency-fund",
    title: "How Much Emergency Fund Do You Need?",
    description:
      "Start with one month of expenses, build to three to six, and keep it in a separate insured savings account. The 50/30/20 budget rule shows how to fund it.",
    query: "how much emergency fund do i need",
    opportunity:
      "The 50/30/20 rule and the where-to-keep-it question are the two follow-ups every emergency fund search raises. One page answers both.",
    intent: "informational",
    answer:
      "Most households should aim for three to six months of essential expenses in a separate savings account. Start with one month, which covers most car repairs and insurance deductibles, then build from there. Single-income households and people with variable pay should aim for the higher end.",
    sections: [
      {
        title: "Start with one month, then build to three to six",
        body: "One month of essential expenses is the first goal. It covers the surprises that come up most: a car repair, a broken appliance, a health insurance deductible. Three months is a solid cushion for a two-income household with steady pay. Six months fits a single-income household, a self-employed worker, or anyone whose job search would take a while. More than six months makes sense if your income is seasonal or your industry hires slowly.",
      },
      {
        title: "The 50/30/20 budget rule",
        body: "The 50/30/20 rule splits after-tax income into three buckets: about 50 percent for needs such as housing, food, transport, and insurance; about 30 percent for wants such as eating out, travel, and hobbies; and about 20 percent for savings and extra debt payments. Your emergency fund comes out of the 20 percent bucket. If needs take more than half your income, that is common, and the fix is to shrink the wants bucket first rather than skipping savings entirely. Even 5 percent toward the fund beats nothing.",
      },
      {
        title: "Where to keep it",
        body: "Keep the fund in a separate savings account or money market account, away from everyday spending money, so it is there when you need it and not tempting when you do not. It should be reachable within a few days without selling anything. A high-yield savings account pays more interest than a basic one, but the rate is not the point: ready access and safety are. Look for an account insured by the FDIC or NCUA, which protects deposits up to $250,000 per depositor, per insured bank, for each account ownership category. Do not invest the emergency fund in stocks, because it can fall right when you need it.",
      },
      {
        title: "When to use it, and how to rebuild",
        body: "Use the fund for true surprises: a job loss, a major repair, a medical bill you did not plan for. A sale, a vacation, or a holiday is not an emergency, and pulling from the fund for those leaves you exposed. After you use it, rebuild it before raising other spending again, even if that means small transfers for a while. If you carry high-interest debt, build the one-month cushion first, then split extra money between the fund and the debt.",
      },
    ],
    comparison: {
      caption: "How much emergency fund fits your household",
      headers: ["Your situation", "A good target"],
      rows: [
        ["First goal, everyone", "One month of essential expenses"],
        ["Two incomes, steady pay", "Three months of essential expenses"],
        ["One income or variable pay", "Six months of essential expenses"],
        ["Seasonal income or slow hiring", "More than six months"],
        ["High-interest debt", "One month first, then split extra money with the debt"],
      ],
    },
    checklist: [
      "Add up one month of essential expenses: housing, food, transport, insurance, minimum debt payments.",
      "Open a separate savings account so the fund is not mixed with spending money.",
      "Set an automatic transfer, even a small one, on payday.",
      "Check that the account is FDIC or NCUA insured.",
      "After any withdrawal, rebuild the fund before raising other spending.",
    ],
    faqs: [
      {
        q: "Is three months enough, or do I need six?",
        a: "Three months fits a two-income household with steady pay. Six months fits a single income, variable pay, or a job that would take a while to replace.",
      },
      {
        q: "Should I keep my emergency fund in a high-yield savings account?",
        a: "That is a reasonable place for it: insured, reachable in a few days, and paying more interest than a basic account. The rate matters less than ready access and safety.",
      },
      {
        q: "Should I pay off debt or build the fund first?",
        a: "Build one month of expenses first, so a surprise does not go back on a card. Then split extra money between the fund and the debt.",
      },
    ],
    sources: [
      {
        title: "CFPB: An essential guide to building an emergency fund",
        url: "https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/",
      },
      {
        title: "FDIC: Deposit insurance",
        url: "https://www.fdic.gov/resources/deposit-insurance/",
      },
    ],
    related: [
      { title: "High-yield savings or money market", href: "/guides/hysa-vs-money-market-account" },
      { title: "How much should I have in an emergency fund", href: "/answers/how-much-should-i-have-in-an-emergency-fund" },
      { title: "The broke money reset plan", href: "/wealth/broke-money-reset-plan" },
    ],
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
  },
  {
    slug: "federal-tax-brackets-2026",
    title: "Federal Tax Brackets 2026",
    description:
      "Seven federal rates, 10 to 37 percent, apply slice by slice to taxable income. See the full 2026 thresholds, the standard deduction, and a worked example.",
    query: "federal tax brackets 2026",
    opportunity:
      "The 2026 brackets are fresh from Rev. Proc. 2025-32. The worked example corrects the most common misunderstanding, that the top bracket taxes everything.",
    intent: "informational",
    answer:
      "Federal income tax uses seven marginal rates, 10, 12, 22, 24, 32, 35, and 37 percent. For 2026 a single filer pays 10 percent on the first $12,400 of taxable income and reaches 37 percent only above $640,600. The standard deduction is $16,100 single or $32,200 joint.",
    sections: [
      {
        title: "Marginal means slice by slice",
        body: "Your top bracket is not the rate you pay on all your income. Each rate applies only to the slice of taxable income inside that bracket. A single filer with $100,000 of taxable income in 2026 owes $16,712: $1,240 on the first $12,400, plus 12 percent of the next $38,000, plus 22 percent of the remaining $49,600. That is an effective rate of about 16.7 percent, not 22 percent. Taxable income is what is left after the standard or itemized deduction, not your gross pay.",
      },
      {
        title: "The 2026 thresholds",
        body: "The rates are unchanged from 2025 and were made permanent. Only the thresholds moved, for inflation. For single filers the brackets run: 10 percent to $12,400, 12 percent to $50,400, 22 percent to $105,700, 24 percent to $201,775, 32 percent to $256,225, 35 percent to $640,600, and 37 percent above that. For married couples filing jointly: 10 percent to $24,800, 12 percent to $100,800, 22 percent to $211,400, 24 percent to $403,550, 32 percent to $512,450, 35 percent to $768,700, and 37 percent above that. These figures come from IRS Revenue Procedure 2025-32.",
      },
      {
        title: "The standard deduction",
        body: "Before any bracket applies, you subtract the standard deduction or your itemized deductions. For 2026 the standard deduction is $16,100 for single filers, $32,200 for married couples filing jointly, and $24,150 for heads of household. There is also a new $6,000 additional deduction for taxpayers 65 and older. North Carolina has its own standard deduction, $12,750 single or $25,500 joint, which is separate from the federal figures.",
      },
      {
        title: "How retirement income moves you between brackets",
        body: "Required minimum distributions, pensions, and Roth conversions all land in taxable income, so they can push you into a higher bracket in a year you did not expect. That is why the same withdrawal can cost 12 percent one year and 22 percent the next. Spreading withdrawals or conversions across low-income years keeps more of each dollar in the lower brackets. This is educational information, not tax advice. A tax professional can model your brackets before you withdraw or convert.",
      },
    ],
    comparison: {
      caption: "2026 federal tax brackets, single and joint",
      headers: ["Bracket", "Taxable income up to"],
      rows: [
        ["10 percent rate", "Single to $12,400, joint to $24,800"],
        ["12 percent rate", "Single to $50,400, joint to $100,800"],
        ["22 percent rate", "Single to $105,700, joint to $211,400"],
        ["24 percent rate", "Single to $201,775, joint to $403,550"],
        ["32 percent rate", "Single to $256,225, joint to $512,450"],
        ["35 percent rate", "Single to $640,600, joint to $768,700"],
        ["37 percent rate", "Single above $640,600, joint above $768,700"],
      ],
    },
    checklist: [
      "Figure your taxable income first: gross income minus the standard or itemized deduction.",
      "Find your marginal bracket, then remember your effective rate is lower.",
      "Check the $6,000 additional deduction if you are 65 or older.",
      "Before a large withdrawal or conversion, check which bracket it lands in.",
      "Ask a tax professional if your income crosses a bracket line this year.",
    ],
    faqs: [
      {
        q: "If I am in the 22 percent bracket, do I pay 22 percent on everything?",
        a: "No. Only the income inside the 22 percent slice is taxed at 22 percent. The income below it is taxed at 10 and 12 percent.",
      },
      {
        q: "What is the standard deduction for 2026?",
        a: "$16,100 for single filers, $32,200 for married couples filing jointly, and $24,150 for heads of household, per IRS Revenue Procedure 2025-32.",
      },
      {
        q: "Do the 2026 brackets apply to the return I file in 2026?",
        a: "No. The 2026 brackets apply to income earned in 2026, reported on the return you file in early 2027.",
      },
    ],
    sources: [
      {
        title: "IRS: 2026 inflation adjustments (IR-2025-103)",
        url: "https://www.irs.gov/newsroom/irs-releases-tax-inflation-adjustments-for-tax-year-2026-including-amendments-from-the-one-big-beautiful-bill",
      },
      {
        title: "IRS Topic 409, capital gains and losses",
        url: "https://www.irs.gov/taxtopics/tc409",
      },
    ],
    related: [
      { title: "Capital gains tax rates 2026", href: "/guides/capital-gains-tax-rates-2026" },
      { title: "Roth conversion taxes", href: "/guides/roth-conversion-taxes" },
      { title: "How tax brackets work", href: "/wealth/tax-brackets-explained-plainly" },
    ],
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
  },
  {
    slug: "north-carolina-taxes-on-retirement-income",
    title: "North Carolina Taxes on Retirement Income",
    description:
      "North Carolina taxes retirement income at a flat 3.99 percent in 2026, but Social Security is fully exempt. See the Bailey settlement and what a retiree pays.",
    query: "north carolina taxes on retirement income",
    opportunity:
      "The local angle: a flat 3.99 percent rate, full Social Security exemption, and the Bailey settlement are exactly what Triad retirees ask about.",
    intent: "informational",
    answer:
      "North Carolina taxes income at a flat 3.99 percent for 2026, down from 4.25 percent in 2025. Social Security benefits are fully exempt from state tax. Most 401(k), IRA, and pension income is taxed at 3.99 percent, with an exemption for qualifying government retirees under the Bailey settlement.",
    sections: [
      {
        title: "The flat 3.99 percent rate",
        body: "North Carolina charges one flat rate on taxable income, not graduated brackets. For tax years beginning after 2025 the rate is 3.99 percent. Before the rate applies, you subtract the North Carolina standard deduction, $12,750 for single filers or $25,500 for married couples filing jointly, or your North Carolina itemized deductions. North Carolina starts from your federal adjusted gross income, then applies its own additions and subtractions.",
      },
      {
        title: "Social Security is not taxed by North Carolina",
        body: "Social Security benefits are fully exempt from North Carolina income tax, whatever your other income. If Social Security was included in your federal adjusted gross income, you subtract the full amount on your state return. Railroad retirement benefits get the same treatment. That is a real difference from the federal return, where up to 85 percent of Social Security can be taxable.",
      },
      {
        title: "The Bailey settlement, and who it covers",
        body: "The Bailey settlement, from the North Carolina Supreme Court decision in Bailey v. State of North Carolina, exempts retirement benefits for certain government retirees. It covers retirees of North Carolina state and local government systems and federal civilian and military systems, including the Teachers' and State Employees' Retirement System and the federal Civil Service and Federal Employees' Retirement Systems, if they had five or more years of creditable service as of August 12, 1989. Military retirement pay is also fully exempt for retirees with 20 or more years of service or a medical retirement. Private pensions, 401(k) distributions, and IRA withdrawals outside Bailey are taxed at 3.99 percent.",
      },
      {
        title: "What a typical retiree pays",
        body: "Take a single retiree with $40,000 of 401(k) withdrawals and $24,000 of Social Security. North Carolina subtracts the $24,000 of Social Security entirely, leaving $40,000, then subtracts the $12,750 standard deduction, leaving $27,250 of taxable income. At 3.99 percent the state tax is $1,087. A Bailey-covered retiree with the same numbers would owe nothing on the pension itself. This is educational information, not tax advice. Confirm your own figures with the North Carolina Department of Revenue or a tax professional.",
      },
    ],
    comparison: {
      caption: "How North Carolina treats retirement income in 2026",
      headers: ["Income", "North Carolina treatment"],
      rows: [
        ["Social Security benefits", "Fully exempt"],
        ["401(k) and IRA withdrawals", "Taxed at 3.99 percent after deductions"],
        ["Private pensions", "Taxed at 3.99 percent after deductions"],
        ["Bailey-covered government pensions", "Exempt if vested by August 12, 1989"],
        ["Military retirement pay", "Exempt with 20 or more years of service or a medical retirement"],
      ],
    },
    checklist: [
      "Subtract your full Social Security amount from federal AGI on the state return.",
      "Check whether your pension qualifies under the Bailey settlement.",
      "Use the North Carolina standard deduction, $12,750 single or $25,500 joint, not the federal one.",
      "Remember the rate is 3.99 percent for 2026, down from 4.25 percent in 2025.",
      "Ask a tax professional before assuming any retirement income is exempt.",
    ],
    faqs: [
      {
        q: "Does North Carolina tax Social Security?",
        a: "No. Social Security benefits are fully exempt from North Carolina income tax. Subtract the full amount included in your federal AGI on your state return.",
      },
      {
        q: "What is the Bailey settlement?",
        a: "A court settlement that exempts retirement benefits for certain state, local, and federal government retirees who had five or more years of creditable service as of August 12, 1989.",
      },
      {
        q: "Do I pay North Carolina tax on a 401(k) withdrawal?",
        a: "Generally yes, at the flat 3.99 percent rate for 2026, after the standard deduction. The exceptions are Bailey-covered pensions and qualifying military retirement pay.",
      },
    ],
    sources: [
      {
        title: "SSA: Income taxes and Social Security",
        url: "https://www.ssa.gov/benefits/retirement/planner/taxes.html",
      },
      {
        title: "IRS: RMD FAQs",
        url: "https://www.irs.gov/retirement-plans/retirement-plan-and-ira-required-minimum-distributions-faqs",
      },
    ],
    related: [
      { title: "Federal tax brackets 2026", href: "/guides/federal-tax-brackets-2026" },
      { title: "IRMAA brackets 2026", href: "/guides/irmaa-brackets-2026" },
      { title: "RMDs at 73, explained", href: "/wealth/rmd-explained-73" },
    ],
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
  },
  {
    slug: "how-to-improve-credit-score",
    title: "How to Improve Your Credit Score",
    description:
      "Pay on time, keep card balances low, and give it time. See the FICO bands, the five factors and their weights, and how to build a first score from zero.",
    query: "how to improve my credit score",
    opportunity:
      "Credit is the most-searched money topic in this batch. The utilization lever and the starting-from-zero path are the two answers readers actually need.",
    intent: "informational",
    answer:
      "Pay every bill on time, keep credit card balances low, and give it time. Payment history is 35 percent of a FICO score and amounts owed are 30 percent, so those two factors carry nearly two-thirds of the weight. The national average FICO score is about 715, which sits in the good range.",
    sections: [
      {
        title: "What is a good credit score",
        body: "Most lenders use FICO scores, which run from 300 to 850. The bands are: 300 to 579 poor, 580 to 669 fair, 670 to 739 good, 740 to 799 very good, and 800 to 850 exceptional. The national average FICO score was about 715 in 2025, per Experian, which sits in the good range. Lenders set their own cutoffs, so a good score helps but does not guarantee approval or a particular rate.",
      },
      {
        title: "The five factors and their weights",
        body: "FICO builds a score from five categories in your credit report. Payment history counts for about 35 percent: on-time payments help, and a payment 30 or more days late hurts. Amounts owed counts for about 30 percent, driven mostly by credit card balances compared with limits. Length of credit history is about 15 percent. New credit is about 10 percent, including hard inquiries and recently opened accounts. Credit mix is about 10 percent.",
      },
      {
        title: "The only fast lever: utilization under 10 percent",
        body: "Utilization is your card balances divided by your limits. If your limits total $10,000 and your balances total $3,000, utilization is 30 percent. Paying balances down before the statement closes, not just before the due date, is what moves the number, because the statement balance is usually what gets reported. Under 30 percent is the usual guidance, and under 10 percent is where the best scores cluster. It is the one factor you can change in a single billing cycle.",
      },
      {
        title: "Starting from zero",
        body: "With no credit file, there is nothing to score. A secured credit card, where you put down a deposit that becomes your limit, is the usual first step. Becoming an authorized user on a family member's card with a long, clean history can add that history to your file. A first score usually appears after about six months of activity on an account. Keep the oldest card open even if you rarely use it, since closing it can shorten your history and raise utilization.",
      },
    ],
    comparison: {
      caption: "FICO score bands",
      headers: ["Your score", "The band"],
      rows: [
        ["300 to 579", "Poor"],
        ["580 to 669", "Fair"],
        ["670 to 739", "Good"],
        ["740 to 799", "Very good"],
        ["800 to 850", "Exceptional"],
      ],
    },
    checklist: [
      "Pull your free reports at AnnualCreditReport.com and dispute any errors.",
      "Pay every bill on time, even the minimum, and set up autopay if it helps.",
      "Pay card balances down before the statement closes, aiming under 10 percent of limits.",
      "Keep your oldest card open and avoid opening several new accounts at once.",
      "Give it time: late payments fade after about two years and fall off after seven.",
    ],
    faqs: [
      {
        q: "How fast can my score improve?",
        a: "Utilization can move a score within one billing cycle after balances are paid down. Payment history takes longer: a late payment keeps hurting for about two years and falls off after seven.",
      },
      {
        q: "Does checking my own score hurt it?",
        a: "No. Checking your own score or report is a soft inquiry and does not affect your score. Hard inquiries from applications can lower it slightly.",
      },
      {
        q: "Can I get a score with no credit history?",
        a: "Not yet. A first score usually appears after about six months of activity on an account. A secured card or authorized user status can start the file.",
      },
    ],
    sources: [
      {
        title: "CFPB: Credit reports and scores",
        url: "https://www.consumerfinance.gov/consumer-tools/credit-reports-and-scores/",
      },
      {
        title: "CFPB: What is a credit score",
        url: "https://www.consumerfinance.gov/ask-cfpb/what-is-a-credit-score-en-319/",
      },
    ],
    related: [
      { title: "Credit utilization, explained", href: "/guides/credit-utilization-explained" },
      { title: "Hard inquiry or soft inquiry", href: "/guides/hard-inquiry-vs-soft-inquiry" },
      { title: "How are credit scores calculated", href: "/answers/how-are-credit-scores-calculated" },
    ],
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
  },
  {
    slug: "how-much-does-term-life-insurance-cost",
    title: "How Much Does Term Life Insurance Cost?",
    description:
      "Term life cost by age, coverage amount, and term length, with published 2026 sample rates for a healthy nonsmoker. See what moves the price before you shop.",
    query: "how much does term life insurance cost per month",
    opportunity:
      "High-volume cost question with thin national answers; dated sample rates with a stated profile beat generic ranges.",
    intent: "informational",
    answer:
      "For a healthy nonsmoker, a $500,000 20-year term policy runs about $15 to $27 a month at ages 30 to 40 in NerdWallet's October 2026 sample rates, and about $53 to $68 a month at 50. Your own price depends on age, health, smoking, coverage amount, and term length.",
    sections: [
      {
        title: "What term life costs at each age",
        body: "NerdWallet's average rates, published October 1, 2026 from LifeStein.com data, use a $500,000 20-year term policy for a nonsmoker in preferred health, averaging the three lowest rates at each age. Annual premiums for men are $209 at 20, $213 at 30, $321 at 40, $810 at 50, and $2,335 at 60. For women they are $175, $182, $278, $636, and $1,640. As monthly equivalents that is about $17, $18, $27, $68, and $195 for men, and about $15, $15, $23, $53, and $137 for women. These are sample averages, not quotes, and your price will differ by insurer, health, and state.",
      },
      {
        title: "What coverage amount does to the price",
        body: "MoneyGeek's September 2026 survey of quotes from 21 carriers, for a 40-year-old nonsmoker in average health on a 20-year term, puts monthly premiums at $28 for $250,000, $47 for $500,000, and $86 for $1 million for women, and $35, $59, and $109 for men. Doubling the coverage does not double the price, because part of the premium covers the insurer's fixed costs. If you are choosing between $250,000 and $500,000, ask for both prices before you decide.",
      },
      {
        title: "10 vs 20 vs 30 years",
        body: "NerdWallet's October 2026 rates for a healthy 40-year-old nonsmoker on a $500,000 policy show the tradeoff clearly. A 10-year term runs $200 a year for a man and $175 for a woman. A 20-year term runs $321 and $278. A 30-year term runs $574 and $451. The longer term costs more each year but locks the rate in for longer. Match the term to the need: the years left on a mortgage, or the years until your children are grown. A 30-year term bought at 50 is rarely offered, so older buyers usually choose 10 or 20 years.",
      },
      {
        title: "What happens when the term expires",
        body: "If you outlive the term, the policy ends and pays nothing. That is how term life works, and it is why the price is low. Many policies let you renew year by year after the term, but the renewal premium is set at your older age and is usually much higher. Some policies let you convert to permanent coverage during a stated window without a new medical exam. Read the conversion and renewal language before you buy, not after the term runs out.",
      },
      {
        title: "What moves your price most",
        body: "Age is the biggest driver, and the curve steepens after 50. Smoking is next: a 40-year-old man who smokes averages $1,448 a year for the same $500,000 20-year policy that costs a nonsmoker $321, in NerdWallet's October 2026 data. Health class matters too. For that same 40-year-old man, the annual premium is $321 in the best health class, $405 in preferred, and $631 in standard. Women pay less than men at the same age because women live longer on average. Term length and coverage amount round out the list.",
      },
    ],
    comparison: {
      caption: "Longer terms cost more per year but lock the rate in longer",
      headers: ["Term length", "Annual premium at 40, $500,000"],
      rows: [
        ["10 years", "$200 a year for a man, $175 for a woman"],
        ["20 years", "$321 a year for a man, $278 for a woman"],
        ["30 years", "$574 a year for a man, $451 for a woman"],
      ],
    },
    checklist: [
      "Decide the coverage amount from your debts, income to replace, and mortgage, not from a round number.",
      "Match the term length to the years the money is actually needed.",
      "Compare the same coverage, term, and health class across insurers.",
      "Check renewal and conversion language before you buy.",
    ],
    faqs: [
      {
        q: "What is the cheapest age to buy term life insurance?",
        a: "In your 20s. A $500,000 20-year policy runs about $15 to $18 a month for a healthy nonsmoker in NerdWallet's October 2026 sample rates. The price rises with every birthday, and it rises fastest after 50.",
      },
      {
        q: "Does my term life premium change during the term?",
        a: "On a level term policy, no. The premium stays the same for the full 10, 20, or 30 years as long as you keep paying. Renewal after the term is priced at your older age.",
      },
      {
        q: "Can I renew term life after the term ends?",
        a: "Many policies allow annual renewal, but the premium jumps to reflect your age at renewal. Some policies also let you convert to permanent coverage within a stated window. Check both options in the contract.",
      },
      {
        q: "Is $500,000 of term life enough?",
        a: "It depends on your income, mortgage, debts, and how many years your family would need support. A family earning $65,000 with a $220,000 mortgage and college ahead usually needs more than $500,000. Run the numbers with the DIME method first.",
      },
    ],
    sources: [
      {
        title: "IRS: Life insurance and disability insurance proceeds",
        url: "https://www.irs.gov/faqs/interest-dividends-other-types-of-income/life-insurance-disability-insurance-proceeds/life-insurance-disability-insurance-proceeds",
      },
      {
        title: "SSA: Survivor benefits",
        url: "https://www.ssa.gov/benefits/survivors/",
      },
    ],
    related: [
      { title: "Life insurance needs calculator", href: "/tools/life-insurance-needs" },
      { title: "Life insurance help in the Triad", href: "/life-insurance" },
      { title: "How much does whole life insurance cost?", href: "/guides/how-much-does-whole-life-insurance-cost" },
      { title: "How much life insurance do I need?", href: "/answers/how-much-life-insurance-do-i-need" },
    ],
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
  },
  {
    slug: "best-term-life-insurance-companies",
    title: "How to Compare Term Life Insurance Companies",
    description:
      "No single carrier is best for everyone. Compare term life companies on financial strength, complaints, price for the same profile, term lengths, and conversion.",
    query: "best term life insurance companies",
    opportunity:
      "Comparison framing for a ranking query; reports published rankings with method, never a carrier recommendation.",
    intent: "informational",
    answer:
      "Compare insurers on the same profile and the same policy, then check financial strength and complaint records. Published 2026 rankings name the same few strong companies, but the right one for you depends on your health, age, and term length. This page reports what the rankings say. It does not recommend a carrier.",
    sections: [
      {
        title: "Start with the same profile, not the same ad",
        body: "A price only means something next to an identical price. Get quotes for the same coverage amount, the same term length, and the same health class from each insurer, then compare. In NerdWallet's October 2026 term list, sample monthly rates for the same healthy nonsmoking 40-year-old on a $500,000 20-year policy ranged from $31 to $40 for men and $26 to $38 for women across the five companies named. The spread is real money over 20 years, and it is why comparing matters more than picking a name.",
      },
      {
        title: "How published rankings score companies",
        body: "NerdWallet's 2026 life insurance ratings reviewed 445 insurers, assessed 210 policies, and analyzed 1,515 data points. Financial strength counts for 35 percent, using AM Best ratings to confirm an insurer can pay claims decades from now. Consumer complaints count for 35 percent, using National Association of Insurance Commissioners data on complaints to state regulators over three years. Consumer experience counts for 20 percent, and transparency counts for 10 percent. Knowing the weights keeps a ranking in perspective: a company can top a list on service and strength while another beats it on price.",
      },
      {
        title: "What the 2026 rankings actually show",
        body: "NerdWallet's October 2026 term life list names five companies, all scoring 4.9 or 5.0 out of 5. Guardian scores 5.0 and is noted for applicants with health conditions, with term lengths of 1, 10, 15, 20, or 30 years and sample rates of $31 a month for a man and $26 for a woman. New York Life scores 4.9 and is noted for annual renewable term, at $36 and $30. USAA scores 5.0 and is noted for military members, at $32 and $37. Northwestern Mutual scores 4.9 and is noted for customer experience, at $40 and $38. Thrivent scores 5.0 and is noted for conversion options, at $37 and $31, and its policies require a Christian affiliation. Sample rates assume a $500,000 20-year term policy for a healthy nonsmoking 40-year-old. These are NerdWallet's picks, not a recommendation from this site.",
      },
      {
        title: "Read the AM Best rating and the NAIC complaint index",
        body: "AM Best grades financial strength. A++ and A+ mean Superior, and A and A- mean Excellent. A strong grade says the insurer is built to pay claims far in the future. The NAIC complaint index compares a company's complaints to what is expected for a company its size. An index of 1.0 is the expected level. Below 1.0 means fewer complaints than expected. MoneyGeek's September 2026 analysis gives an example of the range: Banner Life at 0.16 and Transamerica at 3.86, while all seven companies in its list hold AM Best ratings of A- or higher. Check the current rating and complaint index for the company that would issue your policy before you buy.",
      },
      {
        title: "Six things to compare before you choose",
        body: "First, price for the same profile, coverage, and term. Second, term lengths: 10, 15, 20, or 30 years, or an annual renewable policy. Third, conversion: can you switch to permanent coverage later without a new exam, and until what age. Fourth, no-exam limits: how much coverage you can buy without a medical exam. Fifth, renewal terms: what happens when the term ends. Sixth, riders: waiver of premium, accelerated death benefit, and child riders, and what each one adds to the premium.",
      },
    ],
    comparison: {
      caption: "Six checks before you pick a term life company",
      headers: ["Check", "What to look for"],
      rows: [
        ["AM Best rating", "A++ or A+ (Superior), or A (Excellent)"],
        ["NAIC complaint index", "Below 1.0 means fewer complaints than expected for its size"],
        ["Price", "Same coverage amount, term length, and health class"],
        ["Term lengths", "10, 15, 20, or 30 years, or annual renewable"],
        ["Conversion", "Can you switch to permanent coverage without a new exam"],
        ["No-exam limit", "How much coverage you can buy without a medical exam"],
      ],
    },
    checklist: [
      "Get quotes for identical coverage, term, and health class.",
      "Check the AM Best rating and the NAIC complaint index.",
      "Confirm conversion and renewal terms in writing.",
      "Compare the total 20-year cost, not just the first year.",
    ],
    faqs: [
      {
        q: "Is there one best term life insurance company?",
        a: "No. Published 2026 rankings name the same few strong companies, but the lowest price for your age, health, and term length changes from person to person. Compare on your own profile.",
      },
      {
        q: "What does an AM Best rating measure?",
        a: "Financial strength: the insurer's ability to pay claims far into the future. A++ and A+ are labeled Superior, and A and A- are labeled Excellent.",
      },
      {
        q: "What is a good NAIC complaint index?",
        a: "Below 1.0 means the company drew fewer complaints than expected for a company its size. Above 1.0 means more than expected. Check the index for the company that would issue your policy.",
      },
      {
        q: "Should I just pick the cheapest quote?",
        a: "Not on price alone. A low-priced quote with no conversion option, a short term, or a weak complaint record can cost more later. Compare price, term, conversion, and complaint history together.",
      },
    ],
    sources: [
      {
        title: "IRS: Life insurance and disability insurance proceeds",
        url: "https://www.irs.gov/faqs/interest-dividends-other-types-of-income/life-insurance-disability-insurance-proceeds/life-insurance-disability-insurance-proceeds",
      },
      {
        title: "SSA: Survivor benefits",
        url: "https://www.ssa.gov/benefits/survivors/",
      },
    ],
    related: [
      { title: "How much does term life insurance cost?", href: "/guides/how-much-does-term-life-insurance-cost" },
      { title: "Term life with no medical exam", href: "/answers/term-life-insurance-no-medical-exam" },
      { title: "Life insurance help in the Triad", href: "/life-insurance" },
    ],
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
  },
  {
    slug: "life-insurance-for-seniors",
    title: "Life Insurance for Seniors: Options After 60",
    description:
      "Term, whole life, and final expense options for people in their 60s, 70s, and 80s, with published cost ranges by age and guaranteed issue tradeoffs explained.",
    query: "life insurance for seniors",
    opportunity:
      "Senior hub for term at 60-69, final expense at 70+, and guaranteed issue as last resort; cost by age anchors the page.",
    intent: "informational",
    answer:
      "After 60, term still works for a time-limited need, final expense fits a small lifelong need, and guaranteed issue is a last resort with higher premiums and a waiting period. Costs rise fast with age, so waiting rarely helps.",
    sections: [
      {
        title: "Term life at 60 to 69",
        body: "Term still works at 60 when the need has an end date, like a mortgage or income for a spouse. NerdWallet's October 2026 sample rates for a $500,000 20-year term policy for a preferred-health nonsmoker put a 60-year-old man at $2,335 a year, about $195 a month, and a woman at $1,640 a year, about $137 a month. At 70 the same policy jumps to $9,702 a year for a man and $7,934 for a woman. A 20-year term bought at 70 also runs past the need for most families, so a 10-year term usually fits better at that age, and fewer insurers offer long terms to older applicants.",
      },
      {
        title: "Final expense at 70 and older",
        body: "Final expense is a small whole life policy, usually $5,000 to $25,000, meant to cover funeral and burial costs. MoneyGeek's September 2026 averages for a $10,000 simplified-issue policy for a non-tobacco applicant put monthly premiums at $64 for a 70-year-old woman and $84 for a man, $87 and $113 at 75, and $125 and $164 at 80. Premiums stay level for life once the policy is issued. The benefit goes to whoever you name, and they can use it for the funeral, burial or cremation, and the smaller bills that follow.",
      },
      {
        title: "Guaranteed issue as a last resort",
        body: "Guaranteed issue means no health questions and no medical exam. That access comes with tradeoffs you should understand before you apply. Premiums run higher than simplified issue for the same benefit, maximums are smaller, often around $25,000, and most policies carry a graded death benefit. That usually means a two-year waiting period: if death comes from illness in the first two years, the beneficiary typically gets back the premiums paid plus interest, often about 10 percent, instead of the full face amount. Accidental death usually pays the full benefit from day one, and after the waiting period the full benefit applies for any cause. Some policies use a three-year period instead of two.",
      },
      {
        title: "What coverage costs by age",
        body: "The price curve is steep. For a man, NerdWallet's October 2026 term rates rise from $321 a year at 40 to $2,335 at 60, more than seven times as much for the same $500,000 20-year policy. Final expense roughly doubles between 70 and 80 in MoneyGeek's September 2026 averages. That is why buying earlier matters, and why a smaller policy now is usually better than waiting for a health picture that may not improve.",
      },
      {
        title: "What to ask before you buy",
        body: "Ask whether the premium can change, whether there is a waiting period before the full benefit pays, what health questions the application asks, who receives the benefit and how fast it is paid, and what happens if you stop paying premiums. Bring any policy you already have to the conversation. If what you have already covers the need, the right answer may be to keep it.",
      },
    ],
    comparison: {
      caption: "Which option fits which need after 60",
      headers: ["Option", "Who it fits"],
      rows: [
        ["Term life", "A large need with a clear end date, like a mortgage or income for a spouse"],
        ["Whole life", "A lifelong need with a level premium and cash value"],
        ["Final expense", "A small lifelong need, mainly funeral and burial costs"],
        ["Guaranteed issue", "When health questions would turn you down elsewhere, with the waiting period understood"],
      ],
    },
    checklist: [
      "Name the need first: income for a spouse, a mortgage, or funeral costs.",
      "Compare term for a time-limited need and final expense for a small lifelong need.",
      "Read the waiting period on any guaranteed issue policy.",
      "Review beneficiaries after every big family change.",
    ],
    faqs: [
      {
        q: "Can I get term life insurance at 70?",
        a: "Often yes, but it is expensive and long terms are harder to find. A $500,000 20-year term policy averages $9,702 a year for a 70-year-old man and $7,934 for a woman in NerdWallet's October 2026 sample rates. A 10-year term or a final expense policy usually fits better.",
      },
      {
        q: "What does final expense insurance cover?",
        a: "It is a small whole life policy, usually $5,000 to $25,000, that pays a lump sum to whoever you name. Families use it for the funeral, burial or cremation, and smaller end-of-life bills.",
      },
      {
        q: "What is a graded death benefit?",
        a: "It means the full face amount does not apply right away. On most guaranteed issue policies, a death from illness in the first two years returns the premiums paid plus interest, often about 10 percent, instead of the full benefit. Accidental death usually pays in full from day one.",
      },
      {
        q: "Is it too late to buy life insurance at 80?",
        a: "Not necessarily. Final expense policies are commonly available into the 80s. MoneyGeek's September 2026 averages put a $10,000 policy at about $125 a month for an 80-year-old woman and $164 for a man. Eligibility, cost, and benefit amounts depend on age, health answers, and the policy.",
      },
    ],
    sources: [
      {
        title: "IRS: Life insurance and disability insurance proceeds",
        url: "https://www.irs.gov/faqs/interest-dividends-other-types-of-income/life-insurance-disability-insurance-proceeds/life-insurance-disability-insurance-proceeds",
      },
      {
        title: "SSA: Survivor benefits",
        url: "https://www.ssa.gov/benefits/survivors/",
      },
    ],
    related: [
      { title: "Final expense insurance for seniors over 70", href: "/guides/final-expense-insurance-for-seniors-over-70" },
      { title: "Final expense insurance in Greensboro", href: "/final-expense-insurance" },
      { title: "How much does term life insurance cost?", href: "/guides/how-much-does-term-life-insurance-cost" },
    ],
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
  },
  {
    slug: "how-much-does-whole-life-insurance-cost",
    title: "How Much Does Whole Life Insurance Cost?",
    description:
      "Whole life cost by age for a $500,000 policy, why it costs about ten times term at 40, how cash value works, and when it fits better than term coverage.",
    query: "how much does whole life insurance cost",
    opportunity:
      "Cost anchor for the permanent side; the ten-times-term multiple at 40 is the memorable frame.",
    intent: "informational",
    answer:
      "A $500,000 whole life policy runs about $237 to $265 a month for a healthy 40-year-old nonsmoker in NerdWallet's October 2026 sample rates, roughly ten times the cost of 20-year term for the same death benefit. You pay for lifelong coverage and cash value.",
    sections: [
      {
        title: "Whole life cost by age",
        body: "NerdWallet's average rates, published October 1, 2026 from LifeStein.com data, use a $500,000 whole life policy for a nonsmoker in preferred health, averaging the three lowest rates at each age. Annual premiums for men are $1,539 at 20, $2,207 at 30, $3,180 at 40, $4,983 at 50, and $8,335 at 60. For women they are $1,345, $1,929, $2,849, $4,317, and $7,304. As monthly equivalents that is about $128, $184, $265, $415, and $695 for men, and about $112, $161, $237, $360, and $609 for women. These are sample averages, not quotes, and your price will differ by insurer, health, and policy design.",
      },
      {
        title: "Why it costs so much more than term",
        body: "Two features drive the price. First, whole life is designed to last your entire life if premiums are paid, so the insurer expects to pay the claim eventually. Second, part of each premium builds cash value. At 40, a man pays $3,180 a year for whole life against $321 a year for a 20-year term policy with the same $500,000 death benefit, about 9.9 times as much. The gap is structural, not a markup: term only pays if you die inside the term, while whole life pays whenever you die.",
      },
      {
        title: "Cash value in plain terms",
        body: "Cash value is the savings side of the policy. Part of each premium goes toward the death benefit, and part builds a cash value that grows at a rate the insurer sets, on a tax-deferred basis. You can borrow against it or surrender the policy for it, but both reduce what your beneficiaries receive, and a large unpaid loan can cause the policy to lapse. Cash value builds slowly in the early years, so a policy surrendered after two or three years may return little. It is an asset inside the policy, not an extra death benefit stacked on top of the face amount.",
      },
      {
        title: "When whole life fits, and when term fits better",
        body: "Whole life fits a genuine lifelong need: a dependent who will always need support, final expenses you want covered no matter when you die, or estate liquidity. Term fits a temporary need: income replacement while your children are growing up, or a mortgage that ends in 20 years. A common mistake is buying a small permanent policy when the real risk is the next 20 years. A properly sized term policy covers the big temporary need for far less, and a smaller permanent policy can sit alongside it if a lifelong need truly exists.",
      },
      {
        title: "Is whole life insurance worth it?",
        body: "It is worth it when you have a lifelong need, the premium fits comfortably for decades, and you understand the cash value grows slowly at first. It is not worth it when the need ends in 15 or 20 years, when the premium crowds out saving, or when a bigger term policy would protect your family better for the same money. The IRS notes that life insurance proceeds paid to a beneficiary because of the insured person's death generally are not included in gross income, though interest on the proceeds and cash value taken out above what you paid in can be taxable. Talk with a tax professional before counting on any tax angle.",
      },
    ],
    comparison: {
      caption: "Term vs whole life for the same $500,000 at 40",
      headers: ["Feature", "Term vs whole life"],
      rows: [
        ["Monthly premium", "Term about $23 to $27; whole life about $237 to $265"],
        ["How long it lasts", "Term ends after 10, 20, or 30 years; whole life lasts for life if premiums are paid"],
        ["Cash value", "Term has none; whole life builds cash value you can borrow against"],
        ["Best for", "Term fits a temporary need; whole life fits a lifelong need"],
      ],
    },
    checklist: [
      "Name the need and how long it lasts before choosing a type.",
      "Compare the 20-year total cost, not just the monthly premium.",
      "Ask how fast cash value builds in the first five years.",
      "Check what happens to the death benefit if you borrow against cash value.",
    ],
    faqs: [
      {
        q: "Why is whole life insurance so expensive?",
        a: "It is designed to last your whole life and it builds cash value. At 40, a $500,000 whole life policy costs about $237 to $265 a month in NerdWallet's October 2026 sample rates, against about $23 to $27 for 20-year term.",
      },
      {
        q: "Does cash value add to the death benefit?",
        a: "Usually not. Cash value is an asset inside the policy. If you borrow against it or surrender the policy, the death benefit your beneficiaries receive is reduced. Read the policy to see how the two interact.",
      },
      {
        q: "Can whole life premiums change?",
        a: "On a traditional whole life policy the premium stays level. What changes is the cash value, which grows over time. Some permanent policies with flexible premiums can require more money later if the cash value does not earn enough.",
      },
      {
        q: "Is the death benefit taxed?",
        a: "Generally no. The IRS says life insurance proceeds paid to a beneficiary because of the insured person's death generally are not included in gross income. Interest on the proceeds is taxable, and other exceptions can apply.",
      },
    ],
    sources: [
      {
        title: "IRS: Life insurance and disability insurance proceeds",
        url: "https://www.irs.gov/faqs/interest-dividends-other-types-of-income/life-insurance-disability-insurance-proceeds/life-insurance-disability-insurance-proceeds",
      },
      {
        title: "SSA: Survivor benefits",
        url: "https://www.ssa.gov/benefits/survivors/",
      },
    ],
    related: [
      { title: "How much does term life insurance cost?", href: "/guides/how-much-does-term-life-insurance-cost" },
      { title: "Term, whole, or universal life: which do I need?", href: "/answers/term-whole-or-universal-life-insurance-which-do-i-need" },
      { title: "Universal life vs whole life insurance", href: "/answers/universal-life-vs-whole-life-insurance" },
      { title: "What is indexed universal life insurance?", href: "/answers/indexed-universal-life-insurance" },
    ],
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
  },
  {
    slug: "final-expense-insurance-for-seniors-over-70",
    title: "Final Expense Insurance for Seniors Over 70",
    description:
      "Final expense options at 70, 75, 80, and 85, with published monthly costs for a $10,000 policy, simplified vs guaranteed issue, and the two-year waiting period.",
    query: "final expense insurance for seniors over 70",
    opportunity:
      "Over-70 final expense page with cost by age and the graded-benefit disclosure front and center.",
    intent: "informational",
    answer:
      "A $10,000 final expense policy runs about $64 to $84 a month at 70 and about $125 to $164 a month at 80 in MoneyGeek's September 2026 averages for non-tobacco simplified issue coverage. Guaranteed issue costs more and usually pays only premiums back plus interest if death comes from illness in the first two years.",
    sections: [
      {
        title: "What final expense covers",
        body: "Final expense insurance, also called burial insurance, is a small whole life policy, usually $5,000 to $25,000, that pays a lump sum to whoever you name. Families use it for the funeral, burial or cremation, and the smaller bills that follow. The National Funeral Directors Association's 2023 General Price List Study put the national median at $8,300 for a funeral with viewing and burial and $6,280 for a funeral with viewing and cremation. Those medians do not include the cemetery plot, the grave marker, or cash advances like flowers and obituaries, so the full bill is often higher.",
      },
      {
        title: "Cost by age",
        body: "MoneyGeek's final expense rate analysis, updated September 22, 2026, gives monthly averages for a $10,000 simplified-issue policy for a non-tobacco applicant. At 70, a woman averages $64 a month and a man $84. At 75, it is $87 and $113. At 80, it is $125 and $164. At 85, the averages run about $155 for a woman and $203 for a man. Women pay less at every age, and tobacco use typically adds 25 to 30 percent. These are market averages, not quotes. Your premium is set by the insurer after the application and health questions.",
      },
      {
        title: "Options at 70, 75, 80, and 85",
        body: "Simplified issue asks health questions but usually requires no medical exam, and most simplified issue policies pay the full benefit from day one. Guaranteed issue asks no health questions at all, which makes it the option of last resort when health would turn you down elsewhere. It costs more for the same benefit, and maximums are smaller, often around $25,000. Most insurers stop issuing new final expense policies at 85, though a few extend eligibility to 89 with modified underwriting.",
      },
      {
        title: "The two-year waiting period on guaranteed issue",
        body: "Most guaranteed issue policies carry a graded death benefit, usually a two-year waiting period. If death comes from illness in the first two years, the beneficiary typically gets back the premiums paid plus interest, often about 10 percent, instead of the full face amount. Accidental death usually pays the full benefit from day one. After the waiting period ends, the full benefit applies for any cause. Some policies use a three-year period instead of two. Read the graded benefit language in the actual policy before you buy, and ask what the policy pays in year one and year two for a death from illness.",
      },
      {
        title: "How much coverage to buy",
        body: "Start with what you want covered. Ten thousand to $15,000 covers a basic funeral at the national median. Fifteen thousand to $25,000 covers a funeral with cemetery costs on top. Twenty-five thousand to $40,000 leaves something beyond the funeral for small bills or family. Pick the amount from the bill you want handled, not from a round number, and ask for the funeral home's general price list before you decide. Under the FTC Funeral Rule, the funeral home must give you that written price list and let you buy only the items you want.",
      },
    ],
    comparison: {
      caption: "Simplified issue vs guaranteed issue",
      headers: ["Feature", "Simplified vs guaranteed issue"],
      rows: [
        ["Health questions", "Simplified asks health questions; guaranteed issue asks none"],
        ["Full benefit", "Simplified usually pays in full from day one; guaranteed issue usually waits two years for illness"],
        ["Monthly cost", "Simplified costs less for the same benefit; guaranteed issue costs more"],
        ["Who it fits", "Simplified fits most seniors; guaranteed issue fits those who cannot pass health questions"],
      ],
    },
    checklist: [
      "Decide what you want covered: funeral, cemetery, or something left over.",
      "Ask for the funeral home's general price list before choosing an amount.",
      "Compare simplified issue first; use guaranteed issue only if health questions block you.",
      "Read the graded benefit language for year one and year two.",
    ],
    faqs: [
      {
        q: "How much final expense insurance do I need at 75?",
        a: "A basic funeral runs about $8,300 at the national median, so $10,000 to $15,000 covers the funeral itself. Add cemetery costs and you are looking at $15,000 to $25,000. Choose the amount from the bill you want handled.",
      },
      {
        q: "Does final expense insurance cover cremation?",
        a: "Yes. The benefit is a lump sum your beneficiary can use for burial or cremation, whichever you prefer. The national median for a funeral with viewing and cremation was $6,280 in the NFDA's 2023 study.",
      },
      {
        q: "What happens if I die in the first two years?",
        a: "On a simplified issue policy, the full benefit usually pays. On a guaranteed issue policy, a death from illness in the first two years typically returns the premiums paid plus interest, often about 10 percent. Accidental death usually pays the full benefit from day one.",
      },
      {
        q: "Can I get final expense coverage at 85?",
        a: "Often yes. MoneyGeek's 2026 averages put a $10,000 policy at about $155 a month for an 85-year-old woman and $203 for a man. Most insurers stop issuing new policies at 85, though a few go to 89.",
      },
    ],
    sources: [
      {
        title: "IRS: Life insurance and disability insurance proceeds",
        url: "https://www.irs.gov/faqs/interest-dividends-other-types-of-income/life-insurance-disability-insurance-proceeds/life-insurance-disability-insurance-proceeds",
      },
      {
        title: "SSA: Survivor benefits",
        url: "https://www.ssa.gov/benefits/survivors/",
      },
    ],
    related: [
      { title: "Final expense insurance in Greensboro", href: "/final-expense-insurance" },
      { title: "Life insurance for seniors", href: "/guides/life-insurance-for-seniors" },
      { title: "Term life with no medical exam", href: "/answers/term-life-insurance-no-medical-exam" },
    ],
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
  },
  {
    slug: "how-much-does-disability-insurance-cost",
    title: "How Much Does Disability Insurance Cost?",
    description:
      "Disability insurance usually costs 1 to 3 percent of your income. See ranges by salary, what moves the price, group vs individual, and short vs long term.",
    query: "how much does disability insurance cost per month",
    opportunity:
      "Cost question with a stable published rule of thumb; merged short vs long term comparison answers the follow-up in one page.",
    intent: "informational",
    answer:
      "Individual long-term disability insurance usually costs 1 to 3 percent of annual income, or about $42 to $125 a month on a $50,000 salary and $83 to $250 a month on $100,000, per Policygenius's July 2026 calculator guide. Group coverage through work usually costs less.",
    sections: [
      {
        title: "The 1 to 3 percent rule",
        body: "Policygenius's disability insurance calculator guide, updated July 20, 2026, puts individual long-term disability insurance at about 1 to 3 percent of annual income. That works out to roughly $42 to $125 a month on a $50,000 salary, $63 to $188 on $75,000, and $83 to $250 on $100,000. Treat the range as a planning estimate, not a quote. Your actual premium depends on your age, health, occupation, benefit amount, waiting period, and the riders you choose.",
      },
      {
        title: "Cost by benefit amount and age",
        body: "Most policies replace 40 to 70 percent of gross income, and Policygenius suggests targeting about 60 percent, which usually lines up with after-tax pay. A $60,000 salary with a 60 percent benefit means about $3,000 a month while the claim qualifies. Younger buyers pay less because they lock in a lower rate for longer. Occupation matters too: desk work costs less to insure than manual labor, because the risk of a disabling injury is lower.",
      },
      {
        title: "Group vs individual coverage",
        body: "Group coverage through an employer is usually much cheaper, because the insurer spreads the risk across the whole workforce and does not individually underwrite each person. It often costs a few dollars per paycheck, and the employer sometimes pays part or all of it. The tradeoff is control. Group coverage usually has a maximum benefit, offsets for other income like Social Security, and limits on continuation when you leave the job. Individual coverage costs more but follows you, and you choose the definition, waiting period, and benefit period yourself.",
      },
      {
        title: "Short vs long term",
        body: "Short-term disability covers the first weeks or months, typically 13 to 26 weeks, replacing 40 to 70 percent of income. Long-term disability picks up after that, often after a 90-day elimination period, and can pay for years, often to age 65. The average long-term disability claim lasts almost three years, according to the Council for Disability Awareness. That length is what long-term coverage is for. Short-term coverage handles a difficult few months, while long-term coverage protects the years when savings would run out. The Social Security Administration notes that more than one in four of today's 20-year-olds will become disabled before reaching retirement age.",
      },
      {
        title: "What moves your price",
        body: "Age at purchase, health, and occupation class set the base. Then the contract choices move it: a higher monthly benefit costs more, a longer elimination period costs less, a longer benefit period costs more, and riders add cost. Own-occupation coverage and a cost-of-living adjustment are the two riders that add the most. Ask for the price with and without each rider so you can see what it costs before you decide.",
      },
    ],
    comparison: {
      caption: "Short-term vs long-term disability coverage",
      headers: ["Topic", "Short-term and long-term"],
      rows: [
        ["How long it pays", "Short-term pays for weeks to months, often 13 to 26 weeks; long-term can pay for years, often to age 65"],
        ["When it starts", "Short-term starts after a short wait, often days to weeks; long-term starts after a longer elimination period, often 90 days"],
        ["What it replaces", "Both replace part of income, usually 40 to 70 percent; long-term usually targets about 60 percent"],
        ["Where you get it", "Short-term often comes through work; long-term is often bought individually to fill the gap"],
      ],
    },
    checklist: [
      "Find your monthly benefit target: about 60 percent of gross income.",
      "Check what your employer plan covers and what it caps.",
      "Compare elimination periods: a longer wait means a lower premium.",
      "Confirm the definition of disability and the benefit period in writing.",
    ],
    faqs: [
      {
        q: "How much disability insurance do I need?",
        a: "Most policies target about 60 percent of gross income, which usually lines up with after-tax pay. On a $60,000 salary that means about $3,000 a month. Subtract what your employer plan would pay before buying more.",
      },
      {
        q: "Does Social Security replace private disability insurance?",
        a: "No. Social Security Disability Insurance has a strict federal definition, a five-month waiting period, and an average benefit of about $1,634 a month for a disabled worker in early 2026. It is a safety net, not income replacement.",
      },
      {
        q: "Is employer disability coverage enough?",
        a: "Sometimes it is a good start, rarely the whole answer. Group coverage usually caps the benefit, offsets other income, and may not follow you to another job. Check the benefit booklet for the cap and the definition before you rely on it.",
      },
      {
        q: "Are disability benefits taxed?",
        a: "It depends on who paid the premiums and whether they were pre-tax or after-tax. Benefits from a policy you paid for with after-tax dollars are generally not taxable, while benefits from employer-paid pre-tax coverage generally are. The IRS FAQ on life and disability proceeds covers the rules.",
      },
    ],
    sources: [
      {
        title: "SSA: Disability",
        url: "https://www.ssa.gov/disability",
      },
      {
        title: "IRS: Life insurance and disability insurance proceeds",
        url: "https://www.irs.gov/faqs/interest-dividends-other-types-of-income/life-insurance-disability-insurance-proceeds/life-insurance-disability-insurance-proceeds",
      },
    ],
    related: [
      { title: "Do I need disability insurance?", href: "/answers/do-i-need-disability-insurance" },
      { title: "How does disability insurance work?", href: "/answers/how-does-disability-insurance-work" },
      { title: "Life insurance help in the Triad", href: "/life-insurance" },
    ],
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
  },
  {
    slug: "types-of-annuities",
    title: "Types of Annuities: Fixed, Indexed, Immediate, Deferred",
    metaTitle: "Types of Annuities Explained: Fixed, Indexed, Immediate",
    description:
      "Fixed, indexed, immediate, deferred, and variable annuities explained in plain terms, with who each fits, surrender periods, and the license line that matters.",
    answer:
      "An annuity is a contract with an insurance company that can pay income now or later. Fixed and indexed annuities are insurance products. Variable annuities are securities, and they sit outside a North Carolina life insurance license.",
    sections: [
      {
        title: "Start with two questions",
        body: "First, when do you want the income to start: now, or years from now? Second, is the growth rate set in the contract, or tied to a market index? Those two answers sort nearly every annuity into its type. Everything else, the fees, the access rules, the guarantees, follows from them.",
      },
      {
        title: "Immediate annuities pay income right away",
        body: "An immediate annuity, often called a single premium immediate annuity, trades one lump sum for income payments that start within a year, often for the rest of your life. The tradeoff is commitment: once the money goes in, you generally cannot take it back out as a lump sum. It fits a person who has a sum set aside and wants a steady check more than flexibility.",
      },
      {
        title: "Deferred annuities build first, then pay",
        body: "A deferred annuity has two phases. During the accumulation phase your money grows, either at a set rate or tied to an index. During the payout phase you turn the balance into income. You choose when the second phase starts, which is why this type suits people still years from retirement.",
      },
      {
        title: "A QLAC is a deferred income annuity inside a retirement account",
        body: "A qualified longevity annuity contract, called a QLAC, is a deferred income annuity bought inside a retirement account. It has to sit in a traditional IRA or an employer plan such as a 401(k). You move part of the account into the contract, and the income starts later, on a date you choose. It cannot start later than the month after you turn 85. Until the income starts, the money in the QLAC is left out of the balance used to figure your required minimum distributions. Your RMDs are smaller in the meantime. The limit for 2026 is $210,000 in premiums per person, across all your accounts, under IRS Notice 2025-67. The old rule that also capped a QLAC at 25 percent of your account balance is gone. A QLAC only delays the tax. When the income starts, the payments are taxed as ordinary income, and they count toward the RMD on the QLAC itself. It fits a person who wants income late in life, and a smaller RMD in the meantime. This is general information, not advice about your own accounts. A QLAC cannot be a variable or indexed contract, and the contract has to meet the IRS rules to qualify.",
      },
      {
        title: "Fixed annuities pay a set rate",
        body: "A fixed deferred annuity, including a multi-year guaranteed annuity, credits a guaranteed interest rate for a set term, often 3, 5, 7, or 10 years. The rate is stated in the contract. The insurer, not the market, carries the growth risk. Current sample rates are in the annuity rates guide.",
      },
      {
        title: "Indexed annuities link interest to an index",
        body: "A fixed indexed annuity credits interest based on a market index, such as the S&P 500, with a cap, a participation rate, or a spread limiting the credit. When the index falls, the credit is typically zero rather than negative, so the principal is protected from market loss. The tradeoff is that the credit is usually less than the index gain itself. A worked example is in the fixed versus indexed guide.",
      },
      {
        title: "Variable annuities are securities, and I do not offer them",
        body: "A variable annuity puts your money into subaccounts that invest in the market, so the value can fall as well as rise. Variable annuities are registered securities. Selling them requires a securities license, which is outside a North Carolina life insurance license. If that is what you need, I refer you to a licensed securities professional who explains their own services and fees first. I do not earn anything from the referral.",
      },
      {
        title: "Surrender periods limit early access",
        body: "Most deferred annuities have a surrender charge period, often 5 to 10 years and sometimes longer, during which taking out more than the contract allows triggers a charge. The charge usually declines over time. On top of that, a taxable withdrawal before age 59 and a half can face a 10 percent additional federal tax. Keep money you may need soon out of an annuity.",
      },
      {
        title: "Who each type fits",
        body: "Fixed fits a saver who wants a stated rate and no market risk. Indexed fits a saver who wants some link to market gains with principal protection. Immediate fits a retiree who wants a check for life and can commit the sum. Deferred fits a person years from retirement who wants tax-deferred growth. Variable fits an investor who accepts market risk and works with a securities professional.",
      },
    ],
    comparison: {
      caption: "The five annuity types at a glance",
      headers: ["Annuity type", "How it works and who it fits"],
      rows: [
        [
          "Fixed (MYGA)",
          "Guaranteed rate for a set term. Fits a saver who wants a stated rate and no market risk.",
        ],
        [
          "Fixed indexed",
          "Interest linked to an index, limited by a cap or participation rate. Principal protected from market loss.",
        ],
        [
          "Immediate (SPIA)",
          "One lump sum becomes income within a year, often for life. Fits a retiree who can commit the money.",
        ],
        [
          "Deferred",
          "Money grows first, income starts later. Fits a person years from retirement who wants tax-deferred growth.",
        ],
        [
          "Variable",
          "Money invested in market subaccounts; value can fall. A security, outside a life license. Ask a securities professional.",
        ],
      ],
    },
    checklist: [
      "Decide when you want income: now or years from now.",
      "Ask whether the rate is guaranteed or linked to an index, and what limits the credit.",
      "Read the surrender period and the charge for taking money out early.",
      "Ask what is guaranteed, what is illustrated, and what the contract pays if you die.",
      "Check that the money can stay untouched for the full surrender period.",
    ],
    faqs: [
      {
        q: "What is an annuity in simple terms?",
        a: "A contract with an insurance company. You pay a lump sum or premiums, and the company pays income now or later, on the terms the contract states.",
      },
      {
        q: "What is the difference between a fixed and an indexed annuity?",
        a: "A fixed annuity credits a rate the contract states. An indexed annuity credits interest based on a market index, limited by a cap or participation rate, with principal protected from market loss.",
      },
      {
        q: "Can I lose money in an annuity?",
        a: "In a fixed or indexed annuity, the principal is protected from market loss, but surrender charges and taxes can still reduce what you take out early. In a variable annuity, the value can fall with the market.",
      },
      {
        q: "Do you sell variable annuities?",
        a: "No. Variable annuities are securities and need a securities license. I offer fixed and fixed indexed insurance products, and I refer securities questions to a licensed professional.",
      },
    ],
    sources: [
      {
        title: "NAIC: Annuities",
        url: "https://content.naic.org/insurance-topics/annuities",
      },
      {
        title: "IRS Publication 590-B: Distributions from IRAs",
        url: "https://www.irs.gov/publications/p590b",
      },
      {
        title: "IRS: Topic 558, additional tax on early distributions",
        url: "https://www.irs.gov/taxtopics/tc558",
      },
    ],
    related: [
      { title: "Annuity rates, dated samples", href: "/guides/annuity-rates" },
      {
        title: "Should I buy an annuity? Pros and cons",
        href: "/guides/should-i-buy-an-annuity-pros-and-cons",
      },
      { title: "Fixed annuity vs indexed annuity", href: "/answers/fixed-annuity-vs-indexed-annuity" },
      { title: "Annuities and retirement income", href: "/annuities" },
    ],
    query: "types of annuities",
    opportunity:
      "Sort the five types in plain terms and draw the license line clearly; most competing pages blur fixed, indexed, and variable together.",
    intent: "informational",
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
  },
  {
    slug: "annuity-rates",
    title: "Annuity Rates: Fixed and Indexed Samples",
    metaTitle: "Annuity Rates: Current Fixed Annuity Samples",
    description:
      "Dated sample annuity rates for November 2026: fixed annuity ranges by term, how indexed annuity credits work, and why the top rate is not the whole story.",
    answer:
      "As of November 6, 2026, the highest published 5-year fixed annuity rates ran about 6.05% to 6.40%, and 3-year rates about 5.75% to 6.10%. These are dated samples from a rate board, not a quote, and carriers reprice them regularly.",
    sections: [
      {
        title: "Read this first: a sample, not a quote",
        body: "Rates below come from the Annuity.com rate board, which draws on the Cannex feed, and were current on November 6, 2026. They are a dated sample to show the range, not a quote for you. Rates change when carriers reprice, and they vary by state, premium amount, and the carrier's financial strength rating. Ask for current rates before deciding anything.",
      },
      {
        title: "Fixed annuity sample rates by term",
        body: "On November 6, 2026, the highest 3-year fixed annuity rate on the board was 6.10% from Revol One, rated B++ by AM Best, while Athene, rated A+, paid 5.75%. The highest 5-year rate was 6.40% from Wichita National Life, rated B+, while Aspida, rated A-, paid 6.30% and Athene paid 6.05%. The spread between the highest rate and the highest A-rated rate was small, which is the point: a top rate from a lower-rated carrier is not automatically the better contract.",
      },
      {
        title: "Why two rate boards disagree",
        body: "Some boards quote simple interest, which can print a higher headline number that works out lower when compounded over the term. The figures above are True Blended Yield, the annualized rate across the full term. Boards also update on different days and filter by different minimum premiums. Compare the same term, the same rate basis, and the same date.",
      },
      {
        title: "Indexed annuity rates work differently",
        body: "A fixed indexed annuity has no stated interest rate to quote. Interest is credited from the performance of an index, limited by a cap, a participation rate, or a spread. A cap is the most you can be credited in a period. A participation rate is the share of the index gain you receive. A spread is an amount taken off the gain before crediting. The credit for a past period says nothing about the next one.",
      },
      {
        title: "What moves annuity rates",
        body: "Fixed annuity rates follow Treasury yields and the carrier's own pricing, so they rise and fall with interest rates. Longer terms and larger premiums can pay more. A carrier with a stronger financial strength rating may pay a little less, because buyers pay for the strength. Rates are set by the insurer, not by the agent.",
      },
      {
        title: "Surrender charges and taxes still apply",
        body: "A fixed annuity rate is guaranteed only for its term, and taking money out during the surrender period, often 5 to 10 years, can trigger a charge. Growth is tax-deferred until withdrawal, and a taxable withdrawal before age 59 and a half can face a 10 percent additional federal tax. Annuities are insurance contracts, not bank deposits, and they are not FDIC-insured.",
      },
    ],
    comparison: {
      caption: "Sample fixed annuity rates, November 6, 2026",
      headers: ["Term", "Sample rate range"],
      rows: [
        ["3-year fixed (MYGA)", "5.75% to 6.10%"],
        ["5-year fixed (MYGA)", "6.05% to 6.40%"],
        [
          "Fixed indexed",
          "No fixed rate. Credit depends on the index, the cap, and the participation rate.",
        ],
      ],
    },
    checklist: [
      "Note the date on any rate you compare. A rate from last month is not today's rate.",
      "Compare the same term and the same rate basis, compounded or simple interest.",
      "Check the carrier's AM Best rating next to the rate.",
      "Ask for the surrender period and the free withdrawal amount in writing.",
      "Confirm the rate is guaranteed for the full term, and what happens when the term ends.",
    ],
    faqs: [
      {
        q: "Are these annuity rates guaranteed?",
        a: "The sample rates were guaranteed for their terms when published, but the board changes as carriers reprice. A rate is only locked when the contract is issued.",
      },
      {
        q: "Why does another site show a higher top rate?",
        a: "Boards differ in update timing, minimum premiums, and whether they quote simple or compounded interest. Compare the same term, basis, and date before judging.",
      },
      {
        q: "Does the highest rate mean the best annuity?",
        a: "No. The rate is one term among many. Surrender period, free withdrawal terms, insurer strength, and how the rate resets after the term matter as much.",
      },
      {
        q: "How often do annuity rates change?",
        a: "Carriers reprice regularly as Treasury yields move. In the week ending November 6, 2026, 28 fixed annuity rates from 7 carriers took effect on the Annuity.com board.",
      },
    ],
    sources: [
      {
        title: "Annuity.com: MYGA rates (Cannex feed)",
        url: "https://www.annuity.com/tools/myga-rates",
      },
      {
        title: "NAIC: Annuities",
        url: "https://content.naic.org/insurance-topics/annuities",
      },
      {
        title: "IRS: Topic 558, additional tax on early distributions",
        url: "https://www.irs.gov/taxtopics/tc558",
      },
    ],
    related: [
      { title: "Types of annuities", href: "/guides/types-of-annuities" },
      {
        title: "Should I buy an annuity? Pros and cons",
        href: "/guides/should-i-buy-an-annuity-pros-and-cons",
      },
      { title: "Fixed annuity vs indexed annuity", href: "/answers/fixed-annuity-vs-indexed-annuity" },
      { title: "Annuities and retirement income", href: "/annuities" },
    ],
    query: "annuity rates",
    opportunity:
      "Publish a dated sample range with the rate basis stated, where competitors post undated numbers as if they were quotes.",
    intent: "informational",
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
  },
  {
    slug: "should-i-buy-an-annuity-pros-and-cons",
    title: "Should I Buy an Annuity? Pros and Cons",
    metaTitle: "Should I Buy an Annuity? Pros and Cons Explained",
    description:
      "Annuity pros and cons in plain terms, by type, plus annuity vs CD, surrender charges, taxes, and the situations where an annuity is the wrong fit for you.",
    answer:
      "An annuity can fit when you want income you cannot outlive and can leave the money alone for years. It is the wrong fit when you may need the money soon, want market growth, or would put most of your savings into one contract.",
    sections: [
      {
        title: "The pros, plainly stated",
        body: "The strongest case is income for life: an immediate annuity, or a deferred annuity turned into income, can pay as long as you live. Fixed and indexed annuities protect principal from market loss. Growth is tax-deferred until you withdraw it. Payments are predictable, which suits a household that wants a floor under its retirement income.",
      },
      {
        title: "The cons, plainly stated",
        body: "The money is hard to reach. Surrender charges apply during a period that often runs 5 to 10 years. Indexed credits are capped, so you share in gains only up to a limit. A fixed payment loses buying power if prices rise. Withdrawals are taxed as ordinary income, with a possible 10 percent additional tax before age 59 and a half. Some contracts add riders and fees that need a line-by-line read.",
      },
      {
        title: "Pros and cons by type",
        body: "A fixed annuity trades growth for certainty: a stated rate, no market risk, modest returns. An indexed annuity trades some upside for protection: a link to index gains, capped, with principal protected. An immediate annuity trades flexibility for income: a check for life, little access to the lump sum. A variable annuity trades protection for market exposure, and it is a security outside a life license.",
      },
      {
        title: "Annuity vs CD: the honest comparison",
        body: "A certificate of deposit is a bank deposit, FDIC-insured up to $250,000 per depositor per bank, with a set term and a stated rate. An annuity is an insurance contract, not FDIC-insured, with tax-deferred growth and the option of lifetime income. A CD usually lets you reach the money sooner with a smaller penalty. An annuity usually ties money up longer and can pay income for life. Neither one beats the other in general. Compare the term, the access rules, the tax treatment, and what happens if you need the money early.",
      },
      {
        title: "Who it fits, and who it does not",
        body: "It fits a person with a gap between guaranteed income and spending, with savings beyond the annuity, and with years to leave the money alone. It does not fit money you may need for emergencies, a home repair, or care in the next few years. It does not fit a person whose main goal is growth, or who would put most of what they have into a single contract.",
      },
      {
        title: "The surrender-charge disclosure",
        body: "Read this before signing. Most deferred annuities have a surrender charge period, often 5 to 10 years and sometimes longer. Taking out more than the contract allows during that period triggers a charge that usually declines year by year. Many contracts allow a limited free withdrawal each year, and the contract states the amount. Ask for the full surrender schedule in writing, and check what happens to the rate when the guarantee term ends.",
      },
    ],
    comparison: {
      caption: "Questions that decide whether an annuity fits",
      headers: ["Question to ask", "Why it matters"],
      rows: [
        [
          "When do I need income?",
          "Immediate income needs a different contract than growth for later.",
        ],
        [
          "Can this money stay untouched?",
          "Surrender charges punish early access during the surrender period.",
        ],
        [
          "What is guaranteed?",
          "A stated rate, a cap, and an income amount are different promises. Ask which is which.",
        ],
        [
          "What does it cost to exit?",
          "Surrender charges, market value adjustments, and taxes all reduce early withdrawals.",
        ],
        [
          "How strong is the insurer?",
          "An annuity is only as strong as the company behind it. Check its AM Best rating.",
        ],
        [
          "What happens if I die?",
          "Death benefits vary. Some contracts pay the balance, others keep the remainder.",
        ],
      ],
    },
    checklist: [
      "Write down the income gap the annuity would fill, in dollars per month.",
      "Confirm the surrender period and the charge schedule in writing.",
      "Ask which figures are guaranteed and which are illustrations.",
      "Compare the same money in a CD for term, access, and tax treatment.",
      "Keep emergency savings outside the annuity.",
    ],
    faqs: [
      {
        q: "Is an annuity a good investment?",
        a: "It is not an investment in the usual sense. It is an insurance contract that can guarantee income or a rate. Judge it on income and protection, not on beating the market.",
      },
      {
        q: "What is the catch with annuities?",
        a: "Access. The money is committed for years, surrender charges apply to early withdrawals, and taxes can add up. Read the surrender schedule before signing.",
      },
      {
        q: "Can an annuity lose money?",
        a: "A fixed or indexed annuity protects principal from market loss. A variable annuity can lose value with the market. Surrender charges and taxes can still reduce early withdrawals from any type.",
      },
      {
        q: "Should I put all my retirement savings in an annuity?",
        a: "No. An annuity works best as one part of a plan, next to savings you can reach, Social Security, and other income. Putting most of your savings into one contract leaves no room for surprises.",
      },
    ],
    sources: [
      {
        title: "NAIC: Annuities",
        url: "https://content.naic.org/insurance-topics/annuities",
      },
      {
        title: "IRS: Topic 558, additional tax on early distributions",
        url: "https://www.irs.gov/taxtopics/tc558",
      },
    ],
    related: [
      { title: "Types of annuities", href: "/guides/types-of-annuities" },
      { title: "Annuity rates, dated samples", href: "/guides/annuity-rates" },
      { title: "Fixed annuity vs indexed annuity", href: "/answers/fixed-annuity-vs-indexed-annuity" },
      { title: "Annuities and retirement income", href: "/annuities" },
    ],
    query: "should i buy an annuity pros and cons",
    opportunity:
      "Give the honest no cases, not just the sales pitch; the CD comparison and surrender disclosure are the trust gap.",
    intent: "informational",
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
  },
  {
    slug: "how-much-does-long-term-care-cost",
    title: "How Much Does Long-Term Care Cost?",
    metaTitle: "How Much Does Long-Term Care Cost? 2025 Figures",
    description:
      "Long-term care costs for 2025: care by setting from the CareScout survey, insurance premiums by age from AALTCI, and what Medicare does and does not pay.",
    answer:
      "In 2025, the national median for a private nursing home room was $129,575 a year and assisted living was $74,400 a year, per the CareScout Cost of Care Survey. A traditional long-term care policy for a healthy 55-year-old averaged $2,200 a year for a man and $3,750 for a woman.",
    sections: [
      {
        title: "What care costs in 2025",
        body: "The CareScout Cost of Care Survey, data collected July through November 2025, gives national medians. A non-medical caregiver at home costs $35 an hour, about $80,080 a year at 44 hours a week. Adult day health care costs $95 a day. An assisted living community costs $6,200 a month, or $74,400 a year. A semi-private nursing home room costs $9,581 a month, or $114,975 a year. A private room costs $10,798 a month, or $129,575 a year. Medians hide wide local differences, so treat these as a starting point, not a budget for Greensboro.",
      },
      {
        title: "What insurance premiums look like by age",
        body: "The AALTCI 2025 Price Index prices a standard policy: a $165,000 initial benefit pool, select health, benefits growing 3% a year, calculated January 2025 for Illinois. The table below shows the average yearly premium. Waiting raises the price: the same man's premium rises from $2,200 at 55 to $3,280 at 65, and a couple's combined premium rises from $5,050 to $7,150.",
      },
      {
        title: "What Medicare covers, and what it does not",
        body: "Medicare does not pay for ongoing help with everyday activities, such as bathing or dressing, when that is the only care needed. It covers skilled nursing facility care up to 100 days per benefit period, with no coinsurance for days 1 to 20 and $217 a day for days 21 to 100 in 2026. It covers skilled home health care in limited circumstances, not round-the-clock home care. Anything beyond that is paid from savings, a policy, or Medicaid if you qualify.",
      },
      {
        title: "How long savings last",
        body: "CareScout calculated that $250,000 covers about 2.8 years of long-term care on average nationally: 3.4 years of assisted living, 3.1 years of home caregiving, and 2.2 years in a semi-private nursing home room. A long need can outlast a lifetime of saving, which is the risk a policy is meant to cover.",
      },
      {
        title: "What changes the price",
        body: "Age and health at purchase matter most, then gender, because women use care longer on average. A larger benefit pool, a longer benefit period, and inflation growth all raise the premium. A longer elimination period, the waiting time before benefits start, lowers it. Prices vary by state and by insurer: for a couple both 65, the AALTCI index found top-three insurer prices from $7,137 to $12,250 a year for near-identical coverage.",
      },
    ],
    comparison: {
      caption: "Average yearly premium, $165,000 pool growing 3% a year (AALTCI 2025)",
      headers: ["Buyer at purchase age", "Average yearly premium"],
      rows: [
        ["Single man, 55", "$2,200"],
        ["Single man, 60", "$2,610"],
        ["Single man, 65", "$3,280"],
        ["Single woman, 55", "$3,750"],
        ["Single woman, 60", "$4,550"],
        ["Single woman, 65", "$5,290"],
        ["Couple, both 55", "$5,050 combined"],
        ["Couple, both 60", "$5,800 combined"],
        ["Couple, both 65", "$7,150 combined"],
      ],
    },
    checklist: [
      "Price care in your own area, not just the national median.",
      "Decide how many years of care you want a policy to cover.",
      "Ask what the elimination period is and what triggers benefits.",
      "Compare the same benefit pool and inflation growth across insurers.",
      "Check what Medicare will and will not pay before counting on it.",
    ],
    faqs: [
      {
        q: "Does Medicare pay for long-term care?",
        a: "No, not for ongoing custodial care. Medicare covers skilled nursing up to 100 days per benefit period and limited skilled home health care. Daily help with bathing, dressing, and eating is not covered.",
      },
      {
        q: "How much does long-term care insurance cost at 65?",
        a: "Per the AALTCI 2025 Price Index, a healthy 65-year-old paid on average $3,280 a year for a man and $5,290 for a woman, for a $165,000 pool growing 3% a year. A couple both 65 paid $7,150 combined.",
      },
      {
        q: "Is home care cheaper than a nursing home?",
        a: "At a few hours a week, yes. At 44 hours a week, a home caregiver cost about $80,080 a year in 2025, between assisted living at $74,400 and a semi-private nursing home room at $114,975. Round-the-clock home care costs more than a facility.",
      },
      {
        q: "What happens if I wait to buy a policy?",
        a: "Premiums rise with age, and health changes can make a policy harder to get or more expensive. The same coverage that cost a healthy 55-year-old man $2,200 a year cost $3,280 at 65.",
      },
    ],
    sources: [
      {
        title: "CareScout: Cost of Care Survey 2025",
        url: "https://www.carescout.com/cost-of-care",
      },
      {
        title: "AALTCI: 2025 Long-Term Care Insurance Price Index",
        url: "https://www.aaltci.org/long-term-care-insurance/learning-center/ltcfacts-2025.php",
      },
      {
        title: "Medicare.gov: Long-term care coverage",
        url: "https://www.medicare.gov/coverage/long-term-care",
      },
    ],
    related: [
      { title: "Do I need long-term care insurance?", href: "/answers/do-i-need-long-term-care-insurance" },
      { title: "Hybrid long-term care insurance", href: "/guides/hybrid-long-term-care-insurance" },
      { title: "Long-term care insurance in the Triad", href: "/long-term-care-insurance" },
      { title: "What Medicare does not cover", href: "/guides/what-medicare-does-not-cover" },
    ],
    query: "how much does long-term care cost",
    opportunity:
      "Merge insurance premiums and care costs on one page with dated sources; competitors split them and quote undated figures.",
    intent: "informational",
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
  },
  {
    slug: "hybrid-long-term-care-insurance",
    title: "Hybrid Long-Term Care Insurance Explained",
    metaTitle: "Hybrid Long-Term Care Insurance: How It Works",
    description:
      "Hybrid long-term care insurance pairs life insurance with care benefits in one contract. How it works, what it costs, and who it fits, with priced examples.",
    answer:
      "A hybrid policy pairs life insurance with long-term care benefits in one contract. Care is paid from a long-term care benefit pool, and the policy also carries a separate death benefit for beneficiaries. Care used can reduce the death benefit, down to a stated minimum. It usually costs more per year than a standalone policy.",
    sections: [
      {
        title: "How a hybrid policy works",
        body: "A hybrid, or linked-benefit, policy starts with life insurance. If you need care, the policy pays for it from the long-term care benefit pool. The death benefit is a separate amount: in the AALTCI example, the pool was $180,000 and the minimum death benefit was $120,000. Care used reduces the death benefit, and if care uses the whole pool, the death benefit can fall to the contract's stated minimum. If you never need care, your beneficiaries receive the full death benefit. Premiums can be paid over years or as a single lump sum.",
      },
      {
        title: "Standalone vs hybrid, side by side",
        body: "The comparison below is the decision in one table. A standalone policy buys the most care per premium dollar and nothing if care is never needed. A hybrid buys less care per dollar but returns something either way. Neither is better in general. The right one depends on whether you can live with paying premiums for coverage you may never use.",
      },
      {
        title: "The cost tradeoff, with real numbers",
        body: "AALTCI compared a traditional policy with a $165,000 pool against a linked-benefit policy with a $180,000 pool and a $120,000 minimum death benefit, both priced in January 2024 with no inflation growth. A 55-year-old man paid $900 a year for the traditional policy and $3,540 a year for the linked-benefit version. A 55-year-old woman paid $1,500 and $3,265. A single premium for the linked-benefit version was $52,753 for a man and $54,022 for a woman. AALTCI warns the comparison is not apples to apples, because linked-benefit products vary widely.",
      },
      {
        title: "Who it fits",
        body: "It fits a person who dislikes the idea of paying for years and getting nothing back, who has a lump sum to place, or who wants one contract to answer two questions at once. It fits less well when the budget is tight, when the goal is the most care per dollar, or when the money is needed for other plans.",
      },
      {
        title: "Questions before you buy",
        body: "Ask what triggers benefits, how long the elimination period runs, whether benefits grow with inflation, and what happens when the pool runs out. Ask whether premiums are guaranteed or can change, and what happens if you stop paying. Ask a tax professional about the tax treatment of premiums and benefits before deciding.",
      },
    ],
    comparison: {
      caption: "Standalone vs hybrid long-term care insurance",
      headers: ["Feature", "Standalone vs hybrid"],
      rows: [
        [
          "Care per premium dollar",
          "Standalone buys more care for the same premium. Hybrid buys less care per dollar.",
        ],
        [
          "If care is never needed",
          "Standalone pays nothing back. Hybrid pays a death benefit to beneficiaries.",
        ],
        [
          "Premiums",
          "Standalone is usually lower per year. Hybrid is usually higher, or takes a single lump sum.",
        ],
        [
          "Death benefit",
          "Standalone has none. Hybrid pays a separate death benefit, reduced by care used down to a stated minimum.",
        ],
        [
          "Premium changes",
          "Standalone premiums can rise. Ask whether hybrid premiums are guaranteed.",
        ],
      ],
    },
    checklist: [
      "Decide whether a death benefit matters to you, or only the care.",
      "Compare the same benefit pool and the same inflation growth.",
      "Ask what happens when the care pool runs out.",
      "Check whether premiums are guaranteed or can change.",
      "Ask a tax professional about premiums and benefits before deciding.",
    ],
    faqs: [
      {
        q: "What is hybrid long-term care insurance?",
        a: "A life insurance policy with long-term care benefits built in. Care is paid from a long-term care benefit pool, and the policy carries a separate death benefit for beneficiaries.",
      },
      {
        q: "Is hybrid long-term care insurance worth it?",
        a: "It depends on what bothers you more: paying for coverage you may never use, or paying more per dollar of care. A hybrid answers the first worry. A standalone policy buys more care per premium dollar.",
      },
      {
        q: "What happens to the death benefit if I use care?",
        a: "Care used reduces the death benefit by the amount paid for care, down to the contract's stated minimum. The death benefit is a separate amount from the care pool, so what beneficiaries receive is the remaining death benefit, not the unused care pool.",
      },
      {
        q: "Can I pay for a hybrid policy with one lump sum?",
        a: "Many hybrid policies offer a single premium option. AALTCI priced a single premium of $52,753 for a 55-year-old man and $54,022 for a woman in January 2024, for a $180,000 pool with a $120,000 minimum death benefit.",
      },
    ],
    sources: [
      {
        title: "AALTCI: 2025 Long-Term Care Insurance Price Index",
        url: "https://www.aaltci.org/long-term-care-insurance/learning-center/ltcfacts-2025.php",
      },
      {
        title: "NAIC: Understanding long-term care insurance",
        url: "https://content.naic.org/consumer/long-term-care-insurance.htm",
      },
      {
        title: "Medicare.gov: Long-term care coverage",
        url: "https://www.medicare.gov/coverage/long-term-care",
      },
    ],
    related: [
      { title: "How much does long-term care cost?", href: "/guides/how-much-does-long-term-care-cost" },
      { title: "Do I need long-term care insurance?", href: "/answers/do-i-need-long-term-care-insurance" },
      { title: "Long-term care insurance in the Triad", href: "/long-term-care-insurance" },
      { title: "Short-term care insurance", href: "/short-term-care-insurance" },
    ],
    query: "hybrid long-term care insurance",
    opportunity:
      "Explain the linked-benefit tradeoff with priced examples; most pages describe hybrids without showing what the death benefit costs.",
    intent: "informational",
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
  },
  {
    slug: "health-insurance-before-medicare-62-to-65",
    title: "Health Insurance Before Medicare at 62 to 65",
    metaTitle: "Health Insurance Before Medicare at 62 to 65",
    description:
      "Health insurance from 62 to 65: marketplace, COBRA, a spouse's plan, and Medicaid, with 2026 costs by age, subsidy limits, and the Medicare handoff at 65.",
    answer:
      "Between 62 and 65 you have four main routes: the marketplace, COBRA, a spouse's plan, or Medicaid. In 2026 a 60-year-old paid about $15,914 a year for a benchmark silver marketplace plan before subsidies, and COBRA averaged about $833 a month for one person.",
    sections: [
      {
        title: "The four routes at a glance",
        body: "Most people in this gap use one of four routes. The marketplace sells individual plans, with tax credits if your income qualifies. COBRA continues your old employer plan for up to 18 months at full price. A spouse's employer plan can cover you if their employer offers it. Medicaid covers adults with low income in North Carolina. The right route depends on your income, your doctors, and how long you need coverage.",
      },
      {
        title: "What the marketplace costs at 60 to 64",
        body: "Age is the biggest price driver: federal rules let insurers charge a 64-year-old up to three times what a 21-year-old pays for the same plan. KFF put the 2026 national average benchmark silver premium at $625 a month for a 40-year-old. For a 60-year-old, the 2026 national average was $11,625 a year for the lowest-cost bronze plan, $15,914 for the benchmark silver plan, and $15,672 for the lowest-cost gold plan, all before subsidies. Average deductibles in 2026 were $7,476 for bronze, $5,304 for silver, and $1,722 for gold. KFF's October 30, 2026 analysis put the 2027 benchmark average at $703 a month for a 40-year-old, up 13%.",
      },
      {
        title: "Subsidies now stop at 400% of poverty",
        body: "The enhanced premium tax credits expired on December 31, 2025. For 2027 coverage, tax credits run from 100% to 400% of the federal poverty level, which is $15,960 to $63,840 a year for one person. You are expected to pay 2.15% to 10.22% of your income toward the benchmark plan, and the credit covers the rest. Above 400%, there is no credit. One exception matters in North Carolina: if your income qualifies you for Medicaid, you cannot also claim a marketplace tax credit. KFF found that a 60-year-old earning $65,000 pays $10,389 more a year, about $865 a month, than when the enhanced credits were in place.",
      },
      {
        title: "COBRA: the same plan at full price",
        body: "COBRA lets you keep your employer plan for up to 18 months after leaving a job, but you pay the whole premium plus up to a 2% fee. At the KFF 2026 employer survey averages, that is about $833 a month for one person and $2,406 a month for a family. You have 60 days to elect COBRA after leaving. COBRA has no subsidies, and it does not count as current employer coverage for Medicare's Part B enrollment rules, so read the COBRA versus Medicare guide before you turn 65.",
      },
      {
        title: "A spouse's plan and Medicaid",
        body: "A spouse's employer plan is often the cheapest route when it is available, because the employer still pays part of the premium. Check whether your spouse's open enrollment or a qualifying life event lets you join. North Carolina expanded Medicaid on December 1, 2023. Adults ages 19 through 64 qualify with household income up to 138% of the federal poverty level, about $1,835 a month for one person under the 2026 figures. Starting January 1, 2027, most expansion adults must meet a work or community engagement requirement to keep coverage.",
      },
      {
        title: "Dates, and the Medicare handoff at 65",
        body: "Open enrollment for 2027 marketplace coverage runs November 1, 2026 through January 15, 2027 on HealthCare.gov. Enroll by December 15, 2026 for coverage starting January 1, 2027. Medicare starts at 65: your initial enrollment period begins three months before the month you turn 65. Mark the month you turn 64 and a half, and line up the Medicare side early, because a gap between your bridge coverage ending and Medicare starting can leave medical bills with no coverage behind them.",
      },
    ],
    comparison: {
      caption: "Four routes from 62 to 65",
      headers: ["Route", "Cost and how long it lasts"],
      rows: [
        [
          "Marketplace",
          "About $15,914 a year for a 60-year-old benchmark silver plan in 2026, before subsidies. Renews yearly.",
        ],
        [
          "COBRA",
          "About $833 a month for one person at 2026 averages. Lasts up to 18 months. No subsidies.",
        ],
        [
          "Spouse's plan",
          "Often the cheapest route when available. Employer still pays part of the premium.",
        ],
        [
          "Medicaid",
          "No premium for most who qualify. Adults 19 to 64 up to 138% of poverty, about $1,835 a month for one person.",
        ],
      ],
    },
    checklist: [
      "Price the marketplace for your age and county before assuming COBRA is cheaper.",
      "Check whether your income qualifies for a tax credit, and where the 400% line falls.",
      "Confirm your doctors are in the plan's network before enrolling.",
      "Put your 65th birthday month on the calendar and start the Medicare steps three months before.",
      "If you are on COBRA, check the Medicare Part B rules before you turn 65.",
    ],
    faqs: [
      {
        q: "What is the cheapest health insurance before Medicare?",
        a: "It depends on income. With a low income, Medicaid or a subsidized marketplace plan is usually cheapest. With a higher income, a spouse's plan often wins. COBRA is rarely the cheapest, but it keeps your doctors and plan.",
      },
      {
        q: "Can I get a subsidy at 62?",
        a: "Yes, if your household income is between 100% and 400% of the federal poverty level and you do not qualify for Medicaid or other qualifying coverage. For 2027 coverage that is $15,960 to $63,840 a year for one person. In North Carolina, adults with income up to 138% of poverty generally qualify for Medicaid instead, and Medicaid coverage means no marketplace tax credit. Above 400%, there is no credit.",
      },
      {
        q: "Does COBRA count for Medicare enrollment?",
        a: "No. COBRA does not count as coverage based on current employment for Medicare Part B, so it does not open a special enrollment period. Check the COBRA versus Medicare guide before you turn 65.",
      },
      {
        q: "When should I start planning for Medicare at 65?",
        a: "Three months before the month you turn 65, when your initial enrollment period opens. If you are on a bridge plan, line up the switch early so coverage does not gap.",
      },
    ],
    sources: [
      {
        title: "KFF: Marketplace average benchmark premiums",
        url: "https://www.kff.org/affordable-care-act/state-indicator/marketplace-average-benchmark-premiums/",
      },
      {
        title: "KFF: How the loss of enhanced premium tax credits affects older adults",
        url: "https://www.kff.org/affordable-care-act/how-will-the-loss-of-enhanced-premium-tax-credits-affect-older-adults/",
      },
      {
        title: "Medicare.gov: When does Medicare coverage start",
        url: "https://www.medicare.gov/basics/get-started-with-medicare/sign-up/when-does-medicare-coverage-start",
      },
      {
        title: "NC Medicaid: Eligibility",
        url: "https://medicaid.ncdhhs.gov/eligibility",
      },
    ],
    related: [
      { title: "COBRA vs Medicare at 65", href: "/guides/cobra-vs-medicare-at-65" },
      { title: "Turning 65 with a marketplace plan", href: "/guides/turning-65-aca-marketplace-plan" },
      { title: "Your Medicare checklist for turning 65", href: "/turning-65" },
      { title: "What Medicare does not cover", href: "/guides/what-medicare-does-not-cover" },
    ],
    query: "health insurance before medicare 62 to 65",
    opportunity:
      "Bridge years carry the highest unsubsidized premiums in the market; answer with dated costs and the 400% subsidy line.",
    intent: "informational",
    datePublished: "2026-11-07",
    dateModified: "2026-11-07",
  },
];

export function findTrafficGuide(slug: string) {
  return TRAFFIC_GUIDES.find((guide) => guide.slug === slug);
}
