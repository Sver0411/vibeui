import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "棱镜三角标志",
    "en": "Tri Prism Logo",
    "aliases": [
      "三角logo",
      "棱镜标志",
      "prism logo"
    ],
    "pattern": "Logo Mark · Overlapping Triangles",
    "principle": "两枚同形三角形错位叠放，靠透明度与色相差异表达「折射」，负空间形成第三枚虚三角。"
  },
  "prompts": {
    "short": "做一个棱镜三角 logo：两枚渐变三角形错位叠加，透明混色。",
    "standard": "用内联 SVG 实现：\n1. 三角 A M7 4 17 4 12 13Z 渐变 opacity .8；\n2. 三角 B M17 11 22? 控制画布内：M17 11 22 20 12 20Z 换色相渐变 opacity .75；\n3. 重叠区透明混色自然；\n4. 顶点错位形成动势。",
    "refined": "扩展：混合模式 multiply 版本；hover 两枚三角分离 2px；提供正三角/倒三角双变体。"
  },
  "knobs": [
    {
      "name": "错位量 offset",
      "default": "3",
      "range": "2 – 5",
      "effect": "折射错位感。"
    },
    {
      "name": "透明度 alpha",
      "default": "0.75",
      "range": "0.6 – 0.9",
      "effect": "混色浓度。"
    }
  ],
  "pitfalls": [
    "两枚完全重叠没有折射感。",
    "透明度太低颜色发脏。",
    "顶点出画布被裁。"
  ],
  "effectTags": [
    "logo",
    "棱镜",
    "渐变"
  ]
};
