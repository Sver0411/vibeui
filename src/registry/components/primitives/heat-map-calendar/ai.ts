import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "贡献热力图",
    "en": "Contribution Heat Map / GitHub Graph",
    "aliases": [
      "热力图",
      "提交日历",
      "activity graph"
    ],
    "pattern": "DataViz · Calendar Heat Map",
    "principle": "CSS Grid 用 grid-auto-flow: column + 7 行让格子按列（周）填充，等级映射五档背景色；提示是 fixed 定位节点跟随 pointermove。"
  },
  "prompts": {
    "short": "做一个 GitHub 风格贡献热力图：列=周的 CSS Grid、五档绿色、悬浮跟随光标显示提交数。原生 JS。",
    "standard": "用原生 HTML/CSS/JavaScript 实现贡献热力图，不要引入库：\n1. 网格 display:grid + grid-auto-flow: column + grid-template-rows: repeat(7, 13px)，双重循环 20 周 × 7 天生成格子，按列自动成周；\n2. 数据等级 0–4 写入 data-level，CSS 映射五档色：#ebedf0 / #9be9a8 / #40c463 / #2da44e / #216e39；\n3. 悬浮提示用独立 fixed 节点：pointerenter 填文案、pointermove 按 clientX/Y 跟随（translate(-50%, -100% - 8px) 悬浮在上方）、pointerleave 隐藏；\n4. 底部汇总总提交数；外层横向滚动容器适配窄屏。",
    "refined": "参数：格子 13px、间距 3px、圆角 3px、移动端缩到 11px、20 周、五档色如上、提示淡入 0.1s、悬浮 scale(1.25) + 1.5px 描边。验收：① 月份/周末边界不串行（每列恒为 7 格）；② 提示框贴着光标上方且不闪烁；③ 窄屏时网格横向滚动而不是挤压变形；④ reduced-motion 下格子不再缩放但提示可用。"
  },
  "knobs": [
    {
      "name": "格子尺寸 --hm-cell",
      "default": "13px（≤480px 时 11px）",
      "range": "10px – 16px",
      "effect": "整图密度，需同步 7 行的 grid-template-rows。"
    },
    {
      "name": "网格间距",
      "default": "3px",
      "range": "2px – 5px",
      "effect": "格子之间的缝隙，过大会显得稀疏。"
    },
    {
      "name": "色阶",
      "default": "#ebedf0 / #9be9a8 / #40c463 / #2da44e / #216e39",
      "range": "5 档任意色",
      "effect": "0–4 级数据强度的视觉映射。"
    },
    {
      "name": "周数",
      "default": "20 周（WEEKS 变量）",
      "range": "8 – 53 周",
      "effect": "横向长度，配合滚动容器。"
    }
  ],
  "pitfalls": [
    "直接按日期从周日开始排格子但不处理月初对齐，第一列不满 7 格导致整列错位；本实现按周×天循环规避了该问题，若改成真实日期必须补齐首尾空白格。",
    "提示框放在每个格子内部做 absolute，边缘格子提示被裁剪；应挂 body 上用 fixed 定位。",
    "pointermove 里频繁读写 style 不加 will-change 或直接操作 transform，大量格子时跟随卡顿。",
    "格子用 div 无语义、无 tabindex/aria-label，键盘与读屏完全无法获取数据。",
    "色阶用 opacity 叠加同一绿色，在浅底上低档几乎不可见；应使用真实色阶色值。"
  ],
  "effectTags": [
    "热力图",
    "数据可视化",
    "CSS Grid",
    "悬浮提示"
  ]
};
