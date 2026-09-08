import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "叠层菱形标志",
    "en": "Diamond Stack Logo",
    "aliases": [
      "菱形logo",
      "层叠标志",
      "diamond logo"
    ],
    "pattern": "Logo Mark · Offset Layers",
    "principle": "前后两个菱形（旋转 45° 的正方形）错位叠加，后层低透明度表达层次，前层实色渐变压住重心。"
  },
  "prompts": {
    "short": "做一个叠层菱形 logo：后层半透明大菱形 + 前层渐变实色小菱形，错位叠放。",
    "standard": "用内联 SVG 实现：\n1. 后层菱形 M12 2.5 20.5 12 12 21.5 3.5 12Z 渐变填充 opacity .35；\n2. 前层菱形 M12 7 18.5 14.2 12 21.4 5.5 14.2Z 渐变实色，向下错位形成堆叠感；\n3. 两层渐变同色相，靠透明度分层；\n4. 顶点对齐中线，重心稳。",
    "refined": "扩展：三层版本（再加一层 opacity .15）；hover 时前层沿 Y 轴微移 2px 的分离动效；深色主题下透明度改 .25。"
  },
  "knobs": [
    {
      "name": "后层透明度 backAlpha",
      "default": "0.35",
      "range": "0.2 – 0.5",
      "effect": "纵深强度。"
    },
    {
      "name": "错位偏移 offset",
      "default": "3",
      "range": "2 – 5",
      "effect": "层间位移量。"
    }
  ],
  "pitfalls": [
    "两层完全重叠没有层次，错位至少 2px。",
    "透明层颜色发灰，应保持同色相降透明度。",
    "菱形顶点不在中线上会显得歪。"
  ],
  "effectTags": [
    "logo",
    "叠层",
    "渐变"
  ]
};
