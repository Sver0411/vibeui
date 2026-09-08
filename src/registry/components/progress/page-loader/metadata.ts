import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "page-loader",
  slug: "page-loader",
  name: "页面启动加载",
  description: "带 Logo 与分段进度条的全屏启动屏，加载完成后淡出交接。可直接放进应用外壳。",
  category: "progress",
  subcategory: "Loading",
  type: "component",
  tags: ["加载", "启动屏", "页面", "淡出"],
  technologies: ["HTML", "CSS", "JavaScript", "React"],
  styles: ["极简", "品牌"],
  difficulty: "beginner",
  popular: true,
  responsive: true,
  previewBackground: "light",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-07-11",
  updatedAt: "2026-08-16",
  dir: "components/progress/page-loader",
};
