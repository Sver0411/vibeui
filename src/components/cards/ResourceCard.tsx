"use client";

import Link from "next/link";
import { Code2, Download, ExternalLink, Eye, MoreHorizontal, Share2, Sparkles } from "lucide-react";
import type { UIResourceMeta } from "@/types/resource";
import { SandboxFrame } from "@/components/preview/SandboxFrame";
import { FavoriteButton } from "@/components/common/FavoriteButton";
import { Dropdown, MenuItem, MenuDivider } from "@/components/common/Dropdown";
import { useCopy } from "@/hooks/use-copy";
import { useUIStore } from "@/store/ui";
import { toast, toastError } from "@/store/toast";
import { fetchResourceCode } from "@/lib/client/resource-api";
import { buildStandaloneDocument } from "@/lib/sandbox/build";
import { downloadText, cn } from "@/lib/utils";
import { getCategoryLabel, TYPE_META } from "@/registry/categories";

const PREVIEW_WIDTHS: Record<string, number> = {
  // 组件/动效用较窄的虚拟宽渲染：iframe 的渲染面积与虚拟宽平方成正比，
  // 560→420 让每个并发预览的光栅化成本降低约 44%，滚动浏览明显更顺。
  component: 420,
  animation: 420,
  template: 900,
  layout: 900,
};

const BACKGROUNDS: Record<string, string> = {
  dark: "bg-[#0d0d10]",
  light: "bg-white",
  checker: "bg-checker bg-surface",
  grid: "bg-dot-grid bg-surface",
};

export interface ResourceCardProps {
  meta: UIResourceMeta;
  density?: "comfortable" | "compact";
  className?: string;
}

/**
 * Resource card with a live, lazily-mounted sandbox preview. Code-dependent
 * actions (copy/download) fetch source on demand so grids stay lightweight.
 */
export function ResourceCard({ meta, density = "comfortable", className }: ResourceCardProps) {
  const { copy } = useCopy();
  const openQuickPreview = useUIStore((s) => s.openQuickPreview);
  const openShare = useUIStore((s) => s.openShare);

  /** Fetch source on demand; surfaces real errors via toast. */
  const loadCode = async () => {
    try {
      return await fetchResourceCode(meta.slug);
    } catch (error) {
      toastError("代码加载失败", error instanceof Error ? error.message : "网络请求失败。");
      return null;
    }
  };

  const typeMeta = TYPE_META[meta.type];
  const previewHeight = density === "compact" ? "h-44" : "h-60";
  /**
   * 组件与动效"裸露"展示：无卡片边框、无预览舞台底色，demo 自带的背景与
   * 页面背景一致（#fafafa），组件看起来直接浮在页面上。
   * 模板与区块是完整段落，保留画框当作"视口"。
   */
  const framedPreview = meta.type === "template" || meta.type === "layout";

  return (
    <article className={cn("resource-tile group relative flex min-w-0 flex-col", className)}>
      {/* 预览：无遮罩，组件直接可交互（悬停/点击都在组件上发生） */}
      <div
        className={cn(
          "relative isolate overflow-hidden",
          framedPreview
            ? "rounded-2xl ring-1 ring-inset ring-border/80 shadow-[0_18px_50px_-32px_rgba(0,0,0,0.35)] transition-transform duration-normal group-hover:-translate-y-0.5"
            : "rounded-xl transition-[transform,box-shadow] duration-normal [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:shadow-[0_10px_30px_-18px_rgba(0,0,0,0.3)]",
          framedPreview && BACKGROUNDS[meta.previewBackground ?? "light"],
          previewHeight,
        )}
      >
        <SandboxFrame
          codeLoader={() => fetchResourceCode(meta.slug).then((payload) => payload.files)}
          title={`${meta.name} preview`}
          mode="card"
          virtualWidth={PREVIEW_WIDTHS[meta.type] ?? 560}
          fitContent={meta.type === "component"}
          staticPreview={framedPreview}
          bgClassName={framedPreview ? undefined : "bg-transparent"}
          className="h-full w-full"
        />
        <div className="pointer-events-none absolute right-2 top-2 z-[2] opacity-100 transition-opacity duration-fast sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
          <FavoriteButton slug={meta.slug} size="sm" className="pointer-events-auto" />
        </div>
        {/* 区块/模板仅静态展示：不提供可点击的预览入口 */}
        {!framedPreview && (
          <div className="absolute bottom-2 left-2 z-[2] flex gap-1.5 opacity-0 transition-opacity duration-fast focus-within:opacity-100 group-hover:opacity-100">
            <Link
              href={`/item/${meta.slug}`}
              aria-label={`打开 ${meta.name} 详情`}
              className="flex h-7 items-center gap-1 rounded-md bg-surface/85 px-2 text-[11px] text-muted-foreground shadow-sm backdrop-blur transition-colors hover:text-foreground"
            >
              查看详情 →
            </Link>
            <button
              type="button"
              onClick={() => openQuickPreview(meta.slug)}
              aria-label={`快速预览 ${meta.name}`}
              className="flex h-7 items-center gap-1 rounded-md bg-surface/85 px-2 text-[11px] text-muted-foreground shadow-sm backdrop-blur transition-colors hover:text-foreground"
            >
              <Eye size={12} /> 快速预览
            </button>
          </div>
        )}
      </div>

      {/* Meta */}
      <div className="flex flex-1 flex-col gap-2 pt-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link
              href={`/item/${meta.slug}`}
              className="block truncate text-sm font-semibold tracking-[-0.01em] hover:text-accent"
            >
              {meta.name}
            </Link>
          </div>
          <Dropdown
            label={`Actions for ${meta.name}`}
            trigger={({ toggle }) => (
              <button
                type="button"
                onClick={toggle}
                aria-label={`More actions for ${meta.name}`}
                className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-surface-hover hover:text-foreground"
              >
                <MoreHorizontal size={15} />
              </button>
            )}
          >
            {(closeMenu) => (
              <>
                <MenuItem href={`/item/${meta.slug}`} onSelect={closeMenu}>
                  打开详情
                </MenuItem>
                {!framedPreview && (
                  <MenuItem
                    onSelect={() => {
                      closeMenu();
                      openQuickPreview(meta.slug);
                    }}
                  >
                    <Eye /> 快速预览
                  </MenuItem>
                )}
                <MenuDivider />
                <MenuItem
                  onSelect={async () => {
                    closeMenu();
                    const payload = await loadCode();
                    if (payload) {
                      void copy(buildStandaloneDocument(payload.files, meta.name), {
                        label: "完整 HTML 文档",
                      });
                    }
                  }}
                >
                  <Code2 /> 复制完整 HTML
                </MenuItem>
                <MenuItem
                  onSelect={async () => {
                    closeMenu();
                    const payload = await loadCode();
                    if (payload) {
                      const html = buildStandaloneDocument(payload.files, meta.name);
                      downloadText(html, `${meta.slug}.html`, "text/html");
                      toast(`正在下载 ${meta.slug}.html`, { variant: "success" });
                    }
                  }}
                >
                  <Download /> 下载 .html 文件
                </MenuItem>
                <MenuItem href={`/playground?from=${meta.slug}`} onSelect={closeMenu}>
                  <ExternalLink /> 在在线调试中打开
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onSelect={() => {
                    closeMenu();
                    openShare(meta.slug);
                  }}
                >
                  <Share2 /> 分享
                </MenuItem>
              </>
            )}
          </Dropdown>
        </div>

        <div className="mt-auto flex items-center gap-2 text-[11px] text-muted-foreground">
          {typeMeta && (
            <span className="inline-flex items-center gap-1">
              <typeMeta.icon size={11} /> {typeMeta.label}
            </span>
          )}
          <span aria-hidden="true">·</span>
          <span>{getCategoryLabel(meta.category)}</span>
          {meta.styles[0] && (
            <>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1 truncate">
                <Sparkles size={10} /> {meta.styles[0]}
              </span>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
