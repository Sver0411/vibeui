import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "数量步进器",
    "en": "Stepper Input",
    "aliases": [
      "数量选择器",
      "加减器",
      "Quantity Stepper"
    ],
    "pattern": "Stepper · Long-press Repeat",
    "principle": "pointerdown 启动 400ms 延时后以 90ms setInterval 连发，pointerup/pointerleave/pointercancel 全部终止并解绑；数值 clamp 到 [min,max] 后同步禁用越界方向按钮，变化时 remove→void offsetWidth→add 重放弹动动画，output[aria-live] 播报当前值。"
  },
  "prompts": {
    "short": "做一个 ± 数量步进器：单击 ±1、长按 400ms 后连发、到边界自动禁用对应按钮、数值变化带弹动反馈。原生 JS 实现。",
    "standard": "用原生 HTML/CSS/JavaScript 实现数量步进器：\n1. ± 按钮 data-dir=±1：click 单击步进；pointerdown 启动连发（400ms 延时后 90ms 间隔 setInterval），pointerup/pointerleave/pointercancel 都要清定时器并解绑监听；\n2. 数值 clamp 在 [min,max]，value<=min 禁用减按钮、>=max 禁用加按钮（disabled 属性）；\n3. 数值变化重放弹动动画：remove class → void offsetWidth 强制 reflow → add class；\n4. 当前值写 output[aria-live=polite]，达上限时提示文案加警示色。不要引入任何库。",
    "refined": "可配置步进器：基础款 min 0 / max 99 / 初值 1，边界款 min 1 / max 9 带'库存充足/已达库存上限'提示，step 1、长按延时 400ms / 连发间隔 90ms、按钮 34×34px、弹动 0.18s scale 1→1.15→1、按压缩放 0.92。验收：① 长按到边界自动停且对应按钮变禁用；② 按住并把指针移出按钮，连发停止；③ 连续单击弹动每次都重放；④ 整个过程 aria-live 播报数值。"
  },
  "knobs": [
    {
      "name": "长按延时",
      "default": "400ms",
      "range": "250 – 600ms",
      "effect": "单击与进入连发的分界时长。"
    },
    {
      "name": "连发间隔",
      "default": "90ms",
      "range": "50 – 150ms",
      "effect": "长按时数值增长的速率。"
    },
    {
      "name": "数值范围 min/max",
      "default": "0–99（基础）/ 1–9（边界）",
      "range": "自定义",
      "effect": "clamp 边界与按钮禁用阈值。"
    },
    {
      "name": "弹动动画",
      "default": "0.18s scale 1→1.15→1",
      "range": "0.1 – 0.3s",
      "effect": "数值变化的视觉反馈强度。"
    },
    {
      "name": "按钮尺寸",
      "default": "34×34px",
      "range": "28 – 44px",
      "effect": "点击热区与整体宽度。"
    }
  ],
  "pitfalls": [
    "连发只清 setInterval 不清外层 setTimeout（或反之），提前松手后仍继续连发。",
    "只监听 pointerup 终止连发，指针移出按钮后 setInterval 继续跑；要补 pointerleave 和 pointercancel。",
    "到边界只 clamp 数值不 disable 按钮，按钮可点但数值不动，长按时还反复触发 bump。",
    "click 与 pointerdown 连发叠加：pointerdown 启动长按、松手又触发一次 click，单击多加一步。",
    "弹动动画只 add class，class 已存在时第二次不播放；需 remove → reflow → add。",
    "数值用 div 展示且没有 aria-live，读屏用户感知不到数量变化。"
  ],
  "effectTags": [
    "步进器",
    "长按连发",
    "边界禁用",
    "微交互",
    "表单"
  ]
};
