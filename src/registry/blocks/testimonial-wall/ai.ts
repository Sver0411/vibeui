import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "推荐语墙",
    "en": "Testimonial Wall / Masonry Quotes",
    "aliases": [
      "用户评价墙",
      "瀑布流推荐语",
      "口碑墙"
    ],
    "pattern": "Social Proof · Masonry Layout",
    "principle": "用 CSS multi-column（columns: 3）把不同高度的引用卡片按列瀑布流排布，卡片设 break-inside: avoid 防止被截断，头像用 hsl(var(--avatar-hue)) 按色相变量着色。"
  },
  "prompts": {
    "short": "做一个推荐语墙：3 列瀑布流布局，长短评价卡片错落排布，每条带彩色圆形头像 + 姓名 + 身份，悬停时卡片轻微上浮并出现阴影。纯 HTML/CSS 实现，不要用 JS。",
    "standard": "用原生 HTML/CSS 实现推荐语墙：\n1. 外层容器用 columns: 3; column-gap: 18px 做瀑布流，不用 flex/grid 强行等高；\n2. 每条推荐语是 figure > blockquote + figcaption（头像/姓名/身份），设 break-inside: avoid; margin-bottom 与列距一致；\n3. 头像 34px 圆形，背景色用 hsl(var(--avatar-hue) 60% 55%)，每个头像通过内联变量指定色相；\n4. hover 时 translateY(-2px) + 柔和阴影；\n5. 860px 降为 2 列，560px 降为 1 列。",
    "refined": "实现推荐语墙，暴露以下参数：列数 desktop 3 / tablet 2 / mobile 1（断点 860px、560px）、列间距 18px、卡片圆角 14px、卡片内边距 22px、头像尺寸 34px、头像饱和度 60% 亮度 55%、hover 上浮 2px 阴影 0 12px 30px rgba(0,0,0,0.07)。验收标准：① 卡片在任何列都不被垂直截断；② 长短卡片错落而非对齐成行；③ 三档断点下切换列数无横向滚动。"
  },
  "knobs": [
    {
      "name": "列数 columns",
      "default": "3（860px 以下 2，560px 以下 1）",
      "range": "1 – 4",
      "effect": "瀑布流列数，直接影响每行可见卡片密度。"
    },
    {
      "name": "头像色相 --avatar-hue",
      "default": "每卡片内联指定（170 / 260 / 20 / 210 / 90 / 330）",
      "range": "0 – 360",
      "effect": "hsl 色相值，控制每个头像的背景颜色，饱和度固定 60%、亮度 55%。"
    },
    {
      "name": "卡片圆角与内边距",
      "default": "radius 14px / padding 22px",
      "range": "radius 8–20px、padding 16–28px",
      "effect": "卡片的视觉柔软度与呼吸感。"
    },
    {
      "name": "hover 浮起",
      "default": "translateY(-2px) + 0 12px 30px rgba(0,0,0,0.07)，0.22s ease",
      "range": "位移 0–6px，阴影透明度 0.03–0.15",
      "effect": "悬停时卡片上浮幅度与阴影深浅。"
    },
    {
      "name": "大卡片字号 tw-quote--lg",
      "default": "15px（普通卡片 14px）",
      "range": "14 – 18px",
      "effect": "重点推荐语放大突出，形成视觉层级。"
    }
  ],
  "pitfalls": [
    "用 flex/grid 等分行列代替 columns，长卡片会把整行撑高，失去瀑布流错落感。",
    "忘记给卡片设 break-inside: avoid，多列布局下卡片内容会被列边界垂直截断。",
    "列间距和卡片下边距不一致（column-gap 18px 但 margin-bottom 不是 18px），视觉上间距忽大忽小。",
    "头像色相写死成同一颜色，或者用随机数导致每次刷新变色，无法保持品牌一致性。",
    "只写了桌面列数，窄屏下 3 列挤压到每列几十像素宽，文字几乎不可读。",
    "卡片 hover 阴影过硬（如纯黑大阴影），浅色页面下显得脏。"
  ],
  "effectTags": [
    "瀑布流",
    "推荐语",
    "社会证明",
    "卡片",
    "营销"
  ]
};
