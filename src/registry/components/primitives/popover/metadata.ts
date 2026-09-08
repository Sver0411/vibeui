import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "popover",
  slug: "popover",
  name: "点击浮层",
  description: "点击触发的锚定浮层，点外部或按 Esc 关闭，智能上下翻转变换方向，箭头跟随锚点。",
  category: "primitives",
  subcategory: "Popover",
  type: "component",
  tags: ["浮层", "弹出", "交互", "无障碍", "定位"],
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
  dir: "components/primitives/popover",
};
