import { Mail, Phone } from "lucide-react";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/common/json-ld";
import { PageHeader } from "@/components/common/page-header";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/contact/contact-form";
import { GithubIcon } from "@/components/common/brand-icons";
import { siteConfig } from "@/constants/site";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with the BetterOpenSource team — questions, partnerships, or tool suggestions.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-5xl container-px py-10 lg:py-14">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <PageHeader
        breadcrumbs={[{ name: "Home", href: "/" }, { name: "Contact" }]}
        title="Get in touch"
        description="Questions, partnerships, or a tool we should add? Drop us a line."
        className="mb-8"
      />

      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <Card className="p-6">
          <ContactForm />
        </Card>

        <div className="flex flex-col gap-4">
          <Card className="flex flex-col gap-3 p-6">
            <h2 className="font-heading font-semibold">Reach us directly</h2>
            <a
              href={`mailto:${siteConfig.author.email}`}
              className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Mail className="size-4" />
              </span>
              {siteConfig.author.email}
            </a>
            <a
              href={`tel:${siteConfig.author.phone}`}
              className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Phone className="size-4" />
              </span>
              {siteConfig.author.phoneDisplay}
            </a>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <GithubIcon className="size-4" />
              </span>
              github.com/jasminbhesaniya
            </a>
          </Card>
          <Card className="bg-muted/30 p-6 text-sm text-muted-foreground">
            Found a bug or want to suggest a tool? The{" "}
            <span className="font-medium text-foreground">feedback button</span>{" "}
            in the bottom-right corner opens a GitHub issue instantly.
          </Card>
        </div>
      </div>
    </div>
  );
}
