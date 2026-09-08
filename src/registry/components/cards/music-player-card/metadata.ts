import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "music-player-card",
  slug: "music-player-card",
  name: "音乐播放器卡",
  description:
    "播放器卡片：CSS 渐变封面叠加旋转黑胶（播放时才转动），进度条支持指针拖拽与键盘 ±5 秒，帧间隔驱动播放计时，含上一首/下一首与喜欢按钮。",
  category: "cards",
  subcategory: "Media",
  type: "component",
  tags: ["播放器", "音乐", "黑胶", "进度条", "媒体控制"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["活泼"],
  difficulty: "intermediate",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "黑胶唱片不旋转，播放与进度交互不变",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-05",
  updatedAt: "2026-09-05",
  dir: "components/cards/music-player-card",
};
