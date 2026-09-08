import type { Metadata } from "next";
import { PlaygroundClient } from "@/components/playground/PlaygroundClient";
import { getResourceMeta } from "@/registry";
import { loadResource } from "@/registry/server/loader";

export const metadata: Metadata = {
  title: "在线调试",
  description:
    "在沙箱 iframe 中编辑 HTML、CSS 与 JavaScript 并实时预览。支持自动保存、控制台输出、分享链接与一键导出。",
  robots: { index: false },
};

interface PlaygroundPageProps {
  searchParams: { from?: string; code?: string };
}

export default function PlaygroundPage({ searchParams }: PlaygroundPageProps) {
  let initialFiles = null;
  if (searchParams.from) {
    const meta = getResourceMeta(searchParams.from);
    if (meta) {
      initialFiles = loadResource(meta).files;
    }
  }
  return (
    <PlaygroundClient
      initialFiles={initialFiles}
      fromSlug={searchParams.from ?? null}
      sharedCode={searchParams.code ?? null}
    />
  );
}
