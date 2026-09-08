import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "定价页",
    "en": "Pricing Page",
    "aliases": [
      "套餐页",
      "价格表",
      "订阅方案"
    ],
    "pattern": "Marketing · 定价卡片 + 月付/年付切换",
    "principle": "三档套餐卡片由 auto-fit 网格排布，月付/年付开关（role=switch）切换时从每张卡片的 data-monthly / data-annual 属性实时重算金额；推荐档位用描边+阴影+顶部徽章高亮，FAQ 用原生 details/summary 折叠。"
  },
  "prompts": {
    "short": "做一个三档定价页：月付/年付切换实时重算价格、中间档位高亮推荐、底部 FAQ 手风琴。原生 HTML/CSS/JS 单文件，不要框架。",
    "standard": "用原生 HTML/CSS/JavaScript 实现单文件定价页：\n1. 三张套餐卡放进 repeat(auto-fit, minmax(230px, 1fr)) 网格，推荐档加描边、彩色阴影和顶部居中徽章；\n2. 开关用 button[role=switch]+aria-checked 切换月付/年付，价格从卡片 data-monthly/data-annual 属性读取重算；\n3. FAQ 用原生 details/summary 实现，不要 JS 折叠；\n4. 价格数字用 tabular-nums 防切换时抖动。",
    "refined": "实现定价页：网格 minmax(230px, 1fr) 间距 14px、容器 max-width 880px；开关 42×24、thumb 18px、开启后 thumb 位移 18px；价格字号 34px；高亮档描边 #0f766e 加 44px 扩散阴影。验收标准：① 切换年付后三个价格全部刷新且开关状态对屏幕阅读器可感知；② FAQ 三条互相独立展开；③ 窄屏下三卡自动纵向堆叠无横向滚动。"
  },
  "knobs": [
    {
      "name": "卡片栅格",
      "default": "repeat(auto-fit, minmax(230px, 1fr))",
      "range": "minmax 200 – 300px",
      "effect": "三档卡片的换列时机与最小宽度。"
    },
    {
      "name": "高亮档主色",
      "default": "#0f766e",
      "range": "任意品牌色",
      "effect": "推荐档描边、徽章、CTA 与勾选图标的颜色。"
    },
    {
      "name": "开关尺寸与位移",
      "default": "42×24，thumb 18px 位移 18px",
      "range": "36 – 52px 宽",
      "effect": "月付/年付开关的触控体量与行程。"
    },
    {
      "name": "价格字号",
      "default": "34px / font-weight 800",
      "range": "28 – 44px",
      "effect": "金额的视觉权重，需保持 tabular-nums。"
    },
    {
      "name": "年付价格",
      "default": "由 data-annual 属性提供",
      "range": "月付 × 10 – 11（约省 2 个月）",
      "effect": "切换后重算的金额，改属性即改价格。"
    }
  ],
  "pitfalls": [
    "切换开关只改了按钮样式没重算价格；正确做法是把两档价格都放进 data-* 属性再读值。",
    "自造 div 当开关却不加 role=\"switch\" 和 aria-checked，屏幕阅读器读不出状态。",
    "价格数字不用 tabular-nums，月付/年付切换时金额宽度跳动。",
    "推荐档徽章用负 top 定位，但卡片容器没留 margin/overflow 余量，徽章被裁掉。",
    "FAQ 自己用 JS 控制显隐而不用 details/summary，丢失键盘与无障碍默认行为。"
  ],
  "effectTags": [
    "定价",
    "套餐切换",
    "手风琴",
    "高亮徽章",
    "响应式"
  ]
};
