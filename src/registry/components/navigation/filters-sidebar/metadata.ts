import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "filters-sidebar",
  slug: "filters-sidebar",
  name: "筛选侧栏",
  description:
    "商品筛选侧栏：关键词、分类复选组、价格上限滑杆、有货开关组合过滤，结果区实时同步匹配数与可移除的条件 chips，一键清除全部，移动端折叠为抽屉。",
  category: "navigation",
  subcategory: "Filter",
  type: "component",
  tags: ["筛选", "侧栏", "多面筛选", "chips", "滑杆"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["极简"],
  difficulty: "intermediate",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "结果项无入场动画，其余交互不变",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-05",
  updatedAt: "2026-09-05",
  dir: "components/navigation/filters-sidebar",
};
