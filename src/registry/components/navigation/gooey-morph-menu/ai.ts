import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "黏液形变菜单",
    "en": "Gooey Morph Menu",
    "aliases": [
      "黏性菜单",
      "液态菜单",
      "SVG goo 菜单"
    ],
    "pattern": "Morphing Menu · SVG Gooey Filter",
    "principle": "触发块与面板是两个独立纯色块，共同包在 filter: url(#gm-goo) 的装饰层里，feGaussianBlur(8) 加 feColorMatrix(alpha 22/-10) 让二者靠近时黏连出液桥，交互层用 z-index 叠在滤镜之上保持文字清晰。"
  },
  "prompts": {
    "short": "做一个按钮展开成面板的黏液形变菜单：SVG goo 滤镜黏连过渡，带方向键循环导航与点击外部关闭。原生 JS 实现。",
    "standard": "用原生 HTML/CSS/JavaScript + SVG 滤镜实现黏液形变菜单：\n1. 滤镜链：feGaussianBlur stdDeviation 8 → feColorMatrix values 第四行 \"0 0 0 22 -10\" → feComposite atop；滤镜只作用于纯色装饰层（filter: url(#gm-goo)），真实按钮与菜单叠在上层；\n2. 展开：容器高度 62px→276px，面板 scaleY(0.18)→1 过渡 560ms cubic-bezier(0.16,1,0.3,1)，三颗液珠错峰延迟 0/34/68ms；\n3. 键盘：ArrowDown 打开并 180ms 后聚焦第一项，菜单内 ↑↓ 取模循环、Home/End 跳转、ESC 关闭归还焦点，开合切换菜单项 tabindex -1/0；\n4. document pointerdown 在 shell 外时关闭。不要引入库。",
    "refined": "可配置 goo 菜单：stdDeviation 8、feColorMatrix 系数 22/-10、展开 560ms、菜单项错峰 45/90ms、展开高度 276px。验收：① 触发块与面板拉开时先出现黏液桥再断裂；② 文字在滤镜层之外，Safari 下不糊；③ ↓↓↑ 循环正确且 ESC 后焦点回触发器；④ reduced-motion 下取消黏液桥与分段延迟但菜单仍可开合与键盘操作。"
  },
  "knobs": [
    {
      "name": "模糊半径 stdDeviation",
      "default": "8",
      "range": "5 – 15",
      "effect": "黏液桥的柔软度，越大越黏。"
    },
    {
      "name": "alpha 矩阵系数",
      "default": "22 / -10",
      "range": "15 – 40 / -12 – -6",
      "effect": "黏连阈值：倍率越大边缘越锐、液桥越细。"
    },
    {
      "name": "展开时长",
      "default": "560ms cubic-bezier(0.16,1,0.3,1)",
      "range": "350 – 800ms",
      "effect": "形变整体节奏。"
    },
    {
      "name": "珠子错峰延迟",
      "default": "0 / 34 / 68ms",
      "range": "0 – 120ms",
      "effect": "三颗液珠弹射的层次感。"
    },
    {
      "name": "展开高度",
      "default": "62px → 276px",
      "range": "200 – 360px",
      "effect": "面板展开后的最终尺寸。"
    }
  ],
  "pitfalls": [
    "把文字按钮直接放进 filter 容器，Safari/低端设备上文本发糊且滤镜逐帧重算卡顿；滤镜只应包纯色装饰层。",
    "feColorMatrix 系数与自己的 blur 半径不匹配（随手抄别人参数），液桥断不开或边缘出现锯齿。",
    "面板用 height 过渡但容器没控制溢出，色块在收起态仍溢出到页面其他区域。",
    "菜单项初始 opacity 0 却仍可 Tab 聚焦；需按开合把 tabindex 在 -1/0 间切换。",
    "给整个滤镜容器加 will-change: transform 导致 Safari 内存暴涨；只给三个液珠色块加即可。"
  ],
  "effectTags": [
    "黏液",
    "SVG 滤镜",
    "形变",
    "液态"
  ]
};
