import { siteConfig } from "@/constants/site";
import type { FeedbackPayload, FeedbackType } from "@/types";

const LABELS: Record<FeedbackType, string> = {
  bug: "bug",
  feature: "enhancement",
  "tool-suggestion": "tool-suggestion",
  general: "feedback",
};

const TITLE_PREFIX: Record<FeedbackType, string> = {
  bug: "Bug",
  feature: "Feature request",
  "tool-suggestion": "Tool suggestion",
  general: "Feedback",
};

export class FeedbackError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "FeedbackError";
    this.status = status;
  }
}

function truncate(value: string, max: number): string {
  return value.length > max ? `${value.slice(0, max)}…` : value;
}

/**
 * Files feedback as a GitHub Issue using a server-side token.
 * Throws FeedbackError (with an HTTP status) on any failure.
 */
export async function createFeedbackIssue(
  payload: FeedbackPayload,
): Promise<{ url: string; number: number }> {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_FEEDBACK_REPO ?? siteConfig.feedbackRepo;

  if (!token) {
    throw new FeedbackError(
      "Feedback isn't configured on this server yet. Please open an issue on GitHub directly.",
      503,
    );
  }
  if (!/^[\w.-]+\/[\w.-]+$/.test(repo)) {
    throw new FeedbackError("The feedback repository is misconfigured.", 500);
  }

  const summary = truncate(payload.message.replace(/\s+/g, " ").trim(), 60);
  const title = `[${TITLE_PREFIX[payload.type]}] ${summary || "New feedback"}`;

  const body = [
    payload.message.trim(),
    "",
    "---",
    `**Type:** ${payload.type}`,
    payload.email ? `**From:** ${payload.email}` : "**From:** anonymous",
    payload.page ? `**Page:** ${payload.page}` : null,
    `**Source:** ${siteConfig.name} feedback widget`,
  ]
    .filter(Boolean)
    .join("\n");

  const res = await fetch(`https://api.github.com/repos/${repo}/issues`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      body,
      labels: [LABELS[payload.type]],
    }),
  });

  if (!res.ok) {
    const status = res.status === 401 || res.status === 403 ? 502 : res.status;
    throw new FeedbackError(
      `GitHub rejected the request (${res.status}). Please try again later.`,
      status,
    );
  }

  const data = (await res.json()) as { html_url: string; number: number };
  return { url: data.html_url, number: data.number };
}
