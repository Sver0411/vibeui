import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "context-menu",
  slug: "context-menu",
  name: "右键菜单",
  description:
    "自定义 contextmenu 菜单：分组分隔线、快捷键提示、禁用与危险项，触屏长按等效触发，坐标自动收进视口，支持方向键导航与 ESC 关闭。",
  category: "primitives",
  subcategory: "Overlay",
  type: "component",
  tags: ["右键", "contextmenu", "上下文菜单", "长按", "menu"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["极简"],
  difficulty: "intermediate",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "菜单无缩放入场动画，直接显示",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-05",
  updatedAt: "2026-09-05",
  dir: "components/primitives/context-menu",
};
