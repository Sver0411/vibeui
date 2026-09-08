import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "otp-input",
  slug: "otp-input",
  name: "验证码输入",
  description: "六格一次性验证码：自动前进、退格回退、多字符粘贴分发，输完自动提交。",
  category: "forms",
  subcategory: "Inputs",
  type: "component",
  tags: ["输入框", "验证码", "一次性密码", "粘贴"],
  technologies: ["HTML", "CSS", "JavaScript", "React"],
  styles: ["极简"],
  difficulty: "intermediate",
  popular: true,
  responsive: true,
  previewBackground: "light",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-07-17",
  updatedAt: "2026-08-18",
  dir: "components/forms/otp-input",
};
