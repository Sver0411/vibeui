import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "date-picker",
  slug: "date-picker",
  name: "日期选择器",
  description:
    "周一起始的中文月历：上/下月切换、非本月置灰、今天细描边、选中实心高亮与回到今天，另含预选日期的紧凑变体；React 版纯受控实现。",
  category: "forms",
  subcategory: "Picker",
  type: "component",
  tags: ["日期选择", "月历", "日历", "表单", "本地化", "受控组件"],
  technologies: ["HTML", "CSS", "JavaScript", "React"],
  styles: ["极简"],
  difficulty: "intermediate",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "去掉按压缩放，日期切换即时完成",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-02",
  updatedAt: "2026-09-02",
  dir: "components/forms/date-picker",
};
