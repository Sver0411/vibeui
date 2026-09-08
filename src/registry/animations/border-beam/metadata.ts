import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "border-beam",
  slug: "border-beam",
  name: "边框光束",
  description:
    "卡片边框上巡游的光点：conic-gradient + @property --angle 注册角度插值实现纯 CSS 旋转，mask-composite 把渐变裁剪到 1px 边框；不支持的浏览器降级整圈微光。",
  category: "animations",
  subcategory: "Border",
  type: "animation",
  tags: ["边框光束", "border beam", "conic-gradient", "@property", "纯 CSS"],
  technologies: ["HTML", "CSS"],
  styles: ["科技"],
  difficulty: "advanced",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "CSS",
  performanceTier: "light",
  reducedMotionFallback: "光束停止旋转，改为静态渐变微光边框",
  compatibility: ["Chrome 85+", "Firefox 90+", "Safari 15.4+", "Edge 85+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-05",
  updatedAt: "2026-09-05",
  dir: "animations/border-beam",
};
