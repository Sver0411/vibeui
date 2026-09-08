import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "toast-stack",
  slug: "toast-stack",
  name: "通知提示",
  description:
    "四种状态的 Toast 堆叠：倒计时就是进度条动画本身，因此悬停暂停与关闭时机天然同步；退场先量高度再收拢行高，后排队通知平滑上移。",
  category: "primitives",
  subcategory: "Toast",
  type: "component",
  tags: ["通知", "Toast", "提示", "堆叠", "自动关闭"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["极简"],
  difficulty: "intermediate",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  engine: "DOM",
  performanceTier: "light",
  reducedMotionFallback: "进出场动画缩短为瞬时，倒计时与自动关闭保持可用",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15.4+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-08-31",
  updatedAt: "2026-08-31",
  dir: "components/primitives/toast-stack",
};
