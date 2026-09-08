import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "gallery-page",
  slug: "gallery-page",
  name: "图库灯箱页",
  description:
    "作品集模板：12 幅程序化渐变作品（无图片资源）组成错落网格，点击打开灯箱（dialog 语义 + 焦点管理），支持左右箭头/键盘方向键切换、ESC 与遮罩关闭，关闭后焦点归还。",
  category: "templates",
  subcategory: "Gallery",
  type: "page",
  tags: ["图库", "灯箱", "作品集", "渐变", "页面模板"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["极简"],
  difficulty: "intermediate",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "灯箱与缩略图无过渡动画，交互不变",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-05",
  updatedAt: "2026-09-05",
  dir: "templates/gallery-page",
};
