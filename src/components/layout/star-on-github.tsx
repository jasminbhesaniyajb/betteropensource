"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { GithubIcon } from "@/components/common/brand-icons";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/constants/site";
import { cn } from "@/lib/utils";

/** owner/repo the directory itself lives in (reuses the feedback-repo config). */
const REPO = siteConfig.feedbackRepo;
const CACHE_KEY = "bos:gh-stars";
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

function formatStars(n: number): string {
  if (n >= 10_000) return `${Math.round(n / 1000)}k`;
  if (n >= 1_000) return `${(n / 1000).toFixed(1)}k`;
  return `${n}`;
}

function readCachedStars(): number | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { stars, at } = JSON.parse(raw) as { stars: number; at: number };
    return Date.now() - at > CACHE_TTL ? null : stars;
  } catch {
    return null;
  }
}

/**
 * "Star on GitHub" CTA with a live stargazer count.
 *
 * Fetches the count client-side (after mount) so the surrounding pages stay
 * statically generated — a server fetch in the global layout would otherwise
 * force every page to render dynamically. The count is cached per session and
 * the button degrades to a plain "Star" link if the API is unreachable, so it
 * always works without JS or network.
 */
export function StarOnGithub({ className }: { className?: string }) {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    let active = true;

    async function loadStars() {
      const cached = readCachedStars();
      if (cached != null) {
        if (active) setStars(cached);
        return;
      }

      try {
        const res = await fetch(`https://api.github.com/repos/${REPO}`, {
          headers: { Accept: "application/vnd.github+json" },
        });
        if (!res.ok) return;
        const data = (await res.json()) as { stargazers_count?: number };
        const count = data.stargazers_count;
        if (!active || typeof count !== "number") return;
        setStars(count);
        try {
          sessionStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ stars: count, at: Date.now() }),
          );
        } catch {
          /* sessionStorage unavailable — count still renders this session */
        }
      } catch {
        /* offline / rate-limited — fall back to the plain CTA */
      }
    }

    loadStars();
    return () => {
      active = false;
    };
  }, []);

  return (
    <a
      href={siteConfig.links.github}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Star ${siteConfig.name} on GitHub`}
      className={cn(
        buttonVariants({ variant: "outline", size: "sm" }),
        "gap-1.5",
        className,
      )}
    >
      <GithubIcon className="size-4" />
      <span>Star</span>
      {stars != null && (
        <span className="flex items-center gap-1 border-l border-border/60 pl-1.5 tabular-nums text-muted-foreground">
          <Star className="size-3 fill-amber-400 text-amber-400" />
          {formatStars(stars)}
        </span>
      )}
    </a>
  );
}
