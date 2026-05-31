import { Quote } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/common/section-heading";
import { Reveal } from "@/components/common/reveal";
import { testimonials } from "@/data/testimonials";

export function CommunitySection() {
  return (
    <section className="mx-auto w-full max-w-7xl container-px py-16 sm:py-20">
      <SectionHeading
        align="center"
        eyebrow="Community"
        title="Loved by builders going open-source"
        description="Founders, engineers, and indie hackers use BetterOpenSource to choose tools with confidence."
      />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} className="h-full" delay={(i % 3) * 0.06}>
            <Card className="flex h-full flex-col gap-4 p-6">
              <Quote className="size-6 text-primary/40" />
              <p className="flex-1 text-sm leading-relaxed text-foreground/90">
                “{t.quote}”
              </p>
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-sky-400 text-sm font-semibold text-white">
                  {t.initials}
                </span>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
