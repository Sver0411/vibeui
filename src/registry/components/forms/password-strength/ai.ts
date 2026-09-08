import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "密码强度输入",
    "en": "Password Strength Input",
    "aliases": [
      "密码强度计",
      "密码校验表单",
      "Password Meter"
    ],
    "pattern": "Form Validation · Strength Meter",
    "principle": "input 事件里跑 4 条规则（长度≥12、同时含大小写、含数字、含符号），通过数 n 映射为强度条宽度 n/4×100% 与 4 级颜色文案，规则清单逐项用 data-met 驱动打勾。"
  },
  "prompts": {
    "short": "做一个密码输入框：带显示/隐藏切换、实时强度条和逐项打勾的密码要求清单。原生 JS 实现。",
    "standard": "用原生 HTML/CSS/JavaScript 实现密码强度输入：\n1. type=password 输入框右侧放 Show/Hide 按钮，切换 input.type 并同步 aria-pressed 与 aria-label；\n2. input 事件检查 4 条规则：长度 ≥12、同时含大小写、含数字、含符号；\n3. 通过数 n 映射强度条：width = n/4×100%，颜色按 1→#b3261e、2→#b45309、3→#0f766e、4→#15803d，空值归 0；\n4. 规则清单 li 用 data-met='true' 驱动打勾样式，强度容器加 role=status。不要引入任何库。",
    "refined": "可配置密码强度输入：长度阈值 12、4 条规则、强度条高 4px / 过渡 0.25s ease、输入框高 46px。验收：① 空值时强度条归 0 且显示占位文案；② 3 条通过时宽 75% 青色；③ 清空后规则勾全部退回、颜色恢复灰色；④ Show 切换焦点不丢且 aria-pressed 正确。"
  },
  "knobs": [
    {
      "name": "长度阈值",
      "default": "12",
      "range": "6 – 20",
      "effect": "第一条规则的通过门槛。"
    },
    {
      "name": "强度级数",
      "default": "4",
      "range": "3 – 5",
      "effect": "强度条档位与颜色分级数量。"
    },
    {
      "name": "强度条过渡",
      "default": "0.25s ease",
      "range": "0.15 – 0.4s",
      "effect": "宽度与颜色变化的顺滑程度。"
    },
    {
      "name": "规则集",
      "default": "长度/大小写/数字/符号",
      "range": "可增删规则",
      "effect": "通过数计算与清单条目。"
    },
    {
      "name": "通过色映射",
      "default": "#b3261e / #b45309 / #0f766e / #15803d",
      "range": "任意色值",
      "effect": "各级强度的语义色。"
    }
  ],
  "pitfalls": [
    "只按长度算强度、没有字符种类规则，'aaaaaaaaaaaa' 也被判为强密码。",
    "Show/Hide 只换按钮文字，不同步 aria-pressed 与 aria-label，读屏用户不知道密码当前是否可见。",
    "清空输入时没把强度条归零、规则勾退回，残留上一次的状态。",
    "强度条宽度写死档位而不是 passed/规则数×100%，改规则数量后 100% 不再对应全部通过。",
    "用 keyup 而非 input 事件监听，粘贴或剪切清空不触发，强度不更新。",
    "规则打勾只改 class 不用 data-met 之类的状态属性，样式钩子与自动化测试都难以命中。"
  ],
  "effectTags": [
    "密码",
    "强度条",
    "实时校验",
    "表单"
  ]
};
