import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "命令面板",
    "en": "Command Palette / ⌘K Menu",
    "aliases": [
      "命令菜单",
      "快捷操作面板",
      "Spotlight"
    ],
    "pattern": "Command Palette · Fuzzy Search",
    "principle": "⌘K/Ctrl+K 全局开关面板；fuzzyScore 做子序列匹配（label 与 keywords，keywords 得分 ×0.8、连续命中每字符 +2、完整包含再 +10），按分排序后按 group 插入分组标题，↑↓ 取模循环、Enter 执行。"
  },
  "prompts": {
    "short": "做一个 ⌘K 命令面板：模糊搜索、分组结果、键盘循环选择、ESC 关闭。原生 JS 实现。",
    "standard": "用原生 HTML/CSS/JavaScript 实现命令面板：\n1. document keydown 拦截 (metaKey||ctrlKey)+K 切换 hidden 面板（preventDefault），面板 fixed 顶部 14vh 居中，宽 min(560px, 92vw)；\n2. 模糊匹配：查询按子序列扫描 label/keywords，连续命中 +2、完整包含 +10、keywords ×0.8，按分降序并按 group 渲染分组标题；\n3. 键盘：↑↓ 取模循环，setActive 时 scrollIntoView({block:'nearest'})，Enter 执行，Esc 关闭并把焦点还给触发按钮；\n4. 结果 innerHTML 拼接前必须 escapeHtml 转义，无结果显示占位文案。不要引入库。",
    "refined": "可配置命令面板：结果区 max-height 300px、面板宽 min(560px, 92vw)、顶部偏移 14vh、入场 0.2s、激活项底色 rgba(15,118,110,0.08)。验收：① 乱序子串（如输入 \"drk\"）能命中 dark mode；② ↑↓ 循环且长列表滚动跟随激活项；③ 关闭后焦点回触发按钮；④ 搜索词含 <script> 字符串不会被当 HTML 执行。"
  },
  "knobs": [
    {
      "name": "结果区最大高度",
      "default": "300px",
      "range": "200 – 480px",
      "effect": "可见结果行数与滚动触发点。"
    },
    {
      "name": "面板宽度",
      "default": "min(560px, 92vw)",
      "range": "420 – 720px",
      "effect": "单行信息的容量。"
    },
    {
      "name": "顶部偏移",
      "default": "14vh",
      "range": "8 – 24vh",
      "effect": "面板在视口中的高度位置。"
    },
    {
      "name": "keywords 权重",
      "default": "0.8",
      "range": "0.5 – 1",
      "effect": "别名字段相对标题的排序影响力。"
    },
    {
      "name": "完整包含加分",
      "default": "+10",
      "range": "5 – 20",
      "effect": "连续子串命中的排序优先级。"
    }
  ],
  "pitfalls": [
    "↑↓ 不取模，到列表头尾就停；应 (i±1+len)%len 循环。",
    "键盘导航用真实 DOM focus 但每次输入都重建列表丢焦点；用 data-index + data-active 高亮而非移动焦点。",
    "搜索词直接 innerHTML 拼接造成 XSS；渲染前必须 escapeHtml。",
    "打开时没清空输入框并重置 activeIndex，残留上次的搜索状态。",
    "长列表里激活项滚出可视区；setActive 后要 scrollIntoView({block:'nearest'})。",
    "⌘K 没有 preventDefault，浏览器把焦点抢进地址栏，面板根本打不开。"
  ],
  "effectTags": [
    "命令面板",
    "模糊搜索",
    "键盘优先",
    "⌘K"
  ]
};
