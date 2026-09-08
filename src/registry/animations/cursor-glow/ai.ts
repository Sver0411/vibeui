import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "光标辉光",
    "en": "Cursor Glow / Spotlight",
    "aliases": [
      "鼠标聚光",
      "跟随光晕",
      "手电筒效果"
    ],
    "pattern": "Cursor · Spotlight Follow",
    "principle": "pointermove 经 rAF 节流后把指针坐标写入 --cg-x/--cg-y 自定义属性，overlay 层的 radial-gradient(340px circle at …) 消费坐标，光晕随之移动而无需改 DOM。"
  },
  "prompts": {
    "short": "做一个跟随鼠标的柔和光晕：一层径向渐变光斑始终聚在指针位置，坐标走 CSS 自定义属性，rAF 节流。",
    "standard": "用原生 JavaScript + CSS 实现光标辉光：\n1. 容器上盖一层 position: absolute、inset: 0、pointer-events: none 的辉光层；\n2. 辉光层背景 radial-gradient(340px circle at var(--cg-x) var(--cg-y), rgba(20,184,166,0.2), rgba(20,184,166,0.07) 40%, transparent 70%)；\n3. pointermove 里先算相对容器的坐标，用 rAF 节流后再 setProperty 写入 --cg-x/--cg-y（同一帧只排一次）；\n4. 触屏设备用 (hover: none) 媒体查询直接跳过监听；\n5. 不要用 mousemove 直接改 style.top/left，不要引入动画库。",
    "refined": "实现可配置的光标辉光：\n- 光斑半径：默认 340px（200 – 600px）；\n- 中心色强度：默认 rgba(20,184,166,0.2)，70% 处过渡到全透明；\n- 坐标写入：必须 rAF 节流（frame 标志位防重复排队）；\n- 初始位置：默认 50% / 40%，避免加载时光斑闪到角落。\n实现约束：只写 CSS 自定义属性不碰布局属性；辉光层 pointer-events: none 不挡交互。\n验收标准：① 快速划动光晕不滞后不抖动；② pointermove 每帧最多触发一次样式写入；③ 触屏与 hover: none 设备无任何监听开销。"
  },
  "knobs": [
    {
      "name": "光斑半径",
      "default": "340px",
      "range": "200 – 600 (px)",
      "effect": "radial-gradient 的 circle 半径，越大光晕越弥散。"
    },
    {
      "name": "中心色强度",
      "default": "rgba(20, 184, 166, 0.2)",
      "range": "0.08 – 0.35",
      "effect": "光斑最亮处的不透明度，浅色底建议不超过 0.25。"
    },
    {
      "name": "衰减分布",
      "default": "0.07 @ 40% → transparent @ 70%",
      "range": "30% – 80%",
      "effect": "渐变的中间停靠点位置，决定光晕边缘的柔和程度。"
    },
    {
      "name": "初始坐标 --cg-x/--cg-y",
      "default": "50% / 40%",
      "range": "任意百分比或 px",
      "effect": "未移动鼠标前光斑的位置，避免首帧闪跳。"
    }
  ],
  "pitfalls": [
    "在 pointermove 里直接 getBoundingClientRect + 写样式，不走 rAF 节流，高频指针事件引发布局抖动。",
    "径向渐变动画用 @keyframes 改 background 而不是更新自定义属性，每帧全量重绘巨卡。",
    "忘记 pointer-events: none，辉光层挡住底下所有按钮的点击。",
    "触屏设备没判断 (hover: none)，移动端手指滑动出现诡异光斑且白耗监听。",
    "光斑颜色在深色背景沿用低透明度浅色，几乎看不见；深色底需要换混合策略。",
    "坐标没减容器 rect 偏移，容器不在页面左上角时光斑错位。"
  ],
  "effectTags": [
    "光标",
    "辉光",
    "聚光",
    "跟随"
  ]
};
