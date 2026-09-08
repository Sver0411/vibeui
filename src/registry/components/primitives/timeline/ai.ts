import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "垂直时间线",
    "en": "Vertical Timeline / Stepper",
    "aliases": [
      "步骤条",
      "进度时间线",
      "timeline"
    ],
    "pattern": "Timeline · Progress Steps",
    "principle": "每项 grid 两列（18px 节点列 + 内容列），连接线画在 ::before 上并用 bottom: -14px 抵消 grid gap 让线段跨项连续，最后一段 display:none 收尾。"
  },
  "prompts": {
    "short": "做一个纯 CSS 垂直时间线：连接线贯通节点、完成态对勾、进行中呼吸光晕，列表语义。",
    "standard": "用纯 CSS 实现垂直时间线（不写 JS、不引库）：\n1. 用 ul/li 列表语义，每项 grid-template-columns: 18px 1fr；\n2. 连接线是每项 ::before：left 对准节点中心（dot/2 - 1px）、宽 2px、top 从节点底部开始、bottom: -14px 正好抵消列表 gap，使相邻项的线段无缝衔接，最后一项 ::before 隐藏；\n3. 完成态：节点实心强调色 + 内嵌白色对勾 SVG，线段同色；\n4. 进行中：节点 box-shadow 0 0 0 4px 强调色光晕，tl-pulse 动画 2.2s 在 4px↔7px 间呼吸。",
    "refined": "参数：节点 18px（紧凑变体 12px）、线宽 2px、强调色 #0f766e、光晕呼吸 2.2s ease-in-out（4px→7px、透明度 0.18→0.1）、卡片 padding 12px 14px、圆角 12px。验收：① 任意内容高度下连接线都连续不断档；② 最后一个节点下方没有多余的线；③ reduced-motion 下呼吸停止但静态光晕保留；④ 紧凑变体节点缩小后线仍对准中心。"
  },
  "knobs": [
    {
      "name": "节点尺寸 --tl-dot",
      "default": "18px（compact 12px）",
      "range": "12px – 24px",
      "effect": "节点与对勾大小，线位置按 dot/2 重算。"
    },
    {
      "name": "连接线延伸",
      "default": "bottom: -14px（等于列表 gap）",
      "range": "与 gap 等值",
      "effect": "线段跨项衔接的关键，改 gap 必须同步。"
    },
    {
      "name": "呼吸光晕",
      "default": "2.2s ease-in-out infinite，4px → 7px",
      "range": "1.5s – 3s",
      "effect": "进行中节点光晕的节奏与幅度。"
    },
    {
      "name": "强调色 --tl-accent",
      "default": "#0f766e",
      "range": "任意色值",
      "effect": "完成态节点、线段与进行中光晕的颜色。"
    }
  ],
  "pitfalls": [
    "连接线 bottom 只画到自身项底部，没延伸 -gap 距离，项与项之间出现断点。",
    "最后一项忘了 :last-child::before { display: none }，末尾垂下一段多余的线。",
    "线用 left: 9px 写死，改 --tl-dot 后线与节点中心错位；应 calc(var(--tl-dot) / 2 - 1px)。",
    "节点没 z-index 或背景，线从节点中间穿过露出来。",
    "呼吸光晕只在 box-shadow 上做动画没问题，但有人顺手把 scale 也加上导致节点抖动。"
  ],
  "effectTags": [
    "时间线",
    "步骤",
    "进度状态",
    "纯 CSS"
  ]
};
