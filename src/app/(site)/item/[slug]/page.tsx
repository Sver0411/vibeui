import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RESOURCES, getResourceMeta } from "@/registry";
import { loadResource } from "@/registry/server/loader";
import { DetailClient } from "@/components/detail/DetailClient";
import { IconDetail } from "@/components/icons/IconDetail";
import { siteConfig } from "@/config/site";

interface ItemPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return RESOURCES.map((resource) => ({ slug: resource.slug }));
}

export function generateMetadata({ params }: ItemPageProps): Metadata {
  const meta = getResourceMeta(params.slug);
  if (!meta) return { title: "Resource not found" };
  return {
    title: meta.name,
    description: meta.description,
    alternates: { canonical: `/item/${meta.slug}` },
    openGraph: {
      title: `${meta.name} · ${siteConfig.name}`,
      description: meta.description,
      url: `/item/${meta.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${meta.name} · ${siteConfig.name}`,
      description: meta.description,
    },
  };
}

export default function ItemPage({ params }: ItemPageProps) {
  const meta = getResourceMeta(params.slug);
  if (!meta) notFound();
  const resource = loadResource(meta);

  // 图标走专属轻量详情页：只留预览、尺寸切换与复制/下载
  if (meta.type === "icon") {
    const match = resource.files.html?.match(/<svg[\s\S]*?<\/svg>/);
    return <IconDetail meta={meta} svg={match ? match[0] : ""} />;
  }

  return <DetailClient meta={meta} initialFiles={resource.files} />;
}
