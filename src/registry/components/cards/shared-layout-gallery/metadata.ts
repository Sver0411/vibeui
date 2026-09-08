import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "shared-layout-gallery",
  slug: "shared-layout-gallery",
  name: "共享布局画廊",
  description:
    "用 FLIP 几何测量让卡片无缝展开为详情层，再沿原路径收回；包含焦点管理与快速操作保护。",
  category: "cards",
  subcategory: "Shared Layout Transition",
  type: "component",
  tags: ["FLIP", "共享元素", "展开", "画廊", "布局动画"],
  technologies: ["HTML", "CSS", "JavaScript", "Web Animations API", "React"],
  styles: ["编辑式", "实验性"],
  difficulty: "intermediate",
  featured: false,
  isNew: false,
  responsive: true,
  previewBackground: "light",
  engine: "Mixed",
  performanceTier: "medium",
  reducedMotionFallback: "直接打开或关闭详情层，不播放共享元素几何过渡。",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-08-31",
  updatedAt: "2026-08-31",
  dir: "components/cards/shared-layout-gallery",
};
