import { FilingStatus } from "@/app/lib/financial";

export interface ProfilePreset {
  id: string;
  label: string;
  subtitle: string;
  age: number;
  zip: string;
  annualIncome: number;
  portfolioValue: number;
  annualContribution: number;
  filingStatus: FilingStatus;
}

export const PROFILE_PRESETS: ProfilePreset[] = [
  {
    id: "triad-professional",
    label: "The Triad Professional",
    subtitle: "Age 45, $150k+ income, high tax exposure",
    age: 45,
    zip: "27408",
    annualIncome: 185000,
    portfolioValue: 420000,
    annualContribution: 38000,
    filingStatus: "joint",
  },
  {
    id: "greensboro-retiree",
    label: "The Greensboro Retiree",
    subtitle: "Age 64, Medicare-focused, IRMAA surcharge risk",
    age: 64,
    zip: "27410",
    annualIncome: 228000,
    portfolioValue: 760000,
    annualContribution: 12000,
    filingStatus: "joint",
  },
];
