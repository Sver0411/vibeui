import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "边框光束",
    "en": "Border Beam",
    "aliases": [
      "边框流光",
      "巡游光点",
      "Magic Border"
    ],
    "pattern": "Border · Conic Orbit",
    "principle": "@property 注册 --bb-angle 为 <angle> 使 conic-gradient 起始角可插值，keyframes 把它从 0deg 转到 360deg 驱动光点巡游，再用 mask-composite: exclude 双层遮罩把渐变裁剪到 1.5px 边框环。"
  },
  "prompts": {
    "short": "给卡片加一圈旋转的光点边框：conic-gradient 高光沿边框巡游，只有边框区域可见，纯 CSS。",
    "standard": "用原生 HTML/CSS 实现边框光束：\n1. @property 注册 --bb-angle（syntax: \"<angle>\"、initial-value: 0deg、inherits: false）；\n2. ::after 铺满卡片、padding 1.5px、border-radius: inherit，背景 conic-gradient(from var(--bb-angle), transparent 0–300deg, #6366f1 330deg, #22d3ee 355deg, transparent 360deg)；\n3. 用 mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0) + mask-composite: exclude 只留边框环；\n4. keyframes 只写 to { --bb-angle: 360deg }，animation 4s linear infinite；\n5. 容器 overflow: hidden + isolation: isolate。\n不要用 SVG 或 JS 逐帧驱动。",
    "refined": "实现可配置的边框光束：\n- 周期：默认 4s linear（降级浏览器 8s）；\n- 光束角宽：默认 300deg–360deg 共 60deg 渐变段；\n- 边框厚度：默认 padding 1.5px（光束）/ 1px（底边框）；\n- 双色：默认 #6366f1 → #22d3ee。\n实现约束：角度必须经 @property 注册才能插值，否则动画跳变；遮罩用 mask-composite: exclude（Safari 用 -webkit-mask-composite: xor）；prefers-reduced-motion 下停旋转、改为静态双色线性渐变微光（opacity 0.55）。\n验收标准：① 光点沿圆角边框连续巡游无断点；② Firefox 128+ 与 Chrome 均正常；③ 不支持 @property 的环境显示整圈微光而非空白。"
  },
  "knobs": [
    {
      "name": "巡游周期 duration",
      "default": "4s",
      "range": "2s – 10s",
      "effect": "光点绕边框一圈的时间，必须配 linear 缓动。"
    },
    {
      "name": "光束角宽 beam span",
      "default": "300deg – 360deg（约 60deg 渐变段）",
      "range": "20deg – 120deg",
      "effect": "光点尾巴长度，越长越像光带、越短越像彗星。"
    },
    {
      "name": "边框厚度 border width",
      "default": "1.5px（光束层）/ 1px（底框）",
      "range": "1 – 3 (px)",
      "effect": "通过 ::after 的 padding 控制，光束环的粗细。"
    },
    {
      "name": "光束配色 beam colors",
      "default": "#6366f1 → #22d3ee",
      "range": "任意双色",
      "effect": "渐变头尾两色，形成光点的前亮后暗拖尾。"
    },
    {
      "name": "起始角 --bb-angle",
      "default": "0deg → 360deg",
      "range": "注册为 <angle> 插值",
      "effect": "conic-gradient 旋转角，keyframes 唯一驱动的变量。"
    }
  ],
  "pitfalls": [
    "漏掉 @property 注册 --bb-angle，keyframes 对自定义属性无法插值，光点变成每 4s 瞬移一次的跳变。",
    "mask-composite 写法漏了 Safari 前缀 -webkit-mask-composite: xor，边框环在 iOS 上变成整面渐变填充。",
    "光束层没有 overflow: hidden / border-radius: inherit，方形渐变溢出圆角卡片外。",
    "忘了 isolation: isolate 或层级处理，::after 渐变叠在内容文字之上。",
    "降级用 @supports not 检测时误判，支持 @property 的浏览器也被迫走 8s 慢速整圈旋转。",
    "infinite 旋转没配 prefers-reduced-motion 静态降级，敏感用户被持续巡游的光点干扰。"
  ],
  "effectTags": [
    "边框",
    "光束",
    "巡游",
    "conic"
  ]
};
