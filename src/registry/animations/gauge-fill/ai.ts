import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "仪表盘扫动",
    "en": "Gauge Fill",
    "aliases": [
      "仪表动画",
      "圆弧进度",
      "gauge chart"
    ],
    "pattern": "Gauge · Arc Sweep + Needle",
    "principle": "SVG 半圆用 stroke-dasharray = 弧长，dashoffset 从满偏扫到目标值实现描边生长；指针 group 用 transform rotate 按 percent×180° 摆动，两者共享同一个 easeOutCubic 进度；中心数字同步滚动。"
  },
  "prompts": {
    "short": "做一个半圆仪表盘：灰底弧 + 渐变值弧从 0 扫到 72%，指针同步摆动，中心数字滚动到 72%。",
    "standard": "用 SVG + 原生 JS 实现仪表盘动画：\n1. 弧：path A 命令画 r=80 的半圆（M20,100 A80,80 0 0 1 180,100），底弧 #e9e9ec 8px，值弧 stroke url(#g) 用 stroke-dasharray=L、dashoffset 从 L 过渡到 L×(1-p)；\n2. 指针：line 从圆心向上，包在 g 里 transform-origin 圆心，rotate(-90° + p×180°)；\n3. 驱动：rAF + easeOutCubic 一个时间轴同时喂给 dashoffset、指针角度与数字文本——三者严格同步；\n4. 刻度：主刻度 0/25/50/75/100 用小线段 + 文字；\n5. reduced-motion 直接呈现终态。",
    "refined": "扩展 Gauge 组件：支持 240° 大弧、分段阈值色（绿/琥珀/红区间自动变色）、数值变化时重新扫动（不是从 0）；指针带惯性微弹；刻度可配置。验收：① 弧与指针无错位；② 连续 setValue 平滑衔接；③ 60fps。"
  },
  "knobs": [
    {
      "name": "弧角 sweepDeg",
      "default": "180°",
      "range": "180 – 270°",
      "effect": "仪表盘张开角度。"
    },
    {
      "name": "时长 duration",
      "default": "1.3s",
      "range": "0.8 – 2s",
      "effect": "扫动动画总时长。"
    },
    {
      "name": "阈值色 thresholds",
      "default": "60/85",
      "effect": "超过阈值值弧变色。"
    }
  ],
  "pitfalls": [
    "dashoffset 直接从 0 过渡，方向反了——初值是总弧长。",
    "指针 transform-origin 没设圆心，绕自身乱转。",
    "弧长用 2πr/2 近似半圆但端点圆头外溢，精确值用 path.getTotalLength()。",
    "数字滚动与弧不同步，两个独立动画时序错开。",
    "SVG 没设 overflow visible，指针扫出边界被裁。"
  ],
  "effectTags": [
    "仪表盘",
    "指针",
    "数值"
  ]
};
