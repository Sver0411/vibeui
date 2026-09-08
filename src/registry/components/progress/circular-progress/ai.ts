import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "环形进度环",
    "en": "Circular Progress Ring",
    "aliases": [
      "进度环",
      "圆环进度",
      "Radial Progress"
    ],
    "pattern": "Progress Indicator · SVG Stroke",
    "principle": "SVG 圆设置 pathLength=100 归一化周长，用 stroke-dashoffset 从 100 减到 100-p 露出弧长，CSS transition 平滑填充。"
  },
  "prompts": {
    "short": "用 SVG 做一个环形进度条，中间显示百分比数字，进度用圆弧描边动画填充。原生 HTML/CSS/JS。",
    "standard": "用原生 HTML/CSS/JavaScript 实现环形进度环：\n1. SVG 内画两个同心 circle（轨道 + 进度），进度圆加 pathLength=\"100\"，stroke-dasharray: 100，初始 dashoffset 100；\n2. svg 整体 rotate(-90deg) 让进度从顶部 12 点方向开始；\n3. setProgress(p) 只改 stroke-dashoffset = 100 - p，并用 transition 平滑；\n4. 中心文字与 role=\"progressbar\" 的 aria-valuenow 同步更新；\n5. 不要引入任何库，尺寸用 CSS 变量控制以便缩放。",
    "refined": "可配置环形进度环：--cp-accent 进度色、--cp-size 环尺寸、stroke-width 7、填充过渡 stroke-dashoffset 0.5s cubic-bezier(0.22,1,0.36,1)、百分比用 tabular-nums 等宽数字。验收：① 滑杆拖动时弧线平滑跟随且 aria-valuenow 同步；② 0→100 不出现缺口或重叠；③ 改 --cp-size 环等比缩放描边不糊。"
  },
  "knobs": [
    {
      "name": "进度色 --cp-accent",
      "default": "#26262b",
      "range": "任意 CSS 颜色",
      "effect": "进度弧与中心数字的颜色。"
    },
    {
      "name": "环尺寸 --cp-size",
      "default": "128px",
      "range": "64px – 320px",
      "effect": "整体直径，描边随 viewBox 等比缩放。"
    },
    {
      "name": "描边宽度 stroke-width",
      "default": "7",
      "range": "3 – 14",
      "effect": "圆环粗细，数值按 96×96 viewBox 计。"
    },
    {
      "name": "填充过渡",
      "default": "stroke-dashoffset 0.5s cubic-bezier(0.22,1,0.36,1)",
      "range": "0.2s – 1s",
      "effect": "进度变化时弧线的缓动速度与手感。"
    },
    {
      "name": "端点样式 stroke-linecap",
      "default": "round",
      "range": "round / butt / square",
      "effect": "弧线两端是圆头还是平头。"
    }
  ],
  "pitfalls": [
    "忘记给进度圆加 pathLength=\"100\"，就得自己算 2πr≈263.9 的真实周长，dashoffset 直接写百分比数值会画错。",
    "SVG 不旋转 -90deg，进度会从 3 点钟方向开始而不是顶部。",
    "只更新了视觉弧线，没同步 role=\"progressbar\" 的 aria-valuenow，屏幕阅读器读不到进度。",
    "用 transform: scale() 缩放环会导致描边模糊，正确做法是改 CSS 变量或 viewBox。",
    "在 CSS 里写 stroke-dashoffset 时带 px 单位，部分浏览器按无单位 SVG 属性处理会失效。"
  ],
  "effectTags": [
    "进度",
    "圆环",
    "SVG",
    "描边",
    "百分比"
  ]
};
