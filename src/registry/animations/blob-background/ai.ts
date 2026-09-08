import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "果冻斑块背景",
    "en": "Blob Background",
    "aliases": [
      "色斑背景",
      "液态渐变",
      "有机 blob"
    ],
    "pattern": "Background · Organic Blob",
    "principle": "三个大尺寸纯色圆块叠在同一层上做 52px 高斯模糊 + 1.15 饱和提升，各自 keyframes 缓慢平移旋转的同时用 border-radius 八值语法关键帧往复形变，产生果冻呼吸感；前景内容 z-index 浮于其上。"
  },
  "prompts": {
    "short": "做一个有机色块背景：几个模糊大色斑缓慢游走并像果冻一样形变呼吸，内容浮在上面，纯 CSS。",
    "standard": "用原生 HTML/CSS 实现果冻斑块背景：\n1. 容器层 filter: blur(52px) saturate(1.15) 一次模糊全部色斑；\n2. 色斑 3 个，尺寸 34–44vmax、opacity 0.55，纯色（#5eead4 / #a5b4fc / #fde68a）；\n3. border-radius 用八值语法如 58% 42% 55% 45% / 52% 56% 44% 48%，keyframes 在 0%/50%/100% 间切换两组值产生形变；\n4. 每个 blob 独立周期：18s / 22s / 26s ease-in-out infinite alternate，translate 幅度 ±5–8vw/vh 并带 ±14–24deg 旋转；\n5. 前景内容 position: relative; z-index: 1，色斑层 pointer-events: none。\n不要用 SVG 滤镜或 canvas。",
    "refined": "实现可配置的斑块背景：\n- 模糊半径：默认 52px（36px 边界清晰 – 80px 完全弥散）；\n- 色斑尺寸：默认 34–44vmax；透明度：默认 0.55；\n- 周期：默认 18/22/26s 错开避免同步呼吸；\n- 位移幅度：默认 5–8vw。\n实现约束：blur 加在父容器上而非每个 blob（省三次滤镜计算）；形变动画 border-radius 与 transform 同帧混合，避免分层闪烁；will-change 限定 transform, border-radius；prefers-reduced-motion 下停动画保留静态构图。\n验收标准：① 三斑周期不同步、构图不呆板；② 文字在色斑上对比度可读；③ 移动端不因 52px blur 掉帧（必要时降 vmax 或模糊值）。"
  },
  "knobs": [
    {
      "name": "模糊半径 blur",
      "default": "52px",
      "range": "36 – 80 (px)",
      "effect": "色斑边缘的弥散程度，配合 saturate(1.15) 提亮。"
    },
    {
      "name": "色斑尺寸 size",
      "default": "44 / 38 / 40 vmax",
      "range": "24 – 60 (vmax)",
      "effect": "斑块占屏比例，超大尺寸配合模糊形成氛围光。"
    },
    {
      "name": "游走周期 duration",
      "default": "18s / 22s / 26s ease-in-out alternate",
      "range": "12s – 40s",
      "effect": "各斑块的呼吸节奏，必须错开防止同步运动。"
    },
    {
      "name": "透明度 opacity",
      "default": "0.55",
      "range": "0.3 – 0.8",
      "effect": "色斑浓度，过高会压过前景内容。"
    },
    {
      "name": "形变幅度 border-radius",
      "default": "八值 42%–60% 间往复",
      "range": "±8% – ±15%",
      "effect": "果冻形变的剧烈程度，八值语法控制四角不对称。"
    }
  ],
  "pitfalls": [
    "blur 加在每个 blob 上而不是父容器，三次独立滤镜计算，移动端明显掉帧。",
    "色斑用了渐变背景再叠加模糊，颜色互相污染发灰——纯色 + 模糊混色才干净。",
    "三个斑块周期相同，运动完全同步看起来像一个整体在抖，周期必须错开。",
    "border-radius 形变只写四值语法，对角形变不对称，果冻感大打折扣。",
    "色斑层没设 pointer-events: none 或 z-index 失控，挡住下方按钮点击。",
    "prefers-reduced-motion 下没停用 keyframes，持续游走的模糊色块对敏感用户干扰极强。"
  ],
  "effectTags": [
    "背景",
    "色斑",
    "果冻",
    "hero"
  ]
};
