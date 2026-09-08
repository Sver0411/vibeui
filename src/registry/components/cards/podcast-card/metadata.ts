import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "podcast-card",
  slug: "podcast-card",
  name: "播客卡",
  description: "播客单集卡：渐变封面字标、播放/暂停按钮切换、实时进度条与剩余时间、倍速切换。",
  category: "cards",
  subcategory: "Podcast",
  type: "component",
  tags: ["播客", "音频", "播放器", "进度条", "卡片"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["活泼", "商务"],
  difficulty: "intermediate",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-07",
  updatedAt: "2026-09-07",
  dir: "components/cards/podcast-card",
};
