"use client";

import { ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useVotes } from "@/hooks/use-votes";
import { formatNumber } from "@/lib/format";
import { cn } from "@/lib/utils";

export function VoteWidget({
  slug,
  baseVotes,
}: {
  slug: string;
  baseVotes: number;
}) {
  const { hasVoted, toggle, hydrated } = useVotes();
  const voted = hydrated && hasVoted(slug);
  const count = baseVotes + (voted ? 1 : 0);

  return (
    <Button
      variant={voted ? "default" : "outline"}
      onClick={() => toggle(slug)}
      className="w-full justify-center gap-2"
    >
      <ThumbsUp className={cn("size-4", voted && "fill-current")} />
      {voted ? "Upvoted" : "Upvote"} · {formatNumber(count)}
    </Button>
  );
}
