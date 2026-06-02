"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion, type MotionProps } from "motion/react";
import { ArrowRight, Search, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { AnimatedBackground } from "@/components/common/animated-background";
import { formatStars } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { DirectoryStats } from "@/services/tools";

const POPULAR = [
  { name: "Figma", href: "/alternatives/figma" },
  { name: "Notion", href: "/alternatives/notion" },
  { name: "Slack", href: "/alternatives/slack" },
  { name: "Zapier", href: "/alternatives/zapier" },
  { name: "Airtable", href: "/alternatives/airtable" },
];

export function Hero({ stats }: { stats: DirectoryStats }) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [q, setQ] = useState("");

  function item(i: number): MotionProps {
    if (reduce) return {};
    return {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
    };
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(q.trim() ? `/tools?q=${encodeURIComponent(q.trim())}` : "/tools");
  }

  const statItems = [
    { value: `${stats.tools}+`, label: "Curated tools" },
    { value: `${formatStars(stats.totalStars)}+`, label: "GitHub stars" },
    { value: `${stats.categories}`, label: "Categories" },
  ];

  return (
    <section className="relative overflow-hidden border-b">
      <AnimatedBackground />
      <div className="mx-auto w-full max-w-4xl container-px text-center py-12">
        <motion.div
          {...item(0)}
          className="inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1 text-sm text-muted-foreground backdrop-blur"
        >
          <Sparkles className="size-3.5 text-primary" />
          {stats.tools}+ open-source tools, hand-reviewed
        </motion.div>

        <motion.h1
          {...item(1)}
          className="mt-6 font-heading text-4xl font-extrabold tracking-tight text-balance sm:text-6xl"
        >
          Discover the best <span className="text-gradient">open-source</span>{" "}
          alternatives
        </motion.h1>

        <motion.p
          {...item(2)}
          className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground text-pretty"
        >
          Replace pricey, proprietary software with self-hostable open-source
          tools. Compare features, licenses, and GitHub activity — and cut your
          recurring costs.
        </motion.p>

        <motion.form
          {...item(3)}
          onSubmit={onSubmit}
          role="search"
          className="mx-auto mt-6 flex max-w-xl items-center gap-2 rounded-xl border bg-background/80 p-2 pl-3 shadow-sm ring-1 ring-transparent backdrop-blur transition focus-within:ring-primary/40"
        >
          <Search className="size-5 shrink-0 text-muted-foreground" />
          <label htmlFor="hero-search" className="sr-only">
            Search alternatives
          </label>
          <input
            id="hero-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search Figma, Notion, Slack…"
            className="h-9 w-full min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            className={cn(buttonVariants(), "h-9 px-4")}
          >
            Search
          </button>
        </motion.form>

        <motion.div
          {...item(4)}
          className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm"
        >
          <span className="text-muted-foreground">Popular:</span>
          {POPULAR.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="rounded-full border bg-background/60 px-3 py-1 text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              {p.name}
            </Link>
          ))}
        </motion.div>

        <motion.div
          {...item(5)}
          className="mt-4 flex flex-wrap justify-center gap-3"
        >
          <Link
            href="/tools"
            className={cn(buttonVariants(), "h-11 gap-2 px-6 text-base")}
          >
            Explore all tools <ArrowRight className="size-4" />
          </Link>
          <Link
            href="/categories"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-11 px-6 text-base",
            )}
          >
            Browse categories
          </Link>
        </motion.div>

        <motion.dl
          {...item(6)}
          className="mx-auto mt-6 grid max-w-lg grid-cols-3 gap-4"
        >
          {statItems.map((s) => (
            <div key={s.label} className="flex flex-col">
              <dt className="order-2 text-sm text-muted-foreground">
                {s.label}
              </dt>
              <dd className="order-1 font-heading text-2xl font-bold sm:text-3xl">
                {s.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
