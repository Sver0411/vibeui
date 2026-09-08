import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "空状态页面",
    "en": "Empty State Page",
    "aliases": [
      "零数据页",
      "占位页",
      "No Data"
    ],
    "pattern": "Empty State · 纯 CSS 插画卡片",
    "principle": "三张居中卡片并排，各自用纯 CSS（border 圆环、伪元素拼形状）画搜索/收件箱/建项目三种 84px 插画；文案遵循「现状说明 + 下一步动作」，每个状态配一个明确按钮。"
  },
  "prompts": {
    "short": "做一组空状态卡片：无搜索结果、收件箱为空、首次建项目三种，插画用纯 CSS 绘制不用图片，文案友好并各带一个行动按钮。原生 HTML/CSS。",
    "standard": "用原生 HTML/CSS 实现单文件空状态组：\n1. 三张卡片放进 repeat(auto-fit, minmax(230px, 1fr)) 网格，内容居中排列；\n2. 每张卡顶部一个 84px 圆角画布（底色取品牌色 8–9% 透明度），内部用带 border 的圆/矩形 + ::before/::after 拼出放大镜、收件箱、加号方块插画；\n3. 标题 ≤6 字、说明一句话点出下一步、按钮区分主次（一个主按钮深色、两个次按钮白底描边）；\n4. 插画容器加 aria-hidden=\"true\"。",
    "refined": "实现空状态组：插画 84px、圆角 24px、图标描边 4px，三种主题色分别为 #0f766e / #b45309 / #6366f1；说明文案 max-width 30ch、行高 1.65。验收标准：① 三幅插画全部由 border+伪元素构成，无 img/svg；② 卡片在窄屏自动纵向堆叠不挤压；③ 每张卡都有且只有一个按钮，主次层级清晰。"
  },
  "knobs": [
    {
      "name": "插画画布",
      "default": "84px，圆角 24px，底色 8–9% 主题色",
      "range": "64 – 120px",
      "effect": "插画的视觉体量与留白比例。"
    },
    {
      "name": "图标描边粗细",
      "default": "4px",
      "range": "3 – 6px",
      "effect": "插画的线条风格，越粗越卡通。"
    },
    {
      "name": "三态主题色",
      "default": "#0f766e / #b45309 / #6366f1",
      "range": "任意三色",
      "effect": "区分三种场景的情绪色，同时用于画布底与线条。"
    },
    {
      "name": "卡片栅格",
      "default": "repeat(auto-fit, minmax(230px, 1fr))，间距 14px",
      "range": "minmax 200 – 280px",
      "effect": "多卡并排与窄屏堆叠的行为。"
    },
    {
      "name": "说明文案宽度",
      "default": "max-width: 30ch",
      "range": "24 – 40ch",
      "effect": "文案换行节奏，防止一行太长。"
    }
  ],
  "pitfalls": [
    "插画用图标字体或外链图片，违背纯 CSS 初衷且首屏闪烁；应用 border+伪元素拼形状。",
    "文案只说「没有数据」不给下一步动作，空状态变成死胡同。",
    "插画容器不加 aria-hidden，装饰性伪元素被读屏念出。",
    "三个按钮全做成同一权重，用户不知道该点哪个；应有且只有一个主按钮。",
    "画布内伪元素用了绝对定位却没给父级 position: relative，形状全部飞出画布。"
  ],
  "effectTags": [
    "空状态",
    "纯 CSS 插画",
    "引导文案",
    "卡片",
    "零图片"
  ]
};
