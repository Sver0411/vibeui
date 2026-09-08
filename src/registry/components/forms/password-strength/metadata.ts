import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "password-strength",
  slug: "password-strength",
  name: "密码强度输入",
  description: "密码框：显示/隐藏切换、实时强度条与随输入逐项打勾的要求清单。",
  category: "forms",
  subcategory: "Inputs",
  type: "component",
  tags: ["输入框", "密码", "强度", "校验"],
  technologies: ["HTML", "CSS", "JavaScript", "React"],
  styles: ["极简"],
  difficulty: "intermediate",
  popular: true,
  responsive: true,
  previewBackground: "light",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-07-13",
  updatedAt: "2026-08-16",
  dir: "components/forms/password-strength",
};
