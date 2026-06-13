import { Check, Scale, Activity, Server, Target } from "lucide-react";
import { getStats } from "@/services/tools";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/common/json-ld";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { formatStars } from "@/lib/format";
import { siteConfig } from "@/constants/site";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Why BetterOpenSource exists and how we evaluate every open-source tool in the directory.",
  path: "/about",
});

const criteria = [
  {
    icon: Scale,
    title: "License clarity",
    body: "We label each project honestly — permissive (MIT, Apache), copyleft (GPL, AGPL), or source-available (BSL, SSPL). It matters for how you can use it.",
  },
  {
    icon: Activity,
    title: "Project health",
    body: "Recent commits, contributor count, and release cadence. A stale project is a risk, not a recommendation.",
  },
  {
    icon: Server,
    title: "Self-hostability",
    body: "Can you actually run it yourself, and how hard is it? We note the realistic setup effort.",
  },
  {
    icon: Target,
    title: "Real-world fit",
    body: "What proprietary tool it credibly replaces — and, just as importantly, where it falls short.",
  },
];

export default function AboutPage() {
  const stats = getStats();
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
  ];

  return (
    <div className="mx-auto w-full max-w-4xl container-px py-10 lg:py-14">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <PageHeader
        breadcrumbs={crumbs}
        title="Open source, made easy to choose"
        description="BetterOpenSource is a curated directory that helps you replace expensive, proprietary software with open-source tools you can trust, host, and own."
        className="mb-10"
      />

      <div className="grid grid-cols-3 gap-4">
        {[
          { value: `${stats.tools}+`, label: "Curated tools" },
          { value: `${stats.alternatives}+`, label: "Apps replaced" },
          { value: `${formatStars(stats.totalStars)}+`, label: "GitHub stars" },
        ].map((s) => (
          <Card key={s.label} className="p-5 text-center">
            <p className="font-heading text-2xl font-bold sm:text-3xl">
              {s.value}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
          </Card>
        ))}
      </div>

      <section className="mt-12 space-y-4">
        <h2 className="font-heading text-2xl font-bold tracking-tight">
          Why we built it
        </h2>
        <p className="leading-relaxed text-muted-foreground">
          Software subscriptions add up fast, and per-seat pricing punishes
          growth. Meanwhile, the open-source ecosystem has matured to the point
          where there&apos;s a credible, self-hostable alternative to almost
          every popular SaaS tool — but they&apos;re scattered across GitHub and
          hard to compare. BetterOpenSource brings them together, reviewed
          against a consistent checklist, so you can choose with confidence.
        </p>
      </section>

      <section className="mt-12 space-y-5">
        <h2 className="font-heading text-2xl font-bold tracking-tight">
          How we evaluate tools
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {criteria.map((c) => (
            <Card key={c.title} className="flex flex-col gap-2 p-5">
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <c.icon className="size-4.5" />
              </span>
              <h3 className="font-heading font-semibold">{c.title}</h3>
              <p className="text-sm text-muted-foreground">{c.body}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-12 space-y-4">
        <h2 className="font-heading text-2xl font-bold tracking-tight">
          What we don&apos;t do
        </h2>
        <ul className="space-y-2.5">
          {[
            "We don't rank by who pays us — listings aren't sponsored.",
            "We don't hide license caveats to make a tool look friendlier.",
            "We don't pretend self-hosting is free of maintenance.",
          ].map((item) => (
            <li key={item} className="flex gap-2.5 text-muted-foreground">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 rounded-xl border bg-muted/30 p-6">
        <h2 className="font-heading text-lg font-semibold">
          Built by {siteConfig.author.name}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          BetterOpenSource is an independent project. Spotted something out of
          date or missing? Use the feedback button in the corner — it opens an
          issue on our GitHub directly, and community corrections keep the
          directory honest.
        </p>
      </section>
    </div>
  );
}
