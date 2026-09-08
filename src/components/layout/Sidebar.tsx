"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Blocks,
  Boxes,
  Compass,
  Heart,
  Images,
  Search,
  Shapes,
  Sparkles,
  SlidersHorizontal,
  TerminalSquare,
  Type,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui";
import { useFavorites } from "@/store/favorites";
import { IconButton } from "@/components/common/IconButton";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";

const PRIMARY_NAV = [
  { href: "/components", label: "组件", icon: Boxes },
  { href: "/animations", label: "动效", icon: Sparkles },
  { href: "/icons", label: "图标", icon: Shapes },
  { href: "/blocks", label: "区块", icon: Blocks },
  { href: "/templates", label: "模板", icon: Images },
];

const SECONDARY_NAV = [
  { href: "/explore", label: "全部资源", icon: Compass },
  { href: "/prompts", label: "提示词", icon: Type },
  { href: "/playground", label: "调试台", icon: TerminalSquare },
  { href: "/settings", label: "设置", icon: SlidersHorizontal },
];

function useActive() {
  const pathname = usePathname();
  return (href: string) => pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({
  href,
  label,
  icon: Icon,
  active,
  compact,
}: {
  href: string;
  label: string;
  icon: typeof Boxes;
  active: boolean;
  compact?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative flex items-center rounded-xl text-[13px] font-medium transition-colors duration-fast",
        compact ? "flex-col gap-1 px-3 py-2 text-[10px]" : "gap-2.5 px-3 py-2",
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {/* 滑入的激活胶囊 */}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 rounded-xl bg-surface-active transition-opacity duration-fast",
          active ? "opacity-100" : "opacity-0 group-hover:opacity-60",
        )}
      />
      <span aria-hidden="true" className="relative z-10 flex items-center gap-2.5">
        <Icon
          size={compact ? 18 : 15}
          strokeWidth={2.1}
          className={cn(
            "transition-transform duration-normal group-hover:-translate-y-px group-active:scale-90",
            active && "text-accent",
          )}
        />
        {label}
      </span>
    </Link>
  );
}

/** 桌面左侧栏 + 移动端顶栏/底部标签栏。 */
export function Sidebar() {
  const isActive = useActive();
  const setCommandOpen = useUIStore((s) => s.setCommandOpen);
  const favoritesCount = useFavorites((s) => Object.keys(s.favorites).length);

  return (
    <>
      {/* ---- 桌面左侧栏 ---- */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[212px] flex-col border-r border-border bg-background/95 backdrop-blur-xl lg:flex">
        <div className="flex h-16 items-center px-5">
          <Link href="/" aria-label={`${siteConfig.name} 首页`}>
            <Logo />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setCommandOpen(true)}
          className="mx-3 mb-4 flex h-9 items-center gap-2 rounded-xl bg-surface-hover px-3 text-[13px] text-muted-foreground transition-colors duration-fast hover:text-foreground"
          aria-label="搜索资源"
        >
          <Search size={14} />
          <span>搜索</span>
          <kbd className="ml-auto rounded-md border border-border bg-surface px-1.5 py-0.5 text-[10px] font-medium">
            ⌘K
          </kbd>
        </button>

        <nav aria-label="Primary" className="flex flex-col gap-0.5 px-3">
          {PRIMARY_NAV.map((link) => (
            <NavLink key={link.href} {...link} active={isActive(link.href)} />
          ))}
        </nav>

        <div className="mt-5 mb-2 px-6 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70">
          更多
        </div>
        <nav aria-label="Secondary" className="flex flex-col gap-0.5 px-3">
          {SECONDARY_NAV.map((link) => (
            <NavLink key={link.href} {...link} active={isActive(link.href)} />
          ))}
        </nav>

        <div className="mt-auto flex items-center gap-1 border-t border-border px-3 py-3">
          <Link href="/favorites" className="relative inline-flex" aria-label="我的收藏">
            <IconButton label="我的收藏">
              <Heart size={16} />
            </IconButton>
            {favoritesCount > 0 && (
              <span className="pointer-events-none absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[9px] font-semibold text-accent-foreground">
                {favoritesCount > 99 ? "99+" : favoritesCount}
              </span>
            )}
          </Link>
          <ThemeToggle />
        </div>
      </aside>

      {/* ---- 移动端顶栏 ---- */}
      <header className="sticky top-0 z-40 flex h-14 items-center gap-1 border-b border-border bg-background/90 px-4 backdrop-blur-xl lg:hidden">
        <Link href="/" className="mr-auto flex items-center" aria-label={`${siteConfig.name} 首页`}>
          <Logo />
        </Link>
        <IconButton label="搜索" onClick={() => setCommandOpen(true)}>
          <Search size={16} />
        </IconButton>
        <Link href="/favorites" className="relative inline-flex" aria-label="我的收藏">
          <IconButton label="我的收藏">
            <Heart size={16} />
          </IconButton>
          {favoritesCount > 0 && (
            <span className="pointer-events-none absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[9px] font-semibold text-accent-foreground">
              {favoritesCount > 99 ? "99+" : favoritesCount}
            </span>
          )}
        </Link>
        <ThemeToggle />
      </header>

      {/* ---- 移动端底部标签栏 ---- */}
      <nav
        aria-label="Primary"
        className="fixed inset-x-0 bottom-0 z-40 flex items-stretch justify-around border-t border-border bg-background/90 pb-[max(env(safe-area-inset-bottom),4px)] pt-1.5 backdrop-blur-xl lg:hidden"
      >
        {PRIMARY_NAV.map((link) => (
          <NavLink key={link.href} {...link} compact active={isActive(link.href)} />
        ))}
      </nav>
    </>
  );
}
