"use client";

interface ClientTelemetryEvent {
  type: string;
  ctaVariant?: "review-a" | "review-b";
  presetId?: string;
  funnel?: "WEALTH" | "MEDICARE" | "NONE";
  zip?: string;
}

export function trackClientEvent(event: ClientTelemetryEvent) {
  const payload = JSON.stringify({
    ...event,
    timestamp: new Date().toISOString(),
  });

  if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
    const blob = new Blob([payload], { type: "application/json" });
    navigator.sendBeacon("/api/telemetry", blob);
    return;
  }

  void fetch("/api/telemetry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: payload,
    keepalive: true,
  });
}
