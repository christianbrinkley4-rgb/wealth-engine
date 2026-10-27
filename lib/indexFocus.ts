/**
 * Index focus (Oct 26, 2026, Christian's call): Google should read this site
 * as the Triad's Medicare, retirement and life insurance resource. Pages for
 * other money topics (the younger-audience /wealth hub, AI guides, student
 * loans, cars, credit, budgeting, general tax filing, beginner investing)
 * stay live and linkable but are kept out of Google's index and the sitemap,
 * so they stop diluting what the site ranks for.
 *
 * Search Console on Oct 26: average position 47.2; top queries were national
 * topics like "72t exceptions" and "roth ladder"; 95 pages crawled or
 * discovered but not indexed.
 *
 * Keep here: anything about Medicare, Social Security, RMDs, retirement
 * income and accounts, life, disability, care and final expense insurance,
 * annuities. To bring a page back into Google, delete it from these lists.
 */

/** Whole sections: the path itself and everything under it. */
export const OFF_TOPIC_PREFIXES = ["/wealth", "/ai"] as const;

/** Single pages. */
export const OFF_TOPIC_PATHS: readonly string[] = [
  // Calculators for everyday budgeting rather than retirement or coverage
  "/tools/emergency-fund",
  "/tools/debt-payoff",
  "/tools/take-home-pay",
  "/tools/compound-interest",
  "/tools/budget",
  "/tools/cd-or-savings-quiz",
  // Guides: working-age tax filing, credit, savings products
  "/guides/overtime-tax-deduction-2026",
  "/guides/tips-tax-deduction-2026",
  "/guides/teen-tax-return-dependent",
  "/guides/1099-k-personal-items-sold-at-loss",
  "/guides/tax-extension-cannot-pay",
  "/guides/unemployment-tax-withholding",
  "/guides/estimated-quarterly-taxes-guide",
  "/guides/1099-vs-w2-classification",
  "/guides/tax-loss-harvesting-wash-sale",
  "/guides/tip-income-reporting-rules",
  "/guides/i-bonds-vs-tips",
  "/guides/hysa-vs-money-market-account",
  "/guides/credit-utilization-explained",
  "/guides/tax-deductions-side-hustlers-miss",
  "/guides/tax-filing-mistakes-first-timers",
  "/guides/child-tax-credit-2026",
  "/guides/hard-inquiry-vs-soft-inquiry",
  "/guides/fsa-vs-hsa-which-is-better",
  // Answers: student loans, cars, budgeting, credit, general tax, investing basics, home and renters
  "/answers/which-student-loan-repayment-plan-is-right-for-me",
  "/answers/how-does-student-loan-forgiveness-work",
  "/answers/should-i-refinance-my-student-loans",
  "/answers/should-i-pay-off-student-loans-or-invest",
  "/answers/should-i-buy-or-lease-a-car",
  "/answers/should-i-refinance-my-car-loan",
  "/answers/how-can-i-pay-off-my-car-loan-faster",
  "/answers/what-car-insurance-coverage-do-i-actually-need",
  "/answers/how-do-i-buy-a-used-car-without-getting-burned",
  "/answers/how-do-i-afford-a-car-in-college",
  "/answers/how-do-tax-deductions-work",
  "/answers/how-do-tax-credits-work",
  "/answers/how-do-i-file-taxes-for-the-first-time",
  "/answers/1099-or-w-2-how-do-taxes-differ",
  "/answers/how-does-the-503020-budget-rule-work",
  "/answers/how-much-should-i-have-in-an-emergency-fund",
  "/answers/snowball-or-avalanche-which-debt-payoff-method-is-better",
  "/answers/how-do-i-budget-on-a-low-income",
  "/answers/how-do-i-build-a-monthly-budget-that-works",
  "/answers/which-money-habits-actually-build-wealth",
  "/answers/how-do-i-build-credit-from-scratch",
  "/answers/how-can-i-improve-my-credit-score",
  "/answers/how-do-credit-cards-actually-work",
  "/answers/what-is-the-difference-between-a-credit-report-and-a-credit-score",
  "/answers/what-does-homeowners-insurance-cover",
  "/answers/do-i-need-renters-insurance",
  "/answers/how-do-i-pick-the-right-insurance-deductible",
  "/answers/how-do-i-choose-a-health-insurance-plan",
  "/answers/how-should-i-save-for-retirement-in-my-20s",
  "/answers/what-are-the-basics-of-accounting",
  "/answers/how-does-small-business-accounting-work",
  "/answers/how-do-i-start-investing",
  "/answers/what-is-an-index-fund",
  "/answers/how-does-compound-interest-work",
  "/answers/should-i-take-the-standard-deduction-or-itemize",
  "/answers/how-do-tax-brackets-actually-work",
  "/answers/what-is-tax-loss-harvesting",
  "/answers/how-does-self-employment-tax-work",
  "/answers/do-i-qualify-for-the-home-office-deduction",
  "/answers/child-tax-credit-or-dependent-care-credit-which-do-i-get",
  "/answers/do-i-need-to-pay-estimated-quarterly-taxes",
  "/answers/how-are-capital-gains-taxed",
  "/answers/what-is-a-target-date-fund",
  "/answers/what-is-an-expense-ratio",
  "/answers/should-i-dollar-cost-average-or-invest-a-lump-sum",
  "/answers/how-do-bonds-work",
  "/answers/how-do-i-rebalance-my-portfolio",
  "/answers/how-are-dividends-taxed",
  "/answers/should-i-use-a-brokerage-account-or-a-retirement-account",
  "/answers/index-funds-or-actively-managed-funds-which-is-better",
  "/answers/what-is-the-difference-between-risk-tolerance-and-risk-capacity",
  "/answers/how-do-i-start-investing-with-100",
  "/answers/do-i-need-umbrella-insurance",
  "/answers/why-does-my-landlord-want-renters-insurance",
  "/answers/how-does-zero-based-budgeting-work",
  "/answers/debt-snowball-or-avalanche-which-should-i-pick",
  "/answers/how-are-credit-scores-calculated",
  "/answers/how-much-down-payment-does-a-first-time-home-buyer-need",
  "/answers/what-is-pmi-and-how-do-i-get-rid-of-it",
  "/answers/how-do-side-hustle-taxes-work",
  // Ask wall: working-age topics
  "/ask/no-tax-on-overtime-what-actually-qualifies",
  "/ask/hsa-after-leaving-job",
];

const PATH_SET = new Set(OFF_TOPIC_PATHS);

/** True when a site path (no origin, no query) should stay out of Google. */
export function isOffTopicPath(path: string): boolean {
  const clean = path.replace(/[?#].*$/, "").replace(/\/+$/, "") || "/";
  if (PATH_SET.has(clean)) return true;
  return OFF_TOPIC_PREFIXES.some((p) => clean === p || clean.startsWith(`${p}/`));
}

/** next.config headers() entries that send `X-Robots-Tag: noindex, follow`. */
export function offTopicRobotsHeaders() {
  const header = [{ key: "X-Robots-Tag", value: "noindex, follow" }];
  return [
    ...OFF_TOPIC_PREFIXES.flatMap((p) => [
      { source: p, headers: header },
      { source: `${p}/:path*`, headers: header },
    ]),
    ...OFF_TOPIC_PATHS.map((source) => ({ source, headers: header })),
  ];
}
