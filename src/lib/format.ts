import type { LicenseId, Pricing } from "@/types";

export function formatCompact(n: number): string {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(n);
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en").format(n);
}

/** GitHub-stars style: 1.2k, 12k, 1.2M. */
export const formatStars = formatCompact;

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatMonthYear(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
}

const LICENSE_INFO: Record<
  LicenseId,
  { label: string; permissive: boolean }
> = {
  MIT: { label: "MIT", permissive: true },
  "Apache-2.0": { label: "Apache 2.0", permissive: true },
  "BSD-3-Clause": { label: "BSD 3-Clause", permissive: true },
  "MPL-2.0": { label: "MPL 2.0", permissive: true },
  "LGPL-3.0": { label: "LGPL 3.0", permissive: false },
  "GPL-3.0": { label: "GPL 3.0", permissive: false },
  "GPL-2.0": { label: "GPL 2.0", permissive: false },
  "AGPL-3.0": { label: "AGPL 3.0", permissive: false },
  "EUPL-1.2": { label: "EUPL 1.2", permissive: false },
  "BSL-1.1": { label: "BSL 1.1", permissive: false },
  SSPL: { label: "SSPL", permissive: false },
  "Elastic-2.0": { label: "Elastic 2.0", permissive: false },
  Other: { label: "Source Available", permissive: false },
};

export function licenseLabel(id: LicenseId): string {
  return LICENSE_INFO[id]?.label ?? id;
}

export function isPermissiveLicense(id: LicenseId): boolean {
  return LICENSE_INFO[id]?.permissive ?? false;
}

const PRICING_LABEL: Record<Pricing, string> = {
  "open-source": "Free & Open Source",
  freemium: "Freemium",
  free: "Free",
};

export function pricingLabel(p: Pricing): string {
  return PRICING_LABEL[p];
}

/** Extracts "owner/repo" from a GitHub URL, or null. */
export function repoSlugFromUrl(url: string): string | null {
  const m = url.match(/github\.com\/([^/]+\/[^/]+?)(?:\.git|\/|$)/i);
  return m ? m[1] : null;
}

/** Human label for a URL's host, e.g. "penpot.app". */
export function hostFromUrl(url: string): string {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}
