import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "朝阳标志",
    "en": "Sun Mark Logo",
    "aliases": [
      "太阳logo",
      "朝阳标志",
      "sun logo"
    ],
    "pattern": "Logo Mark · Half Sun + Rays",
    "principle": "半轮圆形承担主体，放射短线环绕上缘表达光芒，下缘水平线做地平线，重心稳且向上。"
  },
  "prompts": {
    "short": "做一个朝阳 logo：半轮渐变日轮 + 上缘放射线 + 地平线。",
    "standard": "用内联 SVG 实现：\n1. 半轮：M4.5 16a7.5 7.5 0 0 1 15 0Z 渐变填充（上半圆）；\n2. 放射线 5 根按角度分布在上缘外侧；\n3. 地平线 M3 16h18 圆头横线；\n4. 光线长度一致角度均匀。",
    "refined": "扩展：光线呼吸动画（伸长 1px 循环）；日出进度变体（半轮升出地平线的高度可调）。"
  },
  "knobs": [
    {
      "name": "日轮半径 sunR",
      "default": "7.5",
      "range": "6 – 9",
      "effect": "主体大小。"
    },
    {
      "name": "光线数 rays",
      "default": "5",
      "range": "3 – 9",
      "effect": "光芒密度。"
    }
  ],
  "pitfalls": [
    "光线角度不均匀显得手抖。",
    "半轮弦线忘记封口看起来缺口。",
    "地平线太粗压过主体。"
  ],
  "effectTags": [
    "logo",
    "朝阳",
    "渐变"
  ]
};
