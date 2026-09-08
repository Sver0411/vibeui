import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "右键菜单",
    "en": "Context Menu",
    "aliases": [
      "上下文菜单",
      "自定义 contextmenu",
      "长按菜单"
    ],
    "pattern": "Overlay · Context Menu",
    "principle": "拦截 contextmenu 事件，在 pointer 坐标显示 fixed 定位菜单；打开后先量自身尺寸再 clamp 进视口 8px 内边距，触屏用 500ms 长按等效触发。"
  },
  "prompts": {
    "short": "做一个自定义右键菜单：分组分隔线、快捷键提示、禁用与危险项，触屏长按触发，坐标不超出视口。原生 JS。",
    "standard": "用原生 HTML/CSS/JavaScript 实现右键菜单，不要引入库：\n1. 舞台上监听 contextmenu，preventDefault 后在 clientX/clientY 打开 fixed 菜单；\n2. 先移除 hidden 拿到 getBoundingClientRect 尺寸，left/top 用 min(x, innerWidth - width - 8) 与 max(8, …) 双向 clamp，防止右/下边缘溢出；\n3. 触屏 touchstart 起一个 500ms 定时器等效右键，touchmove/end/cancel 清除；\n4. 键盘：打开即聚焦第一个可用项，ArrowUp/Down 循环移动、Enter 触发、ESC 关闭并归还焦点；点外部/滚动/缩放都关闭。",
    "refined": "参数：菜单 min-width 208px、圆角 12px、入场 0.12s scale(0.96→1)、视口安全边距 8px、长按 500ms、触发反馈 toast 1.6s。验收：① 右键屏幕右下角菜单完整可见不溢出；② 长按拖动手指不误触发；③ 方向键到末项再按 Down 回到首项；④ 滚动页面时菜单立即关闭；⑤ 禁用项不响应且读屏可感知。"
  },
  "knobs": [
    {
      "name": "长按时长",
      "default": "500ms",
      "range": "300ms – 800ms",
      "effect": "触屏等效右键的按压判定时间。"
    },
    {
      "name": "视口安全边距",
      "default": "8px",
      "range": "0 – 24px",
      "effect": "菜单与屏幕边缘的最小距离。"
    },
    {
      "name": "入场动画",
      "default": "0.12s ease，scale(0.96→1)",
      "range": "0 – 0.2s",
      "effect": "菜单出现时的缩放淡入，transform-origin top left。"
    },
    {
      "name": "菜单宽度",
      "default": "min-width 208px（移动端 188px）",
      "range": "180px – 280px",
      "effect": "菜单可读宽度与换行。"
    }
  ],
  "pitfalls": [
    "直接用 clientX/Y 设置 left/top，右键屏幕右边缘时菜单溢出视口，必须先量菜单尺寸再 clamp。",
    "先定位后显示导致 getBoundingClientRect 拿到 0，clamp 全部失效（应先移除 hidden 再测量）。",
    "只 preventDefault 桌面右键，触屏没做长按等效，移动端完全无法唤起。",
    "打开后焦点不进菜单，方向键导航失效；或 ESC 关闭后焦点没有归还触发区域。",
    "漏掉 scroll/resize 时关闭，页面滚动后菜单钉在错误的 fixed 坐标上。"
  ],
  "effectTags": [
    "右键菜单",
    "overlay",
    "长按",
    "键盘导航"
  ]
};
