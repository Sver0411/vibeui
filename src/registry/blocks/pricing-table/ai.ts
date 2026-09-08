import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "定价表",
    "en": "Pricing Table / Pricing Cards",
    "aliases": [
      "价格方案",
      "套餐对比",
      "定价卡片"
    ],
    "pattern": "Pricing · Plan Comparison",
    "principle": "三档卡片用 repeat(3, minmax(0, 280px)) 网格排布；价格数据写在 data-month/data-year 属性上，切换计费周期时 JS 只做文本搬运并用 160ms 淡出淡入掩盖数字跳变；推荐档用双描边（border + 0 0 0 1px box-shadow）与顶部悬浮徽章突出。"
  },
  "prompts": {
    "short": "做一个三档定价区块：月付/年付胶囊切换按钮、推荐档主色描边加\"最受欢迎\"徽章、CSS 对勾/减号功能清单，价格数字切换时有淡入淡出。原生 JS，不要库。",
    "standard": "用原生 HTML/CSS/JS 实现定价表：\n1. 卡片网格 grid-template-columns: repeat(3, minmax(0, 280px))，gap 18px；\n2. 月/年切换是灰底胶囊 group，激活态白底 + 小阴影，按钮带 aria-pressed；价格数值放 data-month/data-year，JS 切换时先加 is-swapping（opacity 0，160ms）再换文本，避免数字跳变；\n3. 推荐档：border 与 box-shadow 0 0 0 1px 双描边同色 #0f766e，徽章 absolute top: -11px 居中悬浮；\n4. 功能清单用伪元素画对勾（border 旋转 -45deg），li.is-off 改画减号并降对比度；\n5. 900px 以下单列堆叠，featured 卡 order: -1 提到最前。",
    "refined": "实现定价表，暴露参数：卡片列 minmax(0, 280px)、强调色 #0f766e（hover 深一档 #0d6a63）、价格字号 38px tabular-nums、数字切换淡入淡出 160ms、徽章 top -11px、堆叠断点 900px（单列 max 320px，featured order: -1）。验收标准：① JS 禁用时页面完整显示月付价格不留空白；② 切换年付后 \"按年计费 ¥948 / 年\" 等说明同步更新；③ 窄屏单列下徽章不被裁切、featured 排第一；④ 未包含项是减号且文字降为 #a1a1aa。"
  },
  "knobs": [
    {
      "name": "强调色 --pr-accent",
      "default": "#0f766e（hover #0d6a63）",
      "range": "任意品牌色",
      "effect": "推荐档描边、徽章、主 CTA 与对勾的统一主色。"
    },
    {
      "name": "数字切换动画",
      "default": "opacity 0 → 换文本，160ms",
      "range": "100 – 250ms",
      "effect": "月/年价格切换的淡出淡入时长，掩盖数字跳变。"
    },
    {
      "name": "卡片列宽",
      "default": "repeat(3, minmax(0, 280px))",
      "range": "260 – 320px",
      "effect": "单卡最大宽度，决定三档并排的整体宽度。"
    },
    {
      "name": "堆叠断点",
      "default": "max-width: 900px 单列（max 320px）",
      "range": "768 – 1024px",
      "effect": "三档改单列的阈值，同时 featured 卡提到最前。"
    },
    {
      "name": "价格字号",
      "default": "38px，font-weight 700，tabular-nums",
      "range": "32 – 48px",
      "effect": "价格数字的视觉权重，tabular-nums 保证切换时宽度稳定。"
    }
  ],
  "pitfalls": [
    "价格硬编码在 JS 里而非 data 属性，脚本加载失败页面价格空白；应把月/年价写进 HTML 的 data-month/data-year。",
    "推荐档只用 border 变色，圆角大时边框内侧出现白缝；要用 border + box-shadow 0 0 0 1px 双层描边。",
    "徽章 absolute top 负值但父容器没留 margin/padding，被相邻元素或容器 overflow 裁掉。",
    "窄屏堆叠时推荐档仍在中间，用户先看到基础版；需 featured 设 order: -1 提前。",
    "切换周期只换数字不换计费说明，年付下仍显示\"随时取消\"造成误读。",
    "价格数字不用 tabular-nums，位数变化（39→299）时布局抖动。",
    "未包含项只做文字变灰，用户分不清；应把对勾伪元素换成减号并降低颜色对比。"
  ],
  "effectTags": [
    "定价",
    "方案对比",
    "计费切换",
    "营销",
    "CTA"
  ]
};
