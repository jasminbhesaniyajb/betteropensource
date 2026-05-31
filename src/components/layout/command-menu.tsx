"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { ArrowUpRight, Monitor, Moon, Sun } from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { mainNav } from "@/constants/navigation";
import { searchAll, type SearchItem } from "@/lib/search";
import { Logo } from "@/components/common/logo";
import { Icon } from "@/components/common/icon";

const TYPE_LABEL: Record<SearchItem["type"], string> = {
  tool: "Tools",
  category: "Categories",
  alternative: "Alternatives",
};

/** Imperatively open the command menu from anywhere on the client. */
export function openCommandMenu() {
  window.dispatchEvent(new Event("bos:open-command"));
}

export function CommandMenu() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { setTheme } = useTheme();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    }
    function onOpen() {
      setOpen(true);
    }
    document.addEventListener("keydown", onKey);
    window.addEventListener("bos:open-command", onOpen);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("bos:open-command", onOpen);
    };
  }, []);

  const results = useMemo(() => searchAll(query, 18), [query]);
  const groups = useMemo(() => {
    const g: Record<SearchItem["type"], SearchItem[]> = {
      tool: [],
      category: [],
      alternative: [],
    };
    for (const r of results) g[r.type].push(r);
    return g;
  }, [results]);

  const go = useCallback(
    (href: string) => {
      setOpen(false);
      setQuery("");
      router.push(href);
    },
    [router],
  );

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      className="sm:max-w-xl"
    >
      <Command shouldFilter={false}>
        <CommandInput
          value={query}
          onValueChange={setQuery}
          placeholder="Search tools, categories, alternatives…"
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {query.trim() === "" ? (
            <CommandGroup heading="Navigate">
              {mainNav.map((item) => (
                <CommandItem
                  key={item.href}
                  value={`nav-${item.title}`}
                  onSelect={() => go(item.href)}
                >
                  <ArrowUpRight className="text-muted-foreground" />
                  <span>{item.title}</span>
                  <span className="ml-2 truncate text-xs text-muted-foreground">
                    {item.description}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          ) : null}

          {(["tool", "category", "alternative"] as const).map((type) =>
            groups[type].length ? (
              <CommandGroup key={type} heading={TYPE_LABEL[type]}>
                {groups[type].map((item) => (
                  <CommandItem
                    key={item.href}
                    value={item.href}
                    onSelect={() => go(item.href)}
                  >
                    {item.type === "category" && item.icon ? (
                      <Icon
                        name={item.icon}
                        className="size-4 text-muted-foreground"
                      />
                    ) : (
                      <Logo
                        src={item.logo}
                        name={item.title}
                        size={22}
                        rounded="rounded-md"
                        className="border-0"
                      />
                    )}
                    <span className="truncate">{item.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : null,
          )}

          <CommandSeparator />
          <CommandGroup heading="Theme">
            <CommandItem
              value="theme-light"
              onSelect={() => {
                setTheme("light");
                setOpen(false);
              }}
            >
              <Sun /> Light
            </CommandItem>
            <CommandItem
              value="theme-dark"
              onSelect={() => {
                setTheme("dark");
                setOpen(false);
              }}
            >
              <Moon /> Dark
            </CommandItem>
            <CommandItem
              value="theme-system"
              onSelect={() => {
                setTheme("system");
                setOpen(false);
              }}
            >
              <Monitor /> System
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
