import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "标签输入框",
    "en": "Tag Input",
    "aliases": [
      "标签选择器",
      "chip 输入",
      "Tags Input"
    ],
    "pattern": "Tag Input · Chips Field",
    "principle": "tags 数组是唯一数据源，render() 全量重建 chips 插到输入框之前；Enter 添加（trim + 压缩连续空白 + 去重 + 上限 5 校验），输入框为空时 Backspace 删除末位；报错靠移除 class 后 void offsetWidth 强制 reflow 再加回，实现抖动动画可重复播放。"
  },
  "prompts": {
    "short": "做一个 chip 式标签输入框：回车添加、退格删除末位、× 逐个移除、重复或超 5 个时抖动报错。原生 JS 实现。",
    "standard": "用原生 HTML/CSS/JavaScript 实现标签输入框：\n1. tags 数组为数据源，render() 清掉旧 chips 后按数组重建并插在 input 之前；每个 × 是 button 且带 aria-label='移除标签 xx'；\n2. Enter 添加：trim 并把连续空白压成单空格，空值忽略；超上限 5 或重复时提示文案标红、外框加 0.28s 抖动动画；\n3. 输入框为空时 Backspace 删除最后一个标签；\n4. field 上 pointerdown 且 target === field 时 preventDefault 并 focus 输入框，实现点击空白聚焦；\n5. 抖动重放：remove class → void offsetWidth 强制 reflow → add class。不要引入任何库。",
    "refined": "可配置标签输入框：上限 5 个、chip 弹入 0.18s cubic-bezier(0.22,1,0.36,1) scale 0.85→1、抖动 0.28s ±4px、输入框 min-width 90px / 外框 min-height 46px、chip 青色 #ccfbf1 底 #134e4a 字。验收：① 输入 '  a  b  ' 存为 'a b'；② 重复添加同一标签只抖动不新增；③ 空输入框 Backspace 删末位 chip 且焦点不动；④ 连续两次触发报错动画都能重放。"
  },
  "knobs": [
    {
      "name": "标签上限 MAX",
      "default": "5",
      "range": "3 – 20",
      "effect": "超限时抖动报错的阈值。"
    },
    {
      "name": "chip 弹入动画",
      "default": "0.18s scale 0.85→1",
      "range": "0.1 – 0.3s",
      "effect": "新 chip 进场的弹性强度。"
    },
    {
      "name": "抖动动画",
      "default": "0.28s ±4px",
      "range": "0.2 – 0.4s",
      "effect": "重复/超限报错的晃动幅度。"
    },
    {
      "name": "输入框最小宽",
      "default": "90px",
      "range": "60 – 140px",
      "effect": "chips 占满一行后输入框的收缩下限。"
    },
    {
      "name": "chip 配色",
      "default": "#ccfbf1 底 / #134e4a 字",
      "range": "任意色对",
      "effect": "可编辑 chip 与彩色只读变体的外观。"
    }
  ],
  "pitfalls": [
    "用 innerHTML 拼接渲染 chip，标签文本含 <、& 时被当 HTML 解析甚至注入；应 createElement + textContent。",
    "Backspace 删末位没判断输入框是否为空，正在编辑的内容一按退格标签就被误删。",
    "报错只 add class，class 已存在时第二次不播放；要 remove → reflow → add 才能重放抖动。",
    "添加前没 trim / 压缩空白 / 去重，'前端' 与 '前端 ' 被当成两个标签。",
    "chip 的 × 用 span 而非 button，无法聚焦，键盘用户无法移除标签。",
    "超限判断放在 push 之后，标签先进数组再报错，状态与提示互相矛盾。"
  ],
  "effectTags": [
    "标签",
    "chip",
    "去重",
    "微交互",
    "表单"
  ]
};
