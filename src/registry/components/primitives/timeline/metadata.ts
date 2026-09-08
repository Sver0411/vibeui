import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "timeline",
  slug: "timeline",
  name: "垂直时间线",
  description:
    "纯 CSS 垂直时间线：连接线贯通节点、完成态对勾、进行中节点呼吸光晕，另含去边框的紧凑变体，列表语义 + aria 友好。",
  category: "primitives",
  subcategory: "Timeline",
  type: "component",
  tags: ["时间线", "步骤", "进度", "状态", "纯 CSS", "列表"],
  technologies: ["HTML", "CSS"],
  styles: ["极简"],
  difficulty: "beginner",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "CSS",
  performanceTier: "light",
  reducedMotionFallback: "进行中节点停止呼吸光晕",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-02",
  updatedAt: "2026-09-02",
  dir: "components/primitives/timeline",
};
