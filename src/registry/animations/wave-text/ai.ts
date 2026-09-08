import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "波浪文字",
    "en": "Wave Text",
    "aliases": [
      "逐字浮动",
      "正弦文字",
      "text wave"
    ],
    "pattern": "Wave · Per-char Sine Bounce",
    "principle": "JS 把文本拆成逐字 span，每个 span 跑同一个 translateY 关键帧动画，仅 animation-delay 按索引递增（i × 相位步长），形成正弦波面；色彩交替用 nth-child(odd)。"
  },
  "prompts": {
    "short": "做一个波浪文字：每个字独立上下浮动、带相位差形成波面，悬停加速，支持深浅两套配色。",
    "standard": "实现逐字波浪动画：\n1. 拆字：JS 遍历文本生成 <span class=wave-char style=\"--i:索引\">，空格用 &nbsp; 占位；\n2. 动画：每个 span 跑 translateY(0)→(-0.28em)→(0) 关键帧，时长 1.6s 无限循环，缓动 ease-in-out；\n3. 相位：animation-delay: calc(var(--i) * -0.12s)——负延迟让动画立即处于波面中段，不必等开场；\n4. 色彩：主文字深色，偶数字符用强调色形成闪烁律动（可选）；\n5. 悬停：容器 hover 时 animation-duration 减半（CSS 变量 --wave-speed 控制）；\n6. prefers-reduced-motion 直接静态。",
    "refined": "做成 waveText(el, { amplitude, period, colorize }) 工具：振幅用 em 适配字号；支持中英文混排（英文单词整体不拆散可选）；提供暂停/恢复 API；字间距用 margin 而非空格避免两端对齐破坏波形。验收：① 字符间距均匀无抖动；② 换文案只需改 data-text；③ 20 字以上仍 60fps。"
  },
  "knobs": [
    {
      "name": "振幅 amplitude",
      "default": "0.28em",
      "range": "0.1 – 0.5em",
      "effect": "每个字浮动的高度。"
    },
    {
      "name": "相位步长 phaseStep",
      "default": "0.12s",
      "range": "0.06 – 0.2s",
      "effect": "相邻字符延迟差，决定波形密度。"
    },
    {
      "name": "周期 waveSpeed",
      "default": "1.6s",
      "range": "1 – 3s",
      "effect": "单个字符完整起伏一轮的时间。"
    }
  ],
  "pitfalls": [
    "延迟用正数，开场全部字符挤在起点再逐个动——用负延迟直接进入稳态。",
    "空格被拆字后丢失，单词粘连——空格要转 &nbsp; 或独立 span。",
    "逐字 span 加了 margin/padding 导致基线不齐。",
    "悬停加速用 JS 重设每个 span 的 duration，应直接改 CSS 变量。",
    "字数很多时每帧重排，动画只动 transform 就不会有性能问题。"
  ],
  "effectTags": [
    "波浪",
    "逐字",
    "文字动画"
  ]
};
