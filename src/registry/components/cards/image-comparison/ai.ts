import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "图片对比滑块",
    "en": "Image Comparison Slider",
    "aliases": [
      "Before/After 滑块",
      "图像对比卡",
      "对比分割滑块"
    ],
    "pattern": "Clip-path Comparison",
    "principle": "上层（Before）用 clip-path: inset(0 (100-pos)% 0 0) 按百分比裁切；容器任意处 pointerdown 跳转、手柄拖拽走 setPointerCapture 跟手；键盘方向键 ±2 / PageUp ±10 / Home/End 跳转并同步 aria-valuenow。"
  },
  "prompts": {
    "short": "做一个 Before/After 图片对比卡：中间分割线可拖拽（鼠标+触屏），手柄支持方向键微调，两侧内容纯 CSS 绘制即可。",
    "standard": "用原生 HTML/CSS/JavaScript 实现图片对比滑块：\n1. 容器 aspect-ratio 4/3 + overflow hidden，上层 layer 用 clip-path: inset(0 (100-pos)% 0 0) 裁出左侧；分割线 2px 白线 + 40px 圆形手柄居中跟随 left: pos%；\n2. Pointer Events：容器 pointerdown 直接定位，手柄 pointerdown 时 setPointerCapture、pointermove 中 hasPointerCapture 才更新 pos，容器设 touch-action: none 防页面滚动；\n3. 键盘：Arrow ±2、PageUp/Down ±10、Home/End 0/100，paint() 里 clamp 0–100 并同步 handle 的 aria-valuenow；\n4. pos 全程用 0–100 百分比，矩形每次实时 getBoundingClientRect，resize 自然自适应。",
    "refined": "可配置对比滑块：初始 pos 50、键盘步进 ±2/±10、手柄 40px hover 放大 1.08、clip-path 右侧 100-pos%、分割线 2px rgba(255,255,255,0.9)。\n验收：① 触屏拖动手柄时页面不滚动；② 拖出容器边界后继续跟手（pointer capture）；③ 方向键每按一次 aria-valuenow 精确 +2；④ pos=0/100 时两侧内容恰好完全显示。"
  },
  "knobs": [
    {
      "name": "初始位置 pos",
      "default": "50",
      "range": "0 – 100",
      "effect": "分割线初始百分比，paint 的 clamp 基准。"
    },
    {
      "name": "键盘步进",
      "default": "方向键 ±2，PageUp/Down ±10",
      "range": "1 – 20",
      "effect": "无鼠标用户微调对比的粒度。"
    },
    {
      "name": "手柄尺寸",
      "default": "40px 圆，hover scale 1.08",
      "range": "32 – 56px",
      "effect": "拖拽热区与视觉权重。"
    },
    {
      "name": "分割线",
      "default": "2px，rgba(255,255,255,0.9)",
      "range": "1 – 4px",
      "effect": "分割线的存在感，过粗会遮挡对比边界。"
    },
    {
      "name": "触摸行为",
      "default": "touch-action: none",
      "range": "none / pan-y",
      "effect": "拖动时是否允许页面滚动，pan-y 会打断纵向手势。"
    }
  ],
  "pitfalls": [
    "用 mouse 事件而非 Pointer Events，触屏完全拖不动；或没设 touch-action: none，拖动时页面跟着滚。",
    "clip-path 方向写反：上层左侧可见应为 inset(0 (100-pos)% 0 0)，写成 pos% 会裁出右边。",
    "手柄拖拽没 setPointerCapture，指针移出容器后 pointermove 丢失，滑块卡在半路。",
    "只在手柄上监听 pointerdown，忘了容器点击跳转定位，体验断一截。",
    "手柄 left 用像素定位而不随容器实时取 rect，窗口 resize 后错位。",
    "pos 没 clamp 就写回样式，Home/End 或快速拖动产生负值导致内容翻转。"
  ],
  "effectTags": [
    "对比滑块",
    "clip-path",
    "拖拽",
    "before-after"
  ]
};
