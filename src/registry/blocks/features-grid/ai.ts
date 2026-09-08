import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "功能区网格",
    "en": "Features Grid / Feature Cards",
    "aliases": [
      "特性网格",
      "功能卡片",
      "卖点网格"
    ],
    "pattern": "Features · Card Grid",
    "principle": "grid-template-columns: repeat(3, 1fr) 的等宽三列卡片网格，每卡为图标方块 + 标题 + 说明的纵向结构，hover 时上浮 3px 并把描边过渡到品牌主色。"
  },
  "prompts": {
    "short": "做一个三列功能区网格：6 张白底卡片，每张含圆角图标方块、标题、说明文字，悬停上浮且描边变主色。纯 HTML/CSS，不用 JS。",
    "standard": "用原生 HTML/CSS 实现功能区网格：\n1. grid-template-columns: repeat(3, 1fr)，gap 18px，max-width 1000px 居中；\n2. 每张卡片是 article：38×38px 圆角 10px 图标方块（主色 10% 透明背景 + 主色文字）、h3 标题、说明段落，白底 + 1px #e4e4e7 描边 + 14px 圆角；\n3. hover 时 translateY(-3px)、描边过渡到 rgba(15,118,110,0.35)、阴影 0 14px 34px rgba(0,0,0,0.08)；\n4. 860px 降为 2 列、560px 降为 1 列。",
    "refined": "实现功能区网格，暴露参数：列数 3/2/1（断点 860px、560px）、间距 18px、卡片圆角 14px、图标块 38px 主色 #0f766e（10% 透明底）、hover 上浮 3px + 描边 rgba(15,118,110,0.35)。验收标准：① 六张卡片文字行数不同但同行等高；② hover 只动 transform/box-shadow/border-color，不引起文字重排；③ 三档断点无横向滚动。"
  },
  "knobs": [
    {
      "name": "列数与断点",
      "default": "3 列（860px 下 2 列，560px 下 1 列）",
      "range": "2 – 4 列",
      "effect": "每行卡片数量，决定信息密度。"
    },
    {
      "name": "主色 fg-icon",
      "default": "#0f766e（teal-700），背景 rgba(15,118,110,0.1)",
      "range": "任意品牌色",
      "effect": "图标方块颜色与 hover 描边色，全站统一的品牌信号。"
    },
    {
      "name": "hover 上浮",
      "default": "translateY(-3px)，0.22s ease",
      "range": "0 – 6px",
      "effect": "悬停时卡片抬升幅度，配合描边变色强调可交互。"
    },
    {
      "name": "卡片内边距",
      "default": "24px 22px",
      "range": "18 – 32px",
      "effect": "卡片呼吸感，过大显得空、过小文字顶边。"
    },
    {
      "name": "网格间距 gap",
      "default": "18px",
      "range": "12 – 28px",
      "effect": "卡片之间的留白，影响整体疏密节奏。"
    }
  ],
  "pitfalls": [
    "用 float 或 flex 强行三列，卡片文字长度不一时同一行高度参差；grid 等宽 + 默认拉伸才能对齐。",
    "hover 只写 transform 不写 border-color 过渡，或反过来丢掉 transition 中的 border-color，变色瞬间跳变。",
    "图标用 emoji 大小不可控，跨平台渲染差异大；应用固定尺寸方块 + place-items: center 包住。",
    "断点漏写 2 列档，从 3 列直接跳 1 列，平板上要么挤要么空。",
    "标题字号用固定 px 不做 clamp，窄屏单列下大标题占满整屏。",
    "卡片阴影写死纯黑高透明度，浅灰页面下 hover 显得脏。"
  ],
  "effectTags": [
    "功能网格",
    "卡片",
    "卖点",
    "hover 上浮",
    "营销"
  ]
};
