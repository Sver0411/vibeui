import type { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { RESOURCES } from "@/registry";
import { PREFIX } from "@/lib/storage/keys";
import { PreferencesProvider } from "@/components/layout/PreferencesProvider";
import { Toaster } from "@/components/common/Toaster";
import { OverlaysLoader } from "@/components/dialogs/OverlaysLoader";
import "./globals.css";

/** 把描述里的 {count} 换成注册表的真实数量，避免手写数字随资源增加而过时。 */
const description = siteConfig.description.replace("{count}", String(RESOURCES.length));

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description,
  applicationName: siteConfig.name,
  keywords: [
    "vibe coding",
    "UI 组件",
    "CSS 特效",
    "JavaScript 动效",
    "React 组件",
    "AI 提示词",
    "前端资源",
    "页面模板",
    "复制即用代码",
  ],
  authors: [{ name: siteConfig.author }],
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0d" },
  ],
};

/**
 * Applies persisted preferences before first paint (prevents theme flash).
 * Mirrors the logic in PreferencesProvider; kept dependency-free.
 */
const THEME_INIT_SCRIPT = `(function(){try{var raw=localStorage.getItem("${PREFIX}preferences");var parsed=raw?JSON.parse(raw):null;var p=(parsed&&parsed.state)||parsed||{};var mode=p.theme||"system";var dark=mode==="dark"||(mode==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);var el=document.documentElement;el.dataset.theme=dark?"dark":"light";el.dataset.accent=p.accent||"graphite";el.dataset.density=p.density||"default";el.dataset.radius=p.radius||"default";el.dataset.motion=p.motion||"full";}catch(e){document.documentElement.dataset.theme="light";}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <PreferencesProvider>
          {children}
          <Toaster />
          <OverlaysLoader />
        </PreferencesProvider>
      </body>
    </html>
  );
}
