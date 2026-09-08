import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "scroll-to-top",
  slug: "scroll-to-top",
  name: "回到顶部按钮",
  description:
    "长页回到顶部 FAB：滚动超过一屏 60% 浮现，外圈 SVG 进度环随页面滚动实时填充（stroke-dashoffset 驱动），点击平滑回顶，reduced-motion 下改即时跳转。",
  category: "primitives",
  subcategory: "Utility",
  type: "component",
  tags: ["回到顶部", "进度环", "滚动监听", "FAB", "长页面", "平滑滚动"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["极简"],
  difficulty: "beginner",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "点击改为即时跳转，进度环仍实时更新",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-02",
  updatedAt: "2026-09-02",
  dir: "components/primitives/scroll-to-top",
};
