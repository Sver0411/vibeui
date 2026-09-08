import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "contact-form-section",
  slug: "contact-form-section",
  name: "联系表单区块",
  description:
    "联系区块：左侧价值介绍 + 右侧表单（称呼/邮箱/描述），失焦即校验、出错实时复检并聚焦首个错误项，提交成功切换成功面板，可一键再发一条。",
  category: "blocks",
  subcategory: "Contact",
  type: "layout",
  tags: ["联系表单", "表单校验", "区块", "成功态", "无障碍"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["极简"],
  difficulty: "intermediate",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "成功面板无入场动画，其余交互不变",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-05",
  updatedAt: "2026-09-05",
  dir: "blocks/contact-form-section",
};
