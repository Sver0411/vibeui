import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "docs-page",
  slug: "docs-page",
  name: "文档站模板",
  description:
    "三栏文档站布局：左侧固定站内导航、中间正文（提示框 + 代码块）+ 右侧页内目录，IntersectionObserver 滚动高亮当前章节，标题设 scroll-margin 防锚点贴顶，移动端折叠为单列。",
  category: "templates",
  subcategory: "Docs",
  type: "page",
  tags: ["文档站", "三栏布局", "scroll-spy", "目录", "页面模板"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["极简"],
  difficulty: "intermediate",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "目录高亮切换无过渡动画，滚动监听不变",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-05",
  updatedAt: "2026-09-05",
  dir: "templates/docs-page",
};
