import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "Logo 墙区块",
    "en": "Logo Cloud / Logo Marquee",
    "aliases": [
      "客户 Logo 墙",
      "合作伙伴墙",
      "无缝滚动 Logo"
    ],
    "pattern": "Social Proof · Logo Cloud",
    "principle": "静态形态是 3 列网格卡片 + 悬停变色上浮；滚动形态把同一组 logo 复制两份放进 width: max-content 的 flex 轨道，translateX(-50% - gap/2) 平移恰好一份副本宽度实现无缝循环，两侧用 mask-image 渐隐，hover 时 animation-play-state: paused。"
  },
  "prompts": {
    "short": "做一个客户 Logo 墙：一个 3 列静态网格带悬停变色，一个无缝横向滚动的 logo 行（双副本循环、两侧渐隐、悬停暂停）。纯 CSS 动画，不要 JS。",
    "standard": "用原生 HTML/CSS 实现 Logo 墙双形态：\n1. 静态网格：repeat(3, 1fr)，logo 卡白底 1px #e4e4e7 描边、圆角 12px、padding 18px 10px，hover 变深色 + translateY(-2px)；480px 降 2 列；\n2. 无缝滚动：marquee 容器 overflow: hidden + mask-image linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)；轨道 display: flex; gap: 40px; width: max-content，logo 复制两份，keyframes 从 translateX(0) 到 translateX(calc(-50% - 20px))，24s linear infinite；\n3. .lc-marquee:hover .lc-track { animation-play-state: paused }；\n4. 滚动行整体 aria-hidden，配一条 sr-only 文案保证可访问性；\n5. prefers-reduced-motion 下停动画、去 mask、轨道改 flex-wrap 居中换行。",
    "refined": "实现 Logo 墙，暴露参数：滚动周期 24s、轨道 gap 40px（keyframes 位移需同步为 -50% - gap/2 = 20px）、遮罩渐隐区 12%/88%、静态网格 3 列（480px 下 2 列）、卡片圆角 12px。验收标准：① 滚动循环无肉眼可见接缝（位移必须恰好等于一份副本宽度）；② 悬停暂停后移开恢复；③ mask 不支持时退化渐隐元素仍生效；④ reduced-motion 下变成可换行静态网格；⑤ 屏幕阅读器能读到 logo 名单。"
  },
  "knobs": [
    {
      "name": "滚动周期",
      "default": "24s linear infinite",
      "range": "12 – 40s",
      "effect": "滚一圈的速度，越慢越沉稳；必须 linear 才能匀速循环。"
    },
    {
      "name": "轨道间距 gap",
      "default": "40px（keyframes 位移同步 -50% - 20px）",
      "range": "24 – 64px",
      "effect": "logo 间距，改动时必须同步修改 keyframes 的位移值，否则循环跳变。"
    },
    {
      "name": "两侧渐隐区",
      "default": "mask-image 在 12% / 88% 处过渡",
      "range": "8% – 20%",
      "effect": "边缘淡出宽度，决定 logo 进出画面的柔和程度。"
    },
    {
      "name": "静态网格列数",
      "default": "3 列（480px 下 2 列）",
      "range": "2 – 5 列",
      "effect": "静态形态每行 logo 数量。"
    },
    {
      "name": "logo 悬停反馈",
      "default": "变 #18181b、描边加深、translateY(-2px)，0.2s",
      "range": "位移 0 – 4px",
      "effect": "悬停时 logo 的强调效果。"
    }
  ],
  "pitfalls": [
    "轨道只放一份 logo 副本，滚完一半就露白；必须复制两份且位移恰好是 -50% - gap/2。",
    "改了 gap 忘了同步改 keyframes 里的位移值，每循环一次接缝跳一下。",
    "滚动动画用 ease 或 ease-in-out 而非 linear，循环拼接处出现停顿感。",
    "没有 hover 暂停（animation-play-state: paused），用户想看清某个 logo 却一直被拖走。",
    "忘了 mask-image 的 -webkit- 前缀，旧版 Safari 两侧生硬截断；或没留兜底的渐隐元素。",
    "滚动行对屏幕阅读器重复读两遍 logo；应整行 aria-hidden 并补 sr-only 名单。",
    "reduced-motion 下只停了动画，轨道仍 width: max-content 溢出；需同时改 wrap 居中。"
  ],
  "effectTags": [
    "Logo 墙",
    "无缝滚动",
    "社会证明",
    "跑马灯",
    "信任背书"
  ]
};
