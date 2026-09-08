import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "bottom-sheet",
  slug: "bottom-sheet",
  name: "底部弹层",
  description:
    "移动端风格的底部弹层：把手可拖拽跟手，下滑超过阈值或快速甩动即关闭，否则弹性回位；支持遮罩、取消按钮与 ESC 关闭，适配安全区。",
  category: "navigation",
  subcategory: "Overlay",
  type: "component",
  tags: ["底部弹层", "拖拽手势", "分享面板", "移动端", "浮层", "把手"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["极简"],
  difficulty: "intermediate",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "面板瞬现瞬隐，拖拽仍可用但无回弹过渡",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-02",
  updatedAt: "2026-09-02",
  dir: "components/navigation/bottom-sheet",
};
