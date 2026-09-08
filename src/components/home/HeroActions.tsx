"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Magnetic } from "@/components/common/Magnetic";
import { useUIStore } from "@/store/ui";

/** Hero 的两个动作：开始试用 + ⌘K 搜索。 */
export function HeroActions() {
  const setCommandOpen = useUIStore((s) => s.setCommandOpen);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Magnetic strength={0.18} max={6}>
        <Link
          href="/components"
          className="group inline-flex h-12 items-center gap-2 rounded-full bg-accent px-7 text-[15px] font-semibold text-accent-foreground shadow-md transition-[transform,box-shadow] duration-normal hover:shadow-lg active:scale-[0.98]"
        >
          开始试用
          <ArrowRight
            size={16}
            className="transition-transform duration-normal group-hover:translate-x-1"
          />
        </Link>
      </Magnetic>
      <button
        type="button"
        onClick={() => setCommandOpen(true)}
        className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-surface px-6 text-[15px] font-semibold text-foreground transition-colors duration-fast hover:border-border-strong active:scale-[0.98]"
      >
        搜索一下
        <kbd className="rounded-md border border-border bg-surface-hover px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">
          ⌘K
        </kbd>
      </button>
    </div>
  );
}
