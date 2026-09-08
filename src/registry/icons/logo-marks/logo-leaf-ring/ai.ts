import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "绿叶圆环标志",
    "en": "Leaf Ring Logo",
    "aliases": [
      "叶子logo",
      "圆环标志",
      "leaf logo"
    ],
    "pattern": "Logo Mark · Ring + Leaf Negative",
    "principle": "粗描边圆环（stroke 3）承载品牌色渐变，叶片以两段贝塞尔曲线闭合，白梗细线制造负形层次。"
  },
  "prompts": {
    "short": "做一个绿叶圆环 logo：渐变粗圆环 + 内嵌叶片与白色叶梗。",
    "standard": "用内联 SVG 实现：\n1. 圆环 circle r8.2 stroke-width 3 渐变 #10b981→#84cc16；\n2. 叶片 M8.5 15.5c0-4 2.8-7 7-7 0 4.2-3 7-7 7Z 渐变填充；\n3. 叶梗 M8.5 15.5 15.5 8.5 白色 1.2 细线；\n4. 所有元素围绕圆心平衡，缩放不散架。",
    "refined": "扩展：叶片可做呼吸微动画（scale 0.96↔1，transform-origin 叶尖）；提供深浅两种底色适配；导出 favicon 尺寸核对清单（16/32/48px 可辨）。"
  },
  "knobs": [
    {
      "name": "环粗 ringW",
      "default": "3",
      "range": "2 – 4",
      "effect": "圆环描边宽度。"
    },
    {
      "name": "叶色 g",
      "default": "翠绿",
      "effect": "渐变双绿色系。"
    }
  ],
  "pitfalls": [
    "叶片偏离圆心整体失衡。",
    "白梗在浅色背景消失，深浅底都要核对。",
    "渐变方向与叶片朝向一致更自然。"
  ],
  "effectTags": [
    "logo",
    "环保",
    "渐变"
  ]
};
