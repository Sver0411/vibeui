import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "搜索输入框",
    "en": "Search Input with Suggestions",
    "aliases": [
      "搜索联想框",
      "搜索框",
      "Search Autocomplete"
    ],
    "pattern": "Search · Debounced Combobox",
    "principle": "input 经 180ms 防抖后按 label + keywords 过滤本地数据，结果先 escapeHtml 再把匹配片段包 <mark> 高亮渲染为 role=option；↑↓ 移动 activeIndex、Enter 选中、Esc 关闭，外点关闭，清空按钮随输入显隐。"
  },
  "prompts": {
    "short": "做一个搜索框：180ms 防抖联想、匹配片段高亮、↑↓↵Esc 键盘导航、最近搜索快捷标签和清空按钮。原生 JS 实现。",
    "standard": "用原生 HTML/CSS/JavaScript 实现搜索联想框：\n1. input 设 role=combobox aria-controls=结果列表，input 事件 180ms 防抖后再过滤（label 与 keywords 均 includes，忽略大小写）；\n2. 结果渲染前对文本 escapeHtml，再仅对匹配片段包 <mark>；无结果显示空态文案；\n3. 键盘：↑↓ 移动 activeIndex（data-active 驱动高亮并 clamp 边界）、Enter 选中（未导航时默认第 0 条）、Esc 关闭；\n4. 清空按钮随输入长度显隐，点击清值并把焦点还给输入框；最近搜索 chip 点击直接填入查询并渲染；\n5. document 级 click 落在容器外（!root.contains）时关闭面板。不要引入任何库。",
    "refined": "可配置搜索联想框：防抖 180ms（可调 100–400ms）、结果面板 max-height 264px、输入框高 44px / 圆角 11px、高亮 mark 底 rgba(15,118,110,0.14)。验收：① 快速连续输入只触发最后一次过滤渲染；② 查询词含 < > & 不破坏 DOM；③ ↑↓ 到边界不越界、Enter 在未导航时选中第 0 条；④ 清空后 recent 区恢复且焦点回到输入框。"
  },
  "knobs": [
    {
      "name": "防抖时长",
      "default": "180ms",
      "range": "100 – 400ms",
      "effect": "输入到联想渲染的延迟与请求频率。"
    },
    {
      "name": "结果面板高度",
      "default": "max-height: 264px",
      "range": "180 – 360px",
      "effect": "可视结果条数与滚动。"
    },
    {
      "name": "输入框高度",
      "default": "44px",
      "range": "40 – 52px",
      "effect": "搜索框整体尺寸。"
    },
    {
      "name": "高亮色",
      "default": "rgba(15, 118, 110, 0.14)",
      "range": "任意色值",
      "effect": "匹配片段 mark 的底色。"
    },
    {
      "name": "数据集",
      "default": "7 条本地数据（label + keywords）",
      "range": "自定义",
      "effect": "过滤范围；生产环境替换为远程请求。"
    }
  ],
  "pitfalls": [
    "没做防抖，每敲一个字符全量重渲染，数据量大时明显卡顿。",
    "结果用 innerHTML 拼接且不转义查询词，输入 <img onerror=...> 直接造成 XSS。",
    "高亮直接 replace 用户输入进 HTML，查询含 <> 或正则特殊字符时 DOM 被破坏。",
    "Enter 直接取 matches[activeIndex]，未导航时 activeIndex 为 -1 取到 undefined 崩溃。",
    "外点关闭监听在面板选项的 click 之前触发或没判 root.contains，点击结果项先被关闭。",
    "清空按钮显隐不跟随输入长度，空输入时仍显示或非空时找不到。"
  ],
  "effectTags": [
    "搜索",
    "防抖",
    "联想",
    "键盘导航",
    "表单"
  ]
};
