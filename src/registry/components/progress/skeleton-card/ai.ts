import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "骨架屏",
    "en": "Skeleton Screen",
    "aliases": [
      "Ghost Loading",
      "Content Placeholder",
      "Shimmer Placeholder",
      "占位骨架"
    ],
    "pattern": "Loading State · Perceived Performance",
    "principle": "用与真实内容同尺寸的灰色占位块先占住布局，再叠加一条横向掠过的渐变高光表示「正在来」；数据到达后原位替换，视觉上零跳动。"
  },
  "prompts": {
    "short": "做一个骨架屏卡片：头像、标题、两行文字、一个媒体区，带从左到右掠过的高光扫动。纯 CSS。",
    "standard": "用 HTML + CSS 实现一张骨架屏卡片，结构与真实卡片完全一致：\n1. 卡片宽 300px、圆角 14px、内边距 16px，内部垂直排列媒体区（高 130px）、头像行（38px 圆形头像 + 右侧两行文本）、底部两个胶囊按钮；\n2. 每个占位块共用 .sk-shimmer 类：background 为 linear-gradient(100deg, #ececef 40%, #f7f7f8 50%, #ececef 60%)，background-size: 220% 100%；\n3. 扫光动画用 @keyframes 改变 background-position 从 130% 0 到 -90% 0，时长 1.5s，ease-in-out 无限循环；\n4. 文本行高度必须等于真实文本的 line-height（这里用 10px/12px），宽度按 62% / 82% / 100% 错落，避免整齐划一显得假；\n5. prefers-reduced-motion 下停用扫光、只保留静态灰块；\n6. 纯 CSS 无 JS，兼容 Chrome 90+ / Safari 15+。",
    "refined": "实现一个可参数化的骨架屏组件，并把这些维度做成 CSS 变量：\n- --sk-base：占位基色（默认 #ececef）；\n- --sk-highlight：高光色（默认 #f7f7f8），与基色的明度差控制在 3–5% 之间；\n- --sk-sweep-duration：扫光周期（默认 1.5s，可调 1.1–2.2s）；\n- --sk-angle：扫光角度（默认 100deg，180deg 为上下扫动）；\n- --sk-radius：占位块圆角（默认按元素尺寸取 5–9px，头像用 50%）。\n关键约束：占位块的盒子尺寸必须与真实内容的盒模型逐一对齐（含 line-height、padding、gap），这是数据到达后不产生布局跳动的前提。\n验收标准：① 从骨架切到真实内容的 CLS 为 0；② 容器带 aria-busy=\"true\" 且屏幕阅读器播报「加载中」而非读出空块；③ 深色模式下基色与高光单独定义，不复用浅色值；④ 扫光在 prefers-reduced-motion 下停止。",
    "byFramework": {
      "react": "用 React + Tailwind 实现 <SkeletonCard /> 组件，导出 SkeletonCard({ lines = 2, media = true, avatar = true })。扫光用 Tailwind 的 animate-pulse 之外自定义一段 keyframes（background-position 130% → -90%），通过 arbitrary value 写成 animate-[sk-sweep_1.5s_ease-in-out_infinite]。要求：容器带 aria-busy 与 sr-only 的「加载中」文案；提供 dark: 变体覆盖基色与高光；用 TypeScript 标注 props；组件只负责骨架，真实内容由外部条件渲染替换。"
    }
  },
  "knobs": [
    {
      "name": "扫光周期",
      "default": "1.5s",
      "range": "1.1s – 2.2s",
      "effect": "高光掠过一遍的时间。短于 1.1s 会显得急躁，长于 2.2s 会被误认为卡住。"
    },
    {
      "name": "高光与基色明度差",
      "default": "约 4%（#ececef → #f7f7f8）",
      "range": "3% – 6%",
      "effect": "扫光的可见度。差值太小看不出在动，太大则变成刺眼的闪白。"
    },
    {
      "name": "扫光角度",
      "default": "100deg",
      "range": "90deg（横向）/ 180deg（纵向）",
      "effect": "高光掠过的方向。轻微倾斜（100deg 而非 90deg）比纯水平更自然。"
    },
    {
      "name": "文本行宽度",
      "default": "62% / 82% / 100%",
      "effect": "错落的宽度模拟真实文本的自然参差，全部 100% 会像色块而不像文字。"
    },
    {
      "name": "占位块高度",
      "default": "10px（正文）/ 12px（标题）",
      "effect": "必须与真实文本的 line-height 一致，否则切换瞬间布局会跳动。"
    }
  ],
  "pitfalls": [
    "占位尺寸和真实内容不一致是骨架屏最常见的失败原因，会让数据到达时产生布局跳动（CLS）。",
    "不要用 opacity 闪烁代替扫光——闪烁传达的是「出错」或「暂停」，扫光才传达「正在加载」。",
    "别让屏幕阅读器读出几十个空 div，容器加 aria-busy=\"true\" 并配一句 sr-only 的「加载中」。",
    "深色模式直接复用浅色基色会亮得刺眼，必须为两套主题分别定义基色与高光。",
    "骨架屏只适合 300ms 以上的等待；更快的请求用骨架反而制造闪烁，应改为延迟 200ms 再显示。",
    "加载失败时要有明确状态，不能让骨架无限扫下去——用户会以为页面死了。"
  ],
  "effectTags": [
    "加载",
    "占位",
    "扫光",
    "等待"
  ]
};
