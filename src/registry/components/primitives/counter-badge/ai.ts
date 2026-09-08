import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "计数徽章",
    "en": "Counter Badge / Notification Badge",
    "aliases": [
      "未读角标",
      "数字角标",
      "Badge"
    ],
    "pattern": "Indicator · Status Badge",
    "principle": "绝对定位在图标右上角的圆角胶囊，数字超上限时截断文本加「+」，变化时用重排重启 keyframes 做一次弹性放大。"
  },
  "prompts": {
    "short": "做一个通知计数徽章：超过 99 显示 99+，数字变化弹性跳动，归零隐藏。原生 JS 实现。",
    "standard": "用原生 HTML/CSS/JavaScript 实现通知计数徽章，不要引入库：\n1. 徽章绝对定位于图标右上角，min-width + 水平 padding 适配 1~3 位数；\n2. count 超过 99 时显示「99+」，等于 0 时整枚隐藏；\n3. 数字变化时移除动画类后用 void offsetWidth 强制重排再加回，实现重复播放；\n4. 变化结果写入 aria-live 区域播报当前未读数。",
    "refined": "可配置计数徽章：封顶值 99、徽章高 20px（min-width 20px、padding 0 5px、字号 11px、描边 2px 同底色）、跳动动画 0.32s cubic-bezier(0.34, 1.56, 0.64, 1)（scale 0.6→1.22→1）。验收：① 从 98→100 显示 99+；② 归零后徽章消失且 aria-live 播报「没有未读通知」；③ 连续点击递增每次都重新跳动；④ prefers-reduced-motion 下直接更新数值不跳动。"
  },
  "knobs": [
    {
      "name": "封顶值 CAP",
      "default": "99",
      "range": "任意正整数",
      "effect": "超过后显示「99+」样式，改 script.js 里的 CAP 变量。"
    },
    {
      "name": "跳动动画时长",
      "default": "0.32s cubic-bezier(0.34, 1.56, 0.64, 1)",
      "range": "0.2s – 0.5s",
      "effect": "cb-pop 关键帧（scale 0.6→1.22→1）的播放速度与过冲幅度。"
    },
    {
      "name": "徽章尺寸",
      "default": "min-width 20px / height 20px / font-size 11px",
      "range": "16px – 24px",
      "effect": "角标整体大小，需同步调整 2px 同底色描边以保持与图标间距。"
    },
    {
      "name": "徽章颜色",
      "default": "#dc2626",
      "range": "任意色值",
      "effect": "胶囊底色，文字固定白色。"
    }
  ],
  "pitfalls": [
    "重复触发动画时直接 add class 不会重播，必须先移除类再 void badge.offsetWidth 强制重排。",
    "个位数与三位数宽度不同，若写死 width 而不是 min-width + padding，数字会被压缩或胶囊变形。",
    "徽章浮在图标边缘时没加与底色同色的 border，压在图片/深色背景上会出现毛边。",
    "忘了 aria-live 或把可见文本直接当播报源，读屏用户感知不到未读数变化。",
    "归零时只把数字设为 0 而不是 hidden 整枚徽章，会留下一个空红点。"
  ],
  "effectTags": [
    "徽章",
    "计数",
    "弹性",
    "状态提示"
  ]
};
