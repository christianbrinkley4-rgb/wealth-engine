import type { Metadata } from "next";
import { Download } from "lucide-react";

import { MarkExplored } from "@/app/wealth/tools/MarkExplored";
import { EducationNote, Faq, JsonLd, NextUp, PageHead } from "@/app/wealth/ui/shell";
import { SITE_URL } from "@/lib/seo";
import { wealthMetadata } from "@/lib/wealth/seo";
import { ANALYZER_FILE, BUDGET_FILE } from "@/lib/wealth/site";

const path = "/wealth/tools";
const description =
  "Two free downloads: a working Excel budget spreadsheet with a 50/30/20 check, and a Python tool that reads financial statements and explains ten ratios.";

export const metadata: Metadata = wealthMetadata({
  title: "Free Budget Spreadsheet and Financial Statement Analyzer",
  description,
  path,
});

const FAQ = [
  {
    q: "Are the downloads really free?",
    a: "Yes. No email, no sign-up. Tap the button and the file downloads.",
  },
  {
    q: "What do I need to open the budget spreadsheet?",
    a: "Microsoft Excel. It also opens in Google Sheets and Apple Numbers. It has four tabs: Start Here, Budget, Summary and Savings Goals, with the formulas already built.",
  },
  {
    q: "Do I need to know Python to use the Financial Statement Analyzer?",
    a: "No. You need Python 3 installed, which is free. Then it's one command. The zip has a START-HERE file that walks through it, and there are no extra packages to install.",
  },
  {
    q: "Does the analyzer send my data anywhere?",
    a: "No. It runs on your own computer and reads two CSV files in its folder. Nothing is uploaded.",
  },
  {
    q: "Does the analyzer tell me whether to buy a stock?",
    a: "No. It calculates standard ratios and flags trends and data problems. It's for learning to read financial statements, not for picking investments.",
  },
] as const;

const SAMPLE_REPORT = `KEY RATIOS            2023    2024    2025
------------------------------------------
Current ratio         2.27    2.12    1.95
Gross margin         40.0%   38.0%   36.0%
Return on equity     22.5%   21.1%   15.6%
Debt to equity        1.00    0.96    1.07

NOTABLE TRENDS
 * 2025: margin compression. Gross margin
   fell from 38.0% to 36.0%.`;

export default function WealthToolsPage() {
  return (
    <main>
      <MarkExplored />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Free money tools",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              item: {
                "@type": "DigitalDocument",
                name: "Monthly budget spreadsheet",
                encodingFormat: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                url: `${SITE_URL}${BUDGET_FILE}`,
                isAccessibleForFree: true,
                author: { "@id": `${SITE_URL}/#christian` },
              },
            },
            {
              "@type": "ListItem",
              position: 2,
              item: {
                "@type": "SoftwareSourceCode",
                name: "Financial Statement Analyzer",
                programmingLanguage: "Python",
                url: `${SITE_URL}${ANALYZER_FILE}`,
                isAccessibleForFree: true,
                author: { "@id": `${SITE_URL}/#christian` },
              },
            },
          ],
        }}
      />
      <PageHead
        eyebrow="Free tools"
        title={
          <>
            Two downloads. <span className="w-mark">No email wall.</span>
          </>
        }
        lede="Things I built that you can keep. Tap, download, use."
        crumbs={[{ name: "Free tools", path }]}
      />

      <section className="w-section-tight">
        <div className="w-shell">
          <div className="w-card w-download" id="budget-spreadsheet">
            <div>
              <p className="w-eyebrow">Excel · .xlsx · 11 KB</p>
              <h2 className="w-h2">Budget spreadsheet</h2>
              <p className="w-lede">
                A planned-vs-actual monthly budget. Type your take-home pay and your bills. The formulas do
                the rest.
              </p>
              <div className="w-btn-row">
                <a href={BUDGET_FILE} download className="w-btn">
                  <Download size={18} aria-hidden /> Download the spreadsheet
                </a>
              </div>
            </div>
            <div className="w-prose">
              <ul>
                <li>
                  <strong>Budget tab.</strong> Income, housing, food, transport and more. Planned, actual and
                  the difference for every line.
                </li>
                <li>
                  <strong>Summary tab.</strong> Money left over, plus a 50/30/20 check against your real numbers.
                </li>
                <li>
                  <strong>Savings Goals tab.</strong> Target, saved so far, and months to go.
                </li>
                <li>
                  <strong>Start Here tab.</strong> Five steps. No macros, nothing to enable.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="w-section-tight">
        <div className="w-shell">
          <div className="w-card w-download" id="ratio-checker">
            <div>
              <p className="w-eyebrow">Python · .zip · 10 KB</p>
              <h2 className="w-h2">Financial Statement Analyzer</h2>
              <p className="w-lede">
                A small Python tool I wrote. Give it a company&apos;s income statement and balance sheet. It
                prints ten standard ratios, points out trends, and checks the data for errors.
              </p>
              <div className="w-btn-row">
                <a href={ANALYZER_FILE} download className="w-btn">
                  <Download size={18} aria-hidden /> Download the analyzer
                </a>
              </div>
              <div className="w-prose" style={{ marginTop: 22, fontSize: "1rem" }}>
                <ol>
                  <li>Unzip the folder.</li>
                  <li>Open a terminal inside it.</li>
                  <li>
                    Run <code>python analyzer.py</code> (or <code>python3</code> on a Mac).
                  </li>
                </ol>
                <p>
                  It ships with a made-up sample company so you see a full report right away. The README and
                  START-HERE files show how to swap in real numbers.
                </p>
              </div>
            </div>
            <div>
              <div className="w-file" role="img" aria-label="Sample report from the analyzer, using a made-up company">
                <b>$ python analyzer.py</b>
                {"\n"}
                {SAMPLE_REPORT}
              </div>
              <p style={{ margin: "8px 0 0", fontSize: "0.86rem", color: "var(--w-muted)" }}>
                Part of the sample report. The company is made up.
              </p>
            </div>
          </div>
          <EducationNote />
        </div>
      </section>

      <Faq items={FAQ} title="About the downloads" />
      <NextUp
        links={[
          { href: "/wealth/calculators/budget", label: "Try the budget builder first", kind: "Calculator" },
          { href: "/wealth/learn/what-accountants-actually-do", label: "What accountants actually do", kind: "Article" },
          { href: "/wealth/journey", label: "How I'm building this", kind: "Journey" },
        ]}
      />
    </main>
  );
}
