"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, CornerDownLeft, FolderHeart, Search, Sparkles, X } from "lucide-react";
import { RESOURCES, CATEGORIES, COLLECTIONS } from "@/registry/client";
import { searchResources } from "@/lib/search/search";
import { TYPE_META } from "@/registry/categories";
import { useUIStore } from "@/store/ui";
import { useHistory } from "@/store/history";
import { useHotkeys } from "@/hooks/use-hotkeys";
import { Highlight } from "@/components/common/Highlight";
import { Kbd } from "@/components/common/Badge";
import { hotKeywords } from "@/config/site";
import { cn } from "@/lib/utils";

interface MenuResource {
  kind: "resource";
  slug: string;
  name: string;
  description: string;
  typeLabel: string;
}
interface MenuCollection {
  kind: "collection";
  slug: string;
  title: string;
}
interface MenuCategory {
  kind: "category";
  id: string;
  label: string;
}
interface MenuSearch {
  kind: "search";
  query: string;
}
type MenuItem = MenuResource | MenuCollection | MenuCategory | MenuSearch;

function itemKey(item: MenuItem, index: number): string {
  if (item.kind === "search") return `search-${item.query}-${index}`;
  if (item.kind === "category") return `category-${item.id}`;
  return `${item.kind}-${item.slug}`;
}

/** Global search palette (⌘K / Ctrl+K). */
export function CommandMenu() {
  const router = useRouter();
  const open = useUIStore((s) => s.commandOpen);
  const setCommandOpen = useUIStore((s) => s.setCommandOpen);
  const searches = useHistory((s) => s.searches);
  const addSearch = useHistory((s) => s.addSearch);
  const removeSearch = useHistory((s) => s.removeSearch);

  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useHotkeys({
    "mod+k": (event) => {
      event.preventDefault();
      setCommandOpen(!useUIStore.getState().commandOpen);
    },
  });

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActiveIndex(0);
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => inputRef.current?.focus(), 40);
    return () => {
      document.body.style.overflow = "";
      clearTimeout(timer);
    };
  }, [open]);

  const popularResources = useMemo(() => RESOURCES.filter((r) => r.popular).slice(0, 6), []);

  const { items, showRecents, showPopular } = useMemo(() => {
    const q = query.trim();
    if (!q) {
      const popular: MenuItem[] = popularResources.map((r) => ({
        kind: "resource" as const,
        slug: r.slug,
        name: r.name,
        description: r.description,
        typeLabel: TYPE_META[r.type]?.label ?? r.type,
      }));
      return { items: popular, showRecents: true, showPopular: true };
    }
    const matches = searchResources(RESOURCES, q).slice(0, 9);
    const lower = q.toLowerCase();
    const collectionMatches = COLLECTIONS.filter(
      (c) => c.title.toLowerCase().includes(lower) || c.description.toLowerCase().includes(lower),
    ).slice(0, 3);
    const categoryMatches = CATEGORIES.filter(
      (c) => c.label.toLowerCase().includes(lower) || c.description.toLowerCase().includes(lower),
    ).slice(0, 4);
    const menu: MenuItem[] = [
      ...matches.map(
        (m): MenuItem => ({
          kind: "resource" as const,
          slug: m.resource.slug,
          name: m.resource.name,
          description: m.resource.description,
          typeLabel: TYPE_META[m.resource.type]?.label ?? m.resource.type,
        }),
      ),
      ...collectionMatches.map(
        (c): MenuItem => ({ kind: "collection" as const, slug: c.slug, title: c.title }),
      ),
      ...categoryMatches.map(
        (c): MenuItem => ({ kind: "category" as const, id: c.id, label: c.label }),
      ),
    ];
    return { items: menu, showRecents: false, showPopular: false };
  }, [query, popularResources]);

  useEffect(() => setActiveIndex(0), [query]);

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const close = () => setCommandOpen(false);

  const execute = (item: MenuItem) => {
    close();
    if (item.kind === "resource") {
      if (query.trim()) addSearch(query.trim());
      router.push(`/item/${item.slug}`);
    } else if (item.kind === "collection") {
      router.push(`/collections/${item.slug}`);
    } else if (item.kind === "category") {
      router.push(`/explore?category=${item.id}`);
    } else {
      router.push(`/explore?q=${encodeURIComponent(item.query)}`);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (items.length > 0) setActiveIndex((i) => (i + 1) % items.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      if (items.length > 0) setActiveIndex((i) => (i - 1 + items.length) % items.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      const item = items[activeIndex];
      if (item) execute(item);
    } else if (event.key === "Escape") {
      event.preventDefault();
      close();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[10vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div className="absolute inset-0 bg-black/45" onClick={close} aria-hidden="true" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="搜索资源"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex max-h-[72vh] w-full max-w-xl flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-lg"
            onKeyDown={onKeyDown}
          >
            <div className="flex items-center gap-2.5 border-b border-border px-4">
              <Search size={15} className="shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="搜索资源、合集、分类…"
                aria-label="搜索关键词"
                className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            <div ref={listRef} className="flex-1 overflow-y-auto overscroll-contain p-2" role="listbox">
              {items.length === 0 && !query && (
                <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                  暂无热门资源。
                </p>
              )}
              {items.length === 0 && query.trim() && (
                <div className="px-3 py-10 text-center">
                  <p className="text-sm text-muted-foreground">没有找到与“{query}”匹配的内容。</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    试试“玻璃拟态”“加载动画”或“3D”这类关键词。
                  </p>
                </div>
              )}

              {showRecents && searches.length > 0 && (
                <>
                  <GroupLabel icon={<Clock size={11} />}>最近搜索</GroupLabel>
                  {searches.map((s) => (
                    <div
                      key={`recent-${s}`}
                      className="flex items-center justify-between gap-2 rounded-md px-3 py-2 hover:bg-surface-hover"
                    >
                      <button
                        type="button"
                        onClick={() => setQuery(s)}
                        className="min-w-0 flex-1 truncate text-left text-[13px]"
                      >
                        {s}
                      </button>
                      <button
                        type="button"
                        aria-label={`Remove search "${s}"`}
                        onClick={() => removeSearch(s)}
                        className="rounded p-1 text-muted-foreground hover:text-foreground"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </>
              )}

              {showPopular && items.length > 0 && (
                <>
                  <GroupLabel icon={<Sparkles size={11} />}>热门资源</GroupLabel>
                  {items.map((item, index) =>
                    item.kind === "resource" ? (
                      <Row key={itemKey(item, index)} active={activeIndex === index} onClick={() => execute(item)}>
                        <span className="flex min-w-0 flex-col">
                          <span className="truncate text-[13px]">{item.name}</span>
                          <span className="truncate text-xs text-muted-foreground">{item.typeLabel}</span>
                        </span>
                      </Row>
                    ) : null,
                  )}
                  <div className="flex flex-wrap gap-1.5 px-2 pb-1 pt-3">
                    {hotKeywords.map((keyword) => (
                      <button
                        key={keyword}
                        type="button"
                        onClick={() => setQuery(keyword)}
                        className="rounded-full border border-border px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
                      >
                        {keyword}
                      </button>
                    ))}
                  </div>
                </>
              )}

              {query.trim() &&
                items.map((item, index) => {
                  const active = index === activeIndex;
                  if (item.kind === "resource") {
                    return (
                      <Row key={itemKey(item, index)} active={active} onClick={() => execute(item)}>
                        <span className="flex min-w-0 flex-col">
                          <span className="truncate text-[13px]">
                            <Highlight text={item.name} query={query} />
                          </span>
                          <span className="truncate text-xs text-muted-foreground">
                            {item.typeLabel} · {item.description}
                          </span>
                        </span>
                      </Row>
                    );
                  }
                  if (item.kind === "collection") {
                    return (
                      <Row key={itemKey(item, index)} active={active} onClick={() => execute(item)}>
                        <span className="flex min-w-0 items-center gap-2">
                          <FolderHeart size={13} className="shrink-0 text-muted-foreground" />
                          <span className="truncate text-[13px]">
                            <Highlight text={item.title} query={query} />
                          </span>
                          <span className="ml-auto shrink-0 text-xs text-muted-foreground">合集</span>
                        </span>
                      </Row>
                    );
                  }
                  if (item.kind === "category") {
                    return (
                      <Row key={itemKey(item, index)} active={active} onClick={() => execute(item)}>
                        <span className="flex min-w-0 items-center gap-2">
                          <Sparkles size={13} className="shrink-0 text-muted-foreground" />
                          <span className="truncate text-[13px]">
                            <Highlight text={item.label} query={query} />
                          </span>
                          <span className="ml-auto shrink-0 text-xs text-muted-foreground">分类</span>
                        </span>
                      </Row>
                    );
                  }
                  return null;
                })}
            </div>

            <div className="flex items-center gap-4 border-t border-border px-4 py-2.5 text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Kbd>↑</Kbd>
                <Kbd>↓</Kbd> 选择
              </span>
              <span className="flex items-center gap-1.5">
                <Kbd>
                  <CornerDownLeft size={10} />
                </Kbd>
                open
              </span>
              <span className="flex items-center gap-1.5">
                <Kbd>Esc</Kbd> 关闭
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function GroupLabel({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <p className="flex items-center gap-1.5 px-3 pb-1 pt-3 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
      {icon}
      {children}
    </p>
  );
}

function Row({
  children,
  active,
  onClick,
  ...rest
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
} & React.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-left transition-colors duration-fast",
        active ? "bg-accent-soft text-accent" : "hover:bg-surface-hover",
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
