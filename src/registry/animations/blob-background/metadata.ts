import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "blob-background",
  slug: "blob-background",
  name: "果冻斑块背景",
  description:
    "有机形态背景：三个高斯模糊色斑以不同周期缓慢游走，border-radius 关键帧形变产生果冻呼吸感，内容浮于其上保持可读；纯 CSS 零依赖，hero 区块常用。",
  category: "animations",
  subcategory: "Background",
  type: "animation",
  tags: ["斑块背景", "blob", "渐变模糊", "有机形态", "hero", "纯 CSS"],
  technologies: ["HTML", "CSS"],
  styles: ["极简"],
  difficulty: "beginner",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "CSS",
  performanceTier: "medium",
  reducedMotionFallback: "色斑静止为静态构图，不再游走形变",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-02",
  updatedAt: "2026-09-02",
  dir: "animations/blob-background",
};
