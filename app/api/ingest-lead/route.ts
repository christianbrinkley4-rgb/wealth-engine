import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

const INGEST_API_KEY = process.env.CLAY_INGEST_API_KEY;

interface EnrichedLeadPayload {
  email: string;
  linkedInUrl?: string;
  estimatedNetWorth?: number;
  companyName?: string;
  title?: string;
  source?: string;
  extras?: Record<string, unknown>;
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function POST(request: Request) {
  try {
    if (INGEST_API_KEY) {
      const provided = request.headers.get("x-ingest-key");
      if (provided !== INGEST_API_KEY) {
        return Response.json({ error: "Unauthorized ingest key." }, { status: 401 });
      }
    }

    const body = (await request.json()) as Partial<EnrichedLeadPayload>;
    const email = normalizeEmail(body.email ?? "");
    if (!email) {
      return Response.json({ error: "email is required." }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { data: rows, error: selectError } = await supabase
      .from("leads")
      .select("id, payload")
      .eq("email", email)
      .order("created_at", { ascending: false })
      .limit(1);

    if (selectError) {
      throw new Error(selectError.message);
    }

    const enrichment = {
      linkedInUrl: body.linkedInUrl ?? null,
      estimatedNetWorth: body.estimatedNetWorth ?? null,
      companyName: body.companyName ?? null,
      title: body.title ?? null,
      source: body.source ?? "clay",
      extras: body.extras ?? {},
      enrichedAt: new Date().toISOString(),
    };

    if (!rows || rows.length === 0) {
      const basePayload = {
        profile: {
          email,
        },
        diagnostic: {
          funnel: "WEALTH",
        },
        enrichment,
      };
      const { error: insertError } = await supabase.from("leads").insert({
        email,
        full_name: null,
        age: 18,
        primary_zip_code: "00000",
        estimated_income: 0,
        calculated_tax_drag: 0,
        irmaa_risk_status: "low",
        funnel: "WEALTH",
        payload: basePayload,
        enriched_data: enrichment,
        master_dossier: {
          source: "ingest-only",
          profile: { email },
          enrichment,
        },
      });
      if (insertError) {
        throw new Error(insertError.message);
      }
      return Response.json({ ok: true, action: "created_new_profile" }, { status: 201 });
    }

    const existing = rows[0];
    const existingPayload =
      typeof existing.payload === "object" && existing.payload !== null
        ? (existing.payload as Record<string, unknown>)
        : {};

    const masterDossier = {
      ...existingPayload,
      enrichment: {
        ...(existingPayload.enrichment as Record<string, unknown> | undefined),
        ...enrichment,
      },
      updatedAt: new Date().toISOString(),
    };

    const { error: updateError } = await supabase
      .from("leads")
      .update({
        payload: masterDossier,
        enriched_data: enrichment,
        master_dossier: masterDossier,
      })
      .eq("id", existing.id);

    if (updateError) {
      throw new Error(updateError.message);
    }

    return Response.json({ ok: true, action: "merged_master_dossier" }, { status: 200 });
  } catch (error) {
    return Response.json(
      {
        error: error instanceof Error ? error.message : "Unable to ingest enriched lead.",
      },
      { status: 500 },
    );
  }
}
