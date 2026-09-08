import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "skeleton-table",
  slug: "skeleton-table",
  name: "表格骨架屏",
  description:
    "数据加载前的占位骨架：表头与多行由不同宽度的微光条拼成，支持表格与列表两种版式切换；点击「重新加载」可循环演示「骨架 → 数据 → 骨架」的完整过程，容器同步维护 aria-busy 状态。",
  category: "progress",
  subcategory: "Skeleton",
  type: "component",
  tags: ["骨架屏", "skeleton", "加载占位", "微光", "shimmer", "表格", "无障碍"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["极简"],
  difficulty: "beginner",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "CSS",
  performanceTier: "light",
  reducedMotionFallback: "微光扫动停止，占位条改为静态浅灰",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-05",
  updatedAt: "2026-09-05",
  dir: "components/progress/skeleton-table",
};
