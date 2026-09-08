import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "滚动显现",
    "en": "Scroll Reveal",
    "aliases": [
      "滚动入场",
      "进入视口动画",
      "Scroll Into View"
    ],
    "pattern": "Scroll · Reveal on Enter",
    "principle": "IntersectionObserver 监听元素进入视口（threshold 0.25）后添加 .is-visible 类并 unobserve，CSS transition 把 opacity 0 → 1、translateY(18px) → 0 过渡出来，配合 transition-delay 做级联。"
  },
  "prompts": {
    "short": "做滚动进入视口时的淡入上移显现效果：卡片滚到可视区域时依次浮现，用 IntersectionObserver + CSS transition。",
    "standard": "用原生 JavaScript + CSS 实现滚动显现：\n1. 初始态 CSS：opacity: 0、transform: translateY(18px)；\n2. transition: opacity 0.55s ease, transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)，级联延迟用 calc(var(--d) * 70ms) 按序号递增；\n3. IntersectionObserver 设 threshold: 0.25，isIntersecting 时加 .is-visible 类并立即 unobserve（只播一次）；\n4. .is-visible 恢复 opacity: 1、transform: none；\n5. prefers-reduced-motion 或不支持 IO 时直接给所有元素加 .is-visible。\n不要引入动画库。",
    "refined": "实现可配置的滚动显现：\n- 触发阈值：默认 threshold 0.25（0.1 早触发 – 0.5 深入才触发）；\n- 位移量：默认 18px（8px 微妙 – 32px 夸张）；\n- 时长：默认 0.55s；\n- 级联步长：默认 70ms/个（通过 --d 自定义属性）。\n实现约束：只动画 opacity 与 transform；触发后 unobserve 避免反复触发；级联用 CSS 变量而非 JS setTimeout。\n验收标准：① 快速滚动无元素漏播；② 触发过的元素往回滚不重播；③ prefers-reduced-motion 下内容直接可见无位移。"
  },
  "knobs": [
    {
      "name": "触发阈值 threshold",
      "default": "0.25",
      "range": "0 – 0.5",
      "effect": "元素露出多少比例才触发，太高会滚过头才出现。"
    },
    {
      "name": "初始位移 translateY",
      "default": "18px",
      "range": "8 – 32 (px)",
      "effect": "入场时从下方浮起的距离，配 opacity 淡入。"
    },
    {
      "name": "过渡时长 duration",
      "default": "0.55s",
      "range": "0.3s – 1s",
      "effect": "单元素显现速度，transform 用 ease-out 缓动收尾。"
    },
    {
      "name": "级联步长 delay step",
      "default": "70ms",
      "range": "0 – 150 (ms)",
      "effect": "同屏多个元素依次错开的间隔，通过 --d 变量 × 步长计算。"
    }
  ],
  "pitfalls": [
    "IntersectionObserver 触发后忘记 unobserve，往回滚元素会再次隐藏重现、反复闪烁。",
    "初始态用 visibility: hidden 却在 .is-visible 里只改 opacity，元素占位仍可点击造成幽灵交互。",
    "位移动画挂在 top/margin 上而非 transform，同屏大量元素同时触发时明显掉帧。",
    "不支持 IntersectionObserver 的环境没有兜底，内容永远停在 opacity: 0 不可见。",
    "prefers-reduced-motion 下仍保留上移动画，或初始隐藏没解除导致内容看不到。",
    "级联延迟用 JS setTimeout 排队而不是 CSS transition-delay，元素多时定时器堆积难管理。"
  ],
  "effectTags": [
    "滚动",
    "显现",
    "入场",
    "级联"
  ]
};
