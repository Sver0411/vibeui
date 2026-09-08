import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "课程卡",
    "en": "Course Card",
    "aliases": [
      "网课卡片",
      "教育卡片",
      "course listing"
    ],
    "pattern": "Course Card · Media Listing",
    "principle": "上图下文媒体卡结构；封面用渐变 + 大字标识代替图片资源；学习进度条用嵌套 div 宽度百分比渲染；价格行由现价（强调色加粗）+ 划线原价组成对比锚点。"
  },
  "prompts": {
    "short": "做一张课程卡：渐变封面带时长角标与分类标签、课程名、讲师行带小头像字标、学习进度条、折后价对比原价。",
    "standard": "用纯 HTML/CSS 实现课程卡：\n1. 结构：媒体区（渐变背景 + 分类标签 + 时长角标）+ 内容区（标题两行截断、讲师行、进度条、价格行）；\n2. 封面渐变每张卡不同：用两个 CSS 变量 --cs-g1/--cs-g2 传 linear-gradient(135deg,…)；时长角标半透明黑底白字放右下角；\n3. 进度条：8px 圆角轨道 + 内部填充 div，宽度内联 style 百分比，右侧配 11% 百分比数字；\n4. 价格：现价 17px 800 字重强调色，原价 12px 划线灰字，右侧「限时特惠」小标签；\n5. 悬停：封面轻微放大（scale 1.04，overflow hidden 裁切）+ 卡片阴影加深。",
    "refined": "扩展为可配置课程卡组件：支持 state（未开始/学习中/已完成）三态——学习中显示进度条，已完成显示绿色对勾与「复习」按钮，未开始显示「开始学习」主按钮；封面图缺失时优雅回退到字标渐变；整卡可点、hover 只用 transform 与 opacity 避免重排。验收：① 三态切换布局稳定；② 长标题严格两行截断（-webkit-line-clamp）。"
  },
  "knobs": [
    {
      "name": "封面渐变 gradient",
      "default": "靛蓝系",
      "effect": "传 --cs-g1/--cs-g2 两个色值即可换肤。"
    },
    {
      "name": "封面放大 hoverScale",
      "default": "1.04",
      "range": "1.02 – 1.08",
      "effect": "悬停时封面放大倍率，需配 overflow hidden。"
    },
    {
      "name": "进度条高 trackHeight",
      "default": "6px",
      "range": "4px – 10px",
      "effect": "进度条粗细，越粗存在感越强。"
    }
  ],
  "pitfalls": [
    "封面 hover 放大没有 overflow:hidden，图片会溢出圆角。",
    "长标题不截断会把讲师行和价格挤出版面——用 line-clamp 两行。",
    "划线原价没变灰缩小，价格对比出不来。",
    "进度条纯色填充太扎眼，用主色到浅色的线性过渡更柔和。",
    "角标文字直接叠在渐变亮区可读性差，加半透明黑底。"
  ],
  "effectTags": [
    "课程卡",
    "教育",
    "进度"
  ]
};
