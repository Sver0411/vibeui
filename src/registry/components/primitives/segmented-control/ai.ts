import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "分段控件",
    "en": "Segmented Control",
    "aliases": [
      "分段切换器",
      "滑块 Tabs",
      "iOS Segmented"
    ],
    "pattern": "Segmented Control · Tabs",
    "principle": "选中态由原生 radio 的 :checked 驱动，JS 只测量选中项的 offsetLeft/offsetWidth 写给绝对定位的白色滑块，键盘与表单语义因此免费获得。"
  },
  "prompts": {
    "short": "做一个分段控件：白色滑块跟随选中项滑动，选中态用原生 radio 驱动。原生 JS 测量定位。",
    "standard": "用原生 HTML/CSS/JavaScript 实现分段控件，不要引入库：\n1. 容器 relative + 内嵌 overflow 质感，选项是隐藏的原生 radio + label，:checked + 兄弟选择器负责文字加粗变色；\n2. 白色滑块绝对定位，JS 在 change 时读选中项 offsetLeft/offsetWidth 写入 transform: translateX 和 width；\n3. 首次测量前滑块 opacity:0，量完再置 data-ready 显示，避免从 0 宽度闪动；\n4. keyup 监听 Arrow 键兜底（部分浏览器方向键不触发 change），ResizeObserver 与 document.fonts.ready 后重新测量。",
    "refined": "参数：容器 padding 4px、选项间距 2px、圆角 10px（滑块 calc 减 4px）、滑块过渡 0.32s cubic-bezier(0.22, 1, 0.36, 1)（transform 与 width 同时过渡）、文字 13px 选中加重 600、计数徽章 1px 6px 圆角胶囊。验收：① 方向键切换滑块平滑跟随；② 窗口缩放/字体加载完成后滑块不错位；③ reduced-motion 下滑块瞬移；④ 键盘 focus 圈画在文字上而非隐藏的 radio 上。"
  },
  "knobs": [
    {
      "name": "滑块过渡",
      "default": "0.32s cubic-bezier(0.22, 1, 0.36, 1)",
      "range": "0.2s – 0.5s",
      "effect": "滑块移动与变宽的速度缓动。"
    },
    {
      "name": "容器内边距",
      "default": "4px（选项间距 2px）",
      "range": "2px – 6px",
      "effect": "滑块与容器边缘的留白，需同步滑块圆角 calc(radius - 4px)。"
    },
    {
      "name": "容器圆角",
      "default": "10px",
      "range": "6px – 16px",
      "effect": "整体与滑块的圆润程度。"
    },
    {
      "name": "选中文字",
      "default": "13px / 500，选中 600 且色 #18181b",
      "range": "12px – 15px",
      "effect": "选项字号与选中态视觉权重。"
    }
  ],
  "pitfalls": [
    "只在 change 事件里同步滑块，部分浏览器方向键不触发 change，需要 keyup 里检测 Arrow 键兜底。",
    "首次渲染没先隐藏滑块就测量，页面加载瞬间滑块从宽度 0 飞到目标位置，闪一下。",
    "用固定宽度均分滑块而不是实测 offsetWidth，选项文字长短不一时滑块对不齐。",
    "忽略字体异步加载与容器 resize，fonts.ready / ResizeObserver 不监听则滑块错位。",
    "滑块用 left 过渡而不是 translateX + width，每次动画都触发重排。"
  ],
  "effectTags": [
    "分段切换",
    "滑块跟随",
    "radio",
    "Tabs"
  ]
};
