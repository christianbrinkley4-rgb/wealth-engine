/** One year of Medicare Advantage counts (no plan or insurer names). See scripts/landscape/build-nc-history.py. */
export interface HistoryYear {
  /** Medicare Advantage plans open to anyone with Medicare (Special Needs and employer plans excluded). */
  plans: number;
  /** Of those, plans that include Part D drug coverage. */
  withDrugs: number;
  /** Plans with drug coverage and a $0 monthly plan premium (Part B premium still applies). */
  zeroPremium: number;
  ppo: number;
  hmo: number;
  /** Median in-network out-of-pocket maximum, in dollars. */
  moopMedian: number | null;
  /** Plans with an overall star rating of 4 or higher. */
  fourStarPlus: number;
}

export interface CountyHistoryYear extends HistoryYear {
  /** Special Needs Plans offered in the county. */
  specialNeeds: number;
}

export interface StatewideHistoryYear extends HistoryYear {
  /** Counties with at least one plan. */
  countiesCovered: number;
  /** Stand-alone Part D drug plans offered in North Carolina. */
  pdpPlans: number;
  pdpZeroPremium: number;
  pdpLowestPremium: number | null;
}

export interface NcHistory {
  years: number[];
  statewide: Record<string, StatewideHistoryYear>;
  counties: Record<string, Record<string, CountyHistoryYear>>;
}
