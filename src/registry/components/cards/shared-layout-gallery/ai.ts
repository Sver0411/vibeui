import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "共享布局画廊",
    "en": "Shared Layout Gallery",
    "aliases": [
      "FLIP 过渡",
      "共享元素动画",
      "展开详情画廊"
    ],
    "pattern": "Shared Element Transition · FLIP",
    "principle": "点击卡片时克隆其视觉层为 fixed 飞行元素摆到详情终点位，再用 WAAPI 反向施加 First-Inverted 位移/缩放补间（560ms），动画结束移除克隆；关闭沿原路径反向播放，配焦点圈闭与 animating 锁。"
  },
  "prompts": {
    "short": "做一个画廊：点击卡片后卡片视觉无缝飞大成详情弹层，关闭沿原路径飞回。原生 JS 用 FLIP 技术实现。",
    "standard": "用原生 JavaScript（Web Animations API）实现共享布局过渡：\n1. First：getBoundingClientRect 记录源卡片视觉层位置；Last：显示 overlay + 详情层后再读目标位置；Invert：克隆源为 position:fixed 元素放到 Last 位，从 translate(dx,dy) scale(sx,sy) 动画到 none（560ms cubic-bezier(0.16,1,0.3,1)），结束移除克隆；\n2. First/Last 之间必须 await 双 requestAnimationFrame 确保 overlay 完成布局再测量；\n3. 动画期间 animating 标志防重入；关闭时反向播放并恢复源卡片 visibility；\n4. 焦点管理：打开后 focus 到关闭按钮，Tab 在关闭/操作按钮间圈闭，Escape 与点遮罩均可关。",
    "refined": "可配置共享布局画廊：飞行 560ms cubic-bezier(0.16,1,0.3,1)、overlay 淡入 260ms + backdrop-filter blur(12px)、详情文案 240ms/360ms 浮现、reduced-motion 时时长降为 1ms。\n验收：① 快速连点卡片不会叠出两个飞行层；② 关闭后源卡片完整可见（visibility 已恢复）；③ Tab 焦点不出弹层；④ Escape、遮罩点击、关闭按钮三种途径都能收场。"
  },
  "knobs": [
    {
      "name": "飞行时长",
      "default": "560ms",
      "range": "300 – 800ms",
      "effect": "卡片展开/收回的整段节奏。"
    },
    {
      "name": "飞行缓动",
      "default": "cubic-bezier(0.16, 1, 0.3, 1)",
      "range": "ease-out 类曲线",
      "effect": "起步快收尾缓的\"编辑式\"手感。"
    },
    {
      "name": "遮罩淡入",
      "default": "260ms ease + blur(12px)",
      "range": "150 – 400ms",
      "effect": "详情层背后毛玻璃出现的速度。"
    },
    {
      "name": "文案浮现",
      "default": "opacity 240ms / transform 360ms 同曲线",
      "range": "150 – 500ms",
      "effect": "标题描述在飞行结束后上浮进场。"
    },
    {
      "name": "reduced-motion 时长",
      "default": "1ms",
      "range": "0 – 50ms",
      "effect": "减动效环境下直接开合、跳过几何过渡。"
    }
  ],
  "pitfalls": [
    "直接对 grid 里的卡片做 transform 展开会牵动整行布局——必须克隆为 position:fixed 的飞行层再动画。",
    "显示 overlay 后立刻 getBoundingClientRect，读到的是旧布局；要 await 双 requestAnimationFrame 后再测量。",
    "没有 animating 锁，动画中再点其他卡片会叠出两个飞行元素且状态互串。",
    "关闭时忘了把源卡片 visibility 恢复为 visible，动画结束卡片从网格里消失。",
    "克隆节点的 will-change: transform 没设，飞行途中每帧重排掉帧。",
    "Tab 焦点没圈闭，能穿透遮罩落到背后的网格卡片上。"
  ],
  "effectTags": [
    "FLIP",
    "共享元素",
    "展开",
    "画廊",
    "布局动画"
  ]
};
