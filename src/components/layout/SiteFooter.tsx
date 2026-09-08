import Link from "next/link";
import { siteConfig } from "@/config/site";

const FOOTER_LINKS = [
  { href: "/explore", label: "全部资源" },
  { href: "/playground", label: "调试" },
  { href: "/settings", label: "设置" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>收藏与草稿仅保存在本机。</p>
        <nav aria-label="网站导航" className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              className="transition-colors hover:text-foreground"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
          <a
            className="transition-colors hover:text-foreground"
            href={siteConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </nav>
      </div>
    </footer>
  );
}
