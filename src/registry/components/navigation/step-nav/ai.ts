import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "步骤导航条",
    "en": "Step Navigation / Stepper",
    "aliases": [
      "Stepper",
      "分步条",
      "向导步骤条"
    ],
    "pattern": "Stepper · Wizard Flow",
    "principle": "状态机维护 current 索引，paint() 按 i<current 标 is-done、i===current 标 is-current，大于 current 的步骤按钮直接 disabled 锁定。"
  },
  "prompts": {
    "short": "做一个 4 步横向步骤条：已完成打勾可点击回退，当前步描边高亮，未完成锁定，带上一步/下一步按钮。原生 JS 实现。",
    "standard": "用原生 HTML/CSS/JavaScript 实现横向步骤导航：\n1. ol>li 每步右侧画连接线（last-child 隐藏），is-done/is-current 类由 paint() 全量重刷；\n2. 点击已完成步骤回退到该步，未完成步骤按钮 disabled，aria-current=\"step\" 标注当前步；\n3. 上一步/下一步按钮在首尾边界自动禁用，最后一步文案变「完成/已完成」；\n4. 当前步 dot 加 4px 主题色光晕，focus-visible 描边可达。不要引入任何库。",
    "refined": "可配置步骤条：4 步、dot 34px（480px 以下 28px）、主题色 #0f766e、连接线 2px 高与 dot 中心对齐（top 17px）。验收：① 点击已完成步骤回退后其后步骤重新锁定；② 走到最后一步时下一步按钮禁用且文案变「已完成」；③ 480px 断点下 dot 缩小、步骤名降为 11px 不换行。"
  },
  "knobs": [
    {
      "name": "步骤圆点尺寸",
      "default": "34px（480px 以下 28px）",
      "range": "24 – 44px",
      "effect": "步骤视觉权重，连接线 top 需同步取半径对齐。"
    },
    {
      "name": "主题色",
      "default": "#0f766e",
      "range": "任意 hex",
      "effect": "已完成实心、当前描边光晕、连接线着色与按钮主色。"
    },
    {
      "name": "当前步光晕",
      "default": "0 0 0 4px rgba(15,118,110,0.14)",
      "range": "2 – 8px 扩散",
      "effect": "进行中步骤的强调强度。"
    },
    {
      "name": "连接线过渡",
      "default": "background-color 0.25s ease",
      "range": "0.15 – 0.5s",
      "effect": "进度线着色回退时的过渡速度。"
    }
  ],
  "pitfalls": [
    "连接线没有从 calc(50% + 半径) 延伸到下一步（right: calc(-50% + 半径)），步骤宽度不等时线会错位或断开。",
    "回退后只改当前步不重刷三态，留下「幽灵已完成」；paint() 必须对每步同时 toggle is-done/is-current/disabled。",
    "最后一步的连接线没对 last-child 隐藏，会伸出一条多余短线。",
    "只用颜色区分完成/进行/锁定，色弱用户无法分辨；需配合对勾 SVG 与 aria-current。",
    "下一步按钮文案始终是「下一步」，最后一步没有「完成」变体，用户不知道流程已结束。"
  ],
  "effectTags": [
    "步骤条",
    "流程",
    "状态机",
    "进度"
  ]
};
