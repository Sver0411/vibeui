"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, Blocks, Boxes, Images, Shapes, Sparkles } from "lucide-react";
import { Magnetic } from "@/components/common/Magnetic";
import { SandboxFrame } from "@/components/preview/SandboxFrame";
import { fetchResourceCode } from "@/lib/client/resource-api";
import { CountUp } from "./CountUp";

interface BentoCounts {
  components: number;
  animations: number;
  icons: number;
  blocks: number;
  templates: number;
}

/** 磁吸悬停 + 箭头滑出的可点击瓷砖。 */
function Tile({
  href,
  label,
  icon: Icon,
  children,
  className = "",
}: {
  href: string;
  label: string;
  icon: typeof Boxes;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Magnetic strength={0.06} max={4} className={className}>
      <Link
        href={href}
        className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface p-5 transition-[border-color,box-shadow,transform] duration-normal hover:-translate-y-0.5 hover:border-border-strong hover:shadow-lg active:scale-[0.99]"
      >
        <div className="flex items-start justify-between">
          <Icon
            size={18}
            strokeWidth={2.1}
            className="text-muted-foreground transition-colors duration-normal group-hover:text-accent"
          />
          <ArrowUpRight
            size={15}
            className="-translate-x-1 translate-y-1 text-muted-foreground opacity-0 transition-all duration-normal group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
          />
        </div>
        {children}
        <span className="text-[13px] font-medium text-muted-foreground">{label}</span>
      </Link>
    </Magnetic>
  );
}

function TileNumber({ value }: { value: number }) {
  return (
    <span className="text-[2rem] font-bold leading-none tracking-[-0.04em]">
      <CountUp value={value} />
    </span>
  );
}

/** 首页互动 Bento：各栏目入口 + 一格实时运行中的动效。 */
export function HomeBento({
  counts,
  liveSlug,
  liveName,
}: {
  counts: BentoCounts;
  liveSlug: string;
  liveName: string;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:grid-rows-2">
      <Tile href="/components" label="组件 · 直接玩" icon={Boxes} className="lg:col-span-2 lg:row-span-2">
        <div className="flex flex-1 flex-col items-start justify-center py-8">
          <TileNumber value={counts.components} />
          <span className="mt-1 text-2xl font-bold tracking-[-0.03em]">个组件在跑</span>
        </div>
      </Tile>

      <Tile href="/animations" label="动效实验室" icon={Sparkles}>
        <TileNumber value={counts.animations} />
      </Tile>

      <Tile href="/icons" label="图标库" icon={Shapes}>
        <TileNumber value={counts.icons} />
      </Tile>

      {/* 实时动效瓷砖：一个真的在动的资源 */}
      <Link
        href={`/item/${liveSlug}`}
        className="group relative flex h-full min-h-[132px] flex-col justify-between overflow-hidden rounded-2xl border border-border bg-surface transition-[border-color,box-shadow] duration-normal hover:border-border-strong hover:shadow-lg lg:col-span-2"
      >
        <span className="flex items-center justify-between px-5 pt-4 text-[11px] font-medium text-muted-foreground">
          正在运行 · {liveName}
          <ArrowUpRight
            size={15}
            className="-translate-x-1 translate-y-1 opacity-0 transition-all duration-normal group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
          />
        </span>
        <SandboxFrame
          codeLoader={() => fetchResourceCode(liveSlug).then((payload) => payload.files)}
          title={`${liveName} 实时演示`}
          mode="card"
          virtualWidth={420}
          className="h-20 w-full bg-transparent"
          bgClassName="bg-transparent"
        />
      </Link>

      <Tile href="/blocks" label="页面区块" icon={Blocks}>
        <TileNumber value={counts.blocks} />
      </Tile>

      <Tile href="/templates" label="网站模板" icon={Images}>
        <TileNumber value={counts.templates} />
      </Tile>
    </div>
  );
}
