import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "kinetic-path-text",
  slug: "kinetic-path-text",
  name: "动力路径文字",
  description:
    "多条 SVG textPath 沿实时弯曲路径循环，速度由指针动量驱动并通过阻尼自然回落。",
  category: "animations",
  subcategory: "Kinetic Typography",
  type: "animation",
  tags: ["SVG", "路径文字", "惯性", "动态排版", "指针交互"],
  technologies: ["HTML", "CSS", "JavaScript", "SVG", "React"],
  styles: ["动态排版", "实验性", "高级"],
  difficulty: "advanced",
  featured: true,
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "SVG",
  performanceTier: "light",
  reducedMotionFallback: "保留三条完整可读路径文字，停止循环、惯性和路径弯曲。",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-08-31",
  updatedAt: "2026-08-31",
  dir: "animations/kinetic-path-text",
};
