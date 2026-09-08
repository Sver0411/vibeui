import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "线性进度条",
    "en": "Linear Progress Bar",
    "aliases": [
      "水平进度条",
      "进度条",
      "不定进度条"
    ],
    "pattern": "Progress Indicator · Determinate / Indeterminate",
    "principle": "轨道内一个填充 div，确定模式改 width 百分比并同步 aria-valuenow；不定模式用 40% 宽的渐变条以 translateX 扫动循环。"
  },
  "prompts": {
    "short": "做一个带标签和百分比的水平进度条，支持确定进度和不定进度扫动两种模式。原生 HTML/CSS/JS。",
    "standard": "用原生 HTML/CSS/JavaScript 实现线性进度条：\n1. 外层 role=\"progressbar\" 带 aria-valuenow/min/max，轨道高 6px 圆角 999px，填充 div 改 width 百分比；\n2. 不定进度模式：填充条宽 40%、背景 linear-gradient(90deg, transparent, accent, transparent)，用 keyframes 改 transform: translateX 扫动，不要动画 width；\n3. 更新进度时同步 aria-valuenow 与等宽数字百分比文本；\n4. 提供 prefers-reduced-motion 降级：扫动停止，改为 100% 宽半透明静止条；\n5. 原生实现，不引入库。",
    "refined": "可配置线性进度条：--lp-accent #0f766e、轨道高 6px、确定模式 width 过渡 0.4s cubic-bezier(0.22,1,0.36,1)、不定模式条宽 40% 扫动周期 1.4s ease-in-out。验收：① 0→100 演示约 2.6s 且 aria-valuenow 实时同步；② 不定进度扫动流畅无跳帧（只动 transform）；③ reduced-motion 下不定条变为静止半透明。"
  },
  "knobs": [
    {
      "name": "进度色 --lp-accent",
      "default": "#0f766e",
      "range": "任意 CSS 颜色",
      "effect": "填充条与不定进度扫光的主色。"
    },
    {
      "name": "轨道高度",
      "default": "6px",
      "range": "3px – 12px",
      "effect": "进度条粗细。"
    },
    {
      "name": "确定模式过渡",
      "default": "width 0.4s cubic-bezier(0.22,1,0.36,1)",
      "range": "0.1s – 0.8s",
      "effect": "进度跳变时的平滑程度。"
    },
    {
      "name": "不定进度条宽",
      "default": "40%",
      "range": "20% – 60%",
      "effect": "扫动光带的长度。"
    },
    {
      "name": "扫动周期",
      "default": "1.4s ease-in-out infinite",
      "range": "0.8s – 2.5s",
      "effect": "不定模式来回扫动的速度。"
    }
  ],
  "pitfalls": [
    "不定进度用动画改 width 而不是 transform: translateX，每帧触发 layout 掉帧。",
    "只有视觉更新，没同步 aria-valuenow，或干脆漏掉 role=\"progressbar\"。",
    "百分比数字不用 font-variant-numeric: tabular-nums，每帧宽度抖动。",
    "填充条圆角与轨道不一致，端点在浅色轨道上露出直角。",
    "漏掉 reduced-motion 降级：不定进度应变为静止的半透明满宽条而不是永远扫动。"
  ],
  "effectTags": [
    "进度",
    "进度条",
    "不定进度",
    "可访问性",
    "扫动"
  ]
};
