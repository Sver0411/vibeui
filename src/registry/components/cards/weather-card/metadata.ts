import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "weather-card",
  slug: "weather-card",
  name: "天气卡片",
  description:
    "天气卡片：渐变天幕上用纯 CSS 绘制太阳呼吸、云朵漂移与雨滴落下场景，含当前温度、逐小时条与五日预报列表，无任何图片资源。",
  category: "cards",
  subcategory: "Info",
  type: "component",
  tags: ["天气", "卡片", "CSS 绘图", "预报", "动效"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["活泼"],
  difficulty: "beginner",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "CSS",
  performanceTier: "light",
  reducedMotionFallback: "太阳、云、雨滴停止动画，静态显示",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-05",
  updatedAt: "2026-09-05",
  dir: "components/cards/weather-card",
};
