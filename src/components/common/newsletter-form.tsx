"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { subscribeNewsletter } from "@/services/newsletter";
import { cn } from "@/lib/utils";

export function NewsletterForm({ className }: { className?: string }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    const res = await subscribeNewsletter(email);
    setLoading(false);
    if (res.ok) {
      toast.success("You're subscribed!", {
        description: "We'll send the best new open-source tools, no spam.",
      });
      setEmail("");
    } else {
      toast.error(res.error ?? "Subscription failed.");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn("flex w-full max-w-md flex-col gap-2 sm:flex-row", className)}
    >
      <Input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        aria-label="Email address"
        className="h-10 flex-1"
      />
      <Button type="submit" size="lg" disabled={loading} className="gap-2">
        {loading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Send className="size-4" />
        )}
        Subscribe
      </Button>
    </form>
  );
}
