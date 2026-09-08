import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "checkout-page",
  slug: "checkout-page",
  name: "结算页",
  description:
    "电商结算页模板：左侧收货地址 + 支付方式单选（卡片式高亮），右侧订单摘要（渐变缩略图、小计、满额免运费规则、合计），必填项缺失自动聚焦，提交给出演示反馈。",
  category: "templates",
  subcategory: "Commerce",
  type: "page",
  tags: ["结算", "电商", "订单摘要", "支付方式", "页面模板"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["极简"],
  difficulty: "intermediate",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "无动画依赖，布局交互不变",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-05",
  updatedAt: "2026-09-05",
  dir: "templates/checkout-page",
};
