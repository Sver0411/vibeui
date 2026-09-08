import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "pagination",
  slug: "pagination",
  name: "分页器",
  description:
    "页码窗口稳定的分页控件：首末两页常驻、当前页左右各留一页、两侧可同时折叠为省略号；另含只保留上下页与进度数字的紧凑模式。",
  category: "navigation",
  subcategory: "Pagination",
  type: "component",
  tags: ["分页", "页码", "导航", "键盘可达", "移动端适配"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["极简"],
  difficulty: "intermediate",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "按下缩放反馈取消，页码切换保持可用",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-08-31",
  updatedAt: "2026-08-31",
  dir: "components/navigation/pagination",
};
