import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "自动补全输入",
    "en": "Combobox / Autocomplete",
    "aliases": [
      "联想输入",
      "下拉建议",
      "autocomplete"
    ],
    "pattern": "Combobox · Filter-as-type",
    "principle": "input 事件里过滤数据源渲染下拉项；ARIA 组合框模式：input 为 combobox 角色、下拉为 listbox、选项为 option 并用 aria-activedescendant 追踪高亮；↑↓ 移动、Enter 选中、Esc 关闭。"
  },
  "prompts": {
    "short": "做一个自动补全输入框：输入过滤建议、↑↓ 键盘选择、Enter 填入、命中片段高亮、空结果显示引导。",
    "standard": "用原生 JS 实现 combobox：\n1. 结构：input[role=combobox][aria-expanded] + ul[role=listbox]（绝对定位在下方）；\n2. 过滤：input 事件里按 includes 过滤数据源，命中片段用 <mark> 高亮（注意先转义再替换防 XSS）；\n3. 键盘：↑↓ 在选项间移动高亮（循环），高亮项 scrollIntoView({block:'nearest'})，Enter 选中写回输入框并关闭，Esc 关闭；失焦延迟关闭（等 click 完成）；\n4. 无障碍：高亮项 id 同步到 input 的 aria-activedescendant，选项 aria-selected；\n5. 空结果：显示「无匹配，按 Enter 使用原文」引导行；无输入时下拉隐藏。",
    "refined": "升级为可复用 Combobox 类：支持异步数据源（debounce 150ms + loading 行）、最大建议数截断（+N 更多）、选中值与显示文本分离（value/label）；键盘选中与鼠标 hover 双通道互不干扰（hover 只改视觉，不改 activeDescendant）。验收：① 快速输入不闪烁；② 读屏播报「3 项可用」；③ 中文输入法 composition 期间不过滤。"
  },
  "knobs": [
    {
      "name": "防抖 debounceMs",
      "default": "120ms",
      "range": "0 – 300ms",
      "effect": "过滤触发延迟，异步源建议 150ms 以上。"
    },
    {
      "name": "最大建议 maxItems",
      "default": "7",
      "range": "5 – 12",
      "effect": "下拉最多条数，超出显示 +N。"
    },
    {
      "name": "失焦延迟 blurDelay",
      "default": "150ms",
      "range": "80 – 250ms",
      "effect": "等待选项 click 完成的宽限。"
    }
  ],
  "pitfalls": [
    "命中片段高亮直接拼 innerHTML，用户输入 <img> 会注入 XSS——先转义。",
    "blur 立即关下拉，选项的 click 还没来得及触发——要延迟或改用 mousedown。",
    "忘记 aria-activedescendant，读屏软件不知道当前高亮哪一项。",
    "中文输入法 composition 期间每拼一个字母都触发过滤，应在 compositionend 后再查。",
    "下拉不跟随输入框宽度， resizing 时错位。"
  ],
  "effectTags": [
    "自动补全",
    "下拉",
    "键盘导航"
  ]
};
