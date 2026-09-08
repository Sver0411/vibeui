import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "文件卡",
    "en": "File Card",
    "aliases": [
      "附件卡",
      "文件列表项",
      "attachment card"
    ],
    "pattern": "File Card · Attachment Row",
    "principle": "类型图标色块按扩展名映射色系（PDF 红 / 图表绿 / 表格青…），图标直接用扩展名文字比通用图标更直观；上传中态由「进度条 + 百分比」替换元信息行，完成后淡出切换。"
  },
  "prompts": {
    "short": "做一组文件卡：扩展名色块图标、文件名 + 大小日期、下载/删除按钮，其中一张是上传中态（进度条 + 百分比）。",
    "standard": "用原生 HTML/CSS/JS 实现文件卡列表：\n1. 结构：44px 扩展名色块（圆角 10px、白字大写扩展名）+ 文件名（单行省略）+ 元信息（大小 · 日期）+ 操作区（下载/删除图标按钮）；\n2. 扩展名色映射：pdf #dc2626、doc #2563eb、xls #0d9488、img #7c3aed、zip #d97706、默认 #52525b；\n3. 上传中态：元信息行替换为 6px 进度条 + 右侧百分比，用 setInterval 模拟推进到 100 后切完成态；\n4. 删除：点击后整卡高度折叠移除（transition height）；下载按钮纯演示；\n5. 文件名 title 属性存全名，超长省略号。",
    "refined": "实现 FileList 组件：accept 校验、重名自动加序号、上传队列并发上限 3、失败态红色重试图标；删除可撤销（5 秒 toast 内恢复）；键盘可达（每卡 Tab、操作按钮 aria-label 完整）。验收：① 100 个文件渲染流畅（列表不分页）；② 上传中删除要取消请求；③ 色块在暗色主题可读。"
  },
  "knobs": [
    {
      "name": "色块尺寸 block",
      "default": "44px",
      "range": "36 – 52px",
      "effect": "扩展名色块大小。"
    },
    {
      "name": "进度高 barHeight",
      "default": "6px",
      "range": "4 – 8px",
      "effect": "上传进度条粗细。"
    },
    {
      "name": "折叠时长 collapseMs",
      "default": "250ms",
      "range": "150 – 400ms",
      "effect": "删除时的高度折叠动画。"
    }
  ],
  "pitfalls": [
    "文件名不做 XSS 转义直接渲染，恶意文件名可注入脚本。",
    "扩展名大小写混用（.PDF/.pdf）映射失败，统一 toLowerCase。",
    "上传中删除节点但请求继续跑，浪费带宽还可能报错。",
    "进度条从 0 开始过慢，应显示已有进度（断点续传场景）。",
    "操作按钮太小没有 hover 区，触屏误触率高。"
  ],
  "effectTags": [
    "文件",
    "附件",
    "上传"
  ]
};
