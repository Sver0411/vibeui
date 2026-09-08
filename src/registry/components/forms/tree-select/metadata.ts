import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "tree-select",
  slug: "tree-select",
  name: "树形选择器",
  description:
    "层级勾选树：勾选父级同步所有后代、子级变化逐级向上重算出半选态（indeterminate），节点可展开收起并带参考线缩进，汇总行实时统计已选叶子。",
  category: "forms",
  subcategory: "Tree",
  type: "component",
  tags: ["树形", "级联选择", "半选", "indeterminate", "展开收起", "表单"],
  technologies: ["HTML", "CSS", "JavaScript", "React"],
  styles: ["极简"],
  difficulty: "intermediate",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "展开收起去掉旋转过渡，联动逻辑不变",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-02",
  updatedAt: "2026-09-02",
  dir: "components/forms/tree-select",
};
