import { FilingStatus } from "@/app/lib/financial";

export type FunnelType = "WEALTH" | "MEDICARE";

export interface StrategicDossierPayload {
  profile: {
    userId?: string;
    fullName: string;
    email: string;
    phone: string;
    age: number;
    zip: string;
    filingStatus: FilingStatus;
  };
  diagnostic: {
    funnel: FunnelType;
    annualIncome: number;
    keyOutcomeValue: number;
    portfolioValue: number;
    annualContribution: number;
    strategicAlpha: number;
    taxDrag: number;
    irmaaAnnualPenalty: number;
    includeNcTax?: boolean;
    ncTaxDrag?: number;
    ctaVariant?: "review-a" | "review-b";
    presetId?: string;
    wealthTrajectory?: Array<{
      year: number;
      selfManaged: number;
      fiduciary: number;
      wealthGap: number;
    }>;
    keyOutcomeLabel: string;
  };
  advisoryContext: {
    goals: string;
    notes: string;
    createdAt: string;
  };
}
