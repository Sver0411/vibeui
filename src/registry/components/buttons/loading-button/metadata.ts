import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "loading-button",
  slug: "loading-button",
  name: "加载状态按钮",
  description: "点击提交：文案切换为旋转指示器，完成后打勾再复位。完整的交互状态机。",
  category: "buttons",
  subcategory: "Buttons",
  type: "component",
  tags: ["按钮", "加载", "异步", "状态"],
  technologies: ["HTML", "CSS", "JavaScript", "React"],
  styles: ["极简"],
  difficulty: "beginner",
  responsive: true,
  previewBackground: "light",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-07-12",
  updatedAt: "2026-08-10",
  dir: "components/buttons/loading-button",
};
