import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "stepper-input",
  slug: "stepper-input",
  name: "数量步进器",
  description:
    "± 按钮步进器：单击 ±1、长按 400ms 后连发，到达边界自动禁用对应按钮，数值变化带弹动反馈，aria-live 播报当前值。",
  category: "forms",
  subcategory: "Stepper",
  type: "component",
  tags: ["步进器", "数量", "长按连发", "边界禁用", "购物车", "表单"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["极简"],
  difficulty: "beginner",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "去掉弹动动画，数值即时更新",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-02",
  updatedAt: "2026-09-02",
  dir: "components/forms/stepper-input",
};
