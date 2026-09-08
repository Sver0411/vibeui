import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "数据统计条",
    "en": "Stats Bar / KPI Stats Section",
    "aliases": [
      "数据条",
      "指标条",
      "KPI 展示"
    ],
    "pattern": "Stats · KPI Display",
    "principle": "三种形态共用 dl 语义结构：分隔线条式用 grid-auto-flow: column 等分 + 相邻兄弟选择器画竖线（首项不画），数字统一 tabular-nums 等宽对齐；卡片形态用 4 列网格 + CSS border 三角画涨跌箭头；窄屏改两列并用 nth-child 规则重排竖线。"
  },
  "prompts": {
    "short": "做一个数据统计区块：一行四项指标（上数字下标签）用竖线分隔，另有四张带同比涨跌箭头的指标卡片和一个深色版。纯 HTML/CSS，数字等宽对齐。",
    "standard": "用原生 HTML/CSS 实现三种统计区块：\n1. 分隔线条式：dl 内 grid-auto-flow: column; grid-auto-columns: 1fr，每项上下 padding 22px，容器 border-block 上下描边；竖线只用 .st-item + .st-item 画，首项无线；标签 order: 2 放数字下方；数字 clamp(22px, 3.6vw, 30px) + font-variant-numeric: tabular-nums，单位用 0.5em 缩小上标风格；\n2. 卡片式：repeat(4, minmax(0, 1fr)) 网格，涨/跌用 CSS border 三角（border-left/right 4px transparent + bottom/top 5px currentColor），涨 teal #0f766e、跌 amber #d97706、持平灰字；\n3. 深色版：底色 #18181b、圆角 14px、竖线 #3f3f46；\n4. 860px 卡片降 2 列；520px 线条式改 2×2，nth-child(even) 才画左竖线。",
    "refined": "实现数据统计条三形态，暴露参数：数字字号 clamp(22px, 3.6vw, 30px)、卡片 4 列 gap 14px、涨跌色 #0f766e/#d97706、深色底 #18181b、断点 860px（卡片 2 列）与 520px（线条式 2×2 行距 20px）。验收标准：① 所有数字 tabular-nums 对齐，单位缩小不换行；② 首项无多余左竖线，深色版竖线颜色同步；③ 520px 下 2×2 布局只在每行第二项画竖线；④ 持平项显示灰字不带箭头。"
  },
  "knobs": [
    {
      "name": "数字字号",
      "default": "clamp(22px, 3.6vw, 30px)（卡片版 26px）",
      "range": "20 – 40px",
      "effect": "指标数字的视觉分量，是统计区块的主角。"
    },
    {
      "name": "涨跌色",
      "default": "涨 #0f766e / 跌 #d97706 / 持平 #a1a1aa",
      "range": "语义色对",
      "effect": "同比变化的颜色编码，箭头用 currentColor 自动跟随。"
    },
    {
      "name": "卡片列数与断点",
      "default": "4 列（860px 下 2 列）",
      "range": "3 – 6 列",
      "effect": "卡片形态的密度。"
    },
    {
      "name": "深色版底色",
      "default": "#18181b，竖线 #3f3f46，圆角 14px",
      "range": "zinc-900 附近",
      "effect": "深色统计条的底色与分隔线对比度。"
    },
    {
      "name": "窄屏重排断点",
      "default": "max-width: 520px 改 2×2，行距 20px",
      "range": "460 – 600px",
      "effect": "线条式从横排一行改两行两列的阈值。"
    }
  ],
  "pitfalls": [
    "数字漏写 font-variant-numeric: tabular-nums，等宽对齐失效，数值刷新时宽度跳动。",
    "竖线用 .st-item { border-left } 给所有项都画，首项左侧多出一条线；应该用相邻兄弟选择器只画项间分隔。",
    "520px 以下直接去掉全部竖线或保留横排竖线，2×2 重排后 nth-child 规则错乱，奇数行左项带线。",
    "涨跌箭头用 emoji/字符（▲▼），跨平台渲染大小不一；应用 CSS border 三角 + currentColor。",
    "卡片网格用 repeat(4, 1fr) 没加 minmax(0, 1fr)，长数字（99.98%）撑破网格导致溢出。",
    "单位（%、ms）和数字同字号同色，视觉上与数字混在一起；应缩小到 0.5em 并降灰。"
  ],
  "effectTags": [
    "数据统计",
    "KPI",
    "涨跌指标",
    "等宽数字",
    "仪表盘"
  ]
};
