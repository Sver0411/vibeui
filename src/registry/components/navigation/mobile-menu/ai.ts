import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "全屏移动菜单",
    "en": "Full-screen Mobile Menu",
    "aliases": [
      "全屏抽屉",
      "汉堡全屏菜单",
      "移动端覆盖菜单"
    ],
    "pattern": "Overlay Menu · Staggered Reveal",
    "principle": "overlay 用 hidden 控制挂载、data-open 驱动入场；每个链接带 --i 索引，animation-delay 用 calc(var(--i) * 55ms + 60ms) 错峰上升；汉堡三条线按 aria-expanded 变形为叉，关闭 300ms 后再 hidden 并归还焦点。"
  },
  "prompts": {
    "short": "做一个全屏移动菜单：链接错峰入场、汉堡图标变叉、ESC 与点击链接均可关闭、焦点归还。原生 JS 实现。",
    "standard": "用原生 HTML/CSS/JavaScript 实现全屏移动菜单：\n1. overlay absolute inset 0 覆盖，hidden 控制挂载，双 rAF 后设 data-open=\"true\" 触发入场；\n2. 每个链接内联 style=\"--i:n\"，data-open 时 animation: rise 0.45s cubic-bezier(0.22,1,0.36,1) forwards，delay 为 calc(var(--i) * 55ms + 60ms)；\n3. 汉堡三条线按 aria-expanded 变形：第 1/3 条 translateY(±6px) 旋转 ±45°，中线 opacity 0；\n4. 打开后焦点移入第一个链接，点击链接或 ESC 关闭，300ms 后再 hidden 并把焦点归还汉堡按钮。不要引入库。",
    "refined": "可配置全屏菜单：链接字号 30px、错峰步长 55ms、首项延迟 60ms、入场 0.45s、关闭等待 300ms。验收：① 连续快速开关不残留半透明链接；② ESC 与点击链接都能关闭且焦点回汉堡；③ reduced-motion 下链接直接可见无错峰；④ overlay 背景 rgba(255,255,255,0.97) + blur(6px) 时下层内容不可交互。"
  },
  "knobs": [
    {
      "name": "错峰步长",
      "default": "55ms",
      "range": "20 – 120ms",
      "effect": "链接逐个入场的间隔节奏。"
    },
    {
      "name": "入场时长",
      "default": "0.45s cubic-bezier(0.22,1,0.36,1)",
      "range": "0.3 – 0.7s",
      "effect": "单个链接上升淡入的速度。"
    },
    {
      "name": "首项延迟",
      "default": "60ms",
      "range": "0 – 150ms",
      "effect": "overlay 出现后第一项的起步等待。"
    },
    {
      "name": "关闭等待",
      "default": "300ms",
      "range": "0 – 500ms",
      "effect": "移除 hidden 前的退场缓冲，过短会闪断。"
    },
    {
      "name": "链接字号",
      "default": "30px",
      "range": "24 – 40px",
      "effect": "全屏菜单的视觉分量。"
    }
  ],
  "pitfalls": [
    "关闭时立即 hidden，错峰动画还没播完链接就集体消失；要按最长延迟 + 时长给退场缓冲。",
    "链接动画只写在 data-open 分支，关闭再打开时 animation 不重播；需先移除 data-open 让动画复位。",
    "打开后焦点没移入 overlay，键盘用户仍在被遮住的焦点链上操作。",
    "汉堡中线只用 opacity 0 隐藏仍占位，变形后不对称成叉；要用 translateY 补偿位移。",
    "点击 overlay 空白处没有绑定关闭，用户预期点背景也能退出。"
  ],
  "effectTags": [
    "全屏菜单",
    "错峰入场",
    "汉堡",
    "移动端"
  ]
};
