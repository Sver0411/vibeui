import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "可折叠侧边栏",
    "en": "Collapsible Sidebar",
    "aliases": [
      "图标侧栏",
      "收起侧边栏",
      "迷你侧栏"
    ],
    "pattern": "Sidebar Collapse · Icon Rail",
    "principle": "data-collapsed 切换宽度 216px↔64px（width 过渡 0.28s），标签与品牌名 opacity 渐隐，折叠态用 data-tip + ::after 在图标右侧 10px 处弹出 tooltip，圆形把手骑在右边框上。"
  },
  "prompts": {
    "short": "做一个可折叠后台侧边栏：展开 216px、折叠为 64px 图标态，悬停显示 tooltip，支持激活态。原生 JS 实现。",
    "standard": "用原生 HTML/CSS/JavaScript 实现可折叠侧边栏：\n1. aside 宽 216px，data-collapsed=\"true\" 时 64px，width 过渡 0.28s cubic-bezier(0.22,1,0.36,1)；图标 svg flex-shrink:0 防挤压，标签 white-space:nowrap；\n2. 标签/品牌名用 opacity 0.18s 渐隐并 pointer-events:none，不用 display 硬切；\n3. 折叠态 hover 时 ::after content: attr(data-tip) 在右侧 calc(100% + 10px) 弹出 tooltip（仅折叠态启用）；\n4. 把手按钮定位 right:-11px 骑在边框上，toggle 时同步 aria-expanded 并按状态切换 aria-label。不要引入库。",
    "refined": "可配置侧边栏：展开宽 216px、折叠宽 64px、过渡 0.28s、tooltip 偏移 10px、图标 17px。验收：① 折叠过程中标签渐隐不与图标叠影；② 折叠态每个图标 hover 弹 tooltip；③ 把手 chevron 折叠时旋转 180°；④ 激活项底色 rgba(15,118,110,0.1) 在两态下都完整可见。"
  },
  "knobs": [
    {
      "name": "展开宽度",
      "default": "216px",
      "range": "180 – 280px",
      "effect": "标签完整显示的空间。"
    },
    {
      "name": "折叠宽度",
      "default": "64px",
      "range": "56 – 80px",
      "effect": "图标轨道宽度，需容纳图标加内边距。"
    },
    {
      "name": "宽度过渡",
      "default": "0.28s cubic-bezier(0.22,1,0.36,1)",
      "range": "0.2 – 0.45s",
      "effect": "折叠动画节奏，主内容区跟随回流。"
    },
    {
      "name": "标签淡出",
      "default": "opacity 0.18s ease",
      "range": "0.1 – 0.3s",
      "effect": "标签消失速度，与宽度过渡错开可减少叠影。"
    },
    {
      "name": "tooltip 偏移",
      "default": "left: calc(100% + 10px)",
      "range": "6 – 16px",
      "effect": "提示气泡与图标的距离。"
    }
  ],
  "pitfalls": [
    "折叠后标签仍占宽度把图标挤歪；图标要 flex-shrink:0，行内元素 nowrap。",
    "tooltip 在展开态也弹出，与真实标签重复；应只在 data-collapsed=\"true\" 下启用 ::after。",
    "把手按钮 aria-label 固定为「收起」，展开时读屏语义相反；需随状态切换文案。",
    "标签直接 display:none，宽度过渡中标签瞬间消失很生硬；用 opacity 渐隐。",
    "宽度过渡时主内容区每帧回流，若再叠加阴影/渐变会明显掉帧；内容区避免大面积重绘元素。"
  ],
  "effectTags": [
    "侧边栏",
    "折叠",
    "图标导航",
    "tooltip"
  ]
};
