/** One year of Medicare Advantage counts for one county (no plan or insurer names). */
export interface CountyYear {
  /** Medicare Advantage plans open to anyone with Medicare (Special Needs Plans excluded). */
  plans: number;
  /** Of those, plans that include Part D drug coverage. */
  withDrugs: number;
  /** Plans with drug coverage and a $0 monthly plan premium (Part B premium still applies). */
  zeroPremium: number;
  ppo: number;
  hmo: number;
  /** Lowest and median in-network out-of-pocket maximum, in dollars. */
  moopMin: number | null;
  moopMedian: number | null;
  /** Plans with an overall star rating of 4 or higher. */
  fourStarPlus: number;
  /** Number of parent insurance organizations offering these plans. */
  insurers: number;
  /** Special Needs Plans (for people with Medicaid, certain conditions, or in facilities). */
  specialNeeds: number;
}

export interface CountyLandscape {
  y2027: CountyYear;
  y2026: CountyYear;
  /** Segment IDs present in 2026 but not 2027. Not shown: renumbering makes it unreliable. */
  notOfferedFor2027: number;
  newFor2027: number;
}

export interface PdpYear {
  plans: number;
  zeroPremium: number;
  lowestPremium: number | null;
  insurers: number;
}

export interface NcLandscape {
  dataUpdated: string;
  counties: Record<string, CountyLandscape>;
  pdp: { y2027: PdpYear; y2026: PdpYear };
}
