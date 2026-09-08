import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "回到顶部按钮",
    "en": "Scroll to Top / Back to Top Button",
    "aliases": [
      "回顶 FAB",
      "返回顶部",
      "进度环回顶"
    ],
    "pattern": "Scroll Utility · Floating Action Button",
    "principle": "scroll 监听里算出滚动进度写入 SVG 圆的 stroke-dashoffset，超过一屏 60% 才解除 hidden 浮现，点击 scrollTo 平滑回顶。"
  },
  "prompts": {
    "short": "做一个回到顶部按钮：滚动超一屏 60% 浮现，外圈 SVG 进度环随滚动填充，点击平滑回顶。原生 JS。",
    "standard": "用原生 HTML/CSS/JavaScript 实现回到顶部 FAB，不要引入库：\n1. 固定定位右下角，SVG circle r=20，stroke-dasharray 与周长 125.66 相等，初始 dashoffset 也是 125.66（全隐藏）；\n2. scroll 监听（passive）里用 scrollY / (scrollHeight - innerHeight) 算进度，写 dashoffset = 周长 × (1 - 进度)；\n3. scrollY < innerHeight × 0.6 时按钮 hidden，超过才显示；\n4. 圆环 rotate(-90deg) 让起点在顶部；reduced-motion 下点击改 behavior: \"auto\"。",
    "refined": "参数：显示阈值一屏的 60%（SHOW_AT = 0.6）、环 stroke-width 3、进环颜色 #0f766e、dashoffset 过渡 0.1s linear、按钮 52px 圆形、浮现动画 0.25s cubic-bezier(0.22, 1, 0.36, 1) 上移淡入。验收：① 页首按钮不可见且环为空；② 滚到最底环刚好闭合；③ 点击平滑滚回顶部后按钮重新隐藏；④ reduced-motion 下为即时跳转。"
  },
  "knobs": [
    {
      "name": "显示阈值 SHOW_AT",
      "default": "0.6",
      "range": "0.2 – 1.0",
      "effect": "滚动超过一屏的多少比例后按钮浮现。"
    },
    {
      "name": "进度环周长",
      "default": "125.66（r=20）",
      "range": "随 SVG 半径变化",
      "effect": "stroke-dasharray/dashoffset 的基准，改半径必须同步重算 2πr。"
    },
    {
      "name": "dashoffset 过渡",
      "default": "0.1s linear",
      "range": "0 – 0.3s",
      "effect": "进度环跟随滚动的顺滑程度，过长会明显滞后。"
    },
    {
      "name": "浮现动画",
      "default": "0.25s cubic-bezier(0.22, 1, 0.36, 1)",
      "range": "0.2s – 0.4s",
      "effect": "按钮出现时上移淡入的速度。"
    }
  ],
  "pitfalls": [
    "dasharray 与周长不相等，环会出现缺口或首尾重叠，必须用 2πr 精确计算。",
    "SVG 忘了 rotate(-90deg)，进度从 3 点钟方向开始而不是顶部。",
    "scroll 监听没加 { passive: true }，滚动性能被阻塞。",
    "用 Math.round 比较 scrollY 导致按钮在阈值附近闪烁，应直接比较阈值并接受 hidden 的瞬时切换。",
    "总高度为 0（内容不足一屏）时 progress 出现 NaN/Infinity，要除零保护。"
  ],
  "effectTags": [
    "滚动",
    "进度环",
    "SVG",
    "长页面"
  ]
};
