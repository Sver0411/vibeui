import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "article-card",
  slug: "article-card",
  name: "文章卡",
  description: "博客文章卡：分类色条、两行截断标题、摘要与元信息行（作者字标 · 日期 · 阅读时长），悬停标题变主色。",
  category: "cards",
  subcategory: "Article",
  type: "component",
  tags: ["文章卡", "博客", "内容列表", "排版", "卡片"],
  technologies: ["HTML", "CSS"],
  styles: ["极简", "编辑风"],
  difficulty: "beginner",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  compatibility: ["Chrome 111+", "Firefox 113+", "Safari 16.2+", "Edge 111+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-05",
  updatedAt: "2026-09-05",
  dir: "components/cards/article-card",
};
