import { AGENT } from "@/lib/agent";

/**
 * The young-money lane (/wealth and /links).
 *
 * Voice here is direct and short. Medicare pages stay warm and calm.
 * Education only: no securities advice, no fund picks, no invented figures.
 * Visitor-facing strings live on this class so a test can check them.
 */

export type WealthCard = {
  id: string;
  kicker: string;
  title: string;
  text: string;
  status: "Coming next";
};

export type WealthSection = {
  id: string;
  index: string;
  title: string;
  lede: string;
};

const COMING = "Coming next" as const;

export class WealthLane {
  static readonly hubPath = "/wealth";
  static readonly linksPath = "/links";

  /** True for the young lane only, so Medicare chrome can step aside. */
  static isYoungPath(pathname: string): boolean {
    return [this.hubPath, this.linksPath].some(
      (path) => pathname === path || pathname.startsWith(`${path}/`),
    );
  }

  static markName(): string {
    return AGENT.name;
  }

  static markRole(): string {
    return "Money education · Greensboro";
  }

  static skipLabel(): string {
    return "Skip to the main content";
  }

  static hero() {
    return {
      eyebrow: "Education only · Greensboro",
      title: "Your paycheck is the whole lesson.",
      titleMark: "paycheck",
      lede: "I’m Christian Brinkley. I write plain-language money lessons for a first job and the years after it: a pay stub, a starter emergency fund, a first budget, and the insurance questions that are actually yours.",
      cta: "Start with your paycheck",
      ctaHref: "/wealth#paycheck",
      note: "One lesson at a time. Nothing on this page is an investment pick or a policy quote.",
      facts: [
        "Life and health license, North Carolina",
        "UNCG accounting master’s, expected June 2027",
        "Not a CPA yet",
        "Not securities-licensed",
      ],
      stubCaption:
        "Labels only. No dollar amounts on this page. A later calculator will mark its figures as estimates.",
    } as const;
  }

  static stubLines(): readonly string[] {
    return ["Gross pay", "Federal income tax", "Social Security", "Medicare", "Net pay"];
  }

  static stubHeading(): { title: string; meta: string } {
    return { title: "Pay stub", meta: "Labels only" };
  }

  static sections(): {
    guides: WealthSection;
    calculators: WealthSection;
    quizzes: WealthSection;
    building: WealthSection;
    checklists: WealthSection;
  } {
    return {
      guides: {
        id: "guides",
        index: "01",
        title: "Guides",
        lede: "Six lessons. They name the terms. They do not tell you what to buy.",
      },
      calculators: {
        id: "calculators",
        index: "02",
        title: "Calculators",
        lede: "Four tools, still on the bench. No sample balances on this page.",
      },
      quizzes: {
        id: "quizzes",
        index: "03",
        title: "Quizzes",
        lede: "Two short sorts. A result will be a reading list, not a product.",
      },
      building: {
        id: "building",
        index: "04",
        title: "Building in public",
        lede: "What is live, and what is next.",
      },
      checklists: {
        id: "checklists",
        index: "05",
        title: "Checklists",
        lede: "One-page lists, when they are written. No email form on this page.",
      },
    };
  }

  static guides(): readonly WealthCard[] {
    return [
      {
        id: "paycheck",
        kicker: "Start here",
        title: "How to read your first paycheck",
        text: "Gross pay, federal tax, Social Security, and Medicare. What each line is doing on the stub.",
        status: COMING,
      },
      {
        id: "emergency",
        kicker: "Cash",
        title: "Emergency fund for young adults",
        text: "A starter stash you can finish. The 3 to 6 month idea is a common rule of thumb, not a bill due tomorrow.",
        status: COMING,
      },
      {
        id: "budget",
        kicker: "Spending",
        title: "Budget after your first real job",
        text: "The lesson walks through a 50/30/20 starting sketch, and what to change when rent does not fit the sketch.",
        status: COMING,
      },
      {
        id: "insurance",
        kicker: "Risk",
        title: "Insurance young adults actually need",
        text: "Health, renters, disability, and life. What each one is for. Your situation decides the rest. I am licensed in North Carolina for life and health, and I will not guess a policy from a headline.",
        status: COMING,
      },
      {
        id: "side-income",
        kicker: "Taxes",
        title: "Side hustle and W-2 tax basics",
        text: "Side income can be taxable even when nobody sends a 1099. The lesson will cover the vocabulary. A tax pro does the return.",
        status: COMING,
      },
      {
        id: "workplace-plan",
        kicker: "Work plan",
        title: "401(k) basics for your first job",
        text: "What the plan is, and what an employer match means in plain language. No fund picks. A securities-licensed professional handles investments.",
        status: COMING,
      },
    ];
  }

  static calculators(): readonly WealthCard[] {
    return [
      {
        id: "calc-paycheck",
        kicker: "Calculator",
        title: "Paycheck line map",
        text: "Type a gross amount later and see the stub lines labeled. No live numbers on this page.",
        status: COMING,
      },
      {
        id: "calc-emergency",
        kicker: "Calculator",
        title: "Starter emergency fund",
        text: "Turn monthly costs into a first savings target. Estimates only, once the tool exists.",
        status: COMING,
      },
      {
        id: "calc-budget",
        kicker: "Calculator",
        title: "First-job budget sketch",
        text: "A starting split you can move. It will not pretend to know your rent.",
        status: COMING,
      },
      {
        id: "calc-insurance",
        kicker: "Calculator",
        title: "Insurance question list",
        text: "Questions to ask, not a premium quote and not a recommendation.",
        status: COMING,
      },
    ];
  }

  static quizzes(): readonly WealthCard[] {
    return [
      {
        id: "quiz-first",
        kicker: "Quiz",
        title: "Which guide should I open first?",
        text: "A short sort toward paycheck, budget, or cash. It will point at a lesson, not a product.",
        status: COMING,
      },
      {
        id: "quiz-shock",
        kicker: "Quiz",
        title: "Savings or an insurance question first?",
        text: "Two different tools for the same bad month. The quiz will explain the difference. It will not tell you what to buy.",
        status: COMING,
      },
    ];
  }

  static log(): readonly { title: string; text: string }[] {
    return [
      {
        title: "The front door is open.",
        text: "This hub is live. The calculators, quizzes, and guides behind it are not.",
      },
      {
        title: "Paycheck lesson first.",
        text: "Then the emergency fund lesson. Then a calculator that labels stub lines and calls every figure an estimate.",
      },
      {
        title: "Checklists stay on the page.",
        text: "When they are written, you can read them here. You will not have to hand over an email address.",
      },
    ];
  }

  static checklists(): readonly WealthCard[] {
    return [
      {
        id: "list-paycheck",
        kicker: "Checklist",
        title: "First paycheck decoder",
        text: "A one-page list of stub lines to look up. Not posted yet.",
        status: COMING,
      },
      {
        id: "list-fund",
        kicker: "Checklist",
        title: "Starter emergency fund",
        text: "What to count as a monthly cost before you pick a number. Not posted yet.",
        status: COMING,
      },
    ];
  }

  static nav(): readonly { href: string; label: string }[] {
    return [
      { href: "/wealth#guides", label: "Guides" },
      { href: "/wealth#calculators", label: "Calculators" },
      { href: "/wealth#quizzes", label: "Quizzes" },
      { href: "/wealth#building", label: "Building" },
      { href: "/links", label: "Links" },
    ];
  }

  static linksTitle(): string {
    return "The links.";
  }

  static linksLede(): string {
    return "The money lessons live here. Medicare help for a parent is a different door, on purpose.";
  }

  static linksCta(): string {
    return "Open the wealth hub";
  }

  static bioLinks(): readonly { href: string; label: string; note: string }[] {
    return [
      {
        href: "/wealth",
        label: "Wealth hub",
        note: "Money lessons for a first job and the years after.",
      },
      {
        href: "/wealth#paycheck",
        label: "First paycheck",
        note: "Where the hub starts.",
      },
      {
        href: "/wealth#emergency",
        label: "Emergency fund",
        note: "A starter stash, explained without a fake target.",
      },
      {
        href: "/wealth#insurance",
        label: "Insurance questions",
        note: "Life and health education. Not a quote.",
      },
      {
        href: "/about",
        label: "About Christian",
        note: "The main site, in a calmer voice.",
      },
      {
        href: "/",
        label: "Medicare help for family",
        note: "For parents and people turning 65.",
      },
    ];
  }

  static footerLinks(): readonly { href: string; label: string }[] {
    return [
      { href: "/", label: "Medicare help for a parent" },
      { href: "/privacy", label: "Privacy" },
      { href: "/links", label: "Links" },
    ];
  }

  static disclosure(): string {
    return (
      `${AGENT.name} is licensed in North Carolina for life and health insurance. ` +
      "He is an accounting master’s student at UNC Greensboro, with expected completion in June 2027, and he is working toward the CPA credential. " +
      "He is not a CPA yet. He is not securities-licensed. " +
      "Nothing on these pages is investment, tax, or legal advice, and nothing here is a personalized recommendation. " +
      "This site is not affiliated with UNC Greensboro."
    );
  }

  static splitTitle(title: string, mark: string): [string, string, string] {
    const at = title.indexOf(mark);
    if (at < 0) return [title, "", ""];
    return [title.slice(0, at), mark, title.slice(at + mark.length)];
  }

  /** Every visitor-facing string on /wealth and /links. */
  static visitorCopy(): readonly string[] {
    const hero = this.hero();
    const stub = this.stubHeading();
    const cards = [
      ...this.guides(),
      ...this.calculators(),
      ...this.quizzes(),
      ...this.checklists(),
    ];
    return [
      this.markName(),
      this.markRole(),
      this.skipLabel(),
      hero.eyebrow,
      hero.title,
      hero.lede,
      hero.cta,
      hero.note,
      hero.stubCaption,
      ...hero.facts,
      stub.title,
      stub.meta,
      ...this.stubLines(),
      ...Object.values(this.sections()).flatMap((section) => [
        section.index,
        section.title,
        section.lede,
      ]),
      ...cards.flatMap((card) => [card.kicker, card.title, card.text, card.status]),
      ...this.log().flatMap((entry) => [entry.title, entry.text]),
      ...this.nav().map((item) => item.label),
      this.linksTitle(),
      this.linksLede(),
      this.linksCta(),
      ...this.bioLinks().flatMap((link) => [link.label, link.note]),
      ...this.footerLinks().map((link) => link.label),
      this.disclosure(),
    ];
  }
}
