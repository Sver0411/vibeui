import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "下拉菜单",
    "en": "Dropdown Menu",
    "aliases": [
      "操作菜单",
      "下拉选项",
      "菜单按钮"
    ],
    "pattern": "Menu Button · WAI-ARIA Menu",
    "principle": "工厂函数 createDropdown 管理每个实例：hidden 挂载 + aria-expanded 同步，↑↓ 取模循环移动焦点，Home/End 跳首尾，ESC 关闭并归还焦点，document pointerdown 在容器外时关闭。"
  },
  "prompts": {
    "short": "做一个键盘语义完整的下拉菜单：方向键循环、Home/End 跳转、ESC 归还焦点、点击外部关闭，含危险项分区。原生 JS 实现。",
    "standard": "用原生 HTML/CSS/JavaScript 实现下拉菜单：\n1. role=\"menu\"/menuitem 语义，触发器 aria-haspopup + aria-expanded 同步；点击或 ArrowDown 打开并聚焦第一项；\n2. 菜单内 keydown：↑↓ 取模循环移动焦点、Home/End 跳首尾、ESC stopPropagation 后关闭并 focus 回触发器；\n3. document pointerdown 在容器外时关闭；面板 transform-origin top，0.16s 下移缩放入场；\n4. 多实例共用同一工厂函数互不干扰，危险项独立红色配色，<hr> 分区，aria-checked 项可切换。不要引入库。",
    "refined": "可配置下拉菜单：最小宽 170px（宽版 220px）、面板距触发器 6px、入场 0.16s cubic-bezier(0.22,1,0.36,1)。验收：① ↑ 在第一项能循环到最后一项；② ESC 后焦点必在触发器上；③ 两个实例同时只开一个且互不影响；④ aria-checked 菜单项点击可切换选中态。"
  },
  "knobs": [
    {
      "name": "菜单最小宽度",
      "default": "170px（宽版 220px）",
      "range": "140 – 280px",
      "effect": "快捷键列与长文案的容纳空间。"
    },
    {
      "name": "面板偏移",
      "default": "top: calc(100% + 6px)",
      "range": "4 – 12px",
      "effect": "与触发器的视觉间距。"
    },
    {
      "name": "入场动画",
      "default": "dm-in 0.16s cubic-bezier(0.22,1,0.36,1)",
      "range": "0.1 – 0.25s",
      "effect": "下移缩放入场速度，reduced-motion 下取消。"
    },
    {
      "name": "危险项配色",
      "default": "#be123c",
      "range": "任意 hex",
      "effect": "删除等高风险项的文字与悬停底色。"
    }
  ],
  "pitfalls": [
    "方向键不做取模循环，↑ 在第一项就没反应；边界要 (index-1+len)%len。",
    "多实例各自在 document 上挂 ESC/click 监听却没隔离，一个实例的事件处理影响另一个；工厂函数内要闭包各自的 open 状态。",
    "点击外部用 click 监听且没做 contains 判断时机处理，刚打开就因冒泡被关掉；用 pointerdown + container.contains 判断。",
    "aria-expanded 关闭后没复位为 false，读屏状态错乱。",
    "右对齐实例沿用 left:0 定位，面板溢出视口右缘；需 right:0 + transform-origin top right。"
  ],
  "effectTags": [
    "下拉菜单",
    "键盘导航",
    "无障碍",
    "浮层"
  ]
};
