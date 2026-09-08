import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { COLLECTIONS, getResourceMeta } from "@/registry/client";
import { ResourceCard } from "@/components/cards/ResourceCard";

interface CollectionPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return COLLECTIONS.map((collection) => ({ slug: collection.slug }));
}

export function generateMetadata({ params }: CollectionPageProps): Metadata {
  const collection = COLLECTIONS.find((c) => c.slug === params.slug);
  if (!collection) return { title: "未找到合集" };
  return {
    title: collection.title,
    description: collection.description,
    alternates: { canonical: `/collections/${collection.slug}` },
  };
}

export default function CollectionPage({ params }: CollectionPageProps) {
  const collection = COLLECTIONS.find((c) => c.slug === params.slug);
  if (!collection) notFound();
  const members = collection.memberSlugs
    .map((slug) => getResourceMeta(slug))
    .filter((meta): meta is NonNullable<typeof meta> => Boolean(meta));

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-8 max-w-2xl">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">合集</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight">{collection.title}</h1>
        <p className="mt-2 text-[14px] leading-7 text-muted-foreground">{collection.description}</p>
        <p className="mt-3 text-xs text-muted-foreground">{members.length} 个资源</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {members.map((meta) => (
          <ResourceCard key={meta.slug} meta={meta} />
        ))}
      </div>
    </div>
  );
}
