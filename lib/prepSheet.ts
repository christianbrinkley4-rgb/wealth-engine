/**
 * Appointment prep sheet system (November 2026).
 *
 * Two parts use this file:
 * - /prep-sheet: a private builder for Christian. It runs in his browser.
 *   It saves nothing and sends nothing.
 * - /appointment-prep: a public intake form for a client who has an
 *   appointment. The answers go to Christian by email through the existing
 *   Resend path (app/api/prep-intake/route.ts).
 *
 * HEALTH DATA RULE. Medications, doctors, and pharmacy are health details.
 * They are never written to Supabase or to any other database. Email is the
 * only allowed path. Nothing in this file imports a database client, and the
 * tests in lib/__tests__/prep-sheet.test.ts and prep-intake-route.test.ts
 * keep it that way.
 *
 * No real client data belongs in this file, in the tests, or in any example.
 */

import { AGENT } from "@/lib/agent";
import { normalizeUsPhone } from "@/lib/contact";

/** The seven things Christian or the client writes down. All free text. */
export interface PrepFields {
  clientName: string;
  /** Date and time in the writer's own words, for example "Tuesday at 2:00". */
  appointment: string;
  /** Current coverage in the writer's own words. Never matched to a plan. */
  planType: string;
  /** One medication per line, with dose and how often. */
  medications: string;
  /** One doctor or hospital per line. */
  doctors: string;
  pharmacy: string;
  /** One question per line. */
  questions: string;
}

export const EMPTY_PREP_FIELDS: PrepFields = {
  clientName: "",
  appointment: "",
  planType: "",
  medications: "",
  doctors: "",
  pharmacy: "",
  questions: "",
};

export const PREP_LIMITS: Record<keyof PrepFields, number> = {
  clientName: 120,
  appointment: 160,
  planType: 400,
  medications: 3000,
  doctors: 2000,
  pharmacy: 300,
  questions: 3000,
};

const MAX_LINES = 40;

/** Trimmed, non-empty lines. Leading list marks such as "-" or "1." are removed. */
export function splitLines(text: string): string[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.replace(/^\s*(?:[-*•]|\d{1,2}[.)])\s+/, "").trim())
    .filter((line) => line.length > 0)
    .slice(0, MAX_LINES);
}

export interface PrepMedication {
  text: string;
  /** True when the line has no number, so the dose is probably missing. */
  needsDose: boolean;
}

export interface PrepSheet {
  clientName: string;
  appointment: string;
  planType: string;
  pharmacy: string;
  medications: PrepMedication[];
  doctors: string[];
  clientQuestions: string[];
  /** Questions that come from an empty or incomplete field. */
  stillToAsk: string[];
  /** Questions to ask at every appointment. */
  alwaysAsk: string[];
  /** Checks for Christian to do before the appointment. */
  beforeAppointment: string[];
}

/** The question the sheet repeats for each drug. */
export const DRUG_PLAN_QUESTION =
  "Should the drug plan comparison include this drug, or leave it out?";

const ALWAYS_ASK: readonly string[] = [
  "Ask to see the red, white, and blue Medicare card. Write the Part A and Part B start dates. Do not write the Medicare number on this sheet.",
  "Ask if anything changed since this list was made: a new drug, a new doctor, or a move.",
  "Ask what the client wants most from this appointment.",
];

const BEFORE_APPOINTMENT: readonly string[] = [
  "Scope of Appointment form completed before any plan is discussed. Follow the current CMS timing rule.",
  "Look up each drug on Medicare.gov for the correct plan year. Do not rely on memory.",
  "Confirm each doctor with the plan or with the doctor's office before the client enrolls.",
];

/** Turns the typed fields into the structured sheet. Pure, no side effects. */
export function buildPrepSheet(fields: PrepFields): PrepSheet {
  const medications = splitLines(fields.medications).map((text) => ({
    text,
    needsDose: !/\d/.test(text),
  }));
  const doctors = splitLines(fields.doctors);
  const clientQuestions = splitLines(fields.questions);

  const stillToAsk: string[] = [];
  if (!fields.clientName.trim()) {
    stillToAsk.push("Confirm the client's full name as it appears on the Medicare card.");
  }
  if (!fields.appointment.trim()) {
    stillToAsk.push("Confirm the appointment date and time.");
  }
  if (!fields.planType.trim()) {
    stillToAsk.push("Ask what coverage the client has now. Ask to see the plan card.");
  }
  if (medications.length === 0) {
    stillToAsk.push(
      "Ask if the client takes any prescription drugs. Write each name, the dose, and how often.",
    );
  }
  for (const medication of medications) {
    if (medication.needsDose) {
      stillToAsk.push(`Ask the dose and how often for: ${medication.text}.`);
    }
  }
  if (medications.length > 0) {
    stillToAsk.push(`For each drug, ask: ${DRUG_PLAN_QUESTION}`);
  }
  if (doctors.length === 0) {
    stillToAsk.push("Ask which doctors and hospitals the client wants to keep.");
  }
  if (!fields.pharmacy.trim()) {
    stillToAsk.push("Ask which pharmacy the client uses. Ask if mail order is acceptable.");
  }
  if (clientQuestions.length === 0) {
    stillToAsk.push("Ask what questions the client has. The client sent none.");
  }

  return {
    clientName: fields.clientName.trim(),
    appointment: fields.appointment.trim(),
    planType: fields.planType.trim(),
    pharmacy: fields.pharmacy.trim(),
    medications,
    doctors,
    clientQuestions,
    stillToAsk,
    alwaysAsk: [...ALWAYS_ASK],
    beforeAppointment: [...BEFORE_APPOINTMENT],
  };
}

// ─── PUBLIC INTAKE ───────────────────────────────────────────────────────────

/**
 * The exact sentence next to the checkbox on the intake form.
 * Bump INTAKE_CONSENT_VERSION whenever this wording changes.
 */
export const INTAKE_CONSENT_VERSION = "2026-11-16.v1";
export const INTAKE_CONSENT_TEXT =
  `I am sending this information to ${AGENT.name}, a licensed insurance agent, ` +
  "so he can prepare for my appointment. It goes to him by email. This website " +
  "does not save it in a database. It is not sold or shared with other agents " +
  "or lead companies. I agree he can call or email me about my appointment.";

export interface IntakeSubmission extends PrepFields {
  /** Ten digits, or an empty string. */
  phone: string;
  /** Lower case, or an empty string. */
  email: string;
}

export type IntakeValidation =
  | { ok: true; intake: IntakeSubmission }
  | { ok: false; error: string; field: string };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown, limit: number): string {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

/** Validates the JSON body of an intake request. Never throws. */
export function validateIntake(body: Record<string, unknown>): IntakeValidation {
  const clientName = text(body.clientName, PREP_LIMITS.clientName);
  if (clientName.length < 2) {
    return { ok: false, error: "Please enter your name.", field: "clientName" };
  }

  const phone = normalizeUsPhone(body.phone);
  if (phone === null) {
    return {
      ok: false,
      error: "Enter a 10-digit phone number, or leave the phone box empty.",
      field: "phone",
    };
  }
  const email = text(body.email, 254).toLowerCase();
  if (email && !EMAIL_REGEX.test(email)) {
    return { ok: false, error: "That email address does not look right.", field: "email" };
  }
  if (!phone && !email) {
    return {
      ok: false,
      error: "Please enter a phone number or an email address, so I can reach you.",
      field: "phone",
    };
  }

  const intake: IntakeSubmission = {
    clientName,
    phone,
    email,
    appointment: text(body.appointment, PREP_LIMITS.appointment),
    planType: text(body.planType, PREP_LIMITS.planType),
    medications: text(body.medications, PREP_LIMITS.medications),
    doctors: text(body.doctors, PREP_LIMITS.doctors),
    pharmacy: text(body.pharmacy, PREP_LIMITS.pharmacy),
    questions: text(body.questions, PREP_LIMITS.questions),
  };

  if (
    !intake.planType &&
    !intake.medications &&
    !intake.doctors &&
    !intake.pharmacy &&
    !intake.questions
  ) {
    return {
      ok: false,
      error: "Please fill in at least one box, so I have something to prepare.",
      field: "medications",
    };
  }

  if (
    body.consent_given !== true ||
    body.consent_text !== INTAKE_CONSENT_TEXT ||
    body.consent_version !== INTAKE_CONSENT_VERSION
  ) {
    return {
      ok: false,
      error: "Please check the box so I know it is alright to send this to me.",
      field: "consent",
    };
  }

  return { ok: true, intake };
}

// ─── EMAIL FORMAT ────────────────────────────────────────────────────────────
// The email is plain text with fixed labels. The builder page reads the same
// labels back, so Christian can paste the email and get a filled sheet.

const SECTION = {
  medications: "== Medications ==",
  doctors: "== Doctors and hospitals ==",
  pharmacy: "== Pharmacy ==",
  questions: "== Questions ==",
  end: "== End ==",
} as const;

const NONE = "(none given)";

/** A typed line can never look like a section label. */
function safeBlock(value: string): string {
  const cleaned = value
    .split(/\r?\n/)
    .map((line) => (/^\s*==.*==\s*$/.test(line) ? line.replace(/=/g, "") : line))
    .join("\n")
    .trim();
  return cleaned || NONE;
}

function safeLine(value: string): string {
  return value.replace(/\s*\r?\n\s*/g, " ").trim() || NONE;
}

function formatPhone(digits: string): string {
  return digits.length === 10
    ? `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
    : digits;
}

export function intakeEmailSubject(intake: IntakeSubmission): string {
  return `Appointment prep from ${safeLine(intake.clientName)}`;
}

export function formatIntakeEmail(intake: IntakeSubmission): string {
  return [
    "Appointment prep from the website.",
    "This email is the only copy. The website did not save these answers.",
    "",
    `Name: ${safeLine(intake.clientName)}`,
    `Phone: ${intake.phone ? formatPhone(intake.phone) : NONE}`,
    `Email: ${intake.email || NONE}`,
    `Appointment: ${safeLine(intake.appointment)}`,
    `Current coverage: ${safeLine(intake.planType)}`,
    "",
    SECTION.medications,
    safeBlock(intake.medications),
    "",
    SECTION.doctors,
    safeBlock(intake.doctors),
    "",
    SECTION.pharmacy,
    safeBlock(intake.pharmacy),
    "",
    SECTION.questions,
    safeBlock(intake.questions),
    "",
    SECTION.end,
    "",
    "To make the printable sheet: copy this whole email and paste it into the prep sheet page.",
  ].join("\n");
}

function labelValue(source: string, label: string): string {
  const match = source.match(new RegExp(`^\\s*>?\\s*${label}:[ \\t]*(.*)$`, "m"));
  const value = match?.[1]?.trim() ?? "";
  return value === NONE ? "" : value;
}

function sectionValue(source: string, start: string, next: string): string {
  const from = source.indexOf(start);
  if (from === -1) return "";
  const rest = source.slice(from + start.length);
  const to = rest.indexOf(next);
  const block = (to === -1 ? rest : rest.slice(0, to))
    .split(/\r?\n/)
    // A forwarded or quoted email puts ">" in front of each line.
    .map((line) => line.replace(/^\s*>\s?/, ""))
    .join("\n")
    .trim();
  return block === NONE ? "" : block;
}

/**
 * Reads a pasted intake email back into the seven fields.
 * Returns null when the text is not an intake email.
 */
export function parseIntakeEmail(source: string): PrepFields | null {
  if (!source.includes(SECTION.medications) || !/^\s*>?\s*Name:/m.test(source)) return null;
  return {
    clientName: labelValue(source, "Name").slice(0, PREP_LIMITS.clientName),
    appointment: labelValue(source, "Appointment").slice(0, PREP_LIMITS.appointment),
    planType: labelValue(source, "Current coverage").slice(0, PREP_LIMITS.planType),
    medications: sectionValue(source, SECTION.medications, SECTION.doctors).slice(
      0,
      PREP_LIMITS.medications,
    ),
    doctors: sectionValue(source, SECTION.doctors, SECTION.pharmacy).slice(
      0,
      PREP_LIMITS.doctors,
    ),
    pharmacy: sectionValue(source, SECTION.pharmacy, SECTION.questions).slice(
      0,
      PREP_LIMITS.pharmacy,
    ),
    questions: sectionValue(source, SECTION.questions, SECTION.end).slice(
      0,
      PREP_LIMITS.questions,
    ),
  };
}
