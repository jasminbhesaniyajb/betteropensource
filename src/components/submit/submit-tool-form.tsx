"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
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
import { categories } from "@/constants/categories";
import { submitFeedback } from "@/services/feedback";

export function SubmitToolForm() {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [repo, setRepo] = useState("");
  const [categorySlug, setCategorySlug] = useState("");
  const [replaces, setReplaces] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return toast.error("Please enter the tool name.");
    if (!repo.trim() && !website.trim())
      return toast.error("Add a website or a repository link.");
    if (description.trim().length < 10)
      return toast.error("Please add a short description (10+ characters).");

    const categoryName =
      categories.find((c) => c.slug === categorySlug)?.name ?? "Uncategorized";
    const message = [
      `**Tool:** ${name.trim()}`,
      `**Website:** ${website.trim() || "—"}`,
      `**Repository:** ${repo.trim() || "—"}`,
      `**Category:** ${categoryName}`,
      `**Alternative to:** ${replaces.trim() || "—"}`,
      "",
      description.trim(),
    ].join("\n");

    setLoading(true);
    const res = await submitFeedback({
      type: "tool-suggestion",
      message,
      email: email.trim() || undefined,
      page: "/submit",
    });
    setLoading(false);

    if (res.ok) {
      toast.success("Thanks for the suggestion!", {
        description: res.url
          ? "We opened an issue to review it."
          : "We'll review it soon.",
      });
      setName("");
      setWebsite("");
      setRepo("");
      setCategorySlug("");
      setReplaces("");
      setDescription("");
      setEmail("");
    } else {
      toast.error(res.error ?? "Couldn't submit. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <div className="grid gap-2">
        <Label htmlFor="s-name">Tool name</Label>
        <Input
          id="s-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Penpot"
          required
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="s-website">Website</Label>
          <Input
            id="s-website"
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://…"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="s-repo">Repository</Label>
          <Input
            id="s-repo"
            type="url"
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
            placeholder="https://github.com/…"
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="s-category">Category</Label>
          <Select
            value={categorySlug}
            onValueChange={(v) => setCategorySlug(v ?? "")}
          >
            <SelectTrigger id="s-category" className="w-full">
              <SelectValue placeholder="Choose a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c.slug} value={c.slug}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="s-replaces">Alternative to</Label>
          <Input
            id="s-replaces"
            value={replaces}
            onChange={(e) => setReplaces(e.target.value)}
            placeholder="e.g. Figma"
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="s-description">What does it do?</Label>
        <Textarea
          id="s-description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="A short description, license, and what makes it a good open-source option."
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="s-email">Your email (optional)</Label>
        <Input
          id="s-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </div>
      <Button type="submit" disabled={loading} className="w-fit gap-2">
        {loading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Send className="size-4" />
        )}
        Submit tool
      </Button>
    </form>
  );
}
