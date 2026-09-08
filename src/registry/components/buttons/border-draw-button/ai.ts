import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "描边绘制按钮",
    "en": "Border Draw Button",
    "aliases": [
      "描边动画按钮",
      "画框按钮",
      "SVG Border Draw"
    ],
    "pattern": "Micro-interaction · SVG Stroke Draw",
    "principle": "按钮上叠一个全尺寸 SVG rect，pathLength=100 把周长归一化，hover 时 stroke-dashoffset 从 100 过渡到 0，描边像画笔一样绕一圈画出边框。"
  },
  "prompts": {
    "short": "做一个悬停时边框沿按钮轮廓画一圈的按钮，纯 CSS 用 SVG stroke-dashoffset 实现，不需要 JS。",
    "standard": "用纯 HTML/CSS（SVG）实现描边绘制按钮：\n1. 按钮内叠一个 position: absolute; inset: 0 的 SVG，rect 内缩 1px（x=1, width=calc(100% - 2px)）避免描边被裁，rx 与按钮圆角一致；\n2. rect 设 pathLength=\"100\"、stroke-dasharray: 100、初始 stroke-dashoffset: 100（完全隐藏）；\n3. hover 与 focus-visible 时 dashoffset 过渡到 0，transition stroke-dashoffset 0.7s cubic-bezier(0.22,1,0.36,1)；\n4. transition 写在 rect 基础态上（不要只写在 hover 态），离开时才有反向擦除动画；\n5. 不引入库、不写 JS。",
    "refined": "可配置描边绘制按钮：绘制时长 0.7s cubic-bezier(0.22,1,0.36,1)、描边 #26262b 宽 1.5、圆角 rx=10、触发条件 :hover 与 :focus-visible、按下时文字 opacity 0.7。验收：① 鼠标悬停描边从固定起点匀速画满一圈无缺口；② 移出时反向擦除而非瞬间消失；③ Tab 聚焦时同样触发（键盘可达）；④ 缩放窗口描边始终贴合按钮边缘。"
  },
  "knobs": [
    {
      "name": "绘制时长",
      "default": "stroke-dashoffset 0.7s cubic-bezier(0.22,1,0.36,1)",
      "range": "0.3s – 1.2s",
      "effect": "边框画完一圈的速度与缓动。"
    },
    {
      "name": "描边宽度",
      "default": "1.5",
      "range": "1 – 3",
      "effect": "边框线条粗细。"
    },
    {
      "name": "描边颜色",
      "default": "#26262b",
      "range": "任意 CSS 颜色",
      "effect": "画出的边框颜色。"
    },
    {
      "name": "圆角 rx",
      "default": "10",
      "range": "0 – 24",
      "effect": "rect 圆角，需与按钮视觉圆角一致。"
    },
    {
      "name": "触发方式",
      "default": ":hover 与 :focus-visible",
      "range": "hover / focus / 常显",
      "effect": "哪些交互状态触发绘制动画。"
    }
  ],
  "pitfalls": [
    "忘了 pathLength=\"100\"，dashoffset 就得按真实周长（随尺寸变化）计算，响应式下直接错位。",
    "rect 没内缩、SVG 没留溢出空间，描边一半被按钮边缘裁掉出现缺口。",
    "SVG rect 的 rx 和按钮圆角不一致，画出的框与按钮形状对不上。",
    "transition 只写在 :hover 选择器里，移出鼠标时边框瞬间消失而不是反向擦除。",
    "只绑定 hover 不加 :focus-visible，键盘用户完全看不到任何反馈。",
    "SVG 用默认 100% 尺寸但没设 width/height 属性，个别浏览器下 rect 的百分比宽高解析异常。"
  ],
  "effectTags": [
    "描边",
    "绘制",
    "悬停",
    "SVG",
    "纯 CSS"
  ]
};
