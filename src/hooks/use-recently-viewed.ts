"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./use-local-storage";

const KEY = "bos:recently-viewed";
const MAX = 12;

export function useRecentlyViewed() {
  const [recent, setRecent, hydrated] = useLocalStorage<string[]>(KEY, []);

  const add = useCallback(
    (slug: string) =>
      setRecent((prev) => [slug, ...prev.filter((s) => s !== slug)].slice(0, MAX)),
    [setRecent],
  );

  const clear = useCallback(() => setRecent([]), [setRecent]);

  return { recent, add, clear, hydrated };
}
