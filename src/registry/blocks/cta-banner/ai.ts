import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "CTA 横幅",
    "en": "CTA Banner / Call-to-Action Section",
    "aliases": [
      "行动号召横幅",
      "转化横幅",
      "注册横幅"
    ],
    "pattern": "CTA Section · Gradient Banner",
    "principle": "实心版用 120deg 三色渐变打底，独立 ct-bg 层（inset: -30%）叠两层 radial-gradient 光斑并以 14s alternate 动画缓慢漂移制造纵深；浅色变体改为白底描边、flex 两端对齐的横向布局。"
  },
  "prompts": {
    "short": "做一个深色渐变 CTA 横幅：teal 到靛蓝的渐变底上有两个缓慢漂移的光斑，居中标题 + 副文案 + 白色主按钮/描边幽灵按钮 + 小字信任文案。纯 CSS 动画，不要 JS。",
    "standard": "用原生 HTML/CSS 实现两种 CTA 横幅：\n1. 实心版：容器圆角 18px，背景 linear-gradient(120deg, #0f766e 0%, #115e59 45%, #3730a3 100%)，isolation: isolate；光斑层 position: absolute; inset: -30%; z-index: -1，两层 radial-gradient（teal 0.55 / indigo 0.5），animation 14s ease-in-out infinite alternate 漂移 translate3d(-3%,-2%)→(4%,3%) scale 1.08；\n2. 标题 max-width 20ch + text-wrap: balance，副文案限宽 44ch；\n3. 主按钮用实色白底深色字（保证在光斑上对比度），幽灵按钮白 45% 描边 + 8% 白底；\n4. 浅色变体 ct-banner--soft：白底 1px 描边，flex space-between 横排文字与按钮；\n5. 600px 以下缩小内边距、浅色版改纵排、按钮 flex: 1 撑满；加 prefers-reduced-motion 关漂移。",
    "refined": "实现 CTA 横幅双变体，暴露参数：渐变三色 #0f766e/#115e59/#3730a3、光斑漂移 14s alternate scale 1.08、容器圆角 18px、按钮圆角 10px、浅色版断点 600px。验收标准：① 光斑漂移不超出圆角（overflow: hidden + inset 负值缓冲）；② 白色主按钮在光斑最亮处对比度仍达标；③ reduced-motion 下光斑静止、按钮 hover 无位移；④ 600px 以下浅色版按钮组左对齐且两个按钮等宽填充。"
  },
  "knobs": [
    {
      "name": "渐变底色",
      "default": "linear-gradient(120deg, #0f766e, #115e59 45%, #3730a3)",
      "range": "品牌双色 – 三色渐变",
      "effect": "横幅整体色调，青绿→靛蓝营造科技感。"
    },
    {
      "name": "光斑漂移",
      "default": "14s ease-in-out infinite alternate，位移 ±3–4%、scale 1.08",
      "range": "周期 8–24s、scale 1.03–1.15",
      "effect": "背景纵深的运动感，过快会喧宾夺主。"
    },
    {
      "name": "强调色 --ct-accent",
      "default": "#0f766e（hover #0d6a63）",
      "range": "任意品牌色",
      "effect": "浅色版实心按钮、链接色与 focus 描边。"
    },
    {
      "name": "容器圆角 --ct-radius",
      "default": "18px",
      "range": "12 – 28px",
      "effect": "横幅圆角，与页面卡片体系保持一致。"
    },
    {
      "name": "响应式断点",
      "default": "max-width: 600px 缩 padding 并纵排",
      "range": "520 – 720px",
      "effect": "窄屏下浅色版文字与按钮从横排改纵排。"
    }
  ],
  "pitfalls": [
    "光斑层不设 z-index: -1 或父容器忘加 isolation: isolate，光斑盖住文字或渗到页面背景上。",
    "光斑层用 inset: 0，动画位移时边缘露出底色缝；要用 inset: -30% 留出漂移余量。",
    "主按钮在渐变上用半透明白，光斑漂到按钮下方时对比度忽高忽低；应用实色白。",
    "容器漏写 overflow: hidden，光斑溢出圆角外形成色块。",
    "浅色变体直接复用居中排版，没改成 flex space-between 横排，页面中段显得臃肿。",
    "600px 以下按钮组没做 flex: 1 填充，两个小按钮挤在左上角，点击区域过小。",
    "光斑动画没配 prefers-reduced-motion 降级。"
  ],
  "effectTags": [
    "CTA",
    "渐变",
    "光斑",
    "行动号召",
    "转化"
  ]
};
