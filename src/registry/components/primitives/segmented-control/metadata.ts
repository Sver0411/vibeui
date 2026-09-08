import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "segmented-control",
  slug: "segmented-control",
  name: "分段控件",
  description:
    "滑块跟随选中项的分段切换器：选中态由原生 radio 驱动，JS 只负责测量滑块位置，因此方向键与表单语义开箱可用。含计数徽章与全宽等分两种变体。",
  category: "primitives",
  subcategory: "Segmented Control",
  type: "component",
  tags: ["分段控件", "切换", "Tabs", "滑块", "原生 radio"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["极简"],
  difficulty: "beginner",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "滑块切换改为瞬时到位，不产生位移动画",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-08-31",
  updatedAt: "2026-08-31",
  dir: "components/primitives/segmented-control",
};
