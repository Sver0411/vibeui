import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "emoji-picker",
  slug: "emoji-picker",
  name: "表情选择器",
  description:
    "表情选择器：五个分类标签 + 关键词搜索 + 最近使用记录，选中即时回显；网格悬浮放大，listbox/tablist 语义完整。",
  category: "forms",
  subcategory: "Picker",
  type: "component",
  tags: ["表情", "emoji", "选择器", "分类", "搜索"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["活泼"],
  difficulty: "intermediate",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "悬浮不再放大，交互不变",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-05",
  updatedAt: "2026-09-05",
  dir: "components/forms/emoji-picker",
};
