export type ShareCardMetric = { label: string; value: string; href: string };
export type ShareCardData = {
  title: string;
  metrics: ShareCardMetric[];
  summary: string;
  url: string;
};

const escapeXml = (text: string) =>
  text.replace(
    /[<>&"']/g,
    (char) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&apos;",
      })[char]!,
  );

/** A portable image with explicit provenance and a tool link. No external assets. */
export function shareCardSvg(data: ShareCardData): string {
  const lines = data.summary.split(". ");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" rx="28" fill="#152e34"/>
    <rect x="64" y="64" width="72" height="6" fill="#e3bb70"/>
    <g font-family="Arial, sans-serif" fill="#fff">
      <text x="64" y="116" font-size="24" fill="#e3bb70">CHRISTIAN BRINKLEY</text>
      <text x="64" y="186" font-size="46" font-weight="700">${escapeXml(data.title)}</text>
      ${data.metrics
        .slice(0, 3)
        .map(
          (metric, index) => `<g transform="translate(${64 + index * 370}, 260)">
        <text font-size="24" fill="#e3bb70">${escapeXml(metric.label)}</text>
        <text y="64" font-size="${metric.value.length > 13 ? 30 : 40}" font-weight="700">${escapeXml(metric.value)}</text>
      </g>`,
        )
        .join("")}
      ${lines.map((line, index) => `<text x="64" y="${414 + index * 40}" font-size="30">${escapeXml(line)}${index < lines.length - 1 ? "." : ""}</text>`).join("")}
      <text x="64" y="522" font-size="20">Your entries. Federal estimates: IRS Pub. 15-T and SSA.gov.</text>
      <text x="64" y="554" font-size="20">Education only. Christian is not a CPA.</text>
      <a href="${escapeXml(data.url)}"><text x="64" y="594" font-size="22" fill="#e3bb70">${escapeXml(data.url.replace(/^https:\/\//, ""))}</text></a>
    </g>
  </svg>`;
}
