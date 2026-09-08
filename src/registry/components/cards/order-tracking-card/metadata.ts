import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "order-tracking-card",
  slug: "order-tracking-card",
  name: "订单跟踪卡",
  description:
    "物流订单卡：四段横向状态步条（完成绿色对勾 / 当前节点脉冲 / 未来灰点）+ 可滚动节点时间线，当前事件高亮，纯静态数据渲染。",
  category: "cards",
  subcategory: "Logistics",
  type: "component",
  tags: ["订单跟踪", "物流", "步条", "时间线", "电商"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["极简"],
  difficulty: "beginner",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "当前节点停止脉冲，其余不变",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-05",
  updatedAt: "2026-09-05",
  dir: "components/cards/order-tracking-card",
};
