import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "闪电六边形标志",
    "en": "Bolt Hex Logo",
    "aliases": [
      "六边形logo",
      "闪电标志",
      "hex logo"
    ],
    "pattern": "Logo Mark · Hex + Negative Bolt",
    "principle": "六边形用三点坐标的多边形 fill 渐变，闪电以白色负形叠在中心，整体外扩 2px 安全区保证小尺寸可辨。"
  },
  "prompts": {
    "short": "做一个渐变六边形 logo：中心镂空闪电负形，靛紫渐变，圆角处理。",
    "standard": "用内联 SVG 实现 logo 标志：\n1. viewBox 0 0 24 24，六边形顶点 (12,2)(20.7,7)(20.7,17)(12,22)(3.3,17)(3.3,7)，fill 线性渐变 #6366f1→#a855f7；\n2. 闪电负形用白色 path 叠加：M13 6.5 8.5 13h3l-1 4.5L15 11h-3l1-4.5Z；\n3. 渐变 135° 方向，stop 无过渡突变；\n4. 外层留 2px 安全区，缩到 16px 仍可识别。",
    "refined": "扩展：提供描边版（stroke 1.5 同渐变）与单色版（currentColor）三个变体；六边形圆角用 stroke-linejoin round + 同色描边 2px 视觉圆角化；附 SVG symbol 复用方案。"
  },
  "knobs": [
    {
      "name": "渐变色 g",
      "default": "靛紫",
      "range": "任意双色",
      "effect": "品牌主渐变。"
    },
    {
      "name": "负形色 cutout",
      "default": "#ffffff",
      "effect": "闪电颜色，深底可换深色。"
    }
  ],
  "pitfalls": [
    "六边形顶点手算出错导致歪斜——按 60° 均分计算坐标。",
    "闪电太小缩放后糊成一团，负形至少占画布 40%。",
    "渐变 id 与页面其他 svg 冲突，id 要唯一。"
  ],
  "effectTags": [
    "logo",
    "渐变",
    "品牌"
  ]
};
