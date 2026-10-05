/**
 * Taxes & Retirement explainers.
 *
 * Educational only. Christian is a licensed insurance agent and an accounting
 * student on the CPA track, not a CPA or tax preparer, and these pages never
 * say otherwise or promise a tax outcome. Each article answers one question,
 * shows the rule, and ends at one honest next step.
 *
 * Rules were written from IRS and SSA publications (linked in each article's
 * sources). Thresholds that change by law or by year are stated only where
 * they are fixed in statute (the Social Security taxation thresholds have not
 * been indexed since they were set) or tied to a birth year (RMD ages). When
 * a rule changes, update it here and bump `updated`.
 *
 * Same writing rules as lib/articles.ts: plain English, short sentences, no em
 * dashes, no product recommendations, no promises.
 */

import type { Article } from "@/lib/articles";

const p = (text: string) => ({ kind: "p" as const, text });
const ul = (...items: string[]) => ({ kind: "ul" as const, items });

export const TAX_ARTICLES: Article[] = [
  {
    slug: "is-social-security-taxable",
    title: "Do I have to pay taxes on my Social Security?",
    metaTitle: "Is Social Security Taxable? The Federal Rule and NC",
    description:
      "How much of your Social Security can be taxed, the income thresholds the IRS uses, and why North Carolina doesn't tax it. Plain English, with sources.",
    keyword: "is social security taxable",
    eyebrow: "Taxes & retirement",
    lede: "Maybe some of it. Here's the test the IRS uses, the numbers that matter, and what North Carolina does.",
    published: "2026-10-05",
    updated: "2026-10-05",
    intro:
      "This one surprises a lot of people. You paid into Social Security your whole working life, so it feels like it should come back tax free. Sometimes it does. But depending on your other income, part of it can be taxed by the federal government. The good news: there's a clear test, and North Carolina stays out of it.",
    sections: [
      {
        h2: "The test: your combined income",
        blocks: [
          p(
            "The IRS doesn't look at your Social Security by itself. It looks at what Social Security calls your combined income. That's three things added together:",
          ),
          ul(
            "Your adjusted gross income (wages, pensions, IRA withdrawals, interest, dividends, and so on)",
            "Any tax-exempt interest, like interest from municipal bonds",
            "Half of your Social Security benefits for the year",
          ),
          p(
            "If that total stays under a certain line, none of your benefits are taxed. Go over it, and part of them can be.",
          ),
        ],
      },
      {
        h2: "The numbers",
        blocks: [
          p("For someone filing as single:"),
          ul(
            "Combined income under $25,000: none of your benefits are taxable.",
            "Between $25,000 and $34,000: up to 50% of your benefits can be taxable.",
            "Over $34,000: up to 85% can be taxable.",
          ),
          p("For a married couple filing jointly:"),
          ul(
            "Under $32,000: none taxable.",
            "Between $32,000 and $44,000: up to 50% can be taxable.",
            "Over $44,000: up to 85% can be taxable.",
          ),
          p(
            "Two things worth knowing. First, “up to 85% taxable” doesn't mean an 85% tax. It means up to 85% of your benefit gets added to your taxable income, then taxed at your normal rate. Second, these lines were set decades ago and don't go up with inflation. That's why more retirees cross them every year.",
          ),
          p(
            "If you're married filing separately and lived with your spouse at any point in the year, the rules are stricter, and up to 85% of benefits can generally be taxed.",
          ),
        ],
      },
      {
        h2: "What North Carolina does",
        blocks: [
          p(
            "North Carolina doesn't tax Social Security benefits. If part of your benefit shows up in your federal adjusted gross income, the state lets you take it back out on your NC return. Your pension and IRA withdrawals are a different story, so don't assume all retirement income gets the same treatment.",
          ),
        ],
      },
      {
        h2: "Why your other income matters so much",
        blocks: [
          p(
            "Since the test adds up everything, a decision about one account can change the tax on another. A big IRA withdrawal, a [Roth conversion](/taxes-and-retirement/roth-conversion-basics), or selling investments at a gain can all push your combined income over a line. Suddenly more of your Social Security is taxable too.",
          ),
          p(
            "Higher income can also raise your Medicare premiums two years later through something called IRMAA. I wrote about that in [Will Medicare cost me more because of my income?](/answers/medicare-irmaa-income-premiums)",
          ),
        ],
      },
      {
        h2: "Paying the tax without a surprise in April",
        blocks: [
          p(
            "Social Security doesn't hold back federal tax unless you ask. If you expect to owe, you have two options:",
          ),
          ul(
            "Fill out IRS Form W-4V and give it to Social Security. You can have 7%, 10%, 12%, or 22% of each payment withheld.",
            "Make quarterly estimated payments to the IRS instead.",
          ),
          p(
            "Each January, Social Security mails you a Form SSA-1099 showing what you were paid. That's the number you or your tax preparer will use.",
          ),
          p(
            "One more recent change: for tax years 2025 through 2028, people 65 and older can take an extra federal deduction of up to $6,000 each, which shrinks at higher incomes. It doesn't change the test above, but it can lower the taxable income you end up with. Ask whoever prepares your return how it applies to you.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "Will I ever pay tax on all of my Social Security?",
        a: "No. Under federal law, the most that can be counted as taxable income is 85% of your benefits, no matter how high your other income is.",
      },
      {
        q: "Are my Medicare premiums part of this?",
        a: "Your Part B premium is usually taken out of your Social Security check, but the full benefit before premiums is what counts for this test. Your SSA-1099 shows both numbers.",
      },
      {
        q: "Does North Carolina tax my IRA withdrawals?",
        a: "Generally yes. North Carolina exempts Social Security, but most other retirement income, like traditional IRA and 401(k) withdrawals, is taxed by the state.",
      },
      {
        q: "Can you do my taxes?",
        a: "No. I'm an insurance agent and an accounting student working toward my CPA, not a tax preparer. I'm glad to explain how this connects to your Medicare costs, and you should run your actual numbers with a tax professional.",
      },
    ],
    sources: [
      {
        label: "SSA: Income taxes and your Social Security benefit",
        href: "https://www.ssa.gov/benefits/retirement/planner/taxes.html",
      },
      {
        label: "IRS Publication 915: Social Security and Equivalent Railroad Retirement Benefits",
        href: "https://www.irs.gov/publications/p915",
      },
      { label: "North Carolina Department of Revenue", href: "https://www.ncdor.gov/" },
    ],
    related: [
      { label: "Required minimum distributions, explained", href: "/taxes-and-retirement/required-minimum-distributions" },
      { label: "Roth conversions, explained", href: "/taxes-and-retirement/roth-conversion-basics" },
      { label: "When to start Social Security", href: "/social-security-timing" },
      { label: "Will Medicare cost me more because of my income?", href: "/answers/medicare-irmaa-income-premiums" },
    ],
    startHref: "/start?topic=financial_planning",
  },
  {
    slug: "required-minimum-distributions",
    title: "What are required minimum distributions, and when do they start?",
    metaTitle: "RMDs Explained: When They Start and How They're Taxed",
    description:
      "When required minimum distributions start (73 or 75), how the amount is figured, what happens if you miss one, and how RMDs touch Medicare costs.",
    keyword: "when do required minimum distributions start",
    eyebrow: "Taxes & retirement",
    lede: "The IRS let your retirement savings grow without tax for years. RMDs are when it starts asking for its share.",
    published: "2026-10-05",
    updated: "2026-10-05",
    intro:
      "If you have money in a traditional IRA or a 401(k), you can't leave it there forever. At a certain age, the IRS requires you to start taking some out every year, and those withdrawals are taxed as income. They're called required minimum distributions, or RMDs. Here's when they start and what to watch for.",
    sections: [
      {
        h2: "When they start",
        blocks: [
          p("Your RMD age depends on the year you were born:"),
          ul(
            "Born 1951 through 1959: RMDs start at 73.",
            "Born 1960 or later: RMDs start at 75.",
          ),
          p(
            "Your first RMD is due by April 1 of the year after you reach that age. Every one after that is due by December 31. Here's the catch: if you wait until April for the first one, you'll take two in the same calendar year, and both count as income that year.",
          ),
        ],
      },
      {
        h2: "Which accounts have them",
        blocks: [
          ul(
            "Traditional IRAs, SEP IRAs, and SIMPLE IRAs: yes.",
            "401(k), 403(b), and similar workplace plans: yes, with one exception below.",
            "Roth IRAs: no, not while the original owner is alive.",
            "Roth 401(k) and Roth 403(b) accounts: no, starting in 2024.",
          ),
          p(
            "The exception: if you're still working past your RMD age and you don't own 5% or more of the company, your current employer's plan may let you wait until you retire. That doesn't apply to IRAs.",
          ),
          p(
            "Inherited accounts follow different rules, often a 10-year window. If you've inherited an IRA, get help with that one specifically.",
          ),
        ],
      },
      {
        h2: "How the amount is figured",
        blocks: [
          p(
            "Take each account's balance as of December 31 of last year. Divide it by a life expectancy number from an IRS table. Most people use the Uniform Lifetime Table. The factor gets smaller each year, so the share you have to take gets a little bigger as you get older.",
          ),
          p(
            "If you have several traditional IRAs, you figure the RMD for each one, but you can take the total from any of them. Workplace plans like 401(k)s usually have to be handled one plan at a time.",
          ),
          p(
            "You can always take more than the minimum. You just can't take less.",
          ),
        ],
      },
      {
        h2: "If you miss one",
        blocks: [
          p(
            "The penalty is a 25% excise tax on the amount you should have taken and didn't. If you catch it and fix it within the correction window, generally about two years, it drops to 10%. It's worth setting a reminder. Many custodians will calculate the amount and even send it automatically if you ask.",
          ),
        ],
      },
      {
        h2: "How RMDs touch Medicare and Social Security",
        blocks: [
          p(
            "This is the part people don't see coming. An RMD is taxable income, so it can:",
          ),
          ul(
            "Push more of your Social Security into taxable territory. See [Do I have to pay taxes on my Social Security?](/taxes-and-retirement/is-social-security-taxable)",
            "Raise your Medicare Part B and Part D premiums two years later through IRMAA, if your income crosses a bracket.",
          ),
          p(
            "That's why some people look at the years before RMDs start, sometimes called the gap years, to spread out income on purpose. One way is a [Roth conversion](/taxes-and-retirement/roth-conversion-basics). Another, for people who give to charity, is a qualified charitable distribution: at 70½ or older, you can send money straight from an IRA to a charity. It counts toward your RMD and isn't added to your income, up to a yearly limit the IRS sets.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "Do I have to spend my RMD?",
        a: "No. You have to take it out of the retirement account and pay the tax. After that, you can save it, invest it in a regular account, or spend it.",
      },
      {
        q: "Can I have taxes withheld from my RMD?",
        a: "Yes. Most custodians let you choose federal and state withholding on the distribution, which can save you from making estimated payments.",
      },
      {
        q: "I turned 73 this year. Is my first RMD due by December 31?",
        a: "You can wait until April 1 of next year for the first one. If you do, you'll also owe next year's RMD by December 31, so two will count as income in the same year.",
      },
      {
        q: "Can you tell me how much to take?",
        a: "Your custodian or tax professional should confirm your exact amount. I can walk through how the income might affect your Medicare premiums, and point you to the advisor I work with if you want planning help.",
      },
    ],
    sources: [
      {
        label: "IRS: Retirement plan and IRA required minimum distributions FAQs",
        href: "https://www.irs.gov/retirement-plans/retirement-plan-and-ira-required-minimum-distributions-faqs",
      },
      {
        label: "IRS Publication 590-B: Distributions from Individual Retirement Arrangements",
        href: "https://www.irs.gov/publications/p590b",
      },
      {
        label: "SSA: Premiums, rules for higher-income beneficiaries",
        href: "https://www.ssa.gov/benefits/medicare/medicare-premiums.html",
      },
    ],
    related: [
      { label: "Roth conversions, explained", href: "/taxes-and-retirement/roth-conversion-basics" },
      { label: "Is Social Security taxable?", href: "/taxes-and-retirement/is-social-security-taxable" },
      { label: "Your Roth conversion window", href: "/roth-window" },
      { label: "Retirement income help", href: "/retirement-income" },
    ],
    startHref: "/start?topic=financial_planning",
  },
  {
    slug: "roth-conversion-basics",
    title: "What is a Roth conversion, and who looks at one?",
    metaTitle: "Roth Conversions Explained: How They Work and the Catches",
    description:
      "What a Roth conversion is, how it's taxed, the five-year rules, and how converting can affect Medicare premiums and Social Security taxes.",
    keyword: "roth conversion explained",
    eyebrow: "Taxes & retirement",
    lede: "Pay tax now so you don't pay it later. Sometimes that's smart, sometimes it isn't. Here's how it works.",
    published: "2026-10-05",
    updated: "2026-10-05",
    intro:
      "A Roth conversion means moving money from a traditional IRA or 401(k) into a Roth IRA. You pay income tax on what you move this year. In exchange, that money can grow and come out tax free later, and it's not subject to required minimum distributions while you're alive. Whether that trade makes sense depends a lot on timing.",
    sections: [
      {
        h2: "How it's taxed",
        blocks: [
          p(
            "Whatever you convert gets added to your taxable income for the year, just like a paycheck. Convert $30,000 and you're taxed as if you earned $30,000 more. There's no income limit on who can convert, and you don't have to convert everything at once. Plenty of people do it in smaller pieces over several years.",
          ),
          p(
            "One rule to respect: since 2018, a conversion can't be undone. Once it's done, the tax is owed.",
          ),
        ],
      },
      {
        h2: "Why people look at it",
        blocks: [
          p("The usual reasons:"),
          ul(
            "They expect their tax rate to be the same or higher later, so paying now looks cheaper.",
            "They want to shrink future RMDs, which are taxed as income every year.",
            "They want to leave money to family that can generally come out tax free.",
            "They're in the gap years: retired, but before Social Security and RMDs start, when income can be unusually low.",
          ),
          p(
            "Those gap years are the reason I built the [Roth conversion window tool](/roth-window). It shows how many low-income years you might have before RMDs begin.",
          ),
        ],
      },
      {
        h2: "The catches",
        blocks: [
          p("This is where it gets real. A conversion raises your income, and income is connected to other things:"),
          ul(
            "Medicare premiums. Medicare sets your Part B and Part D premiums using your income from two years earlier. A large conversion at 63 or later can mean higher premiums at 65 and beyond. That's IRMAA, and I explain it in [Will Medicare cost me more because of my income?](/answers/medicare-irmaa-income-premiums)",
            "Social Security taxes. If you're already collecting, the extra income can make more of your benefit taxable. See [Is Social Security taxable?](/taxes-and-retirement/is-social-security-taxable)",
            "Health insurance before 65. If you buy coverage on the Marketplace, a higher income can shrink your premium tax credit.",
            "Paying the tax. Using money from the IRA itself to pay the tax means less ends up in the Roth. People often plan to pay it from savings instead.",
          ),
        ],
      },
      {
        h2: "The five-year rules",
        blocks: [
          p(
            "There are two separate five-year clocks, and they trip people up:",
          ),
          ul(
            "Each conversion has its own five-year clock. If you're under 59½ and take out converted money before five years pass, you can owe a 10% penalty on that amount.",
            "To take out earnings tax free, you need to be 59½ or older and have had a Roth IRA for at least five years, counting from January 1 of the year you first funded one.",
          ),
          p(
            "If you're past 59½ and already have an older Roth IRA, these rules matter much less. If you're younger, they matter a lot.",
          ),
        ],
      },
      {
        h2: "So, is it worth it?",
        blocks: [
          p(
            "Honestly, it depends on your tax bracket now versus later, your Medicare timing, and when you plan to start Social Security. It's a numbers question for your specific situation, not a rule of thumb. Run it with a tax professional before you move anything, and look at Medicare brackets alongside tax brackets, because the premium jump can catch people off guard.",
          ),
        ],
      },
    ],
    faq: [
      {
        q: "Can I convert just part of my IRA?",
        a: "Yes. You choose the amount. Converting in smaller pieces over several years is a common way to keep each year's income in a lower bracket.",
      },
      {
        q: "Will a conversion raise my Medicare premiums?",
        a: "It can. Medicare uses your income from two years earlier, so a conversion at 63 can affect what you pay at 65. If your income crosses an IRMAA bracket, both Part B and Part D premiums go up for that year.",
      },
      {
        q: "Does a Roth IRA have required minimum distributions?",
        a: "Not for the original owner. People who inherit a Roth IRA generally do have to empty it within a set window, though withdrawals are usually tax free.",
      },
      {
        q: "Should I do a conversion?",
        a: "I can't tell you that, and a quiz can't either. It depends on your full tax picture. I'm glad to show you how it lines up with Medicare costs, and I'll point you to the advisor I work with for planning.",
      },
    ],
    sources: [
      {
        label: "IRS Publication 590-A: Contributions to Individual Retirement Arrangements",
        href: "https://www.irs.gov/publications/p590a",
      },
      {
        label: "IRS Publication 590-B: Distributions from Individual Retirement Arrangements",
        href: "https://www.irs.gov/publications/p590b",
      },
      {
        label: "SSA: Premiums, rules for higher-income beneficiaries",
        href: "https://www.ssa.gov/benefits/medicare/medicare-premiums.html",
      },
    ],
    related: [
      { label: "Your Roth conversion window", href: "/roth-window" },
      { label: "Conversion timing planner", href: "/plan" },
      { label: "Required minimum distributions, explained", href: "/taxes-and-retirement/required-minimum-distributions" },
      { label: "Will Medicare cost me more because of my income?", href: "/answers/medicare-irmaa-income-premiums" },
    ],
    startHref: "/start?topic=financial_planning",
  },
];

export function getTaxArticle(slug: string): Article | undefined {
  return TAX_ARTICLES.find((article) => article.slug === slug);
}
