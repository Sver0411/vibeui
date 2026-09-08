import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "3D 倾斜卡片",
    "en": "3D Tilt Card",
    "aliases": [
      "Tilt 卡",
      "视差倾斜卡",
      "光标 3D 卡"
    ],
    "pattern": "3D Tilt · Cursor Tracking",
    "principle": "pointermove 把指针位置归一化到 0–1，映射为 ±MAX_TILT(10°) 的 rotateX/rotateY 直接写 style.transform；内容层 translateZ(28px) 拉出层次，眩光坐标写 --glare-x/y 由 radial-gradient 呈现；hover:none 设备直接跳过。"
  },
  "prompts": {
    "short": "做一张跟随光标 3D 倾斜的卡片：最大倾斜约 10°，内容有 Z 轴层次，表面有眩光跟随，触屏自动降级。原生 JS。",
    "standard": "用原生 HTML/CSS/JavaScript 实现 3D 倾斜卡：\n1. 父容器设 perspective: 900px（不能设在卡片自身），卡片 transform-style: preserve-3d + will-change: transform；\n2. pointermove：px=(clientX-rect.left)/rect.width，rotateY=(px-0.5)*2*MAX_TILT、rotateX=(0.5-py)*2*MAX_TILT（MAX_TILT=10），toFixed(2) 后写 transform；同时把 px/py 写入 --glare-x/--glare-y；\n3. 眩光层 radial-gradient(circle at var(--glare-x) var(--glare-y), rgba(20,184,166,0.16), transparent 55%)，hover 才显示，pointer-events: none；\n4. pointerleave 清空 transform 归位（transition 只留给回位），matchMedia(\"(hover: none)\") 命中则整体不启用，prefers-reduced-motion 下 transform: none !important。",
    "refined": "可配置倾斜卡：MAX_TILT 10°、perspective 900px、内容 translateZ(28px)、眩光 rgba(20,184,166,0.16) 半径 55%、回位 transition transform 0.16s ease-out。\n验收：① 光标在卡片中心时 transform 近似 none；② 快速划过后卡片必然归位（pointerleave 兜底）；③ 触屏与减动效环境下卡片完全静止；④ 倾斜时内容层次（translateZ）可见且文字不糊。"
  },
  "knobs": [
    {
      "name": "最大倾斜 MAX_TILT",
      "default": "10",
      "range": "4 – 20°",
      "effect": "倾斜幅度，超过 15° 文字开始难读。"
    },
    {
      "name": "透视距离 perspective",
      "default": "900px（设在父级）",
      "range": "500 – 1500px",
      "effect": "透视强度，越小 3D 夸张越大越平。"
    },
    {
      "name": "内容层 translateZ",
      "default": "28px",
      "range": "0 – 60px",
      "effect": "内容浮出卡面的视差高度。"
    },
    {
      "name": "眩光",
      "default": "rgba(20,184,166,0.16)，transparent 55%，随 --glare-x/y",
      "range": "任意色 30% – 70%",
      "effect": "表面高光的位置与范围。"
    },
    {
      "name": "回位过渡",
      "default": "transform 0.16s ease-out",
      "range": "0.1 – 0.4s",
      "effect": "离开后归位的弹性感；跟手阶段不要加长过渡。"
    }
  ],
  "pitfalls": [
    "perspective 设在卡片自己而不是父级，rotateX/Y 没有透视深度，看着像 2D 缩放。",
    "没监听 pointerleave，光标离开后卡片永远停在倾斜姿态。",
    "触屏没先 matchMedia(\"(hover: none)\") 就绑定，手机上点按抖动甚至报错。",
    "transform 过渡全程开着（如 0.3s ease），跟手变成拖泥带水的延迟——只给 pointerleave 回位留短过渡。",
    "rotateX 与 rotateY 的正负映射写反，卡片朝光标反方向歪。",
    "忘了 prefers-reduced-motion 下 transform: none !important，减动效用户仍被晃。"
  ],
  "effectTags": [
    "3D",
    "倾斜",
    "视差",
    "光标跟随",
    "眩光"
  ]
};
