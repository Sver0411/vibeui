import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "聚光卡片",
    "en": "Spotlight Card",
    "aliases": [
      "边框辉光卡",
      "光标跟随卡片",
      "Linear 风格卡片"
    ],
    "pattern": "Spotlight Border · Cursor Tracking",
    "principle": "网格容器上做一次 pointermove 事件委托，把光标坐标写入每张卡的 --spot-x/--spot-y；::before 用 radial-gradient 240px circle 在该点画辉光（hover 才淡入），卡片本体用 1px padding + ::after 内衬白面做出渐变描边三明治。"
  },
  "prompts": {
    "short": "做一组 Linear 风格聚光卡：边框附近有辉光跟随光标移动，一个覆盖层加两个 CSS 变量实现。原生 JS。",
    "standard": "用原生 HTML/CSS/JavaScript 实现聚光卡片：\n1. 卡片 padding: 1px，背景做边框渐变；::after inset: 1px 圆角 13px 铺白色内衬面，内容 z-index 抬到其上——形成 1px 渐变描边；\n2. ::before 用 radial-gradient(240px circle at var(--spot-x) var(--spot-y), rgba(15,118,110,0.24), transparent 65%)，默认 opacity 0，hover 时 0.3s 淡入，pointer-events: none；\n3. JS 在 stage 上单次 pointermove 委托，遍历卡片把 clientX/Y 减 rect 后写入 --spot-x/--spot-y（px 单位）；\n4. 无 JS 时变量回落 50% 50%，光标停在卡片中央。",
    "refined": "可配置聚光卡：辉光 240px circle、辉光色 rgba(15,118,110,0.24) 渐隐 65%、淡入 0.3s、默认坐标 50%/50%、边框渐变角 135deg（跟随系数当前为 0，可调 calc(135deg - var(--spot-x)*系数) 让边框高光也跟随）。\n验收：① 辉光圆心精确压在光标上（多卡同时独立跟随）；② 辉光层不挡文字选择与链接点击；③ 触摸设备无 hover 时不残留辉光；④ 卡片边框 1px 均匀无双边。"
  },
  "knobs": [
    {
      "name": "辉光半径",
      "default": "240px circle",
      "range": "120 – 400px",
      "effect": "光斑范围，过大像泛光、过小像激光点。"
    },
    {
      "name": "辉光颜色 / 渐隐",
      "default": "rgba(15,118,110,0.24)，transparent 65%",
      "range": "任意主色，40% – 80%",
      "effect": "光斑强度与边缘柔度。"
    },
    {
      "name": "淡入时长",
      "default": "0.3s ease",
      "range": "0.1 – 0.5s",
      "effect": "hover 时辉光出现的速度。"
    },
    {
      "name": "边框渐变跟随系数",
      "default": "0deg（角度固定 135deg）",
      "range": "0 – 90deg",
      "effect": "调大后边框渐变角度随光标 x 旋转。"
    },
    {
      "name": "默认坐标",
      "default": "--spot-x/y: 50%",
      "range": "0 – 100%",
      "effect": "无 JS / 未 hover 时光斑的初始落点。"
    }
  ],
  "pitfalls": [
    "::before 忘了 pointer-events: none，光斑层挡住卡片内的链接和文字选择。",
    "pointermove 直接绑在每张卡上而不是容器委托，卡片一多监听器翻倍且移出卡时光斑闪断。",
    "每个 pointermove 里对每张卡调 getBoundingClientRect 不做节流，列表长时掉帧（可改 rAF 或 offsetX）。",
    "坐标单位混用：JS 写 px、radial-gradient 里用 %，光斑与光标错位。",
    "1px padding + ::after inset 1px 的三明治结构上再叠 border 会出现双边框。",
    "触摸设备没有 hover，辉光永不出现也没给 --spot-x 默认值，首次渲染光斑落在 0 0 角落。"
  ],
  "effectTags": [
    "聚光",
    "辉光",
    "光标跟随",
    "边框"
  ]
};
