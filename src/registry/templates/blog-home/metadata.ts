import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "blog-home",
  slug: "blog-home",
  name: "博客首页",
  description:
    "完整博客首页模板：顶部导航 + 头条文章大卡（渐变抽象封面）+ 三列文章网格 + RSS 底栏，封面全部用 CSS 渐变绘制无需图片资源，两档响应式。",
  category: "templates",
  subcategory: "Blog",
  type: "page",
  tags: ["博客", "内容站", "文章列表", "头条", "封面", "页面模板"],
  technologies: ["HTML", "CSS"],
  styles: ["极简"],
  difficulty: "beginner",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "CSS",
  performanceTier: "light",
  reducedMotionFallback: "文章卡不再悬浮，其余布局不变",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-02",
  updatedAt: "2026-09-02",
  dir: "templates/blog-home",
};
