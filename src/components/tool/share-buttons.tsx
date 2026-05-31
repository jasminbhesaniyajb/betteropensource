"use client";

import { useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  function currentUrl() {
    return typeof window !== "undefined" ? window.location.href : "";
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(currentUrl());
      setCopied(true);
      toast.success("Link copied");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Couldn't copy link");
    }
  }

  async function share() {
    const url = currentUrl();
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title, url });
      } catch {
        /* user cancelled */
      }
    } else {
      await copy();
    }
  }

  return (
    <div className="flex gap-2">
      <Button variant="outline" className="flex-1 gap-2" onClick={share}>
        <Share2 className="size-4" />
        Share
      </Button>
      <Button
        variant="outline"
        size="icon"
        aria-label="Copy link"
        onClick={copy}
      >
        {copied ? (
          <Check className="size-4 text-emerald-500" />
        ) : (
          <Link2 className="size-4" />
        )}
      </Button>
    </div>
  );
}
