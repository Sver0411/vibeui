import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "加载状态按钮",
    "en": "Loading / Async Button",
    "aliases": [
      "异步按钮",
      "提交按钮",
      "Loading Button"
    ],
    "pattern": "Button State Machine · idle → loading → success → idle",
    "principle": "data-state 驱动四种状态切换：loading 时显示 0.7s 线性旋转圈，成功时变绿弹出打勾动画，1.6s 后自动复位，期间按钮保持 disabled。"
  },
  "prompts": {
    "short": "做一个异步提交按钮：点击后文字变加载圈，成功变绿打勾，然后自动复位。原生 JS 状态机实现。",
    "standard": "用原生 HTML/CSS/JavaScript 实现加载状态按钮：\n1. 按钮内常驻 spinner、label、check 三个子元素，由 data-state=\"idle/loading/success\" 控制显隐，JS 只改状态不改 DOM 结构；\n2. loading 时按钮 disabled 防重复提交，spinner 用双描边（rgba 白 0.35 + 顶边纯白）做 0.7s linear 旋转；\n3. 成功态换 --state-accent 背景色，打勾图标用 scale 0.4 起步的 pop 动画弹出；\n4. 按钮设 min-width 固定宽度，文案切换不引起布局跳动；\n5. 原生实现，不引入库。",
    "refined": "可配置加载按钮：模拟任务 1800ms、成功停留 1600ms 后复位、spinner 14px 转 0.7s linear、成功色 --state-accent #0f766e、min-width 220px、active 按压 scale 0.98。验收：① loading 期间连点无效；② 打勾 pop 动画一次性播放后停留；③ 复位后文案恢复原文且按钮重新可点。"
  },
  "knobs": [
    {
      "name": "任务时长",
      "default": "1800ms",
      "range": "500ms – 5000ms",
      "effect": "loading 态持续多久（demo 为模拟值，接真实请求即可）。"
    },
    {
      "name": "成功停留",
      "default": "1600ms",
      "range": "800ms – 3000ms",
      "effect": "打勾确认态展示多久后自动复位。"
    },
    {
      "name": "spinner 转速",
      "default": "0.7s linear infinite",
      "range": "0.5s – 1.2s",
      "effect": "加载圈旋转速度，必须 linear 否则忽快忽慢。"
    },
    {
      "name": "成功色 --state-accent",
      "default": "#0f766e",
      "range": "任意 CSS 颜色",
      "effect": "成功态的背景色。"
    },
    {
      "name": "按钮最小宽 min-width",
      "default": "220px",
      "range": "按最长文案设定",
      "effect": "锁定宽度，状态切换时按钮不跳。"
    }
  ],
  "pitfalls": [
    "不同状态间文案长度不同又没设 min-width，按钮宽度来回跳。",
    "loading 态忘记 disabled，用户连点触发多个并发请求。",
    "spinner 四条边颜色全一样，转起来看不出在转——必须有一条边不同色。",
    "异步请求 reject 时没有失败分支，按钮永远卡在 loading。",
    "打勾动画每次进入成功态重复触发失败：pop 动画绑定在 data-state 选择器上，状态切换会自动重放，别用 classList.add 追加。"
  ],
  "effectTags": [
    "按钮",
    "加载",
    "异步",
    "状态机",
    "打勾"
  ]
};
