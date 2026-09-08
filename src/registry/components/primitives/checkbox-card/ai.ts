import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "勾选复选框",
    "en": "Animated Checkbox / Checkbox Card",
    "aliases": [
      "对勾动画",
      "卡片式选项",
      "自定义 checkbox"
    ],
    "pattern": "Form Control · Checkbox",
    "principle": "隐藏原生 input，用 :checked 兄弟选择器驱动样式；对勾是 SVG 描边，stroke-dashoffset 16→0 完成描边弹入。"
  },
  "prompts": {
    "short": "做一个自定义复选框：选中时对勾描边弹入，另有整卡可点的卡片式选项。纯 CSS。",
    "standard": "用纯 CSS 实现自定义复选框（保留原生 input 保证键盘可用，不要引入库）：\n1. input 视觉隐藏（opacity:0 尺寸 0），20px 圆角盒子用 :checked + 兄弟选择器换底色；\n2. 对勾是 SVG path，stroke-dasharray: 16、初始 stroke-dashoffset: 16，选中后过渡到 0 形成描边动画，同时 transform 从 scale(0.5) 弹到 1；\n3. :focus-visible 时给盒子画 outline 保证键盘可达；\n4. 卡片变体用 :has(input:checked) 整卡描边高亮。",
    "refined": "参数：盒子 20px、圆角 6px、边框 1.5px，选中底色 #0f766e；对勾描边 0.25s ease 延迟 0.05s（等盒子先变色）、缩放 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)；卡片 padding 14px 16px、圆角 12px、选中 box-shadow 0 0 0 1px。验收：① 键盘 Tab + 空格可切换且 focus 圈可见；② 快速连点动画不残留；③ 禁用态 opacity 0.45 且光标 not-allowed。"
  },
  "knobs": [
    {
      "name": "描边时长与延迟",
      "default": "0.25s ease，延迟 0.05s",
      "range": "0.15s – 0.4s / 0 – 0.1s",
      "effect": "对勾描入速度；延迟让盒子底色先到位。"
    },
    {
      "name": "弹入缩放",
      "default": "scale(0.5) → 1，0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
      "range": "0.3 – 0.7 起始",
      "effect": "对勾出现时的过冲弹性。"
    },
    {
      "name": "选中色",
      "default": "#0f766e",
      "range": "任意色值",
      "effect": "盒子底色、边框与卡片描边。"
    },
    {
      "name": "盒子尺寸",
      "default": "20px、圆角 6px",
      "range": "16px – 26px",
      "effect": "点击区域大小；对勾 11px 需同步缩放。"
    }
  ],
  "pitfalls": [
    "对勾 SVG 没设 stroke-dasharray 等于路径长度（16），描边动画直接瞬移没有描入过程。",
    "input 用 display:none 而不是视觉隐藏，键盘完全无法聚焦切换。",
    "卡片变体只靠后代的 :checked 改盒子样式，忘了 :has(input:checked) 时整卡高亮不生效（或不支持的浏览器无兜底）。",
    "缩放动画的 transform-origin 默认在中心没问题，但若把对勾改成 absolute 定位忘了居中，弹入会偏位。",
    "reduced-motion 下没把 transition-duration 压到 0.01ms，动画在系统减弱动效时仍会播放。"
  ],
  "effectTags": [
    "表单",
    "勾选",
    "描边动画",
    "纯 CSS"
  ]
};
