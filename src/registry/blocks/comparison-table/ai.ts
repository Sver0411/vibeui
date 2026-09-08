import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "方案对比表",
    "en": "Comparison Table",
    "aliases": [
      "功能对比",
      "定价对比",
      "plan comparison"
    ],
    "pattern": "Comparison · Feature Matrix",
    "principle": "table 三列布局，推荐列用负 margin 拉高 + 描边 + 角标突出；功能项用 ✓ / — 图标替代文字，扫读效率最高；窄屏包一层 overflow-x 容器并在右缘加渐隐投影暗示可横滑。"
  },
  "prompts": {
    "short": "做一张三列定价对比表：中间推荐列整列强调带角标，功能行用 ✓ 和 — 图标，窄屏可横向滚动并有渐隐提示。",
    "standard": "用纯 HTML/CSS 实现对比表：\n1. 结构：语义 table > thead（方案名 + 价格 + CTA）> tbody（功能行：功能名 + 各列 ✓/—）；\n2. 推荐列：整列 td/th 加 .is-featured——背景 4% 主色、两侧 1.5px 主色描边；thead 单元格负 margin-top/bottom + z-index 拉高，顶部圆角 + 「最受欢迎」角标；\n3. 图标：✓ 用主色 SVG 对勾，— 用浅灰短横，配 aria-label（\"支持\"/\"不支持\"）给读屏；\n4. 功能行斑马纹（odd 行 2% 灰底）+ 行高 44px；\n5. 窄屏：外层 overflow-x auto，table min-width 640px，右缘 24px 白色渐隐 mask 提示可滑动；\n6. CTA 按钮：推荐列实心主色，其余描边款。",
    "refined": "做成可配置渲染函数 renderComparison(plans, features)：支持功能分组小标题行（colspan 合并）、tooltip 展示功能说明（触发 icon 上悬停）、年度/月度切换时价格数字做滚动动画；导出为图片的按钮可选。验收：① 语义 table 读屏按行列播报；② 推荐列在窄屏滚动时始终可辨；③ 无 JS 也能完整展示。"
  },
  "knobs": [
    {
      "name": "推荐列强调 featured",
      "default": "中间列",
      "effect": "哪列加描边角标与底色。"
    },
    {
      "name": "行高 rowH",
      "default": "44px",
      "range": "36 – 56px",
      "effect": "功能行高度，影响整表密度。"
    },
    {
      "name": "最小宽 minW",
      "default": "640px",
      "range": "560 – 760px",
      "effect": "触发横向滚动的断点。"
    }
  ],
  "pitfalls": [
    "用 div 网格拼表格，读屏行列关系全丢——语义 table 不可省。",
    "推荐列描边只给单元格不加圆角，转角处断裂。",
    "✓/— 只有颜色差异，色弱与读屏都无法判断——必须配 aria-label。",
    "窄屏没做横向滚动提示，用户不知道右边还有内容。",
    "角标文字挤爆窄列，absolute 定位 + 溢出隐藏。"
  ],
  "effectTags": [
    "对比表",
    "定价",
    "落地页"
  ]
};
