import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  name: string;
  /**
   * Canonical path for this crumb, e.g. "/tools/penpot". Required so the
   * visible trail and the BreadcrumbList JSON-LD are built from one source and
   * can never drift (Google requires structured data to match visible content).
   */
  href: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.name}-${i}`} className="flex items-center gap-1.5">
              {isLast ? (
                <span className="text-foreground" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-foreground"
                >
                  {item.name}
                </Link>
              )}
              {!isLast ? (
                <ChevronRight className="size-3.5 shrink-0" aria-hidden />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
