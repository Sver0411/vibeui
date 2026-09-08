import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "脉冲扩散环",
    "en": "Pulse Ring / Pulsating Dot",
    "aliases": [
      "脉冲点",
      "呼吸扩散",
      "雷达波纹点"
    ],
    "pattern": "Indicator · Pulse Ripple",
    "principle": "状态圆点的 ::before/::after 伪元素继承 background，用 keyframes 同时做 scale 放大与 opacity 淡出，两层伪元素错开 0.66s 延迟形成连绵波纹。"
  },
  "prompts": {
    "short": "做一个直播/在线状态指示点：核心小圆外有两圈交错向外扩散淡出的脉冲环，纯 CSS 实现。",
    "standard": "用原生 HTML/CSS 实现状态点的脉冲扩散：\n1. 圆点本体 14px、border-radius 50%，背景色按状态设置（直播红 #dc2626、录制橙 #ea580c、在线绿 #16a34a）；\n2. ::before 与 ::after 伪元素 inset: 0、background: inherit 继承圆点颜色；\n3. keyframes 从 scale(1) opacity 0.6 到 scale(2.6) opacity 0，时长 2s、缓动 cubic-bezier(0.22, 1, 0.36, 1)、infinite；\n4. ::after 加 0.66s animation-delay 形成两圈交错；\n5. 离线灰色态关闭动画；\n6. 不要用 JS，不要引入动画库。",
    "refined": "实现可配置的脉冲状态点，暴露：\n- 脉冲周期：默认 2s（1.2s 急促 – 3s 平缓）；\n- 扩散倍数：默认 scale(2.6)（2 – 4）；\n- 双环延迟：默认 0.66s（周期 / 3 附近最连绵）；\n- 初始透明度：默认 0.6。\n实现约束：只用 transform + opacity 动画（可合成器加速）；伪元素 background: inherit 使换色零成本。\n验收标准：① 两圈波纹视觉上均匀交错无明显空档；② 离线态完全静止；③ prefers-reduced-motion 下环消失、圆点静态显示。"
  },
  "knobs": [
    {
      "name": "脉冲周期 duration",
      "default": "2s",
      "range": "1.2s – 3s",
      "effect": "波纹扩散节奏。越短越急促，直播态常用 1.6–2s。"
    },
    {
      "name": "缓动函数 easing",
      "default": "cubic-bezier(0.22, 1, 0.36, 1)",
      "range": "ease-out 系列",
      "effect": "扩散是先快后慢还是匀速，ease-out 更像自然涟漪。"
    },
    {
      "name": "扩散倍数 max scale",
      "default": "2.6",
      "range": "2 – 4",
      "effect": "波纹最终半径是圆点的几倍，过大在密集列表里会互相叠压。"
    },
    {
      "name": "双环延迟 delay",
      "default": "0.66s",
      "range": "0.3s – 1s",
      "effect": "::after 相对 ::before 的错峰时间，取周期的 1/3 左右波纹最连贯。"
    },
    {
      "name": "初始透明度 start opacity",
      "default": "0.6",
      "range": "0.3 – 0.9",
      "effect": "波纹出现瞬间的浓度，过高会显得生硬。"
    }
  ],
  "pitfalls": [
    "伪元素忘记写 background: inherit，换状态色时波纹仍是旧颜色或透明。",
    "只动画 opacity 不动画 scale，会变成一闪一闪而不是向外扩散。",
    "用 width/height 动画替代 transform: scale，每帧触发重排，状态点多时明显掉帧。",
    "忘记给离线态关闭动画，灰色点也在脉冲，语义上误导用户。",
    "infinite 动画没配 prefers-reduced-motion 降级，对动效敏感用户不友好。"
  ],
  "effectTags": [
    "脉冲",
    "状态点",
    "扩散",
    "直播"
  ]
};
