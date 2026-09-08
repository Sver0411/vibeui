import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "动态网格背景",
    "en": "Animated Grid Background",
    "aliases": [
      "蓝图网格",
      "网格扫光背景",
      "Blueprint Grid"
    ],
    "pattern": "Background · Layered Gradients",
    "principle": "两个 1px linear-gradient 以 44px 平铺出横竖网格，叠加 radial-gradient 晕影与 mask 径向渐隐；高亮带是 240px 高的渐变背景图用 background-position 从 -240px 匀速移到 100%+240px 实现循环扫过。"
  },
  "prompts": {
    "short": "做一个蓝图风格网页背景：细网格线铺满 + 中心径向渐隐，一条微光带缓慢从上到下循环扫过，纯 CSS。",
    "standard": "用原生 HTML/CSS 实现动态网格背景：\n1. 网格层用两层 linear-gradient(rgba(24,24,27,0.065) 1px, transparent 1px) 与 90deg 版本，background-size: 44px 44px 平铺；\n2. 叠一层 radial-gradient(circle at 50% 40%, rgba(20,184,166,0.08), transparent 55%) 做色晕；\n3. mask-image: radial-gradient(circle at 50% 45%, #000 30%, transparent 85%) 让网格向边缘渐隐；\n4. 扫光层：background-size 100% 240px、no-repeat 的青色渐变带，keyframes 把 background-position 从 0 -240px 匀速移到 0 calc(100% + 240px)，7s linear infinite。\n不要用 canvas 或图片。",
    "refined": "实现可配置的网格扫光背景：\n- 网格间距：默认 44px（24px 密集 – 80px 疏朗）；\n- 线色：默认 rgba(24,24,27,0.065)（0.04 – 0.12）；\n- 扫光带高：默认 240px，周期 7s linear；\n- 径向渐隐：默认 #000 30% → transparent 85%。\n实现约束：网格用 background-image 平铺而非大量 DOM 元素；扫光动画只改 background-position（该层独立合成，不引发重排）；prefers-reduced-motion 下隐藏扫光带、保留静态网格。\n验收标准：① 窗口缩放网格不错位不模糊；② 扫光循环无接缝跳变；③ 内容文字对比度不受背景干扰。"
  },
  "knobs": [
    {
      "name": "网格间距 grid size",
      "default": "44px 44px",
      "range": "24 – 80 (px)",
      "effect": "background-size 控制格子密度，越小越密集越有蓝图感。"
    },
    {
      "name": "网格线颜色 line color",
      "default": "rgba(24, 24, 27, 0.065)",
      "range": "透明度 0.04 – 0.12",
      "effect": "线条浓度，过高会喧宾夺主压过内容。"
    },
    {
      "name": "扫光带高度 band height",
      "default": "240px",
      "range": "120 – 480 (px)",
      "effect": "background-size 的纵向尺寸，决定光带厚度。"
    },
    {
      "name": "扫光周期 sweep duration",
      "default": "7s linear",
      "range": "4s – 15s",
      "effect": "光带扫过全屏的节奏，linear 保证循环匀速无顿挫。"
    },
    {
      "name": "径向渐隐 vignette",
      "default": "#000 30% → transparent 85%（圆心 50% 45%）",
      "range": "20% – 60% / 70% – 100%",
      "effect": "mask 让网格从中心向边缘淡出，聚焦视觉中心。"
    }
  ],
  "pitfalls": [
    "扫光用一整个绝对定位 DOM 长条做 top 动画，不如 background-position 优雅且容易引发重排。",
    "background-position 的 to 值没加 240px 缓冲（只写到 100%），光带会瞬移回起点产生跳变。",
    "网格层没加 mask 径向渐隐，线条铺满全屏，与前景文字争夺注意力。",
    "background-size 忘了给色晕层单独设 100% 100%，radial-gradient 也被压成 44px 小格子。",
    "扫光颜色透明度过高（>0.15），背景变成抢眼的闪烁灯而非微妙氛围。",
    "infinite 扫光没做 prefers-reduced-motion 降级。"
  ],
  "effectTags": [
    "背景",
    "网格",
    "扫光",
    "蓝图"
  ]
};
