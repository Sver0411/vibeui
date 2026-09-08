import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "公告条",
    "en": "Announcement Bar",
    "aliases": [
      "顶部通知条",
      "营销条",
      "announcement"
    ],
    "pattern": "Announcement Bar · Top Banner",
    "principle": "多条公告用横向轨道 translateX 轮播（grid-auto-flow: column），自动播放 setInterval + hover/交互暂停；关闭时量高度过渡归零再 display none，localStorage 记忆后下次直接不渲染。"
  },
  "prompts": {
    "short": "做一个顶部公告条：多条公告自动轮播、左右小箭头切换、可关闭且刷新后仍隐藏（localStorage 记忆）。",
    "standard": "用原生 JS 实现公告条：\n1. 结构：深色（或品牌色）横条内放轮播轨道 + 前后箭头 + 关闭按钮，固定在页面最顶；\n2. 轮播：容器 grid-auto-flow: column，每条公告一列占满宽度，translateX(-index*100%) 切换，transition 0.35s；\n3. 自动播放：5s 间隔、循环到尾回第一条；hover 与 focusin 暂停、离开恢复；\n4. 关闭：量当前高度 → 高度/opacity 过渡 0.3s → 结束后 remove；写 localStorage 键如 announcement-dismissed，带版本号，下次加载直接不渲染；\n5. 无障碍：轮播区 role=\"region\" aria-label=\"公告\"，aria-live=\"off\" 防打断，关闭按钮 aria-label。",
    "refined": "升级为 AnnouncementQueue 组件：支持纯文本与链接混排公告、到达尾部后反向循环、暂停时间在手动切换后重新计时；localStorage 存 JSON {id, dismissedAt}，同一 id 的公告关闭后不再出现、新公告照常展示；窄屏下长公告自动截断 + title 提示。验收：① 关闭动画无跳变；② 新公告版本能顶掉旧记忆；③ 键盘 Tab 顺序合理。"
  },
  "knobs": [
    {
      "name": "轮播间隔 interval",
      "default": "5s",
      "range": "3s – 10s",
      "effect": "自动播放节奏，营销旺季可调快。"
    },
    {
      "name": "切换时长 slideMs",
      "default": "350ms",
      "range": "200ms – 600ms",
      "effect": "横向过渡时长，与间隔保持 10:1 左右。"
    },
    {
      "name": "记忆键 storageKey",
      "default": "带版本号",
      "effect": "关闭记忆的键名，换公告时升版本重新展示。"
    }
  ],
  "pitfalls": [
    "关闭记忆不带版本号，新公告永远展示不出来。",
    "自动播放不处理 hover/focusin，用户正想点链接公告却切走了。",
    "关闭时直接 display:none，页面头部内容猛地跳上来。",
    "轮播用 float 或绝对定位堆叠，宽度变化时错位——grid 列轨道最稳。",
    "公告里放 <a> 却不给 focus 样式，键盘用户点不到活动。"
  ],
  "effectTags": [
    "公告条",
    "轮播",
    "营销"
  ]
};
