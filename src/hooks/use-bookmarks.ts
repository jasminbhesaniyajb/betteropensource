"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./use-local-storage";

const KEY = "bos:bookmarks";

export function useBookmarks() {
  const [bookmarks, setBookmarks, hydrated] = useLocalStorage<string[]>(KEY, []);

  const isBookmarked = useCallback(
    (slug: string) => bookmarks.includes(slug),
    [bookmarks],
  );

  const toggle = useCallback(
    (slug: string) =>
      setBookmarks((prev) =>
        prev.includes(slug)
          ? prev.filter((s) => s !== slug)
          : [slug, ...prev],
      ),
    [setBookmarks],
  );

  const clear = useCallback(() => setBookmarks([]), [setBookmarks]);

  return { bookmarks, isBookmarked, toggle, clear, hydrated };
}
