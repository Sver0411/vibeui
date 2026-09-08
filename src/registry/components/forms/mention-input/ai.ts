import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "@提及输入框",
    "en": "Mention Input",
    "aliases": [
      "提及输入",
      "@提及",
      "Autocomplete Mention"
    ],
    "pattern": "Mention · Autocomplete Trigger",
    "principle": "contenteditable 的 input 事件里用正则 /@([^\\s@]{0,12})$/ 匹配光标前文本唤起候选菜单；选中后把 @词文本替换为 contentEditable=false 的标签节点，并手动重建 Range 把光标落到标签后。"
  },
  "prompts": {
    "short": "做一个 @ 提及输入框：输入 @ 弹出成员候选菜单可继续输入过滤，选中后插入不可编辑的提及标签，Backspace 整体删除。原生 JS 实现。",
    "standard": "用原生 HTML/CSS/JavaScript 实现 contenteditable 提及输入框：\n1. 编辑区用 data-placeholder + :empty::before 显示占位文案；\n2. input 事件取光标前文本，正则匹配 @词（限 12 字符）唤起候选菜单，继续输入实时过滤，离开 @ 词即关闭；\n3. 菜单支持 ↑↓ 循环选择、Enter/Tab 确认、Esc 关闭；候选项绑 pointerdown 并 preventDefault，防止编辑器先失焦导致 Selection 失效；\n4. 确认后仅替换 @词所在文本节点为 contentEditable='false' 的 span 标签，光标落到标签后的新文本节点；\n5. 底部字数计数 140 上限，超出标红。不要引入任何库。",
    "refined": "可配置提及输入框：@词最长 12 字符、计数上限 140、候选菜单 max-height 196px、编辑区 min-height 88px / max-height 160px、主题色 #0d9488。验收：① 菜单打开时 ↑↓ 可循环且高亮项 scrollIntoView；② 选中标签一次 Backspace 整体删除且光标位置正确；③ 点编辑器外关闭菜单；④ 计数不含重复文本且 over 时变红。"
  },
  "knobs": [
    {
      "name": "@词匹配长度",
      "default": "12",
      "range": "6 – 20 字符",
      "effect": "正则 {0,12} 上限，决定菜单能跟随输入多远。"
    },
    {
      "name": "字数上限 MAX",
      "default": "140",
      "range": "80 – 500",
      "effect": "计数器分母与超限标红阈值。"
    },
    {
      "name": "候选菜单高度",
      "default": "max-height: 196px",
      "range": "140 – 260px",
      "effect": "菜单可滚动区域的可视条数。"
    },
    {
      "name": "编辑区高度",
      "default": "min 88px / max 160px",
      "range": "min 60 – 120px",
      "effect": "空态高度与内部滚动起点。"
    },
    {
      "name": "主题色",
      "default": "#0d9488",
      "range": "任意色值",
      "effect": "提及标签、焦点环与高亮项颜色。"
    }
  ],
  "pitfalls": [
    "候选项绑 click 而非 pointerdown + preventDefault，点击瞬间编辑器失焦，pick 时 Selection 已失效插入错位。",
    "选中后用 innerHTML 重建整个编辑器内容，光标丢失；应只替换 @词所在的文本节点并手动 setStart 重置光标。",
    "忘了给提及标签设 contentEditable='false'，Backspace 会逐字删掉标签文本而不是整体删除。",
    "菜单打开时 keydown 没对 ↑↓/Enter preventDefault，光标在编辑器里乱跳或插入换行。",
    "计数直接取 textContent.length 而不把 \\u00a0 替换成普通空格，contenteditable 自动插入的不换行空格导致计数虚高。",
    "@词正则没限长（漏掉 {0,12}），长文本里远处的 @ 也会触发菜单。"
  ],
  "effectTags": [
    "提及",
    "自动补全",
    "富文本",
    "contenteditable",
    "输入"
  ]
};
