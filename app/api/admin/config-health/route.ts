import { resolveAdminUserId } from "@/app/lib/admin-auth";
import { evaluateConfigHealth } from "@/app/lib/config-health";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const adminUserId = await resolveAdminUserId(request);
  if (!adminUserId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const report = await evaluateConfigHealth();
  return Response.json(report, { status: 200 });
}
