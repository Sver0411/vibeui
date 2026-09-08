import type { UIResourceMeta } from "@/types/resource";

export const meta: UIResourceMeta = {
  id: "file-card",
  slug: "file-card",
  name: "文件卡",
  description: "附件文件卡：类型图标色块、文件名 + 大小/日期元信息、下载与删除操作，上传中态带进度条。",
  category: "cards",
  subcategory: "File",
  type: "component",
  tags: ["文件卡", "附件", "下载", "上传进度", "列表"],
  technologies: ["HTML", "CSS", "JavaScript"],
  styles: ["极简", "商务"],
  difficulty: "beginner",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15+", "Edge 90+"],
  author: "VibeUI Team",
  version: "1.0.0",
  createdAt: "2026-09-05",
  updatedAt: "2026-09-05",
  dir: "components/cards/file-card",
};
