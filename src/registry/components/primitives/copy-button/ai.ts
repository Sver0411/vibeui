import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "复制按钮",
    "en": "Copy Button / Copy to Clipboard",
    "aliases": [
      "剪贴板按钮",
      "代码复制",
      "copy to clipboard"
    ],
    "pattern": "Action · Clipboard Feedback",
    "principle": "优先 navigator.clipboard.writeText，非安全上下文回退隐藏 textarea + execCommand；成功后切到 is-copied 态换对勾，定时 1.6s 复原。"
  },
  "prompts": {
    "short": "做一个一键复制按钮：Clipboard API 优先、失败回退 execCommand，成功换对勾 1.6s 恢复。原生 JS。",
    "standard": "用原生 HTML/CSS/JavaScript 实现复制按钮，不要引入库：\n1. window.isSecureContext 且存在 navigator.clipboard 时用 writeText；否则创建 opacity:0 的 fixed textarea，select 后 execCommand(\"copy\")，finally 里移除节点；\n2. 成功后加 is-copied 类：复制图标 display:none、预埋的对勾 SVG 显示并播 0.2s pop 动画，文字改「已复制」；\n3. setTimeout 1600ms 后移除类恢复，重复点击要 clearTimeout 防串；\n4. 结果写入视觉隐藏的 aria-live 节点，失败也播报。",
    "refined": "参数：恢复延时 1600ms、active 按压缩放 scale(0.95)（0.12s）、成功色 #16a34a + 底色 #f0fdf4、对勾 pop 动画 0.2s cubic-bezier(0.22, 1, 0.36, 1)（scale 0.6→1）。验收：① http 非安全上下文仍能复制（走 fallback）；② 1.6s 内连点不会提前复原也不会闪烁；③ 复制失败时 aria-live 播报「复制失败」；④ reduced-motion 下对勾直接显示无动画。"
  },
  "knobs": [
    {
      "name": "成功态时长",
      "default": "1600ms",
      "range": "1000ms – 3000ms",
      "effect": "对勾与「已复制」停留多久后恢复。"
    },
    {
      "name": "按压反馈",
      "default": "active 时 scale(0.95)，0.12s",
      "range": "0.9 – 0.98",
      "effect": "点击瞬间的下沉手感。"
    },
    {
      "name": "成功配色",
      "default": "#16a34a 文字 + #f0fdf4 底色",
      "range": "任意色值",
      "effect": "is-copied 态的边框、文字与背景。"
    },
    {
      "name": "对勾弹入",
      "default": "0.2s cubic-bezier(0.22, 1, 0.36, 1)",
      "range": "0.15s – 0.3s",
      "effect": "对勾从 scale 0.6 放大到 1 的速度。"
    }
  ],
  "pitfalls": [
    "只在 https 上测过，忘记非安全上下文 navigator.clipboard 为 undefined，必须先判 isSecureContext 再走 execCommand 回退。",
    "回退方案里 textarea 忘了 fixed + opacity:0，页面会闪一下滚动跳动。",
    "成功态用 setTimeout 恢复但没 clearTimeout，快速连点时上一次的定时器会提前把状态打回。",
    "对勾只改 visibility 没有 pop 动画，状态切换显得生硬；或者忘记预埋 SVG 导致成功时才插入出现延迟。",
    "漏了 aria-live 播报，读屏用户不知道复制是否成功。"
  ],
  "effectTags": [
    "复制",
    "剪贴板",
    "成功反馈",
    "工具按钮"
  ]
};
