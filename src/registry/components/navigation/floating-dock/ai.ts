import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "悬浮 Dock",
    "en": "Floating Dock / macOS Magnify Bar",
    "aliases": [
      "Dock 栏",
      "放大坞",
      "鱼眼菜单"
    ],
    "pattern": "Dock Magnification · Proximity Scaling",
    "principle": "dock 上只挂一个 pointermove，对每个图标算光标到其中心的水平距离，1 - distance/110 得放大系数写入 CSS 变量 --magnify，transform 用 calc 换算成缩放与上浮。"
  },
  "prompts": {
    "short": "做一个 macOS 风格 Dock：图标随光标距离放大，悬浮 tooltip，活动应用带指示圆点。原生 JS 实现。",
    "standard": "用原生 HTML/CSS/JavaScript 实现 macOS 风格悬浮 Dock：\n1. dock 上只挂一个 pointermove 监听，遍历图标按水平距离写入 --magnify（线性衰减）；\n2. transform: scale(calc(1 + var(--magnify) * 0.35)) translateY(calc(var(--magnify) * -8px))，transform-origin 为底部中心，transition 0.12s ease-out；\n3. pointerleave 时把所有 --magnify 归零；matchMedia(\"(hover: none)\") 在触屏直接 return；\n4. tooltip 用 ::before content: attr(data-tip) 实现，活动指示用 data-active 属性切换。不要引入库。",
    "refined": "可配置 Dock：影响半径 RADIUS 110px、放大增益 0.35、上浮 8px、图标 46px、缩放过渡 0.12s。验收：① 光标横扫时放大波峰平滑跟随无跳变；② 移出 dock 后 0.12s 内全部复位；③ 触屏设备完全不启用放大逻辑；④ 点击图标后活动圆点唯一且随点击切换。"
  },
  "knobs": [
    {
      "name": "影响半径 RADIUS",
      "default": "110",
      "range": "60 – 220",
      "effect": "放大波及的图标数量与衰减速度。"
    },
    {
      "name": "放大增益",
      "default": "0.35",
      "range": "0.15 – 0.8",
      "effect": "最近图标最大放大到 1.35 倍的比例。"
    },
    {
      "name": "上浮距离",
      "default": "8px",
      "range": "0 – 20px",
      "effect": "放大时图标底部对齐的上移量。"
    },
    {
      "name": "缩放过渡",
      "default": "transform 0.12s ease-out",
      "range": "0.08 – 0.3s",
      "effect": "跟随光标的平滑度，过长会拖影。"
    }
  ],
  "pitfalls": [
    "transform-origin 用默认 center，图标放大后向下溢出 dock 底边；必须设 bottom center。",
    "没监听 pointerleave，光标快速移出后图标卡在放大态。",
    "没做 (hover: none) 检测，触屏手指点击时出现诡异的持续放大。",
    "每个图标各挂一个 mousemove 并逐帧 getBoundingClientRect，图标一多就掉帧；应在一个 pointermove 里统一遍历。",
    "tooltip 用 title 属性，延迟约 1 秒出现且无法样式化；用 data-tip + ::before 即时显示。"
  ],
  "effectTags": [
    "Dock",
    "光标跟随",
    "放大",
    "磁性"
  ]
};
