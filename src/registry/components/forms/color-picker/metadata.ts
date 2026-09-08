import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "color-picker",
  slug: "color-picker",
  name: "色板选择器",
  description:
    "radiogroup 语义的预设色板：圆形色块悬停放大、选中双圈描边，方向键在组内移动选色；预览区色块/名称/色值联动，选中色经 CSS 变量驱动按钮与徽章；附 React 受控版。",
  category: "forms",
  subcategory: "Picker",
  type: "component",
  tags: ["取色器", "色板", "swatch", "主题色", "radiogroup", "表单"],
  technologies: ["HTML", "CSS", "JavaScript", "React"],
  styles: ["极简"],
  difficulty: "beginner",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "色块无缩放过渡，选择即时生效",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-02",
  updatedAt: "2026-09-02",
  dir: "components/forms/color-picker",
};
