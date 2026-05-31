import { ImageResponse } from "next/og";
import { siteConfig } from "@/constants/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;

export default function OpengraphImage() {
  const host = siteConfig.url.replace(/^https?:\/\//, "");

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 18% 18%, rgba(37,99,235,0.35), transparent 42%), radial-gradient(circle at 82% 0%, rgba(14,165,233,0.30), transparent 38%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              display: "flex",
              backgroundImage: "linear-gradient(135deg, #2563eb, #38bdf8)",
            }}
          />
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "#ffffff" }}>
            BetterOpenSource
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              fontSize: 66,
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.08,
              maxWidth: 940,
            }}
          >
            Discover the best open-source alternatives
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#94a3b8", maxWidth: 880 }}>
            Self-hostable replacements for the software you pay for.
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "#60a5fa" }}>{host}</div>
      </div>
    ),
    { ...size },
  );
}
