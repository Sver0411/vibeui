/**
 * Central site configuration.
 * Product name, logo text, copy and external links are all configured here so
 * they can be rebranded in one place.
 */
export const siteConfig = {
  /** Display name used in the header, metadata, exports and READMEs. */
  name: "VibeUI",
  /** Short wordmark shown in the logo. */
  wordmark: "VibeUI",
  /** One-line value proposition shown in the hero and meta tags. */
  tagline: "能跑、能抄、还能让 AI 照着做的界面素材库。",
  /**
   * SEO 描述。`{count}` 会在 layout.tsx 里被替换成注册表里的真实资源数量，
   * 这样新增资源后描述不会说谎；这里刻意不 import 注册表，避免把全部
   * 资源元数据打进客户端包。
   */
  description:
    "VibeUI 是面向 vibe coding 的界面素材库：共 {count} 个真实可运行资源，覆盖交互组件、生成式动效、页面区块与网站模板，并提供实时预览、可复制源码、项目下载，以及帮助 AI 准确复现效果的提示词术语。",
  /** Base URL used for canonical/OG metadata. Change when deploying. */
  url: "http://localhost:3000",
  /** Repository link shown in the header. Point this at your own repository. */
  githubUrl: "https://github.com/vibeui/vibeui",
  /** Author shown on exported READMEs and resource metadata fallback. */
  author: "VibeUI Team",
  /** Default license note rendered into exported project READMEs. */
  license: "MIT",
} as const;

/** Hot search keywords shown on the home hero. */
export const hotKeywords = [
  "像素溶解",
  "粒子流场",
  "反应扩散",
  "玻璃折射",
  "光标跟随",
  "落地页",
  "仪表盘",
  "玻璃拟态",
] as const;

/** Accent presets available in Settings → Appearance. */
export const accentPresets = [
  { id: "graphite", label: "石墨黑", swatch: { light: "#26262b", dark: "#ececee" } },
  { id: "teal", label: "青碧", swatch: { light: "#0f766e", dark: "#5eead4" } },
  { id: "amber", label: "琥珀", swatch: { light: "#b45309", dark: "#fcd34d" } },
  { id: "rose", label: "玫红", swatch: { light: "#be123c", dark: "#fda4af" } },
  { id: "indigo", label: "靛蓝", swatch: { light: "#4338ca", dark: "#a5b4fc" } },
] as const;

export type AccentId = (typeof accentPresets)[number]["id"];

/** Keyboard shortcuts surfaced in the UI. */
export const shortcuts = {
  search: "mod+k",
  save: "mod+s",
  run: "mod+enter",
  copyCode: "mod+shift+c",
  export: "mod+shift+e",
} as const;
