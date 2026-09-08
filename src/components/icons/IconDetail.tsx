"use client";

import { useState } from "react";
import { Copy, Download } from "lucide-react";
import type { UIResourceMeta } from "@/types/resource";
import { useCopy } from "@/hooks/use-copy";
import { downloadText } from "@/lib/utils";
import { toast } from "@/store/toast";
import { Magnetic } from "@/components/common/Magnetic";

const SIZES = [16, 24, 32, 48, 64] as const;

/**
 * 图标专属详情页：只留核心——大图标预览、尺寸切换、复制/下载 SVG、源码。
 * 与图标墙同款圆润 Q 弹视觉。
 */
export function IconDetail({ meta, svg }: { meta: UIResourceMeta; svg: string }) {
  const [size, setSize] = useState<number>(64);
  const [showCode, setShowCode] = useState(false);
  const { copy } = useCopy();

  const copySvg = async () => {
    const done = await copy(svg, { label: "SVG 源码" });
    if (done) toast("SVG 已复制", { variant: "success" });
  };

  const downloadSvg = () => {
    downloadText(svg, `${meta.slug}.svg`, "image/svg+xml");
    toast(`正在下载 ${meta.slug}.svg`, { variant: "success" });
  };

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-3.5rem-76px)] max-w-3xl flex-col items-center justify-center px-6 py-10 lg:min-h-[100dvh]">
      <h1 className="sr-only">{meta.name}</h1>

      {/* 大图标预览：与图标墙同款瓷砖 */}
      <div className="group flex h-56 w-56 items-center justify-center rounded-[3rem] border border-border/70 bg-surface text-foreground shadow-md transition-all duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.03] hover:rounded-[3.6rem] hover:shadow-lg active:scale-95 sm:h-64 sm:w-64">
        <span
          className="block transition-all duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] [&_svg]:block [&_svg]:h-full [&_svg]:w-full"
          style={{ width: size * 2, height: size * 2 }}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div>

      {/* 名称 + 一句话描述 */}
      <p className="mt-6 text-xl font-bold tracking-[-0.02em]">{meta.name}</p>
      <p className="mt-1 max-w-sm text-center text-[13px] text-muted-foreground">
        {meta.description}
      </p>

      {/* 尺寸切换 */}
      <div className="mt-7 flex items-center gap-1.5" role="group" aria-label="预览尺寸">
        {SIZES.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setSize(s)}
            aria-pressed={size === s}
            className={
              size === s
                ? "h-8 min-w-11 rounded-full bg-accent px-2 text-xs font-semibold text-accent-foreground transition-all duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] active:scale-90"
                : "h-8 min-w-11 rounded-full border border-border bg-surface px-2 text-xs font-medium text-muted-foreground transition-all duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:scale-105 hover:text-foreground active:scale-90"
            }
          >
            {s}
          </button>
        ))}
      </div>

      {/* 动作 */}
      <div className="mt-7 flex items-center gap-3">
        <Magnetic strength={0.18} max={6}>
          <button
            type="button"
            onClick={copySvg}
            className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-accent-foreground shadow-md transition-all duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:shadow-lg active:scale-95"
          >
            <Copy size={15} /> 复制 SVG
          </button>
        </Magnetic>
        <Magnetic strength={0.18} max={6}>
          <button
            type="button"
            onClick={downloadSvg}
            className="inline-flex h-12 items-center gap-2 rounded-full border border-border bg-surface px-6 text-sm font-semibold text-foreground transition-all duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:border-border-strong active:scale-95"
          >
            <Download size={15} /> 下载
          </button>
        </Magnetic>
      </div>

      {/* 源码折叠 */}
      <div className="mt-8 w-full max-w-xl">
        <button
          type="button"
          onClick={() => setShowCode((v) => !v)}
          className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          {showCode ? "收起源码 ▲" : "查看 SVG 源码 ▼"}
        </button>
        {showCode && (
          <pre className="mt-3 max-h-56 overflow-auto rounded-2xl border border-border bg-surface p-4 text-left text-[11px] leading-5 text-muted-foreground">
            {svg}
          </pre>
        )}
      </div>
    </div>
  );
}
