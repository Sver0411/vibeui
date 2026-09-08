import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "滑动指示器标签页",
    "en": "Animated Tabs / Sliding Indicator",
    "aliases": [
      "选项卡",
      "滑动下划线 Tabs",
      "标签切换"
    ],
    "pattern": "Tabs · WAI-ARIA Tab Pattern",
    "principle": "白色指示器是 absolute 元素，切换时实测目标 tab 的 offsetLeft/offsetWidth 写入 transform 与 width 滑过去（非写死位置），resize 时重算；面板用 hidden 切换 + 入场动画。"
  },
  "prompts": {
    "short": "做一个指示器滑动的标签页：指示器按真实几何滑动、方向键循环切换、面板淡入。原生 JS 实现。",
    "standard": "用原生 HTML/CSS/JavaScript 实现标签页：\n1. role=\"tablist\"/tab/tabpanel 语义，roving tabindex：选中 tab tabIndex 0 其余 -1；\n2. 指示器 absolute 贴 tablist 内侧，select 时 width = tab.offsetWidth、transform = translateX(tab.offsetLeft)，transition transform/width 0.3s cubic-bezier(0.22,1,0.36,1)；\n3. 键盘 ←→ 取模循环、Home/End 跳首尾，方向键移动即选中（selection follows focus）；\n4. 面板 hidden 切换并播 0.28s 上移淡入；window resize 时对选中 tab 重算指示器位置。不要引入库。",
    "refined": "可配置标签页：tablist 内边距 4px、tab 内边距 8px 16px、指示器圆角 8px 白色带投影、滑动 0.3s。验收：① 任意调整字号/文案长度后指示器仍精确贴合（几何实测而非写死）；② ← 在第一个 tab 循环到最后一个；③ resize 窗口后指示器不错位；④ 面板切换时 hidden 属性与 aria-selected 同步。"
  },
  "knobs": [
    {
      "name": "指示器滑动时长",
      "default": "0.3s cubic-bezier(0.22,1,0.36,1)",
      "range": "0.2 – 0.5s",
      "effect": "滑动跟随速度与缓动感。"
    },
    {
      "name": "面板入场",
      "default": "at-panel-in 0.28s",
      "range": "0.15 – 0.4s",
      "effect": "内容区淡入上移速度。"
    },
    {
      "name": "tab 内边距",
      "default": "8px 16px",
      "range": "6 – 20px",
      "effect": "标签热区与指示器大小。"
    },
    {
      "name": "tablist 底色",
      "default": "#ececef",
      "range": "任意 hex",
      "effect": "轨道与白色指示器的对比度。"
    }
  ],
  "pitfalls": [
    "指示器位置按 tab 序号写死（如 left: n*100px），字号或文案一变就错位；必须实测 offsetLeft/offsetWidth。",
    "没监听 resize，窗口变化或 web 字体加载完成后指示器停在旧几何上。",
    "首帧在字体加载前就计算指示器位置，初次渲染偏移；可在 document.fonts.ready 或 rAF 后重算。",
    "面板切换只改 display 类不设 hidden，读屏仍会读出全部面板内容。",
    "方向键不循环也不跟随选中，违背 WAI-ARIA tabs 模式的键盘预期。"
  ],
  "effectTags": [
    "标签页",
    "滑动指示器",
    "键盘导航",
    "几何实测"
  ]
};
