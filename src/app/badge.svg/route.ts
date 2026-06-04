export const dynamic = "force-static";

const FONT =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

const SVG = `<svg width="220" height="48" viewBox="0 0 220 48" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Featured on BetterOpenSource">
  <defs>
    <linearGradient id="g" x1="12" y1="10" x2="40" y2="38" gradientUnits="userSpaceOnUse">
      <stop stop-color="#2563eb"/>
      <stop offset="1" stop-color="#38bdf8"/>
    </linearGradient>
  </defs>
  <rect width="220" height="48" rx="10" fill="#0a0a0a"/>
  <rect x="0.5" y="0.5" width="219" height="47" rx="9.5" stroke="#ffffff" stroke-opacity="0.14"/>
  <rect x="12" y="10" width="28" height="28" rx="8" fill="url(#g)"/>
  <path d="M26 15.5l1.9 5.6 5.6 1.9-5.6 1.9L26 30.5l-1.9-5.6-5.6-1.9 5.6-1.9z" fill="#ffffff"/>
  <text x="52" y="21" font-family="${FONT}" font-size="9" letter-spacing="1.6" fill="#94a3b8">FEATURED ON</text>
  <text x="52" y="37" font-family="${FONT}" font-size="16" font-weight="700" fill="#ffffff">Better<tspan fill="#60a5fa">OpenSource</tspan></text>
</svg>`;

export function GET() {
  return new Response(SVG, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}
