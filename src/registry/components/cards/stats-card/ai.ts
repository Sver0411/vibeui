import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "KPI 数据卡",
    "en": "KPI Stats Card",
    "aliases": [
      "数据卡",
      "指标卡",
      "涨跌卡片"
    ],
    "pattern": "KPI · Sparkline",
    "principle": "纯 CSS + 静态 SVG：走势线用 stroke-dasharray 300 → dashoffset 0 的 1.1s 描边生长动画，涨红 #dc2626 / 跌绿 #16a34a 两个 CSS 变量同时驱动徽章配色与线色，另有无走势线的紧凑变体。"
  },
  "prompts": {
    "short": "做三张仪表盘 KPI 卡：标签 + 涨跌徽章 + 大数值 + SVG 迷你走势线（描边生长动画），红涨绿跌，再加一个无走势线的紧凑变体。纯 CSS。",
    "standard": "用原生 HTML/CSS（静态 SVG）实现 KPI 数据卡：\n1. 卡片结构：12px 灰标签 + 圆角徽章（涨 rgba(220,38,38,0.08) 底红字 / 跌同理绿）+ 22px 粗数值（tabular-nums）+ 32px 高迷你走势 SVG；\n2. 走势线 stroke-width 2、round 端点，stroke-dasharray: 300 → dashoffset 0 做 1.1s cubic-bezier(0.22,1,0.36,1) 生长动画，颜色由 .sc-spark__line--up/--down 类控制；\n3. 涨跌色定义成 --sc-up/--sc-down 变量复用；\n4. hover 上浮 -2px + 阴影；prefers-reduced-motion 下走势线直接完整显示（animation: none; dashoffset: 0）。",
    "refined": "可配置 KPI 卡：涨色 #dc2626 / 跌色 #16a34a、走势线高 32px 描边宽 2、dasharray 300 动画 1.1s、大数值 22px（紧凑变体 18px）、hover -2px。\n验收：① 徽章文字与底色对比度可读（8% 透明度底）；② dasharray 不小于路径实际长度、动画收尾不缺线；③ prefers-reduced-motion 下线完整显示且 hover 不位移；④ 数值 tabular-nums 不抖动。"
  },
  "knobs": [
    {
      "name": "涨跌色变量",
      "default": "--sc-up: #dc2626 / --sc-down: #16a34a",
      "range": "任意红绿对（或按地区惯例反转）",
      "effect": "徽章、走势线、徽章底色 8% 透明度的统一色源。"
    },
    {
      "name": "描边生长动画",
      "default": "1.1s cubic-bezier(0.22,1,0.36,1)，dasharray 300",
      "range": "0.5 – 2s",
      "effect": "走势线从无到有画出的时长。"
    },
    {
      "name": "走势线尺寸",
      "default": "高 32px，stroke-width 2",
      "range": "24 – 48px / 1.5 – 3",
      "effect": "迷你图存在感与线条粗细。"
    },
    {
      "name": "数值字号",
      "default": "22px（紧凑变体 18px）",
      "range": "16 – 28px",
      "effect": "KPI 视觉层级，紧凑变体需同步缩小。"
    },
    {
      "name": "悬浮位移",
      "default": "translateY(-2px), 0.2s ease",
      "range": "0 – -4px",
      "effect": "hover 时的轻浮反馈。"
    }
  ],
  "pitfalls": [
    "stroke-dasharray 300 小于 path 实际长度（点密、卡宽）时，动画播完线仍缺一段——按最长路径调大。",
    "徽章底色用了固定灰而不是涨跌色 8% 透明度，涨跌徽章看起来一样。",
    "只有静态 SVG 时手写 path 坐标越界 viewBox，线被裁掉；坐标要归一化到画布内。",
    "涨跌色习惯没本地化：美股绿涨红跌，与中式红涨绿跌相反，交付前确认受众。",
    "紧凑变体忘了同步缩 value 字号与间距，两种变体高度不一致。",
    "hover transform 没在 prefers-reduced-motion 里关掉，减动效环境仍会位移。"
  ],
  "effectTags": [
    "KPI",
    "涨跌",
    "走势线",
    "仪表盘",
    "描边动画"
  ]
};
