import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "tag-input",
  slug: "tag-input",
  name: "标签输入框",
  description:
    "chip 式标签输入：回车添加、退格删除末位、逐个移除，重复或超上限时抖动报错；另含彩色只读变体，chip 以弹性缩放进场。",
  category: "forms",
  subcategory: "Input",
  type: "component",
  tags: ["标签", "chip", "输入框", "去重", "表单", "微交互"],
  technologies: ["HTML", "CSS", "JavaScript", "React"],
  styles: ["极简"],
  difficulty: "intermediate",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "去掉抖动与进场缩放动画，增删即时完成",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-02",
  updatedAt: "2026-09-02",
  dir: "components/forms/tag-input",
};
