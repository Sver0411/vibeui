import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "播客卡",
    "en": "Podcast Card",
    "aliases": [
      "单集卡",
      "音频卡",
      "episode card"
    ],
    "pattern": "Podcast · Episode Player Row",
    "principle": "左封面右信息的横向卡；播放按钮在播放/暂停双态间切换（SVG 交替显示），进度条由 rAF 按剩余时间推进（演示用模拟），倍速按钮循环 1x→1.25x→1.5x→2x。"
  },
  "prompts": {
    "short": "做一张播客单集卡：渐变封面字标、圆形播放/暂停按钮、可点击跳转的进度条、剩余时长与 1x/1.5x/2x 倍速切换。",
    "standard": "用原生 JS 实现播客卡：\n1. 结构：56px 渐变封面（大字标）+ 信息区（单集标题 + 节目名 + 进度行）+ 播放按钮（44px 圆形主色）；\n2. 播放切换：is-playing 类控制 SVG 播放三角/暂停双杠交替（display 切换），按钮 aria-label 同步「播放/暂停」；\n3. 进度：总长 data-duration 秒，rAF 每 250ms 推进 rate 倍；进度条容器 click 按比例 seek；拖拽可后续加；\n4. 时间显示：左侧已播 mm:ss / 右侧 -剩余 mm:ss，tabular-nums；\n5. 倍速按钮：循环 [1, 1.25, 1.5, 2]，文字显示 1.5x；\n6. 播完自动归位。",
    "refined": "扩展多卡互斥：同一列表同时只有一张在播（播 A 暂停 B）；播放状态存 localStorage 断点续播；波形条替代纯色进度条（随机高度柱列，已播部分主色）；支持空格键快捷播放。验收：① 快速连点不乱；② seek 后时间即时正确；③ 双卡状态互斥可靠。"
  },
  "knobs": [
    {
      "name": "进度条高 barH",
      "default": "5px",
      "range": "4 – 8px",
      "effect": "进度条粗细。"
    },
    {
      "name": "推进精度 tickMs",
      "default": "250ms",
      "range": "100 – 500ms",
      "effect": "时间与进度刷新频率。"
    },
    {
      "name": "默认倍速 rate",
      "default": "1x",
      "range": "1 – 2x",
      "effect": "初始播放速度。"
    }
  ],
  "pitfalls": [
    "播放/暂停两个 SVG 同时渲染忘记切 display，图标重叠。",
    "setInterval 固定 +1s 推进，倍速与后台节流都出错——用时间戳差值 × rate。",
    "进度条 click 的 offsetX 在有边距容器里错位，用 getBoundingClientRect 换算。",
    "剩余时间显示负数——播放结束要 clamp。",
    "倍速按钮没有 aria-label，读屏只念「按钮」。"
  ],
  "effectTags": [
    "播客",
    "播放",
    "进度"
  ]
};
