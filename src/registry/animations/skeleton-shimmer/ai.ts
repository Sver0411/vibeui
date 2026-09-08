import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "骨架屏微光",
    "en": "Skeleton Shimmer",
    "aliases": [
      "扫光",
      "流光加载",
      "shimmer effect"
    ],
    "pattern": "Shimmer · Highlight Sweep",
    "principle": "灰底块上叠一层 120% 宽的高光条（transparent→white 45%→transparent），用 background-position 或 transform translateX 从 -100% 扫到 200%；1.4s 循环加随机延迟避免整齐划一。"
  },
  "prompts": {
    "short": "做一个骨架屏微光效果：头像/标题/段落灰块上有一道高光循环扫过，各块相位错开，纯 CSS。",
    "standard": "用纯 CSS 实现骨架微光：\n1. 骨架块：圆角灰块 background #e9e9ec（骨架基色）；\n2. 微光：叠加 linear-gradient(100deg, transparent 20%, rgba(255,255,255,.75) 50%, transparent 80%)，background-size 200% 100%，animation 把 background-position 从 -100% 扫到 200%，1.4s ease-in-out infinite；\n3. 或伪元素方案：::after 白色斜条 + translateX(-100%→250%)，性能更好（合成层）；\n4. 相位：不同块 animation-delay 0 / -0.3s / -0.7s 负值错开，避免整齐闪烁；\n5. 数据到位后整块 opacity 过渡 0.3s 再移除骨架。",
    "refined": "做成 SkeletonGroup 工具：传入结构描述（头像/两行文本/按钮位）自动渲染骨架；数据到达后按块顺序交叉淡入真实内容（stagger 80ms）；暗色主题骨架基色 #2a2a30、高光 rgba(255,255,255,.06)； prefers-reduced-motion 静态灰块。验收：① 30 个骨架块同时 shimmer 不掉帧；② 替换真实内容时无布局跳动（骨架尺寸=内容尺寸）。"
  },
  "knobs": [
    {
      "name": "微光透明度 shimmerAlpha",
      "default": "0.75",
      "range": "0.4 – 0.9",
      "effect": "高光亮度，过高刺眼。"
    },
    {
      "name": "周期 shimmerMs",
      "default": "1400ms",
      "range": "1000 – 2200ms",
      "effect": "扫过一轮的时间。"
    },
    {
      "name": "相位差 phaseStep",
      "default": "0.3s",
      "range": "0.15 – 0.6s",
      "effect": "相邻块延迟差，负值立即错开。"
    }
  ],
  "pitfalls": [
    "所有块同一相位，微光整齐划一像仪表盘故障——负延迟错开。",
    "微光用 opacity 闪烁代替扫过，效果廉价。",
    "background-position 动画触发重绘，大列表用伪元素 translateX 合成层方案。",
    "骨架尺寸和真实内容不一致，数据到达后页面跳一下。",
    "浅灰微光在浅灰底上几乎看不见，高光透明度要够。"
  ],
  "effectTags": [
    "骨架屏",
    "微光",
    "加载"
  ]
};
