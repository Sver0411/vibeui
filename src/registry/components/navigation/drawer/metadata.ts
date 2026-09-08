import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "drawer",
  slug: "drawer",
  name: "侧滑抽屉",
  description:
    "左右双向侧滑抽屉：遮罩淡入、面板缓动滑入，支持遮罩点击 / ESC 关闭，打开时焦点移入、关闭后归还触发按钮，含导航菜单与购物车两种内容形态。",
  category: "navigation",
  subcategory: "Overlay",
  type: "component",
  tags: ["抽屉", "侧滑", "遮罩", "购物车", "焦点管理", "浮层"],
  technologies: ["HTML", "CSS", "JavaScript", "React"],
  styles: ["极简"],
  difficulty: "intermediate",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "面板与遮罩瞬现瞬隐，跳过滑入滑出过渡",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-02",
  updatedAt: "2026-09-02",
  dir: "components/navigation/drawer",
};
