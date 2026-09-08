import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "航班卡",
    "en": "Flight Card",
    "aliases": [
      "机票卡",
      "航班信息",
      "flight ticket"
    ],
    "pattern": "Flight · Route Summary",
    "principle": "三段式：左机场代码（出发）、中间航线图（起终点圆点 + 虚线 + 飞机图标 + 下方时长）、右机场代码（到达）；代码用 24px 大字，城市全称小字补充；底部行放航司/舱位与价格按钮。"
  },
  "prompts": {
    "short": "做一张航班卡：HGH→PEK 机场代码大字、中间虚线航路加飞机图标与 2h 25m 时长、准点率 96%、底部航司舱位与 ¥850 预订按钮。",
    "standard": "用纯 HTML/CSS 实现航班卡：\n1. 上部：grid 三列 [1fr auto 1fr]——左右各是机场代码（26px/750 + 下方城市名 12px 灰），中间航线图；\n2. 航线图：宽 120px 的容器，左右端 6px 圆点（左空心右实心），中间 2px 虚线（border-top dashed），飞机 SVG absolute 定位在中点上方 rotate(45deg)；时长文字在虚线下方 11px；\n3. 元信息行：CA1856 · 波音 738 · 准点率 96%（准点率 ≥90% 绿色）；\n4. 底部：左「经济舱 7 折」标签 + 右价格 ¥850（18px/750 橙色）+ 预订按钮（主色小按钮）；\n5. 卡片白底描边圆角 14px，悬停阴影加深不位移。",
    "refined": "扩展为航班选择列表项：中转航班显示两段航路 + 中转机场徽标与停留时长；红眼航班月亮图标；价格含「含税」小字与折扣角标；选中态整卡主色描边 + 右上对勾；列表支持按价格/时长排序动画。验收：① 中转与直飞布局都稳定；② 读屏按「出发-到达-时长-价格」顺序播报；③ 深浅主题都可用。"
  },
  "knobs": [
    {
      "name": "代码字号 codeSize",
      "default": "26px",
      "range": "22 – 32px",
      "effect": "机场代码视觉权重。"
    },
    {
      "name": "航路宽 routeW",
      "default": "120px",
      "range": "90 – 160px",
      "effect": "中间航路图宽度。"
    },
    {
      "name": "价格色 priceColor",
      "default": "#c2410c",
      "effect": "价格强调色。"
    }
  ],
  "pitfalls": [
    "机场代码与城市名层级颠倒——代码才是扫读主键。",
    "虚线用 background-image 平铺，缩放时对不齐——border dashed 最稳。",
    "准点率不分色，96% 和 71% 看起来一样重要。",
    "价格没有对齐基线，与按钮挤在一行错位。",
    "飞机图标忘记旋转方向，朝回出发地。"
  ],
  "effectTags": [
    "航班",
    "旅行",
    "路径图"
  ]
};
