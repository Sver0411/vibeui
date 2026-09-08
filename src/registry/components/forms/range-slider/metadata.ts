import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "range-slider",
  slug: "range-slider",
  name: "区间滑块",
  description:
    "Pointer Events 驱动的滑块三形态：单值、双端区间（自动防交叉）与步进刻度吸附，支持方向键 / PageUp / Home / End，全部同步 aria-valuetext。",
  category: "forms",
  subcategory: "Slider",
  type: "component",
  tags: ["滑块", "区间选择", "拖拽", "步进", "键盘可达", "表单"],
  technologies: ["HTML", "CSS", "JavaScript", "React"],
  styles: ["极简"],
  difficulty: "intermediate",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "关闭填充与拇指的过渡动画，数值即时跳变",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-02",
  updatedAt: "2026-09-02",
  dir: "components/forms/range-slider",
};
