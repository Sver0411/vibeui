import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "step-nav",
  slug: "step-nav",
  name: "步骤导航条",
  description:
    "横向多步骤导航：已完成步骤对勾实心且可点击回退、当前步描边光晕、未完成步骤锁定，连接线随进度着色，附上一步 / 下一步状态机。",
  category: "navigation",
  subcategory: "Stepper",
  type: "component",
  tags: ["步骤条", "流程", "向导", "回退", "状态机", "导航"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["极简"],
  difficulty: "intermediate",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-02",
  updatedAt: "2026-09-02",
  dir: "components/navigation/step-nav",
};
