import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "team-section",
  slug: "team-section",
  name: "团队介绍区块",
  description:
    "About 页常用团队区块：大标题 + 说明文案 + 四列成员卡（渐变单字头像、姓名、职位、链接胶囊），悬浮上浮描边，两档响应式网格。",
  category: "blocks",
  subcategory: "About",
  type: "layout",
  tags: ["团队", "about", "成员卡", "头像", "落地页", "区块"],
  technologies: ["HTML", "CSS"],
  styles: ["极简"],
  difficulty: "beginner",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "CSS",
  performanceTier: "light",
  reducedMotionFallback: "卡片不再上浮，仅保留描边反馈",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-02",
  updatedAt: "2026-09-02",
  dir: "blocks/team-section",
};
