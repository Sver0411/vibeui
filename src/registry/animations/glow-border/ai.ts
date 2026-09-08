import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "辉光描边",
    "en": "Glow Border / Mouse-follow Border",
    "aliases": [
      "发光边框",
      "鼠标辉光描边",
      "Glowing Border"
    ],
    "pattern": "Hover · Mouse-follow Glow",
    "principle": "pointermove 把指针坐标写入 --x/--y，外层卡片的径向渐变背景（220px circle at var(--x) var(--y)）经 1.5px padding 与内层实心卡片叠加后只在边缘透出，形成跟随鼠标的发光描边。"
  },
  "prompts": {
    "short": "做一个鼠标跟随的发光边框：光晕贴着指针在卡片边框流动，双层嵌套实现，原生 JS + CSS 变量。",
    "standard": "用原生 JavaScript + CSS 实现辉光描边：\n1. 外层 .gb-card padding: 1.5px、border-radius 18px，背景 radial-gradient(220px circle at var(--x) var(--y), #8b5cf6, rgba(139,92,246,0.12) 45%, rgba(226,232,240,0.9) 100%)；\n2. 内层 .gb-inner 背景纯白、border-radius: calc(18px - 1.5px)，盖住中间只留边缘透光；\n3. 内层 ::before 叠 200px 同坐标淡辉光（rgba(139,92,246,0.12) → transparent 65%）制造内透感；\n4. pointermove 算相对坐标 setProperty 写入 --x/--y；pointerleave 时写 -999px 把辉光移出视野；\n5. 坐标用 px 单位，两处渐变共享同一组变量。",
    "refined": "实现可配置的辉光描边：\n- 边框厚度：默认 1.5px（外层 padding，1 – 3px）；\n- 辉光半径：默认外层 220px / 内层 200px；\n- 主色：默认 #8b5cf6，边缘过渡到 rgba(226,232,240,0.9)；\n- 离场处理：默认坐标 -999px（而非透明度渐隐）。\n实现约束：内层圆角必须 calc(外层圆角 - padding) 否则边框粗细不均；pointermove 直接写 CSS 变量即可（渐变重绘开销可接受）；prefers-reduced-motion 下改静态线性渐变边框、隐藏内层辉光。\n验收标准：① 光晕贴边框连续移动无跳变；② 离场后边框不留残光；③ 圆角处光带宽度均匀。"
  },
  "knobs": [
    {
      "name": "边框厚度 padding",
      "default": "1.5px",
      "range": "1 – 3 (px)",
      "effect": "外层 padding 即透光宽度，越厚辉光越粗。"
    },
    {
      "name": "辉光半径 glow radius",
      "default": "220px（外层）/ 200px（内层）",
      "range": "120 – 400 (px)",
      "effect": "径向渐变 circle 尺寸，决定光斑沿边框的覆盖范围。"
    },
    {
      "name": "辉光主色 glow color",
      "default": "#8b5cf6",
      "range": "任意颜色",
      "effect": "光斑中心色，边缘自动过渡到浅灰底色。"
    },
    {
      "name": "内透强度 inner glow",
      "default": "rgba(139, 92, 246, 0.12) → transparent 65%",
      "range": "0.06 – 0.25",
      "effect": "卡片内部的淡淡反光，增强光的体积感。"
    },
    {
      "name": "离场坐标 leave position",
      "default": "-999px",
      "range": "任意界外值",
      "effect": "pointerleave 后光斑藏到的位置，避免残光停在边框上。"
    }
  ],
  "pitfalls": [
    "内层圆角直接沿用外层值而没减 padding，边框在圆角处忽粗忽细。",
    "pointerleave 忘记移走坐标，辉光停在最后一次位置，看起来像渲染 bug。",
    "两处渐变（外层边框 + 内层反光）用了不同坐标变量，光斑错位分裂。",
    "坐标以百分比写入但渐变 circle 需要 px 语义，光斑半径随容器尺寸不可控。",
    "把整个渐变做成 ::after 动画移动而不是改 CSS 变量，每帧全量重绘背景反而更慢。",
    "深色内层配浅灰过渡色，边框辉光几乎不可见——浅色边框方案只适合浅底。"
  ],
  "effectTags": [
    "辉光",
    "边框",
    "鼠标跟随",
    "hover"
  ]
};
