import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "点击浮层",
    "en": "Popover",
    "aliases": [
      "弹出层",
      "气泡卡片",
      "popover"
    ],
    "pattern": "Popover · Anchored Overlay",
    "principle": "浮层绝对定位于触发元素的相对容器内，先渲染后测量（getBoundingClientRect）判断上下空间翻转方向；全局 click 捕获阶段判断 target 是否在浮层外实现点外关闭，Esc 走 keydown 监听。"
  },
  "prompts": {
    "short": "做一个点击弹出/点外关闭的 popover：锚定触发按钮，空间不足自动翻转方向，带小箭头和缩放淡入动画。",
    "standard": "用原生 JS 实现 popover（不引库）：\n1. 结构：相对定位容器内放触发按钮和 role=\"dialog\" 的浮层，浮层 absolute 定位、默认 display:none；\n2. 打开：移除 hidden、下一帧加 .is-open 播放 scale(0.96)→1 + opacity 淡入；\n3. 智能方向：打开前测量触发按钮顶部到视口顶部的距离，小于浮层高度 + 16 就放下方，否则放上方（bottom: calc(100% + 12px)）；\n4. 点外关闭：document 上捕获阶段监听 click，target 不在浮层与触发器内就关闭；Esc 键 keydown 关闭并把焦点还给触发器；\n5. 无障碍：aria-expanded 同步、关闭后 focus 归还。",
    "refined": "封装 createPopover(trigger, panel, options) 工具函数：\n- 支持同一页面多个实例互斥（打开一个自动关其他）；\n- 方向翻转后箭头位置按触发器与浮层的水平重叠区动态计算（clamp 到 [12, width-12]）；\n- 窗口 resize / scroll 时若浮层打开则重算方向；\n验收：① 快速连点不闪烁；② 视口边缘打开方向正确；③ Tab 焦点循环不飘出浮层。"
  },
  "knobs": [
    {
      "name": "偏移 offset",
      "default": "12px",
      "range": "8px – 20px",
      "effect": "浮层与锚点的间距，箭头高度应与之匹配。"
    },
    {
      "name": "入场缩放 enterScale",
      "default": "0.96",
      "range": "0.9 – 0.98",
      "effect": "越小弹性越明显，0.98 几乎无感。"
    },
    {
      "name": "动效时长 duration",
      "default": "180ms",
      "range": "120ms – 260ms",
      "effect": "过快显得生硬，过慢拖沓。"
    }
  ],
  "pitfalls": [
    "只在触发器上监听 click 关闭会在点击浮层内部时误关——要在 document 捕获阶段判断包含关系。",
    "忘记 aria-expanded，读屏软件不知道按钮控制着一个浮层。",
    "方向翻转靠 CSS 媒体查询判断不准，必须在打开时用 getBoundingClientRect 实测。",
    "关闭后焦点不归还触发器，键盘用户会被扔回页面顶部。",
    "浮层打开时页面滚动，浮层跟着锚点走但方向不重算，会被视口裁剪。"
  ],
  "effectTags": [
    "浮层",
    "弹出",
    "交互"
  ]
};
