import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "pulse-ring",
  slug: "pulse-ring",
  name: "脉冲扩散环",
  description:
    "状态指示点的脉冲扩散动效：直播/录制/在线三种彩色的外圈由 ::before/::after 交错缩放淡出，离线态灰色静止；纯 CSS 实现，零脚本逻辑。",
  category: "animations",
  subcategory: "Indicator",
  type: "animation",
  tags: ["脉冲", "状态点", "直播", "在线", "纯 CSS"],
  technologies: ["HTML", "CSS"],
  styles: ["极简"],
  difficulty: "beginner",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "CSS",
  performanceTier: "light",
  reducedMotionFallback: "扩散环关闭，状态点静态显示",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-05",
  updatedAt: "2026-09-05",
  dir: "animations/pulse-ring",
};
