import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "商品卡片",
    "en": "Product Card",
    "aliases": [
      "电商卡片",
      "购物卡片",
      "商品展示卡"
    ],
    "pattern": "E-commerce Card",
    "principle": "商品视觉用双层 linear-gradient 形状加内/外阴影冒充产品图；尺码组以 aria-checked 单选语义切换；加购按钮点击后换色显示 \"Added ✓\"，1400ms 定时复原，连点靠 clearTimeout 防抖。"
  },
  "prompts": {
    "short": "做一张电商商品卡：纯 CSS 商品占位视觉、价格、星级评分、尺码选择和带\"已加入\"反馈的加购按钮。原生实现。",
    "standard": "用原生 HTML/CSS/JavaScript 实现商品卡片：\n1. 商品区 190px 高，用渐变圆角形状 + inset 阴影 + 投影做无图产品占位，左上角胶囊角标；\n2. 尺码按钮组用 role=radio/aria-checked 单选语义，选中态黑底白字，点击互斥切换；\n3. 加购按钮点击后 label 改 \"Added ✓\"、背景换 #0f766e，setTimeout 1400ms 复原（复原前 clearTimeout 防连点错乱）；\n4. 卡片 hover translateY(-4px) + 阴影加深，0.25s cubic-bezier(0.22,1,0.36,1)；价格 font-variant-numeric: tabular-nums。",
    "refined": "可配置商品卡：卡宽 min(270px, 90vw)、商品区 190px、尺码块 34×30px、加购反馈 1400ms 底色 #0f766e、hover 位移 -4px、active 缩放 0.98。\n验收：① 尺码用键盘 Tab + 方向可切换且 aria-checked 同步；② 快速连点加购，反馈文字总是足时后才复原；③ hover 上浮时阴影与位移同曲线不撕裂；④ 价格变化时数字不左右抖动。"
  },
  "knobs": [
    {
      "name": "悬浮位移 / 时长",
      "default": "translateY(-4px), 0.25s cubic-bezier(0.22,1,0.36,1)",
      "range": "-2 – -8px, 0.15 – 0.4s",
      "effect": "卡片 hover 的上浮量与跟手感。"
    },
    {
      "name": "商品区高度",
      "default": "190px",
      "range": "150 – 240px",
      "effect": "占位视觉与角标的呼吸空间。"
    },
    {
      "name": "尺码块尺寸",
      "default": "34×30px，圆角 8px",
      "range": "30 – 44px 宽",
      "effect": "尺码按钮的点击热区。"
    },
    {
      "name": "加购反馈",
      "default": "1400ms，底色 #0f766e",
      "range": "800 – 2500ms，任意强调色",
      "effect": "\"Added ✓\" 的停留时长与成功色。"
    },
    {
      "name": "按压缩放",
      "default": "scale(0.98)",
      "range": "0.94 – 0.99",
      "effect": "按钮按下的物理反馈强度。"
    }
  ],
  "pitfalls": [
    "尺码组只靠 class 切换没用 aria-checked/role=radio，键盘用户无法选择尺码。",
    "加购连点时没在 setTimeout 前 clearTimeout，第二次点击的反馈被上一次的定时器提前复原。",
    "hover 位移和阴影用了不同 easing/时长，上浮时阴影拖影撕裂。",
    "价格没设 font-variant-numeric: tabular-nums，数字刷新时宽度抖动。",
    "纯 CSS 商品占位的渐变与背景太接近又没加投影，产品形状完全隐形。",
    "角标用 absolute 定位但商品区忘设 position: relative，角标飞出卡片。"
  ],
  "effectTags": [
    "电商",
    "加购",
    "尺码选择",
    "悬浮",
    "评分"
  ]
};
