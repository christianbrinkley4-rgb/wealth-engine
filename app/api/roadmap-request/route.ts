import { getSupabaseAdmin } from "@/lib/supabase";
import { resolveAdminUserId } from "@/app/lib/admin-auth";

export const runtime = "nodejs";

export async function POST() {
  return Response.json(
    { error: "Deprecated endpoint. Use /api/capture for roadmap submission." },
    { status: 410 },
  );
}

export async function GET(request: Request) {
  const adminUserId = await resolveAdminUserId(request);
  if (!adminUserId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const supabase = getSupabaseAdmin();
    const { count, error } = await supabase
      .from("leads")
      .select("id", { count: "exact", head: true });
    if (error) throw error;
    return Response.json({ totalLeads: count ?? 0 }, { status: 200 });
  } catch {
    return Response.json({ error: "Unable to load lead summary." }, { status: 500 });
  }
}
