import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "极光背景",
    "en": "Aurora Background",
    "aliases": [
      "Mesh Gradient",
      "Gradient Blur Blob",
      "Ambient Background",
      "流光背景",
      "弥散光背景"
    ],
    "pattern": "Ambient Motion · Layered Blur",
    "principle": "多个大尺寸径向渐变色块以不同速率、不同方向缓慢漂移，外层统一施加大半径模糊与饱和度提升，叠加后混合出连续流动的极光感。"
  },
  "prompts": {
    "short": "做一个浅色页面背景：几个低饱和、缓慢漂移的大色块，强模糊后混合成柔和极光，纯 CSS，不要 canvas。",
    "standard": "用 HTML + CSS 实现浅色极光背景：\n1. 外层容器 position: relative、overflow: hidden、背景 #fafafa；\n2. 内部一个 .aurora 层 position: absolute、inset: -30%（留出漂移余量），filter: blur(70px) saturate(1.25)，opacity: 0.55；\n3. 放 3 个色块，都是 border-radius: 50% 的径向渐变，颜色分别为低透明青绿、靛蓝与粉色，尺寸 46/40/34 vmax，位置错开；\n4. 每个色块只通过 transform 跑独立漂移动画，时长分别 24s / 30s / 36s，ease-in-out、infinite、alternate；\n5. 色块加 will-change: transform，极光层 pointer-events: none；\n6. 内容层 position: relative，标题使用 #18181b、正文使用 #52525b，保证 AA 对比度；\n7. prefers-reduced-motion 下停掉漂移动画但保留静态渐变。",
    "refined": "实现一个参数化的浅色极光背景，把这些维度做成 CSS 变量：\n- --au-blur：模糊半径（默认 70px，40px 更清晰、110px 更弥散）；\n- --au-saturate：饱和度（默认 1.2，避免浅色底显脏）；\n- --au-blob-count：色块数量（默认 3，性能上限 5）；\n- --au-duration：漂移周期基准（默认 24s，三个色块按 1 / 1.25 / 1.5 倍错开）；\n- --au-colors：青绿 / 靛蓝 / 粉，每块最高透明度控制在 0.22–0.32；\n- --au-opacity：整体浓度（默认 0.55，可调 0.3–0.65）。\n技术要求：只动 transform 与 opacity，绝不动画 background-position 或 filter；容器 inset 必须为负；极光层 pointer-events: none 且位于内容之下。\n验收标准：① 滚动与输入无卡顿；② 深色正文在浅色底上达到 AA；③减少动态时停止动画但保留静态渐变；④ 320px 宽不露出色块边缘；⑤ 不影响前景点击。",
    "byFramework": {
      "react": "用 React + Tailwind 实现 <AuroraBackground>{children}</AuroraBackground>。外层 relative、overflow-hidden、bg-[#fafafa]；内部绝对定位极光层使用 inset-[-30%]、blur-[70px]、saturate-125、opacity-55、pointer-events-none，三个低透明 rounded-full 色块仅用 translate + scale 漂移（24s/30s/36s）。children 用 relative z-10 包裹。颜色、浓度与时长通过类型化 props 映射到 CSS 变量；reduced-motion 下停用动画。"
    }
  },
  "knobs": [
    {
      "name": "模糊半径 --au-blur",
      "default": "70px",
      "range": "40px – 110px",
      "effect": "色块的弥散程度。低于 40px 能看出圆形轮廓，高于 110px 会糊成一片纯色。"
    },
    {
      "name": "漂移周期 --au-duration",
      "default": "24s（三块按 1 / 1.25 / 1.5 倍错开）",
      "range": "16s – 45s",
      "effect": "流动的速度感。三个色块周期必须互质错开，否则会同步呼吸、显得机械。"
    },
    {
      "name": "色块数量",
      "default": "3",
      "range": "2 – 5",
      "effect": "层次丰富度。超过 5 个大模糊层会明显掉帧，尤其在集成显卡上。"
    },
    {
      "name": "饱和度 --au-saturate",
      "default": "1.25",
      "range": "1.0 – 1.5",
      "effect": "颜色浓度。超过 1.5 会变得艳俗，大面积极光建议保守取值。"
    },
    {
      "name": "整体浓度 --au-opacity",
      "default": "0.55",
      "range": "0.3 – 0.65",
      "effect": "极光的存在感。浅色背景应保持低浓度，避免降低正文对比度。"
    },
    {
      "name": "容器 inset",
      "default": "-30%",
      "effect": "负 inset 让色块漂移时不会在边缘露出直线切口，是这类效果的必要条件。"
    }
  ],
  "pitfalls": [
    "动画 background-position 或 filter 会让每一帧都重新光栅化，必然掉帧——只动 transform 与 opacity。",
    "忘记给容器加 overflow: hidden，色块模糊后会溢出页面、产生横向滚动条。",
    "容器 inset 不用负值，色块漂移到边缘时会露出方形直角或 abrupt 的边界线。",
    "色块周期设置成相同或整数倍，三个颜色会同步呼吸，看起来像一次性淡入淡出而非极光。",
    "极光层没加 pointer-events: none 且层级压在内容之上，会让所有按钮点不动。",
    "浅色背景上的色块透明度或饱和度过高会显脏，并明显降低正文对比度。",
    "大模糊层在移动端 GPU 上开销极高，应按视口宽度降级（如移动端减到 2 个色块）。"
  ],
  "effectTags": [
    "背景",
    "氛围",
    "渐变",
    "漂移"
  ]
};
