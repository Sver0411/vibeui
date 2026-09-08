import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "SaaS 营销落地页",
    "en": "SaaS Landing Page",
    "aliases": [
      "Marketing Site",
      "Product Landing Page",
      "Conversion Page",
      "产品首页"
    ],
    "pattern": "Conversion Landing Page · Above the Fold",
    "principle": "首屏用一句话价值主张加单一主行动按钮建立认知，随后用功能区、社会证明、FAQ 逐层消除疑虑，页脚收口兜住长尾流量。"
  },
  "prompts": {
    "short": "做一个 SaaS 产品落地页：吸顶导航、Hero、三个功能卡片、客户 Logo 条、推荐语、FAQ 和页脚，响应式、零依赖。",
    "standard": "用 HTML + CSS + 少量 JavaScript 写一个完整的 SaaS 营销落地页：\n1. 吸顶导航：logo 居左、菜单居中、CTA 按钮居右，滚动后加毛玻璃与细边框，移动端收成汉堡菜单；\n2. Hero：左文右图或居中版式，一句主标题说清「为谁解决什么」，副标题补充差异化，一个主 CTA + 一个次级链接，下方放一行「无需信用卡」之类的风险消除文案；\n3. 功能区：3 列卡片网格，每张含图标、标题、两行说明，图标用单色线性而非彩色插画；\n4. 客户 Logo 条：6–8 个灰度 logo 横排，移动端两行；\n5. 推荐语：1–3 条带头像、姓名、职位的引用；\n6. FAQ：4–6 条可展开的问题，用 details/summary 或少量 JS 实现手风琴；\n7. 页脚：四列链接 + 版权行 + 社交媒体；\n8. 全部响应式（断点 640 / 1024），零第三方依赖，原生 CSS 变量管理配色与间距。",
    "refined": "生成一个结构完整、可交付的 SaaS 落地页，并满足以下约束。\n结构（按顺序）：吸顶导航 → Hero（主标题 / 副标题 / 单一主 CTA / 风险消除文案）→ 社会证明 Logo 条 → 功能区（3 列）→ 产品截图或演示区 → 数据指标条（3–4 个数字）→ 推荐语（2–3 条）→ 定价提示 → FAQ（4–6 条手风琴）→ 尾部 CTA → 页脚。\n设计要求：主色单一且有足够的对比度；标题层级 h1 → h2 → h3 不跳级；所有图片显式指定 width/height 防 CLS；交互元素都有 :focus-visible 样式。\n文案要求：主标题必须具体（说清目标用户与结果），禁止「赋能」「一站式」「极致体验」这类空话；CTA 用动词短语而非「提交」。\n技术要求：语义化标签（header / main / section / footer）、每个 section 带 aria-labelledby、首屏内容不依赖 JS 渲染。\n验收标准：① 移动端 375px 下无横向滚动；② 键盘可完整走通导航与 FAQ；③ 文字对比度达到 WCAG AA；④ 禁用 JS 后页面结构仍完整可读；⑤ 首屏 LCP 元素为文本或已指定尺寸的图片。",
    "byFramework": {
      "react": "用 React + TypeScript + Tailwind 实现 SaaS 落地页，拆成组件：<SiteHeader /> <Hero /> <LogoCloud /> <FeatureGrid /> <Metrics /> <Testimonials /> <Faq /> <Footer />，在 app/page.tsx 中按顺序组合。要求：FAQ 用受控组件实现手风琴；移动端菜单用 useState 控制；所有文案集中在一个 content.ts 里便于替换；图片统一用 next/image 并显式指定尺寸；每个 section 用 semantic 标签并带 aria-labelledby 指向可见标题。"
    }
  },
  "knobs": [
    {
      "name": "首屏版式",
      "default": "居中（文案居中、CTA 居中）",
      "range": "居中 / 左文右图 / 左图右文",
      "effect": "居中版式转化更集中，左右分栏能同时展示产品界面，适合需要视觉证明的产品。"
    },
    {
      "name": "主 CTA 数量",
      "default": "1 个主按钮 + 1 个次级链接",
      "range": "1 – 2",
      "effect": "首屏出现两个同等权重的按钮会分散注意力、降低转化，次级动作必须降级为文字链。"
    },
    {
      "name": "功能区列数",
      "default": "3 列",
      "range": "2 – 4",
      "effect": "3 列是最稳的视觉节奏；4 列在移动端会挤成两行且行高不齐。"
    },
    {
      "name": "社会证明形式",
      "default": "客户 Logo 条 + 推荐语",
      "range": "Logo 条 / 推荐语 / 数据指标 / 组合",
      "effect": "早期产品没有客户 logo 时，用具体数据指标或创始人署名反而更可信。"
    },
    {
      "name": "导航吸顶行为",
      "default": "滚动后出现毛玻璃与边框",
      "range": "始终透明 / 滚动后加背景 / 滚动后隐藏",
      "effect": "吸顶导航保证 CTA 随时可达，透明导航更沉浸但长页面里会丢失行动入口。"
    }
  ],
  "pitfalls": [
    "首屏放两个同等权重的 CTA 会显著降低转化，次级动作应降级为文字链接。",
    "主标题写成「赋能企业数字化转型」这类空话等于没说，必须点名目标用户与具体结果。",
    "客户 logo 不做灰度处理会各自抢夺视觉重心，破坏整页节奏。",
    "移动端导航不做折叠会直接占满首屏，用户看不到价值主张就走了。",
    "图片不指定宽高会导致加载完成时布局跳动，落地页的 CLS 直接伤害转化。",
    "功能区图标用彩色实心插画会和标题文字抢注意力，单色线性图标才是配角该有的样子。",
    "只写 :hover 不写 :focus-visible，键盘用户无法判断焦点在哪，同时也有合规风险。"
  ],
  "effectTags": [
    "落地页",
    "营销",
    "整站",
    "转化"
  ]
};
