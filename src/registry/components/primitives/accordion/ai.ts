import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "手风琴",
    "en": "Accordion",
    "aliases": [
      "折叠面板",
      "展开收起",
      "Collapsible"
    ],
    "pattern": "Disclosure · Accordion",
    "principle": "面板用 display:grid + grid-template-rows 0fr→1fr 过渡实现高度自适应展开，内层必须 overflow:hidden；JS 只切换 aria-expanded 与 open 类。"
  },
  "prompts": {
    "short": "做一个手风琴：内容高度自适应展开动画，支持单开/多开，aria 语义完整。原生 JS。",
    "standard": "用原生 HTML/CSS/JavaScript 实现手风琴，不要引入库：\n1. 展开动画用 grid-template-rows: 0fr → 1fr 的过渡（不要用 max-height 猜高度），面板内容包一层 overflow:hidden 的内层 div；\n2. 触发器是 button，切换时同步 aria-expanded，面板同步 aria-hidden；\n3. 单开模式：打开一项前先把其它展开项收起（可勾选的复选框切换模式）；\n4. chevron 图标 transition rotate 0→180deg 指示状态，展开项标题换强调色。",
    "refined": "参数：展开 0.24s cubic-bezier(0.22, 1, 0.36, 1)、chevron 旋转 0.2s ease、面板 padding 13px 12px、列表圆角 14px、第一项默认展开。验收：① 内容长度不同的项都能平滑展开不跳动；② 快速连点同一项动画不卡死；③ 单开模式下旧项收起与新项展开同时进行；④ 读屏读得出「已展开/已折叠」（aria-expanded + aria-hidden 同步）。"
  },
  "knobs": [
    {
      "name": "展开时长",
      "default": "0.24s cubic-bezier(0.22, 1, 0.36, 1)",
      "range": "0.15s – 0.4s",
      "effect": "grid-template-rows 过渡的速度与缓动。"
    },
    {
      "name": "chevron 旋转",
      "default": "rotate(180deg)，0.2s ease",
      "range": "90° / 180°",
      "effect": "箭头指示角度与旋转速度。"
    },
    {
      "name": "触发器内边距",
      "default": "13px 12px",
      "range": "10px – 18px",
      "effect": "每项标题行的行高与可点区域。"
    },
    {
      "name": "默认模式",
      "default": "单开（多开由复选框切换）",
      "range": "单开 / 多开",
      "effect": "打开新项时是否收起其它项，script.js 里由 multiBox.checked 决定。"
    }
  ],
  "pitfalls": [
    "grid-template-rows 0fr→1fr 展开时忘了给内层包 overflow:hidden，内容在动画期间溢出面板外。",
    "在 .ac-body 上直接写 padding，收起时 0fr 压不掉 padding 导致底部留白抖动（应展开态才加 padding-bottom）。",
    "用 max-height 猜高度做动画，内容一长就被截断或动画节奏忽快忽慢。",
    "JS 只切 class 不同步 aria-expanded/aria-hidden，读屏状态错乱。",
    "单开模式先开后收的顺序写反，出现两项同时展开的中间态。"
  ],
  "effectTags": [
    "折叠展开",
    "高度自适应",
    "FAQ",
    "无障碍"
  ]
};
