import Link from "next/link";
import { Globe, Mail, Phone } from "lucide-react";
import { Brand } from "@/components/common/brand";
import { Icon } from "@/components/common/icon";
import { NewsletterForm } from "@/components/common/newsletter-form";
import { StarOnGithub } from "@/components/layout/star-on-github";
import { footerNav, socialLinks } from "@/constants/navigation";
import {
  getCategoriesWithCounts,
  getProprietaryWithCounts,
} from "@/services/tools";
import { siteConfig } from "@/constants/site";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const popularAlternatives = getProprietaryWithCounts().slice(0, 8);
  const popularCategories = [...getCategoriesWithCounts()]
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto w-full max-w-7xl container-px py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_2fr]">
          {/* Brand + newsletter */}
          <div className="flex flex-col gap-5">
            <Brand />
            <p className="max-w-sm text-sm text-muted-foreground">
              {siteConfig.description}
            </p>
            {/* <div className="space-y-2">
              <p className="text-sm font-medium">Get the best new tools, monthly</p>
              <NewsletterForm />
            </div> */}
            <div className="flex items-center gap-1">
              {socialLinks.map((social) => (
                <a
                  key={social.title}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.title}
                  className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
                >
                  <Icon name={social.icon} className="size-4" />
                </a>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Found this useful? Star the project on GitHub — it helps more
              developers discover open-source alternatives.
            </p>
            <StarOnGithub className="w-fit" />
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerNav.map((group) => (
              <div key={group.title} className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold">{group.title}</h3>
                <ul className="flex flex-col gap-2.5">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Popular hubs — site-wide internal links for crawl + link equity */}
        <div className="mt-10 grid gap-8 border-t pt-8 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold">Popular alternatives</h3>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              {popularAlternatives.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/alternatives/${p.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {p.name} alternatives
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Popular categories</h3>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2">
              {popularCategories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/categories/${c.slug}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Author / contact */}
        <div className="mt-12 grid gap-4 rounded-xl border bg-background/60 p-5 sm:grid-cols-2 sm:items-center">
          <div>
            <p className="text-sm text-muted-foreground">Built and maintained by</p>
            <p className="font-heading text-lg font-semibold">
              {siteConfig.author.name}
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:items-end">
            <a
              href={siteConfig.links.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Globe className="size-4" />
              Portfolio
            </a>
            <a
              href={`tel:${siteConfig.author.phone}`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Phone className="size-4" />
              {siteConfig.author.phoneDisplay}
            </a>
            <a
              href={`mailto:${siteConfig.author.email}`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="size-4" />
              {siteConfig.author.email}
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>
            © {year} {siteConfig.name}. Curated open-source discovery.
          </p>
          <p>
            Made with care for the open-source community.
          </p>
        </div>
      </div>
    </footer>
  );
}
