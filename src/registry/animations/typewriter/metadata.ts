import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "typewriter",
  slug: "typewriter",
  name: "打字机文字",
  description:
    "经典打字机动效：逐字打出、停顿、逐字删除后循环下一段文案，方块光标步进闪烁，页面切后台自动暂停，reduced-motion 下静态展示。",
  category: "animations",
  subcategory: "Text",
  type: "animation",
  tags: ["打字机", "文字循环", "光标闪烁", "终端", "hero", "文案"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["极简"],
  difficulty: "beginner",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "静态展示第一段完整文案，光标停止闪烁",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-02",
  updatedAt: "2026-09-02",
  dir: "animations/typewriter",
};
