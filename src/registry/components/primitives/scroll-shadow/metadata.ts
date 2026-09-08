import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "scroll-shadow",
  slug: "scroll-shadow",
  name: "滚动边缘阴影",
  description: "滚动容器边缘阴影指示：未滚到顶/底时对应边缘显示渐隐阴影，滚到位自动消失，纯 CSS scroll-driven 降级 JS。",
  category: "primitives",
  subcategory: "Scroll Shadow",
  type: "component",
  tags: ["滚动", "阴影", "渐隐", "提示", "容器"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["极简"],
  difficulty: "beginner",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-07",
  updatedAt: "2026-09-07",
  dir: "components/primitives/scroll-shadow",
};
