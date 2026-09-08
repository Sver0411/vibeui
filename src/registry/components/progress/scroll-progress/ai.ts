import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "滚动进度条",
    "en": "Scroll Progress Bar",
    "aliases": [
      "阅读进度条",
      "阅读进度指示器"
    ],
    "pattern": "Scroll-linked Progress · Reading Progress",
    "principle": "监听滚动容器 scroll 事件，用 scrollTop / (scrollHeight - clientHeight) 算出比例，rAF 节流后写入顶部 sticky 条的宽度。"
  },
  "prompts": {
    "short": "在页面顶部做一个随滚动填充的阅读进度条，rAF 节流，滚回顶部会清零。原生 HTML/CSS/JS。",
    "standard": "用原生 HTML/CSS/JavaScript 实现滚动进度条：\n1. 顶部一条 position: sticky 的 4px 轨道，内部填充 div 宽度 = scrollTop / (scrollHeight - clientHeight) * 100%；\n2. scroll 监听加 { passive: true }，用 ticking 标志 + requestAnimationFrame 节流，每帧最多计算一次；\n3. 进度由滚动位置驱动而非定时器，回滚即倒退，完全确定性；\n4. 纯装饰元素，容器加 aria-hidden=\"true\"，不要重复暴露给屏幕阅读器；\n5. 原生实现，不引入库。",
    "refined": "可配置滚动进度条：条高 4px、填充渐变 linear-gradient(90deg, #0f766e, #14b8a6)、右侧圆角 0 999px 999px 0、sticky top:0 z-index:2，旁边配等宽数字百分比。验收：① 快速滚动 60fps 无卡顿（rAF 节流 + passive）；② 滚到底精确 100%、回顶归 0；③ 内容不足一屏时不出现 NaN，宽度保持 0。"
  },
  "knobs": [
    {
      "name": "条高度",
      "default": "4px",
      "range": "2px – 8px",
      "effect": "进度条的醒目程度。"
    },
    {
      "name": "填充渐变",
      "default": "linear-gradient(90deg, #0f766e, #14b8a6)",
      "range": "纯色或渐变",
      "effect": "进度填充的颜色。"
    },
    {
      "name": "粘性定位",
      "default": "top: 0, z-index: 2",
      "range": "任意偏移/层级",
      "effect": "进度条吸附在滚动容器顶部的位置。"
    },
    {
      "name": "端点圆角",
      "default": "0 999px 999px 0",
      "range": "0 – 999px",
      "effect": "填充前端是圆头还是方头。"
    },
    {
      "name": "节流方式",
      "default": "rAF ticking + passive scroll",
      "range": "rAF / 直接更新",
      "effect": "滚动时更新进度条的频率与性能开销。"
    }
  ],
  "pitfalls": [
    "只监听 window 的 scroll 并用 scrollY / document 高度，放进内部滚动容器（overflow-y: auto）就永远不动——必须监听实际容器。",
    "scroll 事件不加 { passive: true } 也不做 rAF 节流，滚动时每像素都触发布局计算。",
    "内容不足一屏时 scrollHeight - clientHeight 为 0，直接相除得到 NaN 或 Infinity 写进 width。",
    "忘记加 aria-hidden=\"true\"，屏幕阅读器收到一份与滚动位置重复的噪音信息。",
    "把进度条放进 overflow: hidden 的父级，sticky 定位失效直接被卷走。"
  ],
  "effectTags": [
    "进度",
    "滚动",
    "阅读进度",
    "固定顶栏",
    "性能"
  ]
};
