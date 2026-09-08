import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "色板选择器",
    "en": "Color Swatch Picker",
    "aliases": [
      "预设色板",
      "swatch 选择器",
      "Preset Color Picker"
    ],
    "pattern": "Color Picker · Radio Group",
    "principle": "色块是 role=radio 的 button：选中即 aria-checked + tabIndex 收敛为单一 tab stop；方向键按 (i±1+8)%8 循环移动并选中；选中色的 data-hex 写入根节点 --cl-live CSS 变量，预览区与示例按钮/徽章随之联动。"
  },
  "prompts": {
    "short": "做一个预设色板选择器：圆形色块、悬停放大、选中双圈描边、方向键循环选色，预览区显示名称与 HEX 并联动示例按钮。原生 JS 实现。",
    "standard": "用原生 HTML/CSS/JavaScript 实现预设色板选择器：\n1. 色块用 button role=radio、容器 role=radiogroup；点击或 ←→ 方向键（取模循环）选中：更新 aria-checked，并把非选中项 tabIndex=-1 形成单一 tab stop；\n2. 色块背景走内联 style='--c: #hex' 变量，选中态双圈描边 box-shadow: 0 0 0 2px #fff, 0 0 0 4px var(--c)；\n3. 预览区色块/名称/HEX 从 data-hex、data-name 实时联动；\n4. 选中色写入根节点 --cl-live 变量，示例按钮与徽章（color-mix 12% 淡底）跟随变色。不要引入任何库。",
    "refined": "可配置色板选择器：8 色单行网格 repeat(8,1fr) / 间距 8px、色块 aspect-ratio 1 圆形、hover 放大 1.12 / active 0.95、选中双圈 2px 白 + 2px 本色、预览点 34×34px 圆角 10px、变色过渡 0.25s。验收：① ←→ 在首尾循环不越界；② Tab 只落在当前选中色块；③ 徽章淡底随选中色按 12% color-mix 变化；④ aria-checked 保持单选互斥。"
  },
  "knobs": [
    {
      "name": "色板数量",
      "default": "8",
      "range": "4 – 16",
      "effect": "网格列数与选择粒度。"
    },
    {
      "name": "hover 放大",
      "default": "1.12",
      "range": "1.05 – 1.2",
      "effect": "悬停色块的放大反馈。"
    },
    {
      "name": "选中描边",
      "default": "2px 白 + 2px 本色",
      "range": "1.5 – 3px",
      "effect": "双圈描边的醒目程度。"
    },
    {
      "name": "预览点尺寸",
      "default": "34×34px",
      "range": "28 – 44px",
      "effect": "预览色块的存在感。"
    },
    {
      "name": "变色过渡",
      "default": "0.25s ease",
      "range": "0.15 – 0.4s",
      "effect": "示例元素跟随变色的速度。"
    }
  ],
  "pitfalls": [
    "选中态只加高亮 class 不同步 aria-checked，读屏用户不知道当前选中哪个色。",
    "方向键移动后没把旧选中项 tabIndex 改 -1，Tab 顺序停在已被移出的色块上。",
    "循环索引只加 delta 不取模（忘了 (i+delta+n)%n），到头后取到 undefined 直接报错。",
    "色块颜色写死在各自的 CSS 类里而不是 CSS 变量/属性，增删色板要同时改样式和结构。",
    "徽章淡底手写固定 rgba 而非 color-mix 派生，换主题色后底色对不上。",
    "色块没设 aria-label（含名称与色值），读屏只读出'按钮'两个字。"
  ],
  "effectTags": [
    "取色",
    "色板",
    "radiogroup",
    "主题联动",
    "表单"
  ]
};
