import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "蜂巢标志",
    "en": "Hive Logo",
    "aliases": [
      "蜂巢logo",
      "六边形标志",
      "hive logo"
    ],
    "pattern": "Logo Mark · Honeycomb Trio",
    "principle": "三枚正六边形两下一上拼接，深浅两种透明度区分层次，表达群体协作。"
  },
  "prompts": {
    "short": "做一个蜂巢 logo：三枚六边形蜂窝拼接，两种透明度分层。",
    "standard": "用内联 SVG 实现：\n1. 六边形模板（平顶）以三点定位：中心 (9,8.7) (15,8.7) (12,14.6)，半径 3.6；\n2. 上枚 opacity 1、下两枚 opacity .55，同渐变；\n3. 相邻边贴合不留缝。",
    "refined": "扩展：hover 时三枚依次点亮；增加至 4-7 枚的蜂窝矩阵变体；中心枚放字母的定制版。"
  },
  "knobs": [
    {
      "name": "六边半径 hexR",
      "default": "3.6",
      "range": "3 – 4.2",
      "effect": "单胞大小。"
    },
    {
      "name": "层次透明度 layerAlpha",
      "default": "0.55",
      "range": "0.4 – 0.7",
      "effect": "深浅差。"
    }
  ],
  "pitfalls": [
    "六边形之间留缝，边要共点计算。",
    "透明层次颠倒主次。",
    "整体重心偏移。"
  ],
  "effectTags": [
    "logo",
    "蜂巢",
    "协作"
  ]
};
