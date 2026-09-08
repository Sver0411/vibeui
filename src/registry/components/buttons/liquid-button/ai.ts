import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "液态填充按钮",
    "en": "Liquid Fill Button",
    "aliases": [
      "Wave Button",
      "Blob Fill Button",
      "Water Fill Button",
      "波纹按钮"
    ],
    "pattern": "Micro-interaction · Hover Fill",
    "principle": "用一个带不规则圆角（42%）的旋转色块作为填充层，hover 时整块从按钮底部上移覆盖；圆角的不规则自转让上升边缘呈现水波晃动感。"
  },
  "prompts": {
    "short": "做一个按钮，鼠标悬停时液态波纹从底部涌上来填满背景，文字自动反色。纯 CSS，不要 JavaScript。",
    "standard": "用 HTML + CSS 实现一个液态填充按钮。要求：\n1. 按钮默认白底、主色文字与边框；\n2. 用 ::before 伪元素生成一个 width 150%、aspect-ratio 1、border-radius 42% 的圆形色块，初始 top: 105% 藏在按钮下方，并让它以 7s 线性无限旋转；\n3. hover 时把 top 过渡到 -25%，色块涌上来填满按钮，同时按钮文字过渡到白色；\n4. 填充过渡用 cubic-bezier(0.22, 1, 0.36, 1)，时长 600ms；\n5. 按钮必须 overflow: hidden + isolation: isolate，填充层 z-index: -1，保证文字在上层可见；\n6. 补充 :active 的 scale(0.97) 按压反馈；\n7. 纯 CSS 无 JS，兼容 Chrome 90+ / Safari 15+。",
    "refined": "实现一个可参数化的液态填充按钮，并把下面这些维度暴露成 CSS 变量，方便我调节：\n- --liquid：主色（默认 #0f766e），决定填充与 hover 后的边框色；\n- --fill-duration：涌入时长（默认 600ms，可调 400–900ms）；\n- --wave-radius：色块 border-radius（默认 42%，38% 更平静、45% 更夸张）；\n- --wave-spin：色块自转周期（默认 7s，越短水波晃动越快）；\n- --fill-direction：填充方向（bottom-up 为默认，另需支持 left-right，即改用 left 过渡）。\n技术要求：填充层用伪元素且 z-index: -1，按钮 isolation: isolate、overflow: hidden；文字颜色过渡与填充同步。\n验收标准：① 纯键盘 Tab 聚焦时能触发同样的填充（:focus-visible）；② prefers-reduced-motion 下停用旋转、只保留 200ms 的颜色过渡；③ 填充过程中文字始终清晰可读、不被色块覆盖；④ 无 JS 依赖。",
    "byFramework": {
      "react": "用 React + Tailwind 实现液态填充按钮组件。导出 LiquidButton({ children, color, duration, direction })，direction 支持 'up' | 'right'。实现方式：外层 relative + overflow-hidden + isolate，内部放一个绝对定位的 span 作为填充块（宽高 150%、rounded-[42%]、animate-spin 7s），通过 group-hover 触发 translate 过渡；文字用 relative z-10。要求受控的 CSS 变量通过 style 传入，保留 focus-visible 与 reduced-motion 回退，并用 TypeScript 标注 props 类型。"
    }
  },
  "knobs": [
    {
      "name": "填充时长 --fill-duration",
      "default": "600ms",
      "range": "400ms – 900ms",
      "effect": "液态涌入的快慢。低于 400ms 看不清水波，高于 900ms 会觉得迟钝。"
    },
    {
      "name": "波纹幅度 border-radius",
      "default": "42%",
      "range": "38% – 45%",
      "effect": "水面晃动的夸张程度。数值越小边缘越平滑，越接近 50% 则趋近正圆、失去水感。"
    },
    {
      "name": "自转周期 --wave-spin",
      "default": "7s",
      "range": "4s – 12s",
      "effect": "水波晃动的频率，与填充时长无关，决定静止悬停时的活跃感。"
    },
    {
      "name": "填充方向",
      "default": "底部向上（top 105% → -25%）",
      "range": "bottom-up / left-right / top-down",
      "effect": "改变色块从哪个方向涌入。左右填充需改用 left 过渡并保持色块为竖椭圆。"
    },
    {
      "name": "主色 --liquid",
      "default": "#0f766e",
      "effect": "填充色与 hover 后的边框色；文字需自动切到白色以保证对比度。"
    }
  ],
  "pitfalls": [
    "按钮必须加 overflow: hidden，否则色块会溢出胶囊圆角，出现方形直角。",
    "填充层用 z-index: -1 时父级必须 isolation: isolate，否则色块会跑到按钮背景之后、完全看不见。",
    "本实现用 transition: top 改变位置，会触发重排；生产环境高频场景建议改用 transform: translateY 让动画跑在合成层。",
    "只写 :hover 会让键盘用户完全看不到反馈，必须同步一份 :focus-visible 样式。",
    "忘记 prefers-reduced-motion 回退时，持续的旋转动画会让前庭敏感用户不适。",
    "文字若用 mix-blend-mode: difference 做反色，在中间灰度区域会出现脏色，不如直接过渡 color 可控。"
  ],
  "effectTags": [
    "填充",
    "悬停",
    "液态",
    "微交互"
  ]
};
