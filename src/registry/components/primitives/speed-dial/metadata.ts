import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "speed-dial",
  slug: "speed-dial",
  name: "悬浮操作组",
  description:
    "Material 风格 Speed Dial：FAB 点击展开一列子操作并 stagger 弹入，加号旋转成关闭；点击外部或 ESC 收起，子操作悬停出气泡标签，aria-expanded 与 aria-live 同步。",
  category: "primitives",
  subcategory: "FAB",
  type: "component",
  tags: ["FAB", "speed dial", "悬浮按钮", "操作组", "stagger", "微交互"],
  technologies: ["HTML", "CSS", "JavaScript", "React"],
  styles: ["极简"],
  difficulty: "intermediate",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "子操作直接显示，无弹入动画",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-02",
  updatedAt: "2026-09-02",
  dir: "components/primitives/speed-dial",
};
