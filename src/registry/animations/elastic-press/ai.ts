import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "弹簧按压",
    "en": "Elastic Press / Spring Physics Button",
    "aliases": [
      "Spring Button",
      "物理回弹",
      "弹簧按钮"
    ],
    "pattern": "Micro-interaction · Spring Physics",
    "principle": "按下时把目标 scale 设为 0.88，松开后通过弹簧方程（力 = 刚度 × 位移差）积分更新，叠加阻尼衰减，产生轻微过冲再归位的物理回弹。"
  },
  "prompts": {
    "short": "做一个按钮：按下时缩小，松开后用弹簧物理回弹（带轻微过冲），手感像真的弹簧。原生 JS 实现，不要引入动画库。",
    "standard": "用原生 JavaScript 给按钮实现弹簧按压效果：\n1. pointerdown 时把目标 scale 设为 0.88 并下沉 8px；\n2. pointerup / pointercancel / pointerleave 时目标回到 scale 1、y 0；\n3. 用显式弹簧积分而非 CSS transition：每帧 force = (target - current) × stiffness，velocity += force/mass × dt，velocity ×= 1 - damping×dt，current += velocity；\n4. 参数建议 stiffness 320、damping 18、mass 1，让回弹轻微过冲 1.02 再归位；\n5. rAF 循环在速度低于阈值时停止并归零，避免空转；\n6. 按钮加 will-change: transform、touch-action: manipulation；\n7. prefers-reduced-motion 下不做动画。",
    "refined": "实现一个可配置的弹簧按压 Hook（或工具函数），暴露：\n- stiffness：刚度（默认 320，越高回弹越快越硬）；\n- damping：阻尼（默认 18，调低到 10 过冲明显、调到 28 无过冲）；\n- pressScale：按压缩放（默认 0.88）；\n- pressTranslateY：按压下沉（默认 8px）。\n实现约束：不用 CSS transition，用真弹簧积分（这样过冲是自然的物理结果而不是预设 keyframes）；rAF 收敛后停止；同时支持 pointer 与键盘 Enter/Space 触发（键盘用 focus 状态替代按压）。\n验收标准：① 快速连按不卡顿、不残留 transform；② 松手过冲峰值约 1.02–1.06 后归位；③ 页面失焦后动画自动停止；④ 完整参数化，调用方可以调出「干脆」「软糯」「活泼」三种手感。"
  },
  "knobs": [
    {
      "name": "刚度 stiffness",
      "default": "320",
      "range": "150 – 600",
      "effect": "回弹速度与硬度。越高回弹越快，低于 200 会显得发软。"
    },
    {
      "name": "阻尼 damping",
      "default": "18",
      "range": "10 – 30",
      "effect": "过冲幅度。调低到 12 左右过冲明显、活泼；调到 26 以上几乎无过冲、干脆。"
    },
    {
      "name": "按压缩放 pressScale",
      "default": "0.88",
      "range": "0.8 – 0.95",
      "effect": "按下时的收缩幅度。0.8 非常弹，0.95 只有轻微触感。"
    },
    {
      "name": "按压下沉 pressTranslateY",
      "default": "8px",
      "effect": "按下的纵向位移，强化物理按进感，配合 scale 使用。"
    },
    {
      "name": "质量 mass",
      "default": "1",
      "effect": "惯性感。增大到 2-3 时回弹更绵长，适合大按钮。"
    }
  ],
  "pitfalls": [
    "用 CSS transition 做回弹只能预设 keyframes，做不出自然过冲——弹簧物理的意义就在这一步。",
    "rAF 不收敛就停会在按钮静止后持续空转，必须设置速度阈值并归零。",
    "忘记监听 pointercancel / pointerleave，指针滑出按钮会卡在按下态。",
    "不用 touch-action: manipulation 时，移动端双击会触发 300ms 缩放延迟。",
    "键盘用户按 Enter 没有任何反馈——需要为 :focus-visible 或键盘事件补一套按压态。",
    "prefers-reduced-motion 用户会被弹簧动画骚扰，应直接停用。"
  ],
  "effectTags": [
    "弹簧",
    "按压",
    "物理",
    "按钮"
  ]
};
