import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const sql = readFileSync(
  fileURLToPath(new URL("../../supabase/command-center/website-delivery-retry.sql", import.meta.url)),
  "utf8",
);
const cronSql = readFileSync(
  fileURLToPath(new URL("../../supabase/command-center/website-delivery-retry-cron.sql", import.meta.url)),
  "utf8",
);

describe("website delivery retry SQL", () => {
  it("claims only retryable website email jobs with a row lock", () => {
    expect(sql).toContain("status in ('pending', 'failed_retryable')");
    expect(sql).toContain("job in ('owner_alert', 'prospect_reply')");
    expect(sql).toContain("for update skip locked");
    expect(sql).toContain("claimed_until");
  });

  it("re-checks review, consent and do_not_call before returning a prospect reply", () => {
    expect(sql).toContain("wi.requires_review");
    expect(sql).toContain("consent_given");
    expect(sql).toContain("do_not_call");
    expect(sql).toContain("suppressed at retry");
  });

  it("turns a pending row with no snapshot into a task instead of looping", () => {
    expect(sql).toContain("sender was not configured");
    expect(sql).toContain("insert into public.lead_actions");
  });

  it("does not send mail from SQL", () => {
    const functions = sql.split("create or replace function").slice(1).join("\n");
    expect(functions).not.toMatch(/\b(net\.http|http_post|smtp|pg_notify)\b/i);
  });

  it("stores the website's message snapshot on mark", () => {
    expect(sql).toContain("p_body_text");
    expect(sql).toContain("p_recipient");
    expect(sql).toContain("left(p_body_text, 8000)");
  });
});

describe("website delivery retry cron SQL", () => {
  it("calls retry_deliveries through vault instead of a raw key", () => {
    expect(cronSql).toContain("website_delivery_retry_key");
    expect(cronSql).toContain("retry_deliveries");
    expect(cronSql).not.toMatch(/[a-f0-9]{64}/);
  });
});
