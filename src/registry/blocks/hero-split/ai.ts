import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "分栏 Hero",
    "en": "Split Hero",
    "aliases": [
      "Left-Right Hero",
      "Two-Column Hero",
      "图文首屏"
    ],
    "pattern": "Conversion Landing · Above the Fold",
    "principle": "左栏用眉题、标题、卖点与 CTA 完成价值主张，右栏展示产品界面示意——文字负责说服，视觉负责证明，两侧在同一首屏完成分工。"
  },
  "prompts": {
    "short": "做一个左文右图的分栏 Hero：左侧眉题、大标题、卖点清单和两个按钮，右侧一张产品示意卡片，纯 CSS。",
    "standard": "用 HTML + CSS 实现分栏 Hero 首屏：\n1. 双列网格（1.05fr / 0.95fr），居中对齐，移动端折叠为单列；\n2. 左栏：大写眉题（主色、字距加宽）→ 大标题（clamp 字号）→ 描述 → 带 ✓ 前缀的三条卖点 → 主按钮 + 文字链接；\n3. 右栏：一张白色产品示意卡片（border + 圆角 + 大阴影），内部用骨架扫光线条模拟界面内容，叠一张倾斜的主色渐变卡片制造层次；\n4. 卡片背后的装饰圆点用模糊色块，加少量 float 动画；\n5. 背景加一个指向右上角的主色 radial-gradient 氛围光；\n6. 主按钮 hover 上浮 1px；全部响应式（860px 断点）。",
    "refined": "生成一个结构完整的分栏 Hero 区块，参数化：\n- title / eyebrow / description / bullets[] / primaryCta / secondaryCta：全部文案；\n- visual：右侧视觉区域（本实现用纯 CSS 示意卡，避免外部图片依赖）；\n- accent：主色，决定眉题、卖点对勾、按钮与氛围光；\n- columnRatio：左右列比例（默认 1.05fr/0.95fr，视觉复杂时可 1fr/1.1fr）；\n- breakpoint：折叠断点（默认 860px，折叠后视觉区移到文字下方）。\n技术要求：标题用 clamp() 随视口缩放；语义化 h1 只有一个；图片类视觉必须显式尺寸防 CLS（这里用纯 CSS 无此问题）。\n验收标准：① 375px 宽无横向滚动、按钮纵向堆叠；② 骨架扫光遵循 prefers-reduced-motion；③ 主色对比度满足 WCAG AA；④ 无外部依赖、无 JS。"
  },
  "knobs": [
    {
      "name": "左右列比例",
      "default": "1.05fr / 0.95fr",
      "effect": "文字说服力 vs 视觉证明的权重。视觉区内容越复杂，右列越该加宽。"
    },
    {
      "name": "折叠断点",
      "default": "860px",
      "effect": "低于该宽度视觉区下沉到文字下方。右列复杂时建议提前到 960px。"
    },
    {
      "name": "主色 accent",
      "default": "#0f766e",
      "effect": "眉题、✓、按钮、氛围光的统一色源，保证首屏色彩一致。"
    },
    {
      "name": "氛围光位置",
      "default": "radial 500px 指向右上角",
      "effect": "暗示视觉焦点位置；视觉区在左时改为左上角。"
    },
    {
      "name": "卖点条数",
      "default": "3",
      "range": "2 – 4",
      "effect": "三条是节奏最稳的；多于 4 条首屏会被清单占满，稀释标题。"
    }
  ],
  "pitfalls": [
    "右侧放真实图片时不设 width/height 会在加载时产生 CLS，首屏 CLS 直接伤害转化。",
    "眉题用全大写时中文字符没有大小写概念，中文场景应改用字距与字重区分。",
    "左右分栏在移动端直接压窄而不折叠，文字会被挤到不可读。",
    "视觉区装饰色块忘记 pointer-events: none，会挡住右侧的交互。",
    "标题里塞两个 h1 会破坏语义——页面标题只能有一个。"
  ],
  "effectTags": [
    "首屏",
    "分栏",
    "落地页",
    "营销"
  ]
};
