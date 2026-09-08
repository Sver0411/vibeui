import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "滚动监听导航",
    "en": "Scroll Spy Nav",
    "aliases": [
      "锚点高亮",
      "文章目录",
      "scrollspy"
    ],
    "pattern": "Scroll Spy · Section Affordance",
    "principle": "IntersectionObserver 监听各小节，取最靠近视口顶部的可见节为当前节，同步高亮左导航对应项；点击锚点用 scrollIntoView smooth，且目标设 scroll-margin-top 防被粘性头部遮挡。"
  },
  "prompts": {
    "short": "做一个文档页滚动监听导航：左侧锚点列表随滚动自动高亮当前小节，点击平滑跳转，激活项有主色指示条。",
    "standard": "用原生 JS 实现滚动监听导航：\n1. 结构：左栏 nav（sticky top）锚点列表 + 右栏多个 section[id]；\n2. 高亮：IntersectionObserver rootMargin \"-20% 0px -70%\" 观察各节，记录可见集合，取第一个可见节为当前，给对应导航项加 .is-active（文字变主色 + 左侧 2px 指示条通过 border-left 变色实现）；\n3. 点击：preventDefault + scrollIntoView({behavior:'smooth'})，section 设 scroll-margin-top: 80px；\n4. 立即高亮：点击后先手动高亮目标项，滚动结束后 observer 会校正；\n5. 滚动到页尾时最后一节常常够不到触发线——监听到接近底部时强制高亮最后一项。",
    "refined": "增强：导航指示条用 absolute 滑块实现（跟随激活项平滑位移而非跳变）；小节标题变化时更新 document.title hash；滚动反向时校正阈值；支持嵌套两级目录缩进。验收：① 快速滚动高亮不闪烁；② 刷新带 hash 直达并正确高亮；③ 移动端导航折叠为顶部横向胶囊。"
  },
  "knobs": [
    {
      "name": "观察余量 rootMargin",
      "default": "-20%/-70%",
      "effect": "决定「当前节」的判定线位置。"
    },
    {
      "name": "粘性偏移 stickyTop",
      "default": "24px",
      "range": "16 – 64px",
      "effect": "导航吸顶距离。"
    },
    {
      "name": "跳转对齐 scrollMargin",
      "default": "80px",
      "range": "40 – 120px",
      "effect": "锚点跳转后与页头的留白。"
    }
  ],
  "pitfalls": [
    "scroll 事件里 getBoundingClientRect 逐节测量，长文性能差——用 IntersectionObserver。",
    "高亮判定线在视口顶部，最后一节永远触发不了——接近底部强制高亮末项。",
    "锚点跳转被 sticky 头部盖住标题——scroll-margin-top 必配。",
    "点击后立即被 observer 的旧回调覆盖高亮——点击时锁定或先更新集合。",
    "hash 更新用 location.hash 会触发原生跳转，用 history.replaceState。"
  ],
  "effectTags": [
    "滚动监听",
    "锚点",
    "导航"
  ]
};
