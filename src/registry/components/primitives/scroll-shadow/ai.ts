import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "滚动边缘阴影",
    "en": "Scroll Shadow",
    "aliases": [
      "滚动指示",
      "边缘渐隐",
      "scroll indicator"
    ],
    "pattern": "Scroll Shadow · Edge Fade Hint",
    "principle": "容器外层叠两个 fixed 尺寸的渐变遮罩（上白下透明 / 下白上透明），scroll 事件里按 scrollTop 是否大于 0 / 小于最大值切换遮罩 opacity；内容被裁切时阴影出现，暗示「下面还有」。"
  },
  "prompts": {
    "short": "做一个滚动容器：内容未滚到顶/底时对应边缘显示渐隐阴影提示可滚动，滚到位自动淡出。",
    "standard": "用原生 JS 实现滚动边缘阴影：\n1. 结构：.ss-outer（relative）> .ss-top / .ss-bottom（absolute 遮罩，linear-gradient 到页面底色）+ .ss-scroll（overflow-y auto，固定高度）；\n2. 判定：scroll 事件 rAF 节流——top = el.scrollTop > 2；bottom = el.scrollTop < el.scrollHeight - el.clientHeight - 2；\n3. 切换：给对应遮罩加 .is-on（opacity 0→1 过渡 0.2s）；初始状态立即执行一次；\n4. 遮罩要 pointer-events: none，不挡交互；\n5. resize 与内容变化后重算。",
    "refined": "优先用 CSS 原生方案：animation-timeline: scroll() + named scroll-state 驱动遮罩透明度（Chrome 115+），JS 作降级；封装成 <ScrollArea> 组件：自动检测内容变化（ResizeObserver）、四边支持、颜色可配。验收：① 滚动过程无闪烁；② 键盘滚动（方向键）同样触发；③ 触屏惯性滚动表现正常。"
  },
  "knobs": [
    {
      "name": "阴影高度 shadowH",
      "default": "26px",
      "range": "16 – 40px",
      "effect": "渐变遮罩高度。"
    },
    {
      "name": "阈值 threshold",
      "default": "2px",
      "range": "0 – 6px",
      "effect": "判定滚到边的容差。"
    },
    {
      "name": "淡出时长 fadeMs",
      "default": "200ms",
      "range": "120 – 350ms",
      "effect": "遮罩透明度过渡。"
    }
  ],
  "pitfalls": [
    "遮罩没设 pointer-events: none，挡住顶部内容的点击。",
    "scroll 事件直接改 opacity 无节流，滚动掉帧——rAF 一帧一次。",
    "渐变色写死白色，深色主题下露馅——遮罩色应跟随容器背景变量。",
    "内容动态加载后没重算，阴影状态错误。",
    "容器高度由内容决定（不溢出）时阴影永远不出现，属正常但要测。"
  ],
  "effectTags": [
    "滚动",
    "阴影",
    "提示"
  ]
};
