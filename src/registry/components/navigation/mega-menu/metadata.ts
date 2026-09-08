import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "mega-menu",
  slug: "mega-menu",
  name: "大型菜单",
  description:
    "导航栏大型下拉菜单：多列链接分组 + 右侧特色推广卡，80ms 悬停意图延迟防误扫、200ms 离开缓冲，支持点击/键盘切换、ESC 关闭与点击外部关闭。",
  category: "navigation",
  subcategory: "Menu",
  type: "component",
  tags: ["大型菜单", "mega menu", "导航", "多列", "悬停意图"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["极简"],
  difficulty: "intermediate",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "面板无入场动画，交互逻辑不变",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-05",
  updatedAt: "2026-09-05",
  dir: "components/navigation/mega-menu",
};
