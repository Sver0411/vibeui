import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "animated-tabs",
  slug: "animated-tabs",
  name: "滑动指示器标签页",
  description: "指示器按实测几何在标签间滑动（非写死），面板交叉淡入，完整方向键导航。",
  category: "navigation",
  subcategory: "Tabs",
  type: "component",
  tags: ["标签页", "指示器", "键盘", "面板"],
  technologies: ["HTML", "CSS", "JavaScript", "React"],
  styles: ["极简"],
  difficulty: "intermediate",
  responsive: true,
  previewBackground: "light",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-07-25",
  updatedAt: "2026-08-16",
  dir: "components/navigation/animated-tabs",
};
