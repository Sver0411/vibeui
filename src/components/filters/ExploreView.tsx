"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ChevronDown, LayoutGrid, Rows3, Search, SlidersHorizontal, X } from "lucide-react";
import { RESOURCES, CATEGORIES, countByCategory } from "@/registry/client";
import { DIFFICULTY_META, RESOURCE_TYPES, TYPE_META } from "@/registry/categories";
import type { UIResourceMeta, Difficulty } from "@/types/resource";
import { useFavorites } from "@/store/favorites";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { ResourceCard } from "@/components/cards/ResourceCard";
import { Segmented } from "@/components/common/Segmented";
import { Drawer } from "@/components/common/Drawer";
import { EmptyState } from "@/components/common/EmptyState";
import { searchResources } from "@/lib/search/search";
import { cn } from "@/lib/utils";

const TECHS = ["HTML", "CSS", "JavaScript", "React", "SVG", "Canvas 2D"] as const;
const FEATURES = [
  { id: "responsive", label: "响应式" },
  { id: "has-react", label: "含 React 版本" },
  { id: "has-html", label: "含原生 HTML 版本" },
  { id: "pure-css", label: "纯 CSS（无 JS）" },
  { id: "featured", label: "精选" },
  { id: "new", label: "最新" },
  { id: "popular", label: "热门" },
] as const;
const SORTS = [
  { id: "recommended", label: "推荐" },
  { id: "latest", label: "最新" },
  { id: "popular", label: "最热门" },
  { id: "favorites", label: "收藏最多" },
  { id: "name", label: "名称 A–Z" },
  { id: "difficulty", label: "难度" },
] as const;
const TYPE_TABS = [
  { value: "", label: "全部" },
  { value: "component", label: "组件" },
  { value: "animation", label: "动效" },
  { value: "layout", label: "区块" },
  { value: "template", label: "模板" },
] as const;
const PAGE_SIZE = 12;

type SortId = (typeof SORTS)[number]["id"];

export interface ExploreViewProps {
  /** Locks the resource type (used by /components, /animations, /blocks, /templates). */
  presetType?: "component" | "animation" | "template" | "layout" | "icon";
}

/** Main browsing surface: search, filters (URL-synced), sorting, grid. */
export function ExploreView({ presetType }: ExploreViewProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const favorites = useFavorites((s) => s.favorites);

  const q = searchParams.get("q") ?? "";
  const typeParam = searchParams.get("type") ?? presetType ?? "";
  const category = searchParams.get("category") ?? "";
  const techParam = searchParams.get("tech") ?? "";
  const styleParam = searchParams.get("style") ?? "";
  const difficultyParam = searchParams.get("diff") ?? "";
  const featureParam = searchParams.get("feat") ?? "";
  const techs = useMemo(() => parseCsv(techParam), [techParam]);
  const styles = useMemo(() => parseCsv(styleParam), [styleParam]);
  const difficulties = useMemo(() => parseCsv(difficultyParam), [difficultyParam]);
  const features = useMemo(() => parseCsv(featureParam), [featureParam]);
  const sort = (searchParams.get("sort") as SortId) ?? "recommended";
  const density = searchParams.get("view") === "compact" ? "compact" : "comfortable";

  const [inputValue, setInputValue] = useState(q);
  const debouncedQuery = useDebouncedValue(inputValue, 300);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Keep the input in sync when the URL changes externally (e.g. nav links).
  useEffect(() => setInputValue(q), [q]);

  useEffect(() => {
    if (debouncedQuery !== q) {
      updateParams({ q: debouncedQuery || null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQuery]);

  const updateParams = useCallback(
    (patch: Record<string, string | null>) => {
      const params = new URLSearchParams(window.location.search);
      for (const [key, value] of Object.entries(patch)) {
        if (value === null || value === "" || value === undefined) params.delete(key);
        else params.set(key, value);
      }
      const queryString = params.toString();
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
    },
    [router, pathname],
  );

  const toggleCsv = (key: string, current: string[], value: string) => {
    const next = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    updateParams({ [key]: next.length > 0 ? next.join(",") : null });
  };

  const filtered = useMemo(() => {
    let results: UIResourceMeta[];
    if (q.trim()) {
      results = searchResources(RESOURCES, q.trim()).map((m) => m.resource);
    } else {
      results = [...RESOURCES];
    }
    if (typeParam) results = results.filter((r) => r.type === typeParam);
    if (category) results = results.filter((r) => r.category === category);
    if (techs.length > 0)
      results = results.filter((r) => techs.every((t) => r.technologies.includes(t)));
    if (styles.length > 0)
      results = results.filter((r) => styles.some((s) => r.styles.includes(s)));
    if (difficulties.length > 0)
      results = results.filter((r) => difficulties.includes(r.difficulty));
    for (const feature of features) {
      switch (feature) {
        case "responsive":
          results = results.filter((r) => r.responsive);
          break;
        case "has-react":
          results = results.filter((r) => r.technologies.includes("React"));
          break;
        case "has-html":
          results = results.filter((r) => r.technologies.includes("HTML"));
          break;
        case "pure-css":
          results = results.filter(
            (r) => !r.technologies.includes("JavaScript") && !r.technologies.includes("React"),
          );
          break;
        case "featured":
          results = results.filter((r) => r.featured);
          break;
        case "new":
          results = results.filter((r) => r.isNew);
          break;
        case "popular":
          results = results.filter((r) => r.popular);
          break;
      }
    }

    const favoriteCount = (meta: UIResourceMeta) => (favorites[meta.slug] ? 1 : 0); // local-first: favorites you saved rank first
    // 名称兜底一律用 slug 比较：localeCompare 对中文在 Node(服务端) 与
    // 浏览器(客户端)的 ICU 排序结果可能不同，会直接造成 hydration mismatch。
    const slugCompare = (a: UIResourceMeta, b: UIResourceMeta) =>
      a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0;
    const sorters: Record<SortId, (a: UIResourceMeta, b: UIResourceMeta) => number> = {
      recommended: (a, b) =>
        Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
        Number(Boolean(b.popular)) - Number(Boolean(a.popular)) ||
        slugCompare(a, b),
      latest: (a, b) =>
        new Date(b.updatedAt ?? b.createdAt ?? 0).getTime() -
          new Date(a.updatedAt ?? a.createdAt ?? 0).getTime() || slugCompare(a, b),
      popular: (a, b) =>
        Number(Boolean(b.popular)) - Number(Boolean(a.popular)) || slugCompare(a, b),
      favorites: (a, b) => favoriteCount(b) - favoriteCount(a) || slugCompare(a, b),
      name: slugCompare,
      difficulty: (a, b) =>
        DIFFICULTY_META[a.difficulty].order - DIFFICULTY_META[b.difficulty].order ||
        slugCompare(a, b),
    };
    return results.sort(sorters[sort]);
  }, [q, typeParam, category, techs, styles, difficulties, features, sort, favorites]);

  const allStyles = useMemo(() => {
    const set = new Set<string>();
    for (const resource of RESOURCES) for (const style of resource.styles) set.add(style);
    return [...set].sort();
  }, []);
  const categoryCounts = useMemo(() => countByCategory(), []);

  // 分页状态：page 同步到 URL（?page=N），筛选/排序变化时回到第一页。
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const rawPage = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
  const page = Math.min(rawPage, pageCount);

  const gotoPage = useCallback(
    (next: number) => {
      const clamped = Math.max(1, Math.min(next, pageCount));
      updateParams({ page: clamped === 1 ? null : String(clamped) });
      // 换页后回到结果区顶部，而不是停留在长列表底部
      resultsRef.current?.scrollIntoView({ behavior: "auto", block: "start" });
    },
    [pageCount, updateParams],
  );

  // 筛选条件变化（非首次挂载）时移除 page 参数，回到第 1 页
  const filterKey = [
    q,
    typeParam,
    category,
    techParam,
    styleParam,
    difficultyParam,
    featureParam,
    sort,
  ].join("|");
  const prevFilterKeyRef = useRef(filterKey);
  useEffect(() => {
    if (prevFilterKeyRef.current !== filterKey) {
      prevFilterKeyRef.current = filterKey;
      if (searchParams.get("page")) updateParams({ page: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterKey]);

  // URL 中的 page 超出总页数（如筛选后列表变短）时归一化
  useEffect(() => {
    if (rawPage > pageCount) {
      updateParams({ page: pageCount > 1 ? String(pageCount) : null });
    }
  }, [rawPage, pageCount, updateParams]);

  const activeFilters: Array<{ key: string; label: string; clear: () => void }> = [];
  if (q) activeFilters.push({ key: "q", label: `“${q}”`, clear: () => updateParams({ q: null }) });
  if (!presetType && typeParam)
    activeFilters.push({
      key: "type",
      label: TYPE_META[typeParam]?.label ?? typeParam,
      clear: () => updateParams({ type: null }),
    });
  if (category)
    activeFilters.push({
      key: "category",
      label: CATEGORIES.find((c) => c.id === category)?.label ?? category,
      clear: () => updateParams({ category: null }),
    });
  for (const t of techs)
    activeFilters.push({ key: `tech-${t}`, label: t, clear: () => toggleCsv("tech", techs, t) });
  for (const s of styles)
    activeFilters.push({ key: `style-${s}`, label: s, clear: () => toggleCsv("style", styles, s) });
  for (const d of difficulties)
    activeFilters.push({
      key: `diff-${d}`,
      label: DIFFICULTY_META[d]?.label ?? d,
      clear: () => toggleCsv("diff", difficulties, d),
    });
  for (const f of features)
    activeFilters.push({
      key: `feat-${f}`,
      label: FEATURES.find((x) => x.id === f)?.label ?? f,
      clear: () => toggleCsv("feat", features, f),
    });

  const clearAll = () => {
    const params = new URLSearchParams();
    if (presetType) params.set("type", presetType);
    router.replace(params.toString() ? `${pathname}?${params}` : pathname, { scroll: false });
  };

  const filterPanel = (
    <FilterPanelContent
      presetType={presetType}
      typeParam={typeParam}
      category={category}
      categoryCounts={categoryCounts}
      techs={techs}
      styles={styles}
      allStyles={allStyles}
      difficulties={difficulties}
      features={features}
      onType={(value) => updateParams({ type: value || null })}
      onCategory={(value) => updateParams({ category: value || null })}
      onToggleTech={(value) => toggleCsv("tech", techs, value)}
      onToggleStyle={(value) => toggleCsv("style", styles, value)}
      onToggleDifficulty={(value) => toggleCsv("diff", difficulties, value)}
      onToggleFeature={(value) => toggleCsv("feat", features, value)}
    />
  );

  return (
    <div className="mx-auto max-w-[1440px] px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      {/* 紧凑标题行：标题 + 实时计数，把空间让给网格 */}
      <header className="mb-4 flex items-baseline gap-3">
        <h1 className="text-3xl font-bold tracking-[-0.03em]">
          {presetType
            ? `${TYPE_META[presetType].plural}`
            : category
              ? CATEGORIES.find((c) => c.id === category)?.label ?? category
              : "探索"}
        </h1>
        <span
          key={filtered.length}
          className="anim-tick-in inline-block text-sm text-muted-foreground"
          role="status"
        >
          {filtered.length}
        </span>
      </header>

      {!presetType && (
        <div
          className="mb-5 flex gap-6 overflow-x-auto border-b border-border"
          role="tablist"
          aria-label="资源类型"
        >
          {TYPE_TABS.map((tab) => {
            const active = typeParam === tab.value;
            return (
              <button
                key={tab.value || "all"}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => updateParams({ type: tab.value || null, category: null })}
                className={cn(
                  "relative shrink-0 pb-3 text-[13px] font-medium transition-colors",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {tab.label}
                {active && <span className="absolute inset-x-0 -bottom-px h-px bg-foreground" />}
              </button>
            );
          })}
        </div>
      )}

      {/* Toolbar：贴住移动端顶栏 / 桌面视口顶 */}
      <div className="sticky top-14 z-20 -mx-4 mb-4 flex flex-wrap items-center gap-2 border-b border-border/80 bg-background/92 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:top-0 lg:-mx-8 lg:px-8">
        <div className="relative min-w-52 flex-1 sm:max-w-md">
          <Search
            size={14}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="search"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder="搜索资源…"
            aria-label="搜索资源"
            className="h-10 w-full rounded-full border border-border bg-surface pl-10 pr-3 text-[13px] outline-none transition-colors placeholder:text-muted-foreground focus:border-border-strong"
          />
        </div>
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-surface px-3.5 text-[13px] transition-colors hover:border-border-strong"
          aria-haspopup="dialog"
        >
          <SlidersHorizontal size={14} /> 筛选
          {activeFilters.length > 0 && (
            <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-semibold text-accent-foreground">
              {activeFilters.length}
            </span>
          )}
        </button>
        <div className="ml-auto flex items-center gap-2">
          <div className="relative">
            <select
              id="explore-sort"
              value={sort}
              onChange={(event) => updateParams({ sort: event.target.value })}
              className="h-10 appearance-none rounded-full border border-border bg-surface pl-3.5 pr-8 text-[13px] outline-none focus:border-border-strong"
            >
              {SORTS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={13}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
          </div>
          <Segmented
            size="md"
            ariaLabel="Grid density"
            value={density}
            onChange={(value) => updateParams({ view: value === "compact" ? "compact" : null })}
            options={[
              { value: "comfortable", icon: <LayoutGrid size={13} />, title: "Comfortable grid" },
              { value: "compact", icon: <Rows3 size={13} />, title: "Compact grid" },
            ]}
          />
        </div>
      </div>

      {/* Active filter chips */}
      {activeFilters.length > 0 && (
        <div className="mb-7 flex flex-wrap items-center gap-1.5">
          {activeFilters.map((filter, index) => (
            <button
              key={filter.key}
              type="button"
              onClick={filter.clear}
              className="anim-chip-in inline-flex items-center gap-1 rounded-full bg-surface-hover px-2.5 py-1 text-xs text-foreground transition-colors hover:bg-surface-active"
              style={{ animationDelay: `${Math.min(index, 8) * 30}ms` }}
            >
              {filter.label}
              <X size={11} className="text-muted-foreground" />
            </button>
          ))}
          <button
            type="button"
            onClick={clearAll}
            className="ml-1 text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
          >
            清除全部
          </button>
        </div>
      )}

      <div className="min-w-0 scroll-mt-28" ref={resultsRef}>
        {filtered.length === 0 ? (
          <div className="anim-card-in">
            <EmptyState
              icon={<Search />}
              title="没有符合筛选条件的资源"
              description="试试移除某个筛选条件，或换一个更宽泛的词，比如“按钮”“加载”。"
              action={
                <button
                  type="button"
                  onClick={clearAll}
                  className="rounded-md bg-accent px-3.5 py-2 text-[13px] font-medium text-accent-foreground"
                >
                  清除全部筛选
                </button>
              }
            />
          </div>
        ) : (
          <>
            {/* key 绑定筛选/翻页：条件变化时整组交错重放入场 */}
            <div
              key={`${filterKey}-${page}`}
              className={cn(
                "grid gap-x-6 gap-y-12",
                typeParam === "layout" || typeParam === "template"
                  ? // 区块/模板用两列大图，保证内容可读
                    "grid-cols-1 sm:grid-cols-2"
                  : density === "comfortable"
                    ? "sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
              )}
            >
              {filtered
                .slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
                .map((meta, index) => (
                  <div
                    key={meta.slug}
                    className="anim-card-in"
                    style={{ animationDelay: `${Math.min(index, 11) * 45}ms` }}
                  >
                    <ResourceCard meta={meta} density={density} />
                  </div>
                ))}
            </div>
            {pageCount > 1 && (
              <nav
                className="mt-14 flex items-center justify-center gap-1.5"
                aria-label="分页导航"
              >
                <button
                  type="button"
                  onClick={() => gotoPage(page - 1)}
                  disabled={page <= 1}
                  className="h-9 rounded-full border border-border bg-surface px-4 text-[13px] font-medium transition-colors hover:border-border-strong disabled:cursor-not-allowed disabled:opacity-40"
                >
                  上一页
                </button>
                {pageItems(pageCount, page).map((item, index) =>
                  item === "…" ? (
                    <span
                      key={`ellipsis-${index}`}
                      className="inline-flex h-9 items-center px-1 text-xs text-muted-foreground"
                      aria-hidden="true"
                    >
                      …
                    </span>
                  ) : (
                    <button
                      key={item}
                      type="button"
                      onClick={() => gotoPage(item)}
                      aria-current={item === page ? "page" : undefined}
                      className={cn(
                        "inline-flex h-9 min-w-9 items-center justify-center rounded-full px-2 text-[13px] font-medium transition-colors",
                        item === page
                          ? "bg-accent text-accent-foreground"
                          : "border border-border bg-surface text-muted-foreground hover:border-border-strong hover:text-foreground",
                      )}
                    >
                      {item}
                    </button>
                  ),
                )}
                <button
                  type="button"
                  onClick={() => gotoPage(page + 1)}
                  disabled={page >= pageCount}
                  className="h-9 rounded-full border border-border bg-surface px-4 text-[13px] font-medium transition-colors hover:border-border-strong disabled:cursor-not-allowed disabled:opacity-40"
                >
                  下一页
                </button>
              </nav>
            )}
          </>
        )}
      </div>

      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="筛选资源"
        className="sm:inset-x-auto sm:bottom-4 sm:right-4 sm:w-[420px] sm:rounded-2xl sm:border"
      >
        {filterPanel}
        <button
          type="button"
          onClick={() => setDrawerOpen(false)}
          className="mt-5 w-full rounded-md bg-accent py-2.5 text-[13px] font-medium text-accent-foreground"
        >
          显示 {filtered.length} 个结果
        </button>
      </Drawer>
    </div>
  );
}

function parseCsv(value: string | null): string[] {
  return value ? value.split(",").filter(Boolean) : [];
}

/** 生成页码序列：首尾常驻，当前页 ±1 展开窗口，间隙用省略号占位。 */
function pageItems(total: number, current: number): Array<number | "…"> {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const items: Array<number | "…"> = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  if (start > 2) items.push("…");
  for (let p = start; p <= end; p++) items.push(p);
  if (end < total - 1) items.push("…");
  items.push(total);
  return items;
}

interface FilterPanelContentProps {
  presetType?: string;
  typeParam: string;
  category: string;
  categoryCounts: Record<string, number>;
  techs: string[];
  styles: string[];
  allStyles: string[];
  difficulties: string[];
  features: string[];
  onType: (value: string) => void;
  onCategory: (value: string) => void;
  onToggleTech: (value: string) => void;
  onToggleStyle: (value: string) => void;
  onToggleDifficulty: (value: string) => void;
  onToggleFeature: (value: string) => void;
}

function FilterPanelContent(props: FilterPanelContentProps) {
  const {
    presetType,
    typeParam,
    category,
    categoryCounts,
    techs,
    styles,
    allStyles,
    difficulties,
    features,
    onType,
    onCategory,
    onToggleTech,
    onToggleStyle,
    onToggleDifficulty,
    onToggleFeature,
  } = props;
  const availableCategories = CATEGORIES.filter((item) => {
    if (!presetType) return true;
    if (presetType === "component") {
      return item.group === "Components" || item.group === "Primitives";
    }
    if (presetType === "animation") return item.group === "Motion";
    if (presetType === "layout") return item.group === "Blocks";
    return item.group === "Pages";
  });
  return (
    <div className="space-y-6">
      {!presetType && (
        <FilterGroup title="类型">
          <RadioRow label="全部类型" checked={!typeParam} onSelect={() => onType("")} />
          {RESOURCE_TYPES.map((type) => (
            <RadioRow
              key={type}
              label={TYPE_META[type].plural}
              checked={typeParam === type}
              onSelect={() => onType(type)}
            />
          ))}
        </FilterGroup>
      )}

      <FilterGroup title="分类">
        <RadioRow label="全部分类" checked={!category} onSelect={() => onCategory("")} />
        {availableCategories.map((c) => (
          <RadioRow
            key={c.id}
            label={c.label}
            count={categoryCounts[c.id] ?? 0}
            checked={category === c.id}
            onSelect={() => onCategory(c.id === category ? "" : c.id)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="技术栈">
        {TECHS.map((tech) => (
          <CheckRow
            key={tech}
            label={tech}
            checked={techs.includes(tech)}
            onToggle={() => onToggleTech(tech)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="设计风格">
        {allStyles.map((style) => (
          <CheckRow
            key={style}
            label={style}
            checked={styles.includes(style)}
            onToggle={() => onToggleStyle(style)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="难度">
        {(Object.keys(DIFFICULTY_META) as Difficulty[]).map((difficulty) => (
          <CheckRow
            key={difficulty}
            label={DIFFICULTY_META[difficulty].label}
            checked={difficulties.includes(difficulty)}
            onToggle={() => onToggleDifficulty(difficulty)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="更多条件">
        {FEATURES.map((feature) => (
          <CheckRow
            key={feature.id}
            label={feature.label}
            checked={features.includes(feature.id)}
            onToggle={() => onToggleFeature(feature.id)}
          />
        ))}
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {title}
      </legend>
      <div className="space-y-0.5">{children}</div>
    </fieldset>
  );
}

function RadioRow({
  label,
  count,
  checked,
  onSelect,
}: {
  label: string;
  count?: number;
  checked: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      onClick={onSelect}
      className={cn(
        "flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-[13px] transition-colors duration-fast",
        checked
          ? "bg-accent-soft font-medium text-accent"
          : "text-muted-foreground hover:bg-surface-hover hover:text-foreground",
      )}
    >
      <span className="truncate">{label}</span>
      {typeof count === "number" && <span className="text-xs opacity-70">{count}</span>}
    </button>
  );
}

function CheckRow({
  label,
  checked,
  onToggle,
}: {
  label: string;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-[13px] text-muted-foreground transition-colors hover:bg-surface-hover hover:text-foreground">
      <input
        type="checkbox"
        checked={checked}
        onChange={onToggle}
        className="h-3.5 w-3.5 rounded border-border accent-[var(--accent)]"
      />
      <span className="truncate">{label}</span>
    </label>
  );
}
