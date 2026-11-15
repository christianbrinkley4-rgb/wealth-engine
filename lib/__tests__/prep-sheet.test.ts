import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";
import {
  buildPrepSheet,
  DRUG_PLAN_QUESTION,
  EMPTY_PREP_FIELDS,
  formatIntakeEmail,
  INTAKE_CONSENT_TEXT,
  INTAKE_CONSENT_VERSION,
  intakeEmailSubject,
  parseIntakeEmail,
  PREP_LIMITS,
  splitLines,
  validateIntake,
  type PrepFields,
} from "@/lib/prepSheet";

/**
 * Every person, drug, doctor and pharmacy in this file is made up.
 * "Test Client, 72, Plan G, test medications." No real client data.
 */
const TEST_FIELDS: PrepFields = {
  clientName: "Test Client",
  appointment: "Tuesday, November 17 at 2:00 PM",
  planType: "Plan G with a separate drug plan",
  medications: "Testmedicine A 10 mg once a day\nTestmedicine B\n- Testmedicine C 500 mg twice a day",
  doctors: "Dr. Test Example, Sample Family Practice\nSample Regional Hospital",
  pharmacy: "Sample Pharmacy on Test Street",
  questions: "Will my drug costs change next year?\nCan I keep Dr. Example?",
};

const validBody = (over: Record<string, unknown> = {}) => ({
  ...TEST_FIELDS,
  phone: "(336) 555-0100",
  email: "Test.Client@Example.com",
  consent_given: true,
  consent_text: INTAKE_CONSENT_TEXT,
  consent_version: INTAKE_CONSENT_VERSION,
  ...over,
});

describe("splitLines", () => {
  it("drops empty lines and list marks", () => {
    expect(splitLines("- one\n\n2. two\n  three  \n• four")).toEqual([
      "one",
      "two",
      "three",
      "four",
    ]);
  });

  it("keeps a dose that starts a line", () => {
    expect(splitLines("10 mg Testmedicine")).toEqual(["10 mg Testmedicine"]);
  });
});

describe("buildPrepSheet", () => {
  const sheet = buildPrepSheet(TEST_FIELDS);

  it("lists every drug on its own row", () => {
    expect(sheet.medications.map((m) => m.text)).toEqual([
      "Testmedicine A 10 mg once a day",
      "Testmedicine B",
      "Testmedicine C 500 mg twice a day",
    ]);
  });

  it("marks a drug that has no dose and asks for it", () => {
    expect(sheet.medications.map((m) => m.needsDose)).toEqual([false, true, false]);
    expect(sheet.stillToAsk).toContain("Ask the dose and how often for: Testmedicine B.");
  });

  it("asks the drug plan question when there is at least one drug", () => {
    expect(sheet.stillToAsk).toContain(`For each drug, ask: ${DRUG_PLAN_QUESTION}`);
  });

  it("keeps the client's own questions separate from Christian's", () => {
    expect(sheet.clientQuestions).toEqual([
      "Will my drug costs change next year?",
      "Can I keep Dr. Example?",
    ]);
    expect(sheet.alwaysAsk.length).toBeGreaterThan(0);
    expect(sheet.beforeAppointment.some((line) => line.includes("Scope of Appointment"))).toBe(
      true,
    );
  });

  it("turns every empty field into a question to ask", () => {
    const empty = buildPrepSheet(EMPTY_PREP_FIELDS);
    expect(empty.medications).toEqual([]);
    expect(empty.stillToAsk).toHaveLength(7);
    expect(empty.stillToAsk.join(" ")).toContain("prescription drugs");
    expect(empty.stillToAsk.join(" ")).toContain("pharmacy");
    expect(empty.stillToAsk.join(" ")).toContain("doctors and hospitals");
    // No drug yet, so there is no drug to ask the plan question about.
    expect(empty.stillToAsk.join(" ")).not.toContain(DRUG_PLAN_QUESTION);
  });

  it("never asks for the Medicare number", () => {
    expect(sheet.alwaysAsk.join(" ")).toContain("Do not write the Medicare number");
  });
});

describe("validateIntake", () => {
  it("accepts a complete fictional intake and normalizes contact details", () => {
    const result = validateIntake(validBody());
    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.intake.phone).toBe("3365550100");
    expect(result.intake.email).toBe("test.client@example.com");
    expect(result.intake.medications).toContain("Testmedicine A");
  });

  it.each([
    [{ clientName: " " }, "clientName"],
    [{ phone: "12345" }, "phone"],
    [{ phone: "", email: "" }, "phone"],
    [{ email: "not-an-email" }, "email"],
    [{ planType: "", medications: "", doctors: "", pharmacy: "", questions: "" }, "medications"],
    [{ consent_given: false }, "consent"],
    [{ consent_text: "something else" }, "consent"],
    [{ consent_version: "old" }, "consent"],
  ])("rejects %j", (over, field) => {
    const result = validateIntake(validBody(over));
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.field).toBe(field);
  });

  it("accepts a phone number alone or an email alone", () => {
    expect(validateIntake(validBody({ email: "" })).ok).toBe(true);
    expect(validateIntake(validBody({ phone: "" })).ok).toBe(true);
  });

  it("cuts each field at its limit", () => {
    const result = validateIntake(validBody({ medications: "x".repeat(5000) }));
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.intake.medications).toHaveLength(PREP_LIMITS.medications);
  });

  it("ignores values that are not text", () => {
    const result = validateIntake(validBody({ doctors: { $ne: null }, pharmacy: 42 }));
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.intake.doctors).toBe("");
      expect(result.intake.pharmacy).toBe("");
    }
  });
});

describe("intake email", () => {
  const validated = validateIntake(validBody());
  if (!validated.ok) throw new Error("fixture must be valid");
  const email = formatIntakeEmail(validated.intake);

  it("says it is the only copy", () => {
    expect(email).toContain("This email is the only copy.");
    expect(intakeEmailSubject(validated.intake)).toBe("Appointment prep from Test Client");
  });

  it("round-trips through the builder's paste box", () => {
    expect(parseIntakeEmail(email)).toEqual(TEST_FIELDS);
  });

  it("still reads an email that a mail program quoted with >", () => {
    const quoted = email
      .split("\n")
      .map((line) => `> ${line}`)
      .join("\n");
    expect(parseIntakeEmail(quoted)).toEqual(TEST_FIELDS);
  });

  it("returns empty fields, not placeholder text, for boxes left empty", () => {
    const sparse = validateIntake(validBody({ doctors: "", pharmacy: "", appointment: "" }));
    if (!sparse.ok) throw new Error("fixture must be valid");
    const parsed = parseIntakeEmail(formatIntakeEmail(sparse.intake));
    expect(parsed?.doctors).toBe("");
    expect(parsed?.pharmacy).toBe("");
    expect(parsed?.appointment).toBe("");
  });

  it("cannot be confused by a typed line that looks like a section label", () => {
    const tricky = validateIntake(
      validBody({ medications: "Testmedicine A 10 mg\n== Questions ==\nTestmedicine B 5 mg" }),
    );
    if (!tricky.ok) throw new Error("fixture must be valid");
    const parsed = parseIntakeEmail(formatIntakeEmail(tricky.intake));
    expect(parsed?.medications).toContain("Testmedicine B 5 mg");
    expect(parsed?.questions).toBe(TEST_FIELDS.questions);
  });

  it("returns null for text that is not an intake email", () => {
    expect(parseIntakeEmail("Hello Christian, see you Tuesday.")).toBeNull();
  });
});

describe("prep pages stay out of search and out of the site menus", () => {
  const ROOT = join(__dirname, "..", "..");
  const paths = sitemap().map((entry) => new URL(entry.url).pathname);

  function sourceFiles(dir: string): string[] {
    return readdirSync(join(ROOT, dir), { withFileTypes: true }).flatMap((entry) => {
      const child = `${dir}/${entry.name}`;
      if (entry.isDirectory()) return sourceFiles(child);
      return /\.(tsx|ts)$/.test(entry.name) && !entry.name.includes(".test.") ? [child] : [];
    });
  }

  it("neither prep page is in the sitemap", () => {
    expect(paths).not.toContain("/prep-sheet");
    expect(paths).not.toContain("/appointment-prep");
  });

  it("the private builder is noindex and nofollow", () => {
    const page = readFileSync(join(ROOT, "app/prep-sheet/page.tsx"), "utf8");
    expect(page).toContain("robots: { index: false, follow: false, nocache: true }");
  });

  it("the public intake page is noindex", () => {
    const page = readFileSync(join(ROOT, "app/appointment-prep/page.tsx"), "utf8");
    expect(page).toContain("robots: { index: false, follow: true }");
  });

  it("no page, menu, or component links to the private builder", () => {
    const linking = [...sourceFiles("app"), ...sourceFiles("components"), ...sourceFiles("lib")]
      .filter((file) => !file.startsWith("app/prep-sheet/") && file !== "lib/prepSheet.ts")
      .filter((file) => /["'`]\/prep-sheet\b/.test(readFileSync(join(ROOT, file), "utf8")));
    expect(linking).toEqual([]);
  });
});

describe("health data rule", () => {
  const ROOT = join(__dirname, "..", "..");
  const files = [
    "lib/prepSheet.ts",
    "app/api/prep-intake/route.ts",
    "app/prep-sheet/PrepSheetBuilder.tsx",
    "app/appointment-prep/IntakeForm.tsx",
  ];

  it.each(files)("%s imports no database or storage client", (file) => {
    const source = readFileSync(join(ROOT, file), "utf8");
    const imports = source.match(/^import .*$/gm) ?? [];
    for (const line of imports) {
      expect(line, file).not.toMatch(
        /supabase|commandCenter|nurture|neon|leadEngine|lib\/capture|localStorage/i,
      );
    }
    expect(source, file).not.toMatch(/localStorage|sessionStorage|indexedDB|document\.cookie/);
  });

  it("the private builder makes no network request", () => {
    const source = readFileSync(join(ROOT, "app/prep-sheet/PrepSheetBuilder.tsx"), "utf8");
    expect(source).not.toMatch(/\bfetch\(|XMLHttpRequest|sendBeacon|trackEvent/);
  });

  it("the intake form posts to the email-only route and nowhere else", () => {
    const source = readFileSync(join(ROOT, "app/appointment-prep/IntakeForm.tsx"), "utf8");
    const targets = [...source.matchAll(/fetch\(\s*["'`]([^"'`]+)["'`]/g)].map((m) => m[1]);
    expect(targets).toEqual(["/api/prep-intake"]);
    expect(source).not.toContain("readAttribution");
    expect(source).not.toContain("trackEvent");
  });
});
