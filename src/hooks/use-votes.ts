"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./use-local-storage";

const KEY = "bos:votes";

/**
 * Client-side upvotes. The displayed count is a tool's seed `rating.votes`
 * plus 1 when the current visitor has upvoted it.
 */
export function useVotes() {
  const [voted, setVoted, hydrated] = useLocalStorage<string[]>(KEY, []);

  const hasVoted = useCallback(
    (slug: string) => voted.includes(slug),
    [voted],
  );

  const toggle = useCallback(
    (slug: string) =>
      setVoted((prev) =>
        prev.includes(slug) ? prev.filter((s) => s !== slug) : [slug, ...prev],
      ),
    [setVoted],
  );

  return { voted, hasVoted, toggle, hydrated };
}
