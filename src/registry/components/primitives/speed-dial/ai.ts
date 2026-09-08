import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "悬浮操作组",
    "en": "Speed Dial / FAB Actions",
    "aliases": [
      "展开式 FAB",
      "浮动菜单",
      "speed dial"
    ],
    "pattern": "FAB · Speed Dial",
    "principle": "FAB 切换 is-open 类：子操作列解除 hidden 并按 --i × 40ms 逐个 stagger 弹入，加号 rotate(45deg) 变关闭；外点与 ESC 收起。"
  },
  "prompts": {
    "short": "做一个 Material 风格 Speed Dial：FAB 点开子操作逐个弹入，加号旋转成关闭，外点/ESC 收起。原生 JS。",
    "standard": "用原生 HTML/CSS/JavaScript 实现 Speed Dial，不要引入库：\n1. 主 FAB 54px 圆钮，子操作 42px 一列 gap 10px 排在其上，默认 hidden；\n2. 展开时移除 hidden 并给子操作 sd-pop 弹入动画，animation-delay: calc(var(--i) * 40ms) 自下而上 stagger；\n3. 加号图标 transition rotate 45° 变关闭，aria-expanded 同步在 FAB 上；\n4. document 监听 pointerdown（不在组件内则收起）与 Escape；子操作点击后经 aria-live 播报并把焦点还给 FAB。",
    "refined": "参数：FAB 54px 底色 #0f766e、子钮 42px、弹入 0.26s cubic-bezier(0.34, 1.56, 0.64, 1)（translateY 10px + scale 0.7 起）、stagger 步长 40ms、加号旋转 0.3s 同款缓动。验收：① 子操作自下而上逐个弹入且过冲自然；② 展开焦点自动落到第一个子钮、关闭归还 FAB；③ 点外部/ESC/选中子项三种路径都能收起；④ 悬停子钮出现左侧气泡标签（attr(data-label)）。"
  },
  "knobs": [
    {
      "name": "stagger 步长",
      "default": "calc(var(--i) * 40ms)",
      "range": "20ms – 80ms",
      "effect": "子操作逐个弹入的间隔，越大波浪感越强。"
    },
    {
      "name": "弹入动画",
      "default": "0.26s cubic-bezier(0.34, 1.56, 0.64, 1)",
      "range": "0.2s – 0.4s",
      "effect": "子钮从 translateY(10px) scale(0.7) 弹出的速度与过冲。"
    },
    {
      "name": "加号旋转",
      "default": "rotate(45deg)，0.3s",
      "range": "45° / 135°",
      "effect": "加号变关闭的旋转角度与速度。"
    },
    {
      "name": "FAB 尺寸",
      "default": "54px（子钮 42px）",
      "range": "48px – 64px",
      "effect": "主按钮点击区域与视觉重量。"
    }
  ],
  "pitfalls": [
    "动画 delay 用在关闭方向上，收起时子钮也要逐个等延迟才消失；收起应直接 hidden。",
    "每次展开动画只播一次，第二次打开没重启动画（需先 hidden 再下一帧解除，或重置 animation）。",
    "忘监听 document 级 pointerdown 只监听组件内，点外部无法收起。",
    "展开后焦点不进子操作、关闭不归还 FAB，键盘用户被丢在原地。",
    "加号旋转用 transform 但 FAB 的 active 态也改 transform，互相覆盖导致按下时旋转丢失。"
  ],
  "effectTags": [
    "FAB",
    "stagger",
    "弹出",
    "操作组"
  ]
};
