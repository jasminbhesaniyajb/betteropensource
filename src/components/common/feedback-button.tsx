"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Loader2, MessageSquarePlus, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitFeedback } from "@/services/feedback";
import type { FeedbackType } from "@/types";

const TYPES: { value: FeedbackType; label: string }[] = [
  { value: "general", label: "General feedback" },
  { value: "bug", label: "Report a bug" },
  { value: "feature", label: "Request a feature" },
  { value: "tool-suggestion", label: "Suggest a tool" },
];

export function FeedbackButton() {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<FeedbackType>("general");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (message.trim().length < 5) {
      toast.error("Please add a little more detail.");
      return;
    }
    setLoading(true);
    const res = await submitFeedback({
      type,
      message: message.trim(),
      email: email.trim() || undefined,
      page: pathname,
    });
    setLoading(false);
    if (res.ok) {
      toast.success("Thanks for your feedback!", {
        description: res.url
          ? "We opened an issue to track it."
          : "It's been received.",
      });
      setOpen(false);
      setMessage("");
      setEmail("");
      setType("general");
    } else {
      toast.error(res.error ?? "Couldn't send feedback.");
    }
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="fixed right-5 bottom-5 z-40 h-12 gap-2 rounded-full px-4 shadow-lg shadow-blue-500/25"
        aria-label="Send feedback"
      >
        <MessageSquarePlus className="size-4" />
        <span className="hidden sm:inline">Feedback</span>
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share your feedback</DialogTitle>
            <DialogDescription>
              Found a bug, want a feature, or know a tool we should add? It goes
              straight to our GitHub.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fb-type">Type</Label>
              <Select
                value={type}
                onValueChange={(v) => setType(v as FeedbackType)}
              >
                <SelectTrigger id="fb-type" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="fb-message">Message</Label>
              <Textarea
                id="fb-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell us what's on your mind…"
                rows={4}
                maxLength={1000}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="fb-email">Email (optional)</Label>
              <Input
                id="fb-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>

            <Button type="submit" disabled={loading} className="gap-2">
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Send className="size-4" />
              )}
              Send feedback
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
