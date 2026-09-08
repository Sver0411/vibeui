import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "shake-feedback",
  slug: "shake-feedback",
  name: "错误抖动反馈",
  description:
    "表单校验失败时的横向 shake 抖动：配合红框与 role=alert 错误文案，输入即清除错误；prefers-reduced-motion 下抖动降级为两次红色高亮闪烁。",
  category: "animations",
  subcategory: "Feedback",
  type: "animation",
  tags: ["抖动", "表单校验", "错误提示", "shake", "无障碍"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["极简"],
  difficulty: "beginner",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "CSS",
  performanceTier: "light",
  reducedMotionFallback: "抖动改为红色高亮闪烁两次",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-05",
  updatedAt: "2026-09-05",
  dir: "animations/shake-feedback",
};
