import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "heat-map-calendar",
  slug: "heat-map-calendar",
  name: "贡献热力图",
  description:
    "GitHub 风格贡献热力图：列=周、行=星期的 CSS Grid（grid-auto-flow: column），五档绿色深浅，悬浮显示当日提交数与跟随光标的提示，底部汇总总数。",
  category: "primitives",
  subcategory: "DataViz",
  type: "component",
  tags: ["热力图", "贡献图", "GitHub", "日历", "数据可视化"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["极简"],
  difficulty: "intermediate",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "方块悬浮不再缩放，提示照常显示",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-05",
  updatedAt: "2026-09-05",
  dir: "components/primitives/heat-map-calendar",
};
