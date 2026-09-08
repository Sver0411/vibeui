import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "环形占比卡",
    "en": "Donut Chart Card",
    "aliases": [
      "环形图",
      "甜甜圈图",
      "Donut Chart"
    ],
    "pattern": "Data Visualization · Donut Chart",
    "principle": "每段用 SVG circle 的 pathLength=100 归一化，stroke-dasharray 前段写占比、后段写剩余，stroke-dashoffset 按前序占比累计偏移，加载时延迟依次从 0 生长。"
  },
  "prompts": {
    "short": "做一个 SVG 环形占比图卡片：多段彩色圆环按数据百分比分割，加载时各段依次生长动画，中心显示总计，图例悬浮与扇区双向联动高亮。原生 HTML/CSS/JS 实现，不要引入图表库。",
    "standard": "用原生 SVG + JavaScript 实现环形占比卡：\n1. 每段用 circle 加 pathLength=\"100\"，stroke-dasharray 为「占比-1.2 段间缝、其余为空」，stroke-dashoffset 累计前序占比取负；\n2. 加载时各段先归零，120ms 起每段延迟 110ms 生长，形成依次入场；\n3. 图例项与扇区 pointerenter 双向联动：非当前段变暗、当前段加粗，中心文字切换为该项数值与百分比；\n4. 段间用 1.2 的 dasharray 缝隙避免圆环接缝重叠；\n5. 不要引入 Chart.js 等图表库。",
    "refined": "实现可配置的环形占比卡：数据为数组 [{name, value, color}]；可调参数——环粗细（stroke-width，当前 10）、段间缝（当前 1.2/pathLength）、生长动画（120ms 起每段 +110ms）、主题色变量 --dc-accent（当前 #2563eb）。验收标准：① 数值总和变化时各段占比精确闭合 100；② 悬浮图例与扇区联动高亮、移出恢复总计；③ reduced-motion 下扇区直接完整显示不做生长动画。"
  },
  "knobs": [
    {
      "name": "环粗细 stroke-width",
      "default": "10",
      "range": "4 – 20",
      "effect": "圆环厚度。过粗会让段间缝隙视觉消失，过细则图例色点与环不成比例。"
    },
    {
      "name": "段间缝 gap",
      "default": "1.2（pathLength 单位）",
      "range": "0 – 3",
      "effect": "相邻扇区之间的留白。0 时接缝完全贴合，过大时小占比段可能被缝吃掉。"
    },
    {
      "name": "生长节奏 stagger",
      "default": "120ms 起每段 +110ms",
      "range": "0 – 300ms",
      "effect": "各扇区依次入场的节奏。0 为同时生长，过大显得拖沓。"
    },
    {
      "name": "主题色 --dc-accent",
      "default": "#2563eb",
      "range": "任意色值",
      "effect": "中心数值与高亮态主色，与数据色板区分使用。"
    },
    {
      "name": "数据色板",
      "default": "#2563eb / #7c3aed / #0d9488 / #94a3b8",
      "range": "3 – 6 段",
      "effect": "各扇区与图例圆点颜色，建议按感知亮度排序避免相邻段混淆。"
    }
  ],
  "pitfalls": [
    "忘写 pathLength=\"100\" 时 dasharray 的 100 不再等于周长，占比全部错位——必须同时设置。",
    "stroke-dashoffset 要取负的累计占比；方向写正会让扇区从错误位置起画并重叠。",
    "段间缝隙要把缝隙从占比里扣掉（如 pct - 1.2），否则多段总览超过 100 会出现多余弧段。",
    "悬浮高亮若只改透明度不改 stroke-width，暗态与亮态粗细不一致会闪。",
    "中心文字用 innerHTML 注入数据时，数据若来自用户输入需先转义，避免注入。",
    "reduced-motion 下应跳过逐段生长动画直接呈现完整圆环，否则动画成为信息获取的障碍。"
  ],
  "effectTags": [
    "环形图",
    "数据可视化",
    "占比",
    "生长动画"
  ]
};
