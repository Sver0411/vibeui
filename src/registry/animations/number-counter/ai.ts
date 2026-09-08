import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "数字滚动计数",
    "en": "Number Count-Up",
    "aliases": [
      "Odometer",
      "Count Up",
      "Stat Counter",
      "数字动画",
      "里程表"
    ],
    "pattern": "Scroll-triggered Animation · Data Reveal",
    "principle": "元素进入视口后用 requestAnimationFrame 在固定时长内按缓动函数插值，把 0 到目标值之间的每一帧结果写回文本节点，形成滚动逼近的观感。"
  },
  "prompts": {
    "short": "做一个数字滚动效果：统计数字在滚动进入视口时从 0 缓动增长到目标值，支持千分位和小数位。",
    "standard": "用原生 JavaScript 实现数字滚动计数：\n1. 目标值、小数位分别存在 data-count 与 data-decimals 上，从 DOM 读取；\n2. 用 IntersectionObserver（threshold: 0.4）监听进入视口，触发后立刻 unobserve，保证只播一次；\n3. 动画用 requestAnimationFrame，时长 1500ms，缓动为 easeOutCubic：1 - Math.pow(1 - t, 3)；\n4. 每帧用 toLocaleString('en-US', { minimumFractionDigits, maximumFractionDigits }) 格式化，自动带千分位；\n5. 提供重放按钮：把文本重置为 0 后重新 observe；\n6. 若用户开启 prefers-reduced-motion，直接显示终值不做动画；\n7. 离开视口时暂停 rAF 循环，避免后台标签页空转。",
    "refined": "实现一个可配置的数字滚动组件，参数化为：\n- duration：滚动总时长（默认 1500ms，可调 800–2500ms，数值越大越要拉长）；\n- easing：缓动函数（默认 easeOutCubic，需可切换为 easeOutExpo / linear）；\n- threshold：视口触发阈值（默认 0.4，列表场景可降到 0.2）；\n- decimals：小数位数（默认 0）；\n- locale 与千分位：默认 en-US，需支持传参切换；\n- once：是否只播一次（默认 true）。\n技术要求：用 IntersectionObserver 而非 scroll 事件；rAF 循环受外部暂停信号控制，离屏立即停止。\n验收标准：① 滚动中途离开视口能暂停、回来继续；② 数字使用 tabular-nums 或等宽字体，避免逐帧字宽变化导致横向抖动；③ prefers-reduced-motion 下直接呈现终值；④ 目标值为 0 或负数时不报错；⑤ 同屏多个计数器互不干扰。",
    "byFramework": {
      "react": "用 React + TypeScript 实现 <CountUp value={1234} decimals={0} duration={1500} /> 组件。内部用 useRef 持有 rAF id 与起始时间戳，useEffect 中注册 IntersectionObserver 触发动画，卸载时 cancelAnimationFrame 并断开 observer。要求：数字容器加 font-variant-numeric: tabular-nums 防止抖动；通过 matchMedia 检测 reduced-motion 直接渲染终值；暴露 onComplete 回调；SSR 安全（首屏渲染终值或 0 由 prop 决定，避免 hydration 不一致）。"
    }
  },
  "knobs": [
    {
      "name": "滚动时长",
      "default": "1500ms",
      "range": "800ms – 2500ms",
      "effect": "数字滚到位的快慢。数值量级越大越该拉长，否则后几位快到看不清。"
    },
    {
      "name": "缓动函数",
      "default": "easeOutCubic：1 - (1-t)³",
      "range": "easeOutCubic / easeOutExpo / linear",
      "effect": "起始快、结尾慢的减速最自然；linear 会显得机械，easeOutExpo 收尾更绵长。"
    },
    {
      "name": "触发阈值 threshold",
      "default": "0.4",
      "range": "0.2 – 0.6",
      "effect": "元素露出多少比例才开播。卡片列表里 0.4 可能永不触发，可降到 0.2。"
    },
    {
      "name": "小数位 decimals",
      "default": "0",
      "effect": "配合千分位格式化，用于金额、百分比、评分等场景。"
    },
    {
      "name": "数字字体",
      "default": "tabular-nums",
      "effect": "等宽数字保证逐帧字宽不变，是消除横向抖动的关键，常被忽略。"
    }
  ],
  "pitfalls": [
    "用 scroll 事件监听 + getBoundingClientRect 判断可见性会在滚动时高频触发布局计算，应当用 IntersectionObserver。",
    "数字用默认比例字体会导致每帧字宽变化，整行左右抽动——必须加 font-variant-numeric: tabular-nums。",
    "组件卸载或离开视口时忘记 cancelAnimationFrame，会在后台标签页持续空转耗电。",
    "prefers-reduced-motion 下仍做动画会引发不适，正确做法是直接显示终值。",
    "SSR 场景下服务端渲染 0、客户端再动画，容易出现 hydration 不匹配警告。",
    "目标值极大（如 10 亿）时逐帧 toLocaleString 开销明显，可改为只格式化整数部分或降帧。"
  ],
  "effectTags": [
    "数字",
    "滚动触发",
    "计数",
    "数据展示"
  ]
};
