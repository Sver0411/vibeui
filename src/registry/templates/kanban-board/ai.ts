import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "看板模板",
    "en": "Kanban Board Template",
    "aliases": [
      "任务看板",
      "拖拽看板",
      "Board"
    ],
    "pattern": "Kanban Board · HTML5 拖拽 + 状态驱动渲染",
    "principle": "数据数组（state）驱动全量渲染三列卡片；HTML5 DnD 拖拽跨列，dragover 时按 clientY 与卡片中点比较插入 2px 指示线，drop 后写回 state 重渲染；每张卡带 ◀ ▶ 按钮作为键盘友好的移动回退。"
  },
  "prompts": {
    "short": "做一个三列任务看板：卡片支持拖拽跨列并显示插入位置指示线、可键盘按钮左右移动、列底可新增任务、卡片带标签/负责人/截止日。原生 HTML/CSS/JS 单文件。",
    "standard": "用原生 HTML/CSS/JavaScript 实现单文件看板：\n1. state 数组（三列卡片数据）驱动全量 render()，卡片含标签色、负责人头像、截止日；\n2. 拖拽：dragstart 存\"列:行\"，dragover 必须 e.preventDefault() 并按 clientY 与各卡中点比较插入 2px 指示线，drop 时按指示线位置写回 state 再重渲染；\n3. 拖拽中卡片加 .dragging 半透明态，列加 dragover 高亮（背景+虚线描边）；\n4. 每卡 ◀ ▶ 按钮移一列作为键盘回退，列底输入框 Enter/按钮新增任务。",
    "refined": "实现看板：三列 repeat(3, 1fr) 间距 14px、max-width 880px，列底色 #f1f5f9 圆角 14px、最小高 220px，主题色 #2563eb，指示线 2px；640px 以下单列。验收标准：① 拖到目标列有高亮+插入线，drop 后卡片精确落在指示线处；② dragover 未调用 preventDefault 时 drop 永不触发（自查）；③ 最左列 ◀ 与最右列 ▶ disabled；④ 新任务标题即时渲染且列计数徽章同步。"
  },
  "knobs": [
    {
      "name": "列数与栅格",
      "default": "repeat(3, 1fr)，间距 14px，max-width 880px",
      "range": "2 – 5 列",
      "effect": "看板列数与整体宽度，640px 以下自动单列。"
    },
    {
      "name": "列底色与拖入高亮",
      "default": "#f1f5f9 / dragover #e8f0fe + 虚线 #93c5fd",
      "range": "任意浅色对",
      "effect": "列的层次感与拖入目标的可见反馈。"
    },
    {
      "name": "主题色",
      "default": "#2563eb",
      "range": "任意品牌色",
      "effect": "插入指示线、聚焦环、输入框焦点色。"
    },
    {
      "name": "标签颜色映射",
      "default": "设计 #7c3aed / 开发 #2563eb / 调研 #0d9488 / 运营 #ea580c",
      "range": "任意色表",
      "effect": "卡片标签与负责人头像的着色，未匹配回落 #64748b。"
    },
    {
      "name": "插入指示线",
      "default": "高 2px，margin -3px 2px",
      "range": "2 – 4px",
      "effect": "插入位置的视觉提示粗细。"
    }
  ],
  "pitfalls": [
    "dragover 里不调用 e.preventDefault()，浏览器会取消 drop 事件，拖拽永远落不了地。",
    "只在 drop 里移动卡片却不做 dragover 指示线，用户不知道会插到哪张卡前后。",
    "dragleave 不检查 e.relatedTarget 是否仍在列内，跨过子元素就闪掉高亮。",
    "DOM 手动搬节点而不同步 state，下次全量渲染后顺序回退；应像本模板一样先改数据再 render。",
    "新任务标题直接 innerHTML 拼接未转义是常见注入点（输入 <img onerror=...> 即生效）；本模板已用 escapeHtml 转义，改造时不要丢掉这一步。",
    "卡片只有 draggable 没有 tabIndex 和 ◀ ▶ 回退，触屏与键盘用户无法移动任务。"
  ],
  "effectTags": [
    "看板",
    "拖拽排序",
    "HTML5 DnD",
    "指示线",
    "键盘回退"
  ]
};
