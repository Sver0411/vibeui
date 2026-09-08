import type { Metadata } from "next";
import { COLLECTIONS, getResourceMeta } from "@/registry/client";
import { CollectionCard } from "@/components/cards/CollectionCard";

export const metadata: Metadata = {
  title: "合集",
  description:
    "Curated, theme-based collections of UI resources — glassmorphism kits, loading animations, dashboard components and more.",
  alternates: { canonical: "/collections" },
};

export default function CollectionsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6">
      <header className="mb-5 flex items-baseline gap-3">
        <h1 className="text-3xl font-bold tracking-[-0.03em]">合集</h1>
        <span className="text-sm text-muted-foreground">{COLLECTIONS.length}</span>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {COLLECTIONS.map((collection) => (
          <CollectionCard
            key={collection.slug}
            collection={collection}
            members={collection.memberSlugs
              .map((slug) => getResourceMeta(slug))
              .filter((meta): meta is NonNullable<typeof meta> => Boolean(meta))}
          />
        ))}
      </div>
    </div>
  );
}
