import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "浪盾标志",
    "en": "Wave Shield Logo",
    "aliases": [
      "盾牌logo",
      "安全标志",
      "shield logo"
    ],
    "pattern": "Logo Mark · Shield + Waves",
    "principle": "盾形以中轴对称的多边形表达可靠，双波浪负形削弱硬朗感，上下留白均衡。"
  },
  "prompts": {
    "short": "做一个渐变盾牌 logo：内嵌两道白色波浪，蓝靛渐变。",
    "standard": "用内联 SVG 实现：\n1. 盾形 M12 2.5 20 6v6.5c0 5-3.6 8.4-8 9.9-4.4-1.5-8-4.9-8-9.9V6l8-3.5Z 渐变填充；\n2. 两道白色波浪 path 叠加，粗细一致，间距均匀；\n3. 中轴严格对称。",
    "refined": "扩展：单色描边版；盾内波浪改电波纹的科技变体；favicon 尺寸核对。"
  },
  "knobs": [
    {
      "name": "渐变色 g",
      "default": "蓝靛",
      "effect": "品牌主渐变。"
    },
    {
      "name": "波浪条数 waves",
      "default": "2",
      "range": "1 – 3",
      "effect": "负形层数。"
    }
  ],
  "pitfalls": [
    "盾形不对称显得粗糙。",
    "波浪太密小尺寸糊掉。",
    "渐变 id 冲突。"
  ],
  "effectTags": [
    "logo",
    "安全",
    "渐变"
  ]
};
