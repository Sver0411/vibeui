import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "theme-toggle",
  slug: "theme-toggle",
  name: "明暗切换开关",
  description:
    "日夜主题开关：太阳与月亮图标交叉淡变旋转，轨道随主题由灰转深夜蓝，滑块带回弹缓动；role=switch 语义，附深色卡片内的小尺寸变体。",
  category: "primitives",
  subcategory: "Toggle",
  type: "component",
  tags: ["主题切换", "明暗模式", "开关", "太阳月亮", "设置项", "微交互"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["极简"],
  difficulty: "beginner",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "滑块与图标瞬移，无回弹与旋转过渡",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-02",
  updatedAt: "2026-09-02",
  dir: "components/primitives/theme-toggle",
};
