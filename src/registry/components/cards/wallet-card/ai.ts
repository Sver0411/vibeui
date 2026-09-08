import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "钱包卡",
    "en": "Wallet Card",
    "aliases": [
      "余额卡",
      "资产卡",
      "balance card"
    ],
    "pattern": "Wallet · Balance Hero",
    "principle": "深色渐变卡面（多径向光斑叠加制造质感），余额数字用 rAF 缓动从 0 滚动到目标值；卡号默认 6222 •••• •••• 1234 遮罩，眼睛图标切换显示真实卡号。"
  },
  "prompts": {
    "short": "做一张深色渐变钱包卡：余额大数字滚动入场、遮罩卡号可切换显示、收入/支出两个玻璃质感快捷按钮。",
    "standard": "用原生 JS 实现钱包卡：\n1. 卡面：linear-gradient(135deg,#1e1b4b,#0f172a) 叠加两个 radial-gradient 光斑（rgba 白 4-6%），圆角 20px；\n2. 余额：¥12,480.50 用 toLocaleString 格式化，入场用 rAF 从 0 缓动滚到位（easeOutCubic，1.2s）；\n3. 卡号：默认 •••• 遮罩 + 眼睛按钮切换真实卡号（font-variant-numeric: tabular-nums 防跳动）；\n4. 快捷按钮：两个半透明白底（rgba(255,255,255,.12) + backdrop-blur）的「收入 / 支出」按钮，hover 提亮；\n5. 顶部行：钱包名 + Visa 标识右对齐。",
    "refined": "扩展为可配置资产卡：支持多币种（汇率换算切换）、余额数字 hover 微倾 3D（transform perspective）、金额变动红绿闪烁提示、卡面主题（靛蓝/墨绿/黑金）经 CSS 变量切换；安全上卡号显示 3 秒后自动重新遮罩。验收：① 数字滚动不跳变；② 切换卡号宽度不变；③ 深底文字对比度 ≥4.5:1。"
  },
  "knobs": [
    {
      "name": "渐变方向 gradient",
      "default": "135deg",
      "effect": "卡面主渐变角度。"
    },
    {
      "name": "滚动时长 rollMs",
      "default": "1200ms",
      "range": "600 – 2000ms",
      "effect": "余额入场滚动动画时长。"
    },
    {
      "name": "自动遮罩 autoMaskMs",
      "default": "3000ms",
      "effect": "卡号显示后自动恢复遮罩的延时。"
    }
  ],
  "pitfalls": [
    "余额用 toFixed 拼字符串，千分位丢失——toLocaleString 才对。",
    "数字滚动用 setInterval 固定步长，结束时猛跳——用缓动插值。",
    "切换卡号时字宽变化导致布局抖动——tabular-nums + 等宽占位。",
    "深色卡面上灰字对比度不足，正文至少 #cbd5e1。",
    "光斑用大图背景，改用 CSS 渐变零请求。"
  ],
  "effectTags": [
    "钱包",
    "余额",
    "数字动画"
  ]
};
