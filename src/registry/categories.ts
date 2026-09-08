import {
  Boxes,
  FolderOpen,
  Layers,
  LayoutPanelLeft,
  Loader,
  MousePointerClick,
  Navigation,
  PenLine,
  Shapes,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface CategoryDef {
  id: string;
  label: string;
  group: "Components" | "Primitives" | "Motion" | "Blocks" | "Pages";
  description: string;
  icon: LucideIcon;
}

/**
 * Registry categories. Every resource declares one of these ids.
 * The group controls where the category is surfaced in navigation.
 */
export const CATEGORIES: CategoryDef[] = [
  {
    id: "buttons",
    label: "按钮",
    group: "Components",
    description: "带细腻微交互的按钮组件。",
    icon: MousePointerClick,
  },
  {
    id: "navigation",
    label: "导航",
    group: "Components",
    description: "导航栏、标签页、Dock 与菜单。",
    icon: Navigation,
  },
  {
    id: "cards",
    label: "卡片",
    group: "Components",
    description: "带深度、倾斜与聚光效果的内容卡片。",
    icon: Layers,
  },
  {
    id: "forms",
    label: "表单与输入",
    group: "Components",
    description: "输入框、上传与多步骤表单流程。",
    icon: PenLine,
  },
  {
    id: "progress",
    label: "进度与加载",
    group: "Components",
    description: "加载指示器、骨架屏与进度条。",
    icon: Loader,
  },
  {
    id: "primitives",
    label: "微元素",
    group: "Primitives",
    description: "开关、徽章、提示与加载器等高频小元素。",
    icon: Shapes,
  },
  {
    id: "icons",
    label: "图标",
    group: "Primitives",
    description: "手绘线性图标与简约 Logo 标志，可调尺寸随取随用。",
    icon: Shapes,
  },
  {
    id: "animations",
    label: "动效与特效",
    group: "Motion",
    description: "文本、光标、滚动与背景特效。",
    icon: Sparkles,
  },
  {
    id: "blocks",
    label: "页面区块",
    group: "Blocks",
    description: "可直接拼进页面的完整段落：Hero、功能区、推荐语。",
    icon: LayoutPanelLeft,
  },
  {
    id: "templates",
    label: "页面模板",
    group: "Pages",
    description: "完整页面：仪表盘、落地页、登录页等。",
    icon: FolderOpen,
  },
];

export const CATEGORY_IDS = CATEGORIES.map((c) => c.id);

export function getCategory(id: string): CategoryDef | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getCategoryLabel(id: string): string {
  return getCategory(id)?.label ?? id;
}

/** Resource type presentation metadata. */
export const TYPE_META: Record<string, { label: string; plural: string; icon: LucideIcon }> = {
  component: { label: "组件", plural: "组件", icon: Boxes },
  animation: { label: "动效", plural: "动效", icon: Sparkles },
  template: { label: "模板", plural: "页面模板", icon: Shapes },
  effect: { label: "特效", plural: "特效", icon: Sparkles },
  layout: { label: "区块", plural: "页面区块", icon: LayoutPanelLeft },
  page: { label: "页面", plural: "页面", icon: FolderOpen },
  icon: { label: "图标", plural: "图标", icon: Shapes },
};

export const RESOURCE_TYPES = ["component", "animation", "template", "layout", "icon"] as const;
export type ResourceTypeId = (typeof RESOURCE_TYPES)[number];

export const DIFFICULTY_META: Record<string, { label: string; order: number }> = {
  beginner: { label: "入门", order: 0 },
  intermediate: { label: "进阶", order: 1 },
  advanced: { label: "高级", order: 2 },
};
