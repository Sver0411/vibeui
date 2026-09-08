import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "展开卡片",
    "en": "Expandable Card",
    "aliases": [
      "折叠卡片",
      "手风琴卡",
      "展开详情卡"
    ],
    "pattern": "Expand / Collapse · Grid Rows Animation",
    "principle": "外层 grid-template-rows: 0fr → 1fr 过渡 0.32s cubic-bezier(0.22,1,0.36,1)，内层 overflow:hidden + min-height:0，内容高度变化无需 JS 测量即可平滑展开；JS 只切换 data-open 与 aria-expanded。"
  },
  "prompts": {
    "short": "做一张点击头部原位展开的卡片：高度平滑过渡展示更多信息，箭头旋转 180°。用 grid-template-rows 动画实现，不测内容高度。",
    "standard": "用原生 HTML/CSS/JavaScript 实现展开卡片：\n1. 高度动画用 grid 技巧：wrapper 设 display:grid; grid-template-rows: 0fr → [data-open=true] 1fr，transition 0.32s cubic-bezier(0.22,1,0.36,1)；内容层 overflow:hidden + min-height:0（收起的关键，没有它 0fr 收不回去）；\n2. 头部是整宽 button，点击切换 card 的 data-open 和按钮 aria-expanded；chevron svg transition transform 0.3s，展开时 rotate(180deg)；\n3. 内容层的 padding 放在内侧子元素上，别写在动画层，否则收起时残留间隙；\n4. 展开态加 box-shadow 0 12px 32px rgba(0,0,0,0.08) 提升层级。",
    "refined": "可配置展开卡：展开过渡 0.32s cubic-bezier(0.22,1,0.36,1)、箭头旋转 0.3s、展开阴影 0 12px 32px rgba(0,0,0,0.08)、卡宽 min(340px, 90vw)。\n验收：① 收起时卡片高度精确回到头部高（无 1px 残留）；② 展开动画期间内容不外溢（overflow hidden）；③ aria-expanded 与视觉状态始终一致；④ 内容长短变化时动画时长不变（无需 JS 测高）。"
  },
  "knobs": [
    {
      "name": "展开过渡",
      "default": "0.32s cubic-bezier(0.22, 1, 0.36, 1)",
      "range": "0.2 – 0.5s",
      "effect": "展开/收起的速度与减速手感。"
    },
    {
      "name": "箭头旋转",
      "default": "180°，0.3s 同曲线",
      "range": "90° / 180°，0.2 – 0.4s",
      "effect": "chevron 的翻转指示。"
    },
    {
      "name": "展开态阴影",
      "default": "0 12px 32px rgba(0,0,0,0.08)，边框 #d4d4d8",
      "range": "任意柔和阴影",
      "effect": "展开后的层级抬升感。"
    },
    {
      "name": "卡宽",
      "default": "min(340px, 90vw)",
      "range": "280 – 480px",
      "effect": "内容换行密度与整体体量。"
    },
    {
      "name": "内边距",
      "default": "头部 16px，内容左右 16px + 底 16px",
      "range": "12 – 24px",
      "effect": "收起/展开的呼吸感，padding 位置影响收起是否干净。"
    }
  ],
  "pitfalls": [
    "内层忘加 min-height: 0，grid-template-rows: 0fr 收不回去，卡片关不上。",
    "偷懒用 max-height hack：估小了内容被截断，估大了收起动画前段毫无反应。",
    "padding 写在 grid 动画层上，收起后底部残留一圈空隙——padding 应放到内容子元素。",
    "箭头旋转了但 aria-expanded 没同步，读屏用户不知道当前开合状态。",
    "动画层没设 overflow: hidden，展开瞬间内容溢出卡片圆角外。",
    "header 不是 button 或没铺满整宽，点击热区只有箭头。"
  ],
  "effectTags": [
    "展开",
    "折叠",
    "高度过渡",
    "grid-rows"
  ]
};
