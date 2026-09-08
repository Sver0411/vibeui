import type { Metadata } from "next";
import { RESOURCES } from "@/registry/client";
import { loadResourceFiles } from "@/registry/server/loader";
import { IconWall } from "@/components/icons/IconWall";

export const metadata: Metadata = {
  title: "图标",
  description:
    "常用图标的 5 种风格版本（线性 / 加粗 / 虚点 / 双色 / 渐变）与简约 Logo 标志：24px 网格绘制、多尺寸实时预览与 SVG 源码复制。",
  alternates: { canonical: "/icons" },
};

/** 从预览 HTML 里提取内联 SVG，并把渐变/渐变引用 id 加上 slug 前缀避免同页冲突。 */
function extractSvg(html: string | undefined, slug: string): string | null {
  if (!html) return null;
  const match = html.match(/<svg[\s\S]*?<\/svg>/);
  if (!match) return null;
  return match[0]
    .replace(/id="([^"]+)"/g, `id="${slug}-$1"`)
    .replace(/url\(#([^)]+)\)/g, `url(#${slug}-$1)`)
    .replace(/href="#([^"]+)"/g, `href="#${slug}-$1"`);
}

/** 图标墙数据在服务端提取（构建期内联 SVG），翻页交互在客户端。 */
export default function IconsPage() {
  const tiles = RESOURCES
    .filter((resource) => resource.type === "icon")
    .map((meta) => ({
      slug: meta.slug,
      name: meta.name,
      svg: extractSvg(loadResourceFiles(meta.dir).html, meta.slug),
    }))
    .filter((tile): tile is { slug: string; name: string; svg: string } => Boolean(tile.svg));

  return <IconWall tiles={tiles} />;
}
