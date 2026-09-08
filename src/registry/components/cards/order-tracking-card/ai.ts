import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "订单跟踪卡",
    "en": "Order Tracking Card",
    "aliases": [
      "物流卡片",
      "快递跟踪卡",
      "步骤条卡片"
    ],
    "pattern": "Stepper + Timeline",
    "principle": "四等分 flex 步条叠在 ::before 贯穿底轨上，完成节点用内嵌 SVG data-URI 白色对勾，当前节点 box-shadow 1.8s 脉冲；下方日志用 li::before 圆点 + ::after 竖线串成时间线，纯数据渲染无状态逻辑。"
  },
  "prompts": {
    "short": "做一张物流订单卡：四段横向状态步条（完成绿对勾 / 当前节点蓝色脉冲 / 未来灰点）加可滚动的节点时间线。原生实现。",
    "standard": "用原生 HTML/CSS/JavaScript 实现订单跟踪卡：\n1. 步条：flex 四项各 25%，::before 画 2px 贯穿线（left/right 用 calc(12.5% + 14px) 缩进到圆心）；完成节点 16px 圆实心 #16a34a 内嵌 SVG data-URI 对勾（background-size 10px 居中）；当前节点 #2563eb 实心 + box-shadow 0 0 0 4px rgba(37,99,235,0.15) 做 1.8s 脉冲；\n2. 节点列表 max-height 148px overflow-y auto，li::before 7px 圆点、::after 1px 竖线连接，最后一项 ::after display:none；\n3. 数据数组由 JS 渲染，当前事件加 .hot 高亮；role=list/listitem 标注。",
    "refined": "可配置订单跟踪卡：完成色 #16a34a / 当前色 #2563eb、脉冲 1.8s box-shadow 3px→7px、日志区 max-height 148px、贯穿线 top 7px 高 2px。\n验收：① 任意节点数下贯穿线两端精确落在首尾圆心；② 日志滚动到底无多余竖线残段；③ prefers-reduced-motion 下仅停脉冲、配色不变；④ 对勾不随节点尺寸变化平铺或变形。"
  },
  "knobs": [
    {
      "name": "完成 / 当前色",
      "default": "#16a34a / #2563eb",
      "range": "任意绿×蓝对",
      "effect": "已完成对勾节点与当前脉冲节点的语义色。"
    },
    {
      "name": "脉冲动画",
      "default": "1.8s ease-in-out infinite，box-shadow 3px→7px",
      "range": "1 – 3s",
      "effect": "当前节点光晕的呼吸节奏。"
    },
    {
      "name": "日志区高度",
      "default": "max-height 148px, overflow-y auto",
      "range": "100 – 300px",
      "effect": "时间线可视范围与滚动触发点。"
    },
    {
      "name": "贯穿线几何",
      "default": "top 7px、高 2px、left/right calc(12.5% + 14px)",
      "range": "随节点宽度/圆点半径重算",
      "effect": "底轨在步条中的垂直位置与端点缩进。"
    },
    {
      "name": "时间线圆点 / 竖线",
      "default": "7px 圆点 #cbd5e1、1px 竖线 --ot-line",
      "range": "6 – 9px",
      "effect": "日志时间线的节点大小与连线粗细。"
    }
  ],
  "pitfalls": [
    "贯穿线端点用 calc(12.5% + 14px) 硬编码，节点数或圆点尺寸一改就缩进错位——需按 100/n/2 重算。",
    "对勾 SVG data-URI 忘设 background-size 和 no-repeat，节点改大后对勾平铺变形。",
    "时间线最后一项没去掉 ::after 连线，列表底部多出一截悬空竖线。",
    "当前节点脉冲只用 box-shadow 动画没问题，但若同时动画 background 会闪烁——只动阴影。",
    "步条节点 width: 25% 与标签换行冲突，标签长时把布局撑歪，需 min-width:0 或截断。"
  ],
  "effectTags": [
    "步骤条",
    "时间线",
    "物流",
    "状态",
    "脉冲"
  ]
};
