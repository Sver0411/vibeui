import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "faq-accordion",
  slug: "faq-accordion",
  name: "FAQ 手风琴",
  description:
    "基于原生 details/summary 的常见问题区块：用 grid-template-rows 0fr→1fr 做展开动画，无需测量内容高度；脚本接管开合以实现收起动画与单开互斥。",
  category: "blocks",
  subcategory: "FAQ",
  type: "layout",
  tags: ["FAQ", "手风琴", "折叠", "营销", "无障碍"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["极简"],
  difficulty: "intermediate",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "展开动画缩短为瞬时，开合与单开互斥行为不变",
  compatibility: ["Chrome 107+", "Firefox 66+", "Safari 16+", "Edge 107+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-08-31",
  updatedAt: "2026-08-31",
  dir: "blocks/faq-accordion",
};
