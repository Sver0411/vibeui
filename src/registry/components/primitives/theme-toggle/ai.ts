import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "明暗切换开关",
    "en": "Theme Toggle / Day-Night Switch",
    "aliases": [
      "日夜开关",
      "太阳月亮开关",
      "dark mode toggle"
    ],
    "pattern": "Toggle · Theme Switch",
    "principle": "button 承载 role=switch + aria-checked，JS 切 is-on 类；太阳/月亮两层 SVG 靠 opacity 与 rotate±60°/scale 交叉淡变，滑块用带过冲的弹簧缓动滑入深夜蓝轨道。"
  },
  "prompts": {
    "short": "做一个明暗主题开关：太阳月亮交叉旋转淡变，轨道由灰转深夜蓝，滑块回弹。原生 JS。",
    "standard": "用原生 HTML/CSS/JavaScript 实现明暗切换开关，不要引入库：\n1. 本体是 button + role=\"switch\"，点击时 toggle is-on 并同步 aria-checked=\"true|false\"，状态文案同步更新；\n2. 滑块直径 = 轨道高 - 6px，选中时 translateX(calc(var(--tt-w) - var(--tt-h)))，过渡 0.32s cubic-bezier(0.34, 1.56, 0.64, 1) 带回弹；\n3. 太阳与月亮两个绝对定位 SVG：is-on 时太阳 rotate(60deg) scale(0.5) 淡出、月亮从 rotate(-60deg) scale(0.5) 转正淡入（0.4s cubic-bezier(0.22, 1, 0.36, 1)）；\n4. 轨道 #e4e4e7 → #312e81（0.3s），滑块白色 → #1e1b4b。",
    "refined": "参数：轨道 58×32（小尺寸变体 44×25）、滑块过渡 0.32s cubic-bezier(0.34, 1.56, 0.64, 1)、图标交叉 0.4s cubic-bezier(0.22, 1, 0.36, 1)（旋转 ±60° + scale 0.5）、太阳描边 #f59e0b、月亮填充 #c7d2fe。验收：① 读屏播报 switch 开/关状态；② 图标交叉时无叠影残帧（两态 opacity 严格互斥）；③ 小尺寸变体滑块行程正确（+1px 修正）不露底；④ reduced-motion 下全部瞬移。"
  },
  "knobs": [
    {
      "name": "轨道尺寸",
      "default": "58px × 32px（sm 变体 44×25）",
      "range": "44×25 – 72×40",
      "effect": "开关整体大小，通过 --tt-w/--tt-h 变量控制。"
    },
    {
      "name": "滑块缓动",
      "default": "0.32s cubic-bezier(0.34, 1.56, 0.64, 1)",
      "range": "0.25s – 0.5s",
      "effect": "滑入行程的回弹过冲强度。"
    },
    {
      "name": "图标交叉动画",
      "default": "0.4s cubic-bezier(0.22, 1, 0.36, 1)，rotate ±60° + scale 0.5",
      "range": "0.25s – 0.6s / ±30° – ±90°",
      "effect": "太阳月亮交接的旋转幅度与速度。"
    },
    {
      "name": "夜晚轨道色",
      "default": "#312e81（滑块 #1e1b4b）",
      "range": "任意深色",
      "effect": "开启态的轨道与滑块配色。"
    }
  ],
  "pitfalls": [
    "图标交叉时两层 opacity 同时过 0.5，出现太阳月亮叠影；应让淡出先于淡入完成或用 transform 补偿。",
    "滑块行程没按 --tt-w - --tt-h 计算，改尺寸后滑块顶出或留缝；小尺寸变体还需 +1px 修正。",
    "button 没设 role=\"switch\"/aria-checked，读屏只念「按钮」不念状态。",
    "回弹缓动用在 transform 上，但按钮的 focus outline 位移或 active 缩放又改 transform，互相覆盖。",
    "只在浅色页面预览，月亮填充色在深色卡片上看不清。"
  ],
  "effectTags": [
    "主题切换",
    "图标交叉淡变",
    "回弹",
    "switch 语义"
  ]
};
