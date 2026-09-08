"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Collection } from "@/registry/collections";
import type { UIResourceMeta } from "@/types/resource";
import { cn } from "@/lib/utils";

export interface CollectionCardProps {
  collection: Collection;
  members: UIResourceMeta[];
  className?: string;
}

/** Lightweight editorial collection link. Live previews belong in resource grids. */
export function CollectionCard({ collection, members, className }: CollectionCardProps) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className={cn(
        "group flex flex-col border-t border-border pt-4 transition-colors duration-normal",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {collection.memberSlugs.length} 个资源
          </p>
          <h3 className="mt-2 text-base font-medium tracking-tight transition-colors group-hover:text-accent">
            {collection.title}
          </h3>
        </div>
        <ArrowUpRight
          size={16}
          className="mt-1 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
        />
      </div>
      <p className="mt-3 line-clamp-2 text-[13px] leading-6 text-muted-foreground">
        {collection.description}
      </p>
      {members.length > 0 && (
        <p className="mt-5 truncate text-xs text-muted-foreground/80">
          {members
            .slice(0, 3)
            .map((member) => member.name)
            .join(" · ")}
        </p>
      )}
    </Link>
  );
}
