import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "flight-card",
  slug: "flight-card",
  name: "航班卡",
  description: "航班信息卡：起降机场代码大字、航线路径虚线与飞机图标、时长与准点率、舱位价格与预订按钮。",
  category: "cards",
  subcategory: "Flight",
  type: "component",
  tags: ["航班卡", "旅行", "预订", "路径图", "卡片"],
  technologies: ["HTML", "CSS"],
  styles: ["商务", "活泼"],
  difficulty: "beginner",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-05",
  updatedAt: "2026-09-05",
  dir: "components/cards/flight-card",
};
