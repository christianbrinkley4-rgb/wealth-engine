export interface RegionalProfile {
  marketLabel: string;
  medicare: {
    medigapMonthlyPremium: number;
    medigapOopAnnual: number;
    advantageMonthlyPremium: number;
    advantageOopAnnual: number;
  };
}

const DEFAULT_PROFILE: RegionalProfile = {
  marketLabel: "Piedmont Triad",
  medicare: {
    medigapMonthlyPremium: 210,
    medigapOopAnnual: 900,
    advantageMonthlyPremium: 46,
    advantageOopAnnual: 2200,
  },
};

export function getRegionalProfile(zip: string): RegionalProfile {
  if (!zip || zip.length < 3) {
    return DEFAULT_PROFILE;
  }

  if (zip.startsWith("274")) {
    return {
      marketLabel: "Greensboro Regional Average",
      medicare: {
        medigapMonthlyPremium: 214,
        medigapOopAnnual: 920,
        advantageMonthlyPremium: 44,
        advantageOopAnnual: 2260,
      },
    };
  }

  if (zip.startsWith("271")) {
    return {
      marketLabel: "Winston-Salem Regional Average",
      medicare: {
        medigapMonthlyPremium: 206,
        medigapOopAnnual: 940,
        advantageMonthlyPremium: 49,
        advantageOopAnnual: 2180,
      },
    };
  }

  if (zip.startsWith("272") || zip.startsWith("273")) {
    return {
      marketLabel: "High Point / Triad Regional Average",
      medicare: {
        medigapMonthlyPremium: 208,
        medigapOopAnnual: 910,
        advantageMonthlyPremium: 47,
        advantageOopAnnual: 2210,
      },
    };
  }

  return DEFAULT_PROFILE;
}
