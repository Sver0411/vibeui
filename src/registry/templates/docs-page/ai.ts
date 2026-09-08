import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "文档站模板",
    "en": "Documentation Page Template",
    "aliases": [
      "文档站布局",
      "Docs 三栏布局",
      "知识库页面"
    ],
    "pattern": "Docs Layout · 三栏 + Scroll-spy 目录",
    "principle": "190px 站内导航 + 正文卡 + 150px 页内目录三栏网格，两侧 sticky；目录高亮用 IntersectionObserver（rootMargin -12%/-70%）监听标题进入视口上带，标题设 scroll-margin-top 防锚点贴顶，无 IO 环境退化为点击高亮。"
  },
  "prompts": {
    "short": "做一个三栏文档页：左侧站内导航、中间正文（提示框+代码块）、右侧页内目录随滚动高亮当前章节。原生 HTML/CSS/JS 单文件。",
    "standard": "用原生 HTML/CSS/JavaScript 实现单文件文档页：\n1. 三栏网格 190px / minmax(0,1fr) / 150px，两侧 sticky top 30px，800px 以下折单列；\n2. 正文含 h2 章节、左边框提示框、深色代码块；标题写 scroll-margin-top 防锚点贴顶；\n3. 右侧目录链接 data-toc 对应标题 id，用 IntersectionObserver 高亮当前章节（rootMargin \"-12% 0px -70% 0px\"），取文档顺序最靠上的可见标题；\n4. 无 IntersectionObserver 时目录退化为点击高亮兜底。",
    "refined": "实现文档页：三栏 190/1fr/150px 间距 34px、max-width 980px；主题色 #4f46e5，h2 scroll-margin-top 24px；scroll-spy rootMargin -12%/-70%。验收标准：① 点目录锚点后标题上方留白不贴顶；② 正向/反向滚动时高亮始终跟随视口上部章节且不跳变；③ 800px 以下单列且目录变横向标签不占位。"
  },
  "knobs": [
    {
      "name": "三栏宽度",
      "default": "190px / minmax(0, 1fr) / 150px",
      "range": "160 – 240px 侧栏",
      "effect": "导航与目录的占比，正文始终弹性。"
    },
    {
      "name": "scroll-spy 触发带",
      "default": "rootMargin: -12% 0px -70% 0px",
      "range": "上 -5% ~ -20%，下 -60% ~ -80%",
      "effect": "标题进入视口哪个区域才算当前章节，直接决定高亮灵敏度。"
    },
    {
      "name": "锚点留白",
      "default": "scroll-margin-top: 24px",
      "range": "0 – 48px",
      "effect": "点目录跳转后标题与视口顶的距离。"
    },
    {
      "name": "主题色",
      "default": "#4f46e5",
      "range": "任意品牌色",
      "effect": "logo、提示框、目录高亮与代码块配色的基调。"
    },
    {
      "name": "单列断点",
      "default": "800px",
      "range": "700 – 960px",
      "effect": "三栏折单列、目录变横向标签的时机。"
    }
  ],
  "pitfalls": [
    "scroll-spy 用 scroll 事件 + 循环 getBoundingClientRect 计算每个标题，长文滚动卡顿；应改用 IntersectionObserver。",
    "标题不设 scroll-margin-top，点目录锚点后章节标题紧贴视口顶，被 sticky 元素遮住。",
    "rootMargin 设成 0 或全负值，高亮要么滞后半屏要么提前一屏，滚动来回时跳变。",
    "多个标题同时可见时高亮随机切换；应维护可见集合并取文档顺序最靠上的那个。",
    "移动端直接 display:none 掉目录，章节间导航能力消失；应像本模板折叠成横向标签。"
  ],
  "effectTags": [
    "文档站",
    "三栏布局",
    "scroll-spy",
    "锚点导航",
    "sticky 侧栏"
  ]
};
