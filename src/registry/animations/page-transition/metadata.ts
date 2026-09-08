import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "page-transition",
  slug: "page-transition",
  name: "页面转场",
  description: "SPA 风格路由转场：旧屏淡出上移、新屏自下升起，方向明确且不会被连点打断。",
  category: "animations",
  subcategory: "Page",
  type: "animation",
  tags: ["转场", "路由", "SPA", "视图", "导航"],
  technologies: ["HTML", "CSS", "JavaScript", "React"],
  styles: ["极简"],
  difficulty: "intermediate",
  responsive: true,
  previewBackground: "light",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-07-30",
  updatedAt: "2026-08-18",
  dir: "animations/page-transition",
};
