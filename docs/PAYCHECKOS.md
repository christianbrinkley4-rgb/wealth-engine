# PaycheckOS MVP

Route: `/tools/paycheck-breakdown`. All calculations and PNG creation run in the visitor's browser. Entries are not persisted, included in URLs, or sent to a server. The tools hub and sitemap link to the new route.

## Verified federal rules

Reviewed October 8, 2026, for tax year 2026.

| Rule                                                                                                    | Primary source                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Social Security employee rate: 6.2%; wage base: $184,500                                                | [SSA contribution and benefit base](https://www.ssa.gov/oact/cola/cbb.html)                                                                        |
| Medicare employee rate: 1.45%; no wage cap                                                              | [IRS Publication 15, payroll tax rates](https://www.irs.gov/publications/p15)                                                                      |
| Additional Medicare rate: 0.9%; employer withholding begins after $200,000, regardless of filing status | [IRS Additional Medicare FAQ](https://www.irs.gov/businesses/small-businesses-self-employed/questions-and-answers-for-the-additional-medicare-tax) |
| Additional Medicare tax-return thresholds: $200,000 single, $250,000 married filing jointly             | [IRS Additional Medicare FAQ](https://www.irs.gov/businesses/small-businesses-self-employed/questions-and-answers-for-the-additional-medicare-tax) |
| Income tax withholding: Worksheet 1A, Table 3 pay periods, standard annual percentage schedules         | [IRS Publication 15-T (2026), section 1](https://www.irs.gov/publications/p15t)                                                                    |

Current master has no `/numbers` hub, `lib/wealth/risk.ts`, or `app/tools/_components/share-card.tsx`. The wage base therefore comes directly from SSA. Math and tests follow `lib/wealth/math.ts` and `lib/__tests__/wealth-math.test.ts`. This feature adds and consumes the reusable share-card component at the requested path.

## Calculation contract

Gross and net alone cannot identify actual withholding or employer deductions. Results explicitly use an estimate with these assumptions:

- Regular W-2 wages. Gross equals federal income tax, Social Security, and Medicare taxable wages.
- A 2020 or later W-4, Step 2 unchecked, Steps 3 and 4 blank, no exemption.
- Stable pay over a full year, with no state or local tax calculation.
- No pre-tax deduction amounts are inferred. Tax-free benefits and retirement contributions can change taxable wages.

Worksheet 1A annualizes the paycheck, subtracts its line 1g adjustment ($8,600 single or $12,900 joint), then applies the standard schedule. The zero-rate schedule band is a separate step. The UI shows each occupied band, checks the published base-tax-plus-marginal-rate row, and divides the annual withholding by pay periods. Intermediate income tax calculations stay unrounded. Final paycheck lines round to cents. Annual income tax projections repeat the rounded paycheck withholding.

Without year-to-date wages, per-check FICA figures are annual averages. Annual Social Security respects the wage cap. Additional Medicare withholding respects the employer's $200,000 threshold. With optional wages before this check, per-check FICA applies only to wages crossing each threshold. Annual projections still model a full year of repeated pay, rather than forecasting the remaining year.

The annual section separately shows Additional Medicare tax-return liability at the filing-status threshold. Joint liability uses only the wages supplied here; the page explains that both spouses' wages determine actual household liability.

The remainder is exactly gross minus net minus estimated federal taxes. It stays unexplained and includes state/local taxes and employer deductions. A negative remainder displays an estimate mismatch, never fabricated benefits or a clamped zero. The share card also flags that mismatch.

User-provided and derived pay figures link to the input or math section. Tax figures link to IRS or SSA sources. Copy summaries preserve assumptions and source URLs. The downloaded card includes gross, net, take-home percentage, the tool URL, branding, and the education disclosure.

## Verification

- Math fixtures check published single/biweekly and joint/monthly rows, every standard schedule boundary, top rates, and weekly/semimonthly periods.
- Payroll tests cover the Social Security cap, threshold-crossing checks, both Medicare thresholds, first-check wages, annual averages, cent rounding, zero pay, zero net, invalid values, and negative residuals.
- UI tests cover pasted currency, invalid deposits, source links, short sentences, no long dashes, zero pay, mismatches, and year-to-date updates.
- Browser checks cover mobile disclosure visibility, responsive calculator layout, rendered bracket amounts, and a real PNG download.

No dependencies were added. No production deployment is part of this change.
