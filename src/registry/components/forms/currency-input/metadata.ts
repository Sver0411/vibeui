import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "currency-input",
  slug: "currency-input",
  name: "金额输入框",
  description: "实时千分位格式化的金额输入框：币种前缀、两位小数锁定、非法字符拦截与最大值约束。",
  category: "forms",
  subcategory: "Currency",
  type: "component",
  tags: ["金额输入", "千分位", "格式化", "表单", "金融"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["极简", "商务"],
  difficulty: "beginner",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-07",
  updatedAt: "2026-09-07",
  dir: "components/forms/currency-input",
};
