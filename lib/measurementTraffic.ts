let testSession = false;

/** Owner QA stays out of visitor counts, including on cellular connections. */
export function isTestTraffic(): boolean {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  const setting = params.get("qa");
  if (setting === "1") testSession = true;
  if (setting === "0") testSession = false;
  try {
    if (setting === "1") sessionStorage.setItem("we-qa", "1");
    if (setting === "0") sessionStorage.removeItem("we-qa");
    return testSession || sessionStorage.getItem("we-qa") === "1";
  } catch {
    return testSession;
  }
}

export function productionMeasurementHost(host: string): boolean {
  return host === "christianbrinkleync.com" || host === "www.christianbrinkleync.com";
}

export function canMeasureVisitor(): boolean {
  return typeof window !== "undefined" && productionMeasurementHost(window.location.hostname) && !isTestTraffic();
}

export function testAttribution(): { traffic_type?: "test" } {
  return isTestTraffic() ? { traffic_type: "test" } : {};
}
