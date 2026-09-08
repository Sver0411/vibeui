import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "三点加载动画",
    "en": "Three-Dot Bouncing Loader",
    "aliases": [
      "三点弹跳",
      "打字机加载",
      "Typing Loader"
    ],
    "pattern": "Loading Indicator · Staggered Bounce",
    "principle": "三个圆点共用同一组 bounce 关键帧，靠 animation-delay 0.15s 逐个错峰，30% 处 translateY(-7px) 升起并恢复不透明度。"
  },
  "prompts": {
    "short": "做三个依次弹跳的小圆点加载动画，纯 CSS 单关键帧错峰实现，附按钮内联版。",
    "standard": "用纯 CSS 实现三点加载动画：\n1. 三个 10px 圆点共用一套 keyframes：0%/60%/100% 在原位 opacity 0.45，30% translateY(-7px) 且 opacity 1；\n2. 只给第 2、3 个点设 animation-delay 0.15s / 0.3s 形成波浪，不要写三套 keyframes；\n3. 动画只动 transform 和 opacity，不碰 margin/padding；\n4. 提供按钮内联变体：圆点缩小到 5px、颜色用 currentColor 继承按钮文字色；\n5. 提供 prefers-reduced-motion 降级：弹跳换成透明度脉冲。",
    "refined": "可配置三点加载动画：周期 1s ease-in-out infinite、错峰延迟 0.15s、弹跳幅度 translateY(-7px)、圆点 10px / 内联 5px、颜色 #26262b（内联 currentColor）。验收：① 三点呈连续波浪无相位断裂；② 动画期间布局零抖动；③ reduced-motion 下变为呼吸式透明度脉冲而非完全静止。"
  },
  "knobs": [
    {
      "name": "弹跳幅度",
      "default": "translateY(-7px)",
      "range": "-4px – -12px",
      "effect": "每个点升起的高度。"
    },
    {
      "name": "动画周期",
      "default": "1s ease-in-out infinite",
      "range": "0.6s – 1.6s",
      "effect": "一次完整弹跳的节奏。"
    },
    {
      "name": "错峰延迟",
      "default": "0.15s / 0.3s",
      "range": "0.05s – 0.3s",
      "effect": "点与点之间的波浪间隔，过大会断成各自跳动。"
    },
    {
      "name": "圆点尺寸",
      "default": "10px（内联变体 5px）",
      "range": "4px – 14px",
      "effect": "加载指示器的视觉重量。"
    },
    {
      "name": "圆点颜色",
      "default": "#26262b / 内联 currentColor",
      "range": "任意颜色",
      "effect": "独立使用为固定色，按钮内继承文字色。"
    }
  ],
  "pitfalls": [
    "给三个点各写一套 keyframes，想改节奏要改三处——正确做法是共用一帧靠 animation-delay 错峰。",
    "漏掉 prefers-reduced-motion 降级；本实现的降级是换成透明度脉冲而非简单 animation: none。",
    "用 margin-top 或 padding 做弹跳，每帧改变布局让周围元素跟着晃。",
    "按钮内联变体把颜色写死，换主题色后圆点与文字脱节，应该用 currentColor。",
    "独立使用时外层没有 role=\"status\" 与 aria-label，屏幕阅读器完全不知道在加载。"
  ],
  "effectTags": [
    "加载",
    "圆点",
    "弹跳",
    "错峰",
    "纯 CSS"
  ]
};
