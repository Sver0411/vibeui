import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "multi-select",
  slug: "multi-select",
  name: "多选下拉",
  description:
    "多选下拉框：面板支持关键词搜索、全选/清空，选中项以可删除 chips 回显在触发框内；listbox/option 语义完整，外部点击与 ESC 关闭。",
  category: "forms",
  subcategory: "Picker",
  type: "component",
  tags: ["多选", "下拉", "chips", "搜索", "listbox", "表单"],
  technologies: ["HTML", "CSS", "JavaScript", "React"],
  styles: ["极简"],
  difficulty: "intermediate",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "面板展开收起无过渡动画，直接显隐",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-02",
  updatedAt: "2026-09-02",
  dir: "components/forms/multi-select",
};
