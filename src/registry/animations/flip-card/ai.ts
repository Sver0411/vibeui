import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "3D 翻转卡",
    "en": "Flip Card",
    "aliases": [
      "翻转卡片",
      "正反面卡片",
      "card flip"
    ],
    "pattern": "Flip · 3D RotateY Reveal",
    "principle": "外层容器 perspective 提供透视，内层 transform-style: preserve-3d + hover 时 rotateY(180deg)；正反两面都 backface-visibility: hidden，背面预先 rotateY(180deg)，翻转后恰好朝向用户。"
  },
  "prompts": {
    "short": "做一个纯 CSS 3D 翻转卡：悬停或键盘聚焦绕 Y 轴翻转 180°，正面是封面、背面是详情，支持触屏点击切换。",
    "standard": "用纯 CSS 实现 3D 翻转卡：\n1. 结构：.flip（perspective: 1000px）> .flip-inner（transform-style: preserve-3d; transition: transform 0.6s）> .face-front / .face-back；\n2. 两面 absolute inset-0 + backface-visibility: hidden；背面再加 transform: rotateY(180deg)；\n3. 触发：.flip:hover .flip-inner 与 .flip:focus-within .flip-inner 都 rotateY(180deg)；\n4. 触屏：外层包 checkbox hack 或 JS 加 .is-flipped 类点击切换；\n5. 两面内容高度一致（统一 min-height），背面文字排布留足内边距；\n6. prefers-reduced-motion 下禁用翻转改为淡入切换。",
    "refined": "扩展为可交互卡片组：翻转轴 X/Y 可配（--flip-axis）、翻转角度 180/自定义、每张卡独立延迟形成级联翻转；背面内容溢出时显示滚动；保证 60fps（只动 transform，不动 width/height）。验收：① 键盘 Tab 进卡即翻转；② 文字在翻转全程无锯齿闪烁；③ 触屏点按与滚动不冲突。"
  },
  "knobs": [
    {
      "name": "翻转轴 axis",
      "default": "Y",
      "range": "X / Y",
      "effect": "绕纵轴还是横轴翻转。"
    },
    {
      "name": "时长 duration",
      "default": "0.6s",
      "range": "0.4s – 0.9s",
      "effect": "翻转速度，过快看不清背面。"
    },
    {
      "name": "透视强度 perspective",
      "default": "1000px",
      "range": "600 – 1600px",
      "effect": "越小透视越夸张。"
    }
  ],
  "pitfalls": [
    "忘了 backface-visibility: hidden，两面文字重叠成鬼影。",
    "perspective 加在内层而不是外层，翻转变成没有深度的平面旋转。",
    "两面内容高度不同，翻转瞬间卡片高度跳变。",
    "只用 :hover 触发，触屏和键盘用户永远看不到背面。",
    "背面文字过多溢出被裁切，背面也要预留滚动或截断。"
  ],
  "effectTags": [
    "翻转",
    "3D",
    "悬停"
  ]
};
