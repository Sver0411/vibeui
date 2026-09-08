import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "scroll-reveal",
  slug: "scroll-reveal",
  name: "滚动揭示",
  description: "卡片进入视口时淡入上浮，由 IntersectionObserver 驱动并带错峰延迟，揭示后自动释放。",
  category: "animations",
  subcategory: "Scroll",
  type: "animation",
  tags: ["滚动", "揭示", "视口观察", "入场", "错峰"],
  technologies: ["HTML", "CSS", "JavaScript", "React"],
  styles: ["极简"],
  difficulty: "beginner",
  popular: true,
  responsive: true,
  previewBackground: "light",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-07-26",
  updatedAt: "2026-08-16",
  dir: "animations/scroll-reveal",
};
