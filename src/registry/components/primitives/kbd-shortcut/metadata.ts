import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "kbd-shortcut",
  slug: "kbd-shortcut",
  name: "快捷键标签",
  description:
    "拟物键帽样式的快捷键标签：组合键、方向键图形键、Vim 式序列与深色界面变体，active 时键帽下沉模拟按压反馈。",
  category: "primitives",
  subcategory: "Shortcut",
  type: "component",
  tags: ["快捷键", "kbd", "键帽", "组合键", "深色", "纯 CSS"],
  technologies: ["HTML", "CSS"],
  styles: ["拟物", "极简"],
  difficulty: "beginner",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "CSS",
  performanceTier: "light",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-02",
  updatedAt: "2026-09-02",
  dir: "components/primitives/kbd-shortcut",
};
