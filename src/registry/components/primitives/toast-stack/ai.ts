import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "通知提示",
    "en": "Toast / Snackbar",
    "aliases": [
      "通知堆叠",
      "消息条",
      "toast"
    ],
    "pattern": "Toast · Transient Notification",
    "principle": "倒计时就是底部进度条的 CSS 动画（animationend 即定时器），悬停暂停动画即暂停关闭；退场先量真实高度写入 --ts-h，负 margin 收拢让排队通知平滑上移。"
  },
  "prompts": {
    "short": "做一个 Toast 堆叠：进度条即倒计时、悬停暂停、退场时后面的通知平滑上移，最多同时 4 条。原生 JS。",
    "standard": "用原生 HTML/CSS/JavaScript 实现 Toast 队列，不要引入库：\n1. 每条 toast 底部 2px 进度条跑 scaleX(1→0) 线性动画，duration 写入 --ts-duration；监听进度条 animationend 触发关闭——不需要 setTimeout，悬停/聚焦时 animation-play-state: paused 天然同步；\n2. 关闭前先读 offsetHeight 写入 --ts-h，退场动画 35% 处滑出、100% 处 margin-bottom: calc(-1 × var(--ts-h) - gap)，后面的通知平滑上移；\n3. role 区分：error 用 role=\"alert\" + aria-live=\"assertive\"，其余 role=\"status\" polite；\n4. 同屏超过 4 条自动让最早一条退场；animationend 加 setTimeout 兜底防 reduced-motion 下不触发。",
    "refined": "参数：默认时长 4200ms、进度条 2px 半透明 currentColor、入场 0.34s（translateX 24px + scale 0.96）、退场 0.3s、最大可见 4 条、堆叠宽 min(330px, 100vw - 40px)。验收：① 悬停时进度条与自动关闭同时冻结；② 关闭中间一条，后面的通知平滑上移不跳位；③ error 类型读屏立即打断播报；④ 连点按钮超出 4 条时最早的开始退场。"
  },
  "knobs": [
    {
      "name": "自动关闭时长",
      "default": "4200ms（--ts-duration）",
      "range": "2000ms – 10000ms",
      "effect": "进度条动画与关闭时机，二者同一动画。"
    },
    {
      "name": "最大可见条数",
      "default": "4",
      "range": "2 – 6",
      "effect": "超出后最早一条自动退场。"
    },
    {
      "name": "入场动画",
      "default": "0.34s cubic-bezier(0.22, 1, 0.36, 1)",
      "range": "0.2s – 0.5s",
      "effect": "从右侧 translateX(24px) 滑入的速度。"
    },
    {
      "name": "状态色板",
      "default": "success #16a34a / info #0284c7 / warning #d97706 / error #dc2626",
      "range": "任意色值",
      "effect": "data-type 经 currentColor 驱动图标与进度条颜色。"
    }
  ],
  "pitfalls": [
    "用 setTimeout 计时又用 CSS 动画做进度条，两套时钟漂移，悬停暂停后进度条停了但 toast 照关（应让 animationend 本身当定时器）。",
    "退场直接 display:none 或 opacity 0，下面排队的通知瞬间跳位；必须先量 offsetHeight 写 --ts-h 用负 margin 收拢。",
    "所有 toast 都用 role=\"alert\"，读屏被连环打断；error 之外应走 status/polite。",
    "动画关闭的定时器只依赖 animationend，reduced-motion 下动画时长 0.01ms 仍会触发但要防浏览器不派发，需 setTimeout 兜底。",
    "堆叠容器没限高也没上限数量，通知多了撑出屏幕。"
  ],
  "effectTags": [
    "通知",
    "堆叠",
    "倒计时",
    "aria-live"
  ]
};
