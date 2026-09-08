import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "newsletter-cta",
  slug: "newsletter-cta",
  name: "订阅区块",
  description:
    "邮箱订阅转化区块：徽章 + 标题 + 说明文案 + 输入框与按钮组合，邮箱格式校验描红提示，成功后切换确认文案并重放进场动画。",
  category: "blocks",
  subcategory: "Conversion",
  type: "layout",
  tags: ["订阅", "邮箱收集", "转化", "校验", "落地页", "区块"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["极简"],
  difficulty: "beginner",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "成功态直接切换，无进场动画",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-02",
  updatedAt: "2026-09-02",
  dir: "blocks/newsletter-cta",
};
