export interface ServiceResult {
  ok: boolean;
  error?: string;
}

/** Client → /api/newsletter (validation stub; wire a provider later). */
export async function subscribeNewsletter(email: string): Promise<ServiceResult> {
  try {
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) return { ok: false, error: data.error ?? "Subscription failed." };
    return { ok: true };
  } catch {
    return { ok: false, error: "Network error. Please try again." };
  }
}
