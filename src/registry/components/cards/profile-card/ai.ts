import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "个人资料卡片",
    "en": "Profile Card",
    "aliases": [
      "团队卡片",
      "头像卡",
      "团队成员卡"
    ],
    "pattern": "Profile · Follow Toggle",
    "principle": "头像环用 conic-gradient 外层 + 3px padding 挖环、内层 3px 白 border 盖出环宽；关注按钮以 aria-pressed 为唯一状态源驱动样式切换，并同步解析/增减粉丝计数。"
  },
  "prompts": {
    "short": "做一张团队成员资料卡：渐变环头像（首字母）、职位、三项统计数据和可切换的关注按钮。视觉全部 CSS 生成，不用图片。",
    "standard": "用原生 HTML/CSS/JavaScript 实现个人资料卡：\n1. 头像 76px：外层 conic-gradient(from 210deg, #0f766e, #14b8a6, #5eead4, #0f766e) + padding 3px，内层圆加 3px 白 border 形成渐变环，中间放深色底首字母；\n2. 统计区 dl 三项横排，dd 用 tabular-nums；\n3. 关注按钮点击切换 aria-pressed=\"true/false\"，样式随属性选择器切换（Follow ↔ Following ✓），粉丝数 +/-1 后 toLocaleString 千分位；\n4. 全卡居中排版，按钮 0.2s ease 过渡。",
    "refined": "可配置资料卡：头像 76px 环宽 3px、conic-gradient from 210deg 四段 teal、按钮态 rgba(15,118,110,0.12) 底 + #0f766e 文字、统计间距 26px。\n验收：① 头像环宽度均匀无锯齿且不用任何图片；② 关注/取关后 aria-pressed 与按钮文案同步；③ 粉丝数 \"2,300\" 带逗号解析不 NaN；④ 连点按钮计数不错乱。"
  },
  "knobs": [
    {
      "name": "头像环渐变",
      "default": "conic-gradient(from 210deg, #0f766e, #14b8a6, #5eead4, #0f766e)",
      "range": "任意 conic/linear 色环",
      "effect": "头像描边环的配色与起始角。"
    },
    {
      "name": "环宽",
      "default": "外层 padding 3px + 内层 border 3px",
      "range": "2 – 5px",
      "effect": "渐变环粗细，两层必须同步调。"
    },
    {
      "name": "关注态配色",
      "default": "底 rgba(15,118,110,0.12)、文字 #0f766e、inset 描边 0.35",
      "range": "任意主题色",
      "effect": "已关注按钮的弱化强调样式。"
    },
    {
      "name": "统计项间距",
      "default": "26px",
      "range": "16 – 40px",
      "effect": "三项数据之间的呼吸感。"
    },
    {
      "name": "按钮过渡",
      "default": "0.2s ease",
      "range": "0 – 0.35s",
      "effect": "关注态切换的颜色/阴影过渡。"
    }
  ],
  "pitfalls": [
    "给外层直接加 border 想做渐变环——border 颜色无法用 conic-gradient，必须 padding 挖环 + 内层盖边。",
    "关注按钮只改文字忘了切换 aria-pressed，屏幕阅读器永远读\"未按下\"。",
    "粉丝数 parseInt 时忘了先去掉千分位逗号，第二次点击就 NaN。",
    "首字母头像字号固定，换成两字母缩写后溢出圆形。",
    "stats 用 div 堆而没用 dl/dt/dd 语义，数字与标签关系在无障碍树里断裂。"
  ],
  "effectTags": [
    "头像",
    "渐变环",
    "关注按钮",
    "资料"
  ]
};
