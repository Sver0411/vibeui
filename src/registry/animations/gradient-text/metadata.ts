import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "gradient-text",
  slug: "gradient-text",
  name: "渐变流动文字",
  description:
    "background-clip: text 实现的渐变文字：多档色标线性渐变随时间横向流动，含青绿单色系、多色极光与静态无动画三个变体，选中文字有回退配色。",
  category: "animations",
  subcategory: "Text",
  type: "animation",
  tags: ["渐变文字", "流动", "background-clip", "hero", "标题", "纯 CSS"],
  technologies: ["HTML", "CSS"],
  styles: ["极简"],
  difficulty: "beginner",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "CSS",
  performanceTier: "light",
  reducedMotionFallback: "停止流动动画，渐变定格为静态",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-02",
  updatedAt: "2026-09-02",
  dir: "animations/gradient-text",
};
