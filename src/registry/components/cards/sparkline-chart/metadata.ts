import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "sparkline-chart",
  slug: "sparkline-chart",
  name: "迷你走势卡",
  description:
    "三张 KPI 迷你图卡片：折线 sparkline（描边生长 + 渐变面积）与迷你柱状两种形态，数据由 JS 归一化生成路径，悬浮显示最近数据点与数值提示，遵循涨红跌绿惯例。",
  category: "cards",
  subcategory: "Data",
  type: "component",
  tags: ["sparkline", "迷你图", "KPI", "走势", "涨红跌绿"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["极简"],
  difficulty: "intermediate",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "走势线与柱状直接完整显示",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-05",
  updatedAt: "2026-09-05",
  dir: "components/cards/sparkline-chart",
};
