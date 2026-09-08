import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "shine-sweep",
  slug: "shine-sweep",
  name: "扫光高光",
  description:
    "表面掠过一道斜向光带的效果：hover 触发从左上滑到右下，或按周期自动循环；卡片、徽章、深色图片占位三种载体，::after 渐变条 skew 实现零依赖。",
  category: "animations",
  subcategory: "Surface",
  type: "animation",
  tags: ["扫光", "高光", "shine", "hover", "加载占位", "纯 CSS"],
  technologies: ["HTML", "CSS"],
  styles: ["极简"],
  difficulty: "beginner",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "CSS",
  performanceTier: "light",
  reducedMotionFallback: "自动扫光停止，hover 扫光不再滑动",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-02",
  updatedAt: "2026-09-02",
  dir: "animations/shine-sweep",
};
