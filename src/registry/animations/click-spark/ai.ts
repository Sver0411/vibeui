import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "点击火花",
    "en": "Click Spark / Click Burst",
    "aliases": [
      "Click Particles",
      "Spark Burst",
      "点击粒子",
      "迸发效果"
    ],
    "pattern": "Micro-interaction · Pointer Feedback",
    "principle": "监听 pointerdown，在点击坐标放一个定位容器，向四周发射 N 条带旋转角的线段粒子；粒子沿各自角度位移淡出，动画结束后立即从 DOM 移除。"
  },
  "prompts": {
    "short": "实现点击火花：点击页面任意位置，在指针处迸出一圈向外飞散的火花粒子，动画结束后自动清理。",
    "standard": "用原生 JavaScript 实现点击火花效果：\n1. 监听 document 的 pointerdown（不要用 click，保证按压即触发）；\n2. 在点击坐标创建一个 position: fixed 的容器，pointer-events: none；\n3. 循环生成 10 条粒子：每条是一个 2.5×10px 的圆角线段，通过 CSS 变量 --angle（均分 360°，加 ±7° 随机抖动）和 --distance（26–52px 随机）控制方向与距离；\n4. 粒子动画用 keyframes 沿旋转角位移并淡出，时长 550ms，缓动 cubic-bezier(0.22, 1, 0.36, 1)；\n5. 动画结束立即 remove 粒子和容器，不残留任何节点；\n6. 火花颜色带渐变（主色到亮色），禁用 prefers-reduced-motion 下的动画。",
    "refined": "实现一个可复用的点击火花模块，参数化：\n- count：粒子数量（默认 10，8–16 之间更自然）；\n- distanceMin / distanceMax：飞散距离（默认 26–52px）；\n- duration：飞散时长（默认 550ms）；\n- color：火花渐变色（默认主色 → 亮色）；\n- angleJitter：角度抖动幅度（默认 ±7°，让圆环不那么机械）。\n技术要求：pointerdown 触发（触屏可用）；粒子 transform-origin 设为 50% 0，让线段从根部飞出；容器 fixed 定位用 clientX/clientY。\n验收标准：① 连续快速点击 20 次无 DOM 节点残留（MutationObserver 验证）；② 触屏与鼠标都触发；③ 不阻止任何点击事件的默认行为；④ prefers-reduced-motion 下完全不生成粒子。"
  },
  "knobs": [
    {
      "name": "粒子数量 count",
      "default": "10",
      "range": "8 – 16",
      "effect": "火花密度。少于 8 显得稀疏，多于 16 在低端设备上有瞬时压力。"
    },
    {
      "name": "飞散距离",
      "default": "26 – 52px（随机）",
      "effect": "火花最终位置。距离带随机量才像火花，固定距离会形成整齐的圆环。"
    },
    {
      "name": "角度抖动 angleJitter",
      "default": "±7°",
      "effect": "打破 36° 均分的机械感，是「像真的火花」的关键小细节。"
    },
    {
      "name": "时长 duration",
      "default": "550ms",
      "range": "400 – 700ms",
      "effect": "超过 700ms 火花会拖泥带水，短于 400ms 则看不清过程。"
    },
    {
      "name": "触发事件",
      "default": "pointerdown",
      "effect": "用 pointerdown 而非 click：按压即反馈，触屏与鼠标统一。"
    }
  ],
  "pitfalls": [
    "粒子忘记在 animationend 后 remove，连点几十次会积累几百个死节点。",
    "用 click 事件在移动端会有 100ms 级延迟感，pointerdown 才是即时的。",
    "粒子容器不加 pointer-events: none 会挡住下方元素的点击。",
    "所有粒子用同一个角度和距离会形成机械圆环，必须加随机抖动。",
    "不要用 setInterval 或 setTimeout 清理——监听 animationend 才与实际动画同步。"
  ],
  "effectTags": [
    "点击",
    "反馈",
    "粒子",
    "微交互"
  ]
};
