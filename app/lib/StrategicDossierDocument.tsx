import { Document, Page, Path, Rect, StyleSheet, Svg, Text, View } from "@react-pdf/renderer";
import {
  buildWealthTrajectory,
  calculateIrmaaAnnualSurcharge,
  calculateNcTaxDrag,
  calculateTaxDrag,
  FilingStatus,
  toCurrency,
} from "@/app/lib/financial";
import { StrategicDossierPayload } from "@/app/lib/dossier";
import { getRegionalProfile } from "@/app/lib/regional";

const styles = StyleSheet.create({
  page: {
    padding: 28,
    backgroundColor: "#020617",
    color: "#e2e8f0",
    fontSize: 10,
  },
  badge: {
    borderWidth: 1,
    borderColor: "#0ea5e9",
    backgroundColor: "#082f49",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  badgeText: {
    color: "#7dd3fc",
    fontSize: 8,
    letterSpacing: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: 800,
    marginBottom: 6,
  },
  subHeading: {
    color: "#94a3b8",
    marginBottom: 14,
    lineHeight: 1.4,
  },
  sectionCard: {
    borderWidth: 1,
    borderColor: "#1e293b",
    backgroundColor: "#0f172a",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    gap: 8,
  },
  metricTile: {
    flexGrow: 1,
    borderWidth: 1,
    borderColor: "#1e293b",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#111827",
  },
  metricLabel: {
    color: "#94a3b8",
    fontSize: 8,
    marginBottom: 6,
    textTransform: "uppercase",
  },
  metricValue: {
    fontSize: 14,
    fontWeight: 800,
  },
  strategicNote: {
    marginTop: 6,
    color: "#cbd5e1",
    lineHeight: 1.45,
  },
  footer: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#1e293b",
    paddingTop: 8,
    color: "#94a3b8",
    fontSize: 8,
  },
  appendixHeading: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 8,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
    paddingBottom: 5,
    marginBottom: 5,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#1e293b",
    paddingVertical: 5,
  },
  tableCellLabel: {
    width: "55%",
    color: "#cbd5e1",
    fontSize: 9,
  },
  tableCellValue: {
    width: "45%",
    color: "#e2e8f0",
    fontSize: 9,
    textAlign: "right",
  },
});

function linePath(values: number[], width: number, height: number) {
  if (!values.length) return "";
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = Math.max(1, max - min);
  const step = values.length > 1 ? width / (values.length - 1) : width;
  return values
    .map((value, index) => {
      const x = index * step;
      const y = height - ((value - min) / range) * height;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ");
}

function resolveTaxNote(filingStatus: FilingStatus, taxDrag: number) {
  return `IRS Strategic Note: Estimated ${filingStatus} filer drag under projected 2026 Tax Law Changes is ${toCurrency(
    taxDrag,
  )} annually, primarily from bracket and standard deduction adjustments.`;
}

function resolveCmsNote(irmaaAnnualPenalty: number) {
  return `CMS Strategic Note: Estimated IRMAA premium adjustment exposure is ${toCurrency(
    irmaaAnnualPenalty,
  )} per year when modified AGI exceeds threshold tiers.`;
}

export default function createStrategicDossierDocument(payload: StrategicDossierPayload) {
  const filingStatus = payload.profile.filingStatus;
  const taxDrag = calculateTaxDrag(payload.diagnostic.annualIncome, filingStatus);
  const ncTaxDrag = calculateNcTaxDrag(payload.diagnostic.annualIncome, filingStatus);
  const irmaaAnnualPenalty = calculateIrmaaAnnualSurcharge(
    payload.diagnostic.annualIncome,
    filingStatus,
  );
  const regionalProfile = getRegionalProfile(payload.profile.zip);
  const trajectory = buildWealthTrajectory(payload.profile.age, {
    currentPortfolio: payload.diagnostic.portfolioValue,
    annualContribution: payload.diagnostic.annualContribution,
    years: 30,
  });
  const selfSeries = trajectory.map((year) => year.selfManaged);
  const fiduciarySeries = trajectory.map((year) => year.fiduciaryOptimized);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>PERSONALIZED REVIEW</Text>
        </View>
        <Text style={styles.heading}>Personalized Review Summary</Text>
        <Text style={styles.subHeading}>
          Developed by Christian Brinkley, UNCG Graduate Student and Student Researcher. Built for
          Piedmont Triad Context using regional research and verified accounting principles.
        </Text>

        <View style={styles.sectionCard}>
          <Text style={styles.metricLabel}>Profile Snapshot</Text>
          <Text>
            Client: {payload.profile.fullName || "Prospective Client"} | Age {payload.profile.age} |
            ZIP {payload.profile.zip || "N/A"} | Filing Status {payload.profile.filingStatus}
          </Text>
          <Text>
            Income: {toCurrency(payload.diagnostic.annualIncome)} | Portfolio:{" "}
            {toCurrency(payload.diagnostic.portfolioValue)} | Annual Savings:{" "}
            {toCurrency(payload.diagnostic.annualContribution)}
          </Text>
          <Text>Regional Baseline: {regionalProfile.marketLabel}</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.metricTile}>
            <Text style={styles.metricLabel}>Federal Tax Drag</Text>
            <Text style={{ ...styles.metricValue, color: "#f43f5e" }}>
              {toCurrency(taxDrag.taxDrag)}
            </Text>
          </View>
          <View style={styles.metricTile}>
            <Text style={styles.metricLabel}>North Carolina Tax Drag</Text>
            <Text style={{ ...styles.metricValue, color: "#f43f5e" }}>
              {toCurrency(ncTaxDrag.taxDrag)}
            </Text>
          </View>
        </View>

        <View style={{ ...styles.row, marginTop: 8 }}>
          <View style={styles.metricTile}>
            <Text style={styles.metricLabel}>Tax-Efficient Yield Opportunity</Text>
            <Text style={{ ...styles.metricValue, color: "#10b981" }}>
              {toCurrency(payload.diagnostic.strategicAlpha)}
            </Text>
          </View>
          <View style={styles.metricTile}>
            <Text style={styles.metricLabel}>IRMAA Exposure</Text>
            <Text style={{ ...styles.metricValue, color: "#f43f5e" }}>
              {toCurrency(irmaaAnnualPenalty)}
            </Text>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.metricLabel}>30-Year Wealth Trajectory Chart</Text>
          <Svg width={500} height={120}>
            <Rect x={0} y={0} width={500} height={120} fill="#020617" />
            <Path d={linePath(selfSeries, 500, 120)} stroke="#64748b" strokeWidth={2} fill="none" />
            <Path
              d={linePath(fiduciarySeries, 500, 120)}
              stroke="#0ea5e9"
              strokeWidth={2.4}
              fill="none"
            />
          </Svg>
          <Text style={styles.strategicNote}>
            Chart reflects client-specific self-managed (6.0%) versus fiduciary optimized (7.8%)
            outcomes over a 30-year horizon.
          </Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.metricLabel}>2026 Strategic Notes</Text>
          <Text style={styles.strategicNote}>{resolveTaxNote(filingStatus, taxDrag.taxDrag)}</Text>
          <Text style={styles.strategicNote}>
            State Overlay Note: North Carolina flat-rate sensitivity contributes an additional
            modeled drag of {toCurrency(ncTaxDrag.taxDrag)} annually.
          </Text>
          <Text style={styles.strategicNote}>{resolveCmsNote(irmaaAnnualPenalty)}</Text>
        </View>

        <View style={styles.footer}>
          <Text>
            created by local UNCG Student Researcher Christian Brinkley, with 2026 Tax Law Changes
            and CMS assumptions.
          </Text>
        </View>
      </Page>
      <Page size="A4" style={styles.page}>
        <Text style={styles.appendixHeading}>Methodology Appendix</Text>
        <View style={styles.sectionCard}>
          <Text style={styles.metricLabel}>Projection Formula Assumptions</Text>
          <Text style={styles.strategicNote}>
            Wealth trajectory assumes annual compounding with ongoing contributions at baseline 6.0%
            and fiduciary 7.8% return paths to highlight Tax-Efficient Yield and Sequence of Returns
            Risk sensitivity.
          </Text>
          <Text style={styles.strategicNote}>
            Tax drag applies federal 2026 Tax Law Changes assumptions and North Carolina flat-rate
            overlay for state-level exposure illustration.
          </Text>
          <Text style={styles.strategicNote}>
            Medicare IRMAA analysis uses current CMS premium adjustment tiers for Part B and Part D
            at projected modified AGI levels.
          </Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.metricLabel}>
            Regional Cost Snapshot - {regionalProfile.marketLabel}
          </Text>
          <View style={styles.tableHeader}>
            <Text style={styles.tableCellLabel}>Coverage Metric</Text>
            <Text style={styles.tableCellValue}>Annual Estimate</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Medigap + Part D</Text>
            <Text style={styles.tableCellValue}>
              {toCurrency(
                regionalProfile.medicare.medigapMonthlyPremium * 12 +
                  regionalProfile.medicare.medigapOopAnnual,
              )}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Medicare Advantage</Text>
            <Text style={styles.tableCellValue}>
              {toCurrency(
                regionalProfile.medicare.advantageMonthlyPremium * 12 +
                  regionalProfile.medicare.advantageOopAnnual,
              )}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Projected IRMAA Surcharge</Text>
            <Text style={styles.tableCellValue}>{toCurrency(irmaaAnnualPenalty)}</Text>
          </View>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.metricLabel}>UNCG Research Initiative Transparency Note</Text>
          <Text style={styles.strategicNote}>
            This dossier is produced for educational strategic review. It does not constitute
            personalized investment, tax, or legal advice. Final recommendations should include full
            account documentation, custodian statements, plan summaries, and beneficiary-specific
            constraints.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
