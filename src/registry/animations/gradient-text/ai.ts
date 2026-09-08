import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "渐变流动文字",
    "en": "Animated Gradient Text",
    "aliases": [
      "流光文字",
      "渐变标题",
      "Aurora Text"
    ],
    "pattern": "Text · Gradient Flow",
    "principle": "background-clip: text + color: transparent 让线性渐变只显示在文字字形内，background-size 横向放大到 220% 后用 keyframes 把 background-position 从 0% 匀速移到 -220% 实现无缝流动循环。"
  },
  "prompts": {
    "short": "做一个渐变流光标题：文字内部填充渐变色并横向循环流动，纯 CSS，支持多色极光与单色系变体。",
    "standard": "用原生 HTML/CSS 实现渐变流动文字：\n1. 文本元素：background-size: 220% 100%、-webkit-background-clip: text（Safari 必须前缀）、background-clip: text、color: transparent；\n2. 渐变：flow 变体 linear-gradient(100deg, #0f766e, #14b8a6 22%, #0ea5e9 45%, #0f766e 70%, #0f766e)，首尾同色保证循环无缝；\n3. keyframes：background-position 0% 50% → -220% 50%，5s linear infinite（多色极光变体 110deg 五色、9s）；\n4. ::selection 设回退配色，选中文字可读；\n5. 静态变体 background-size: 100% 100% 不放大。\n不要用 SVG 文字或 canvas。",
    "refined": "实现可配置的流动渐变文字：\n- 放大倍数：默认 background-size 220%（150% 短循环 – 300% 长尾）；\n- 周期：默认 5s linear（极光多色 9s），必须 linear 否则循环点顿挫；\n- 色标布局：首尾必须同色，中段 2–3 个过渡色标；\n- 角度：单色系 100deg / 极光 110deg。\n实现约束：Safari 同时写 -webkit-background-clip 与 color: transparent；渐变只在文字层，容器背景不受影响；prefers-reduced-motion 下停动画并把 background-size 收回 100% 100% 定格。\n验收标准：① 流动循环无接缝跳色；② 文字选中后仍可读（::selection 生效）；③ 帧率稳定（background-position 动画不引起重排）。"
  },
  "knobs": [
    {
      "name": "放大倍数 background-size",
      "default": "220% 100%",
      "range": "150% – 300%",
      "effect": "渐变横向拉伸倍数，越大单轮流动色彩变化越缓。"
    },
    {
      "name": "流动周期 duration",
      "default": "5s linear（极光 9s）",
      "range": "3s – 12s",
      "effect": "一轮循环时长，必须 linear 保证循环点无顿挫。"
    },
    {
      "name": "渐变角度 angle",
      "default": "100deg（flow）/ 110deg（aurora）",
      "range": "80deg – 130deg",
      "effect": "色带的倾斜方向，微倾比水平更有流动感。"
    },
    {
      "name": "色标布局 stops",
      "default": "五段式 #0f766e→#14b8a6→#0ea5e9→#0f766e（首尾同色）",
      "range": "3 – 6 个色标",
      "effect": "色彩节奏，首尾同色是无缝循环的前提。"
    }
  ],
  "pitfalls": [
    "Safari 漏写 -webkit-background-clip: text 或没设 color: transparent，整个元素变成一块渐变色块而非文字。",
    "渐变首尾颜色不同，background-position 循环回来时颜色突变跳接——首尾必须同色。",
    "动画用了 ease 而非 linear，每轮循环结束点明显减速顿挫。",
    "background-size 保持 100% 却动画 background-position，位置没有余量根本流不动，只会整体偏移。",
    "忘写 ::selection 回退色，用户选中文字时透明文字加系统蓝底几乎不可读。",
    "prefers-reduced-motion 下只停动画不重置 background-size，文字定格在渐变中段颜色不完整。"
  ],
  "effectTags": [
    "渐变",
    "文字",
    "流光",
    "hero"
  ]
};
