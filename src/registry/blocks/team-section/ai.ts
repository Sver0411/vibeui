import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "团队介绍区块",
    "en": "Team Section / Team Grid",
    "aliases": [
      "成员卡片",
      "团队网格",
      "About 团队"
    ],
    "pattern": "About · Team Grid",
    "principle": "四列成员卡网格，每卡为渐变单字圆形头像 + 姓名 + 职位 + 链接胶囊的居中纵向结构；头像用四组 135deg 双色 linear-gradient 变体区分，hover 时卡片上浮且描边过渡到浅青色。"
  },
  "prompts": {
    "short": "做一个团队介绍区块：大标题 + 说明 + 四列成员卡，头像用渐变底圆形单字，每张卡带姓名、职位和主页/社交链接胶囊，悬停上浮描边变色。纯 HTML/CSS。",
    "standard": "用原生 HTML/CSS 实现团队区块：\n1. 头部居中：13px 大写间距 eyebrow（主色）、clamp(22px, 4.5vw, 32px) 标题、max-width 440px 说明；\n2. 成员网格 repeat(4, 1fr)，gap 14px，容器限宽 min(640px, 88vw)；\n3. 成员卡：白底 1px #e4e4e7 描边、圆角 16px、内容居中；头像 56px 圆形，用 135deg 双色渐变（teal/amber/violet/rose 四组变体）+ 白色单字；\n4. 链接是小号描边胶囊（圆角 999px、11px），带 aria-label（如\"林知遥的主页\"），hover 描边与文字变主色；\n5. 卡片 hover：translateY(-3px) + 描边 #99f6e4 + teal 系阴影；640px 降 2 列；prefers-reduced-motion 下取消上浮。",
    "refined": "实现团队区块，暴露参数：头像 56px 渐变（135deg，四组：#14b8a6→#0f766e、#fbbf24→#d97706、#a78bfa→#7c3aed、#fb7185→#e11d48）、网格 4 列（640px 下 2 列）、卡片圆角 16px、hover 上浮 3px 描边 #99f6e4。验收标准：① 四种头像渐变亮度递进自然、白字对比度达标；② 链接胶囊是 a 标签可聚焦且有 focus-visible 描边；③ 2 列布局下卡片文字不溢出；④ reduced-motion 下仅保留描边 hover 反馈。"
  },
  "knobs": [
    {
      "name": "头像渐变",
      "default": "135deg 双色，四组：teal #14b8a6→#0f766e / amber #fbbf24→#d97706 / violet #a78bfa→#7c3aed / rose #fb7185→#e11d48",
      "range": "任意双色对",
      "effect": "每个成员的识别色，同色系深浅制造立体感。"
    },
    {
      "name": "头像尺寸",
      "default": "56px 圆形，单字 20px",
      "range": "48 – 72px",
      "effect": "成员卡的主视觉大小。"
    },
    {
      "name": "网格列数",
      "default": "4 列（640px 下 2 列）",
      "range": "3 – 5 列",
      "effect": "每行成员数，成员多时建议 4 列起步。"
    },
    {
      "name": "hover 描边色",
      "default": "#99f6e4（teal-200）+ 阴影 rgba(15,118,110,0.1)",
      "range": "主色浅阶",
      "effect": "悬停时卡片描边与投影的品牌色倾向。"
    },
    {
      "name": "链接胶囊",
      "default": "padding 3px 10px、圆角 999px、字号 11px",
      "range": "字号 10 – 13px",
      "effect": "社交链接的大小与醒目程度。"
    }
  ],
  "pitfalls": [
    "头像渐变双色亮度接近，白字单字对比度不足看不清；应选亮→暗的组合保证白色文字可读。",
    "成员姓名长短不一导致职位行错位，卡片内文字未居中或 grid 未拉伸等高。",
    "640px 断点漏写，窄屏 4 列挤压后姓名竖排换行、胶囊溢出卡片。",
    "链接胶囊用 span + click，不可键盘聚焦；必须是 a/button 并配 aria-label 标明归属（如\"林知遥的主页\"）。",
    "hover 阴影用纯黑，浅色页面下显脏；应使用品牌色低透明度阴影。",
    "忘写 prefers-reduced-motion 降级，动效敏感用户卡片一直上下浮。"
  ],
  "effectTags": [
    "团队",
    "成员卡",
    "渐变头像",
    "About",
    "营销"
  ]
};
