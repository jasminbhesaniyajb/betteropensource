import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/common/reveal";

export function CtaSection() {
  return (
    <section className="mx-auto w-full max-w-7xl container-px py-16 sm:py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-blue-600 to-sky-500 px-6 py-14 text-center text-white sm:px-12">
          <div className="bg-grid absolute inset-0 opacity-20" aria-hidden="true" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl">
              Ready to ditch the subscriptions?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/85">
              Browse self-hostable open-source alternatives, compare them side by
              side, and take back control of your stack — and your budget.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/alternatives"
                className="inline-flex h-11 items-center gap-2 rounded-lg bg-white px-6 text-base font-medium text-blue-700 transition hover:bg-white/90"
              >
                Find an alternative <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/categories"
                className="inline-flex h-11 items-center rounded-lg border border-white/40 px-6 text-base font-medium text-white transition hover:bg-white/10"
              >
                Explore categories
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
