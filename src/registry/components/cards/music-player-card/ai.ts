import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "音乐播放器卡",
    "en": "Music Player Card",
    "aliases": [
      "播放器卡片",
      "黑胶播放器",
      "MP3 卡片"
    ],
    "pattern": "Media Player · Vinyl Spin",
    "principle": "rAF 循环用真实帧间隔 dt 累加播放位置（切后台回来不跳变），进度条 pointerdown 捕获拖拽 seek 且拖拽期间暂停推进；黑胶用 repeating-radial-gradient 画纹路，默认 paused、播放时才恢复 6s 旋转。"
  },
  "prompts": {
    "short": "做一张音乐播放器卡：渐变封面 + 旋转黑胶（播放时才转），进度条可拖拽可键盘 ±5 秒，播放/暂停/喜欢/切歌按钮齐全。原生 JS。",
    "standard": "用原生 HTML/CSS/JavaScript 实现音乐播放器卡：\n1. 封面 200px：双层 radial-gradient 光斑 + linear-gradient(135deg, #1e1b4b, #4c1d95, #7c3aed) 打底，黑胶 132px 用 repeating-radial-gradient(circle, #18181b 0 2px, #27272a 2px 4px) 画纹、中心 38px 渐变圆标；旋转动画 6s linear infinite 但 animation-play-state: paused，卡片加 .playing 才 running；\n2. 计时用 requestAnimationFrame：position += (now-lastTick)/1000，到总长 222s 自动暂停，切后台不跳变；\n3. 进度条 5px 轨 + 渐变填充，pointerdown setPointerCapture 拖拽 seek，dragging 标志暂停 rAF 推进；键盘 ArrowLeft/Right ±5s，aria-valuenow/valuetext 同步；\n4. 播放按钮 aria-pressed + aria-label 切换，切歌重置 position=0。",
    "refined": "可配置播放器卡：总长 TOTAL 222s、黑胶 132px / 6s 圈速、进度轨 5px 渐变 #7c3aed→#db2777、键盘步进 5s、封面渐变三色。\n验收：① 拖拽进度时计时暂停、松手继续且不回跳；② 黑胶静止时封面不转、播放时匀速；③ 切到后台 10 秒回来进度不跳变；④ 播放结束后再点播放从头开始；⑤ reduced-motion 下黑胶不转但计时交互正常。"
  },
  "knobs": [
    {
      "name": "总时长 TOTAL",
      "default": "222（3:42）",
      "range": "30 – 600s",
      "effect": "进度条比例与 fmt 的分秒换算基准。"
    },
    {
      "name": "黑胶旋转",
      "default": "6s linear infinite，默认 paused",
      "range": "3 – 12s",
      "effect": "唱片圈速；play-state 由 .playing 类控制。"
    },
    {
      "name": "进度轨 / 填充",
      "default": "轨 5px #eef1f5，填充渐变 #7c3aed→#db2777",
      "range": "4 – 8px，任意渐变",
      "effect": "进度条粗细与品牌色。"
    },
    {
      "name": "键盘步进",
      "default": "±5 秒",
      "range": "1 – 15s",
      "effect": "方向键 seek 的粒度。"
    },
    {
      "name": "封面渐变",
      "default": "radial 金 78%/18% + radial teal 15%/85% + linear(135deg, #1e1b4b, #4c1d95, #7c3aed)",
      "range": "任意多层数组",
      "effect": "封面氛围，光斑位置决定层次。"
    }
  ],
  "pitfalls": [
    "计时用 setInterval 固定步进，切后台被节流回来进度猛跳——必须用 rAF 的帧间隔 dt 累加。",
    "黑胶一直转而不绑 .playing 类的 animation-play-state，暂停时唱片还在匀速转。",
    "进度条没设 touch-action: none，触屏拖动时页面跟着滚。",
    "拖拽 seek 期间 rAF 循环还在推进 position，松手后进度被拉回——需要 dragging 标志互斥。",
    "播放结束只停了计时忘了复位按钮图标/aria-pressed，再点播放逻辑错乱。",
    "pointerup 只清 dragging 不处理 pointercancel，拖拽被来电打断后循环停在拖拽态。"
  ],
  "effectTags": [
    "播放器",
    "黑胶",
    "进度条",
    "rAF 计时"
  ]
};
