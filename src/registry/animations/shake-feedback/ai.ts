import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "错误抖动反馈",
    "en": "Shake Feedback / Error Shake",
    "aliases": [
      "表单抖动",
      "错误摇晃",
      "Invalid Shake"
    ],
    "pattern": "Form · Error Shake",
    "principle": "校验失败时给字段容器加 .shake 类，keyframes 在 ±1.5–5px 间先放大后收敛的 8 档 translateX 摆动 0.42s；重连点可重播靠先移除类、void offsetWidth 强制 reflow 再加回；同步 aria-invalid + role=alert 文案。"
  },
  "prompts": {
    "short": "做一个表单校验失败时的抖动反馈：输入框左右摇晃 + 红框高亮，错误文案用 role=alert 播报，原生 JS。",
    "standard": "用原生 JavaScript + CSS 实现错误抖动：\n1. keyframes sf-shake 0.42s cubic-bezier(0.36, 0.07, 0.19, 0.97)：10%/90% ±1.5px、20%/80% ±3px、30–70% ±5px，幅度先增后收；\n2. 只对 input 动画（.sf-field.shake .sf-input），translateX 走 transform 不触发布局；\n3. 触发：classList.remove(\"shake\") → void offsetWidth 强制 reflow → classList.add(\"shake\")，保证连续提交能重播；\n4. 同步设置 aria-invalid=\"true\"、aria-describedby 指向 role=alert 错误文案，input.focus()；\n5. input 事件时清错误、移除 shake 类与红色边框。\n不引入动画库。",
    "refined": "实现可配置的错误抖动：\n- 时长：默认 0.42s，缓动 cubic-bezier(0.36, 0.07, 0.19, 0.97)；\n- 最大位移：默认 5px（3px 含蓄 – 8px 剧烈）；\n- 摆动档位：默认 8 档（10%–90% 均布，两端收敛）；\n- 重播机制：必须 reflow 重置而非重建节点。\n实现约束：动画只作用 transform；错误色同步到边框 #dc2626 与 3px 红色光环；prefers-reduced-motion 下抖动替换为 0.5s × 2 次红色 box-shadow 闪烁（保留反馈但不位移）。\n验收标准：① 连续点击提交每次都能重播抖动；② 输入修正后错误态立即清除；③ 读屏用户能通过 alert 听到错误信息。"
  },
  "knobs": [
    {
      "name": "抖动时长 duration",
      "default": "0.42s",
      "range": "0.3s – 0.6s",
      "effect": "摇晃总时长，过长显得拖沓、过短感知不到。"
    },
    {
      "name": "最大位移 max offset",
      "default": "5px",
      "range": "3 – 8 (px)",
      "effect": "中段峰值摆幅，keyframes 两端自动收敛到 1.5px。"
    },
    {
      "name": "缓动曲线 easing",
      "default": "cubic-bezier(0.36, 0.07, 0.19, 0.97)",
      "range": "自定义贝塞尔",
      "effect": "起摆急、收摆缓的经典 shake 曲线，改动会明显变味。"
    },
    {
      "name": "错误色 danger color",
      "default": "#dc2626（边框 + 3px 光环 rgba 0.12）",
      "range": "任意语义红",
      "effect": "抖动同步的视觉错误态颜色。"
    }
  ],
  "pitfalls": [
    "连续提交第二次不抖：直接 add 一个已存在的类不会重启动画，必须先 remove 再 void offsetWidth 强制 reflow。",
    "抖动动画挂在整个表单卡片上而不是单个 input，全页摇晃显得失控。",
    "用 left/margin 做 translateX 动画，抖动期间文本反复重排掉帧。",
    "只抖动不加 aria-invalid / role=alert，读屏用户完全不知道发生了错误。",
    "输入框修正内容后错误态不清除，红框和文案一直挂着误导用户。",
    "prefers-reduced-motion 下直接删掉动画，错误反馈彻底消失——应替换为高亮闪烁等非位移反馈。"
  ],
  "effectTags": [
    "抖动",
    "表单",
    "错误反馈",
    "无障碍"
  ]
};
