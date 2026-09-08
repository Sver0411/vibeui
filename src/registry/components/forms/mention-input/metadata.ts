import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "mention-input",
  slug: "mention-input",
  name: "@提及输入框",
  description:
    "contenteditable 提及输入框：输入 @ 弹出成员候选菜单（支持继续输入过滤、↑↓ 选择、Enter 确认），选中后以不可编辑的提及标签插入，Backspace 整体删除，含 140 字计数。",
  category: "forms",
  subcategory: "Input",
  type: "component",
  tags: ["提及", "@", "contenteditable", "自动补全", "富文本", "输入框"],
  technologies: ["HTML", "CSS", "JavaScript", "React"],
  styles: ["极简"],
  difficulty: "advanced",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "候选菜单直接显隐，无过渡动画",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-02",
  updatedAt: "2026-09-02",
  dir: "components/forms/mention-input",
};
