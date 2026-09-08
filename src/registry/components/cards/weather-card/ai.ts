import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "天气卡片",
    "en": "Weather Card",
    "aliases": [
      "天气组件",
      "预报卡",
      "CSS 天气场景"
    ],
    "pattern": "CSS Illustration · Ambient Animation",
    "principle": "165deg 三段天空渐变当天幕，太阳（radial-gradient 圆 + 光晕）、云（胶囊 + ::before/::after 圆形叠加）、雨滴（3×11px 圆角条）全由 CSS 绘制，keyframes 分别做呼吸 / 漂移 / 下落循环，JS 只负责渲染逐小时与五日数据。"
  },
  "prompts": {
    "short": "做一张天气卡：渐变天空背景上太阳呼吸、云朵漂移、雨滴落下，下方逐小时条和五日预报列表，全程不用图片。纯 CSS 绘图。",
    "standard": "用原生 HTML/CSS/JavaScript 实现天气卡片（零图片）：\n1. 卡片底 linear-gradient(165deg, #38bdf8, #0ea5e9 55%, #0369a1)，白色文字；\n2. 场景区高 84px：太阳 44px 圆 radial-gradient(#fde68a 30%, #f59e0b) + 黄色光晕，3.2s scale 1→1.08 呼吸；云用 border-radius: 999px 主体 + 两个伪元素圆，7s ease-in-out alternate 漂移 22px；三滴雨 3×11px，1.15s linear infinite 下落 20px 渐隐，delay 0/0.4/0.8s；\n3. 逐小时条用 rgba(255,255,255,0.12) 半透明白底，五日列表行间 1px rgba 白分隔线；\n4. 数据（小时/五日数组）由 JS createElement 渲染，遵守 prefers-reduced-motion 停掉全部场景动画。",
    "refined": "可配置天气卡：卡片宽 340px、圆角 20px、天空渐变 #38bdf8→#0ea5e9→#0369a1 (165deg)、太阳呼吸 3.2s scale 1.08、云漂移 7s ±22px、雨滴周期 1.15s × 3 滴。\n验收：① 首屏无任何 <img>/外链资源；② prefers-reduced-motion 下太阳/云/雨滴静止但排版不变；③ 320px 视口下逐小时条 flex-wrap 不溢出；④ 温度 46px 数字带 tabular-nums 不抖动。"
  },
  "knobs": [
    {
      "name": "天空渐变",
      "default": "165deg, #38bdf8 → #0ea5e9 55% → #0369a1",
      "range": "任意 2–3 段天气色",
      "effect": "整卡氛围：晴暖色 / 雨冷色 / 夜间深色全靠换这组值。"
    },
    {
      "name": "太阳呼吸",
      "default": "3.2s ease-in-out, scale 1 → 1.08",
      "range": "2 – 5s, 1.03 – 1.15",
      "effect": "太阳光晕的节奏感，过快会显得焦躁。"
    },
    {
      "name": "云漂移",
      "default": "7s ease-in-out alternate, translateX 22px",
      "range": "4 – 12s, 10 – 40px",
      "effect": "云的往返行程与速度。"
    },
    {
      "name": "雨滴参数",
      "default": "1.15s linear infinite，3 滴 delay 0/0.4/0.8s，下落 20px",
      "range": "0.8 – 2s，2 – 6 滴",
      "effect": "降雨密度与速度，delay 错开才连续。"
    },
    {
      "name": "卡片宽 / 圆角",
      "default": "min(340px, 100%) / 20px",
      "range": "280 – 400px / 12 – 24px",
      "effect": "整体体量与圆润程度。"
    }
  ],
  "pitfalls": [
    "云朵伪元素忘了 background: inherit，改主题色时云身变白而两个圆还是旧色，散架感。",
    "雨滴只做 opacity 渐隐没有 translateY 位移，看起来像闪烁而不是下雨。",
    "逐小时条 6 项固定 space-between，窄屏被挤压重叠——需要 flex-wrap 或横向滚动。",
    "没有 prefers-reduced-motion 降级，太阳呼吸和雨滴在减动效环境下永不停。",
    "场景元素全是 position:absolute + 固定 top/left，卡片高度一改太阳就压到文字上。",
    "用大图标 emoji 当天气符号时忘了统一字号，不同平台 emoji 基线不齐。"
  ],
  "effectTags": [
    "CSS 绘图",
    "天气",
    "动效场景",
    "渐变",
    "零图片"
  ]
};
