import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "counter-badge",
  slug: "counter-badge",
  name: "计数徽章",
  description:
    "通知计数徽章：超过 99 自动封顶显示 99+，数字变化时弹性跳动一次（尊重 reduced-motion），归零自动隐藏，aria-live 播报当前未读数。",
  category: "primitives",
  subcategory: "Indicator",
  type: "component",
  tags: ["徽章", "计数", "未读", "99+", "角标"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["极简"],
  difficulty: "beginner",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "数字变化不再跳动，直接更新",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-05",
  updatedAt: "2026-09-05",
  dir: "components/primitives/counter-badge",
};
