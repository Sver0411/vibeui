import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "筛选侧栏",
    "en": "Filters Sidebar / Faceted Filter",
    "aliases": [
      "多面筛选",
      "商品筛选",
      "筛选面板"
    ],
    "pattern": "Faceted Filtering · Sidebar + Chips",
    "principle": "关键词、分类复选组、价格滑杆、有货开关四组条件任一 input/change 都触发 apply() 全量重算，结果列表、匹配数与可移除条件 chips 同步渲染；≤640px 侧栏折叠为按钮开关的抽屉。"
  },
  "prompts": {
    "short": "做一个商品筛选侧栏：关键词+分类复选+价格滑杆+有货开关，结果实时过滤并生成可逐个移除的条件 chips。原生 JS 实现。",
    "standard": "用原生 HTML/CSS/JavaScript 实现筛选侧栏：\n1. grid 布局 240px 侧栏 + 1fr 结果区，侧栏 sticky top 16px；控件：搜索框、分类 checkbox 组、range 滑杆（100–2000 step 50）、role=\"switch\" 有货开关；\n2. 所有 input/change 事件统一进 apply() 全量过滤并重渲染列表与匹配数，结果区 aria-live=\"polite\"；\n3. 激活条件渲染为 chips，点 × 反向重置对应控件后重算，另有「清除全部」按钮；\n4. ≤640px 侧栏 display:none，开关按钮 toggle .open 展开并同步 aria-expanded。不要引入库。",
    "refined": "可配置筛选侧栏：侧栏 240px、价格区间 100–2000 step 50、开关 38×22px 滑块位移 16px、结果项入场 0.22s。验收：① 拖滑杆时 output 实时显示 ¥ 值且过滤无卡顿；② 每个激活条件都有对应 chip，移除后控件状态同步还原；③ 清除全部后恢复初始 8 件商品；④ 640px 以下抽屉开合与 aria-expanded 同步。"
  },
  "knobs": [
    {
      "name": "侧栏宽度",
      "default": "240px",
      "range": "200 – 320px",
      "effect": "筛选组的排布密度。"
    },
    {
      "name": "价格区间",
      "default": "min 100 / max 2000 / step 50",
      "range": "自定义",
      "effect": "滑杆粒度与上限。"
    },
    {
      "name": "开关滑块位移",
      "default": "translateX(16px)",
      "range": "12 – 20px",
      "effect": "开关行程，需与 38px 轨道宽度匹配。"
    },
    {
      "name": "结果入场动画",
      "default": "fs-in 0.22s ease",
      "range": "0.15 – 0.4s",
      "effect": "列表刷新的淡入节奏，reduced-motion 下取消。"
    },
    {
      "name": "移动端断点",
      "default": "max-width 640px",
      "range": "480 – 768px",
      "effect": "侧栏折叠为抽屉的阈值。"
    }
  ],
  "pitfalls": [
    "过滤逻辑散在各控件回调里，chips 移除时控件状态不同步；应收敛到单一 apply() 全量重算。",
    "滑杆用 change 而不是 input 监听，拖动过程中结果不实时更新。",
    "结果数与列表没放进 aria-live 区域，读屏用户感知不到筛选结果变化。",
    "商品名直接 innerHTML 拼接，搜索词含 HTML 时被注入；渲染前必须转义。",
    "移动端抽屉打开时没同步 aria-expanded，也没有焦点移入侧栏。"
  ],
  "effectTags": [
    "筛选",
    "多面过滤",
    "chips",
    "滑杆"
  ]
};
