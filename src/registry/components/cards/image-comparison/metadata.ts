import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "image-comparison",
  slug: "image-comparison",
  name: "图片对比滑块",
  description:
    "Before/After 对比卡：分割线随手拖拽跟手，手柄支持方向键微调并同步 aria-valuenow；两侧场景为纯 CSS 渐变绘制（星星闪烁），零外部图片离线可运行。",
  category: "cards",
  subcategory: "Media",
  type: "component",
  tags: ["对比滑块", "before-after", "图像对比", "拖拽", "clip-path", "修图"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["极简"],
  difficulty: "intermediate",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "星星停止闪烁，拖拽与键盘对比功能不变",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-02",
  updatedAt: "2026-09-02",
  dir: "components/cards/image-comparison",
};
