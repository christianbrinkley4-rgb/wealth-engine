import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

/**
 * Source checks on supabase/command-center/website-delivery-outbox.sql.
 *
 * This SQL has been applied to the command center, and there is no database in
 * this suite, so nothing here executes plpgsql. What these tests protect is the
 * part that can still be got wrong by editing the file: that it stays additive
 * to the already deployed website-ingress.sql, that its copy of
 * capture_website_inquiry has not drifted from the deployed one, that the
 * suppression and idempotency rules are still written the way the contract
 * states, and that recording a delivery cannot send one.
 *
 * The behavioural half — that the rules actually behave this way in Postgres —
 * can only be checked against the live project, and is recorded in
 * docs/LIVE-VERIFICATION-2026-09-15.md rather than here.
 */

const read = (name: string) =>
  readFileSync(
    fileURLToPath(new URL(`../../supabase/command-center/${name}`, import.meta.url)),
    "utf8",
  );

const outboxSql = read("website-delivery-outbox.sql");
const ingressSql = read("website-ingress.sql");

/** The executable lines of one function body, comments and blank lines removed. */
function body(sql: string, name: string): string[] {
  const start = sql.indexOf(`create or replace function public.${name}`);
  expect(start, `${name} is missing`).toBeGreaterThan(-1);
  const end = sql.indexOf("\n$$;", start);
  expect(end, `${name} is unterminated`).toBeGreaterThan(start);
  return (
    sql
      .slice(start, end)
      .split("\n")
      // Drop the carriage return first: without it a trailing comment on a CRLF
      // checkout survives the strip below, and every line carrying one reads as
      // drift that is not there.
      .map((line) =>
        line
          .replace(/\r$/, "")
          .replace(/\s+--\s.*$/, "")
          .trim(),
      )
      .filter((line) => line.length > 0 && !line.startsWith("--"))
  );
}

/** Lines in `from` that `to` does not have, counting repeats. */
function missingFrom(from: string[], to: string[]): string[] {
  const remaining = [...to];
  const gone: string[] = [];
  for (const line of from) {
    const at = remaining.indexOf(line);
    if (at === -1) gone.push(line);
    else remaining.splice(at, 1);
  }
  return gone.sort();
}

describe("the file stays additive to what is already deployed", () => {
  it("records where it was applied and names the one project it belongs to", () => {
    // The header is the only record of which objects are live, so an edit that
    // drops it leaves whoever reruns this file guessing.
    expect(outboxSql).toMatch(/Applied remotely: website_delivery_outbox/);
    expect(outboxSql).toMatch(/T65 Daily Command Center, project \w+/);
    expect(outboxSql).toMatch(/Command Center project ONLY/);
    expect(outboxSql).toMatch(/Do not apply the unrelated wealth-engine/);
    expect(outboxSql).toMatch(/Do not rerun the CREATE TABLE/);
  });

  it("creates only its own table and drops nothing", () => {
    expect(outboxSql.match(/create table /g)).toEqual(["create table "]);
    expect(outboxSql).toMatch(/create table public\.website_delivery_outbox/);
    expect(outboxSql).not.toMatch(/\bdrop\s+(table|function|column|index)\b/i);
    expect(outboxSql).not.toMatch(/alter table public\.(leads|website_inquiries|activity_log)/i);
    // ALTER TABLE appears once, to enable row level security on the new table.
    expect(outboxSql.match(/alter table /g)).toEqual(["alter table "]);
  });

  it("keeps every new object out of reach of anon and authenticated", () => {
    for (const object of [
      "public.website_delivery_outbox",
      "function public.enqueue_website_deliveries(uuid, uuid, boolean, boolean)",
      "function public.mark_website_delivery(uuid, text, text, text)",
      "function public.capture_website_inquiry(text, jsonb)",
    ]) {
      expect(outboxSql, `${object} is not revoked from anon`).toContain(`revoke all on ${object}`);
    }
    expect(outboxSql).not.toMatch(/grant [^;]*to (anon|authenticated|public)/i);
  });

  it("has not let its copy of capture_website_inquiry drift from the deployed one", () => {
    // The outbox version replaces the deployed function, so it carries a full
    // copy of a body nobody reviewed again. Anything removed from it is a
    // regression in lead capture; anything added must be the outbox wiring.
    const deployed = body(ingressSql, "capture_website_inquiry");
    const replacement = body(outboxSql, "capture_website_inquiry");

    expect(missingFrom(deployed, replacement)).toEqual([
      "return jsonb_build_object('stored', true, 'duplicate', false, 'requires_review', v_review);",
    ]);
    expect(missingFrom(replacement, deployed)).toEqual(
      [
        "begin",
        "end;",
        "exception when others then",
        "raise warning 'website delivery outbox unavailable for inquiry %', v_inquiry_id;",
        "return jsonb_build_object('stored', true, 'duplicate', false, 'requires_review', v_review,",
        "'outbox', v_outbox);",
        "v_outbox := public.enqueue_website_deliveries(v_inquiry_id, v_id, v_review, v_permission);",
        "v_outbox jsonb := '{}'::jsonb;",
        "v_outbox := '{}'::jsonb;",
      ].sort(),
    );
  });
});

describe("capture", () => {
  const lines = body(outboxSql, "capture_website_inquiry");
  const duplicateReturn = lines.find((line) => line.includes("'duplicate', true"));

  it("returns no outbox for a duplicate", () => {
    // A resubmitted form must not be able to queue or re-send anything. The
    // duplicate branch returns before the enqueue and carries no ids.
    expect(duplicateReturn).toBeDefined();
    expect(duplicateReturn).not.toMatch(/outbox/);
    const duplicateAt = lines.indexOf(duplicateReturn as string);
    const enqueueAt = lines.findIndex((line) => line.includes("enqueue_website_deliveries"));
    expect(duplicateAt).toBeLessThan(enqueueAt);
  });

  it("returns an outbox for a new inquiry", () => {
    const newReturn = lines.find((line) => line.includes("'duplicate', false"));
    expect(newReturn).toBeDefined();
    expect(lines.join("\n")).toContain("'outbox', v_outbox");
  });

  it("enqueues only after the inquiry row exists, and never at the cost of it", () => {
    const insertAt = lines.findIndex((line) =>
      line.includes("insert into public.website_inquiries"),
    );
    const enqueueAt = lines.findIndex((line) => line.includes("enqueue_website_deliveries"));
    expect(insertAt).toBeGreaterThan(-1);
    expect(enqueueAt).toBeGreaterThan(insertAt);
    // The enqueue is wrapped, so an unavailable queue costs the ids and not the
    // lead: the inquiry, the activity entry and Christian's task still commit.
    expect(lines.slice(enqueueAt - 1, enqueueAt + 3).join("\n")).toMatch(
      /begin\n.*enqueue_website_deliveries.*\nexception when others then/,
    );
  });

  it("passes the review flag and the permission it recorded, not the caller's word", () => {
    expect(lines.join("\n")).toContain(
      "enqueue_website_deliveries(v_inquiry_id, v_id, v_review, v_permission)",
    );
  });
});

describe("enqueue_website_deliveries", () => {
  const lines = body(outboxSql, "enqueue_website_deliveries").join("\n");

  it("always owes an owner alert", () => {
    expect(lines).toContain("v_jobs text[] := array['owner_alert']");
  });

  it("adds a prospect reply only with review clear, permission on file, and no restriction", () => {
    expect(lines).toMatch(
      /if p_requires_review is not true\s*and p_email_consent is true\s*and coalesce\(v_restricted, true\) is not true then\s*v_jobs := v_jobs \|\| 'prospect_reply';/,
    );
  });

  it("treats an unreadable lead as restricted rather than as permitted", () => {
    // coalesce(v_restricted, true): a lead row that could not be read must not
    // fall through to sending.
    expect(lines).toContain("coalesce(v_restricted, true) is not true");
  });

  it("does not read `callable`, which is about phone calls and not email", () => {
    expect(lines).not.toMatch(/\bcallable\b/);
    expect(lines).toContain("coalesce(do_not_call, false) into v_restricted");
  });

  it("enqueues no meta_capi row", () => {
    // Nothing can report an outcome for it, so it would sit pending forever —
    // which is exactly what a retry worker claims as owed work.
    expect(lines).not.toMatch(/meta_capi/);
    expect(outboxSql).toMatch(/job in \('owner_alert', 'prospect_reply', 'meta_capi'\)/);
  });

  it("keeps one row per job per inquiry, so a replay finds the same rows", () => {
    expect(outboxSql).toContain("unique (inquiry_id, job)");
    expect(lines).toContain("on conflict (inquiry_id, job) do update");
  });
});

describe("mark_website_delivery", () => {
  const lines = body(outboxSql, "mark_website_delivery");
  const joined = lines.join("\n");

  it("refuses a status the queue owns or does not know", () => {
    expect(joined).toContain(
      "if p_status not in ('sent', 'failed_retryable', 'failed_permanent') then",
    );
    expect(joined).toMatch(/raise exception 'Invalid delivery status' using errcode = '22023'/);
  });

  it("treats sent as terminal, before any write", () => {
    const sentAt = lines.findIndex((line) => line.includes("if v_row.status = 'sent' then"));
    const updateAt = lines.findIndex((line) =>
      line.includes("update public.website_delivery_outbox"),
    );
    expect(sentAt).toBeGreaterThan(-1);
    expect(updateAt).toBeGreaterThan(sentAt);
    expect(lines[sentAt + 1]).toContain("'already_sent'");
  });

  it("locks the row it is about to change", () => {
    expect(joined).toContain("where id = p_outbox_id for update");
  });

  it("raises a task for a human when a promised reply fails for good", () => {
    expect(joined).toMatch(
      /if v_row\.job = 'prospect_reply' and p_status = 'failed_permanent' then/,
    );
    expect(joined).toContain("insert into public.lead_actions");
  });

  it("cannot send anything", () => {
    // The only writes are the outbox row and a task. No mail, no HTTP, no queue.
    expect(joined).not.toMatch(
      /\b(pg_net|net\.http|http_post|http_get|extensions\.http|smtp|resend|pg_notify|pgmq)\b/i,
    );
    expect(joined.match(/insert into public\.\w+/g)).toEqual(["insert into public.lead_actions"]);
  });

  it("keeps provider error text bounded", () => {
    expect(joined).toContain("left(p_error, 500)");
  });
});

describe("the contract the retry worker will be built against", () => {
  const contract = outboxSql.slice(outboxSql.indexOf("Contract for the retry worker"));

  it("is recorded in the file, not only in a report", () => {
    expect(contract.length).toBeGreaterThan(500);
  });

  it("names the claimable states and excludes the terminal ones", () => {
    expect(contract).toContain("status in ('pending', 'failed_retryable')");
    expect(contract).toMatch(/'sent' and 'failed_permanent' are terminal/);
    expect(contract).toMatch(/for update skip locked/);
  });

  it("tells the worker to report through the same function the website uses", () => {
    expect(contract).toContain("public.mark_website_delivery(");
  });

  it("records that no worker is built here", () => {
    expect(outboxSql).toMatch(/NOT built by this task/);
  });
});
