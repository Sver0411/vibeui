"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, Copy, Search } from "lucide-react";
import type { UIResourceMeta } from "@/types/resource";
import { useCopy } from "@/hooks/use-copy";
import { TYPE_META } from "@/registry/categories";
import { cn } from "@/lib/utils";

const TYPE_FILTERS = [
  { value: "all", label: "全部" },
  { value: "component", label: "组件" },
  { value: "animation", label: "动效" },
  { value: "template", label: "模板" },
] as const;

type TypeFilter = (typeof TYPE_FILTERS)[number]["value"];

export interface PromptsViewProps {
  resources: UIResourceMeta[];
  /** 资源总数，用于展示覆盖率与后续补齐提示。 */
  total: number;
}

/**
 * Prompt library: browse by "what effect do I want" rather than by component
 * name. Each card surfaces the effect's real name plus its one-line prompt —
 * enough to paste into an AI tool without ever opening the detail page.
 */
export function PromptsView({ resources, total }: PromptsViewProps) {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const { copy } = useCopy();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return resources.filter((meta) => {
      if (typeFilter !== "all" && meta.type !== typeFilter) return false;
      if (!q) return true;
      const ai = meta.ai;
      if (!ai) return false;
      const haystack = [
        meta.name,
        meta.description,
        ai.terms.zh,
        ai.terms.en,
        ai.terms.pattern ?? "",
        ...(ai.terms.aliases ?? []),
        ai.prompts.short,
        ai.prompts.standard,
        ...(ai.effectTags ?? []),
        ...meta.tags,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [resources, query, typeFilter]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* 页头 */}
      <header className="mb-6 flex items-baseline gap-3">
        <h1 className="text-3xl font-bold tracking-[-0.03em]">提示词</h1>
        <span className="text-sm text-muted-foreground">{resources.length}</span>
      </header>

      {/* 搜索与筛选 */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1 sm:max-w-md">
          <Search
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜效果、术语或别名，如：加载 / shimmer / 填充…"
            aria-label="搜索提示词"
            className="h-10 w-full rounded-lg border border-border bg-surface pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
          />
        </div>
        <div className="flex items-center gap-1" role="group" aria-label="按类型筛选">
          {TYPE_FILTERS.map((filter) => (
            <button
              key={filter.value}
              type="button"
              aria-pressed={typeFilter === filter.value}
              onClick={() => setTypeFilter(filter.value)}
              className={cn(
                "rounded-md px-3 py-1.5 text-[13px] font-medium transition-colors duration-fast",
                typeFilter === filter.value
                  ? "bg-accent-soft text-accent"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* 空状态 */}
      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-16 text-center">
          <p className="text-sm text-muted-foreground">
            没有匹配「{query}」的词条。试试更笼统的词，比如「滚动」「按钮」。
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((meta) => {
            const ai = meta.ai;
            if (!ai) return null;
            const typeMeta = TYPE_META[meta.type];
            return (
              <article
                key={meta.slug}
                className="atlas-spotlight relative flex flex-col overflow-hidden rounded-xl border border-border bg-surface transition-all duration-normal hover:border-border-strong"
              >
                <div className="flex flex-1 flex-col p-4">
                  {/* 类型 + 模式 */}
                  <div className="mb-2.5 flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground">
                    {typeMeta && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-muted px-1.5 py-0.5">
                        <typeMeta.icon size={10} /> {typeMeta.label}
                      </span>
                    )}
                    {ai.terms.pattern && <span>{ai.terms.pattern}</span>}
                  </div>

                  {/* 术语 */}
                  <h2 className="text-[15px] font-medium tracking-tight">{ai.terms.zh}</h2>
                  <p className="mt-0.5 font-mono text-xs text-muted-foreground">{ai.terms.en}</p>

                  {/* 一句话提示词 */}
                  <p className="mt-3 line-clamp-3 flex-1 text-[13px] leading-6 text-muted-foreground">
                    {ai.prompts.short}
                  </p>

                  {/* 标签 */}
                  {ai.effectTags && ai.effectTags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {ai.effectTags.slice(0, 4).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-border px-1.5 py-0.5 text-[11px] text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* 操作 */}
                  <div className="mt-4 flex items-center gap-2 border-t border-border pt-3">
                    <button
                      type="button"
                      onClick={() => void copy(ai.prompts.short, { label: `${ai.terms.zh} 一句话提示词` })}
                      className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border bg-surface px-2.5 text-xs font-medium transition-colors duration-fast hover:border-border-strong hover:text-accent"
                    >
                      <Copy size={12} /> 复制提示词
                    </button>
                    <Link
                      href={`/item/${meta.slug}`}
                      className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      代码与详情 <ChevronRight size={12} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* 覆盖率提示 */}
      {resources.length < total && (
        <p className="mt-8 flex items-center gap-1.5 text-xs text-muted-foreground">
          <ArrowRight size={11} />
          其余 {total - resources.length} 个资源的提示词正在逐步补齐；在这之前，详情页仍提供完整可复制的源码。
        </p>
      )}
    </div>
  );
}
