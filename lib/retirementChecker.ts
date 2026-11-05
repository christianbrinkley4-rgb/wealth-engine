/**
 * Retirement mistake checker: the rules where Medicare, Social Security, taxes
 * and health coverage collide, and where people lose real money.
 *
 * Pure function, no network, nothing stored. Each finding carries its official
 * source and a page on the site that explains it. Rules verified 2026-11-05:
 *
 * - Part B late penalty and the 8-month window after job-based coverage ends,
 *   including COBRA and retiree coverage not counting as current employment:
 *   Medicare.gov "Avoid late enrollment penalties", "When can I sign up",
 *   "COBRA coverage"; Medicare publication 11036.
 * - Employers with fewer than 20 employees: Medicare pays first.
 *   Medicare.gov "Who pays first?".
 * - HSA: Part A can start up to 6 months before you apply (not before 65), so
 *   stop contributions 6 months before applying. Medicare.gov "Working past 65"
 *   and Medicare & You.
 * - Marketplace: savings end once you have Part A, and Marketplace coverage
 *   doesn't end on its own. HealthCare.gov "Medicare and the Marketplace".
 * - IRMAA uses the tax return from 2 years earlier; a life-changing event can
 *   be reviewed with Form SSA-44. lib/irmaa.ts (2026 brackets) and /irmaa-appeal.
 * - Medigap open enrollment: 6 months starting the first month you're 65 and
 *   have Part B. Medicare.gov "When can I buy a Medigap policy?".
 *
 * Educational only. No plan recommendations, no tax advice.
 */

import { calculatePartBPremium, type FilingStatus } from "@/lib/irmaa";
import { getT65Window } from "@/lib/reminders";

export type Coverage =
  | "employer_active" // through your own or your spouse's current job
  | "cobra"
  | "retiree"
  | "marketplace"
  | "medicare_only"
  | "none";

export type MedicareStatus = "none" | "part_a_only" | "part_a_and_b";

export interface CheckerInputs {
  birthMonth: number; // 1-12
  birthYear: number;
  medicare: MedicareStatus;
  /** First month Part B started, if they have it (month 1-12, year). */
  partBStart?: { month: number; year: number } | null;
  coverage: Coverage;
  employerSize?: "under_20" | "20_plus" | "unknown";
  contributesToHsa: boolean;
  collectsSocialSecurity: boolean;
  filingStatus: FilingStatus;
  /** Estimated income (MAGI) this year, before any Roth conversion. */
  incomeThisYear?: number | null;
  /** Planned Roth conversion this year, if any. */
  rothConversion?: number | null;
  /** Retired, widowed, divorced or similar in the last two years. */
  recentLifeChange: boolean;
  /** Currently paying an income-related Medicare surcharge (IRMAA). */
  payingIrmaa: boolean;
}

export type Severity = "act_now" | "watch";

export interface Finding {
  id: string;
  severity: Severity;
  title: string;
  detail: string;
  action: string;
  learnMore: { label: string; href: string };
  source: { label: string; url: string };
}

const SRC = {
  penalties: {
    label: "Medicare.gov: Avoid late enrollment penalties",
    url: "https://www.medicare.gov/basics/costs/medicare-costs/avoid-penalties",
  },
  signUp: {
    label: "Medicare.gov: When can I sign up for Medicare?",
    url: "https://www.medicare.gov/basics/get-started-with-medicare/sign-up/when-can-i-sign-up-for-medicare",
  },
  cobra: {
    label: "Medicare.gov: COBRA coverage",
    url: "https://www.medicare.gov/basics/get-started-with-medicare/medicare-basics/working-past-65/cobra-coverage",
  },
  whoPays: {
    label: "Medicare.gov: Who pays first?",
    url: "https://www.medicare.gov/health-drug-plans/coordination/who-pays-first",
  },
  working: {
    label: "Medicare.gov: Working past 65",
    url: "https://www.medicare.gov/basics/get-started-with-medicare/medicare-basics/working-past-65",
  },
  marketplace: {
    label: "HealthCare.gov: Medicare and the Marketplace",
    url: "https://www.healthcare.gov/medicare/medicare-and-the-marketplace/",
  },
  ssa44: { label: "SSA: Form SSA-44", url: "https://www.ssa.gov/forms/ssa-44.pdf" },
  medigap: {
    label: "Medicare.gov: When can I buy a Medigap policy?",
    url: "https://www.medicare.gov/health-drug-plans/medigap/ready-to-buy/when",
  },
} as const;

const DATE = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
const money = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD" });

/** Whole months from birth month to the month of `today` (age in months). */
function ageInMonths(birthMonth: number, birthYear: number, today: Date): number {
  return (today.getFullYear() - birthYear) * 12 + (today.getMonth() + 1 - birthMonth);
}

export function checkRetirement(inputs: CheckerInputs, today: Date = new Date()): Finding[] {
  const out: Finding[] = [];
  const months = ageInMonths(inputs.birthMonth, inputs.birthYear, today);
  const is65 = months >= 65 * 12;
  const window = getT65Window(inputs.birthMonth, inputs.birthYear, today);
  const hasB = inputs.medicare === "part_a_and_b";
  const largeEmployerCover =
    inputs.coverage === "employer_active" && inputs.employerSize === "20_plus";

  // 1. First sign-up window open or coming up, with no coverage that lets them wait.
  if (!hasB && !largeEmployerCover && window.status !== "closed") {
    out.push({
      id: "first-window",
      severity: window.status === "open" ? "act_now" : "watch",
      title:
        window.status === "open"
          ? "Your first Medicare sign-up window is open"
          : "Your first Medicare sign-up window is coming up",
      detail: `It runs from ${DATE.format(window.opensOn)} through ${DATE.format(window.closesOn)}. Unless you have coverage from a current job, this is the window that avoids the Part B late penalty.`,
      action:
        "Sign up through Social Security during this window. Signing up in the months before your birthday month means coverage starts on time.",
      learnMore: { label: "Your turning-65 timeline", href: "/turning-65" },
      source: SRC.signUp,
    });
  }

  // 2. COBRA or retiree coverage at 65+ without Part B.
  if (is65 && !hasB && (inputs.coverage === "cobra" || inputs.coverage === "retiree")) {
    out.push({
      id: "cobra-trap",
      severity: "act_now",
      title:
        inputs.coverage === "cobra"
          ? "COBRA doesn't protect you from the Part B penalty"
          : "Retiree coverage doesn't protect you from the Part B penalty",
      detail:
        "Only coverage from a current job lets you delay Part B. Your 8-month window to sign up started when the job ended, even if you chose COBRA. After it closes, the penalty is 10% for each full year without Part B, usually for as long as you have it.",
      action:
        "Sign up for Part B now, and ask Social Security whether you're still inside your 8-month window.",
      learnMore: { label: "How the Part B penalty is calculated", href: "/part-b-penalty" },
      source: inputs.coverage === "cobra" ? SRC.cobra : SRC.penalties,
    });
  }

  // 3. No qualifying coverage after the first window closed.
  if (
    is65 &&
    !hasB &&
    window.status === "closed" &&
    (inputs.coverage === "none" ||
      inputs.coverage === "marketplace" ||
      inputs.coverage === "medicare_only")
  ) {
    out.push({
      id: "missed-window",
      severity: "act_now",
      title: "You may be building a Part B late penalty",
      detail:
        "Your first window has closed and you don't have coverage from a current job. Each full year without Part B adds 10% to the premium, usually for life. The General Enrollment Period runs January 1 through March 31, and coverage starts the month after you sign up.",
      action:
        "Sign up for Part B at the next chance. If you had job coverage you think should count, ask Social Security.",
      learnMore: { label: "How the Part B penalty is calculated", href: "/part-b-penalty" },
      source: SRC.penalties,
    });
  }

  // 4. Small employer at 65+ without Part B.
  if (
    is65 &&
    !hasB &&
    inputs.coverage === "employer_active" &&
    inputs.employerSize === "under_20"
  ) {
    out.push({
      id: "small-employer",
      severity: "act_now",
      title: "With fewer than 20 employees, Medicare usually pays first",
      detail:
        "When an employer has fewer than 20 employees, Medicare is generally the primary payer and the job's plan pays second. Without Part B, the job's plan may not pay what you expect.",
      action: "Ask the benefits office how the plan works with Medicare before you skip Part B.",
      learnMore: {
        label: "Part B with employer coverage",
        href: "/guides/medicare-part-b-employer-coverage",
      },
      source: SRC.whoPays,
    });
  }

  // 5. HSA contributions near or after Medicare.
  const hsaRisk =
    inputs.contributesToHsa &&
    (inputs.medicare !== "none" || inputs.collectsSocialSecurity || months >= 65 * 12 - 6);
  if (hsaRisk) {
    out.push({
      id: "hsa",
      severity: inputs.medicare !== "none" || inputs.collectsSocialSecurity ? "act_now" : "watch",
      title: "HSA contributions and Medicare don't mix",
      detail:
        "You can't contribute to an HSA once any part of Medicare starts. Collecting Social Security at 65 enrolls you in Part A. If you sign up after 65, Part A can start up to 6 months back, so contributions in those months can bring a tax penalty.",
      action:
        "Stop HSA contributions (yours and your employer's) 6 months before you apply for Medicare or Social Security. Money already in the HSA is still yours to use.",
      learnMore: {
        label: "Medicare and HSA contributions",
        href: "/guides/medicare-hsa-contributions",
      },
      source: SRC.working,
    });
  }

  // 6. Marketplace coverage at or near 65.
  if (inputs.coverage === "marketplace" && (is65 || window.status === "open")) {
    out.push({
      id: "marketplace",
      severity: "act_now",
      title: "Marketplace savings end once you have Part A",
      detail:
        "Once you have Medicare Part A, you no longer qualify for Marketplace premium savings. Marketplace coverage also doesn't end on its own when Medicare starts.",
      action:
        "Line up Medicare first, then end the Marketplace plan yourself so the coverage doesn't overlap or lapse.",
      learnMore: { label: "Your turning-65 timeline", href: "/turning-65" },
      source: SRC.marketplace,
    });
  }

  // 7. A Roth conversion that pushes income over an IRMAA bracket two years later.
  const base = inputs.incomeThisYear ?? null;
  const roth = inputs.rothConversion ?? 0;
  if (base != null && roth > 0) {
    const without = calculatePartBPremium(base, inputs.filingStatus);
    const withRoth = calculatePartBPremium(base + roth, inputs.filingStatus);
    const diff = Math.round((withRoth.partBPremium - without.partBPremium) * 100) / 100;
    if (diff > 0) {
      const people =
        inputs.filingStatus === "married_jointly"
          ? "each of you, if you're both on Medicare"
          : "you";
      out.push({
        id: "irmaa-roth",
        severity: "watch",
        title: "Your Roth conversion could raise your Medicare premium in two years",
        detail: `Medicare surcharges use your tax return from two years earlier. Using 2026 brackets, this conversion would move you from ${money(without.partBPremium)} to ${money(withRoth.partBPremium)} a month for Part B, about ${money(diff * 12)} more a year for ${people}. Brackets change every year, so treat this as an estimate.`,
        action:
          "Before converting, check how close the total puts you to the next bracket. Talk with your tax professional about the right amount.",
        learnMore: { label: "Roth conversion and Medicare", href: "/roth-window" },
        source: SRC.working,
      });
    }
  }

  // 8. Paying IRMAA after income dropped from a qualifying life change.
  if (inputs.payingIrmaa && inputs.recentLifeChange) {
    out.push({
      id: "irmaa-appeal",
      severity: "watch",
      title: "You may be able to lower your Medicare surcharge",
      detail:
        "The surcharge is based on income from two years ago. If your income has since dropped because of retirement, a spouse's death, divorce or another life-changing event Social Security recognizes, you can ask for a new decision.",
      action:
        "Ask Social Security for a review using Form SSA-44, with proof of the event and your new income.",
      learnMore: { label: "How to appeal a Medicare surcharge", href: "/irmaa-appeal" },
      source: SRC.ssa44,
    });
  }

  // 9. Inside the one-time Medigap open enrollment window.
  if (hasB && is65 && inputs.partBStart) {
    const start = Date.UTC(inputs.partBStart.year, inputs.partBStart.month - 1, 1);
    const at65 = Date.UTC(inputs.birthYear + 65, inputs.birthMonth - 1, 1);
    const opens = Math.max(start, at65);
    const closesExclusive = new Date(opens);
    closesExclusive.setUTCMonth(closesExclusive.getUTCMonth() + 6);
    const now = Date.UTC(today.getFullYear(), today.getMonth(), 1);
    if (now >= opens && now < closesExclusive.getTime()) {
      const lastMonth = new Date(closesExclusive);
      lastMonth.setUTCMonth(lastMonth.getUTCMonth() - 1);
      out.push({
        id: "medigap-window",
        severity: "watch",
        title: "Your one-time Medigap window is open",
        detail: `It runs through ${DATE.format(lastMonth)}. During it, a Medigap insurer can't turn you down or charge more for your health history. After it, that protection can go away.`,
        action: "If you're considering a Medigap policy, compare before this window closes.",
        learnMore: {
          label: "Medicare Advantage vs. Medigap",
          href: "/medicare-advantage-vs-medigap",
        },
        source: SRC.medigap,
      });
    }
  }

  return out.sort((a, b) => (a.severity === b.severity ? 0 : a.severity === "act_now" ? -1 : 1));
}
