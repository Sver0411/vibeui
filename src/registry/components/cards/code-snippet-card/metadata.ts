import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "code-snippet-card",
  slug: "code-snippet-card",
  name: "代码片段卡",
  description:
    "深色代码展示卡：HTML/CSS/JS 三标签切换（tablist 语义 + 方向键），内置极简关键字着色，右上角一键复制并反馈已复制，非安全上下文自动降级 execCommand。",
  category: "cards",
  subcategory: "Code",
  type: "component",
  tags: ["代码", "片段", "标签页", "复制", "深色"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["深色"],
  difficulty: "intermediate",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "标签切换无过渡动画，功能不变",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-05",
  updatedAt: "2026-09-05",
  dir: "components/cards/code-snippet-card",
};
