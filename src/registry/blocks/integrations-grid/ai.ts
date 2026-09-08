import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "集成应用网格",
    "en": "Integrations Grid",
    "aliases": [
      "应用矩阵",
      "生态网格",
      "integrations"
    ],
    "pattern": "Integrations · Logo Tile Grid",
    "principle": "grid auto-fill minmax(150px,1fr) 瓷砖布局，每块 = 44px 字标色块（品牌色 12% 底 + 品牌色字母）+ 名称 + 一句话描述；「已接入」小绿点标签区分状态；悬停 translateY(-3px) + 边框亮主色。"
  },
  "prompts": {
    "short": "做一个集成应用网格：6 块应用瓷砖（字标色块+名称+描述），部分带「已接入」绿点标签，悬停抬升边框点亮。",
    "standard": "用纯 HTML/CSS 实现集成网格：\n1. 顶部：居中 kicker「INTEGRATIONS」+ 标题「与你的工具无缝协作」+ 副标题；\n2. 网格：repeat(auto-fill, minmax(160px, 1fr)) gap 12px，瓷砖 = 色块字标（44px 圆角、品牌色 12% 底、品牌色加粗首字母）+ 名称 13.5px/600 + 描述 12px 两行截断 + 可选状态标签（已接入：6px 绿点 + 文字 10.5px）；\n3. 悬停：translateY(-3px)、border 变主色 40%、阴影柔和加深；\n4. 窄屏 2 列，超小屏 1 列；\n5. 尾部补一张「+ 提交集成」虚线占位砖。",
    "refined": "扩展：分类过滤 chips（全部/开发/设计/效率）过滤瓷砖并带 FLIP 重排动画；瓷砖内嵌「连接」按钮（点击变「已连接 ✓」）；字标色块支持真实 logo 图与字标回退双态；滚动入场 stagger（IntersectionObserver + --i 延迟）。验收：① 长描述不破版；② 过滤动画顺滑；③ 键盘可达每块瓷砖。"
  },
  "knobs": [
    {
      "name": "最小砖宽 minTile",
      "default": "160px",
      "range": "140 – 200px",
      "effect": "auto-fill 断行密度。"
    },
    {
      "name": "字标底色透明度 markAlpha",
      "default": "0.12",
      "range": "0.08 – 0.18",
      "effect": "品牌色块浓度。"
    },
    {
      "name": "悬停抬升 lift",
      "default": "3px",
      "range": "2 – 5px",
      "effect": "瓷砖浮起量。"
    }
  ],
  "pitfalls": [
    "字标用真实品牌 logo 但没有授权，用首字母色块最稳。",
    "描述不截断导致瓷砖高度参差。",
    "「已接入」和「即将上线」状态只用文字颜色区分，加圆点更醒目。",
    "网格行数不定时悬停阴影溢出裁切——父容器别设 overflow hidden。",
    "手机上 4 列挤成文字看不清，断点要降列。"
  ],
  "effectTags": [
    "集成",
    "网格",
    "落地页"
  ]
};
