import { NextResponse } from "next/server";
import { createFeedbackIssue, FeedbackError } from "@/lib/github";
import type { FeedbackPayload, FeedbackType } from "@/types";

export const runtime = "nodejs";

const VALID_TYPES: FeedbackType[] = [
  "bug",
  "feature",
  "tool-suggestion",
  "general",
];

// Basic in-memory rate limit (best-effort; resets on cold start).
const hits = new Map<string, number[]>();
function isRateLimited(ip: string, limit = 5, windowMs = 60_000): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > limit;
}

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please slow down." },
      { status: 429 },
    );
  }

  let body: Partial<FeedbackPayload>;
  try {
    body = (await req.json()) as Partial<FeedbackPayload>;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const type = body.type;
  const message = (body.message ?? "").toString();
  const email = body.email?.toString().trim();
  const page = body.page?.toString();

  if (!type || !VALID_TYPES.includes(type)) {
    return NextResponse.json({ error: "Invalid feedback type." }, { status: 400 });
  }
  if (message.trim().length < 5) {
    return NextResponse.json({ error: "Message is too short." }, { status: 400 });
  }
  if (message.length > 5000) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
  }

  try {
    const issue = await createFeedbackIssue({
      type,
      message,
      email: email || undefined,
      page,
    });
    return NextResponse.json({ ok: true, url: issue.url, number: issue.number });
  } catch (e) {
    if (e instanceof FeedbackError) {
      return NextResponse.json({ error: e.message }, { status: e.status });
    }
    return NextResponse.json(
      { error: "Unexpected error. Please try again later." },
      { status: 500 },
    );
  }
}
