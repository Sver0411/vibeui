import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "故障风文字",
    "en": "Glitch Text",
    "aliases": [
      "信号干扰",
      "毛刺文字",
      "glitch effect"
    ],
    "pattern": "Glitch · RGB Split + Clip Slice",
    "principle": "主体文字的 ::before/::after 用 attr(data-text) 复制同一份文字，分别染青色与红色并负偏移叠加；clip-path inset 按不规则关键帧随机裁切出「抽掉一条」的错觉；主文字自身再做亚像素位移。"
  },
  "prompts": {
    "short": "做一个纯 CSS 故障风文字：RGB 色散分离 + 不规则裁切抽搐，深色背景，悬停时故障加剧。",
    "standard": "用纯 CSS 实现故障文字（不写 JS）：\n1. 元素放 data-text 属性存同文案，::before/::after 用 content: attr(data-text) 覆盖在原文字上；\n2. 两层伪元素分别偏移 -2px 与 +2px，颜色 #0ff 与 #f0f，mix-blend-mode: screen 在深底上产生 RGB 分离；\n3. 各自跑一套 clip-path: inset(t1 0 t2 0) 关键帧，切片位置用不规则数列（12%, 44%, 81%…）模拟随机抽搐；\n4. 主文字本身加极小位移关键帧（±1px）增加抖动感；\n5. 背景必须深色（#0a0a12 级别），故障才明显；hover 时把动画时长减半制造「加剧」。",
    "refined": "做一个可配置的故障文字组件：暴露 --glitch-intensity（位移倍率）、--glitch-speed（周期）、--glitch-r / --glitch-c（双色散色）四个 CSS 变量；动画关键帧用 steps() 与非对称百分比做出「偶发抽搐」而非规律抖动；提供 prefers-reduced-motion 降级为静态色散。验收：① 文案改 data-text 即换字；② 故障有随机感不机械；③ 深浅两种主题下均可读。"
  },
  "knobs": [
    {
      "name": "色散偏移 splitOffset",
      "default": "2px",
      "range": "1px – 4px",
      "effect": "青红两层的错位距离，越大故障越重。"
    },
    {
      "name": "周期 duration",
      "default": "2.4s",
      "range": "1s – 5s",
      "effect": "整轮故障循环时长，悬停减半。"
    },
    {
      "name": "裁切密度 slices",
      "default": "6 段",
      "range": "3 – 10 段",
      "effect": "关键帧里 inset 切片的数量，多则更碎。"
    }
  ],
  "pitfalls": [
    "浅色背景上做 RGB 色散几乎不可见——必须配深色底。",
    "两层伪元素忘加 mix-blend-mode: screen，色散变成死板的描边。",
    "裁切关键帧用均匀百分比，故障感变成机械抖动。",
    "文字层没叠 z-index 层级，伪元素跑到正常文字后面。",
    "不给 prefers-reduced-motion 降级，前庭敏感用户会不适。"
  ],
  "effectTags": [
    "故障风",
    "文字动画",
    "色散"
  ]
};
