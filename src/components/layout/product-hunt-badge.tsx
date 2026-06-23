import Image from "next/image";
import { siteConfig } from "@/constants/site";
import { cn } from "@/lib/utils";

const BADGE_WIDTH = 250;
const BADGE_HEIGHT = 54;
const ALT = `${siteConfig.name} - ${siteConfig.tagline} | Product Hunt`;

/** Product Hunt "Featured" embed badge URL for a given theme. */
function badgeSrc(theme: "light" | "dark"): string {
  return `https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=${siteConfig.productHunt.postId}&theme=${theme}`;
}

/**
 * Product Hunt "Featured" badge.
 *
 * Renders both the light and dark embed variants and toggles between them with
 * a pure-CSS `dark:` switch, so it stays a Server Component (no theme JS, no
 * hydration flash) and matches the surrounding footer in either color scheme.
 * `unoptimized` serves Product Hunt's SVG directly — it bypasses the Next image
 * optimizer (and its `remotePatterns` allowlist), keeping the badge live and
 * config-free while still setting width/height and avoiding a raw `<img>`.
 */
export function ProductHuntBadge({ className }: { className?: string }) {
  return (
    <a
      href={siteConfig.links.productHunt}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${siteConfig.name} on Product Hunt`}
      className={cn("inline-block w-fit", className)}
    >
      <Image
        src={badgeSrc("light")}
        alt={ALT}
        width={BADGE_WIDTH}
        height={BADGE_HEIGHT}
        unoptimized
        className="block dark:hidden"
      />
      <Image
        src={badgeSrc("dark")}
        alt={ALT}
        width={BADGE_WIDTH}
        height={BADGE_HEIGHT}
        unoptimized
        className="hidden dark:block"
      />
    </a>
  );
}
