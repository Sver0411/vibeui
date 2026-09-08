import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "页面启动加载",
    "en": "Page Splash Loader",
    "aliases": [
      "启动屏",
      "开屏加载",
      "Splash Screen"
    ],
    "pattern": "Splash Screen · Staged Fake Progress",
    "principle": "全屏 fixed 启动层按预设阶段推进分段进度，走完后设 data-done 触发 opacity+visibility 双过渡淡出并交接 aria-hidden。"
  },
  "prompts": {
    "short": "做一个全屏启动加载屏：Logo 呼吸动画加分段进度条，加载完淡出显示真实页面。原生 HTML/CSS/JS。",
    "standard": "用原生 HTML/CSS/JavaScript 实现页面启动加载：\n1. position: fixed; inset: 0 的启动层，含 Logo（2s scale 1→0.92 呼吸）、品牌文案、180px 分段进度条与状态文案；\n2. 进度按阶段数组推进（如 18→46→74→100），每阶段 620ms，fill 宽度带 0.25s 过渡；\n3. 完成后 500ms 设 data-done=\"true\"，用 opacity+visibility 0.45s 双属性淡出（必须同时设 visibility，否则残留层挡住点击）；\n4. 同步把真实页面的 aria-hidden 切为 false；\n5. 原生实现，不引入库。",
    "refined": "可配置启动屏：阶段 [18, 46, 74, 100] 间隔 620ms、淡出 opacity+visibility 0.45s ease、进度条 180px×3px 圆角 999px、Logo 呼吸 pl-breathe 2s ease-in-out。验收：① 阶段值单调递增不回退；② 淡出后启动层 visibility:hidden 不再拦截任何点击；③ reduced-motion 下 Logo 停止呼吸、淡出缩短到 0.2s。"
  },
  "knobs": [
    {
      "name": "阶段进度数组",
      "default": "[18, 46, 74, 100]",
      "range": "任意递增序列",
      "effect": "分段推进的节奏与文案切换点。"
    },
    {
      "name": "阶段间隔",
      "default": "620ms",
      "range": "200ms – 1500ms",
      "effect": "每段进度停留多久，整体加载时长。"
    },
    {
      "name": "淡出过渡",
      "default": "opacity + visibility 0.45s ease",
      "range": "0.2s – 1s",
      "effect": "启动屏交接给页面的速度。"
    },
    {
      "name": "进度条规格",
      "default": "180px × 3px, fill #26262b",
      "range": "宽 120–320px",
      "effect": "进度条的长度与存在感。"
    },
    {
      "name": "Logo 呼吸",
      "default": "pl-breathe 2s ease-in-out（scale 1→0.92, opacity 1→0.7）",
      "range": "1.5s – 3s",
      "effect": "等待期间的品牌动效节奏。"
    }
  ],
  "pitfalls": [
    "淡出只把 opacity 设为 0 不设 visibility: hidden，透明层继续挡在页面上拦截所有点击。",
    "阶段数组里的进度值不单调递增，进度条出现倒退穿帮。",
    "进度长期卡在某个百分比不往上走，用户以为死机——假进度要么封顶 90% 等真实事件，要么按阶段推进。",
    "漏掉 prefers-reduced-motion 降级，Logo 呼吸与长淡出都应收敛。",
    "交接时忘记把真实页面的 aria-hidden 切回 false，屏幕阅读器读到的是空页面。"
  ],
  "effectTags": [
    "加载",
    "启动屏",
    "全屏",
    "淡出",
    "品牌"
  ]
};
