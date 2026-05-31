"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

const GRADIENTS = [
  "from-blue-500 to-sky-400",
  "from-violet-500 to-fuchsia-500",
  "from-emerald-500 to-teal-400",
  "from-orange-500 to-amber-400",
  "from-rose-500 to-pink-500",
  "from-indigo-500 to-blue-500",
  "from-cyan-500 to-sky-500",
  "from-purple-500 to-violet-500",
];

function initials(name: string): string {
  const parts = name.split(/[\s.\-_]+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  const single = parts[0] ?? name;
  return single.slice(0, 2).toUpperCase();
}

function gradientFor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) | 0;
  return GRADIENTS[Math.abs(hash) % GRADIENTS.length];
}

interface LogoProps {
  src?: string;
  name: string;
  size?: number;
  className?: string;
  rounded?: string;
}

/** Tool/brand logo with a graceful initials fallback for missing/broken images. */
export function Logo({
  src,
  name,
  size = 44,
  className,
  rounded = "rounded-xl",
}: LogoProps) {
  const [errored, setErrored] = useState(false);
  const showImage = Boolean(src) && !errored;

  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden border bg-background",
        rounded,
        className,
      )}
      style={{ width: size, height: size }}
    >
      {showImage ? (
        <Image
          src={src as string}
          alt={`${name} logo`}
          width={size}
          height={size}
          unoptimized
          className="h-full w-full object-contain"
          style={{ padding: Math.round(size * 0.16) }}
          onError={() => setErrored(true)}
        />
      ) : (
        <div
          className={cn(
            "flex h-full w-full items-center justify-center bg-gradient-to-br font-semibold text-white",
            gradientFor(name),
          )}
          style={{ fontSize: Math.round(size * 0.36) }}
        >
          {initials(name)}
        </div>
      )}
    </div>
  );
}
