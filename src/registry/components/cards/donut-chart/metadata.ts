import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "donut-chart",
  slug: "donut-chart",
  name: "环形占比卡",
  description:
    "SVG 环形占比图卡片：每段用 pathLength=100 + stroke-dasharray 按百分比分割，加载时依次从 0 生长；中心显示总计或悬浮项，图例与扇区双向联动高亮。",
  category: "cards",
  subcategory: "Data",
  type: "component",
  tags: ["环形图", "占比", "SVG", "图例", "数据可视化"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["极简"],
  difficulty: "intermediate",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "扇区直接完整显示，无生长动画",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-05",
  updatedAt: "2026-09-05",
  dir: "components/cards/donut-chart",
};
