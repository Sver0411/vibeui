import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "浮动标签输入框",
    "en": "Floating Label Input",
    "aliases": [
      "Material 输入框",
      "悬浮标签输入框",
      "Floating Label"
    ],
    "pattern": "Floating Label · CSS-only",
    "principle": "label 绝对定位在输入框垂直居中，用 input:focus + .fl-label 与 :not(:placeholder-shown) + .fl-label 两条相邻选择器把标签上浮到顶部（top 0、字号 14→11px）；placeholder 留一个空格充当'是否已填'的状态开关，全程零 JS。"
  },
  "prompts": {
    "short": "做一个 Material 风格浮动标签输入框：聚焦或有内容时标签自动上浮缩小，纯 CSS 实现，不用 JS。",
    "standard": "用纯 HTML/CSS 实现浮动标签输入框（零 JS）：\n1. input 设 placeholder=' '（空格）作为已填状态开关，且 input 在前、label 紧随其后（相邻选择器依赖）；\n2. label 绝对定位垂直居中，用 input:focus + .fl-label 与 input:not(:placeholder-shown) + .fl-label 上浮：top 0、字号 14→11px、加 600 字重；\n3. input 高 54px、padding-top 20px 给上浮后的标签留位；聚焦时主题色描边 + 3px 焦点环；\n4. label 设 pointer-events:none，for 指向 input 保证可访问。",
    "refined": "可配置浮动标签输入框：输入框高 54px、上浮后 top 0 / 字号 11px / 过渡 0.16s ease、聚焦环 3px rgba(15,118,110,0.14)、字段间距 22px、圆角 10px。验收：① 有内容失焦后标签保持上浮不回落；② 清空内容标签回落到居中位；③ 浏览器自动填充后 :placeholder-shown 判断正确、标签不错位；④ 点击标签可聚焦输入框。"
  },
  "knobs": [
    {
      "name": "输入框高度",
      "default": "54px",
      "range": "48 – 60px",
      "effect": "容纳上下浮动标签的空间。"
    },
    {
      "name": "上浮后字号",
      "default": "11px",
      "range": "10 – 12px",
      "effect": "标签浮起后的大小与可读性。"
    },
    {
      "name": "上浮过渡",
      "default": "0.16s ease",
      "range": "0.1 – 0.25s",
      "effect": "标签位移与缩小的顺滑程度。"
    },
    {
      "name": "字段间距",
      "default": "22px",
      "range": "16 – 28px",
      "effect": "多个字段间的垂直密度。"
    },
    {
      "name": "聚焦色",
      "default": "#0f766e（环 rgba(15,118,110,0.14)）",
      "range": "任意色值",
      "effect": "聚焦描边、焦点环与标签变色。"
    }
  ],
  "pitfalls": [
    "placeholder 没留空格（写空字符串或删掉），:placeholder-shown 恒为 false，填了内容标签仍压在文本上。",
    "label 放在 input 之前，相邻选择器 + 匹配不到，浮起逻辑完全失效。",
    "忘了给 label 设 pointer-events:none，点击标签区域无法聚焦输入框。",
    "input 没预留 padding-top，标签上浮后与输入文本重叠。",
    "改用 JS 监听 focus/blur 切 class 实现浮动，浏览器自动填充时不触发事件，标签状态与内容不同步。",
    "email 等类型用 :valid 代替 :placeholder-shown 判断，空值阶段标签位置随校验状态乱跳。"
  ],
  "effectTags": [
    "浮动标签",
    "Material",
    "纯 CSS",
    "表单"
  ]
};
