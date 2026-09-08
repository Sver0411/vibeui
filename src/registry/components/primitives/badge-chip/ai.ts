import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "徽章与标签",
    "en": "Badge & Chip",
    "aliases": [
      "状态标签",
      "可移除 Chip",
      "呼吸圆点"
    ],
    "pattern": "Badge · Status Indicator",
    "principle": "胶囊标签用半透明同色背景叠文字色实现五档状态；圆点靠 ::after 放大淡出的 2s 循环动画做呼吸；移除标签先加 is-leaving 缩放淡出、transitionend 后再删节点。"
  },
  "prompts": {
    "short": "做一组状态徽章：五色胶囊、可移除标签（缩小淡出后删 DOM）、呼吸状态圆点。原生 JS 处理移除。",
    "standard": "用原生 HTML/CSS/JavaScript 实现徽章三件套，不要引入库：\n1. 胶囊 chip：圆角 999px、padding 5px 12px，每档状态用「10% 透明度底色 + 实色文字 + 20% 透明度边框」的同一色系三件套；\n2. 可移除标签：内部 18px 圆形删除按钮，点击后加 is-leaving（scale 0.8 + opacity 0，0.18s），监听 transitionend（once）后再 remove()；\n3. 呼吸圆点：9px 实心点，::after inset -3px 做 dot-pulse 动画（scale 0.6→1.4 + 淡出，2s ease-out infinite），warning/danger 用 animation-delay 错开。",
    "refined": "参数：chip 字号 12.5px、呼吸周期 2s、三色圆点延迟 0s/0.6s/1.2s、移除动画 0.18s scale(0.8)。验收：① 移除标签动画播完才从 DOM 消失、不跳版；② 圆点光晕循环无缝；③ reduced-motion 下 ::after 动画直接关闭（opacity 0）；④ 删除按钮 hover 变红放大 1.08 有反馈。"
  },
  "knobs": [
    {
      "name": "呼吸周期",
      "default": "2s ease-out infinite",
      "range": "1.2s – 3s",
      "effect": "dot-pulse 光晕扩散快慢。"
    },
    {
      "name": "圆点错峰延迟",
      "default": "0s / 0.6s / 1.2s",
      "range": "0 – 1s 步进",
      "effect": "多圆点之间的波浪错落感。"
    },
    {
      "name": "移除动画",
      "default": "0.18s，scale(0.8) + opacity 0",
      "range": "0.1s – 0.3s",
      "effect": "标签退场时长与收缩幅度。"
    },
    {
      "name": "chip 内边距",
      "default": "5px 12px，字号 12.5px",
      "range": "4px 10px – 7px 14px",
      "effect": "胶囊大小与文字密度。"
    }
  ],
  "pitfalls": [
    "移除标签时直接 remove() 没有等 transitionend，退场动画被瞬间掐断。",
    "transitionend 可能因元素已 display:none 或动画被 reduced-motion 关闭而不触发，需要 setTimeout 兜底。",
    "呼吸圆点把动画放在本体上导致圆点自己缩放闪烁，正确做法是动画只作用于 ::after 光晕层。",
    "状态色只改背景不改文字/边框的透明度层次，对比度不足文字看不清。",
    "删除按钮用 div 没用 button/input，键盘无法聚焦删除。"
  ],
  "effectTags": [
    "徽章",
    "状态",
    "呼吸",
    "轻交互"
  ]
};
