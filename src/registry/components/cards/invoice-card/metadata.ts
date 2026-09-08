import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "invoice-card",
  slug: "invoice-card",
  name: "发票卡",
  description: "账单发票卡：发票号 + 状态徽章（已付/待付/逾期）、金额大字与明细行展开，操作按钮右置。",
  category: "cards",
  subcategory: "Invoice",
  type: "component",
  tags: ["发票", "账单", "状态徽章", "明细", "金融"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["商务", "极简"],
  difficulty: "beginner",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-07",
  updatedAt: "2026-09-07",
  dir: "components/cards/invoice-card",
};
