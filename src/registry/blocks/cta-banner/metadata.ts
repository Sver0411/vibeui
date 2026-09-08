import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "cta-banner",
  slug: "cta-banner",
  name: "CTA 横幅",
  description:
    "两种行动号召区块：渐变实心版用两层 radial-gradient 光斑缓慢漂移制造纵深，浅色描边版适合放在页面中段；均含主次双按钮与信任文案。",
  category: "blocks",
  subcategory: "CTA",
  type: "layout",
  tags: ["CTA", "行动号召", "渐变", "营销", "转化"],
  technologies: ["HTML", "CSS"],
  styles: ["极简"],
  difficulty: "beginner",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "CSS",
  performanceTier: "light",
  reducedMotionFallback: "光斑漂移停止，按钮悬停位移取消",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-08-31",
  updatedAt: "2026-08-31",
  dir: "blocks/cta-banner",
};
