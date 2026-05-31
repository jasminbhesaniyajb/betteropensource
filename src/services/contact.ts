export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ServiceResult {
  ok: boolean;
  error?: string;
}

/** Client → /api/contact (validation stub; wire delivery later). */
export async function submitContact(
  payload: ContactPayload,
): Promise<ServiceResult> {
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await res.json().catch(() => ({}))) as { error?: string };
    if (!res.ok) return { ok: false, error: data.error ?? "Couldn't send your message." };
    return { ok: true };
  } catch {
    return { ok: false, error: "Network error. Please try again." };
  }
}
