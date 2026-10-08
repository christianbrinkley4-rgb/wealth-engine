/**
 * Shared data model + scoring for the /tools decision-tree quizzes.
 * Pure logic, no DOM. Every quiz ships its questions and result buckets
 * as a QuizData object; scoreQuiz picks the winning bucket.
 *
 * Scoring is additive: each chosen option adds points to one or more
 * result buckets. The bucket with the most points wins. Ties resolve to
 * the bucket listed first in `results`, so list buckets in a sensible
 * default order (the "talk to a pro" bucket first for safety on mixed ties).
 */

export interface QuizOption {
  /** Short label shown on the button. */
  label: string;
  /** Points added to each result bucket when chosen. */
  scores: Record<string, number>;
}

export interface QuizQuestion {
  id: string;
  /** The question, written as Christian would ask it. */
  text: string;
  /** Optional one-line context under the question. */
  sub?: string;
  options: QuizOption[];
}

export interface QuizResultDef {
  /** Stable id, must match keys used in option scores. */
  id: string;
  /** The verdict headline. Educational framing only, never a recommendation. */
  headline: string;
  /** Short verdict for the share card (the card renders it large). */
  shareLabel: string;
  /** One or two sentences expanding the headline. */
  lede: string;
  /** 3-5 bullets explaining why this result fits. */
  bullets: string[];
  /** Questions the visitor should bring to a licensed professional. */
  takeToPro: string[];
  /** Section heading for takeToPro. Defaults to "Questions to bring to a pro". */
  takeToProHeading?: string;
  /** Final line on the result screen. */
  closing: string;
}

export interface QuizMeta {
  /** Meta title, must stay under 60 characters. */
  title: string;
  /** Meta description, must stay under 160 characters. */
  description: string;
}

export interface QuizFaq {
  q: string;
  a: string;
}

export interface QuizData {
  slug: string;
  /** Short name used in the hero eyebrow and the share card. */
  quizName: string;
  questions: QuizQuestion[];
  results: QuizResultDef[];
  /** Shared intro shown before question 1. */
  intro: string;
}

/**
 * Score a completed quiz. `answers[i]` is the chosen option index for
 * question i. Missing or out-of-range answers contribute nothing, so a
 * partial quiz still resolves deterministically.
 */
export function scoreQuiz(data: QuizData, answers: number[]): QuizResultDef {
  const totals: Record<string, number> = {};
  for (const result of data.results) totals[result.id] = 0;

  data.questions.forEach((question, qi) => {
    const option = question.options[answers[qi]];
    if (!option) return;
    for (const [bucket, points] of Object.entries(option.scores)) {
      if (bucket in totals) totals[bucket] += points;
    }
  });

  let winner = data.results[0];
  let best = -Infinity;
  for (const result of data.results) {
    const total = totals[result.id] ?? 0;
    if (total > best) {
      best = total;
      winner = result;
    }
  }
  return winner;
}

/** Collect every user-facing string in a quiz for copy audits. */
export function quizCopy(data: QuizData): string[] {
  const out: string[] = [data.quizName, data.intro];
  for (const q of data.questions) {
    out.push(q.text);
    if (q.sub) out.push(q.sub);
    for (const o of q.options) out.push(o.label);
  }
  for (const r of data.results) {
    out.push(r.headline, r.lede, ...r.bullets, ...r.takeToPro, r.closing);
    if (r.takeToProHeading) out.push(r.takeToProHeading);
  }
  return out;
}
