import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "数据分析仪表盘",
    "en": "Analytics Dashboard",
    "aliases": [
      "数据看板",
      "后台仪表盘",
      "Dashboard"
    ],
    "pattern": "Dashboard · 侧边栏 + 统计卡 + SVG 折线图",
    "principle": "208px 粘性侧边栏 + 主区统计卡/图表/表格；折线图用 JS 生成确定性伪随机序列（种子 42）再拼 SVG polyline；统计数字用 requestAnimationFrame 做 1400ms 缓出 count-up，访客数每 2.2s 轻微漂移模拟实时。"
  },
  "prompts": {
    "short": "做一个数据仪表盘：左侧边栏、四张统计卡（数字滚动入场）、SVG 双折线图（本期 vs 上期）、活跃页面表格，数据本地生成无需后端。原生 HTML/CSS/JS 单文件。",
    "standard": "用原生 HTML/CSS/JavaScript 实现单文件仪表盘：\n1. 布局 208px sticky 侧边栏 + 1fr 主区，720px 以下侧栏转为顶部横排；\n2. 统计卡 auto-fit minmax(150px, 1fr)，数字入场用 requestAnimationFrame 缓出 count-up（约 1400ms，三次缓动）；\n3. 折线图手拼 SVG：双 polyline（当前期 #0f766e 粗线、上期 #cbd5d3 细线）+ 当前线下方半透明 polygon 填充 + 网格线；\n4. 数据用固定种子的伪随机生成 30 天序列保证演示稳定，表格行正负增长用绿/红色区分。",
    "refined": "实现仪表盘：侧栏 208px、断点 720px；SVG 视口 600×190，当前线 stroke-width 2.2、上期 1.6，面积填充 rgba(15,118,110,.08)；count-up 目标 48213 / 86420 / 4.2%，时长 1400ms；访客数每 2200ms 增加 0–6。验收标准：① 数字入场无跳字且千分位格式稳定；② 折线在任意窗口宽度不变形（viewBox 缩放）；③ 折线图为纯 SVG 无 Canvas/库依赖。"
  },
  "knobs": [
    {
      "name": "侧边栏宽度",
      "default": "208px，sticky top 0",
      "range": "180 – 260px",
      "effect": "导航占比，720px 以下折叠为顶部横排。"
    },
    {
      "name": "统计卡栅格",
      "default": "repeat(auto-fit, minmax(150px, 1fr))",
      "range": "minmax 120 – 200px",
      "effect": "一排能放几张统计卡、何时换行。"
    },
    {
      "name": "count-up 时长",
      "default": "1400ms，三次缓出",
      "range": "600 – 2500ms",
      "effect": "数字滚动的节奏，过长显得拖沓。"
    },
    {
      "name": "折线图序列",
      "default": "30 点，current 基线 620/方差 90，previous 520/70",
      "range": "基线与方差任意",
      "effect": "两条折线的走势与波动幅度。"
    },
    {
      "name": "实时漂移间隔",
      "default": "2200ms，每次 +0 – 6",
      "range": "1000 – 10000ms",
      "effect": "访客数模拟实时的刷新频率。"
    }
  ],
  "pitfalls": [
    "窄屏不降级侧边栏，208px 侧栏在手机上挤得内容只剩一条缝；720px 以下应转横排或抽屉。",
    "统计数字滚动没用 tabular-nums，count-up 过程中宽度抖动带动整行布局跳动。",
    "SVG 不设 viewBox 只写固定 width/height，窗口变宽时图表拉伸变形。",
    "count-up 用 setInterval 累加而不用 requestAnimationFrame，掉帧且离开标签页后仍在跑。",
    "伪随机不用固定种子，每次刷新曲线完全不同，演示与截图对不上；本模板用 seed 42 保证稳定。",
    "实时漂移的 setInterval 从不清理，单页应用切换路由后计时器泄漏继续改 DOM。"
  ],
  "effectTags": [
    "仪表盘",
    "SVG 折线图",
    "数字滚动",
    "实时模拟",
    "侧边栏布局"
  ]
};
