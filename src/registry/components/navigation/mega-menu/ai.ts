import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "大型菜单",
    "en": "Mega Menu",
    "aliases": [
      "超级菜单",
      "多列下拉",
      "导航面板"
    ],
    "pattern": "Navigation · Mega Menu / Hover Intent",
    "principle": "pointerenter 延迟 80ms 才打开（防误扫）、pointerleave 延迟 200ms 才关闭（移动缓冲），触屏/键盘走点击 toggle，ESC 与点击外部均可关闭。"
  },
  "prompts": {
    "short": "做一个导航栏大型菜单：三列链接加右侧特色卡，悬停意图延迟开合，支持点击切换与点击外部关闭。原生 JS 实现。",
    "standard": "用原生 HTML/CSS/JavaScript 实现大型菜单：\n1. 面板 absolute 定位在触发项下方居中（top: calc(100% + 10px)），grid 四列（3 列链接 + 1 列特色卡）；\n2. 悬停意图：pointerenter 80ms 后开、pointerleave 200ms 后关，两个定时器互相 clearTimeout；\n3. 触屏/键盘点击 toggle，aria-expanded 同步；面板内 ESC 关闭并归还焦点；document pointerdown 在 entry 外时关闭；\n4. 入场 0.16s 上移淡入动画，箭头图标随 aria-expanded 旋转 180°。不要引入库。",
    "refined": "可配置大型菜单：INTENT_MS 80、CLOSE_DELAY_MS 200、面板宽 min(560px, 86vw)、入场 0.16s。验收：① 鼠标快速扫过菜单项不闪开闪关；② 从触发器斜向移入面板（穿过 10px 间隙）途中不关闭；③ ESC 关闭后焦点回触发器；④ 640px 以下降为两列、特色卡不再跨行。"
  },
  "knobs": [
    {
      "name": "悬停意图延迟 INTENT_MS",
      "default": "80",
      "range": "0 – 200ms",
      "effect": "鼠标扫过时不误开菜单的缓冲。"
    },
    {
      "name": "离开缓冲 CLOSE_DELAY_MS",
      "default": "200",
      "range": "100 – 500ms",
      "effect": "移向面板路径上的容错时间，穿过间隙不掉菜单。"
    },
    {
      "name": "面板宽度",
      "default": "min(560px, 86vw)",
      "range": "420 – 720px",
      "effect": "列数与特色卡布局容量。"
    },
    {
      "name": "入场动画",
      "default": "mm-in 0.16s ease",
      "range": "0.1 – 0.3s",
      "effect": "面板上移淡入的速度。"
    }
  ],
  "pitfalls": [
    "触发器与面板之间有 10px 间隙，pointerleave 立即关闭会让鼠标穿不过去；必须保留关闭缓冲定时器。",
    "只做 hover 逻辑不处理 click，触屏用户点击后面板开合状态混乱；点击 toggle 与 hover 定时要走同一个 setOpen。",
    "没有 document 级 pointerdown 关闭，点页面其他地方菜单还挂着。",
    "aria-expanded 没与开合同步，读屏用户无法感知菜单状态。",
    "面板 z-index 低于页面后续内容，被 hero 图或轮播盖住（本例 z-index 40）。"
  ],
  "effectTags": [
    "大型菜单",
    "悬停意图",
    "多列",
    "导航"
  ]
};
