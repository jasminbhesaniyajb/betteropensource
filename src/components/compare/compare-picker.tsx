"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Option {
  slug: string;
  name: string;
}

export function ComparePicker({ tools }: { tools: Option[] }) {
  const router = useRouter();
  const [a, setA] = useState("");
  const [b, setB] = useState("");

  const invalid = !a || !b || a === b;

  function go() {
    if (!invalid) router.push(`/compare/${a}-vs-${b}`);
  }

  return (
    <Card className="flex flex-col items-stretch gap-3 p-5 sm:flex-row sm:items-end">
      <div className="flex-1">
        <label className="mb-1.5 block text-sm font-medium">First tool</label>
        <Select value={a} onValueChange={(v) => setA(v ?? "")}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose a tool" />
          </SelectTrigger>
          <SelectContent>
            {tools.map((t) => (
              <SelectItem key={t.slug} value={t.slug}>
                {t.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <span className="hidden pb-2 text-sm text-muted-foreground sm:block">
        vs
      </span>
      <div className="flex-1">
        <label className="mb-1.5 block text-sm font-medium">Second tool</label>
        <Select value={b} onValueChange={(v) => setB(v ?? "")}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Choose a tool" />
          </SelectTrigger>
          <SelectContent>
            {tools.map((t) => (
              <SelectItem key={t.slug} value={t.slug}>
                {t.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button onClick={go} disabled={invalid} className="h-9 gap-2 sm:h-10">
        Compare <ArrowRight className="size-4" />
      </Button>
    </Card>
  );
}
