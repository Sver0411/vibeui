"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface IconWallTile {
  slug: string;
  name: string;
  svg: string;
}

const PAGE_SIZE = 20;

/**
 * 图标墙（翻页式）：每页 20 块大瓷砖一屏铺完，看图不滚动；
 * 页与页之间用左右箭头 + 底部圆点切换，弹簧曲线保持 Q 弹手感。
 */
export function IconWall({ tiles }: { tiles: IconWallTile[] }) {
  const pageCount = Math.max(1, Math.ceil(tiles.length / PAGE_SIZE));
  const [page, setPage] = useState(0);
  const shown = tiles.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const go = (next: number) => setPage((next + pageCount) % pageCount);

  return (
    <div className="relative h-[calc(100dvh-3.5rem-76px)] lg:h-[100dvh]">
      <h1 className="sr-only">图标</h1>

      {/* key 换页时重放入场动画 */}
      <div
        key={page}
        className="grid h-full auto-rows-fr grid-cols-4 gap-3 p-4 [animation:wall-in_.38s_cubic-bezier(0.22,1,0.36,1)] sm:grid-cols-5 sm:gap-4 sm:p-6"
      >
        {shown.map(({ slug, name, svg }) => (
          <Link
            key={slug}
            href={`/item/${slug}`}
            aria-label={name}
            className="group relative flex items-center justify-center rounded-[2rem] border border-border/70 bg-surface text-foreground shadow-sm transition-all duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 hover:scale-[1.04] hover:rounded-[2.75rem] hover:border-border-strong hover:shadow-lg active:scale-95"
          >
            <span className="block h-[44%] w-[44%] transition-transform duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 [&_svg]:block [&_svg]:h-full [&_svg]:w-full">
              {svg ? <span dangerouslySetInnerHTML={{ __html: svg }} /> : null}
            </span>
          </Link>
        ))}
      </div>

      {pageCount > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(page - 1)}
            aria-label="上一页图标"
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface/85 text-muted-foreground shadow-md backdrop-blur transition-all duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 hover:text-foreground active:scale-90"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => go(page + 1)}
            aria-label="下一页图标"
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface/85 text-muted-foreground shadow-md backdrop-blur transition-all duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:scale-110 hover:text-foreground active:scale-90"
          >
            <ChevronRight size={18} />
          </button>
          <div
            aria-label={`当前第 ${page + 1} 页，共 ${pageCount} 页`}
            className="absolute bottom-3 left-1/2 z-10 flex h-8 min-w-20 -translate-x-1/2 items-center justify-center gap-1 rounded-full border border-border bg-surface/85 px-3.5 text-xs font-semibold text-muted-foreground shadow-md backdrop-blur [font-variant-numeric:tabular-nums]"
          >
            <span className="text-foreground">{page + 1}</span>
            <span aria-hidden="true" className="opacity-50">/</span>
            <span>{pageCount}</span>
          </div>
        </>
      )}
    </div>
  );
}
