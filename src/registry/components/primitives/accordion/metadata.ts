import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "accordion",
  slug: "accordion",
  name: "手风琴",
  description:
    "通用手风琴：grid-template-rows 0fr→1fr 实现内容高度自适应展开动画，支持单开/多开模式切换，aria-expanded/region 语义完整，chevron 旋转指示。",
  category: "primitives",
  subcategory: "Disclosure",
  type: "component",
  tags: ["手风琴", "折叠面板", "展开收起", "FAQ", "disclosure"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["极简"],
  difficulty: "beginner",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "展开收起直接显隐，无过渡动画",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-05",
  updatedAt: "2026-09-05",
  dir: "components/primitives/accordion",
};
