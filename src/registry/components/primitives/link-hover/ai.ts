import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "链接悬停动效",
    "en": "Link Hover Effect",
    "aliases": [
      "下划线动画",
      "文字上滚",
      "hover underline"
    ],
    "pattern": "Micro-interaction · Link Hover",
    "principle": "用 ::after/::before 伪元素 + transform/width 过渡做下划线与色块，文字上滚则靠双层文本 translateY(-100%)。"
  },
  "prompts": {
    "short": "做一组链接悬停动效：下滑下划线、双色滑块、居中生长线、文字上滚，纯 CSS。",
    "standard": "用纯 CSS（不写 JS、不引库）实现四种链接悬停动效：\n1. 下滑线：::after 高 1.5px，transform: scaleX(0) 且 transform-origin 在 hover 前后左右互换，实现「从左入从右出」；\n2. 双色滑块：::before 背景色块 translateY(105%) 藏在 overflow:hidden 容器下方，悬停归位、文字变白、箭头右移 3px；\n3. 居中生长线：width 0→100% 同时 left 50%→0；\n4. 文字上滚：overflow hidden 裁切 1.45em 高度，span 与 ::after(attr(data-text)) 一起 translateY(-100%)。",
    "refined": "四种动效统一参数：下划线高 1.5px、偏移 bottom -3px、颜色 #0f766e，过渡 0.3s–0.32s cubic-bezier(0.22, 1, 0.36, 1)，文字上滚容器高度 1.45em。验收：① 下划线进出场方向相反；② 滑块完全盖住文字且不溢出圆角；③ 上滚版快速来回悬停不露白；④ 键盘用户不受影响（纯装饰动效）。"
  },
  "knobs": [
    {
      "name": "动效时长",
      "default": "0.3s – 0.32s cubic-bezier(0.22, 1, 0.36, 1)",
      "range": "0.2s – 0.5s",
      "effect": "四个变体共用的过渡速度与缓动手感。"
    },
    {
      "name": "下划线粗细",
      "default": "1.5px",
      "range": "1px – 3px",
      "effect": "下滑线与生长线的视觉分量。"
    },
    {
      "name": "下划线偏移",
      "default": "bottom: -3px",
      "range": "-2px – -6px",
      "effect": "线与文字基线的距离。"
    },
    {
      "name": "主题色",
      "default": "#0f766e",
      "range": "任意色值",
      "effect": "下划线、滑块背景与上滚后文字的颜色。"
    }
  ],
  "pitfalls": [
    "下滑线想「从左进从右出」，必须让 transform-origin 在默认态为 right、hover 态为 left，只写一处会变成原路返回。",
    "文字上滚忘了把容器 height/line-height 锁成同一值（1.45em）并 overflow: hidden，下层备用文字会提前露出来。",
    "滑块用 ::before 又没给容器 overflow: hidden，色块从下方滑入时会短暂溢出到链接外。",
    "生长线用 width 过渡会触发重排，追求性能时应改用 scaleX（但需注意两端拉伸变形）。",
    "只绑了 :hover 没考虑 :focus-visible，键盘用户看不到任何反馈。"
  ],
  "effectTags": [
    "悬停",
    "下划线",
    "纯 CSS",
    "导航"
  ]
};
