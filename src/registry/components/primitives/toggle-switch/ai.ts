import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "开关",
    "en": "Toggle Switch",
    "aliases": [
      "切换开关",
      "滑动开关",
      "switch"
    ],
    "pattern": "Form Control · Toggle",
    "principle": "隐藏 checkbox 保留原生语义，:checked + 兄弟选择器让 44×24 轨道换色、18px 滑块 translateX(20px)，全程纯 CSS 零 JS。"
  },
  "prompts": {
    "short": "做一个纯 CSS 开关：44×24 轨道、滑块弹性滑动、带图标与文字变体、键盘可达。",
    "standard": "用纯 CSS 实现开关（不写 JS、不引库）：\n1. 结构 label > input(视觉隐藏) + 轨道 + 滑块，:checked + .tg-track 换底色 #0f766e；\n2. 滑块 18px 圆，选中时 transform: translateX(20px)（44 - 18 - 2×3px 内边距），过渡 0.25s cubic-bezier(0.22, 1, 0.36, 1)；\n3. :focus-visible 在轨道上画 2px outline 保证键盘可达，:disabled 时整体 opacity 0.5 + not-allowed；\n4. 图标变体：ON/OFF 两个图标用 opacity 0/1 交叉淡变；文字变体滑块加宽到 36px 内嵌文字。",
    "refined": "参数：轨道 44×24 圆角 999px、滑块 18px 起点偏移 3px、位移 20px、背景过渡 0.25s ease、滑块 0.25s cubic-bezier(0.22, 1, 0.36, 1)、关闭色 #d4d4d8、开启色 #0f766e。验收：① 键盘空格切换且 focus 圈出现在轨道上；② 快速连点滑块不漂移（位移值精确等于 44-18-6）；③ 禁用态不可点击光标正确；④ reduced-motion 下位移瞬时完成。"
  },
  "knobs": [
    {
      "name": "轨道尺寸",
      "default": "44px × 24px",
      "range": "36×20 – 56×30",
      "effect": "开关整体大小，位移量需按 宽-滑块-2×内边距 重算。"
    },
    {
      "name": "滑块位移",
      "default": "translateX(20px)",
      "range": "按轨道几何计算",
      "effect": "选中后滑块行程，写错会露底或顶出轨道。"
    },
    {
      "name": "滑动缓动",
      "default": "0.25s cubic-bezier(0.22, 1, 0.36, 1)",
      "range": "0.15s – 0.4s",
      "effect": "滑块滑动的速度与收尾手感。"
    },
    {
      "name": "开启色",
      "default": "#0f766e（关闭 #d4d4d8）",
      "range": "任意色值",
      "effect": "轨道选中底色。"
    }
  ],
  "pitfalls": [
    "input 用 display:none，键盘完全无法聚焦；应 opacity:0 且保留尺寸语义（或配 role=switch）。",
    "只靠 :checked 改样式但忘了 :focus-visible 画 outline，键盘用户不知道焦点在哪。",
    "滑块位移写死像素值，改轨道尺寸后滑块顶出轨道或留缝；位移应等于 width - thumb - 2×offset。",
    "图标/文字变体忘了同步 :checked 的 opacity 切换，选中后标签状态错乱。",
    "disabled 只改了 input 的 disabled 属性没降透明度，视觉上与可用态无异。"
  ],
  "effectTags": [
    "开关",
    "表单",
    "纯 CSS",
    "键盘可达"
  ]
};
