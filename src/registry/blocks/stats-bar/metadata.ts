import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "stats-bar",
  slug: "stats-bar",
  name: "数据统计条",
  description:
    "三种数据展示区块：分隔线条式、带同比涨跌的卡片网格、深色版。数字使用等宽数字对齐，窄屏由四列转两列并改用行间距代替竖线。",
  category: "blocks",
  subcategory: "Stats",
  type: "layout",
  tags: ["数据", "统计", "指标", "仪表盘", "纯 CSS"],
  technologies: ["HTML", "CSS"],
  styles: ["极简"],
  difficulty: "beginner",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "CSS",
  performanceTier: "light",
  reducedMotionFallback: "卡片悬停抬升取消",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-08-31",
  updatedAt: "2026-08-31",
  dir: "blocks/stats-bar",
};
