import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "星轨环绕标志",
    "en": "Orbit Logo",
    "aliases": [
      "轨道logo",
      "星球标志",
      "orbit logo"
    ],
    "pattern": "Logo Mark · Core + Orbit Ring",
    "principle": "中心实心球 + 椭圆轨道（rotate -30°）+ 轨道上的亮点卫星，三元素渐变同源，形成运动感。"
  },
  "prompts": {
    "short": "做一个星轨 logo：中心渐变球体 + 倾斜椭圆轨道 + 轨道亮点。",
    "standard": "用内联 SVG 实现：\n1. 中心 circle r4.2 渐变填充；\n2. 轨道 ellipse rx9 ry4.2 stroke 1.8，transform rotate(-30 12 12)；\n3. 亮点 circle r1.7 置于轨道右上 (19.6,8.2)，可加缓慢环绕动画；\n4. 轨道穿过球体前后关系：前半段遮住球体下半（轨道整体在上层即可）。",
    "refined": "扩展：卫星沿轨道 animateMotion 环绕（8s 循环）；球体加高光点；提供静态/动态双版本。"
  },
  "knobs": [
    {
      "name": "轨道倾角 tilt",
      "default": "-30°",
      "range": "-45 – 0°",
      "effect": "运动方向感。"
    },
    {
      "name": "球径 coreR",
      "default": "4.2",
      "range": "3.5 – 5",
      "effect": "主体大小。"
    }
  ],
  "pitfalls": [
    "椭圆中心不在 (12,12)，轨道穿出画面。",
    "亮点不落在轨道曲线上，显得脱节。",
    "rotate 未指定旋转中心导致偏移。"
  ],
  "effectTags": [
    "logo",
    "轨道",
    "科技"
  ]
};
