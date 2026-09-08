import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "迷你走势卡",
    "en": "Sparkline Chart",
    "aliases": [
      "迷你图",
      "KPI 走势卡",
      "微型图表"
    ],
    "pattern": "Sparkline · Data Visualization",
    "principle": "JS 把数据按 min/max 归一化映射进 200×64 viewBox（四周 PAD 6）生成 SVG 折线 path + 闭合渐变面积，柱状形态用按最大值归一的百分比高度 flex 条；描边生长靠 stroke-dasharray/offset 动画。"
  },
  "prompts": {
    "short": "做三张 KPI 迷你图卡片：SVG 折线 sparkline 和迷你柱状两种形态，悬浮显示最近数据点的数值提示。原生 JS 生成 SVG。",
    "standard": "用原生 HTML/CSS/JavaScript 实现 sparkline 走势卡：\n1. 数据归一化：point = PAD + i/(n-1)*(W-2*PAD)，y 用 min/max 映射（span 为 0 时兜底为 1 防除零），拼成 M/L path；\n2. SVG viewBox 200×64 + preserveAspectRatio=\"none\"，面积 path 闭合到底部、透明度 0.12；\n3. 描边生长动画：stroke-dasharray 400 → dashoffset 0，1s cubic-bezier(0.22,1,0.36,1)；\n4. pointermove 找最近数据点：圆点移动 + tooltip 用百分比定位（x/W*100），pointerleave 隐藏；\n5. 迷你柱状：高度 = v/max*100%，每根 stagger 45ms scaleY 生长，遵循涨红跌绿。",
    "refined": "可配置 sparkline 卡：viewBox 200×64、PAD 6、线宽 2、面积透明度 0.12、描边动画 1s、柱状 stagger 45ms、涨色 #dc2626 / 跌色 #16a34a。\n验收：① 容器任意宽度下折线均铺满且 tooltip 点位不偏移；② 数据全相等时（min==max）不出现 NaN；③ prefers-reduced-motion 下走势线直接完整显示；④ 悬浮移出后圆点与 tooltip 同时隐藏。"
  },
  "knobs": [
    {
      "name": "viewBox 尺寸 / 内边距",
      "default": "W 200 × H 64，PAD 6",
      "range": "120–400 × 40–96，PAD 2–12",
      "effect": "归一化坐标系，决定折线曲率与上下留白。"
    },
    {
      "name": "描边生长动画",
      "default": "1s cubic-bezier(0.22, 1, 0.36, 1)，dasharray 400",
      "range": "0.4 – 2s",
      "effect": "走势线从左到右画出的时长。"
    },
    {
      "name": "面积透明度",
      "default": "0.12",
      "range": "0.05 – 0.25",
      "effect": "折线下方渐变面积的存在感。"
    },
    {
      "name": "涨跌色",
      "default": "涨 #dc2626 / 跌 #16a34a",
      "range": "任意对比色对",
      "effect": "徽章与折线颜色，中式行情惯例红涨绿跌。"
    },
    {
      "name": "柱状 stagger",
      "default": "每根 45ms",
      "range": "0 – 100ms",
      "effect": "迷你柱状依次生长的节奏。"
    }
  ],
  "pitfalls": [
    "SVG 没设 preserveAspectRatio=\"none\" 或容器宽度变了，折线与悬浮点的坐标换算（clientX → viewBox x）就对不上。",
    "数据 min==max 时 span 为 0 导致除零产生 NaN 路径，需 `|| 1` 兜底。",
    "tooltip 用像素定位而 SVG 是百分比坐标，窗口变宽后提示点漂移——位置要换算成 x/W*100%。",
    "stroke-dasharray 400 小于路径实际总长（点数多、宽度大）时，动画结束前线会缺一段。",
    "迷你柱状把 height 写成固定像素而不是按 max 归一的百分比，数据一换比例全错。",
    "pointermove 里直接用 e.clientX 当 SVG 坐标，忘了先减 rect.left 再按 rect.width 缩放。"
  ],
  "effectTags": [
    "sparkline",
    "数据可视化",
    "走势",
    "描边动画",
    "涨红跌绿"
  ]
};
