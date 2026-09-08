import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "404 页面",
    "en": "404 Not Found Page",
    "aliases": [
      "错误页",
      "Not Found 落地页"
    ],
    "pattern": "Error Page · 巨型数字 + 站内搜索",
    "principle": "居中堆叠巨型 404 数字（中间 0 拆成独立 span 做 CSS 悬浮呼吸）、站内搜索框与双操作按钮；按 / 或 ⌘K 聚焦搜索，返回按钮优先 history.back()。"
  },
  "prompts": {
    "short": "做一个 404 页面：巨型数字中间的 0 轻微上下悬浮、带站内搜索框和返回/回首页按钮、顶部径向光晕。原生 HTML/CSS/JS 单文件。",
    "standard": "用原生 HTML/CSS/JavaScript 实现单文件 404 页：\n1. 居中竖排：巨型 404（clamp 字号，中间 0 用主题色且只对它施加 translateY 悬浮动画）、标题说明、搜索框、双按钮；\n2. 搜索框右侧放 kbd 徽标，按 / 或 Ctrl/Cmd+K 聚焦（输入中不劫持按键）；\n3. 提交搜索给演示提示文案；返回按钮在 history.length>1 时 history.back()；\n4. 数字动画在 prefers-reduced-motion 下停止。",
    "refined": "实现 404 页：数字字号 clamp(88px, 22vw, 150px)，0 悬浮周期 3.4s、幅度 10px；搜索框宽 min(320px, 84vw) 圆角 12px；主题色 #0f766e；顶部径向光晕 600px×300px。验收标准：① 输入框聚焦时按 / 不清空内容；② 无历史记录时返回按钮给出提示而非无响应；③ reduced-motion 下 0 静止、快捷键与按钮交互不变。"
  },
  "knobs": [
    {
      "name": "数字字号",
      "default": "clamp(88px, 22vw, 150px)",
      "range": "80px – 220px",
      "effect": "巨型数字的冲击力，小屏由 vw 段自动收缩。"
    },
    {
      "name": "悬浮动画周期",
      "default": "3.4s ease-in-out infinite",
      "range": "2s – 6s",
      "effect": "0 号上下呼吸的快慢，配合 translateY(-10px) 幅度。"
    },
    {
      "name": "搜索框宽度",
      "default": "min(320px, 84vw)",
      "range": "260px – 420px",
      "effect": "搜索输入区在页面中的占比。"
    },
    {
      "name": "主题色",
      "default": "#0f766e",
      "range": "任意品牌色",
      "effect": "数字 0、光晕、主按钮与聚焦环的统一色。"
    },
    {
      "name": "径向光晕尺寸",
      "default": "600px 300px at 50% 0%",
      "range": "400 – 900px",
      "effect": "顶部氛围光的覆盖范围与柔和度。"
    }
  ],
  "pitfalls": [
    "对整个 404 文本施加悬浮动画，导致三个字符一起动；应把 0 拆成独立 span 只动画它。",
    "按 / 聚焦前不检查 document.activeElement 是否是输入控件，用户正在打字时被劫持按键。",
    "返回按钮不看 history.length 直接 history.back()，无历史时点击毫无反馈。",
    "kbd 徽标绝对定位在输入框内但没设 pointer-events: none，点击徽标反而让输入框失焦。",
    "数字动画没有 prefers-reduced-motion 兜底，前庭敏感用户持续受到浮动干扰。"
  ],
  "effectTags": [
    "404",
    "悬浮呼吸",
    "径向光晕",
    "快捷键",
    "页面模板"
  ]
};
