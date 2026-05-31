import { Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/common/reveal";
import { NewsletterForm } from "@/components/common/newsletter-form";

export function NewsletterSection() {
  return (
    <section className="border-t bg-muted/30">
      <div className="mx-auto w-full max-w-7xl container-px py-16 sm:py-20">
        <Reveal>
          <Card className="mx-auto flex max-w-3xl flex-col items-center gap-5 p-8 text-center sm:p-12">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Mail className="size-6" />
            </span>
            <div className="space-y-2">
              <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                The best new open-source tools, monthly
              </h2>
              <p className="mx-auto max-w-xl text-muted-foreground">
                Join the newsletter for fresh alternatives, migration guides, and
                deep dives. No spam, unsubscribe anytime.
              </p>
            </div>
            <NewsletterForm className="justify-center" />
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
