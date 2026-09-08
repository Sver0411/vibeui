import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "Coming Soon 页面",
    "en": "Coming Soon Landing Page",
    "aliases": [
      "预热页",
      "倒计时落地页",
      "Teaser Page"
    ],
    "pattern": "Teaser Landing · 倒计时 + 通知表单",
    "principle": "径向光晕背景上居中徽章+大标题+四格倒计时+邮箱表单；倒计时目标取固定日期（2026-12-31 +08:00），已过期自动顺延 30 天保证演示永远有数，setInterval 每秒刷新且数字用 tabular-nums 防跳动。"
  },
  "prompts": {
    "short": "做一个产品预热落地页：徽章+大标题、天/时/分/秒四格倒计时（每秒刷新、过期自动顺延）、邮箱通知表单（带格式校验）。原生 HTML/CSS/JS 单文件。",
    "standard": "用原生 HTML/CSS/JavaScript 实现单文件 Coming Soon 页：\n1. 居中竖排：徽章 pill、clamp 大标题、四格倒计时卡（白底圆角带阴影）、邮箱表单（输入+按钮横排）；\n2. 倒计时目标用显式时区字符串（如 2026-12-31T00:00:00+08:00），过期则 target = 当前时间 + 30 天顺延；\n3. setInterval 1000ms 重算天/时分/秒并 pad 两位，数字 font-variant-numeric: tabular-nums；\n4. 邮箱正则校验，失败输入框加 is-error 红框并写提示，成功给绿色确认文案并清空输入。",
    "refined": "实现 Coming Soon 页：标题 clamp(28px, 6vw, 44px)；倒计时格 min-width 64px、圆角 14px、数字 26px 主题色 #0f766e；表单宽 min(360px, 84vw)；480px 以下格子缩为 56px/20px、表单转竖排。验收标准：① 每秒只改文本不重排布局，无宽度抖动；② 系统时间晚于目标日期后倒计时不出现负数；③ 非法邮箱提交后焦点回到输入框且输入时错误态立即清除。"
  },
  "knobs": [
    {
      "name": "目标日期",
      "default": "2026-12-31T00:00:00+08:00",
      "range": "任意未来 ISO 日期",
      "effect": "倒计时终点，过期后自动顺延 30 天。"
    },
    {
      "name": "倒计时格尺寸",
      "default": "min-width 64px，数字 26px，圆角 14px",
      "range": "格宽 56 – 88px",
      "effect": "四格倒计时的体量，480px 以下自动缩小。"
    },
    {
      "name": "主题色",
      "default": "#0f766e",
      "range": "任意品牌色",
      "effect": "徽章、倒计时数字、按钮与聚焦环的统一色。"
    },
    {
      "name": "背景光晕",
      "default": "700×340 顶部 teal 10% + 500×260 右下紫 8%",
      "range": "透明度 4% – 15%",
      "effect": "页面氛围浓淡，过高影响表单可读性。"
    },
    {
      "name": "刷新间隔",
      "default": "1000ms（每秒）",
      "range": "500 – 2000ms",
      "effect": "倒计时更新频率，秒级展示固定 1000ms。"
    }
  ],
  "pitfalls": [
    "目标日期用 new Date(\"2026-12-31\") 解析成 UTC 零点，各地时区倒计时差 8 小时；应写显式时区偏移。",
    "倒计时过期后不处理，diff 为负显示 00 或直接 NaN；应像本模板顺延或切换为「已上线」文案。",
    "数字不用 tabular-nums，每秒跳字时格子宽度抖动，整行布局跟着晃。",
    "邮箱校验正则过严（如强制 TLD 两位以上）拒绝合法地址，或干脆不校验直接提示成功。",
    "四格倒计时在小屏不缩小 min-width，375px 屏挤不下换行错位；480px 以下应同步缩字。",
    "setInterval 写在模块顶层且页面卸载不清理，SPA 场景计时器泄漏。"
  ],
  "effectTags": [
    "倒计时",
    "预热落地页",
    "通知表单",
    "径向光晕",
    "每秒刷新"
  ]
};
