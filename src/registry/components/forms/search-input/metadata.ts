import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "search-input",
  slug: "search-input",
  name: "搜索输入框",
  description: "带防抖联想、方向键导航、最近搜索快捷标签与清空按钮的搜索框。",
  category: "forms",
  subcategory: "Inputs",
  type: "component",
  tags: ["输入框", "搜索", "联想", "防抖", "键盘"],
  technologies: ["HTML", "CSS", "JavaScript", "React"],
  styles: ["极简"],
  difficulty: "intermediate",
  responsive: true,
  previewBackground: "light",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-07-21",
  updatedAt: "2026-08-14",
  dir: "components/forms/search-input",
};
