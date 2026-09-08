import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "multi-step-progress",
  slug: "multi-step-progress",
  name: "多步骤进度",
  description: "带连接进度线的步骤条，支持点击已完成步骤回跳，适合结账与引导流程。",
  category: "progress",
  subcategory: "Progress",
  type: "component",
  tags: ["进度", "步骤", "向导", "结账"],
  technologies: ["HTML", "CSS", "JavaScript", "React"],
  styles: ["极简"],
  difficulty: "intermediate",
  popular: true,
  responsive: true,
  previewBackground: "light",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-07-09",
  updatedAt: "2026-08-18",
  dir: "components/progress/multi-step-progress",
};
