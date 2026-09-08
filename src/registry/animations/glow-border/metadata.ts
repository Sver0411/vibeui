import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "glow-border",
  slug: "glow-border",
  name: "辉光描边",
  description:
    "鼠标跟随辉光边框：pointermove 把坐标写入 CSS 变量，外层径向渐变透出边框光、内层同坐标叠加淡辉光；双层嵌套实现 1.5px 发光描边，离场辉光移出视野。",
  category: "animations",
  subcategory: "Hover",
  type: "animation",
  tags: ["辉光", "鼠标跟随", "边框", "CSS 变量", "hover"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["科技"],
  difficulty: "intermediate",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "静态渐变边框，不跟随指针",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-05",
  updatedAt: "2026-09-05",
  dir: "animations/glow-border",
};
