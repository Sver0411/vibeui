import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "分裂按钮",
    "en": "Split Button",
    "aliases": [
      "复合按钮",
      "主次操作按钮",
      "split dropdown"
    ],
    "pattern": "Split Button · Primary + Menu",
    "principle": "一个圆角容器切两半：左半是主操作按钮，右半 32px 箭头区独立 button 控制下拉；中间 1px 半透明分隔线；下拉用与 popover 相同的点外关闭 + Esc 归还焦点模式。"
  },
  "prompts": {
    "short": "做一个分裂按钮：左侧主操作「保存」，右侧箭头展开另存为/导出/复制等备选菜单，点外关闭、键盘可操作。",
    "standard": "用原生 JS 实现分裂按钮：\n1. 结构：.sb 容器（inline-flex、圆角、主色底）内两个 button——主按钮与箭头按钮，中间 border-left: 1px rgba(255,255,255,.25) 分隔；\n2. 主按钮点击执行默认操作；箭头按钮 aria-expanded 控制下方菜单（min-width 与按钮同宽）；\n3. 菜单项 hover 高亮、Enter 选中并关闭、↑↓ 移动高亮；\n4. 点外关闭（document 捕获阶段判断包含关系）、Esc 关闭并把焦点还给箭头按钮；\n5. 选中备选项后菜单文案可更新（如「导出为 PDF」执行后 toast 提示）。",
    "refined": "升级 SplitButton 组件工厂：支持菜单分组分隔线、图标菜单项、危险项红色、disabled 态（两部分同时禁用）；主操作可被记忆——上次选择的备选操作自动成为主操作（类似 Word 粘贴按钮）；键盘 ArrowDown 从主按钮直接打开菜单。验收：① 两半焦点态视觉连续；② 菜单与按钮宽度一致；③ 触屏点按区域 ≥44px。"
  },
  "knobs": [
    {
      "name": "箭头区宽 arrowW",
      "default": "32px",
      "range": "28 – 40px",
      "effect": "右半宽度，太窄难点按。"
    },
    {
      "name": "分隔线 divider",
      "default": "25% 白",
      "effect": "两半之间的分隔线透明度。"
    },
    {
      "name": "菜单偏移 menuOffset",
      "default": "6px",
      "range": "4 – 12px",
      "effect": "下拉与按钮的间距。"
    }
  ],
  "pitfalls": [
    "两半各自圆角，接缝处出现缺口——圆角只放容器。",
    "箭头按钮与主按钮没有视觉分隔，用户不知道可分开点。",
    "主按钮点击冒泡触发箭头的 toggle，事件要分开绑定。",
    "菜单项用 div 没有按钮语义，键盘不可达。",
    "禁用态只禁主半不禁箭头，点了箭头还能开菜单。"
  ],
  "effectTags": [
    "分裂按钮",
    "下拉",
    "工具栏"
  ]
};
