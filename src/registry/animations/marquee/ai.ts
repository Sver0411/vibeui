import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "无限跑马灯",
    "en": "Infinite Marquee",
    "aliases": [
      "滚动播报",
      "无缝循环",
      "Logo 墙滚动"
    ],
    "pattern": "Loop · Seamless Marquee",
    "principle": "内容复制一份让轨道宽度翻倍，keyframes 把 track translate3d(-50%) linear infinite，正好走完一组内容的距离实现无缝循环，两侧用 mask-image 渐变做淡入淡出。"
  },
  "prompts": {
    "short": "做一个无缝无限滚动的跑马灯：内容复制一份循环滚动，两侧渐隐遮罩，hover 暂停，纯 CSS。",
    "standard": "用原生 HTML/CSS 实现无限跑马灯：\n1. 轨道 display: flex、width: max-content，内容完整复制一份（副本加 aria-hidden=\"true\"）；\n2. gap 与轨道 padding-right 设同一值（如 44px），保证循环接缝处间距一致；\n3. animation: 22s linear infinite，keyframes 只有 to { transform: translate3d(-50%, 0, 0) }——位移恰为轨道一半；\n4. 容器 overflow: hidden，两侧用 mask-image: linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent) 渐隐；\n5. hover 时 animation-play-state: paused。\n不要用 JS 计算宽度。",
    "refined": "实现可配置的跑马灯：\n- 周期：默认 22s linear（内容越长等比加大，保证线速度恒定）；\n- 间距：默认 gap 44px，且 padding-right 必须等于 gap；\n- 两侧渐隐：默认 12% / 88% 停靠点；\n- 缓动必须 linear，任何 ease 都会让循环点顿挫。\n实现约束：位移用 translate3d 走合成器；副本内容 aria-hidden 避免屏幕朗读重复；prefers-reduced-motion 下停用动画并改为 flex-wrap 换行静态展示、隐藏副本。\n验收标准：① 循环接缝处无跳动；② hover 暂停、移出继续；③ 内容数量增减后无需改 JS 仍无缝。"
  },
  "knobs": [
    {
      "name": "滚动周期 duration",
      "default": "22s",
      "range": "10s – 60s",
      "effect": "一组内容滚完的时间，越长越慢越稳重。"
    },
    {
      "name": "缓动函数 easing",
      "default": "linear",
      "range": "必须 linear",
      "effect": "循环动画只能匀速，其他缓动会在接缝处明显顿挫。"
    },
    {
      "name": "项目间距 gap",
      "default": "44px",
      "range": "16 – 80 (px)",
      "effect": "条目间空隙，必须与轨道 padding-right 一致才能无缝。"
    },
    {
      "name": "两侧渐隐范围",
      "default": "transparent → #000 12% → #000 88% → transparent",
      "range": "5% – 25%",
      "effect": "mask 渐变停靠点，控制条目进出容器边缘的淡出宽度。"
    }
  ],
  "pitfalls": [
    "内容只放一份就 translate -50%，滚到一半出现大段空白——必须复制一整份内容。",
    "gap 与轨道 padding-right 不一致，循环接缝处间距突变产生可见跳动。",
    "动画用了 ease 或 ease-in-out，每轮循环结束点明显减速顿挫，必须 linear。",
    "位移用 translateX(-100%) 而非 -50%，或轨道没用 width: max-content，循环点错位。",
    "两侧没有 mask-image 渐隐，条目生硬地从容器边缘切进切出。",
    "prefers-reduced-motion 下只停动画不管布局，副本内容堆在原地占屏——需改为换行静态布局。"
  ],
  "effectTags": [
    "跑马灯",
    "无限循环",
    "播报",
    "标志墙"
  ]
};
