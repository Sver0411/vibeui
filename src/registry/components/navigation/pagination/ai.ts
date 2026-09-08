import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "分页器",
    "en": "Pagination / Stable Page Window",
    "aliases": [
      "页码条",
      "翻页器"
    ],
    "pattern": "Pagination · Sliding Window",
    "principle": "pageWindow() 按 siblings=1 计算窗口序列：首末页常驻、当前页左右各留 1 页、断口补省略号；slots = siblings*2 + 5，总页数不超过 slots 时全量铺开。"
  },
  "prompts": {
    "short": "做一个页码窗口稳定的分页器：首尾常驻、当前页两侧留一页、断口折叠为省略号，紧凑模式只显示 7 / 24。原生 JS 实现。",
    "standard": "用原生 HTML/CSS/JavaScript 实现分页器：\n1. pageWindow(current, total, siblings) 返回页码与 'dots' 混合序列：首末页常驻、当前页 ±siblings、断口插省略号，靠头/靠尾时单侧不折叠；\n2. 每次翻页整排重渲染，重渲染后按 data-page 选择器把键盘焦点交回同页码按钮；\n3. 上一页/下一页在边界 disabled，当前页 aria-current=\"page\"，省略号 aria-hidden 不可聚焦；\n4. data-mode=\"compact\" 时不渲染页码，只留上下页 + 「当前 / 总数」状态块。不要引入库。",
    "refined": "可配置分页器：SIBLINGS 1、按钮 34px 高（480px 以下 32px）、当前页实心 #0f766e、按压缩放 0.94。验收：① total=128、page=64 时按钮数量恒定不跳动；② 翻页后键盘焦点落在新页码而非 body；③ 省略号不可聚焦且对读屏隐藏；④ 紧凑模式窄屏按钮缩小不换行。"
  },
  "knobs": [
    {
      "name": "sibling 页数 SIBLINGS",
      "default": "1",
      "range": "0 – 3",
      "effect": "当前页两侧保留的页码数，值越大窗口越宽。"
    },
    {
      "name": "按钮尺寸",
      "default": "34px（480px 以下 32px）",
      "range": "28 – 44px",
      "effect": "点击热区大小与整排宽度。"
    },
    {
      "name": "当前页色",
      "default": "#0f766e",
      "range": "任意 hex",
      "effect": "aria-current 页的实心底色与边框。"
    },
    {
      "name": "按压缩放",
      "default": "scale(0.94)",
      "range": "0.9 – 1",
      "effect": "点击反馈幅度，reduced-motion 下取消。"
    }
  ],
  "pitfalls": [
    "不做窗口稳定算法，每页按钮数量随位置变化导致整排跳动、误点相邻页码。",
    "整排重渲染后焦点丢失到 body，键盘用户要重新 Tab 一遍；必须按 data-page 归还焦点。",
    "省略号做成可聚焦元素，读屏用户会在「…」上卡住；应为 aria-hidden 的 span。",
    "上一页/下一页到边界没 disabled，能点出第 0 页或 total+1 页。",
    "页码字体没用 tabular-nums，数字切换时按钮宽度轻微抖动。"
  ],
  "effectTags": [
    "分页",
    "页码",
    "窗口算法",
    "键盘可达"
  ]
};
