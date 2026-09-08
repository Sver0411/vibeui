import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "极简登录页",
    "en": "Minimal Login Page",
    "aliases": [
      "登录注册页",
      "Auth 页面",
      "Glass Login"
    ],
    "pattern": "Auth · 居中卡片表单",
    "principle": "视口居中一张玻璃卡片，极光 blob 在底层缓慢漂移提供氛围；表单内联校验通过 aria-invalid 标红，密码可见性由按钮切换 input.type。"
  },
  "prompts": {
    "short": "做一个居中登录页：玻璃拟态卡片、邮箱+密码内联校验、密码可见性切换、背景柔和极光渐变。原生 HTML/CSS/JS，不要引入框架。",
    "standard": "用原生 HTML/CSS/JavaScript 实现单文件登录页：\n1. 视口居中一张玻璃卡片（backdrop-filter 模糊），页面底层两块彩色 blob 缓慢漂移；\n2. 提交时内联校验：邮箱正则、密码最短 8 位，错误写在字段下方并把输入框 aria-invalid 标红；\n3. 密码框右侧眼睛按钮切换 type=password/text 并同步 aria-pressed；\n4. 提交期间禁用按钮显示 loading，勿引入任何库。",
    "refined": "实现登录页：卡片宽 min(360px, 100%)、圆角 18px、backdrop-filter blur(18px) saturate(1.3)；主色 #0f766e，聚焦环 3px；输入框高 44px；密码最短 8 位。验收标准：① 校验失败时字段级错误可见且 aria-invalid 正确设置/清除；② 眼睛按钮切换后 aria-label 同步更新；③ 极光动画在 prefers-reduced-motion 下停止。"
  },
  "knobs": [
    {
      "name": "卡片宽度",
      "default": "min(360px, 100%)",
      "range": "300 – 480px",
      "effect": "登录卡片在桌面的视觉体量，移动端始终占满。"
    },
    {
      "name": "玻璃模糊强度",
      "default": "blur(18px) saturate(1.3)",
      "range": "10px – 30px",
      "effect": "卡片磨砂感强弱，越大越朦胧且性能开销越高。"
    },
    {
      "name": "主色",
      "default": "#0f766e",
      "range": "任意品牌色",
      "effect": "聚焦环、忘记密码链接、提交按钮悬停的品牌色。"
    },
    {
      "name": "极光 blob 透明度",
      "default": "0.42（blob 层整体）/ 0.2 与 0.16（单块）",
      "range": "0.1 – 0.6",
      "effect": "背景氛围浓淡，过高会干扰卡片可读性。"
    },
    {
      "name": "密码最短长度",
      "default": "8",
      "range": "6 – 12",
      "effect": "内联校验阈值，错误文案需同步修改。"
    }
  ],
  "pitfalls": [
    "玻璃卡片只写 backdrop-filter 忘加 -webkit-backdrop-filter，Safari 下退化成半透明白板。",
    "校验通过后只清了错误文案，忘了 removeAttribute(\"aria-invalid\")，红框一直残留。",
    "极光 blob 层没设 pointer-events: none，挡住下方内容的点击。",
    "提交后不禁用按钮，连点会触发多次伪请求；禁用后也别忘了结束后恢复文案与可用态。",
    "眼睛按钮只切 input.type 不同步 aria-pressed / aria-label，屏幕阅读器无法感知当前状态。"
  ],
  "effectTags": [
    "登录",
    "玻璃拟态",
    "表单校验",
    "极光背景",
    "响应式"
  ]
};
