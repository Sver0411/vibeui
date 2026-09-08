import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "stats-card",
  slug: "stats-card",
  name: "KPI 数据卡",
  description:
    "仪表盘高频 KPI 卡片：标签 + 涨跌徽章 + 大数值 + SVG 迷你走势线（描边生长动画），遵循中式行情惯例涨红跌绿，另含无走势线的紧凑变体。",
  category: "cards",
  subcategory: "Data",
  type: "component",
  tags: ["数据卡", "KPI", "涨跌", "走势线", "仪表盘", "红涨绿跌"],
  technologies: ["HTML", "CSS"],
  styles: ["极简"],
  difficulty: "beginner",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "CSS",
  performanceTier: "light",
  reducedMotionFallback: "走势线直接完整显示，卡片无悬浮位移",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-02",
  updatedAt: "2026-09-02",
  dir: "components/cards/stats-card",
};
