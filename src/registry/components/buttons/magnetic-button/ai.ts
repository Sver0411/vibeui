import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "磁性按钮",
    "en": "Magnetic Button",
    "aliases": [
      "磁吸按钮",
      "光标吸附按钮",
      "Magnetic Hover"
    ],
    "pattern": "Micro-interaction · Cursor Magnetism",
    "principle": "mousemove 时算出光标相对按钮中心的偏移，按钮按系数 0.35 平移、内部标签按 0.55 平移形成视差，离开时清空 transform 靠 transition 弹回。"
  },
  "prompts": {
    "short": "做一个磁性按钮：光标靠近时按钮向光标方向吸附，内部文字移动更多形成视差，离开后平滑回位。原生 JS。",
    "standard": "用原生 JavaScript 实现磁性按钮：\n1. mousemove 里 getBoundingClientRect 求按钮中心，位移 = (光标 - 中心) × 吸附系数，只写 transform: translate() 不碰 left/top；\n2. 内部 label 用更大的系数（视差）反向增强层次，两者都加 will-change: transform；\n3. 按钮与标签各带 transform 0.18s cubic-bezier(0.22,1,0.36,1) 过渡，mouseenter/leave 时清空 transform 平滑回位；\n4. 提供 prefers-reduced-motion 降级：去掉过渡直接归位；\n5. 原生实现，不引入库。",
    "refined": "可配置磁性按钮：按钮吸附系数 0.35、标签视差系数 0.55、回位过渡 transform 0.18s cubic-bezier(0.22,1,0.36,1)、hover 阴影 0 14px 30px rgba(38,38,43,0.25)、胶囊圆角 999px。验收：① 光标在按钮上滑动跟随流畅无明显掉帧；② 快速甩出后回位无残影卡顿；③ reduced-motion 下位移立即复位无过渡。"
  },
  "knobs": [
    {
      "name": "吸附系数 STRENGTH",
      "default": "0.35",
      "range": "0.1 – 0.6",
      "effect": "按钮跟随光标的位移幅度。"
    },
    {
      "name": "标签视差系数 LABEL_STRENGTH",
      "default": "0.55",
      "range": "0.3 – 0.9",
      "effect": "内部文字相对按钮的额外位移，制造层次感。"
    },
    {
      "name": "回位过渡",
      "default": "transform 0.18s cubic-bezier(0.22,1,0.36,1)",
      "range": "0.1s – 0.4s",
      "effect": "跟随的顺滑度与离开后的回弹手感。"
    },
    {
      "name": "hover 阴影",
      "default": "0 14px 30px rgba(38,38,43,0.25)",
      "range": "任意阴影",
      "effect": "悬停时的悬浮感强度。"
    },
    {
      "name": "按钮形状",
      "default": "border-radius 999px，padding 16px 38px",
      "range": "胶囊/圆角矩形",
      "effect": "磁吸范围观感与风格。"
    }
  ],
  "pitfalls": [
    "高频 mousemove 里每次都 getBoundingClientRect 且不做节流，叠加复杂页面时明显掉帧——可缓存 rect 或用 rAF 合帧。",
    "只监听 mousemove 不监听 mouseleave，光标快速甩出后按钮永久卡在偏移位置。",
    "位移改 left/top 而不是 transform，每帧触发 layout，磁性感变成卡顿感。",
    "用 mousemove 事件在触屏上完全无效，做通用组件应改用 pointer 事件并处理 touch 降级。",
    "过渡时长设得过长（>0.3s），跟随永远滞后于光标，吸附变成橡皮筋拖影。"
  ],
  "effectTags": [
    "磁性",
    "光标跟随",
    "微交互",
    "视差",
    "按钮"
  ]
};
