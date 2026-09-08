import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "auto-textarea",
  slug: "auto-textarea",
  name: "自适应文本域",
  description:
    "高度随内容自动增减的文本域：先收缩再测量保证只减不增，达到 max-height 后转内部滚动；右下角实时计数，超限变红提示。",
  category: "forms",
  subcategory: "Textarea",
  type: "component",
  tags: ["文本域", "自动增高", "字数统计", "maxlength", "表单"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["极简"],
  difficulty: "beginner",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-02",
  updatedAt: "2026-09-02",
  dir: "components/forms/auto-textarea",
};
