import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "页面转场",
    "en": "Page Transition",
    "aliases": [
      "路由转场",
      "视图切换动画",
      "SPA Transition"
    ],
    "pattern": "Navigation · Exit-then-Enter",
    "principle": "旧页加 .is-exiting 播 0.2s 淡出上移，animationend 后隐藏旧页、显示新页并加 .is-entering 播 0.26s 自下升起，busy 标志位防止连点时两次转场重叠。"
  },
  "prompts": {
    "short": "做一个 SPA 页面切换转场：旧页淡出上移完成后新页再从下方淡入升起，连点不打断，原生 JS。",
    "standard": "用原生 JavaScript + CSS 实现页面转场：\n1. 所有页面 position: absolute; inset: 0 叠在同一容器，用 hidden 属性切换；\n2. 出场：旧页加 .is-exiting，animation: pt-exit 0.2s ease-in forwards（to 状态 opacity 0、translateY(-12px)）；\n3. 等 animationend（once: true）后再隐藏旧页，显示新页加 .is-entering，animation: pt-enter 0.26s cubic-bezier(0.22, 1, 0.36, 1)（from opacity 0、translateY(16px)）；\n4. busy 布尔锁：转场进行中忽略新点击；\n5. 入场动画结束的 animationend 里移除类并解锁；\n6. 不要用 setTimeout 硬编码时序，以 animationend 为准。",
    "refined": "实现可配置的路由转场：\n- 出场时长：默认 0.2s ease-in，位移 -12px；\n- 入场时长：默认 0.26s cubic-bezier(0.22, 1, 0.36, 1)，位移 16px；\n- 串行策略：必须 exit 完成 → 切 DOM → enter，不能同时动画（会闪白）；\n- 防重入：busy 锁 + 目标页等于当前页时直接 return。\n实现约束：时序全部由 animationend 驱动（once: true 防重复回调）；转场动画只用 opacity/transform；prefers-reduced-motion 下把动画压到 0.01s 保持状态机正确。\n验收标准：① 快速连点不同导航不会出现两页叠影或卡死；② 动画中断后 busy 锁能正确释放；③ 键盘可达，aria-current 正确迁移。"
  },
  "knobs": [
    {
      "name": "入场时长 enter duration",
      "default": "0.26s cubic-bezier(0.22, 1, 0.36, 1)",
      "range": "0.15s – 0.5s",
      "effect": "新页升起速度，ease-out 收尾显得干脆。"
    },
    {
      "name": "出场时长 exit duration",
      "default": "0.2s ease-in forwards",
      "range": "0.1s – 0.4s",
      "effect": "旧页退场速度，应比入场略短避免等待感。"
    },
    {
      "name": "入场位移 enter offset",
      "default": "16px",
      "range": "8 – 32 (px)",
      "effect": "新页从下方升起的距离，越大方向感越强。"
    },
    {
      "name": "出场位移 exit offset",
      "default": "-12px",
      "range": "-24 – -6 (px)",
      "effect": "旧页上移淡出的距离，与入场反向形成节奏。"
    }
  ],
  "pitfalls": [
    "用 setTimeout 对齐动画时长而不是监听 animationend，帧率波动或动画被打断时序就错乱。",
    "入场与出场同时播放且两页都绝对定位叠着，透明度叠加产生闪烁——必须串行：先出后进。",
    "没有 busy 锁，快速连点导航导致 animationend 回调交叉、页面状态错乱卡死。",
    "forwards 缺失导致出场动画结束后旧页闪回可见一帧。",
    "退出动画的 animationend 没用 once: true，页面复用时旧监听器再次触发。",
    "prefers-reduced-motion 下直接删动画会让依赖 animationend 的状态机永远不解锁——应改为 0.01s 而非 none。"
  ],
  "effectTags": [
    "转场",
    "路由",
    "SPA",
    "导航"
  ]
};
