import { NextResponse } from "next/server";

export const runtime = "nodejs";

/**
 * Validation stub. Wire delivery (email, GitHub issue, CRM) here before
 * returning success.
 */
export async function POST(req: Request) {
  let body: { name?: string; email?: string; message?: string };
  try {
    body = (await req.json()) as {
      name?: string;
      email?: string;
      message?: string;
    };
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = (body.name ?? "").toString().trim();
  const email = (body.email ?? "").toString().trim();
  const message = (body.message ?? "").toString().trim();

  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }
  if (message.length < 5) {
    return NextResponse.json({ error: "Message is too short." }, { status: 400 });
  }

  // TODO: forward this message to your inbox or ticketing system.
  return NextResponse.json({ ok: true });
}
