import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "表情选择器",
    "en": "Emoji Picker",
    "aliases": [
      "表情面板",
      "emoji 面板",
      "Emoji Selector"
    ],
    "pattern": "Picker · Tabbed Grid",
    "principle": "分类数据（id/icon/label/items）驱动 tablist + listbox 渲染：分类按钮切换 activeCat 后重建网格；搜索框有值时跨全部分类 flatMap 合并过滤；选中后去重插入最近使用数组头部并 slice(0, 8) 截断。"
  },
  "prompts": {
    "short": "做一个表情选择器：分类标签切换、关键词搜索、最近使用记录，网格点击选中回显。原生 JS 实现。",
    "standard": "用原生 HTML/CSS/JavaScript 实现表情选择器：\n1. 分类数据驱动渲染：分类按钮 role=tab 同步 aria-selected，网格 role=listbox，表情用 button role=option；\n2. 搜索框 input 有值时跨所有分类 flatMap 合并过滤，清空后恢复当前分类；\n3. 点击表情更新回显区（容器 aria-live=polite），并把表情去重后插到最近使用头部，超出上限截断；\n4. 网格用 repeat(8, 1fr) 的 grid、max-height 限高滚动，hover 时 scale(1.15)。不要引入任何库。",
    "refined": "可配置表情选择器：8 列网格（≤480px 6 列）、网格 max-height 168px、表情字号 19px、hover 放大 1.15 / 0.1s、最近使用上限 8 个、主题色 #f59e0b。验收：① 搜索后清空恢复当前分类列表；② 重复选择同一表情时最近使用中去重置顶；③ 搜索无结果显示空态文案；④ 分类 aria-selected 与高亮背景同步切换。"
  },
  "knobs": [
    {
      "name": "网格列数",
      "default": "8（≤480px 为 6）",
      "range": "5 – 10",
      "effect": "每行列数与表情密度。"
    },
    {
      "name": "网格高度",
      "default": "max-height: 168px",
      "range": "120 – 260px",
      "effect": "网格滚动区域可视行数。"
    },
    {
      "name": "表情字号",
      "default": "19px",
      "range": "16 – 24px",
      "effect": "表情大小与点击热区。"
    },
    {
      "name": "最近使用上限",
      "default": "8",
      "range": "4 – 16",
      "effect": "去重截断后保留的记录条数。"
    },
    {
      "name": "hover 放大",
      "default": "1.15",
      "range": "1.05 – 1.3",
      "effect": "悬浮表情的放大倍率。"
    }
  ],
  "pitfalls": [
    "搜索匹配直接对 emoji 字符做 indexOf，中文关键词永远搜不到——数据应带关键词字段再匹配。",
    "最近使用不去重或没截断，数组无限增长挤爆底栏。",
    "搜索有值时点分类标签没清空搜索词，网格显示状态与分类高亮互相矛盾。",
    "表情用 div/span 而非 button，无法聚焦也没有 focus-visible 描边。",
    "回显区忘了 aria-live=polite，键盘用户选中后读屏不播报。",
    "网格不限高也不滚动，表情一多整个页面被撑长。"
  ],
  "effectTags": [
    "表情",
    "分类切换",
    "搜索",
    "最近使用",
    "选择器"
  ]
};
