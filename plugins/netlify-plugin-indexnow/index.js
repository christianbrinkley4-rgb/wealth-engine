import { spawnSync } from "node:child_process";

/**
 * Notify IndexNow after a production deploy is live. Failures are logged and
 * do not fail the deploy — crawl notice is not a publish blocker.
 */
export const onSuccess = async function onSuccess() {
  if (process.env.CONTEXT && process.env.CONTEXT !== "production") {
    console.log(`IndexNow skipped (${process.env.CONTEXT})`);
    return;
  }

  try {
    const result = spawnSync(process.execPath, ["scripts/submit-indexnow.mjs"], {
      encoding: "utf8",
      stdio: "inherit",
      timeout: 45_000,
      killSignal: "SIGKILL",
    });

    if (result.status !== 0) {
      console.warn("IndexNow notify failed; the deploy is still live.");
    }
  } catch (error) {
    console.warn("IndexNow notify failed; the deploy is still live.", error);
  }
};
