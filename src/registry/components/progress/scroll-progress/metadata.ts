import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "scroll-progress",
  slug: "scroll-progress",
  name: "滚动进度条",
  description: "随滚动填充的阅读进度条，附可滚动演示区。rAF 节流的 passive 监听保持流畅。",
  category: "progress",
  subcategory: "Scroll",
  type: "component",
  tags: ["进度", "滚动", "阅读", "固定"],
  technologies: ["HTML", "CSS", "JavaScript", "React"],
  styles: ["极简"],
  difficulty: "beginner",
  popular: true,
  responsive: true,
  previewBackground: "light",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-07-18",
  updatedAt: "2026-08-16",
  dir: "components/progress/scroll-progress",
};
