export const runtime = "nodejs";

const PLAID_CLIENT_ID = process.env.PLAID_CLIENT_ID;
const PLAID_SECRET = process.env.PLAID_SECRET;
const PLAID_ENV = process.env.PLAID_ENV ?? "sandbox";

function plaidBaseUrl() {
  if (PLAID_ENV === "production") return "https://production.plaid.com";
  if (PLAID_ENV === "development") return "https://development.plaid.com";
  return "https://sandbox.plaid.com";
}

export async function POST() {
  try {
    if (!PLAID_CLIENT_ID || !PLAID_SECRET) {
      return Response.json(
        { error: "PLAID_CLIENT_ID and PLAID_SECRET must be configured." },
        { status: 500 },
      );
    }

    const payload = {
      client_name: "Triad Strategic Review",
      language: "en",
      country_codes: ["US"],
      user: {
        client_user_id: `wealth-engine-${Date.now()}`,
      },
      products: ["transactions"],
      redirect_uri: undefined,
    };

    const response = await fetch(`${plaidBaseUrl()}/link/token/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "PLAID-CLIENT-ID": PLAID_CLIENT_ID,
        "PLAID-SECRET": PLAID_SECRET,
        "Plaid-Version": "2020-09-14",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) {
      return Response.json(
        { error: "Plaid token creation failed.", details: data },
        { status: 502 },
      );
    }

    return Response.json({ link_token: data.link_token }, { status: 200 });
  } catch {
    return Response.json({ error: "Unable to create Plaid link token." }, { status: 500 });
  }
}
