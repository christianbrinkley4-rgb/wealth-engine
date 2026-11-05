import type { CountyHistoryYear, StatewideHistoryYear } from "@/lib/ncLandscapeHistoryTypes";

/** Shared by the server loader and the browser state picker (no Node imports here). */
export const US_DATA_PATH = "/data/us-medicare";

export interface UsStateSummary {
  name: string;
  counties: number;
  statewide: Record<string, StatewideHistoryYear>;
}

export interface UsIndex {
  years: number[];
  states: Record<string, UsStateSummary>;
}

export interface UsStateDetail {
  state: string;
  name: string;
  years: number[];
  statewide: Record<string, StatewideHistoryYear>;
  counties: Record<string, Record<string, CountyHistoryYear>>;
}
