import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "居中 Hero",
    "en": "Centered Hero Section",
    "aliases": [
      "首屏横幅",
      "居中头图",
      "落地页 Hero"
    ],
    "pattern": "Hero · Landing Above the Fold",
    "principle": "min-height: 100vh 的 flex 纵向居中容器，内容按徽章 → 大标题 → 副标题 → 双按钮 → 信任文案的纵向节奏堆叠，背景用单个 radial-gradient 在顶部打一圈品牌色光晕。"
  },
  "prompts": {
    "short": "做一个居中式落地页首屏：顶部胶囊徽章、超大标题、限宽副标题、主/次两个按钮、底部一行小字信任文案，背景顶部有淡淡的径向光晕。纯 HTML/CSS。",
    "standard": "用原生 HTML/CSS 实现居中 Hero：\n1. 容器 min-height: 100vh，flex 纵向居中、text-align: center，背景 radial-gradient(600px 300px at 50% -10%, rgba(15,118,110,0.08), transparent 70%) 叠在 #fafafa 上；\n2. 内容顺序：胶囊徽章（主色 6% 透明底 + 25% 描边）、clamp(34px, 6vw, 52px) 大标题、max-width 560px 副标题、双按钮、12.5px 灰色信任文案；\n3. 主按钮 #0f766e 带同色阴影，hover 上浮 1px 且阴影加深；次按钮白底 1px 描边；\n4. 480px 以下按钮改纵向排列，容器限宽 280px。",
    "refined": "实现居中 Hero，暴露参数：标题 clamp(34px, 6vw, 52px) 行高 1.15、副标题限宽 560px 字号 15.5px、光晕 radial-gradient(600px 300px at 50% -10%) 强度 0.08、主按钮 #0f766e 阴影 rgba(15,118,110,0.3)、按钮区 480px 断点纵排。验收标准：① 各元素间距节奏（22/18/30/22px）与设计一致；② 窄屏按钮纵排但不撑满全屏；③ 大标题在 320px 宽度不溢出不换行错乱。"
  },
  "knobs": [
    {
      "name": "标题字号",
      "default": "clamp(34px, 6vw, 52px)，行高 1.15",
      "range": "32 – 64px",
      "effect": "首屏视觉冲击力，最大值决定桌面端的分量。"
    },
    {
      "name": "顶部光晕",
      "default": "radial-gradient(600px 300px at 50% -10%, rgba(15,118,110,0.08))",
      "range": "透明度 0.04 – 0.16",
      "effect": "背景品牌色氛围强度，过高会干扰正文阅读。"
    },
    {
      "name": "副标题限宽",
      "default": "max-width: 560px",
      "range": "480 – 680px",
      "effect": "副文案的阅读行长，过宽单行文字太长难扫读。"
    },
    {
      "name": "主按钮色",
      "default": "#0f766e，阴影 rgba(15,118,110,0.3)",
      "range": "任意品牌色",
      "effect": "主 CTA 颜色与同色投影，决定首屏行动点。"
    },
    {
      "name": "按钮纵排断点",
      "default": "max-width: 480px，纵排限宽 280px",
      "range": "420 – 560px",
      "effect": "窄屏下双按钮从横排切纵排的阈值。"
    }
  ],
  "pitfalls": [
    "标题用固定 px 不做 clamp，手机上 52px 标题一行只装下两个字或直接溢出。",
    "副标题不限宽，桌面端一行拖到 1200px 宽，行长失控无法阅读。",
    "徽章用 border-radius: 999px 却给了不等的上下 padding，胶囊变枣核形。",
    "按钮 hover 只改阴影不改 transform 或漏写 transition，浮动效果生硬。",
    "min-height: 100vh 在移动浏览器地址栏收展时跳动，需要考虑 100svh 或留出安全边距。",
    "480px 断点按钮纵排后忘了限宽/居中，按钮撑满全屏宽度显得廉价。"
  ],
  "effectTags": [
    "首屏",
    "Hero",
    "落地页",
    "居中布局",
    "营销"
  ]
};
