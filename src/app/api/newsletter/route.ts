import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Validation stub. Wire a provider (e.g. Resend, Buttondown, ConvertKit) here
 * by calling its API before returning success.
 */
export async function POST(req: Request) {
  let body: { email?: string };
  try {
    body = (await req.json()) as { email?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = (body.email ?? "").toString().trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  // TODO: forward `email` to your newsletter provider.
  return NextResponse.json({ ok: true });
}
