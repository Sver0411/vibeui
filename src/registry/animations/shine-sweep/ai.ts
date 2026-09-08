import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "扫光高光",
    "en": "Shine Sweep / Shine Effect",
    "aliases": [
      "扫过光",
      "流光",
      "高光扫过",
      "Shimmer 扫光"
    ],
    "pattern": "Surface · Shine Sweep",
    "principle": "容器 overflow: hidden 裁切一根 skewX 倾斜的白色渐变 ::after 光带，hover 时用 left 过渡或 keyframes 让光带从 -80% 滑到 130% 掠过表面。"
  },
  "prompts": {
    "short": "给卡片加一个 hover 扫光：一道倾斜的白色光带从左上掠到右下，纯 CSS 实现。",
    "standard": "用原生 HTML/CSS 实现扫光高光：\n1. 容器 position: relative + overflow: hidden；\n2. ::after 伪元素做光带：宽 45%、top/bottom 各 -60% 拉长、skewX(-20deg)，背景 linear-gradient(100deg, transparent, rgba(255,255,255,0.55) 50%, transparent)；\n3. 初始 left: -80%（藏在左侧外），hover 时过渡到 left: 130%，transition 0.65s cubic-bezier(0.22, 1, 0.36, 1)；\n4. 自动循环变体用 keyframes：0% 在 -80%，45% 到 130% 后停住等下一轮，3.2s infinite；\n5. 不要用 JS，不要引入动画库。",
    "refined": "实现三载体扫光（卡片 hover / 徽章自动 / 图片占位自动），暴露：\n- 光带宽度：默认 45%（30% – 60%）；\n- 倾斜角：默认 skewX(-20deg)（-30deg – 0deg）；\n- 峰值亮度：默认 rgba(255,255,255,0.55)，深色底可到 0.7；\n- hover 时长：默认 0.65s；自动循环周期：卡片 3.2s / 徽章 2.4s / 图片 2.8s。\n实现约束：光带必须被 overflow: hidden 裁切；自动循环在 keyframes 里留 55% 的停顿窗口避免刷屏。\n验收标准：① 光带掠过时边缘干净无渗出；② hover 移出后不回扫；③ prefers-reduced-motion 下自动扫光停止、hover 不再滑动。"
  },
  "knobs": [
    {
      "name": "光带宽度 width",
      "default": "45%",
      "range": "30% – 60%",
      "effect": "光带越宽扫过越隆重，窄了更含蓄精致。"
    },
    {
      "name": "倾斜角 skewX",
      "default": "-20deg",
      "range": "-30deg – 0deg",
      "effect": "光带的斜度，模拟从左上往右下的自然反光方向。"
    },
    {
      "name": "峰值亮度 highlight",
      "default": "rgba(255, 255, 255, 0.55)",
      "range": "0.3 – 0.8",
      "effect": "光带最亮处的透明度，深色背景需要调高才明显。"
    },
    {
      "name": "hover 过渡时长",
      "default": "0.65s cubic-bezier(0.22, 1, 0.36, 1)",
      "range": "0.4s – 1.2s",
      "effect": "hover 扫光速度，配合 ease-out 缓动更有光速感。"
    },
    {
      "name": "自动循环周期",
      "default": "3.2s（卡片）/ 2.4s（徽章）/ 2.8s（图片）",
      "range": "2s – 5s",
      "effect": "keyframes 循环时长，其中 45% 处已滑完、剩余为停顿。"
    }
  ],
  "pitfalls": [
    "容器忘写 overflow: hidden，光带会溢出到卡片外面悬空飘着。",
    "光带高度只写 100%，倾斜后两端露出三角空隙——要 top/bottom 各 -60% 拉长补偿 skew。",
    "用 transition: transform 但 keyframes 里动画 left，两种机制混用导致 hover 与自动循环行为不一致。",
    "自动循环没有停顿窗口（0% 直接接 100% 往回扫），光带看起来在来回拉锯。",
    "深色背景沿用白色 0.55 透明度对比不够，扫光几乎不可见。",
    "infinite 循环没做 prefers-reduced-motion 降级。"
  ],
  "effectTags": [
    "扫光",
    "高光",
    "hover",
    "加载占位"
  ]
};
