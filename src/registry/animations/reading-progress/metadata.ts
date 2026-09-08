import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "reading-progress",
  slug: "reading-progress",
  name: "阅读进度条",
  description: "顶部阅读进度条，rAF 节流的滚动监听，越过后半程渐变为强调色，支持页内长文演示。",
  category: "animations",
  subcategory: "Scroll Progress",
  type: "animation",
  tags: ["进度条", "滚动", "阅读进度", "性能", "rAF"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["极简"],
  difficulty: "beginner",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-05",
  updatedAt: "2026-09-05",
  dir: "animations/reading-progress",
};
