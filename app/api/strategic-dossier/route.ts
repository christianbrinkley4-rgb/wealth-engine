import { renderToBuffer } from "@react-pdf/renderer";
import createStrategicDossierDocument from "@/app/lib/StrategicDossierDocument";
import { StrategicDossierPayload } from "@/app/lib/dossier";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as StrategicDossierPayload;

    const pdfBuffer = await renderToBuffer(createStrategicDossierDocument(payload));

    return new Response(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="strategic-financial-dossier.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return Response.json(
      { error: "Unable to generate strategic dossier at this time." },
      { status: 500 },
    );
  }
}
