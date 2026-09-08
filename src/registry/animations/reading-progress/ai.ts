import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "阅读进度条",
    "en": "Scroll Progress Bar",
    "aliases": [
      "顶部进度条",
      "阅读指示器",
      "reading progress"
    ],
    "pattern": "Scroll Progress · Top Affordance",
    "principle": "scroll 事件里只置一个脏标记，真正的宽度计算放进 rAF 回调（每帧最多一次）；进度 = scrollTop / (scrollHeight - clientHeight)；超过 60% 后切强调色渐变给出「快读完了」的暗示。"
  },
  "prompts": {
    "short": "做一个固定在顶部的阅读进度条：随页面滚动增长，后半程变强调色，rAF 节流保证性能。",
    "standard": "用原生 JS 实现顶部阅读进度条：\n1. 结构：position: fixed; top: 0; left: 0 的一条 3px 轨道，内部填充 div 宽度百分比；\n2. 计算：progress = scrollY / (document.documentElement.scrollHeight - innerHeight)，clamp 到 [0,1]；\n3. 性能：scroll 事件只设 ticking 标记，rAF 回调里写 style.width = progress*100 + '%'，写完清标记——每帧最多一次布局写入；\n4. 后半程：progress > 0.6 时给填充加强调色渐变类（transition background 0.3s）；\n5. 页面加载与 resize 时也要重算一次；\n6. prefers-reduced-motion 下去掉颜色过渡。",
    "refined": "写一个 attachScrollProgress(el, { onProgress })：\n- 支持传入自定义滚动容器（默认 document）；\n- 用 ResizeObserver 监听内容高度变化自动重算，不依赖 resize 事件；\n- 进度值四舍五入到 0.1% 才写 DOM，避免无意义重绘；\n- 组件销毁时移除全部监听；\n验收：① 滚动时 Performance 面板无 layout thrashing；② 快速滚动进度条不掉帧。"
  },
  "knobs": [
    {
      "name": "轨道高度 barHeight",
      "default": "3px",
      "range": "2px – 6px",
      "effect": "越粗存在感越强，3px 最克制。"
    },
    {
      "name": "变色阈值 colorAt",
      "default": "0.6",
      "range": "0.4 – 0.9",
      "effect": "进入强调色渐变的进度点。"
    },
    {
      "name": "颜色过渡 colorEase",
      "default": "300ms",
      "effect": "变色 transition，降低跳变感。"
    }
  ],
  "pitfalls": [
    "scroll 回调里直接写 style.width，高频滚动造成 layout thrashing——必须 rAF 节流。",
    "分母忘记减 clientHeight，进度永远到不了 100%。",
    "进度条盖住顶部导航内容——加 z-index 并确认与 sticky 头部的层叠关系。",
    "文章由接口异步渲染时在 DOMContentLoaded 测高，结果为 0——要监听内容变化重算。",
    "宽度用小数全量写入会触发无意义重绘，量化到 0.1%。"
  ],
  "effectTags": [
    "进度条",
    "滚动",
    "性能"
  ]
};
