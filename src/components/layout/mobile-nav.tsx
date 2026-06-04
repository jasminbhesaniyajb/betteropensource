"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { Brand } from "@/components/common/brand";
import { Icon } from "@/components/common/icon";
import { mainNav, socialLinks } from "@/constants/navigation";
import { cn } from "@/lib/utils";

const secondaryLinks = [
  { title: "New Tools", href: "/new" },
  { title: "Submit an open-source tool", href: "/submit" },
  { title: "Bookmarks", href: "/bookmarks" },
  { title: "About", href: "/about" },
  { title: "Contact", href: "/contact" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open menu"
        className={cn(buttonVariants({ variant: "ghost", size: "icon" }), "md:hidden")}
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-80 p-0">
        <SheetHeader className="border-b p-4">
          <SheetTitle className="sr-only">Navigation menu</SheetTitle>
          <Brand />
        </SheetHeader>

        <div className="flex flex-col gap-6 overflow-y-auto p-4">
          <nav className="flex flex-col gap-1">
            {mainNav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>

          <div className="border-t pt-4">
            <nav className="flex flex-col gap-1">
              {secondaryLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-1 border-t pt-4">
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
        </div>
      </SheetContent>
    </Sheet>
  );
}
