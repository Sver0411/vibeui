import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "pricing-table",
  slug: "pricing-table",
  name: "定价表",
  description:
    "三档定价区块：月付/年付切换、推荐方案高亮描边与徽章、CSS 绘制的包含/未包含清单，900px 以下自动堆叠并把推荐档提到最前。",
  category: "blocks",
  subcategory: "Pricing",
  type: "layout",
  tags: ["定价", "方案对比", "营销", "落地页", "CTA"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["极简"],
  difficulty: "beginner",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "价格淡入淡出与卡片抬升取消，切换结果即时呈现",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-08-31",
  updatedAt: "2026-08-31",
  dir: "blocks/pricing-table",
};
