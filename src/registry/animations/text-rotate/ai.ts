import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "词组轮换",
    "en": "Text Rotate",
    "aliases": [
      "文字轮播",
      "词组切换",
      "rotating words"
    ],
    "pattern": "Text Rotate · Slide Swap",
    "principle": "固定高度裁切容器内叠放所有词组，激活词 translateY(0)、待入词 translateY(110%)、离场词 -110%；切换时交换类名，宽度用测量值内联过渡避免跳动。"
  },
  "prompts": {
    "short": "做一个词组轮换动画：容器固定高度，当前词上滑淡出、下词从下滑入，词宽自适应过渡，悬停暂停。",
    "standard": "用原生 JS 实现词组轮换：\n1. 结构：inline-block 容器（overflow hidden、高度 = 1.2em、vertical-align 对齐）内 span.word 依次排列，默认全部 translateY(110%)，首个 .is-in；\n2. 切换：当前词 .is-in → .is-out（translateY(-110%) + opacity 0），下一词加 .is-in，250ms 后清掉 .is-out；\n3. 宽度：切词前测量下一词 offsetWidth，容器 width 过渡 0.3s——副标题不整行跳动；\n4. 节奏：setInterval 2.2s，hover/focusin 暂停（clearInterval）离开恢复；\n5. prefers-reduced-motion 改为直接淡入淡出。",
    "refined": "封装 RotatingWords(el, words, { interval })：容器内先渲染一个 span，切换时复用节点替换文本（不创建 N 个 span）；宽度动画用 FLIP；文案支持 emoji 与多色词；最后一条切回首条无缝循环。验收：① 长短词切换宽度平滑；② 标签页切回不连跳（visibilitychange 校准）；③ 读屏只播报当前词。"
  },
  "knobs": [
    {
      "name": "轮换间隔 interval",
      "default": "2.2s",
      "range": "1.5 – 4s",
      "effect": "每词停留时间。"
    },
    {
      "name": "滑动距离 slideDist",
      "default": "110%",
      "effect": "出入场位移，100% 刚好一屏高。"
    },
    {
      "name": "宽度过渡 widthEase",
      "default": "300ms",
      "effect": "容器宽度自适应时长。"
    }
  ],
  "pitfalls": [
    "容器没有固定高度，上下词叠加撑高页面。",
    "宽度不测量直接 min-width，短词后有大量空白或长词溢出。",
    "hover 暂停用 toggle interval 但忘记先 clear，出现双倍速。",
    "词组颜色和前后文案同色，轮换词失去了强调意义。",
    "切后台回来 interval 堆积连跳，需 visibilitychange 校准。"
  ],
  "effectTags": [
    "词组轮换",
    "循环",
    "hero"
  ]
};
