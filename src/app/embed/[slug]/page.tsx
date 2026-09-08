import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RESOURCES, getResourceMeta } from "@/registry";
import { loadResource } from "@/registry/server/loader";
import { SandboxFrame } from "@/components/preview/SandboxFrame";
import Link from "next/link";
import { siteConfig } from "@/config/site";

interface EmbedPageProps {
  params: { slug: string };
}

export const metadata: Metadata = {
  title: "Embed preview",
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return RESOURCES.map((resource) => ({ slug: resource.slug }));
}

/** Chrome-free, read-only preview for embedding in external sites. */
export default function EmbedPage({ params }: EmbedPageProps) {
  const meta = getResourceMeta(params.slug);
  if (!meta) notFound();
  const { files } = loadResource(meta);
  const dark = meta.previewBackground === "dark";

  return (
    <div className={`relative h-screen w-screen overflow-hidden ${dark ? "bg-[#0d0d10]" : "bg-white"}`}>
      <SandboxFrame
        files={files}
        title={`${meta.name} embedded preview`}
        mode="card"
        virtualWidth={900}
        className="h-full w-full"
      />
      <Link
        href={`/item/${meta.slug}`}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur transition-opacity hover:opacity-90"
      >
        <span
          aria-hidden="true"
          className="flex h-3.5 w-3.5 items-center justify-center rounded bg-white/90 text-black"
        >
          <svg width="8" height="8" viewBox="0 0 14 14" fill="none">
            <path d="M7 1.5 12.5 4.5 7 7.5 1.5 4.5 7 1.5Z" fill="currentColor" />
          </svg>
        </span>
        {siteConfig.name}
      </Link>
    </div>
  );
}
