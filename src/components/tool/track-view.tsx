"use client";

import { useEffect } from "react";
import { useRecentlyViewed } from "@/hooks/use-recently-viewed";

/** Records a tool in "recently viewed" on mount. Renders nothing. */
export function TrackView({ slug }: { slug: string }) {
  const { add } = useRecentlyViewed();
  useEffect(() => {
    add(slug);
  }, [slug, add]);
  return null;
}
