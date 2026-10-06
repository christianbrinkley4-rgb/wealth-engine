/**
 * Articles for /wealth/learn. Copy lives here so yearly figures are edited in
 * one place. Figures marked 2026 were checked against IRS.gov on 2026-10-06
 * and need a refresh each January.
 *
 * Voice: Christian talking to someone his own age. Short sentences. No
 * recommendations to buy anything. See lib/__tests__/wealth-content.test.ts.
 */

export type WealthPillarId = "money-basics" | "accounting-explained";

export type WealthArticle = {
  slug: string;
  pillar: WealthPillarId;
  title: string;
  metaTitle: string;
  description: string;
  /** One or two sentences that answer the question outright. */
  answer: string;
  minutes: number;
  published: string;
  updated: string;
  sections: Array<{ heading: string; paragraphs: string[]; list?: string[] }>;
  faq: Array<{ q: string; a: string }>;
  sources: Array<{ label: string; href: string }>;
  /** Slug of a tool in lib/wealth/site.ts. */
  relatedTool: string;
  relatedArticles: string[];
};

export const WEALTH_PILLAR_LABELS: Record<WealthPillarId, string> = {
  "money-basics": "Money basics",
  "accounting-explained": "Accounting explained",
};

export const WEALTH_ARTICLES: readonly WealthArticle[] = [
  {
    slug: "budgeting-on-your-first-job",
    pillar: "money-basics",
    title: "Budgeting on your first job",
    metaTitle: "Budgeting on Your First Job: A 10-Minute First Budget",
    description:
      "Your first paycheck is smaller than your salary says. Here's how to read it and build a first budget in ten minutes.",
    answer:
      "Budget from your take-home pay, not your salary. List the bills that don't wait, pick a savings amount, and let the rest be spending money you don't have to feel bad about.",
    minutes: 4,
    published: "2026-10-06",
    updated: "2026-10-06",
    sections: [
      {
        heading: "Why your paycheck looks wrong",
        paragraphs: [
          "Your offer letter shows gross pay. Your bank account gets net pay. The gap is taxes and anything you signed up for at work.",
          "On a normal W-2 paycheck you'll see federal income tax, Social Security at 6.2% and Medicare at 1.45%. Most states take income tax too. Health insurance and retirement contributions come out as well if you enrolled.",
          "So a budget built on your salary is already broken. Use the number that actually lands in your account.",
        ],
      },
      {
        heading: "The ten-minute first budget",
        paragraphs: ["You don't need an app. You need four numbers."],
        list: [
          "Take-home pay for one month. Two paychecks if you're paid every other week.",
          "Bills that don't wait: rent, utilities, phone, insurance, gas, groceries, minimum debt payments.",
          "A savings amount. Even $50. Move it the day you get paid.",
          "What's left. That's your spending money, and you can spend it without guilt.",
        ],
      },
      {
        heading: "Pay yourself on payday",
        paragraphs: [
          "Saving what's left at the end of the month fails. Nothing is ever left. Flip the order. Set an automatic transfer for the morning your paycheck hits.",
          "If your job offers a retirement plan with a match, find out the formula. A match is part of your pay. You only get it if you contribute.",
        ],
      },
      {
        heading: "Expect month one to be wrong",
        paragraphs: [
          "Your first budget is a guess. That's fine. Check it against your bank statement after 30 days and fix the lines you missed. By month three it feels real.",
        ],
      },
    ],
    faq: [
      {
        q: "Should I budget with gross pay or take-home pay?",
        a: "Take-home pay. It's the money you can actually spend, after taxes and paycheck deductions.",
      },
      {
        q: "How much of my first paycheck should I save?",
        a: "There's no single right number. The 50/30/20 rule uses 20% of take-home pay as a target for savings and extra debt payments. If that's out of reach, start smaller and raise it when you get a raise.",
      },
      {
        q: "Do I need a budgeting app?",
        a: "No. A notes app or a spreadsheet works. The tool matters less than checking it once a week.",
      },
    ],
    sources: [
      {
        label: "IRS: Social Security and Medicare withholding rates",
        href: "https://www.irs.gov/taxtopics/tc751",
      },
      {
        label: "CFPB: Budgeting tools",
        href: "https://www.consumerfinance.gov/consumer-tools/budgeting/",
      },
    ],
    relatedTool: "budget",
    relatedArticles: ["the-50-30-20-rule", "emergency-funds"],
  },
  {
    slug: "what-is-a-roth-ira",
    pillar: "money-basics",
    title: "What a Roth IRA actually is",
    metaTitle: "What Is a Roth IRA? Plain-English Guide for Your 20s (2026)",
    description:
      "A Roth IRA is an account, not an investment. You pay tax now so qualified withdrawals later are tax-free. 2026 limits inside.",
    answer:
      "A Roth IRA is a retirement account you open yourself. You put in money you've already paid tax on, and qualified withdrawals in retirement come out tax-free. For 2026 the contribution limit is $7,500 if you're under 50.",
    minutes: 5,
    published: "2026-10-06",
    updated: "2026-10-06",
    sections: [
      {
        heading: "It's a container, not an investment",
        paragraphs: [
          "This trips up almost everyone. A Roth IRA is a type of account. Think of it as a box with special tax rules. What you hold inside the box is a separate decision.",
          "Opening the account and putting money in does not invest it. Plenty of people find out years later that their contributions sat in cash the whole time.",
        ],
      },
      {
        heading: "The trade: tax now, none later",
        paragraphs: [
          "With a Roth, you contribute money that's already been taxed. In exchange, growth and qualified withdrawals are tax-free. The main route to qualified: you're at least 59 and a half, and the account has been open five years.",
          "A traditional IRA flips it. You may get a tax deduction now, and you pay income tax when you take money out.",
        ],
      },
      {
        heading: "The 2026 rules, short version",
        paragraphs: ["These are the IRS numbers for 2026."],
        list: [
          "Contribution limit: $7,500 across all your IRAs if you're under 50.",
          "You need earned income, and you can't contribute more than you earned.",
          "Single filers: the amount you can contribute phases out between $153,000 and $168,000 of modified adjusted gross income.",
          "Married filing jointly: it phases out between $242,000 and $252,000.",
        ],
      },
      {
        heading: "Why people in their 20s look at it",
        paragraphs: [
          "Two reasons. First, a starting salary sits in a low tax bracket, and a Roth locks in that rate on the money you put in. Second, time. Tax-free growth gets decades to work.",
          "Also worth knowing: you can take out the amount you contributed at any time without tax or penalty. Earnings are different. Pulling those early can mean tax and a 10% penalty.",
          "Whether a Roth fits you depends on your income, your taxes and your goals. I can explain how it works. I can't tell you what to put in it.",
        ],
      },
    ],
    faq: [
      {
        q: "How much can I put in a Roth IRA in 2026?",
        a: "Up to $7,500 if you're under 50, or your earned income for the year if that's less. The limit covers all your IRAs combined.",
      },
      {
        q: "Can I take money out of a Roth IRA early?",
        a: "You can withdraw your contributions at any time without tax or penalty. Earnings are different. Take them out before 59 and a half, or before the account is five years old, and you can owe tax plus a 10% penalty. A few exceptions apply.",
      },
      {
        q: "Is a Roth IRA the same as a Roth 401(k)?",
        a: "No. A Roth 401(k) is offered through an employer and has a higher limit, $24,500 in 2026. A Roth IRA is one you open on your own. Both use after-tax money.",
      },
      {
        q: "Do I have to pick investments?",
        a: "Yes. The account only holds what you choose to put in it. Money left as cash stays cash. A licensed advisor can help with that choice, or you can research it yourself.",
      },
    ],
    sources: [
      {
        label: "IRS: 401(k) limit increases to $24,500 for 2026, IRA limit increases to $7,500",
        href: "https://www.irs.gov/newsroom/401k-limit-increases-to-24500-for-2026-ira-limit-increases-to-7500",
      },
      { label: "IRS: Roth IRAs", href: "https://www.irs.gov/retirement-plans/roth-iras" },
    ],
    relatedTool: "roth-vs-traditional",
    relatedArticles: ["emergency-funds", "budgeting-on-your-first-job"],
  },
  {
    slug: "credit-scores-explained",
    pillar: "money-basics",
    title: "Credit scores, explained",
    metaTitle: "Credit Scores Explained: What Moves the Number and What Doesn't",
    description:
      "A credit score runs from 300 to 850. Five things move it, and two of them do most of the work. Here's the breakdown.",
    answer:
      "A FICO score runs from 300 to 850 and is built from five things: payment history (35%), amounts owed (30%), length of credit history (15%), new credit (10%) and credit mix (10%). Paying on time and keeping balances low do most of the work.",
    minutes: 4,
    published: "2026-10-06",
    updated: "2026-10-06",
    sections: [
      {
        heading: "What the number is",
        paragraphs: [
          "A credit score is a guess about how likely you are to pay back what you borrow. Lenders use it to decide yes or no, and what rate to charge. Landlords and insurers sometimes look at credit too.",
          "The most common scores run from 300 to 850. Higher is better. You don't have one score. You have several, because there are different scoring models and three credit bureaus.",
        ],
      },
      {
        heading: "The five ingredients",
        paragraphs: ["FICO publishes how its score is weighted."],
        list: [
          "Payment history, 35%. Do you pay on time?",
          "Amounts owed, 30%. How much of your available credit are you using?",
          "Length of credit history, 15%. How old are your accounts?",
          "New credit, 10%. How many accounts have you applied for lately?",
          "Credit mix, 10%. Cards, car loans, student loans and so on.",
        ],
      },
      {
        heading: "What moves it most",
        paragraphs: [
          "Two things make up 65% of the score. Pay every bill on time, and keep card balances low compared with your limits. Autopay for at least the minimum protects the first one.",
          "Time handles a lot of the rest. An old account in good standing helps, which is why closing your oldest card can backfire.",
        ],
      },
      {
        heading: "Myths worth dropping",
        paragraphs: [
          "Checking your own credit does not lower your score. That's a soft inquiry. Applying for new credit is a hard inquiry, and that can dip it a little for a while.",
          "You also don't need to carry a balance and pay interest to build credit. Using a card and paying the statement in full each month reports as on-time payments.",
          "You can pull your credit reports from all three bureaus for free at AnnualCreditReport.com. Read them. Mistakes happen, and you can dispute them.",
        ],
      },
    ],
    faq: [
      {
        q: "What is a good credit score?",
        a: "Lenders set their own cutoffs, so there's no single line on the 300 to 850 scale. Higher scores get better rates.",
      },
      {
        q: "Does checking my credit score hurt it?",
        a: "No. Checking your own score or report is a soft inquiry and has no effect. Hard inquiries come from applying for credit.",
      },
      {
        q: "How do I start building credit with no history?",
        a: "Three ways in: a secured card, a student card, or being added as an authorized user on a family member's card. What matters after that is paying on time, every time.",
      },
      {
        q: "Where can I get my credit report for free?",
        a: "AnnualCreditReport.com is the official site. You can get free reports from Equifax, Experian and TransUnion there.",
      },
    ],
    sources: [
      {
        label: "CFPB: Credit reports and scores",
        href: "https://www.consumerfinance.gov/consumer-tools/credit-reports-and-scores/",
      },
      {
        label: "myFICO: What's in my FICO Scores",
        href: "https://www.myfico.com/credit-education/whats-in-your-credit-score",
      },
      { label: "AnnualCreditReport.com", href: "https://www.annualcreditreport.com/" },
    ],
    relatedTool: "debt-payoff",
    relatedArticles: ["budgeting-on-your-first-job", "emergency-funds"],
  },
  {
    slug: "what-accountants-actually-do",
    pillar: "accounting-explained",
    title: "What accountants actually do",
    metaTitle: "What Do Accountants Actually Do? An Accounting Senior Explains",
    description:
      "Accounting isn't just taxes. It's how a business keeps score. Here's what the work looks like, from an accounting senior.",
    answer:
      "Accountants record what a business earns, owns and owes, then turn that into statements people can trust and use to make decisions. Tax is one branch. Audit, bookkeeping, and internal finance are others.",
    minutes: 4,
    published: "2026-10-06",
    updated: "2026-10-06",
    sections: [
      {
        heading: "Accounting is the scoreboard",
        paragraphs: [
          "I'm an accounting senior at UNCG, and the question I get most is: so you do taxes? Sometimes. But tax is one corner of it.",
          "Accounting is how a business keeps score. Every sale, bill and paycheck gets recorded. Then it gets organized so someone can answer real questions. Are we making money? Can we pay our bills? Where did the cash go?",
        ],
      },
      {
        heading: "The main kinds of work",
        paragraphs: ["The same degree leads to very different days."],
        list: [
          "Bookkeeping: recording the day-to-day transactions.",
          "Financial accounting: turning records into statements for owners, lenders and investors.",
          "Audit: checking that a company's statements are fair and backed by evidence.",
          "Tax: preparing returns and planning around the rules.",
          "Managerial accounting: budgets, costs and forecasts for the people running the business.",
        ],
      },
      {
        heading: "The three statements",
        paragraphs: [
          "Almost everything ends up in three reports. The income statement shows revenue, expenses and profit over a period. The balance sheet shows what a company owns and owes on one day. The cash flow statement shows where cash actually came from and went.",
          "Profit and cash are not the same thing. A company can show a profit and still run out of cash. Learning to spot that is half the job.",
        ],
      },
      {
        heading: "Why this matters for your own money",
        paragraphs: [
          "Your life has the same three statements. Your paycheck and spending are an income statement. What you own and owe is a balance sheet. Your bank account is cash flow.",
          "And a CPA is a state license, not a degree. It takes an exam, education and experience, and the details vary by state. I'm not a CPA. I'm a student who likes this stuff enough to build tools for it.",
        ],
      },
    ],
    faq: [
      {
        q: "Is accounting just doing taxes?",
        a: "No. Tax is one area. Accountants also keep the books, prepare financial statements, audit other companies' numbers, and build budgets and forecasts.",
      },
      {
        q: "What is the difference between an accountant and a CPA?",
        a: "A CPA is an accountant who holds a state license. Getting one takes passing the CPA exam and meeting education and experience requirements, which vary by state.",
      },
      {
        q: "What are the three main financial statements?",
        a: "The income statement, the balance sheet and the cash flow statement. Together they show profit, what a company owns and owes, and how cash moved.",
      },
    ],
    sources: [
      {
        label: "U.S. Bureau of Labor Statistics: Accountants and Auditors",
        href: "https://www.bls.gov/ooh/business-and-financial/accountants-and-auditors.htm",
      },
      {
        label: "SEC: Beginners' Guide to Financial Statements",
        href: "https://www.sec.gov/about/reports-publications/investorpubsbegfinstmtguide",
      },
    ],
    relatedTool: "ratio-checker",
    relatedArticles: ["budgeting-on-your-first-job", "the-50-30-20-rule"],
  },
  {
    slug: "emergency-funds",
    pillar: "money-basics",
    title: "Emergency funds: how much, and where",
    metaTitle: "Emergency Fund: How Much You Need and Where to Keep It",
    description:
      "An emergency fund is cash for surprises, not for plans. The standard target is three to six months of expenses. Start with one.",
    answer:
      "An emergency fund is cash set aside for surprise costs or a loss of income. The standard target is three to six months of essential expenses, kept in an insured savings account you can reach quickly. Starting with $500 or one month still counts.",
    minutes: 3,
    published: "2026-10-06",
    updated: "2026-10-06",
    sections: [
      {
        heading: "What it's for",
        paragraphs: [
          "A blown tire. A cracked phone you need for work. Hours cut at your job. An emergency fund turns those from a crisis into a bad week.",
          "Without one, the surprise goes on a credit card, and now you're paying interest on bad luck.",
        ],
      },
      {
        heading: "How much",
        paragraphs: [
          "The standard target is three to six months of essential expenses. Essential means rent, food, utilities, insurance, transportation and minimum debt payments. Not your full lifestyle.",
          "On a first paycheck that number looks impossible. So break it up.",
        ],
        list: [
          "Level 1: $500. Covers the most common surprises.",
          "Level 2: one month of essentials.",
          "Level 3: three months.",
          "Level 4: six months, if your income is unsteady or others depend on you.",
        ],
      },
      {
        heading: "Where to keep it",
        paragraphs: [
          "Somewhere safe, separate and easy to reach. A savings account at a bank or credit union fits. Deposits at FDIC-insured banks are covered up to $250,000 per depositor, per bank, per ownership category. Credit unions have similar coverage through the NCUA.",
          "Separate matters. Money in checking gets spent. A different account, with a boring name, gets left alone.",
        ],
      },
      {
        heading: "What counts as an emergency",
        paragraphs: [
          "Ask three questions. Was it unexpected? Is it necessary? Is it urgent? Three yeses, use the fund. Then refill it.",
          "A sale is not an emergency. Neither is a vacation. Those get their own savings line.",
        ],
      },
    ],
    faq: [
      {
        q: "How much should I have in an emergency fund?",
        a: "The standard target is three to six months of essential expenses. If that's far off, start with $500, then one month, and build from there.",
      },
      {
        q: "Should I pay off debt or build an emergency fund first?",
        a: "Both, in order. Build a small starter fund so a surprise doesn't land on a card. Then send extra money at high-rate debt. Then finish the fund.",
      },
      {
        q: "Where should I keep my emergency fund?",
        a: "In an insured savings account you can reach within a day or two, separate from your everyday checking.",
      },
    ],
    sources: [
      {
        label: "CFPB: An essential guide to building an emergency fund",
        href: "https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/",
      },
      { label: "FDIC: Deposit insurance", href: "https://www.fdic.gov/resources/deposit-insurance" },
    ],
    relatedTool: "first-1000",
    relatedArticles: ["budgeting-on-your-first-job", "the-50-30-20-rule"],
  },
  {
    slug: "the-50-30-20-rule",
    pillar: "money-basics",
    title: "The 50/30/20 rule",
    metaTitle: "The 50/30/20 Rule: How It Works and When to Bend It",
    description:
      "50% needs, 30% wants, 20% savings and debt, all from take-home pay. A starting point, not a law. Here's how to use it.",
    answer:
      "The 50/30/20 rule splits take-home pay three ways: 50% to needs, 30% to wants, and 20% to savings and extra debt payments. It's a starting point. High rent or debt means you adjust the split, and that's normal.",
    minutes: 3,
    published: "2026-10-06",
    updated: "2026-10-06",
    sections: [
      {
        heading: "The three buckets",
        paragraphs: [
          "The rule was popularized by the 2005 book All Your Worth, by Elizabeth Warren and Amelia Warren Tyagi. It works on after-tax income.",
        ],
        list: [
          "Needs, 50%. Housing, utilities, groceries, transportation, insurance, minimum debt payments.",
          "Wants, 30%. Eating out, subscriptions, travel, upgrades. Things you could cut but would rather not.",
          "Savings and debt, 20%. Emergency fund, retirement, and anything above the minimum on debt.",
        ],
      },
      {
        heading: "A quick example",
        paragraphs: [
          "Say you bring home $3,000 a month. The classic split is $1,500 for needs, $900 for wants and $600 for savings and extra debt payments.",
          "Now check it against real life. If rent and a car payment already eat $1,900, you're at 63% needs. The rule didn't fail. It just showed you where the pressure is.",
        ],
      },
      {
        heading: "When to bend it",
        paragraphs: [
          "In a high-rent city, needs can run 60% or more. On an entry-level salary, 20% savings may not be possible yet. Carrying high-rate debt? Flip wants and savings until it's gone.",
          "The percentages matter less than the habit. Know your three numbers and move them on purpose.",
        ],
      },
      {
        heading: "Need or want?",
        paragraphs: [
          "The test: would something break if you stopped paying it? Rent, yes. The basic phone plan, yes. The newest phone, no. A gym you use daily is a want, and wants are allowed. That's what the 30% is for.",
          "Some bills are both. A car payment is a need. The part of it that's there because you picked the nicer trim is a want. You don't have to split every bill. Just be honest about the big ones.",
        ],
      },
      {
        heading: "How to use it this week",
        paragraphs: [
          "Pull up last month's bank statement. Sort each charge into one of the three buckets. Add them up and divide each by your take-home pay. Now you have your real split, and you can decide which number to move first.",
        ],
      },
    ],
    faq: [
      {
        q: "Is the 50/30/20 rule based on gross or net income?",
        a: "Net. It uses take-home pay, after taxes.",
      },
      {
        q: "What if my needs are more than 50%?",
        a: "You're not alone. High rent and a first salary push needs past 50%. Lower the wants share first, keep some savings going even if it's small, and revisit the split when your income changes.",
      },
      {
        q: "Do debt payments count as needs or savings?",
        a: "Minimum payments are needs, because skipping them has consequences. Anything you pay above the minimum goes in the 20% bucket.",
      },
    ],
    sources: [
      {
        label: "CFPB: Budgeting tools",
        href: "https://www.consumerfinance.gov/consumer-tools/budgeting/",
      },
    ],
    relatedTool: "budget",
    relatedArticles: ["budgeting-on-your-first-job", "emergency-funds"],
  },
];

export function getWealthArticle(slug: string): WealthArticle | undefined {
  return WEALTH_ARTICLES.find((article) => article.slug === slug);
}

/** Every visitor-facing word in an article, for the content tests. */
export function wealthArticleText(article: WealthArticle): string {
  return [
    article.title,
    article.description,
    article.answer,
    ...article.sections.flatMap((section) => [
      section.heading,
      ...section.paragraphs,
      ...(section.list ?? []),
    ]),
    ...article.faq.flatMap((item) => [item.q, item.a]),
  ].join("\n");
}
