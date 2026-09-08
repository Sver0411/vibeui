import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "多步骤进度",
    "en": "Multi-Step Progress / Stepper",
    "aliases": [
      "步骤条",
      "向导进度",
      "Stepper"
    ],
    "pattern": "Wizard / Stepper · Segmented Progress",
    "principle": "一排状态圆点压在一条 2px 连接线上，线内填充层宽度 = (current-1)/(total-1)，data-state 驱动已完成/当前/待办三种样式。"
  },
  "prompts": {
    "short": "做一个四步结账步骤条：圆点加连接进度线，已完成步骤可点击回跳，当前步有光环。原生 HTML/CSS/JS。",
    "standard": "用原生 HTML/CSS/JavaScript 实现多步骤进度条：\n1. ol 内一排步骤（圆点按钮 + 标签），绝对定位一条 2px 连接线放在圆点后面（z-index 层级压住）；\n2. 每个步骤 data-state=\"done/current/todo\"，已完成与当前步圆点填充主色，当前步加 4px 半透明光环；\n3. 填充线宽度 = (current - 1) / (total - 1) * 100%，带 width 过渡；\n4. 只有已完成步骤的圆点可点击回跳（disabled 其余），Back/Next 同步边界；\n5. 原生实现，不引入库。",
    "refined": "可配置步骤条：主色 #0f766e、圆点 34px 边框 2px、填充线过渡 width 0.35s cubic-bezier(0.22,1,0.36,1)、当前步光环 box-shadow 0 0 0 4px rgba(15,118,110,0.15)、hover 放大 1.06。验收：① 1 步时线宽 0、走完 4 步线宽 100% 且两端对齐圆心；② 点击已完成步骤回跳后后续步骤自动变回待办；③ 未完成步骤不可点。"
  },
  "knobs": [
    {
      "name": "主题色",
      "default": "#0f766e",
      "range": "任意 CSS 颜色",
      "effect": "已完成/当前圆点、填充线与光环的颜色。"
    },
    {
      "name": "填充线过渡",
      "default": "width 0.35s cubic-bezier(0.22,1,0.36,1)",
      "range": "0.2s – 0.6s",
      "effect": "切换步骤时连接线的推进手感。"
    },
    {
      "name": "当前步光环",
      "default": "0 0 0 4px rgba(15,118,110,0.15)",
      "range": "2px – 8px",
      "effect": "当前步骤的强调强度。"
    },
    {
      "name": "圆点尺寸",
      "default": "34px（边框 2px）",
      "range": "24px – 44px",
      "effect": "步骤点的视觉重量与点击热区。"
    },
    {
      "name": "hover 缩放",
      "default": "scale(1.06)",
      "range": "1 – 1.15",
      "effect": "可点击圆点悬停时的反馈幅度。"
    }
  ],
  "pitfalls": [
    "填充线宽度用 current/total 而不是 (current-1)/(total-1) 计算，第一步线就不为 0、最后一步永远走不满。",
    "连接线没压在圆点下层（z-index 处理错误），线从圆点上方穿过非常难看。",
    "允许点击任意步骤直接跳步，破坏流程约束——只有已完成步骤可回跳。",
    "回跳后不重置后续步骤的 data-state，出现两个「当前」步骤。",
    "状态只靠颜色区分，色弱用户无法分辨 done/current，应配合勾选图标与 disabled 状态。"
  ],
  "effectTags": [
    "进度",
    "步骤条",
    "向导",
    "结账流程",
    "状态机"
  ]
};
