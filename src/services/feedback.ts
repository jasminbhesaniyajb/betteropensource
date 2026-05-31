import type { FeedbackPayload } from "@/types";

export interface FeedbackResult {
  ok: boolean;
  url?: string;
  error?: string;
}

/** Client → /api/feedback (which files a GitHub Issue server-side). */
export async function submitFeedback(
  payload: FeedbackPayload,
): Promise<FeedbackResult> {
  try {
    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await res.json().catch(() => ({}))) as {
      url?: string;
      error?: string;
    };
    if (!res.ok) {
      return { ok: false, error: data.error ?? "Something went wrong." };
    }
    return { ok: true, url: data.url };
  } catch {
    return { ok: false, error: "Network error. Please try again." };
  }
}
