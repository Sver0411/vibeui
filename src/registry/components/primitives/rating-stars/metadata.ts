import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "rating-stars",
  slug: "rating-stars",
  name: "评分星",
  description:
    "clip-path 绘制的五角星评分：悬停按半星预览、点击确认、方向键以 0.5 微调，另含只读小数展示与尺寸配色变体。",
  category: "primitives",
  subcategory: "Rating",
  type: "component",
  tags: ["评分", "星级", "半星", "键盘可达", "微交互"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["极简"],
  difficulty: "intermediate",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "取消缩放过渡，评分变化即时完成",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-08-31",
  updatedAt: "2026-08-31",
  dir: "components/primitives/rating-stars",
};
