import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "行内编辑",
    "en": "Inline Edit",
    "aliases": [
      "原地编辑",
      "点击编辑",
      "click to edit"
    ],
    "pattern": "Inline Edit · Contenteditable-free Swap",
    "principle": "静态文本与 input 互相切换显示；进入编辑时把 input 宽度设为文本渲染宽度避免跳动，Enter/失焦提交、Esc 还原；role 由按钮与 textbox 分担保证读屏可用。"
  },
  "prompts": {
    "short": "做一个行内编辑组件：点击文本变输入框，Enter 或失焦保存、Esc 取消，切换时布局不跳动，带铅笔图标提示。",
    "standard": "用原生 JS 实现行内编辑：\n1. 结构：span 显示文本 + input（默认 hidden）+ 铅笔按钮，外层是 inline-flex 容器；\n2. 进入编辑：input.value = 文本，hidden 切换，input 宽度 = 文本宽度 + 16px（canvas measureText 或 ch 估算），自动 focus 并全选；\n3. 提交：Enter 与 blur 触发——非空且变化则更新文本并给一次高亮闪动（背景色过渡），否则原样还原；\n4. 取消：Esc 还原并退出编辑，注意 blur 与 Esc 竞争——Esc 时先置标志位再 blur；\n5. 无障碍：铅笔按钮 aria-label=\"编辑标题\"，input 带 aria-label，编辑态容器加 :focus-within 描边。",
    "refined": "实现 makeEditable(el, { onCommit, onCancel })：\n- 支持单行与多行（textarea）两种模式；\n- 宽度测量用 canvas 2d measureText 精确匹配当前字体（含 font-weight / letter-spacing），不用 ch 硬编码；\n- 空值提交时抖动提示并保持编辑态；\n- 连续 Tab 能在多个可编辑字段间顺序移动；\n验收：① 切换零布局跳动；② Esc 绝不触发保存；③ 读屏播报「文本框，已选中」。"
  },
  "knobs": [
    {
      "name": "宽度余量 widthPadding",
      "default": "16px",
      "range": "8px – 32px",
      "effect": "编辑框比文本宽出的空间，太小光标局促。"
    },
    {
      "name": "保存闪动 flashMs",
      "default": "600ms",
      "range": "300ms – 1200ms",
      "effect": "保存成功后的高亮持续时间。"
    },
    {
      "name": "空值抖动 shake",
      "default": "开启",
      "effect": "空提交时左右抖动提示，可关闭。"
    }
  ],
  "pitfalls": [
    "不测文本宽度直接给固定 width，切换瞬间整行文字会跳动。",
    "Esc 触发 blur 又触发保存——必须用标志位让 Esc 路径跳过 blur 的保存逻辑。",
    "用 contenteditable 看似简单，但粘贴富文本、光标管理全是坑，input 替换更稳。",
    "空字符串直接提交会把标题清空——空值应该抖动还原。",
    "编辑态没有 :focus-within 描边，用户不知道已经在编辑。"
  ],
  "effectTags": [
    "行内编辑",
    "表单",
    "交互"
  ]
};
