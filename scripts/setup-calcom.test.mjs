import assert from "node:assert/strict";
import test from "node:test";
import { assertManagedEvent, eventBody, EVENT_DEFINITIONS, runSetup } from "./setup-calcom.mjs";

test("preview is offline even if credentials are present", async () => {
  const result = await runSetup("preview", { CALCOM_API_KEY: "cal_secret" }, () => {
    throw new Error("Network must not run");
  });
  assert.equal(result.networkCalls, 0);
  assert.equal(result.requestedSchedule.availability.flatMap((item) => item.days).length, 35);
  for (const event of result.events) assert.equal(event.body.hidden, true);
});
test("activation fails before network calls until QA gate is explicit", async () => {
  await assert.rejects(
    runSetup(
      "activate",
      {
        CALCOM_API_KEY: "cal_secret",
        CALCOM_WEBHOOK_SECRET: "s".repeat(64),
        CALCOM_WEBHOOK_URL: "https://example.invalid/api/webhooks/cal",
      },
      () => {
        throw new Error("Unexpected network call");
      },
    ),
    /Complete booking QA/,
  );
});
test("a credential-bearing production origin is rejected before any account request", async () => {
  await assert.rejects(
    runSetup(
      "stage",
      {
        CALCOM_API_KEY: "cal_secret",
        CALCOM_WEBHOOK_SECRET: "s".repeat(64),
        CALCOM_PRODUCTION_ORIGIN: "https://user:password@example.invalid",
      },
      () => {
        throw new Error("Unexpected network call");
      },
    ),
    /plain HTTPS origin/,
  );
});
test("account access rejection stops without mutation retries or exposing provider secrets", async () => {
  let calls = 0;
  await assert.rejects(
    runSetup("inspect", { CALCOM_API_KEY: "cal_secret" }, async (_url, options) => {
      calls += 1;
      assert.equal(options.method, "GET");
      return Response.json({ privateSecret: "do-not-expose" }, { status: 403 });
    }),
    (error) => /HTTP 403/.test(error.message) && !error.message.includes("do-not-expose"),
  );
  assert.equal(calls, 1);
});
test("an unrelated calendar account stops before reading schedules", async () => {
  let calls = 0;
  await assert.rejects(
    runSetup("inspect", { CALCOM_API_KEY: "cal_secret" }, async () => {
      calls += 1;
      return Response.json({
        status: "success",
        data: { id: 123, email: "other@example.invalid", username: "other" },
      });
    }),
    /does not match/,
  );
  assert.equal(calls, 1);
});
test("matching a slug alone never authorizes modifying an event", () => {
  const definition = EVENT_DEFINITIONS[1];
  const matching = { ...eventBody(definition, 123), ownerId: 456, price: 0 };
  assert.doesNotThrow(() => assertManagedEvent(matching, definition, 123, 456));
  assert.throws(
    () =>
      assertManagedEvent({ ...matching, description: "An unrelated event" }, definition, 123, 456),
    /differs/,
  );
  assert.throws(
    () => assertManagedEvent({ ...matching, ownerId: 789 }, definition, 123, 456),
    /differs/,
  );
});
test("unsafe booking fields are rejected before reuse or activation", () => {
  const definition = EVENT_DEFINITIONS[0];
  const matching = { ...eventBody(definition, 123), ownerId: 456, price: 0 };
  assert.throws(
    () => assertManagedEvent({ ...matching, hideCalendarNotes: false }, definition, 123, 456),
    /privacy/,
  );
  assert.throws(
    () =>
      assertManagedEvent(
        { ...matching, confirmationPolicy: { disabled: true } },
        definition,
        123,
        456,
      ),
    /confirmation/,
  );
});
