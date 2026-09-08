import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "文章卡",
    "en": "Article Card",
    "aliases": [
      "博客卡片",
      "内容卡片",
      "post card"
    ],
    "pattern": "Article Card · Editorial Listing",
    "principle": "无图编辑风：顶部 3px 分类色条承担视觉识别，层级靠字号与灰度对比（标题 16 深灰 / 摘要 13 中灰 / 元信息 12 浅灰）；作者用首字字标小方块，避免头像依赖。"
  },
  "prompts": {
    "short": "做一张无图文章卡：顶部分类色条、两行截断标题、两行摘要、作者字标 + 日期 + 阅读时长元信息行，悬停标题变主色。",
    "standard": "用纯 HTML/CSS 实现编辑风文章卡：\n1. 卡片：白底 1px 描边圆角 12px，::before 顶部 3px 分类色条（颜色由 --ac-accent 传入，hover 加宽到 100% 高度的左条可选）；\n2. 标题 16px/650，两行 -webkit-line-clamp 截断，hover 变 --ac-accent（transition color）；\n3. 摘要 13px/1.7 灰色，两行截断；\n4. 元信息行：22px 首字字标圆角方块（分类色系）+ 作者名 + · 分隔的日期与「6 分钟」阅读时长；\n5. 整卡可点：包一层 a 或加 role=link，hover 卡片不位移只让标题变色——编辑风克制处理。",
    "refined": "做成列表渲染函数 renderArticleCard(post)，支持置顶（📌 角标 + 浅底色）、分类色映射表、无障碍发布日期用 <time datetime>；列表页三栏瀑布流时卡片高度一致（摘要统一 3 行 clamp）。验收：① 中英文标题都严格两行；② 键盘聚焦描边完整；③ 分类色可一键换主题。"
  },
  "knobs": [
    {
      "name": "分类色条 accentBar",
      "default": "3px",
      "range": "2px – 5px",
      "effect": "顶部色条高度，分类识别的主要通道。"
    },
    {
      "name": "标题行数 titleLines",
      "default": "2",
      "range": "1 – 3",
      "effect": "line-clamp 行数，列表页建议统一。"
    },
    {
      "name": "字标尺寸 avatarSize",
      "default": "22px",
      "range": "20 – 28px",
      "effect": "作者字标方块大小。"
    }
  ],
  "pitfalls": [
    "标题不截断导致列表高度参差——line-clamp 统一。",
    "分类色条贴边圆角穿帮，父容器要 overflow hidden。",
    "日期不做本地化直接 toISOString，用户看到 UTC 时间。",
    "摘要颜色太浅（#a1a1aa 级）影响可读性，正文灰不低于 #52525b。",
    "整卡可点却让日期/作者也变色，悬停反馈应只作用于标题。"
  ],
  "effectTags": [
    "文章卡",
    "博客",
    "排版"
  ]
};
