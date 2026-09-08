import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "cookie-consent",
  slug: "cookie-consent",
  name: "Cookie 同意条",
  description:
    "页面底部 Cookie 同意条：全部接受 / 仅必要一键选择，可展开偏好面板逐项开关（必要项锁定），localStorage 记住选择并在再次访问时静默，附重置演示入口。",
  category: "blocks",
  subcategory: "Consent",
  type: "layout",
  tags: ["cookie", "同意", "GDPR", "偏好设置", "localStorage"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["极简"],
  difficulty: "beginner",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "同意条无上滑动画，直接显示/隐藏",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-05",
  updatedAt: "2026-09-05",
  dir: "blocks/cookie-consent",
};
