import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "代码片段卡",
    "en": "Code Snippet Card",
    "aliases": [
      "Tabbed Code Block",
      "代码展示卡",
      "复制代码卡"
    ],
    "pattern": "Tabs · Clipboard",
    "principle": "role=tablist 三标签点击切换并同步 aria-selected，用 innerHTML 渲染预置高亮片段；复制取 code 的 textContent，优先 navigator.clipboard，非安全上下文降级隐藏 textarea + execCommand。"
  },
  "prompts": {
    "short": "做一个深色代码展示卡：HTML/CSS/JS 三个标签切换，右上角一键复制并显示已复制。原生 JS 实现。",
    "standard": "用原生 HTML/CSS/JavaScript 实现深色代码片段卡：\n1. 标签栏 role=tablist + role=tab，点击切换并同步 aria-selected，激活标签底色与代码区一致形成连体感；\n2. 代码区 pre>code 用极简 span 关键字着色（关键字/字符串/函数/注释四色），white-space: pre + overflow-x: auto；\n3. 复制按钮取 code.textContent，优先 navigator.clipboard（需 isSecureContext），非安全上下文用隐藏 textarea + execCommand(\"copy\") 降级；\n4. 复制成功后按钮变绿色\"已复制\"，约 1.6 秒后复原。",
    "refined": "可配置代码片段卡：卡片底色 #0f172a、激活色 #38bdf8、代码 12.5px / 行高 1.75、复制反馈 1600ms、代码区 min-height 148px。\n验收：① 切换标签时卡片高度不跳动；② 复制拿到的是纯文本（不含高亮 span）；③ HTTP 环境下复制仍成功；④ 键盘 Tab 能聚焦标签且有 focus-visible 描边。"
  },
  "knobs": [
    {
      "name": "卡片底色 --cs-bg",
      "default": "#0f172a",
      "range": "任意深色（slate-900 类）",
      "effect": "代码区与激活标签的底色，两者必须一致才有连体感。"
    },
    {
      "name": "高亮四色",
      "default": "kw #c084fc / str #4ade80 / fn #38bdf8 / cm #64748b",
      "range": "任选配色方案",
      "effect": "关键字、字符串、函数、注释的着色。"
    },
    {
      "name": "复制反馈时长",
      "default": "1600ms",
      "range": "800 – 3000ms",
      "effect": "按钮显示\"已复制\"后多久复原。"
    },
    {
      "name": "代码字号 / 行高",
      "default": "12.5px / 1.75",
      "range": "11 – 14px / 1.5 – 1.9",
      "effect": "代码密度与可读性，需随字号同步调 min-height。"
    },
    {
      "name": "标签过渡",
      "default": "color/background 0.12s ease",
      "range": "0 – 0.2s",
      "effect": "标签激活态切换的跟手感。"
    }
  ],
  "pitfalls": [
    "复制时若取 innerHTML 会把高亮 span 标签一起写进剪贴板——必须取 code 元素的 textContent。",
    "只在 HTTPS 下测试，忘了 navigator.clipboard 在 http/file 协议下是 undefined，需要 execCommand 降级分支。",
    "切换到行数差异大的片段时没设 min-height，卡片高度跳动。",
    "tab 只改 class 忘了同步 aria-selected，屏幕阅读器读不出当前文件。",
    "复制按钮的复位 setTimeout 没先 clearTimeout，快速连点会被上一次的定时器提前复位。",
    "代码字号改了但 min-height 和行高没跟着调，长片段溢出或底部留白过大。"
  ],
  "effectTags": [
    "代码",
    "标签页",
    "复制",
    "深色",
    "高亮"
  ]
};
