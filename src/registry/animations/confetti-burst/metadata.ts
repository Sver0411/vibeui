import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "confetti-burst",
  slug: "confetti-burst",
  name: "纸屑庆祝",
  description:
    "点击按钮从按钮中心喷射约 110 片彩纸：随机初速、重力、旋转与左右摆动模拟纸片飘落，全舞台 canvas 绘制、结束后自动清场；遵循 prefers-reduced-motion 降级为文字庆祝。",
  category: "animations",
  subcategory: "Celebration",
  type: "animation",
  tags: ["纸屑", "庆祝", "彩带", "canvas", "粒子"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["活泼"],
  difficulty: "beginner",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "点击不喷射纸屑，改为文字庆祝提示",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-05",
  updatedAt: "2026-09-05",
  dir: "animations/confetti-burst",
};
