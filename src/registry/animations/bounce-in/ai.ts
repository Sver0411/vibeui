import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "弹性入场",
    "en": "Bounce In",
    "aliases": [
      "弹入",
      "过冲入场",
      "pop in"
    ],
    "pattern": "Bounce · Overshoot Entrance",
    "principle": "关键帧在 100% 前插入 108% 与 97% 两个过冲点（cubic-bezier 难做的弹性感），元素从 scale(.3) opacity 0 起跳；每个子元素用 --bi-delay 负值或递增正值错峰。"
  },
  "prompts": {
    "short": "做一组弹性入场动画：卡片从小到大带过冲弹跳进入，逐个错峰，纯 CSS 实现并提供 reduced-motion 降级。",
    "standard": "用纯 CSS 实现弹性入场：\n1. 关键帧：0% scale(.3) opacity 0 → 60% scale(1.08) → 80% scale(.97) → 100% scale(1) opacity 1，时长 0.55s；\n2. 类名：.bounce-in 应用后立即播放（animation-fill-mode: both 保证 delay 期间不可见）；\n3. 错峰：子项内联 --bi-delay: i*90ms，animation-delay: var(--bi-delay)；\n4. 组合：入场前元素由父容器 hover 或页面加载触发；\n5. 降级：prefers-reduced-motion 时 animation: none 且元素直接可见。",
    "refined": "扩展三方向变体：bounce-up（translateY 24px→0 + 微过冲）、bounce-left、bounce-scale（本例）；工具类 .bounce-stagger 自动按 DOM 顺序赋延迟（nth-child 或 JS 一次性内联）；配合 IntersectionObserver 提供 .in-view 触发版。验收：① 过冲不超出父容器裁切；② 20 个子项错峰依然 60fps（只动 transform/opacity）；③ 降级无闪烁。"
  },
  "knobs": [
    {
      "name": "过冲幅度 overshoot",
      "default": "1.08",
      "range": "1.04 – 1.15",
      "effect": "弹性强度，越大越 Q 弹。"
    },
    {
      "name": "时长 duration",
      "default": "550ms",
      "range": "350 – 800ms",
      "effect": "单元素入场时长。"
    },
    {
      "name": "错峰步长 stagger",
      "default": "90ms",
      "range": "50 – 150ms",
      "effect": "相邻元素延迟差。"
    }
  ],
  "pitfalls": [
    "只有 keyframes 没有 animation-fill-mode: both，延迟期间元素裸露。",
    "过冲 scale 超过父容器 overflow hidden 被裁切。",
    "错峰用 animation-delay 正值，页面加载前元素占位可见——fill-mode both 解决。",
    "弹跳用 cubic-bezier(0.68,-0.55,0.27,1.55) 单段模拟，回弹感不如多段关键帧。",
    "忘写 reduced-motion 降级，前庭敏感用户不适。"
  ],
  "effectTags": [
    "弹性",
    "入场",
    "错峰"
  ]
};
