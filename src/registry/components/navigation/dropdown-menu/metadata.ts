import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "dropdown-menu",
  slug: "dropdown-menu",
  name: "下拉菜单",
  description:
    "完整键盘语义的下拉菜单：↑↓ 循环移动焦点、Home/End 跳转、ESC 归还焦点、点击外部关闭；含危险操作分区与图标快捷键面板两种形态。",
  category: "navigation",
  subcategory: "Menu",
  type: "component",
  tags: ["下拉菜单", "键盘导航", "menu", "浮层", "危险操作", "无障碍"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["极简"],
  difficulty: "intermediate",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "菜单无入场缩放，其余交互不变",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-02",
  updatedAt: "2026-09-02",
  dir: "components/navigation/dropdown-menu",
};
