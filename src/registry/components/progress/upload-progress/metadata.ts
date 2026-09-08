import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "upload-progress",
  slug: "upload-progress",
  name: "上传进度卡片",
  description: "文件上传行：动画进度、速度与大小读数、暂停/继续/取消，状态接口与真实 XHR 一致。",
  category: "progress",
  subcategory: "Upload",
  type: "component",
  tags: ["进度", "上传", "文件", "暂停"],
  technologies: ["HTML", "CSS", "JavaScript", "React"],
  styles: ["极简"],
  difficulty: "intermediate",
  responsive: true,
  previewBackground: "light",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-07-15",
  updatedAt: "2026-08-20",
  dir: "components/progress/upload-progress",
};
