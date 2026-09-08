import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "商品详情页",
    "en": "Product Detail Page",
    "aliases": [
      "PDP",
      "电商商品页",
      "单品页"
    ],
    "pattern": "E-commerce · 画廊 + 变体选择",
    "principle": "左图右信息两栏网格；商品主视觉与缩略图全部用 CSS 渐变占位（无图片资源），颜色变体以 radiogroup 语义切换并同步主图/缩略图/价格，数量步进实时更新加购合计，加购后按钮短暂变绿反馈。"
  },
  "prompts": {
    "short": "做一个电商商品详情页：左侧缩略图画廊+主图、右侧标题价格、颜色变体切换同步主图与价格、数量步进与加购反馈。原生 HTML/CSS/JS 单文件。",
    "standard": "用原生 HTML/CSS/JavaScript 实现单文件商品详情页：\n1. 两栏网格 minmax(0,1.05fr)/1fr，窄屏 700px 折单列；主图 1:1、圆角 18px，缩略图 52px 选中态描边；\n2. 商品视觉用 CSS 渐变绘制（三种变体各一组渐变），不依赖图片；\n3. 变体与缩略图共享 aria-checked/aria-selected 状态，切换时同步主图 hidden 与价格；\n4. 数量步进夹在 1–9，加购按钮点击后变文案变色 1.5s 再恢复。",
    "refined": "实现商品详情页：容器 max-width 860px；缩略图 52px 圆角 11px 选中描边 2px #26262b；变体圆片 34px 选中 outline 2px；基础价 $89，数量 1–9；加购反馈背景 #0f766e 持续 1500ms。验收标准：① 点缩略图和点变体效果完全一致（同一状态源）；② 数量减到 1 不再下探、加到 9 不再上探；③ 主图与选中变体永远对应。"
  },
  "knobs": [
    {
      "name": "两栏比例与断点",
      "default": "minmax(0, 1.05fr) / 1fr，700px 折单列",
      "range": "1fr–1.4fr，断点 600 – 800px",
      "effect": "画廊与信息栏的宽度分配及移动端降级时机。"
    },
    {
      "name": "缩略图尺寸",
      "default": "52px，圆角 11px，间距 9px",
      "range": "44 – 72px",
      "effect": "画廊切换区的可点面积与选中态清晰度。"
    },
    {
      "name": "变体圆片",
      "default": "34px 圆形，选中 outline 2px",
      "range": "28 – 44px",
      "effect": "颜色选择器的触控目标与选中可见性。"
    },
    {
      "name": "数量范围",
      "default": "min 1 / max 9",
      "range": "1–5 / 1–99",
      "effect": "步进器上下限，影响合计金额上限。"
    },
    {
      "name": "基础价格",
      "default": "$89（变体覆盖 data-price）",
      "range": "任意数值",
      "effect": "默认单价，切变体时被 data-price 覆盖并重算合计。"
    }
  ],
  "pitfalls": [
    "变体切换只改了主图或只改了缩略图，两处状态不同步；应让变体与缩略图写入同一个状态函数。",
    "数量步进不做 Math.max/Math.min 夹取，减到 0 或负数、加到两位数。",
    "加购反馈 setTimeout 后忘了恢复按钮原文案与背景色，二次点击状态错乱。",
    "两栏网格用 1.05fr 却不写 minmax(0, …)，长标题把左栏撑爆、内容溢出。",
    "变体选择不用 radiogroup/aria-checked 语义，纯 div 点击对键盘与读屏不可用。"
  ],
  "effectTags": [
    "电商",
    "变体切换",
    "数量步进",
    "加购反馈",
    "纯 CSS 占位"
  ]
};
