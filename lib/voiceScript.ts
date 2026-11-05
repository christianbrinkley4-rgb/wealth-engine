/**
 * Voice mode for the retirement mistake checker, as a pure script.
 *
 * No AI anywhere: the questions are fixed, answers are matched with plain
 * rules, and the results come from the same tested checkRetirement() the
 * typed form uses. That means the voice can't recommend a plan, invent a rule,
 * or say anything that isn't written here or in lib/retirementChecker.ts.
 *
 * The browser does the listening and speaking (Web Speech API); this module
 * only turns what was heard into the next thing to say. Everything here is
 * deterministic so it can be tested without a microphone.
 */

import { AGENT } from "@/lib/agent";
import type { FilingStatus } from "@/lib/irmaa";
import {
  checkRetirement,
  type CheckerInputs,
  type Coverage,
  type Finding,
  type MedicareStatus,
} from "@/lib/retirementChecker";

export type MonthYear = { month: number; year: number };

export interface VoiceAnswers {
  birth?: MonthYear;
  medicare?: MedicareStatus;
  partBStart?: MonthYear | null;
  coverage?: Coverage;
  employerSize?: "under_20" | "20_plus" | "unknown";
  hsa?: boolean | null;
  socialSecurity?: boolean | null;
  /** 0 means not working. */
  wages?: number | null;
  filing?: FilingStatus | null;
  irmaa?: boolean | null;
  lifeChange?: boolean | null;
  roth?: boolean | null;
  income?: number | null;
  rothAmount?: number | null;
}

export type StepId = keyof VoiceAnswers;

export interface VoiceChoice {
  label: string;
  token: string;
}

interface StepFor<K extends StepId> {
  id: K;
  question: string;
  /** Said when an answer wasn't understood. Lists what to say. */
  help: string;
  /** Tap targets shown on screen. Empty for number answers. */
  choices: VoiceChoice[];
  /** Required answers can't be skipped (the check needs them). */
  required?: boolean;
  /** "Not sure" is a real answer here, not a skip. */
  unsureIsAnswer?: boolean;
  /** Ask only when this returns true. */
  when?: (a: VoiceAnswers) => boolean;
  /** Text heard to a token, or null if it didn't match. */
  parse: (text: string) => string | null;
  /** Token to the stored answer. */
  read: (token: string) => VoiceAnswers[K];
  /** Short confirmation of what was understood, e.g. "June 1958". */
  ack: (token: string) => string;
}

type Step = { [K in StepId]: StepFor<K> }[StepId];

/* ------------------------------------------------------------------ */
/* Text helpers                                                        */
/* ------------------------------------------------------------------ */

const MONTHS = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];
const MONTH_LABELS = MONTHS.map((m) => m[0].toUpperCase() + m.slice(1));

const SMALL: Record<string, number> = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
  eleven: 11,
  twelve: 12,
  thirteen: 13,
  fourteen: 14,
  fifteen: 15,
  sixteen: 16,
  seventeen: 17,
  eighteen: 18,
  nineteen: 19,
};
const TENS: Record<string, number> = {
  twenty: 20,
  thirty: 30,
  forty: 40,
  fourty: 40,
  fifty: 50,
  sixty: 60,
  seventy: 70,
  eighty: 80,
  ninety: 90,
};
const SCALES: Record<string, number> = { hundred: 100, thousand: 1000, million: 1_000_000 };

/**
 * Lowercases, drops punctuation that speech engines add, and turns spelled-out
 * numbers into digits: "nineteen fifty eight" becomes "1958", "forty thousand"
 * becomes "40000". Digits already present are kept, commas inside numbers removed.
 */
export function normalizeSpeech(raw: string): string {
  const text = raw
    .toLowerCase()
    // iPhones send curly apostrophes; "don’t" must not become "don t" (which reads as "do").
    .replace(/[‘’ʼ]/g, "'")
    .replace(/(\d),(\d{3})/g, "$1$2")
    .replace(/(\d),(\d{3})/g, "$1$2")
    .replace(/\.(?!\d)/g, " ")
    .replace(/[^\w$.\s'/&-]/g, " ")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  const words = text.split(" ");
  const out: string[] = [];
  let i = 0;
  while (i < words.length) {
    const w = words[i];
    if (
      !(w in SMALL) &&
      !(w in TENS) &&
      !(w in SCALES && out.length > 0 && /^\d+$/.test(out[out.length - 1]))
    ) {
      out.push(w);
      i += 1;
      continue;
    }
    // Digits followed by a scale word: "40 thousand".
    if (w in SCALES) {
      const prev = Number(out.pop());
      out.push(String(prev * SCALES[w]));
      i += 1;
      continue;
    }
    // Collect a run of number words.
    const run: string[] = [];
    while (
      i < words.length &&
      (words[i] in SMALL ||
        words[i] in TENS ||
        words[i] in SCALES ||
        (words[i] === "and" &&
          run.length > 0 &&
          i + 1 < words.length &&
          (words[i + 1] in SMALL || words[i + 1] in TENS)))
    ) {
      if (words[i] !== "and") run.push(words[i]);
      i += 1;
    }
    out.push(String(wordsToNumber(run)));
  }
  return out.join(" ");
}

function wordsToNumber(run: string[]): number {
  // Year shape: two groups under 100 with no scale word, "nineteen fifty eight".
  if (!run.some((w) => w in SCALES)) {
    const groups: number[] = [];
    let current: number | null = null;
    for (const w of run) {
      if (w in TENS) {
        if (current !== null) groups.push(current);
        current = TENS[w];
      } else {
        const v = SMALL[w];
        if (current !== null && current % 10 === 0 && current >= 20 && v < 10) current += v;
        else {
          if (current !== null) groups.push(current);
          current = v;
        }
      }
    }
    if (current !== null) groups.push(current);
    if (groups.length === 2 && groups[0] >= 10 && groups[0] <= 20 && groups[1] < 100) {
      return groups[0] * 100 + groups[1];
    }
    if (groups.length === 1) return groups[0];
    return Number(groups.join(""));
  }
  let total = 0;
  let current = 0;
  for (const w of run) {
    if (w in SMALL) current += SMALL[w];
    else if (w in TENS) current += TENS[w];
    else if (w === "hundred") current = (current || 1) * 100;
    else {
      total += (current || 1) * SCALES[w];
      current = 0;
    }
  }
  return total + current;
}

const has = (text: string, re: RegExp) => re.test(text);

/**
 * First amount of money in normalized text: "$40000", "40000", "40k",
 * "1.5 million". A bare year ("I retired in 2019") is not an amount.
 */
export function parseAmount(text: string): number | null {
  for (const m of text.matchAll(/(\$)?\s?(\d+(?:\.\d+)?)\s*(k\b|thousand|grand|million|m\b)?/g)) {
    let n = Number(m[2]);
    const scale = m[3];
    const looksLikeYear = !m[1] && !scale && /^(19|20)\d{2}$/.test(m[2]);
    if (looksLikeYear) continue;
    if (scale === "k" || scale === "thousand" || scale === "grand") n *= 1000;
    else if (scale === "million" || scale === "m") n *= 1_000_000;
    if (!Number.isFinite(n) || n < 0) continue;
    return Math.round(n);
  }
  return null;
}

/**
 * Month and year from normalized text. Accepts "june 1958", "jun 58",
 * "6/1958", "6 1958". Two-digit years resolve with the given pivot.
 */
export function parseMonthYear(
  text: string,
  opts: { minYear: number; maxYear: number; twoDigitCentury: (yy: number) => number },
): MonthYear | null {
  let month: number | null = null;
  for (let i = 0; i < MONTHS.length; i += 1) {
    const full = MONTHS[i];
    const re = new RegExp(
      `\\b(${full}|${full.slice(0, 3)}${full === "september" ? "|sept" : ""})\\b`,
    );
    if (re.test(text)) {
      month = i + 1;
      break;
    }
  }
  let year: number | null = null;
  const four = text.match(/\b(19\d{2}|20\d{2})\b/);
  if (four) year = Number(four[1]);
  if (month === null) {
    const numeric = text.match(/\b(\d{1,2})\s*(?:\/|\s|of)\s*(19\d{2}|20\d{2}|\d{2})\b/);
    if (numeric) {
      const mm = Number(numeric[1]);
      if (mm >= 1 && mm <= 12) {
        month = mm;
        const y = numeric[2];
        year = y.length === 4 ? Number(y) : opts.twoDigitCentury(Number(y));
      }
    }
  }
  if (month !== null && year === null) {
    const two = text.match(/\b(\d{2})\b/);
    if (two) year = opts.twoDigitCentury(Number(two[1]));
  }
  if (month === null || year === null) return null;
  if (year < opts.minYear || year > opts.maxYear) return null;
  return { month, year };
}

// "pass" only on its own: "my husband passed away" is an answer, not a skip.
const SKIP =
  /\b(skip|not sure|unsure|don'?t know|do not know|no idea|rather not|prefer not|dunno|can'?t remember|don'?t remember)\b|^pass$/;
const SKIP_ANYWHERE = new RegExp(SKIP.source, "g");
// Commands only count as a short reply on their own, so ordinary answers like
// "I quit working in 2021" or "I'm working again" are never mistaken for them.
const STOP =
  /^(ok |okay |please |no |)(stop|quit|cancel|goodbye|good bye|bye|bye bye|that'?s enough|never ?mind|i'?m done|end( this| it| the call)?|let'?s stop|stop (it|this|now|please|talking|the check))( please| now| thanks| thank you)?$/;
const REPEAT =
  /\b(repeat( that| the question| it)?|say (that|it) again|come again|pardon( me)?|what did you say|didn'?t (catch|hear|get) (that|it)|what was the question|one more time)\b|^(what|huh|sorry|again|excuse me)\??$/;
const BACK =
  /\b(go back|back up|previous question|undo|that'?s (wrong|not right|not correct|incorrect)|i made a mistake|change (my|that) answer|wrong answer)\b|^back$/;
const HELP = /\b(help|what are (my|the) (options|choices)|what can i say|options)\b/;

const YES =
  /\b(yes|yeah|yep|yup|ya|yah|sure|correct|right|i do|we do|i am|we are|i have|we have|uh huh|absolutely|definitely|of course|affirmative)\b/;
const NO = /\b(no|nope|nah|not|don'?t|do not|never|negative|haven'?t|none|nothing)\b/;

export function parseYesNo(text: string): "yes" | "no" | null {
  if (SKIP.test(text)) return null;
  if (/\bdon'?t think so\b/.test(text)) return "no";
  if (/\b(think so|believe so)\b/.test(text)) return "yes";
  const first = text.split(" ")[0];
  if (/^(yes|yeah|yep|yup|ya|yah|sure|correct|absolutely|definitely)$/.test(first)) return "yes";
  if (/^(no|nope|nah|never|negative)$/.test(first)) return "no";
  const y = YES.test(text);
  const n = NO.test(text);
  if (y && !n) return "yes";
  if (n && !y) return "no";
  return null;
}

function money(token: string): string {
  return `$${Number(token).toLocaleString("en-US")}`;
}

const THIS_YEAR = new Date().getFullYear();
const yesNoChoices: VoiceChoice[] = [
  { label: "Yes", token: "yes" },
  { label: "No", token: "no" },
];
const yesNo = (t: string) => (t === "yes" ? "Yes" : "No");

/* ------------------------------------------------------------------ */
/* The questions                                                       */
/* ------------------------------------------------------------------ */

const STEPS: Step[] = [
  {
    id: "birth",
    required: true,
    question: "First, what month and year were you born?",
    help: "Please say the month and the year you were born, like June 1958.",
    choices: [],
    parse: (t) => {
      const my = parseMonthYear(t, {
        minYear: 1925,
        maxYear: THIS_YEAR - 18,
        twoDigitCentury: (yy) => 1900 + yy,
      });
      return my ? `${my.year}-${my.month}` : null;
    },
    read: (token) => {
      const [y, m] = token.split("-").map(Number);
      return { month: m, year: y };
    },
    ack: (token) => {
      const [y, m] = token.split("-").map(Number);
      return `${MONTH_LABELS[m - 1]} ${y}`;
    },
  },
  {
    id: "medicare",
    required: true,
    question: "Do you have Medicare yet? You can say not yet, Part A only, or Part A and Part B.",
    help: "Please say not yet, Part A only, or Part A and Part B.",
    choices: [
      { label: "Not yet", token: "none" },
      { label: "Part A only", token: "part_a_only" },
      { label: "Part A and Part B", token: "part_a_and_b" },
    ],
    parse: (t) => {
      // Speech engines hear "Part A" and "Part B" many ways. A bare "a" only
      // counts at the very end ("a only", "just a"), so "just a minute" doesn't.
      const a = "(?:a|eh|8|hey|ay)";
      const b = "(?:b|be|bee)";
      const aOnly = new RegExp(
        `\\bpart ${a} only\\b|\\b(only|just) part ${a}\\b|\\b${a} only$|^(only|just) ${a}$|\\bparta only\\b|\\b(not|no|without|don'?t have|haven'?t got) part ${b}\\b`,
      );
      if (aOnly.test(t)) return "part_a_only";
      const both = new RegExp(
        `\\b(both|${a} and ${b}|${a} & ${b}|part ${b}|parts ${a} and ${b}|original medicare|medicare advantage|advantage plan|supplement|medigap|all of it)\\b`,
      );
      if (both.test(t)) return "part_a_and_b";
      if (has(t, /\b(not yet|no|nope|none|not on|haven'?t|don'?t have|not signed|not enrolled)\b/))
        return "none";
      return null;
    },
    read: (token) => token as MedicareStatus,
    ack: (token) =>
      token === "none" ? "Not yet" : token === "part_a_only" ? "Part A only" : "Part A and Part B",
  },
  {
    id: "partBStart",
    when: (a) => a.medicare === "part_a_and_b",
    question: "What month and year did your Part B start?",
    help: "Please say the month and year your Part B started, like March 2024. Or say skip if you're not sure.",
    choices: [],
    parse: (t) => {
      const my = parseMonthYear(t, {
        minYear: 1966,
        maxYear: THIS_YEAR + 1,
        twoDigitCentury: (yy) => 2000 + yy,
      });
      return my ? `${my.year}-${my.month}` : null;
    },
    read: (token) => {
      const [y, m] = token.split("-").map(Number);
      return { month: m, year: y };
    },
    ack: (token) => {
      const [y, m] = token.split("-").map(Number);
      return `Part B started ${MONTH_LABELS[m - 1]} ${y}`;
    },
  },
  {
    id: "coverage",
    required: true,
    question:
      "Besides Medicare, what other health coverage do you have? For example, a current job, COBRA, retiree coverage, a Marketplace plan, just Medicare, or none.",
    help: "Please say one of these: a current job, COBRA, retiree coverage, a Marketplace plan, just Medicare, or none.",
    choices: [
      { label: "My or my spouse's current job", token: "employer_active" },
      { label: "COBRA from a past job", token: "cobra" },
      { label: "Retiree coverage", token: "retiree" },
      { label: "A Marketplace (ACA) plan", token: "marketplace" },
      { label: "Just Medicare", token: "medicare_only" },
      { label: "None", token: "none" },
    ],
    parse: (t) => {
      if (has(t, /\b(cobra|kobra|copra|cobre|cobras|cobra's)\b/)) return "cobra";
      if (
        has(
          t,
          /\b(marketplace|market place|obamacare|obama care|aca|affordable care|healthcare gov|health care gov|exchange)\b/,
        )
      )
        return "marketplace";
      if (
        has(
          t,
          /\b(retiree|retirees|retirement (plan|coverage|insurance|benefits)|former employer|old employer|past employer|previous employer|old job|former job|past job|state health plan|pension)\b/,
        )
      )
        return "retiree";
      // "Just Medicare" wins over any mention of work: "not through work, just Medicare".
      if (
        has(
          t,
          /\b(just medicare|only medicare|medicare only|nothing else|just that|only that|medicare advantage|advantage|medigap|supplement|part d|just my medicare)\b/,
        ) ||
        t === "medicare"
      )
        return "medicare_only";
      // "I don't work", "not through my job" or "nothing from work" is not job coverage.
      const notWorking =
        /\b(don'?t|do not|not|no longer|stopped|quit|never) (work|working|have a job)\b/.test(t) ||
        /\b(not|no|nothing) (through|from|with|at|by) (my |a |the |his |her )?(work|job|employer|company)\b/.test(
          t,
        );
      if (
        !notWorking &&
        (has(t, /\b(job|work|works|working|employer|employers|employment|company|union)\b/) ||
          has(t, /\b(wife'?s|husband'?s|spouse'?s)\b/))
      )
        return "employer_active";
      if (has(t, /\b(none|nothing|no coverage|no insurance|uninsured|no other|no)\b/))
        return "none";
      return null;
    },
    read: (token) => token as Coverage,
    ack: (token) =>
      ({
        employer_active: "Coverage through a current job",
        cobra: "COBRA",
        retiree: "Retiree coverage",
        marketplace: "A Marketplace plan",
        medicare_only: "Just Medicare",
        none: "No other coverage",
      })[token] ?? "Okay",
  },
  {
    id: "employerSize",
    unsureIsAnswer: true,
    when: (a) => a.coverage === "employer_active",
    question: "Does that employer have 20 or more employees, or fewer than 20?",
    help: "Please say 20 or more, fewer than 20, or not sure.",
    choices: [
      { label: "20 or more", token: "20_plus" },
      { label: "Fewer than 20", token: "under_20" },
      { label: "Not sure", token: "unknown" },
    ],
    parse: (t) => {
      // A comparison with a number: "fewer than 20", "more than 50", "20 or more".
      const below = t.match(/\b(fewer|less|under|below)( than)? (\d+)\b/);
      if (below) return Number(below[3]) <= 20 ? "under_20" : null;
      if (
        /\b(more|over|above|at least)( than)? (\d+)\b|\b\d+ or (more|over)\b|\b\d+ plus\b/.test(t)
      )
        return "20_plus";
      // An explicit head count: "about 200 people", "only 8 of us".
      const n = t.match(/\b(\d+)\b/);
      if (n) return Number(n[1]) >= 20 ? "20_plus" : "under_20";
      if (has(t, /\b(hundred|hundreds|thousand|thousands)\b/)) return "20_plus";
      if (SKIP.test(t)) return "unknown";
      if (has(t, /\b(fewer|less|under|below|small|tiny|few|only a few|handful)\b/))
        return "under_20";
      if (has(t, /\b(more|over|above|at least|plus|big|large|huge|lots|bigger)\b/))
        return "20_plus";
      return null;
    },
    read: (token) => token as "under_20" | "20_plus" | "unknown",
    ack: (token) =>
      token === "20_plus"
        ? "20 or more employees"
        : token === "under_20"
          ? "Fewer than 20 employees"
          : "Not sure",
  },
  {
    id: "hsa",
    question: "Are you, or your employer, putting money into a health savings account, an HSA?",
    help: "Please say yes or no. Or say skip if you're not sure.",
    choices: yesNoChoices,
    parse: parseYesNo,
    read: (token) => token === "yes",
    ack: yesNo,
  },
  {
    id: "socialSecurity",
    question: "Are you collecting Social Security now?",
    help: "Please say yes or no.",
    choices: yesNoChoices,
    parse: parseYesNo,
    read: (token) => token === "yes",
    ack: yesNo,
  },
  {
    id: "wages",
    when: (a) => a.socialSecurity === true,
    question:
      "Are you still working? If you are, about how much do you expect to earn from work this year? If you're not working, just say no.",
    help: "Please say a rough amount, like 30 thousand dollars, or say no if you're not working.",
    choices: [{ label: "Not working", token: "0" }],
    parse: (t) => {
      const amount = parseAmount(t);
      if (amount !== null && amount >= 100) return String(amount);
      if (
        has(
          t,
          /\b(no|not working|retired|don'?t work|not anymore|none|zero|nothing|stopped working|quit working|no longer work(ing)?|laid off)\b/,
        )
      )
        return "0";
      return null;
    },
    read: (token) => Number(token),
    ack: (token) => (token === "0" ? "Not working" : `About ${money(token)} from work`),
  },
  {
    id: "filing",
    question: "Do you file your taxes as single, or married filing jointly?",
    help: "Please say single, or married filing jointly.",
    choices: [
      { label: "Single", token: "individual" },
      { label: "Married, filing jointly", token: "married_jointly" },
    ],
    parse: (t) => {
      if (has(t, /\b(separate|separately)\b/)) return "individual";
      if (has(t, /\b(married|jointly|joint|together|with my (wife|husband|spouse))\b/))
        return "married_jointly";
      if (
        has(
          t,
          /\b(single|individual|alone|myself|by myself|just me|head of household|widow|widowed|widower|divorced|unmarried)\b/,
        )
      )
        return "individual";
      return null;
    },
    read: (token) => token as FilingStatus,
    ack: (token) => (token === "married_jointly" ? "Married filing jointly" : "Single"),
  },
  {
    id: "irmaa",
    question:
      "Are you paying an extra income based charge on your Medicare premium? It's sometimes called IRMAA.",
    help: "Please say yes or no. Or say skip if you're not sure.",
    choices: yesNoChoices,
    parse: parseYesNo,
    read: (token) => token === "yes",
    ack: yesNo,
  },
  {
    id: "lifeChange",
    when: (a) => a.irmaa === true,
    question:
      "In the last two years, did you retire, lose a spouse, divorce, or have your income drop for a similar reason?",
    help: "Please say yes or no.",
    choices: yesNoChoices,
    // People answer with the event: "my husband passed away", "I retired last year".
    parse: (t) => {
      if (/^(no|nope|nah)\b/.test(t)) return "no";
      const event =
        "(retired|retire|passed|died|lost|lose|widow|widowed|divorce|divorced|stopped working|laid off|went down|dropped|drop)";
      // "I haven't retired yet", "didn't lose anyone": a negated event is a no.
      if (
        new RegExp(
          `\\b(not|didn'?t|haven'?t|hasn'?t|never|no|wasn'?t|weren'?t)\\b(\\s+\\w+){0,3}\\s+${event}\\b`,
        ).test(t)
      )
        return "no";
      if (new RegExp(`\\b${event}\\b`).test(t)) return "yes";
      return parseYesNo(t);
    },
    read: (token) => token === "yes",
    ack: yesNo,
  },
  {
    id: "roth",
    question: "Last question. Are you thinking about converting money to a Roth IRA this year?",
    help: "Please say yes or no.",
    choices: yesNoChoices,
    parse: parseYesNo,
    read: (token) => token === "yes",
    ack: yesNo,
  },
  {
    id: "income",
    when: (a) => a.roth === true,
    question:
      "About how much income do you expect this year, before any conversion? A rough number is fine.",
    help: "Please say a rough amount, like 85 thousand dollars. Or say skip.",
    choices: [],
    parse: (t) => {
      const amount = parseAmount(t);
      return amount !== null && amount >= 100 ? String(amount) : null;
    },
    read: (token) => Number(token),
    ack: (token) => `About ${money(token)} of income`,
  },
  {
    id: "rothAmount",
    when: (a) => a.roth === true,
    question: "And about how much might you convert?",
    help: "Please say a rough amount, like 40 thousand dollars. Or say skip.",
    choices: [],
    parse: (t) => {
      const amount = parseAmount(t);
      return amount !== null && amount >= 100 ? String(amount) : null;
    },
    read: (token) => Number(token),
    ack: (token) => `About ${money(token)} to convert`,
  },
];

const BY_ID = new Map(STEPS.map((s) => [s.id, s]));

export function getStep(id: StepId): Step {
  const step = BY_ID.get(id);
  if (!step) throw new Error(`Unknown voice step ${id}`);
  return step;
}

/** The next question still to ask, or null when everything needed is answered. */
export function nextStepId(answers: VoiceAnswers): StepId | null {
  for (const step of STEPS) {
    if (step.when && !step.when(answers)) continue;
    if (answers[step.id] === undefined) return step.id;
  }
  return null;
}

/* ------------------------------------------------------------------ */
/* Conversation state                                                  */
/* ------------------------------------------------------------------ */

export interface VoiceState {
  answers: VoiceAnswers;
  /** Steps answered or skipped, in order, so "go back" can undo them. */
  history: StepId[];
  /** Misses on the current question, reset when it's answered. */
  misses: number;
}

export type TurnKind = "ask" | "results" | "stopped";

export interface Turn {
  state: VoiceState;
  say: string;
  kind: TurnKind;
  /** Set when results are ready. */
  findings?: Finding[];
}

export const INTRO =
  "Hi. I'll ask you a few short questions, then read back anything worth a look. You can answer out loud, or tap an answer on the screen. Say repeat any time to hear a question again, go back to change an answer, or stop to end.";

export function startConversation(): Turn {
  const state: VoiceState = { answers: {}, history: [], misses: 0 };
  return { state, kind: "ask", say: `${INTRO} ${getStep("birth").question}` };
}

export function currentStep(state: VoiceState): Step | null {
  const id = nextStepId(state.answers);
  return id ? getStep(id) : null;
}

function withAnswer(state: VoiceState, step: Step, value: unknown): VoiceState {
  return {
    answers: { ...state.answers, [step.id]: value } as VoiceAnswers,
    history: [...state.history, step.id],
    misses: 0,
  };
}

function advance(state: VoiceState, prefix: string, today: Date): Turn {
  const next = currentStep(state);
  if (next) return { state, kind: "ask", say: `${prefix} ${next.question}`.trim() };
  const findings = checkRetirement(toCheckerInputs(state.answers), today);
  return {
    state,
    kind: "results",
    findings,
    say: `${prefix} ${resultsSpeech(findings)}`.trim(),
  };
}

/** Apply a tapped choice (or a parsed token) to the current question. */
export function answerWith(state: VoiceState, token: string, today: Date = new Date()): Turn {
  const step = currentStep(state);
  if (!step) return advance(state, "", today);
  const next = withAnswer(state, step, step.read(token));
  return advance(next, `Got it: ${step.ack(token)}.`, today);
}

export function goBack(state: VoiceState): Turn {
  if (state.history.length === 0) {
    const step = currentStep(state);
    return { state, kind: "ask", say: `That's the first question. ${step?.question ?? ""}`.trim() };
  }
  const last = state.history[state.history.length - 1];
  const answers = { ...state.answers };
  delete answers[last];
  const next: VoiceState = { answers, history: state.history.slice(0, -1), misses: 0 };
  return { state: next, kind: "ask", say: `Okay, let's go back. ${getStep(last).question}` };
}

export function repeatQuestion(state: VoiceState): Turn {
  const step = currentStep(state);
  return { state, kind: "ask", say: step ? step.question : "" };
}

/**
 * Handle what the browser heard. `heard` holds the recognizer's alternatives,
 * best first; the first one that matches an answer wins.
 */
export function respond(state: VoiceState, heard: string[], today: Date = new Date()): Turn {
  const step = currentStep(state);
  if (!step) return advance(state, "", today);
  const texts = heard.map(normalizeSpeech).filter(Boolean);
  const first = texts[0] ?? "";

  if (STOP.test(first)) {
    return {
      state,
      kind: "stopped",
      say: "Okay, stopping here. The questions on this page run the same check whenever you're ready.",
    };
  }
  if (BACK.test(first)) return goBack(state);
  if (REPEAT.test(first)) return { state, kind: "ask", say: step.question };
  if (HELP.test(first)) return { state, kind: "ask", say: step.help };

  if (step.unsureIsAnswer) {
    for (const t of texts) {
      const token = step.parse(t);
      if (token) return answerWith(state, token, today);
    }
  }
  // A hedged answer still counts: "not sure, maybe 50 thousand", "I don't
  // remember, June 1958". Take the hedge out, then try to read an answer.
  for (const t of texts) {
    const rest = t.replace(SKIP_ANYWHERE, " ").replace(/\s+/g, " ").trim();
    if (rest === t || !/\w{2,}|\d/.test(rest)) continue;
    const token = step.parse(rest);
    if (token) return answerWith(state, token, today);
  }
  if (texts.some((t) => SKIP.test(t))) {
    if (step.required) {
      return {
        state: { ...state, misses: state.misses + 1 },
        kind: "ask",
        say: `I need this one to run the check. ${step.help}`,
      };
    }
    const next = withAnswer(state, step, null);
    return advance(next, "Okay, we'll skip that.", today);
  }
  for (const t of texts) {
    const token = step.parse(t);
    if (token) return answerWith(state, token, today);
  }
  const misses = state.misses + 1;
  return {
    state: { ...state, misses },
    kind: "ask",
    say:
      misses >= 2
        ? `${step.help} You can also tap your answer on the screen.`
        : `Sorry, I didn't catch that. ${step.help}`,
  };
}

/* ------------------------------------------------------------------ */
/* Results                                                             */
/* ------------------------------------------------------------------ */

export function toCheckerInputs(a: VoiceAnswers): CheckerInputs {
  if (!a.birth || !a.medicare || !a.coverage) {
    throw new Error("Voice checker needs birth date, Medicare status and coverage");
  }
  const amount = (n: number | null | undefined) => (n && n > 0 ? n : null);
  return {
    birthMonth: a.birth.month,
    birthYear: a.birth.year,
    medicare: a.medicare,
    partBStart: a.medicare === "part_a_and_b" ? (a.partBStart ?? null) : null,
    coverage: a.coverage,
    employerSize: a.coverage === "employer_active" ? (a.employerSize ?? "unknown") : "unknown",
    contributesToHsa: a.hsa === true,
    collectsSocialSecurity: a.socialSecurity === true,
    filingStatus: a.filing ?? "individual",
    incomeThisYear: a.roth ? amount(a.income) : null,
    rothConversion: a.roth ? amount(a.rothAmount) : null,
    recentLifeChange: a.irmaa === true && a.lifeChange === true,
    payingIrmaa: a.irmaa === true,
    wagesThisYear: a.socialSecurity === true ? amount(a.wages) : null,
  };
}

/** Christian's number, digit by digit, so speech engines don't say "nine hundred nineteen". */
export function spokenPhone(phone: string = AGENT.phone): string {
  const d = phone.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
  return `${d.slice(0, 3).split("").join(" ")}, ${d.slice(3, 6).split("").join(" ")}, ${d.slice(6).split("").join(" ")}`;
}

export function sortFindings(findings: Finding[]): Finding[] {
  return [...findings].sort(
    (x, y) => Number(y.severity === "act_now") - Number(x.severity === "act_now"),
  );
}

export function resultsSpeech(findings: Finding[]): string {
  const closing = `If you'd like a second set of eyes, Christian is a licensed agent in Greensboro. You can call or text him at ${spokenPhone()}.`;
  if (findings.length === 0) {
    return `That's everything. Based on your answers, none of the common traps came up. That's not a full review, so it's still worth checking your coverage each fall. ${closing}`;
  }
  const sorted = sortFindings(findings);
  const intro =
    sorted.length === 1
      ? "That's everything. I found one thing worth a look."
      : `That's everything. I found ${sorted.length} things worth a look.`;
  const parts = sorted.map((f, i) => {
    const label = f.severity === "act_now" ? "Act soon" : "Worth checking";
    return `Number ${i + 1}. ${label}. ${f.title}. ${f.detail} What to do: ${f.action}`;
  });
  return `${intro} ${parts.join(" ")} Each one is written on your screen, with a link to the official source. ${closing}`;
}
