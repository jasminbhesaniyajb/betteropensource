import Image from "next/image";
import { Card } from "@/components/ui/card";
import { CopyButton } from "@/components/tool/copy-button";
import { siteConfig } from "@/constants/site";

function Snippet({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        <CopyButton value={value} label={`Copy ${label}`} />
      </div>
      <code className="block overflow-x-auto rounded-md border bg-muted/50 p-2 text-[11px] leading-relaxed break-all whitespace-pre-wrap">
        {value}
      </code>
    </div>
  );
}

export function BadgeEmbed({ slug }: { slug: string }) {
  const toolUrl = `${siteConfig.url}/tools/${slug}`;
  const badgeUrl = `${siteConfig.url}/badge.svg`;
  const html = `<a href="${toolUrl}" target="_blank" rel="noopener"><img src="${badgeUrl}" alt="Featured on BetterOpenSource" width="220" height="48" /></a>`;
  const md = `[![Featured on BetterOpenSource](${badgeUrl})](${toolUrl})`;

  return (
    <Card className="flex flex-col gap-3 p-5">
      <div>
        <h2 className="font-heading font-semibold">Maintain this tool?</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Add a badge to your README or website.
        </p>
      </div>
      <Image
        src="/badge.svg"
        alt="Featured on BetterOpenSource"
        width={220}
        height={48}
        unoptimized
      />
      <div className="flex flex-col gap-3">
        <Snippet label="HTML" value={html} />
        <Snippet label="Markdown" value={md} />
      </div>
    </Card>
  );
}
