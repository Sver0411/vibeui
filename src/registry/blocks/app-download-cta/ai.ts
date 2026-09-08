import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "应用下载横幅",
    "en": "App Download CTA Banner",
    "aliases": [
      "下载横幅",
      "App 推广条",
      "商店徽章横幅"
    ],
    "pattern": "CTA Section · App Promotion",
    "principle": "深色渐变容器用 grid 分为文案区（商店徽章按钮）与纯 CSS 绘制的手机 mockup 两列，mockup 用嵌套 div 模拟刘海、骨架屏与 FAB，并用 translateY 关键帧做 4.5s 缓慢悬浮。"
  },
  "prompts": {
    "short": "做一个深色应用下载横幅：左侧标题 + App Store / Google Play 双商店徽章按钮，右侧一台缓慢上下悬浮的 CSS 手机 mockup（含刘海、应用骨架屏、FAB），不用任何图片。",
    "standard": "用原生 HTML/CSS 实现应用下载横幅：\n1. 容器 max-width 720px、圆角 24px，深色底 #0b1120 叠加两个 radial-gradient 光斑（#6366f1 与 teal）+ 0 18px 48px 大阴影；\n2. grid-template-columns: 1.3fr auto，左列标题/副文案/商店徽章（内联 SVG 图标 + 半透明白底胶囊按钮），右列手机 mockup；\n3. mockup 全部用 div 绘制：128×240px 机身、40×8px 刘海、#e2e8f0 骨架条、#6366f1 FAB，animation 4.5s ease-in-out infinite 做 translateY(-8px) 悬浮；\n4. 加 prefers-reduced-motion 关闭动画；\n5. 560px 以下改单列并隐藏 mockup。",
    "refined": "实现应用下载横幅，暴露参数：容器宽 min(720px, 100%)、圆角 24px、底色 #0b1120、光斑色 #6366f1(0.4)/#0d9488(0.3)、手机尺寸 128×240px 悬浮幅度 8px 周期 4.5s、断点 560px（单列 + 隐藏 mockup）。验收标准：① 手机 mockup 零图片零 SVG，纯 div 绘制且刘海居中；② 悬浮动画循环无跳变；③ 窄屏单列后徽章按钮不换行溢出；④ prefers-reduced-motion 下手机静止。"
  },
  "knobs": [
    {
      "name": "横幅底色 --ad-bg",
      "default": "#0b1120",
      "range": "深蓝黑 – 纯黑",
      "effect": "横幅主底色，配合两个 radial-gradient 光斑形成氛围。"
    },
    {
      "name": "强调色 --ad-accent",
      "default": "#6366f1",
      "range": "品牌色任意",
      "effect": "FAB 圆钮与光斑颜色，决定横幅的品牌倾向。"
    },
    {
      "name": "手机 mockup 悬浮",
      "default": "translateY(-8px)，4.5s ease-in-out 无限循环",
      "range": "幅度 4–16px、周期 3–8s",
      "effect": "悬浮幅度与速度，过大过快会显得焦躁。"
    },
    {
      "name": "mockup 显示断点",
      "default": "max-width: 560px 时隐藏",
      "range": "480 – 720px",
      "effect": "窄屏隐藏手机改单列，保住文案区可读性。"
    },
    {
      "name": "商店徽章样式",
      "default": "padding 8px 16px、圆角 11px、白底 6% 透明 + 1px 白 18% 描边",
      "range": "透明度 4%–14%",
      "effect": "徽章在深色底上的可点击感与对比度。"
    }
  ],
  "pitfalls": [
    "手机 mockup 用图片代替 CSS 绘制，导致深色背景下图片自带白底穿帮；应全部用 div + 圆角拼装。",
    "悬浮动画忘记配 prefers-reduced-motion: reduce 降级，减弱动效用户手机一直在飘。",
    "560px 以下没切单列也没隐藏 mockup，grid 两列挤压后文案被压缩到不可读。",
    "容器 overflow: hidden 漏掉，radial-gradient 光斑溢出圆角外，四角出现色块。",
    "商店徽章只在桌面验证，flex-wrap 换行后与 ad-note 间距塌陷。",
    "深色横幅放在浅色页面上没加大阴影（0 18px 48px），边界模糊像贴了张深色纸。"
  ],
  "effectTags": [
    "下载横幅",
    "CTA",
    "手机 mockup",
    "深色",
    "悬浮"
  ]
};
