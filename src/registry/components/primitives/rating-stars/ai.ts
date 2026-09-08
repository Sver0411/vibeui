import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "评分星",
    "en": "Star Rating",
    "aliases": [
      "星级评分",
      "半星评分",
      "rate"
    ],
    "pattern": "Rating · Input Control",
    "principle": "五角星用 clip-path polygon 绘制，灰色轨道层上叠一层 overflow:hidden 的填充层，JS 按评分百分比写 width；指针横向位置小于星宽 50% 判半星。"
  },
  "prompts": {
    "short": "做一个五角星评分：悬停半星预览、点击确认、方向键 0.5 步进，纯 clip-path 绘制。原生 JS。",
    "standard": "用原生 HTML/CSS/JavaScript 实现星级评分，不要引入库：\n1. 星星用 clip-path: polygon(10 顶点) 画在 i 元素上，背景 currentColor，无 SVG 无字体；\n2. 结构分两层：灰色轨道 + 绝对定位、overflow:hidden 的橙色填充层，宽度 = value / MAX × 100%；\n3. 每颗星一个透明 button 命中区，mousemove 按指针在星内横向位置 <50% 判 0.5 分预览，click 确认，mouseleave 恢复已选值；\n4. 方向键 ±0.5、Home/End 跳首尾，状态写 aria-checked，只有第一颗星进 tab 序列（radiogroup 惯例）。",
    "refined": "参数：星 26px、间距 6px、填充色 #f59e0b、轨道 #d4d4d8、填充宽度过渡 0.18s cubic-bezier(0.22, 1, 0.36, 1)、悬停整组 scale(1.04)、步长 0.5。验收：① 半星预览与点击值一致；② 键盘可从 0.5 调到 5 且焦点跟随；③ 只读变体用 --pct 变量显示 4.3 之类小数；④ 触屏（hover: none）不触发缩放但点击正常。"
  },
  "knobs": [
    {
      "name": "星尺寸 --rt-star",
      "default": "26px（小尺寸变体 16px）",
      "range": "14px – 40px",
      "effect": "整组大小，需同步 --rt-gap。"
    },
    {
      "name": "星间距 --rt-gap",
      "default": "6px",
      "range": "2px – 10px",
      "effect": "星与星的间隔，轨道与填充层必须同值。"
    },
    {
      "name": "填充色 --rt-color",
      "default": "#f59e0b",
      "range": "任意色值",
      "effect": "点亮星星的颜色（品牌变体 #0f766e）。"
    },
    {
      "name": "填充过渡",
      "default": "0.18s cubic-bezier(0.22, 1, 0.36, 1)",
      "range": "0 – 0.3s",
      "effect": "宽度百分比变化时的跟随速度。"
    }
  ],
  "pitfalls": [
    "填充层里的星条被父级裁切时忘了保持固定宽度（flex: 0 0 26px），随容器收缩导致后半截星星变形。",
    "半星判断用整颗星为步长，忘了 getBoundingClientRect 后按指针横向位置 <50% 细分。",
    "mouseleave 后预览值残留，没恢复到已确认的 value。",
    "每颗星都能 Tab 聚焦，键盘要按 5 次才穿过组件；应只在第一颗 tabIndex=0、组内方向键移动。",
    "aria 用 value 而不是逐星 aria-checked，读屏读不出当前评分。"
  ],
  "effectTags": [
    "评分",
    "半星",
    "clip-path",
    "键盘可达"
  ]
};
