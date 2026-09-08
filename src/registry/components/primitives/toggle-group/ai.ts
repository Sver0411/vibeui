import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "多选按钮组",
    "en": "Toggle Group",
    "aliases": [
      "切换按钮组",
      "多选组",
      "toggle buttons"
    ],
    "pattern": "Toggle Group · Multi-select Pills",
    "principle": "每个选项是 aria-pressed 的 button，选中态 = 主色描边 + 浅底 + 右上角勾选角标；容器不做单选互斥，全选/清空按钮批量同步 aria-pressed 并派发 change。"
  },
  "prompts": {
    "short": "做多选按钮组：图标+文字胶囊按钮，选中变主色描边加浅底并显示勾选角标，支持全选/清空，已选计数实时更新。",
    "standard": "用原生 JS 实现多选按钮组：\n1. 结构：div[role=group aria-label] 内多个 button[aria-pressed]；\n2. 选中态：aria-pressed=true 时 border 主色 1.5px、背景主色 8%、文字主色，右上角 8px 对勾角标（absolute -top -right，白字主色底圆形，scale 0→1 弹出）；\n3. 点击切换 aria-pressed 并更新「已选 N 项」计数（N=0 时按钮禁用）；\n4. 全选/清空：批量设置后统一派发一次更新，避免逐个闪烁；\n5. 键盘：按钮天然 Tab 可达，Space 切换；focus-visible 描边；\n6. 布局 flex-wrap gap 8px，胶囊 padding 8px 14px。",
    "refined": "升级为 ToggleGroup 组件类：支持 max 选择数限制（超出时最早选中的自动让位）、受控 getValue()/setValue()、change 回调、禁用单项；图标用 SVG sprite；深色主题变量化。验收：① 连续快速点击状态不乱；② 读屏播报「已按下/未按下」；③ 角标弹出动画不引起布局位移。"
  },
  "knobs": [
    {
      "name": "选中底色 activeBg",
      "default": "主色 8%",
      "range": "4% – 14%",
      "effect": "选中胶囊的底色浓度。"
    },
    {
      "name": "角标弹出 popScale",
      "default": "0→1",
      "range": "加 cubic-bezier",
      "effect": "勾选角标的出现动画。"
    },
    {
      "name": "最大可选 max",
      "default": "不限",
      "range": "2 – 6",
      "effect": "超出自动让位最早选项。"
    }
  ],
  "pitfalls": [
    "用 aria-checked 或 checked，多选按钮组的正确语义是 aria-pressed。",
    "选中只变边框色，深色主题下和未选中难以区分——描边 + 底色 + 勾标三通道。",
    "角标 absolute 没有 transform 初始态，页面加载就闪现。",
    "全选按钮逐个 toggle 触发 N 次 change 回调。",
    "胶囊内文字换行导致高度不齐——white-space: nowrap。"
  ],
  "effectTags": [
    "多选",
    "筛选",
    "按钮组"
  ]
};
