import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "mouse-parallax",
  slug: "mouse-parallax",
  name: "指针视差",
  description:
    "多层指针视差：data-depth 控制各层跟随强度，指针位置归一化为 -1~1 后经 rAF 缓动插值驱动 translate3d，离场自动回中；translate3d 走 GPU 合成。",
  category: "animations",
  subcategory: "Pointer",
  type: "animation",
  tags: ["视差", "指针跟随", "层次", "缓动", "rAF"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["科技"],
  difficulty: "intermediate",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "所有层静止在初始位置",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-05",
  updatedAt: "2026-09-05",
  dir: "animations/mouse-parallax",
};
