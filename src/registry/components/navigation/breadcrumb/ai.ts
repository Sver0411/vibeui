import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "面包屑",
    "en": "Breadcrumb",
    "aliases": [
      "路径导航",
      "层级导航",
      "面包屑导航"
    ],
    "pattern": "Breadcrumb · Hierarchical Path",
    "principle": "ol>li 语义列表，:not(:last-child)::after 用 5px 的旋转 45° 边框方块画出箭头分隔符，全程纯 CSS 无 JS；药丸变体把伪元素换成 content:'/'，超长标签用 text-overflow 单行截断。"
  },
  "prompts": {
    "short": "做一个面包屑导航：CSS 画箭头分隔符、支持省略号折叠中间层级和超长标签截断。纯 HTML/CSS，无 JS。",
    "standard": "用纯 HTML/CSS 实现面包屑（不写任何 JS）：\n1. nav[aria-label] + ol>li 语义结构，当前页用 span + aria-current=\"page\" 加粗而非假链接；\n2. 分隔符：.bc-item:not(:last-child)::after 画 5×5px 边框方块 rotate(45deg) 成箭头，不引入图标库；\n3. 深层折叠：中间层级 li[aria-hidden] 放省略号 span，两端路径照常可点；\n4. 超长标签：链接 min-width:0 + max-width:100% + overflow hidden + text-overflow ellipsis 单行截断。",
    "refined": "可配置面包屑：箭头 5px/1.5px 边框、分隔间距 margin-inline 4px 8px、字号 13px（≤480px 12.5px）、药丸容器圆角 999px、截断容器宽 min(100%, 300px)。验收：① 无任何 JS 分隔符仍与文本行高中线对齐；② 省略号项 aria-hidden 不可聚焦、读屏不读出；③ 超长标签截断显示…且不撑破容器；④ hover 有 rgba(24,24,27,0.05) 底色反馈。"
  },
  "knobs": [
    {
      "name": "箭头分隔符尺寸",
      "default": "5px / 1.5px 边框",
      "range": "4 – 7px / 1 – 2px",
      "effect": "分隔符的粗细与视觉重量。"
    },
    {
      "name": "分隔间距",
      "default": "margin-inline 4px 8px",
      "range": "2 – 10px",
      "effect": "层级之间的呼吸感。"
    },
    {
      "name": "字号",
      "default": "13px（480px 以下 12.5px）",
      "range": "12 – 15px",
      "effect": "整体密度与换行行为。"
    },
    {
      "name": "药丸容器",
      "default": "padding 5px 6px / 圆角 999px",
      "range": "自定义",
      "effect": "深色或图片背景上的可读性容器，分隔符同步换为 \"/\"。"
    },
    {
      "name": "截断容器宽度",
      "default": "min(100%, 300px)",
      "range": "200 – 480px",
      "effect": "触发省略号截断的阈值。"
    }
  ],
  "pitfalls": [
    "分隔符字符（> 或 /）直接写进 HTML，读屏会读出额外文本；应用 ::after 伪元素绘制。",
    "当前页也渲染成 <a href=\"#\">，指向自身的假链接干扰键盘导航；当前页应为 span + aria-current=\"page\"。",
    "flex 子项没设 min-width:0，text-overflow ellipsis 失效，长标签直接撑破布局。",
    "省略号折叠层级没标 aria-hidden，读屏用户仍会听到无意义的「…」。",
    "箭头 rotate(45deg) 后没配合 inline-flex align-items center，分隔符垂直方向偏离行高中线。"
  ],
  "effectTags": [
    "面包屑",
    "路径导航",
    "纯 CSS",
    "截断"
  ]
};
