import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "number-counter",
  slug: "number-counter",
  name: "数字滚动",
  description: "统计数字进入视口时从 0 缓动滚动到位，支持千分位与小数，可重放。",
  category: "animations",
  subcategory: "Text",
  type: "animation",
  tags: ["数字", "计数", "统计", "视口观察", "缓动"],
  technologies: ["HTML", "CSS", "JavaScript", "React"],
  styles: ["后台", "极简"],
  difficulty: "intermediate",
  popular: true,
  responsive: true,
  previewBackground: "light",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-07-15",
  updatedAt: "2026-08-16",
  dir: "animations/number-counter",
};
