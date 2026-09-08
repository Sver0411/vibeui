import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "侧滑抽屉",
    "en": "Side Drawer / Slide-over Panel",
    "aliases": [
      "侧边抽屉",
      "滑出面板",
      "购物车抽屉"
    ],
    "pattern": "Overlay · Slide-in Drawer",
    "principle": "hidden 控制挂载、is-open 类驱动 translateX(±100%)→0 过渡；打开前双 rAF 等待首帧重排保证入场动画，关闭等 transitionend 加 350ms 兜底再卸载。"
  },
  "prompts": {
    "short": "做一个左右双向侧滑抽屉：遮罩淡入、面板缓动滑入，支持 ESC/遮罩关闭，焦点移入抽屉并在关闭后归还。原生 JS 实现。",
    "standard": "用原生 HTML/CSS/JavaScript 实现侧滑抽屉：\n1. 面板 translateX(±100%) 隐藏，is-open 类切到 0，过渡 0.28s cubic-bezier(0.22,1,0.36,1)；遮罩 opacity 0.24s 淡入；\n2. hidden 卸载后双 requestAnimationFrame 再加 is-open 保证入场动画；关闭时等 transitionend（350ms 兜底定时）再置 hidden，避免闪断；\n3. 打开时焦点移入面板第一个可聚焦元素，关闭后 focus 归还触发按钮；\n4. ESC 与 [data-close]（遮罩/关闭钮）均可关闭，左右两个抽屉同时只开一个。不要引入库。",
    "refined": "可配置抽屉：宽 300px（≤480px 收为 min(82vw,300px)）、缓动 cubic-bezier(0.22,1,0.36,1)、面板过渡 0.28s、遮罩 0.24s。验收：① 快速连点触发按钮不出现半开闪烁；② reduced-motion 下瞬现瞬隐且 350ms 兜底生效；③ 关闭后焦点回到触发按钮；④ 打开左抽屉再点右抽屉按钮时前者自动关闭。"
  },
  "knobs": [
    {
      "name": "面板宽度 --dw-width",
      "default": "300px",
      "range": "240 – 420px",
      "effect": "抽屉内容容量，窄屏自动收为 82vw。"
    },
    {
      "name": "滑入缓动",
      "default": "cubic-bezier(0.22, 1, 0.36, 1)",
      "range": "ease-out 系曲线",
      "effect": "滑入的减速感，前段越陡越利落。"
    },
    {
      "name": "面板过渡时长",
      "default": "0.28s",
      "range": "0.2 – 0.45s",
      "effect": "滑入滑出速度，需与关闭兜底定时（350ms）同步。"
    },
    {
      "name": "遮罩透明度",
      "default": "rgba(24, 24, 27, 0.4)",
      "range": "0.2 – 0.6",
      "effect": "底层内容的压暗程度。"
    }
  ],
  "pitfalls": [
    "hidden 切换后立即加 is-open 没等重排，入场动画丢失；需双 rAF 或强制 reflow。",
    "关闭只等 transitionend，reduced-motion 下过渡为 0.01ms 时事件可能不触发，面板永远不 hidden；要加 setTimeout 兜底。",
    "关闭后没把焦点归还触发按钮，键盘用户焦点丢失到 body。",
    "面板常驻 DOM 却没用 hidden 卸载，读屏在关闭态仍能读到抽屉内容。",
    "打开时未锁 body 滚动（示例用绝对定位舞台规避），全页面场景需补 overflow:hidden 或滚动位置补偿。"
  ],
  "effectTags": [
    "抽屉",
    "浮层",
    "遮罩",
    "焦点管理"
  ]
};
