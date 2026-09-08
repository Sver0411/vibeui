import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "kanban-board",
  slug: "kanban-board",
  name: "看板模板",
  description:
    "三列任务看板：卡片支持 HTML5 拖拽跨列（含插入位置指示线），每张卡带 ◀ ▶ 移动按钮作为键盘友好回退，列内可直接新增任务，卡片含标签、负责人与截止日。",
  category: "templates",
  subcategory: "Board",
  type: "page",
  tags: ["看板", "拖拽", "任务管理", "kanban", "页面模板"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["极简"],
  difficulty: "intermediate",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "拖拽与按钮移动不变，无过渡动画",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-05",
  updatedAt: "2026-09-05",
  dir: "templates/kanban-board",
};
