import { getSupabaseAdmin, hasSupabaseAdminConfig } from "@/lib/supabase";

export type TelemetryEventType =
  | "assessment_launched"
  | "preset_selected"
  | "cta_variant_assigned"
  | "roadmap_requested"
  | "roadmap_submitted"
  | "pdf_exported"
  | "pdf_export_failed"
  | "plaid_link_success"
  | "plaid_link_error";

export interface TelemetryEvent {
  type: TelemetryEventType;
  ctaVariant?: "review-a" | "review-b";
  presetId?: string;
  funnel?: "WEALTH" | "MEDICARE" | "NONE";
  zip?: string;
  timestamp: string;
}

interface TelemetryStore {
  events: TelemetryEvent[];
  counters: Record<string, number>;
}

declare global {
  var __wealthTelemetryStore: TelemetryStore | undefined;
}

function getStore(): TelemetryStore {
  if (!globalThis.__wealthTelemetryStore) {
    globalThis.__wealthTelemetryStore = {
      events: [],
      counters: {},
    };
  }
  return globalThis.__wealthTelemetryStore;
}

export function recordTelemetry(event: TelemetryEvent) {
  const store = getStore();
  store.events.push(event);
  const key = [
    event.type,
    event.ctaVariant ?? "na",
    event.presetId ?? "na",
    event.funnel ?? "na",
  ].join("|");
  store.counters[key] = (store.counters[key] ?? 0) + 1;
}

export function getTelemetrySummary() {
  const store = getStore();
  return {
    totalEvents: store.events.length,
    counters: store.counters,
    lastEvent: store.events[store.events.length - 1] ?? null,
  };
}

export async function recordTelemetryPersistent(event: TelemetryEvent) {
  recordTelemetry(event);
  try {
    if (!hasSupabaseAdminConfig()) {
      return;
    }
    const supabase = getSupabaseAdmin();
    await supabase.from("telemetry_events").insert({
      event_type: event.type,
      cta_variant: event.ctaVariant ?? null,
      preset_id: event.presetId ?? null,
      funnel: event.funnel ?? null,
      zip: event.zip ?? null,
      event_timestamp: event.timestamp,
    });
  } catch {
    // In-memory fallback already captured the event.
  }
}

export async function getTelemetrySummaryPersistent() {
  const memoryFallback = getTelemetrySummary();
  try {
    if (!hasSupabaseAdminConfig()) {
      return memoryFallback;
    }
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("telemetry_events")
      .select("event_type, cta_variant, preset_id, funnel, event_timestamp")
      .order("event_timestamp", { ascending: false })
      .limit(5000);

    if (error || !data) {
      return memoryFallback;
    }

    const counters: Record<string, number> = {};
    for (const row of data) {
      const key = [
        row.event_type,
        row.cta_variant ?? "na",
        row.preset_id ?? "na",
        row.funnel ?? "na",
      ].join("|");
      counters[key] = (counters[key] ?? 0) + 1;
    }

    return {
      totalEvents: data.length,
      counters,
      lastEvent: data[0]
        ? {
            type: data[0].event_type as TelemetryEventType,
            ctaVariant: data[0].cta_variant ?? undefined,
            presetId: data[0].preset_id ?? undefined,
            funnel: data[0].funnel ?? undefined,
            zip: undefined,
            timestamp: data[0].event_timestamp,
          }
        : null,
    };
  } catch {
    return memoryFallback;
  }
}
