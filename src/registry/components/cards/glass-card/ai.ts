import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "玻璃卡片",
    "en": "Glass Card",
    "aliases": [
      "玻璃拟态卡",
      "磨砂卡片",
      "Glassmorphism 卡"
    ],
    "pattern": "Glassmorphism",
    "principle": "卡面 rgba(255,255,255,0.62) 半透明白 + backdrop-filter: blur(18px) saturate(1.4) 折射背后三个 blur(60px) 的 teal/indigo/pink 极光色斑（26s–38s 缓慢漂移），再叠 1px 白描边与 inset 顶部高光构成玻璃层次。"
  },
  "prompts": {
    "short": "做一张磨砂玻璃卡片：backdrop-filter 模糊折射背后的彩色极光光斑，白描边加顶部内高光。背后光斑纯 CSS 渐变绘制。",
    "standard": "用原生 HTML/CSS 实现玻璃拟态卡：\n1. 舞台放三个 border-radius:50% 色斑（teal rgba(20,184,166,0.24)、indigo rgba(99,102,241,0.18)、pink rgba(244,114,182,0.14)，30–45vmax），统一 filter: blur(60px) saturate(1.2) + opacity 0.52，各自 26s/32s/38s ease-in-out alternate 漂移；\n2. 卡片 rgba(255,255,255,0.62) + backdrop-filter: blur(18px) saturate(1.4)（带 -webkit- 前缀），border 1px rgba(255,255,255,0.85)；\n3. box-shadow 双层：inset 0 1px 0 rgba(255,255,255,0.92) 顶部高光 + 0 24px 60px 外投影；\n4. prefers-reduced-motion 下色斑停止漂移。",
    "refined": "可配置玻璃卡：卡面 rgba(255,255,255,0.62)、backdrop blur(18px) + saturate(1.4)、圆角 20px、极光 blur(60px)/opacity 0.52、三斑 26–38s 漂移。\n验收：① 卡背后必须透出可辨的彩色形状（模糊有内容可折射）；② 卡面文字对比度 ≥ 4.5:1；③ Safari 下模糊生效（-webkit- 前缀）；④ reduced-motion 下极光静止但玻璃质感不变。"
  },
  "knobs": [
    {
      "name": "背景模糊",
      "default": "blur(18px) saturate(1.4)",
      "range": "8 – 30px，saturate 1 – 1.8",
      "effect": "磨砂强度与背后色彩的浓郁度，需带 -webkit- 前缀。"
    },
    {
      "name": "卡面透明度",
      "default": "rgba(255, 255, 255, 0.62)",
      "range": "0.4 – 0.8",
      "effect": "玻璃的透与雾：越低越透、越高越白。"
    },
    {
      "name": "极光滤镜",
      "default": "blur(60px) saturate(1.2)，opacity 0.52",
      "range": "40 – 80px，0.3 – 0.7",
      "effect": "色斑融合程度，决定卡后\"有东西可看\"。"
    },
    {
      "name": "色斑漂移",
      "default": "26s / 32s / 38s ease-in-out alternate",
      "range": "15 – 60s",
      "effect": "极光的呼吸节奏，周期错开才不机械。"
    },
    {
      "name": "描边 / 高光",
      "default": "border 1px rgba(255,255,255,0.85) + inset 0 1px 0 rgba(255,255,255,0.92)",
      "range": "0.6 – 1 透明度",
      "effect": "玻璃边缘的\"厚度\"与顶部反光。"
    }
  ],
  "pitfalls": [
    "背后是纯色/空白背景时 backdrop-filter 完全看不出效果——必须先放彩色极光或图片再谈玻璃。",
    "只写 backdrop-filter 不写 -webkit-backdrop-filter，旧版 Safari 下退化成半透明无模糊。",
    "色斑忘设 filter: blur(60px)，卡后出现清晰硬边圆形，玻璃变成\"贴了色块\"。",
    "卡面透明度过高（>0.8）文字对比度不足，白色文字在浅色背景上不可读。",
    "三个色斑动画周期相同，极光整体同步呼吸显得机械——错开 26/32/38s。",
    "inset 高光与外投影顺序/方向写反，玻璃失去厚度感。"
  ],
  "effectTags": [
    "玻璃拟态",
    "backdrop-filter",
    "极光",
    "磨砂",
    "纯 CSS"
  ]
};
