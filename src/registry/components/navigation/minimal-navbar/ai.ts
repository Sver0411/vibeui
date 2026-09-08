import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "极简导航栏",
    "en": "Minimal Navbar",
    "aliases": [
      "顶部导航",
      "页头导航",
      "响应式导航栏"
    ],
    "pattern": "Responsive Navbar · Scroll-aware Header",
    "principle": "sticky 定位，滚动容器监听 scroll（passive），scrollTop>8 时切 data-scrolled 触发毛玻璃描边；活动链接下划线用 ::after 动画，≤719px 隐藏链接组、汉堡按钮 toggle hidden 移动菜单并同步 aria-expanded。"
  },
  "prompts": {
    "short": "做一个响应式导航栏：滚动后出现毛玻璃与描边、活动链接下划线动画、窄屏收进汉堡菜单。原生 JS 实现。",
    "standard": "用原生 HTML/CSS/JavaScript 实现响应式导航栏：\n1. header sticky top 0，真正的滚动容器监听 scroll（passive: true），scrollTop>8 设 data-scrolled，触发 rgba 背景 + backdrop-filter blur(10px) + 1px 描边的 0.25s 过渡；\n2. 活动链接 ::after 下划线从 scaleX(0.4) 展开入场，0.25s cubic-bezier(0.22,1,0.36,1)；\n3. ≤719px 隐藏链接组，汉堡为真实 button，点击 toggle 移动菜单 hidden 并同步 aria-expanded，两条线旋转成叉；\n4. 所有交互元素有 focus-visible 描边。不要引入库。",
    "refined": "可配置导航栏：高度 58px、内容宽 860px、滚动阈值 8px、毛玻璃 blur(10px)、移动断点 719px。验收：① 滚动超过 8px 描边出现、回顶消失；② 汉堡开合时 aria-expanded 与图标形态同步；③ 719px 断点切换无布局抖动；④ 键盘 Tab 顺序为 logo→链接→CTA→汉堡。"
  },
  "knobs": [
    {
      "name": "滚动触发阈值",
      "default": "8px",
      "range": "0 – 40px",
      "effect": "描边与毛玻璃出现的滚动距离。"
    },
    {
      "name": "毛玻璃强度",
      "default": "blur(10px)",
      "range": "4 – 20px",
      "effect": "滚动态背景的磨砂程度。"
    },
    {
      "name": "导航栏高度",
      "default": "58px",
      "range": "48 – 72px",
      "effect": "整体密度与移动端点击热区。"
    },
    {
      "name": "移动端断点",
      "default": "719px",
      "range": "640 – 900px",
      "effect": "链接收进汉堡菜单的阈值。"
    },
    {
      "name": "下划线动画",
      "default": "0.25s cubic-bezier(0.22,1,0.36,1)",
      "range": "0.15 – 0.4s",
      "effect": "活动链接下划线展开速度。"
    }
  ],
  "pitfalls": [
    "scroll 监听挂在 window 但页面实际滚动容器是内层 div，data-scrolled 永远不触发；要监听真正的滚动容器。",
    "滚动回调没加 passive 也没做阈值判断，每帧都写 dataset 造成无谓重绘。",
    "汉堡按钮用 div + click 实现，键盘无法操作；必须是 button 并同步 aria-expanded。",
    "移动菜单展开时页面背景仍可滚动，长菜单会带着页面一起跑。",
    "sticky 头部下方的锚点跳转内容被遮挡，需 scroll-margin-top 补偿头部高度。"
  ],
  "effectTags": [
    "导航栏",
    "滚动感知",
    "毛玻璃",
    "响应式"
  ]
};
