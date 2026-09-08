import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "快捷键标签",
    "en": "Keyboard Shortcut Label / Kbd",
    "aliases": [
      "键帽",
      "kbd 组件",
      "组合键标签"
    ],
    "pattern": "Kbd · Skeuomorphic Keycap",
    "principle": "kbd 键帽用白→灰渐变 + 底边 2px 加粗模拟浮雕，:active 时底边变 1px 并 translateY(1px) 制造按压下沉；组合键只是多个 kbd 横排。"
  },
  "prompts": {
    "short": "做一组拟物键帽样式的快捷键标签：支持组合键、方向键图形、深色变体，active 时下沉。纯 CSS。",
    "standard": "用纯 CSS 实现 kbd 快捷键标签（不写 JS、不引库）：\n1. 键帽 inline-grid 居中，min-width 26px、高 26px、圆角 7px，background 用 180deg 白→#f4f4f5 渐变，border-bottom-width 2px 比其余边厚，形成薄浮雕；\n2. :active 时 border-bottom-width 变 1px + translateY(1px)，模拟键帽按下；\n3. 方向键用内联 SVG（11px stroke 图形）替代字符；\n4. 深色变体整体套 #18181b 底，键帽换 #27272a→#18181b 渐变、浅色文字。",
    "refined": "参数：键帽 min-width 26px（wide 变体 32px）、高 26px、圆角 7px、字号 12px/600、边框 #d4d4d8 底边 2px、投影 0 1px 0 rgba(0,0,0,0.04)。验收：① :active 有明确 1px 下沉且底边变薄；② 图形键（↑↓←→）与文字键基线对齐；③ 深色变体里键帽仍有立体感；④ 放在暗色卡片内对比度足够。"
  },
  "knobs": [
    {
      "name": "键帽尺寸",
      "default": "min-width 26px / height 26px（wide 32px）",
      "range": "22px – 34px",
      "effect": "键帽大小与可读性。"
    },
    {
      "name": "底边厚度",
      "default": "2px（active 时 1px）",
      "range": "1px – 3px",
      "effect": "浮雕立体感强弱，也是下沉位移的基准。"
    },
    {
      "name": "渐变底色",
      "default": "linear-gradient(180deg, #ffffff, #f4f4f5)",
      "range": "任意双色",
      "effect": "键帽表面的光泽感。"
    },
    {
      "name": "按压下沉",
      "default": "translateY(1px)",
      "range": "1px – 2px",
      "effect": "active 时的按压深度。"
    }
  ],
  "pitfalls": [
    ":active 只写了 translateY 没把底边同步变薄，键帽看起来悬浮而不是压下去。",
    "边框厚度变化导致内容区高度跳动，文字轻微抖动（可用 box-shadow 模拟底边避免）。",
    "图形键用 SVG 但没和文字键统一 inline-grid 居中，混排时基线错位。",
    "深色变体直接改 color 忘了换渐变与边框，键帽在深底上失去立体感。",
    "用真实 <kbd> 语义却套了 button 样式类，或反之忘了语义标签只剩外观。"
  ],
  "effectTags": [
    "键帽",
    "拟物",
    "纯 CSS",
    "快捷键"
  ]
};
