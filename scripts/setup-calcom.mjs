/**
 * Bounded personal-account setup. Default mode is an OFFLINE preview.
 * Docs/schema checked 2026-09-10: https://cal.com/docs/api-reference/v2/openapi.json
 * Never logs API keys, webhook secrets, raw provider bodies, or other account data.
 * Run with Node's --env-file=.env.calcom; that file must remain ignored.
 */
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

export const VERSIONS = { schedules: "2024-06-11", events: "2026-06-12" };
export const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
export const AVAILABILITY = [9, 11, 13, 15, 17].map((hour) => ({
  days: DAYS,
  startTime: `${String(hour).padStart(2, "0")}:00`,
  endTime: `${String(hour + 1).padStart(2, "0")}:00`,
}));
const SCHEDULE_NAME = "Christian Brinkley website consultations";
const EXPECTED_EMAIL = "christianbrinkley4@gmail.com";
export const TRIGGERS = [
  "BOOKING_CREATED",
  "BOOKING_REQUESTED",
  "BOOKING_RESCHEDULED",
  "BOOKING_CANCELLED",
  "BOOKING_REJECTED",
];
export const LOCATIONS = [
  { type: "attendeePhone" },
  { type: "integration", integration: "cal-video" },
  { type: "attendeeAddress" },
];
const PERSONAL_COPY =
  "Meet directly with Christian Brinkley, a local licensed insurance agent in the Piedmont Triad. There is no cost and no obligation to buy anything. Choose a phone call, a video conversation, or a visit at your home in the Triad. For a home visit, I’ll confirm the location with you. You are welcome to include a family member. Please do not include medical information, policy numbers or financial account details when booking.";
export const EVENT_DEFINITIONS = [
  {
    topic: "medicare",
    slug: "medicare-questions",
    title: "Medicare questions with Christian",
    description:
      "An introductory conversation about your Medicare questions and next steps. This is not a plan-specific sales appointment. Any later discussion of specific plans will follow the required appointment paperwork. We will keep this conversation focused on Medicare. " +
      PERSONAL_COPY,
  },
  {
    topic: "life_insurance",
    slug: "life-insurance-conversation",
    title: "Life insurance conversation with Christian",
    description:
      "Talk through who depends on you, the coverage you already have and the protection you want for your family. We can discuss questions about life insurance at a pace that feels comfortable. " +
      PERSONAL_COPY,
  },
  {
    topic: "care_coverage",
    slug: "care-coverage-conversation",
    title: "Care coverage conversation with Christian",
    description:
      "Talk about your preferences for future care and questions about long-term care, short-term care or critical illness coverage. Together, we can identify what you want to understand before making any decisions. " +
      PERSONAL_COPY,
  },
  {
    topic: "financial_planning",
    slug: "retirement-conversation",
    title: "Retirement conversation with Christian",
    description:
      "Start with the questions you have about retirement, your family and insurance protection. I am a licensed insurance agent and work with an advisor when financial planning is needed. I do not provide CPA, CFP or investment advisory services myself. " +
      PERSONAL_COPY,
  },
];

export function eventBody(definition, scheduleId, open = false) {
  return {
    title: definition.title,
    slug: definition.slug,
    description: definition.description,
    lengthInMinutes: 60,
    slotInterval: 60,
    minimumBookingNotice: 1440,
    beforeEventBuffer: 0,
    afterEventBuffer: 0,
    scheduleId,
    hidden: !open,
    bookingRequiresAuthentication: !open,
    locations: LOCATIONS,
    disableGuests: false,
    confirmationPolicy:
      definition.topic === "medicare"
        ? { type: "always", blockUnconfirmedBookingsInBooker: true }
        : { disabled: true },
    bookingWindow: { type: "calendarDays", value: 60, rolling: false },
    bookingFields: [
      { field: "name", variant: "fullName", label: "Your name" },
      { field: "email", required: true, hidden: false, label: "Email for your appointment" },
      {
        field: "attendeePhoneNumber",
        required: false,
        hidden: false,
        label: "Phone number (optional for video)",
      },
      { field: "location", label: "How would you like to meet?" },
      { field: "notes", required: false, hidden: true },
    ],
    hideCalendarNotes: true,
    requiresBookerEmailVerification: true,
    disableCancelling: { disabled: false },
    disableRescheduling: { disabled: false },
    allowReschedulingPastBookings: false,
    allowReschedulingCancelledBookings: false,
  };
}

export function offlinePlan() {
  return {
    mode: "offline-preview",
    networkCalls: 0,
    requestedSchedule: {
      name: SCHEDULE_NAME,
      timeZone: "America/New_York",
      isDefault: false,
      availability: AVAILABILITY,
      overrides: [],
    },
    staging:
      "The same new schedule starts with availability:[]; events are hidden and require booking authentication. Opening is a separate explicit step after QA, independent of Outlook.",
    events: EVENT_DEFINITIONS.map((definition) => ({
      topic: definition.topic,
      body: eventBody(definition, "<managed schedule ID>"),
    })),
    webhook: {
      active: false,
      subscriberUrl: "<CALCOM_WEBHOOK_URL>",
      triggers: TRIGGERS,
      version: "2021-10-20",
      payloadTemplate: "omit",
      secret: "<CALCOM_WEBHOOK_SECRET, never printed>",
    },
    activationRequirements: [
      "Account and free-plan API entitlement checked",
      "Selected Google calendar conflict detection and destination confirmed",
      "Staged booking fields and service wording reviewed",
      "Public webhook deployed with these event IDs and organizer email",
      "Booking/reschedule/cancellation test completed",
      "Medicare requests handled as introductory conversations; plan-specific paperwork remains a separate workflow",
    ],
  };
}

function same(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}
function normalizeAvailability(items) {
  if (!Array.isArray(items)) return null;
  return items
    .flatMap((row) => row.days.map((day) => `${day}|${row.startTime}|${row.endTime}`))
    .sort();
}
function scheduleMatches(schedule, ownerId) {
  return (
    schedule.ownerId === ownerId &&
    schedule.name === SCHEDULE_NAME &&
    schedule.timeZone === "America/New_York" &&
    schedule.isDefault === false &&
    Array.isArray(schedule.overrides) &&
    schedule.overrides.length === 0 &&
    (same(normalizeAvailability(schedule.availability), []) ||
      same(normalizeAvailability(schedule.availability), normalizeAvailability(AVAILABILITY)))
  );
}
export function assertManagedEvent(event, definition, scheduleId, ownerId) {
  if (
    event.ownerId !== ownerId ||
    event.slug !== definition.slug ||
    event.title !== definition.title ||
    event.description !== definition.description ||
    event.lengthInMinutes !== 60 ||
    event.scheduleId !== scheduleId ||
    event.minimumBookingNotice !== 1440 ||
    event.price !== 0
  ) {
    throw new Error(
      `Existing ${definition.slug} differs from this setup; review it instead of overwriting.`,
    );
  }
  const fields = Array.isArray(event.bookingFields) ? event.bookingFields : [];
  const email = fields.find((field) => field.field === "email");
  const notes = fields.find((field) => field.field === "notes");
  if (
    !email?.required ||
    email.hidden ||
    !notes?.hidden ||
    notes.required ||
    !event.hideCalendarNotes ||
    (definition.topic === "medicare"
      ? event.confirmationPolicy?.type !== "always" || event.confirmationPolicy?.disabled === true
      : event.confirmationPolicy?.disabled !== true)
  )
    throw new Error(
      `Review privacy/confirmation settings on ${definition.slug} before continuing.`,
    );
}
function fingerprint(event) {
  const stable = (value) =>
    Array.isArray(value)
      ? value.map(stable)
      : value && typeof value === "object"
        ? Object.fromEntries(
            Object.keys(value)
              .sort()
              .map((key) => [key, stable(value[key])]),
          )
        : value;
  return createHash("sha256")
    .update(
      JSON.stringify(
        stable({
          locations: event.locations,
          bookingFields: event.bookingFields,
          confirmationPolicy: event.confirmationPolicy,
          bookingWindow: event.bookingWindow,
          beforeEventBuffer: event.beforeEventBuffer,
          afterEventBuffer: event.afterEventBuffer,
        }),
      ),
    )
    .digest("hex");
}

export async function runSetup(mode, env = process.env, fetcher = fetch) {
  if (mode === "preview") return offlinePlan();
  if (!["inspect", "stage", "activate"].includes(mode))
    throw new Error("Use --preview, --inspect, --stage or --activate.");
  const apiKey = env.CALCOM_API_KEY?.trim();
  if (!apiKey || !/^cal_[A-Za-z0-9_-]+$/.test(apiKey))
    throw new Error("CALCOM_API_KEY is missing or invalid.");
  const expectedEmail = env.CALCOM_ORGANIZER_EMAIL?.trim().toLowerCase() || EXPECTED_EMAIL;
  const webhookSecret = env.CALCOM_WEBHOOK_SECRET?.trim();
  let webhookUrl = env.CALCOM_WEBHOOK_URL?.trim();
  if (!webhookUrl && env.CALCOM_PRODUCTION_ORIGIN) {
    let origin;
    try {
      origin = new URL(env.CALCOM_PRODUCTION_ORIGIN.trim());
    } catch {
      throw new Error("The production origin is invalid.");
    }
    if (
      origin.protocol !== "https:" ||
      origin.username ||
      origin.password ||
      origin.search ||
      origin.hash ||
      origin.pathname !== "/"
    )
      throw new Error("Production origin must be a plain HTTPS origin.");
    webhookUrl = new URL("/api/webhooks/cal", origin).toString();
  }
  if (mode !== "inspect") {
    if (!webhookSecret || webhookSecret.length < 32 || webhookSecret.length > 256)
      throw new Error("Configure the existing website webhook secret before staging.");
    let url;
    try {
      url = new URL(webhookUrl);
    } catch {
      throw new Error("Configure the public webhook URL first.");
    }
    if (
      url.protocol !== "https:" ||
      url.username ||
      url.password ||
      url.search ||
      url.hash ||
      url.pathname !== "/api/webhooks/cal"
    )
      throw new Error("Webhook URL must be a plain public HTTPS /api/webhooks/cal address.");
  }
  if (mode === "activate" && env.CALCOM_READY_TO_OPEN !== "true")
    throw new Error(
      "Complete booking QA, then explicitly set CALCOM_READY_TO_OPEN=true to open this schedule.",
    );
  const statePath = resolve(
    dirname(fileURLToPath(import.meta.url)),
    "../.cache/calcom-setup-state.json",
  );
  const state = existsSync(statePath)
    ? JSON.parse(readFileSync(statePath, "utf8"))
    : { version: 1, events: {} };
  if (state.version !== 1 || !state.events || typeof state.events !== "object")
    throw new Error("Unrecognized setup state.");
  state.eventFingerprints ||= {};
  const save = () => {
    mkdirSync(dirname(statePath), { recursive: true });
    writeFileSync(`${statePath}.tmp`, JSON.stringify(state, null, 2), { mode: 0o600 });
    renameSync(`${statePath}.tmp`, statePath);
  };
  let calls = 0;
  const api = async (path, method = "GET", body, version) => {
    if (++calls > 40) throw new Error("Setup request limit reached; inspect before continuing.");
    if (mode === "inspect" && method !== "GET") throw new Error("Inspect is read-only.");
    let response;
    try {
      response = await fetcher(`https://api.cal.com/v2${path}`, {
        method,
        headers: {
          Authorization: `Bearer ${apiKey}`,
          ...(body ? { "Content-Type": "application/json" } : {}),
          ...(version ? { "cal-api-version": version } : {}),
        },
        ...(body ? { body: JSON.stringify(body) } : {}),
        redirect: "error",
        signal: AbortSignal.timeout(15_000),
      });
    } catch {
      throw new Error(
        `Cal ${method} request failed; no automatic mutation retry. Inspect the account before retrying.`,
      );
    }
    if (!response.ok)
      throw new Error(
        `Cal ${method} returned HTTP ${response.status}. Stop and review account access; this script never upgrades a plan.`,
      );
    const text = await response.text();
    if (text.length > 4_000_000) throw new Error("Unexpectedly large Cal response.");
    let result;
    try {
      result = JSON.parse(text);
    } catch {
      throw new Error("Cal returned an invalid response.");
    }
    if (result.status !== "success" || result.data == null)
      throw new Error("Cal did not confirm this operation.");
    return result.data;
  };
  const me = await api("/me");
  if (
    !Number.isSafeInteger(me.id) ||
    me.email?.toLowerCase() !== expectedEmail ||
    !me.username ||
    (state.ownerId && state.ownerId !== me.id)
  )
    throw new Error("The Cal account does not match the intended organizer.");
  const schedules = await api("/schedules", "GET", undefined, VERSIONS.schedules);
  const events = await api(
    `/event-types?username=${encodeURIComponent(me.username)}`,
    "GET",
    undefined,
    VERSIONS.events,
  );
  const webhooks = await api("/webhooks?take=250&skip=0");
  if (![schedules, events, webhooks].every(Array.isArray) || webhooks.length === 250)
    throw new Error("Account listing is incomplete or unexpected; inspect manually.");
  const scheduleCandidates = schedules.filter((schedule) => schedule.name === SCHEDULE_NAME);
  if (
    scheduleCandidates.length > 1 ||
    (scheduleCandidates[0] && !scheduleMatches(scheduleCandidates[0], me.id))
  )
    throw new Error("A conflicting consultation schedule exists; it was not changed.");
  let schedule = scheduleCandidates[0];
  if (state.scheduleId && schedule?.id !== state.scheduleId)
    throw new Error("The saved consultation schedule was changed or removed.");
  const owned = {};
  for (const definition of EVENT_DEFINITIONS) {
    const candidates = events.filter((event) => event.slug === definition.slug);
    if (candidates.length > 1 || (candidates.length && !schedule))
      throw new Error(`Conflicting event slug: ${definition.slug}.`);
    if (candidates[0]) {
      assertManagedEvent(candidates[0], definition, schedule.id, me.id);
      if (state.events[definition.topic] && state.events[definition.topic] !== candidates[0].id)
        throw new Error("A saved consultation event was replaced.");
      if (
        state.eventFingerprints[definition.topic] &&
        state.eventFingerprints[definition.topic] !== fingerprint(candidates[0])
      )
        throw new Error(
          `The saved settings on ${definition.slug} changed; review instead of overwriting.`,
        );
      owned[definition.topic] = candidates[0];
    } else if (state.events[definition.topic])
      throw new Error("A saved consultation event was removed.");
  }
  const hookCandidates = webhookUrl
    ? webhooks.filter((hook) => hook.subscriberUrl === webhookUrl)
    : [];
  if (hookCandidates.length > 1)
    throw new Error("Multiple matching webhooks exist; review without adding duplicates.");
  let hook = hookCandidates[0];
  if (
    hook &&
    mode !== "inspect" &&
    (!same([...hook.triggers].sort(), [...TRIGGERS].sort()) ||
      hook.payloadTemplate ||
      hook.secret !== webhookSecret ||
      hook.version !== "2021-10-20")
  )
    throw new Error("The existing website webhook differs; it was not changed.");
  if (state.webhookId && hook?.id !== state.webhookId)
    throw new Error("The saved website webhook was changed or removed.");
  if (mode === "inspect")
    return {
      mode,
      accountMatches: true,
      publicUsername: me.username,
      counts: { schedules: schedules.length, events: events.length, webhooks: webhooks.length },
      managedScheduleFound: !!schedule,
      managedTopics: Object.keys(owned),
      calls,
      publicOpeningVerified: false,
    };
  if (
    mode === "stage" &&
    (schedule?.availability.length ||
      Object.values(owned).some((event) => !event.hidden || !event.bookingRequiresAuthentication) ||
      hook?.active)
  )
    throw new Error(
      "This setup is already open or changed; staging will not close existing bookings.",
    );
  state.ownerId = me.id;
  if (mode === "stage") {
    if (!schedule)
      schedule = await api(
        "/schedules",
        "POST",
        {
          name: SCHEDULE_NAME,
          timeZone: "America/New_York",
          isDefault: false,
          availability: [],
          overrides: [],
        },
        VERSIONS.schedules,
      );
    if (!scheduleMatches(schedule, me.id) || schedule.availability.length)
      throw new Error("Cal did not return a closed staging schedule; no events will be created.");
    state.scheduleId = schedule.id;
    save();
    for (const definition of EVENT_DEFINITIONS) {
      const event =
        owned[definition.topic] ||
        (await api("/event-types", "POST", eventBody(definition, schedule.id), VERSIONS.events));
      assertManagedEvent(event, definition, schedule.id, me.id);
      if (!event.hidden || !event.bookingRequiresAuthentication)
        throw new Error("Cal did not keep the created event closed.");
      state.events[definition.topic] = event.id;
      state.eventFingerprints[definition.topic] = fingerprint(event);
      owned[definition.topic] = event;
      save();
    }
    if (!hook)
      hook = await api("/webhooks", "POST", {
        active: false,
        subscriberUrl: webhookUrl,
        triggers: TRIGGERS,
        version: "2021-10-20",
        secret: webhookSecret,
      });
    if (hook.active !== false) throw new Error("Cal did not keep the staged webhook inactive.");
    state.webhookId = hook.id;
    save();
  } else {
    if (!schedule || !hook || EVENT_DEFINITIONS.some((definition) => !owned[definition.topic]))
      throw new Error("Stage and review all four events before opening.");
    // Enable delivery before opening slots. Never change the user's default calendar or other schedules.
    await api(`/webhooks/${encodeURIComponent(hook.id)}`, "PATCH", { active: true });
    for (const definition of EVENT_DEFINITIONS)
      await api(
        `/event-types/${owned[definition.topic].id}`,
        "PATCH",
        { hidden: false, bookingRequiresAuthentication: false },
        VERSIONS.events,
      );
    const updated = await api(
      `/schedules/${schedule.id}`,
      "PATCH",
      { availability: AVAILABILITY },
      VERSIONS.schedules,
    );
    if (!same(normalizeAvailability(updated.availability), normalizeAvailability(AVAILABILITY)))
      throw new Error("Cal returned different availability; inspect the schedule.");
    state.openedAt = new Date().toISOString();
    save();
  }
  return {
    mode,
    calls,
    scheduleId: schedule.id,
    eventIds: state.events,
    webhookId: state.webhookId,
    CALCOM_EVENT_TYPES: Object.fromEntries(
      Object.entries(state.events).map(([topic, id]) => [id, topic]),
    ),
    bookingUrls: Object.fromEntries(
      EVENT_DEFINITIONS.map((definition) => [
        definition.topic,
        `https://cal.com/${encodeURIComponent(me.username)}/${definition.slug}`,
      ]),
    ),
    storedSecrets: false,
    actualBookingTestPassed: false,
  };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  const mode =
    args.length === 0
      ? "preview"
      : args.length === 1 && args[0].startsWith("--")
        ? args[0].slice(2)
        : "invalid";
  runSetup(mode)
    .then((result) => console.log(JSON.stringify(result, null, 2)))
    .catch((error) => {
      console.error(error.message);
      process.exitCode = 1;
    });
}
