import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "copy-button",
  slug: "copy-button",
  name: "复制按钮",
  description:
    "一键复制按钮：优先 Clipboard API、非安全上下文自动回退 execCommand，成功后图标换成对勾并 1.6s 恢复，结果经 aria-live 播报；附纯图标变体与 React 版。",
  category: "primitives",
  subcategory: "Action",
  type: "component",
  tags: ["复制", "剪贴板", "代码块", "命令", "成功反馈", "工具按钮"],
  technologies: ["HTML", "CSS", "JavaScript", "React"],
  styles: ["极简"],
  difficulty: "beginner",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "对勾无弹入动画，状态切换即时",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-02",
  updatedAt: "2026-09-02",
  dir: "components/primitives/copy-button",
};
