import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "气泡提示",
    "en": "CSS Tooltip",
    "aliases": [
      "气泡",
      "悬浮提示",
      "tooltip"
    ],
    "pattern": "Tooltip · Overlay Hint",
    "principle": "提示本体是 ::after（content: attr(data-tip)），箭头是旋转 45° 的 6px ::before 方块；hover 与 :focus-visible 双通道触发，opacity+visibility 过渡淡入。"
  },
  "prompts": {
    "short": "做一个纯 CSS 四方向 tooltip：data-tip 属性驱动、带小箭头、hover 和键盘聚焦都能触发。",
    "standard": "用纯 CSS 实现 tooltip（不写 JS、不引库）：\n1. 文案放触发元素的 data-tip 属性，::after 用 content: attr(data-tip) 渲染，黑底白字 12px、圆角 6px、white-space: nowrap；\n2. 箭头是 ::before 的 6px 方块 rotate(45deg)，与气泡同色，位于气泡与触发元素交界处；\n3. 默认 top 方向，data-tip-pos=\"right|bottom|left\" 切换四方向定位（偏移 10px/14px）；\n4. 触发用 :hover 与 :focus-visible 双选择器，过渡 opacity 0.18s + 轻微位移 2px + visibility。",
    "refined": "参数：淡入 0.18s ease、气泡底色 #18181b、padding 7px 10px、箭头 6px rotate(45deg)、方向偏移 10px（左右）/ 14px（上下）、入场位移 2px。验收：① 键盘 Tab 到按钮即出提示；② 四方向箭头都精确贴合气泡边缘无缺角；③ 快速划过多个按钮不残留；④ 提示 pointer-events: none 不挡点击。"
  },
  "knobs": [
    {
      "name": "淡入时长",
      "default": "0.18s ease",
      "range": "0.1s – 0.3s",
      "effect": "出现/消失速度，含 2px 入场位移。"
    },
    {
      "name": "方向偏移",
      "default": "上下 14px / 左右 10px",
      "range": "8px – 20px",
      "effect": "气泡与触发元素的距离，需容纳箭头。"
    },
    {
      "name": "箭头尺寸",
      "default": "6px 方块 rotate(45deg)",
      "range": "5px – 9px",
      "effect": "箭头视觉大小，对角线才是可见高度。"
    },
    {
      "name": "气泡配色",
      "default": "#18181b 底 / #fafafa 字，12px",
      "range": "任意色值",
      "effect": "提示底色文字色与字号。"
    }
  ],
  "pitfalls": [
    "只写 :hover 触发，键盘用户永远看不到提示；必须加 :focus-visible。",
    "visibility 不参与过渡或没写，隐藏态仍拦截（或淡出时立刻消失没有退场）。",
    "箭头只 rotate(45deg) 忘了 translate(-50%, -50%) 定位，箭头跑偏不贴合气泡。",
    "气泡没 pointer-events: none，移向气泡的瞬间 tooltip 闪烁消失。",
    "四方向定位只改了 ::after 忘了同步 ::before 箭头位置，箭头留在默认方向。"
  ],
  "effectTags": [
    "悬浮提示",
    "纯 CSS",
    "四方向",
    "键盘可达"
  ]
};
