import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "博客首页",
    "en": "Blog Home Page",
    "aliases": [
      "博客门户",
      "内容站首页",
      "文章列表页"
    ],
    "pattern": "Content Site · 头条大卡 + 文章网格",
    "principle": "顶部导航 + 一张双栏头条大卡 + 三列文章卡网格 + RSS 底栏；所有封面用 CSS 渐变与半透明圆形装饰绘制，零图片资源；640px 以下头条与网格同时降为单列。"
  },
  "prompts": {
    "short": "做一个博客首页：顶部导航、渐变封面头条大卡、三列文章卡片网格、RSS 底栏，封面全部用 CSS 渐变不依赖图片。原生 HTML/CSS，无需 JS。",
    "standard": "用原生 HTML/CSS 实现单文件博客首页：\n1. 内容统一约束在 min(720px, 88vw) 容器内：顶栏 logo+导航、头条大卡（左渐变封面右正文，1.1fr/1fr）、三列文章网格、底栏；\n2. 封面用 linear-gradient 背景 + 一个半透明圆形 ::after 或 <i> 装饰，配 aria-hidden；\n3. 卡片 hover 上浮 3px 加阴影，prefers-reduced-motion 下禁用；\n4. 640px 断点下头条改单栏、网格改单列。",
    "refined": "实现博客首页：头条封面 min-height 220px、渐变 140deg(#0f766e→#0ea5e9→#8b5cf6)；文章卡封面高 92px、圆角 14px、网格间距 14px；hover 位移 -3px、阴影 0 8px 22px rgba(0,0,0,.08)。验收标准：① 三种卡片封面渐变色各不相同且小屏不塌陷；② 头条与网格在 640px 以下都变单列；③ reduced-motion 下 hover 无位移。"
  },
  "knobs": [
    {
      "name": "内容宽度",
      "default": "min(720px, 88vw)",
      "range": "640 – 1100px",
      "effect": "整个页面内容的最大行宽，决定疏密感。"
    },
    {
      "name": "文章网格列数",
      "default": "repeat(3, 1fr)",
      "range": "2 – 4 列",
      "effect": "文章卡排布密度，配合 640px 单列降级。"
    },
    {
      "name": "头条封面渐变",
      "default": "linear-gradient(140deg, #0f766e, #0ea5e9 60%, #8b5cf6)",
      "range": "任意双色/三色组合",
      "effect": "头条视觉基调，卡片封面另有三组独立渐变。"
    },
    {
      "name": "卡片封面高度",
      "default": "92px",
      "range": "72 – 140px",
      "effect": "小卡的图文比例与整页节奏。"
    },
    {
      "name": "断点",
      "default": "640px",
      "range": "560 – 768px",
      "effect": "头条与网格同时折为单列的时机。"
    }
  ],
  "pitfalls": [
    "封面依赖真实图片导致占位闪烁或加载抖动；本模板思路是纯渐变绘制，先定 min-height 再上装饰。",
    "640px 断点只改了文章网格，漏改头条大卡，头条在手机上仍是挤压的两栏。",
    "卡片 hover 的 transform/box-shadow 没配 prefers-reduced-motion 兜底。",
    "渐变封面里的装饰圆形忘了 aria-hidden=\"true\"，读屏把空元素念出来。",
    "三列网格在 480px 以下不降级，卡片标题被压成两三个字一行的竖条。"
  ],
  "effectTags": [
    "博客",
    "头条大卡",
    "CSS 渐变封面",
    "三列网格",
    "零图片"
  ]
};
