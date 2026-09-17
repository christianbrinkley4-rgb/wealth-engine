import { createHash, createHmac, timingSafeEqual } from "node:crypto";

import { commandCenterConfig } from "@/lib/commandCenter";

export const CAL_MAX_BODY_BYTES = 65_536;
const TOPICS = ["medicare", "life_insurance", "care_coverage", "financial_planning"] as const;
type Topic = (typeof TOPICS)[number];
const EVENTS = [
  "BOOKING_CREATED",
  "BOOKING_REQUESTED",
  "BOOKING_RESCHEDULED",
  "BOOKING_CANCELLED",
  "BOOKING_REJECTED",
] as const;
type BookingEvent = (typeof EVENTS)[number];
export type AppointmentStatus = "confirmed" | "requested" | "cancelled" | "rejected";

export type CalWebhookConfig = {
  secret: string;
  organizerEmail: string;
  eventTypes: Record<string, Topic>;
};

/** There is no default event ID: an unrelated calendar event must never become a lead. */
export function calWebhookConfig(env: NodeJS.ProcessEnv = process.env): CalWebhookConfig | null {
  const secret = env.CALCOM_WEBHOOK_SECRET?.trim();
  const organizerEmail = email(env.CALCOM_ORGANIZER_EMAIL);
  if (!secret || secret.length < 32 || secret.length > 256 || !organizerEmail) return null;
  try {
    const configured: unknown = JSON.parse(env.CALCOM_EVENT_TYPES || "");
    if (
      !record(configured) ||
      !Object.keys(configured).length ||
      Object.keys(configured).length > 30
    )
      return null;
    const eventTypes: Record<string, Topic> = {};
    for (const [id, topic] of Object.entries(configured)) {
      if (!/^[1-9][0-9]{0,14}$/.test(id) || !TOPICS.includes(topic as Topic)) return null;
      eventTypes[id] = topic as Topic;
    }
    return { secret, organizerEmail, eventTypes };
  } catch {
    return null;
  }
}

export function validCalSignature(raw: Uint8Array, signature: string | null, secret: string) {
  if (!signature || !/^[a-f0-9]{64}$/i.test(signature)) return false;
  const expected = createHmac("sha256", secret).update(raw).digest();
  return timingSafeEqual(expected, Buffer.from(signature, "hex"));
}

export class CalPayloadError extends Error {
  constructor(public readonly status: number) {
    super("Invalid calendar webhook");
  }
}

/** Read incrementally; Content-Length alone does not bound chunked requests. */
export async function readCalBody(request: Request): Promise<Uint8Array> {
  const length = request.headers.get("content-length");
  if (length && (!/^\d+$/.test(length) || Number(length) > CAL_MAX_BODY_BYTES))
    throw new CalPayloadError(413);
  if (!request.body) throw new CalPayloadError(400);
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > CAL_MAX_BODY_BYTES) {
        await reader.cancel();
        throw new CalPayloadError(413);
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }
  const raw = new Uint8Array(size);
  let offset = 0;
  for (const chunk of chunks) {
    raw.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return raw;
}

export type CalAppointment = {
  event_key: string;
  event_type: BookingEvent;
  occurred_at: string;
  booking_uid: string;
  previous_uid: string | null;
  event_type_id: number;
  status: AppointmentStatus;
  starts_at: string;
  ends_at: string;
  full_name: string;
  email: string;
  phone: string | null;
  topic: Topic;
};

function record(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}
function email(value: unknown) {
  if (typeof value !== "string") return null;
  const normalized = value.trim().toLowerCase();
  return normalized.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)
    ? normalized
    : null;
}
function uid(value: unknown) {
  return typeof value === "string" && /^[a-zA-Z0-9_-]{8,128}$/.test(value) ? value : null;
}
function date(value: unknown) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}T.+(?:Z|[+-]\d{2}:\d{2})$/.test(value))
    return null;
  const milliseconds = Date.parse(value);
  return Number.isFinite(milliseconds) ? new Date(milliseconds).toISOString() : null;
}
function phone(value: unknown) {
  if (typeof value !== "string" || value.length > 40) return null;
  const digits = value.replace(/\D/g, "");
  if (/^1\d{10}$/.test(digits)) return digits.slice(1);
  return /^\d{10}$/.test(digits) ? digits : null;
}

/** Deliberately drops guests, notes, health answers, addresses and meeting credentials. */
export function parseCalAppointment(
  input: unknown,
  config: CalWebhookConfig,
  now = Date.now(),
): CalAppointment | null {
  if (!record(input) || typeof input.triggerEvent !== "string") throw new CalPayloadError(400);
  // Meeting-ended is a clock event, not evidence anybody attended.
  if (!EVENTS.includes(input.triggerEvent as BookingEvent)) return null;
  const payload = input.payload;
  if (!record(payload) || !record(payload.organizer)) throw new CalPayloadError(400);
  if (email(payload.organizer.email) !== config.organizerEmail) throw new CalPayloadError(403);
  const eventTypeId = payload.eventTypeId;
  if (typeof eventTypeId !== "number" || !Number.isSafeInteger(eventTypeId) || eventTypeId <= 0)
    throw new CalPayloadError(400);
  const topic = config.eventTypes[String(eventTypeId)];
  if (!topic) throw new CalPayloadError(403);
  const eventType = input.triggerEvent as BookingEvent;
  const bookingUid = uid(payload.uid);
  const previousUid = payload.rescheduleUid == null ? null : uid(payload.rescheduleUid);
  const occurredAt = date(input.createdAt);
  const startsAt = date(payload.startTime);
  const endsAt = date(payload.endTime);
  if (
    !bookingUid ||
    !occurredAt ||
    !startsAt ||
    !endsAt ||
    (payload.rescheduleUid != null && !previousUid) ||
    previousUid === bookingUid ||
    (eventType === "BOOKING_RESCHEDULED" && !previousUid) ||
    Date.parse(occurredAt) > now + 5 * 60_000 ||
    Date.parse(endsAt) <= Date.parse(startsAt) ||
    Date.parse(endsAt) - Date.parse(startsAt) > 8 * 60 * 60_000
  )
    throw new CalPayloadError(400);
  const attendees = payload.attendees;
  const booker = Array.isArray(attendees) ? attendees[0] : null;
  if (!record(booker)) throw new CalPayloadError(400);
  const bookerEmail = email(booker.email);
  const fullName = typeof booker.name === "string" ? booker.name.trim() : "";
  if (!bookerEmail || !fullName || fullName.length > 160 || /[\u0000-\u001f\u007f]/.test(fullName))
    throw new CalPayloadError(400);
  const responses = record(payload.responses) ? payload.responses : {};
  if (
    record(responses.email) &&
    responses.email.value != null &&
    email(responses.email.value) !== bookerEmail
  )
    throw new CalPayloadError(400);
  const phoneResponse = record(responses.attendeePhoneNumber)
    ? responses.attendeePhoneNumber.value
    : null;
  let status: AppointmentStatus;
  if (eventType === "BOOKING_CANCELLED" && payload.status === "CANCELLED") status = "cancelled";
  else if (eventType === "BOOKING_REJECTED" && payload.status === "REJECTED") status = "rejected";
  else if (eventType === "BOOKING_REQUESTED" && payload.status === "PENDING") status = "requested";
  else if (
    (eventType === "BOOKING_CREATED" || eventType === "BOOKING_RESCHEDULED") &&
    payload.status === "ACCEPTED"
  )
    status = "confirmed";
  else if (eventType === "BOOKING_RESCHEDULED" && payload.status === "PENDING")
    status = "requested";
  else throw new CalPayloadError(400);
  const appointment = {
    event_type: eventType,
    occurred_at: occurredAt,
    booking_uid: bookingUid,
    previous_uid: previousUid,
    event_type_id: eventTypeId,
    status,
    starts_at: startsAt,
    ends_at: endsAt,
    full_name: fullName,
    email: bookerEmail,
    phone: phone(booker.phoneNumber) || phone(phoneResponse),
    topic,
  };
  // Semantic identity survives different JSON whitespace and ancillary provider fields.
  // Exclude contact details: no contact-derived identifier leaves this service.
  const eventKey = createHash("sha256")
    .update(
      JSON.stringify([
        eventType,
        occurredAt,
        bookingUid,
        previousUid,
        eventTypeId,
        status,
        startsAt,
        endsAt,
      ]),
    )
    .digest("hex");
  return { event_key: eventKey, ...appointment };
}

export async function saveCalAppointment(appointment: CalAppointment) {
  const config = commandCenterConfig();
  if (!config) throw new Error("Appointment storage is not configured");
  const response = await fetch(config.endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-website-key": config.key },
    body: JSON.stringify({ action: "appointment", appointment }),
    cache: "no-store",
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) throw new Error("Appointment storage failed");
  const result: unknown = await response.json();
  if (!record(result) || result.stored !== true) throw new Error("Appointment storage unconfirmed");
  return { stored: true, duplicate: result.duplicate === true };
}
