import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "加载器合集",
    "en": "CSS Spinner Set / Loaders",
    "aliases": [
      "加载动画",
      "loading 图标",
      "转圈"
    ],
    "pattern": "Loader · Loading Indicator",
    "principle": "全部用 border 画环、transform 旋转与 opacity/scale 循环关键帧实现，多元素 loader 靠 animation-delay 错峰，不碰 JS 与重排属性。"
  },
  "prompts": {
    "short": "做六种纯 CSS 加载器：环形、跳点、声浪、双轨、呼吸、虚线，只用 transform 与 opacity。",
    "standard": "用纯 CSS 实现六种加载器（不写 JS、不引库、只用 transform/opacity 动画）：\n1. 环形：26px 圆、3px 边框，轨道色 rgba(15,118,110,0.2)、border-top-color 实色，rotate 360° 0.9s linear infinite；\n2. 跳点：3 个 7px 圆点，sp-bounce（translateY -7px）1s，delay 0/0.15s/0.3s；\n3. 声浪：4 根 4px 宽条 scaleY(0.4→1) 1.1s，delay 0.12s 递增、高度 40%–100% 错落；\n4. 双轨：两层 border 环反向旋转（1.4s 正 / 0.9s reverse）；\n5. 呼吸：22px 圆 scale(0.75→1.1) + 淡入淡出 1.3s；\n6. 虚线：3px dashed 边框环慢速 6s 旋转。",
    "refined": "参数：主色 #0f766e、环形 0.9s、跳点 1s（位移 -7px）、声浪 1.1s、双轨 1.4s/0.9s 反向、呼吸 1.3s（scale 0.75→1.1）、虚线 6s。验收：① 全部动画循环无缝不跳帧；② 除 transform/opacity 外无属性被动画（无 layout 抖动）；③ reduced-motion 下统一压到 0.01ms 并只播一次；④ 六种尺寸在 90px 网格内视觉平衡。"
  },
  "knobs": [
    {
      "name": "环形转速",
      "default": "0.9s linear infinite",
      "range": "0.6s – 1.5s",
      "effect": "最常用 loader 的快慢感知。"
    },
    {
      "name": "跳点参数",
      "default": "1s，位移 -7px，delay 0.15s 递增",
      "range": "0.6s – 1.4s / 4px – 10px",
      "effect": "弹跳高度与波浪节奏。"
    },
    {
      "name": "双轨反转比",
      "default": "外环 1.4s 正转 / 内环 0.9s 反转",
      "range": "比例 1.2 – 2.0",
      "effect": "双层环的相对速度差带来的追逐感。"
    },
    {
      "name": "主色",
      "default": "#0f766e（浅轨 rgba 0.2）",
      "range": "任意色值",
      "effect": "六种 loader 的统一品牌色。"
    }
  ],
  "pitfalls": [
    "跳点/声浪用 top 或 height 做动画，触发重排掉帧；必须用 transform: translateY/scaleY。",
    "环形 loader 的轨道色忘了单独染 border-top，旋转起来毫无意义（全同色看不出转动）。",
    "多元素 delay 只写了一次，三个点同时跳；要用 :nth-child 逐个错开。",
    "双轨反向环忘了 animation-direction: reverse，两层同向旋转看不出层次。",
    "reduced-motion 下没关动画，系统设置了减弱动效 loader 仍然狂转。"
  ],
  "effectTags": [
    "加载",
    "纯 CSS",
    "循环动画",
    "合集"
  ]
};
