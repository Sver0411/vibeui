import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "多选下拉",
    "en": "Multi-Select Dropdown",
    "aliases": [
      "多选选择器",
      "chips 多选",
      "Multi Select"
    ],
    "pattern": "Multi-Select · Combobox with Chips",
    "principle": "选中项存入 Set：触发框里 chips 与占位符二选一显示；面板按 Set 同步每个选项的 aria-selected，搜索 input 过滤重建列表；ESC 或面板外 pointerdown 关闭并把焦点还给触发框。"
  },
  "prompts": {
    "short": "做一个多选下拉：面板可搜索、全选/清空，选中项以可删除 chips 回显在触发框，支持键盘操作与 ESC 关闭。原生 JS 实现。",
    "standard": "用原生 HTML/CSS/JavaScript 实现多选下拉：\n1. 触发框 button[aria-haspopup=listbox] 同步 aria-expanded；选中态存 Set，chips（含 × 移除按钮并带 aria-label）与占位符二选一显示；\n2. 面板 role=listbox aria-multiselectable，选项 role=option 并按 Set 同步 aria-selected；\n3. 搜索框 input 实时过滤重建列表，无结果显示空态文案；全选/清空按钮直改 Set 后同时刷新 chips 与列表；\n4. 键盘：搜索框 ArrowDown 进入列表，选项 ↑↓ 移动焦点、Enter/Space 切换、ESC 关闭并 focus 回触发框；\n5. document 级 pointerdown 落在字段外即关闭。不要引入任何库。",
    "refined": "可配置多选下拉：选项列表 max-height 208px、面板展开过渡 0.16s（translateY -4px→0）、主题色 #2563eb、chip 弹入 0.16s scale 0.9→1、触发框 min-height 46px。验收：① chip × 移除后面板内 aria-selected 同步刷新；② ESC 关闭后焦点回到触发框；③ 全选/清空后计数文案一致；④ chip 内点击 stopPropagation 不触发面板开关。"
  },
  "knobs": [
    {
      "name": "列表高度",
      "default": "max-height: 208px",
      "range": "140 – 300px",
      "effect": "面板内选项滚动区域。"
    },
    {
      "name": "主题色",
      "default": "#2563eb",
      "range": "任意色值",
      "effect": "选中项、chips 与焦点环颜色。"
    },
    {
      "name": "面板过渡",
      "default": "0.16s ease",
      "range": "0.1 – 0.25s",
      "effect": "展开/收起的淡入位移速度。"
    },
    {
      "name": "chip 弹入动画",
      "default": "0.16s ease, scale 0.9→1",
      "range": "0.1 – 0.3s",
      "effect": "新 chip 出现的动效强度。"
    },
    {
      "name": "触发框最小高",
      "default": "46px",
      "range": "40 – 56px",
      "effect": "空态与单行 chip 时的框高。"
    }
  ],
  "pitfalls": [
    "选中态只改视觉高亮不同步 aria-selected，读屏用户与样式钩子都拿不到多选状态。",
    "chip 的 × 用 click 且没 stopPropagation，事件冒泡到触发框把面板一起开关。",
    "搜索过滤用 innerHTML 重建列表后忘了从 Set 回填 aria-selected，搜一次选中态全丢。",
    "ESC 关闭面板后焦点没还给触发框，键盘用户被丢到 body。",
    "关闭动画期间面板仍可交互（要延时 hidden），快速连点触发框出现假双开。",
    "chips 无溢出策略，选项多时触发框被无限撑高而不是内部滚动或折叠显示 +N。"
  ],
  "effectTags": [
    "多选",
    "下拉",
    "chips",
    "搜索过滤",
    "表单"
  ]
};
