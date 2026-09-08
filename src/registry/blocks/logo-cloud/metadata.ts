import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "logo-cloud",
  slug: "logo-cloud",
  name: "Logo 墙区块",
  description:
    "社交证明区块：静态网格与无缝滚动两种形态，滚动行双副本循环、悬停暂停、两侧渐隐遮罩，reduced-motion 下退化为可换行网格。",
  category: "blocks",
  subcategory: "Social Proof",
  type: "layout",
  tags: ["logo墙", "社交证明", "信任背书", "无缝滚动", "落地页", "区块"],
  technologies: ["HTML", "CSS"],
  styles: ["极简"],
  difficulty: "beginner",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "CSS",
  performanceTier: "light",
  reducedMotionFallback: "滚动行停止并退化为居中换行网格",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-02",
  updatedAt: "2026-09-02",
  dir: "blocks/logo-cloud",
};
