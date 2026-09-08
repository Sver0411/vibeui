import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "涟漪按钮",
    "en": "Ripple Button",
    "aliases": [
      "波纹按钮",
      "Material 涟漪",
      "Touch Ripple"
    ],
    "pattern": "Material Design · Ripple",
    "principle": "pointerdown 时在点击坐标创建一个直径 = max(宽,高)×2 的圆形 span，CSS 动画从 scale(0) 扩到 scale(1) 同时淡出，animationend 后移除节点。"
  },
  "prompts": {
    "short": "给按钮加 Material 风格涟漪：从点击位置扩散的半透明圆波纹，动画结束自动清理。原生 JS 动态创建元素。",
    "standard": "用原生 HTML/CSS/JavaScript 实现涟漪按钮：\n1. 按钮设 position: relative + overflow: hidden，涟漪限制在圆角内；\n2. pointerdown（不是 click，反馈要即时）创建 span.ripple：直径 = max(rect.width, rect.height) × 2，定位到 event.clientX - rect.left - 直径/2；\n3. 涟漪样式 background: currentColor、opacity 0.22、scale(0)→scale(1) 的 0.55s ease-out forwards 动画同时淡出；\n4. 监听 animationend 移除涟漪节点，防止 DOM 堆积；\n5. 原生实现，不引入库。",
    "refined": "可配置涟漪按钮：扩散 0.55s ease-out、涟漪色 currentColor 透明度 0.22、直径系数 max(宽,高)×2、按钮圆角 10px、主色 #26262b / 描边 ghost 两变体。验收：① 在按钮四角点击涟漪仍完整覆盖按钮且不出界；② 快速连点产生多个独立波纹互不打断；③ 动画结束后 DOM 中无残留 .ripple 节点。"
  },
  "knobs": [
    {
      "name": "扩散时长",
      "default": "0.55s ease-out forwards",
      "range": "0.3s – 1s",
      "effect": "波纹铺满按钮的速度。"
    },
    {
      "name": "涟漪透明度",
      "default": "0.22",
      "range": "0.1 – 0.4",
      "effect": "波纹的可见强度。"
    },
    {
      "name": "涟漪颜色",
      "default": "currentColor",
      "range": "任意颜色",
      "effect": "默认继承按钮文字色，主色/幽灵按钮自动适配。"
    },
    {
      "name": "直径系数",
      "default": "max(width, height) × 2",
      "range": "×1.5 – ×2.5",
      "effect": "波纹最终覆盖范围是否盖住全按钮。"
    },
    {
      "name": "按钮圆角",
      "default": "10px + overflow hidden",
      "range": "0 – 999px",
      "effect": "涟漪被裁剪的边界形状。"
    }
  ],
  "pitfalls": [
    "按钮没设 overflow: hidden，圆形波纹溢出到圆角外面变成方块里冒圆。",
    "涟漪节点只在动画后不 remove，快速连点几十次 DOM 里堆满废弃 span。",
    "直径只按按钮宽度算，竖长条按钮在角落点击时波纹盖不满整个按钮。",
    "用 click 事件触发，点击反馈延迟明显，应该用 pointerdown。",
    "波纹用 width/height 过渡从小长大而不是 transform: scale，每帧触发布局。",
    "波纹颜色写死浅色，放在深色 primary 按钮上看不见——用 currentColor 自动跟随文字色。"
  ],
  "effectTags": [
    "涟漪",
    "点击反馈",
    "Material",
    "按钮",
    "扩散"
  ]
};
