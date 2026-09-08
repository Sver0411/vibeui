import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "步骤流程区块",
    "en": "How It Works",
    "aliases": [
      "三步流程",
      "流程说明",
      "steps section"
    ],
    "pattern": "Steps · Numbered Flow",
    "principle": "三列 grid 布局，步骤间用横贯的虚线连接（伪元素画在列间隙）；大号半透明步骤数字压在图标后面制造层次；窄屏切单列后连接线改纵向或隐藏。"
  },
  "prompts": {
    "short": "做一个「如何运作」三步流程区块：大号半透明步骤数字 + 线性图标 + 标题描述，步骤间虚线连接，窄屏纵向排列。",
    "standard": "用纯 HTML/CSS 实现三步流程区块：\n1. 结构：居中标题区（kicker + H2）+ 三列 grid；每列 = 图标位（56px 圆角方块，主色 10% 底）+ 标题 + 描述；\n2. 大号数字：步骤数字（01/02/03）64px、8% 透明度、绝对定位在图标右上方压层；\n3. 连接线：列与列之间用 ::after 画 2px dashed #d4d4d8 横线，绝对定位在图标垂直中心，只在 ≥768px 显示；\n4. 窄屏：单列纵向居中，连接线旋转 90° 或隐藏，列间距 32px；\n5. 整块留白充足：区块上下 padding 72px，标题与内容间距 44px。",
    "refined": "扩展为滚动触发的分步入场：各步骤随 IntersectionObserver 进入视口依次淡入上浮（延迟 120ms 递增）；数字改为滚动计数；支持 2-4 步自适应列数（grid auto-fit）；提供深色主题变量覆盖。验收：① 入场动画一次性触发不重复；② 虚线在任何列数下都精确对齐图标中心；③ 减动效偏好直接静态展示。"
  },
  "knobs": [
    {
      "name": "数字透明度 numAlpha",
      "default": "0.08",
      "range": "0.05 – 0.15",
      "effect": "背景大数字的存在感。"
    },
    {
      "name": "列间距 gap",
      "default": "40px",
      "range": "24 – 64px",
      "effect": "三列间距，连接线随动。"
    },
    {
      "name": "图标底色 iconBg",
      "default": "主色 10%",
      "effect": "图标方块底色浓度。"
    }
  ],
  "pitfalls": [
    "连接线画在整列中间而非图标中心，错位明显——用图标容器定位。",
    "窄屏保留横向虚线，指向凭空——媒体查询里改为纵向或隐藏。",
    "数字压在图标上但层级错乱，数字 z-index 应低于图标。",
    "步骤描述长短不一时三列底边参差——grid 拉伸天然等高，别改 align-items。",
    "kicker 大写字母没用 letter-spacing，显得随意。"
  ],
  "effectTags": [
    "步骤流程",
    "落地页",
    "引导"
  ]
};
