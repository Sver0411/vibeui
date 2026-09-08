import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "提示条",
    "en": "Callout / Alert",
    "aliases": [
      "警告条",
      "通知条",
      "alert",
      "callout"
    ],
    "pattern": "Callout · Inline Feedback Banner",
    "principle": "语义档位只换两处 CSS 变量（--co-accent 与 --co-bg），结构固定为左色条、图标、标题正文与关闭按钮；关闭时加类名播放折叠动画后移除节点，aria-live 让读屏软件感知。"
  },
  "prompts": {
    "short": "做一组提示条组件：信息/成功/警告/危险四档，左色条+图标+标题正文，可关闭，关闭时播放折叠动画。",
    "standard": "用原生 HTML/CSS/JS 实现四档提示条：\n1. 结构：role=\"alert\" 容器内放图标、标题 + 正文、关闭按钮；左侧 3px 色条用 border-left 或伪元素；\n2. 四档配色只换 CSS 变量：info 蓝 #2563eb、success 绿 #16a34a、warning 琥珀 #d97706、danger 红 #dc2626，背景用同色 8% 透明度；\n3. 关闭按钮点击后加 .is-leaving：max-height 与 opacity 过渡 0.25s 后 remove 节点（transitionend 兜底 setTimeout）；\n4. 容器加 aria-live=\"polite\"（danger 用 role=\"alert\"），关闭按钮 aria-label=\"关闭提示\"；\n5. prefers-reduced-motion 时去掉折叠动画直接移除。",
    "refined": "实现一个可复用的 Callout 工厂函数 createCallout({ variant, title, body, dismissible })：\n- variant 四档，颜色全部走 CSS 变量，调用方可整体换肤；\n- 出场动画：高度 0→auto 用 grid-template-rows 0fr→1fr 技巧，避免 JS 算高度；\n- 无障碍：danger 档用 role=\"alert\" 立即播报，其余 aria-live=\"polite\"；关闭按钮是唯一 tab 停靠点，Esc 也可关闭；\n验收：① 四档切换只改变量；② 关闭动画流畅无跳变；③ 读屏与键盘路径完整。"
  },
  "knobs": [
    {
      "name": "色条宽度 accentWidth",
      "default": "3px",
      "range": "2px – 5px",
      "effect": "左色条视觉权重，4px 以上适合深色主题。"
    },
    {
      "name": "背景透明度 bgAlpha",
      "default": "0.08",
      "range": "0.04 – 0.14",
      "effect": "档位底色浓淡，0.1 以上建议正文用深色保证对比。"
    },
    {
      "name": "折叠时长 leaveDuration",
      "default": "250ms",
      "range": "150ms – 400ms",
      "effect": "关闭动画时长，过长会显得拖沓。"
    }
  ],
  "pitfalls": [
    "四档各写一套样式是维护灾难——只应切换 CSS 变量。",
    "关闭动画直接 display:none 会跳变，必须先量高度或用 0fr→1fr 技巧。",
    "忘记 aria-live，动态插入的提示读屏软件完全感知不到。",
    "warning 用红色系会与 danger 混淆，琥珀色才是惯例。",
    "正文颜色直接用档位色会不够对比，正文保持中性深色。"
  ],
  "effectTags": [
    "提示条",
    "警告",
    "反馈"
  ]
};
