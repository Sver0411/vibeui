import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "页脚区块",
    "en": "Footer Section / Minimal Footer",
    "aliases": [
      "站点页脚",
      "底部导航",
      "版权栏页脚"
    ],
    "pattern": "Footer · Site Navigation",
    "principle": "圆角卡片式页脚：grid 1.2fr/2fr 分为品牌列（logo + 简介 + 28px 方形社交图标）与三列链接导航，下方 border-top 分隔的版权底栏 flex 两端对齐；深色变体只覆盖颜色变量不改结构，560px 以下主区改单列、链接列降两列。"
  },
  "prompts": {
    "short": "做一个站点页脚：圆角卡片式，左侧品牌区（logo、简介、社交图标），右侧三列链接导航，底部版权栏带隐私/条款小链接，附深色变体。纯 HTML/CSS。",
    "standard": "用原生 HTML/CSS 实现页脚区块：\n1. 容器宽 min(640px, 88vw)，白底 1px #e4e4e7 描边、圆角 18px、overflow: hidden；\n2. 主区 grid-template-columns: 1.2fr 2fr，gap 28px：品牌列为 logo + 12px 简介 + 三个 28×28px 方形社交图标（描边圆角 8px，aria-label 标明平台）；链接区 repeat(3, 1fr) 三列，每列 12px 加粗标题 + 竖排 12px 灰链接；\n3. 底栏 border-top 1px 分隔，flex space-between 放版权与 11px 小链接；\n4. 深色变体 .fw--dark 只覆盖颜色（底 #18181b、描边 #27272a、hover 链接 #5eead4），结构与浅色版完全一致；\n5. 560px 以下主区单列、链接列改 2 列。",
    "refined": "实现页脚区块，暴露参数：容器 min(640px, 88vw)、主区列比 1.2fr/2fr、内边距 26px、圆角 18px、社交图标 28px、断点 560px（单列 + 链接 2 列）。验收标准：① 链接列用 nav + aria-label 标注\"页脚导航\"；② 深浅两版结构类名完全复用，仅色值覆盖；③ 560px 下三列链接不挤成一条线，底栏文字不换行溢出；④ 所有链接有 focus-visible 描边。"
  },
  "knobs": [
    {
      "name": "主区列比",
      "default": "grid-template-columns: 1.2fr 2fr",
      "range": "1fr/1fr – 1fr/3fr",
      "effect": "品牌列与链接区的宽度分配。"
    },
    {
      "name": "链接列数",
      "default": "repeat(3, 1fr)（560px 下 2 列）",
      "range": "2 – 4 列",
      "effect": "导航分组数量，决定页脚信息容量。"
    },
    {
      "name": "深色版底色",
      "default": "#18181b，描边 #27272a，hover 链接 #5eead4",
      "range": "zinc-900 系",
      "effect": "深色变体的整体色阶，hover 用 teal-300 提亮。"
    },
    {
      "name": "社交图标",
      "default": "28×28px、圆角 8px、描边 #e4e4e7",
      "range": "24 – 36px",
      "effect": "社交入口的点击区域与醒目度。"
    },
    {
      "name": "容器圆角",
      "default": "18px，overflow: hidden",
      "range": "12 – 24px",
      "effect": "卡片式页脚的圆角，overflow hidden 保证底栏分隔线不顶角。"
    }
  ],
  "pitfalls": [
    "圆角容器漏写 overflow: hidden，底栏 border-top 顶到圆角外形成直角破绽。",
    "560px 断点只把主区改单列、忘了链接列降 2 列，三列挤在手机上每列不到 80px 宽。",
    "深色变体单独写一套 HTML 结构，后续改版两处不同步；应复用结构类名只覆盖颜色。",
    "底栏 flex space-between 在内容过长时换行错位，窄屏需允许 wrap 或缩短文案。",
    "社交图标只有字母缩写没有 aria-label，屏幕阅读器读出无意义的\"Gh\"。",
    "链接 hover 只变色不加过渡，或深色版仍用浅色版 hover 色，深底上对比度不足。"
  ],
  "effectTags": [
    "页脚",
    "导航",
    "版权栏",
    "深色变体",
    "站点结构"
  ]
};
