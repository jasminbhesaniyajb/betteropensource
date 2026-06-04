import Link from "next/link";
import { Plus } from "lucide-react";
import { Brand } from "@/components/common/brand";
import { MainNav } from "@/components/layout/main-nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SearchTrigger } from "@/components/layout/search-trigger";
import { BookmarksLink } from "@/components/layout/bookmarks-link";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { GithubIcon } from "@/components/common/brand-icons";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/constants/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 container-px">
        <Brand />
        <div className="ml-2">
          <MainNav />
        </div>

        <div className="ml-auto flex items-center gap-1.5">
          <SearchTrigger className="hidden sm:flex" />
          <BookmarksLink />
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "hidden sm:inline-flex",
            )}
          >
            <GithubIcon className="size-4" />
          </a>
          <ThemeToggle />
          <Link
            href="/submit"
            aria-label="Submit an open-source tool"
            title="Submit an open-source tool"
            className={cn(
              buttonVariants({ size: "sm" }),
              "hidden gap-1.5 md:inline-flex",
            )}
          >
            <Plus className="size-4" />
            Submit a tool
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
