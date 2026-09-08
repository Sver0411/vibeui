import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "inline-edit",
  slug: "inline-edit",
  name: "行内编辑",
  description: "点击文本原地变输入框，Enter 确认 Esc 取消，失焦自动保存，编辑中保持布局不跳动。",
  category: "forms",
  subcategory: "Inline Edit",
  type: "component",
  tags: ["行内编辑", "原地编辑", "表单", "交互", "无障碍"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["极简"],
  difficulty: "intermediate",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-05",
  updatedAt: "2026-09-05",
  dir: "components/forms/inline-edit",
};
