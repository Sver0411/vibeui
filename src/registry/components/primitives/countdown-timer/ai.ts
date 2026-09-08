import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "倒计时",
    "en": "Countdown Timer",
    "aliases": [
      "倒计时器",
      "秒杀倒计时",
      "countdown"
    ],
    "pattern": "Countdown · Flip Digits",
    "principle": "setInterval 每秒把剩余时间拆成天/时/分/秒写入对应格子；数字变化时给旧值加向上退出动画、新值加进入动画，用 animationend 清理；剩余 ≤10 秒时容器加紧急态类变红脉冲。"
  },
  "prompts": {
    "short": "做一个四格倒计时组件：天/时/分/秒，数字变化带翻牌动画，最后 10 秒变红脉冲，到 0 显示结束态。",
    "standard": "用原生 JS 实现倒计时：\n1. 结构：四个 .cd-cell（数值 + 标签），目标时间 data-deadline 属性传入；\n2. 每帧用 setInterval(…, 250) 计算 diff（250ms 采样避免跳秒漂移），补零写入单元格；\n3. 翻牌：值变化时给 .cd-value 加 .is-tick 类触发 translateY 退出/进入动画，animationend 移除类；同一帧只动变化的格子；\n4. 紧急态：diff ≤ 10s 时容器加 .is-urgent——数值变红、卡片 1s 循环 box-shadow 脉冲；\n5. 到 0：clearInterval、显示「已结束」并触发一次庆祝动画；\n6. 页面 visibilitychange 回来时立即重算，防止后台节流导致跳变。",
    "refined": "实现 CountDown 类：constructor(targetDate, onChange, onFinish)，start/stop/destroy 生命周期；内部用 rAF + 时间戳比较而非 setInterval 驱动（对齐系统时钟，不受 setInterval 漂移影响）；数值更新走 setText(cell, value) 帮助函数——值相同直接跳过，不同才播翻牌；暴露 CSS 变量 --cd-accent、--cd-urgent 供换肤。验收：① 切后台再回来数字正确；② 连续翻牌动画不错位；③ 到 0 精确触发一次 finish。"
  },
  "knobs": [
    {
      "name": "采样间隔 tickMs",
      "default": "250ms",
      "range": "100ms – 1000ms",
      "effect": "数字刷新频率，250ms 保证秒位不掉帧。"
    },
    {
      "name": "紧急阈值 urgentAt",
      "default": "10s",
      "range": "5s – 60s",
      "effect": "进入红色脉冲态的剩余时间。"
    },
    {
      "name": "翻牌时长 tickDuration",
      "default": "320ms",
      "range": "200ms – 500ms",
      "effect": "数字动画时长，需小于采样间隔。"
    }
  ],
  "pitfalls": [
    "用 setInterval(1000) 会随后台节累积漂移——必须用目标时间戳差值计算剩余。",
    "切后台回来浏览器节流让 setInterval 掉拍，visibilitychange 时要立即重算。",
    "每帧全量重写四个格子会触发所有格子翻牌动画——只在值变化时更新。",
    "到 0 后 interval 不清理会负数狂奔，onFinish 必须只触发一次。",
    "补零用 padStart(2, '0')，天位按实际位数不补零。"
  ],
  "effectTags": [
    "倒计时",
    "翻牌",
    "定时"
  ]
};
