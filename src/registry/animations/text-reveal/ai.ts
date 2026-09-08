import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "文本揭示",
    "en": "Text Reveal / Masked Rise",
    "aliases": [
      "文字上滑",
      "遮罩揭示",
      "逐词入场"
    ],
    "pattern": "Text · Masked Rise-In",
    "principle": "每个词包一层 overflow: hidden 的外框，内层 span 初始 translateY(110%) 藏在遮罩下，keyframes 上滑到 0，用 --i 变量 × 90ms 计算错峰 delay 实现逐词入场。"
  },
  "prompts": {
    "short": "做一个标题逐词上滑入场效果：每个词从 overflow 遮罩下方错峰升起，纯 CSS + 一个序号变量。",
    "standard": "用原生 HTML/CSS 实现文本揭示：\n1. 每个词包两层：外层 .tr-word display: inline-block + overflow: hidden 做遮罩；\n2. 内层 span 初始 transform: translateY(110%)，animation: 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards 上滑到 0；\n3. 错峰：animation-delay: calc(var(--i) * 90ms + 120ms)，--i 为词序号；\n4. 遮罩层加 padding-bottom: 0.08em + margin-bottom: -0.08em 补偿降字母裁切；\n5. 重放：把 animation 置 none，读一次 offsetWidth 强制 reflow，再清空恢复动画；\n6. 不要用 JS 逐词拆分插入节点以外的动画逻辑。",
    "refined": "实现可配置的逐词揭示：\n- 单词时长：默认 0.7s cubic-bezier(0.22, 1, 0.36, 1)；\n- 错峰步长：默认 90ms/词（50ms 干脆 – 150ms 戏剧化）；\n- 首词延迟：默认 120ms；\n- 初始位移：默认 110%（完整藏于遮罩下）。\n实现约束：遮罩必须 overflow: hidden 而非 opacity 淡入；降字母（g/y/p）需负 margin 补偿否则底部被裁；重放靠 reflow 重置而非重建 DOM；prefers-reduced-motion 下 animation: none + transform: none 直接显示。\n验收标准：① 逐词依次升起无跳跃；② 降字母底部不被裁掉；③ 重放按钮连点不失效。"
  },
  "knobs": [
    {
      "name": "单词时长 duration",
      "default": "0.7s cubic-bezier(0.22, 1, 0.36, 1)",
      "range": "0.4s – 1.2s",
      "effect": "单个词上滑的时间，ease-out 收尾更利落。"
    },
    {
      "name": "错峰步长 stagger",
      "default": "90ms",
      "range": "50 – 150 (ms)",
      "effect": "相邻词的延迟差，通过 --i 变量 × 步长计算。"
    },
    {
      "name": "首词延迟 base delay",
      "default": "120ms",
      "range": "0 – 500 (ms)",
      "effect": "第一个词起滑前的等待，给页面布局留稳定时间。"
    },
    {
      "name": "初始位移 offset",
      "default": "110%",
      "range": "100% – 130%",
      "effect": "藏在遮罩下的深度，110% 确保完全不可见。"
    }
  ],
  "pitfalls": [
    "遮罩层 overflow: hidden 直接裁掉 g、y、p 等降字母的尾巴，需要 padding + 负 margin 补偿。",
    "重放时只重新加 animation 类而不强制 reflow，浏览器复用已完成的动画状态导致无法重播。",
    "初始态用 opacity: 0 而非位移+遮罩，变成普通淡入，失去\"从下面升起\"的空间感。",
    "错峰用 JS setTimeout 逐词触发而不是 CSS calc(var(--i) * 步长)，词一多定时器管理混乱。",
    "词间距只靠空格，flex 布局换行时遮罩层宽度断裂——应将词作为 inline-block 并用 gap 控距。",
    "prefers-reduced-motion 下只移除动画但忘了重置 transform，文字永远停在 translateY(110%) 不可见。"
  ],
  "effectTags": [
    "文本",
    "揭示",
    "遮罩",
    "错峰"
  ]
};
