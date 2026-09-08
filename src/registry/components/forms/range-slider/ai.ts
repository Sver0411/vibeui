import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "区间滑块",
    "en": "Range Slider",
    "aliases": [
      "双端滑块",
      "价格区间选择",
      "Dual Range Slider"
    ],
    "pattern": "Slider · Pointer Events Drag",
    "principle": "拇指是绝对定位的 button[role=slider]：pointerdown 用 setPointerCapture 锁定指针，pointermove 把 clientX 反算成轨道数值，先按 step 四舍五入吸附再 clamp；双端实例互设 peer，clamp 时保证两端至少差一个 step。"
  },
  "prompts": {
    "short": "做一个滑块：支持单值和双端区间两种形态，可拖可键盘操作，双端自动防交叉。原生 JS 实现，不用 input[type=range]。",
    "standard": "用原生 HTML/CSS/JavaScript 实现滑块（button[role=slider] + 绝对定位，不用 input[type=range]）：\n1. thumb 上 pointerdown 调 setPointerCapture，pointermove 里用 getBoundingClientRect 把 clientX 反算为数值；\n2. 数值先按 step 四舍五入吸附再 clamp 到 [min,max]；双端区间两实例互设 peer，min 端 clamp 上限为 peer 值 - step；\n3. 键盘：←↓ -step、→↑ +step、PageUp/Down ±5step、Home/End 到极值，全部 preventDefault；\n4. 每次变更同步 aria-valuenow 与格式化的 aria-valuetext；拖拽中给容器加 is-dragging 关闭填充条过渡。不要引入任何库。",
    "refined": "可配置区间滑块：单值 min 0 / max 100 / 初值 40；区间 min 0 / max 1000 / step 10 / 初值 120–680 并格式化为 ¥xx – ¥xx；步进刻度形态 step 25；轨道高 6px、拇指 22px、主题色 #0f766e。验收：① 双端拖到重叠时自动卡在对方 ±step；② 纯键盘可完成全部操作且 aria-valuetext 同步；③ 移动端拖动不滚动页面（touch-action: none）；④ pointercancel 后 is-dragging 被移除。"
  },
  "knobs": [
    {
      "name": "步长 step",
      "default": "10（区间）/ 25（刻度）",
      "range": "1 – 100",
      "effect": "拖拽吸附粒度与键盘单步增量。"
    },
    {
      "name": "数值范围 min/max",
      "default": "0 – 1000（区间）",
      "range": "自定义",
      "effect": "轨道两端代表的实际值。"
    },
    {
      "name": "轨道粗细",
      "default": "6px",
      "range": "4 – 10px",
      "effect": "轨道视觉重量。"
    },
    {
      "name": "拇指尺寸",
      "default": "22px",
      "range": "18 – 28px",
      "effect": "拖拽热区与 hover/active 放大基数。"
    },
    {
      "name": "主题色",
      "default": "#0f766e",
      "range": "任意色值",
      "effect": "填充条、拇指边框与焦点环颜色。"
    }
  ],
  "pitfalls": [
    "用 mousemove 而非 Pointer Events + setPointerCapture，指针一移出拇指拖拽就中断。",
    "忘了在滑块容器设 touch-action: none，移动端拖拇指时页面跟着滚动。",
    "双端区间没做防交叉 clamp，min 能拖到 max 右边导致区间逻辑崩坏。",
    "键盘处理漏了 PageUp/PageDown/Home/End，也没对方向键 preventDefault，页面随按键滚动。",
    "拖动时填充条还带着 transition，视觉滞后跟不上手指；应在 is-dragging 期间关闭过渡。",
    "只更新 aria-valuenow 不更新 aria-valuetext，读屏用户听不到格式化后的值（如 ¥120）。"
  ],
  "effectTags": [
    "滑块",
    "拖拽",
    "区间选择",
    "步进",
    "键盘可达"
  ]
};
