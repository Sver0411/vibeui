import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "验证码输入",
    "en": "OTP Input",
    "aliases": [
      "一次性密码输入",
      "验证码格子",
      "One-Time Password Input"
    ],
    "pattern": "OTP Input · Segmented Input",
    "principle": "6 个 maxlength=1 的独立 input 组成格子：input 时只保留末位数字并自动前进焦点，Backspace 在本格为空时回退清空前格，paste 事件拦截后把数字逐格分发，全满后 500ms 定时器模拟校验。"
  },
  "prompts": {
    "short": "做一个 6 位验证码输入：输一位自动前进、退格回退、粘贴自动分发到各格、输完自动校验提交。原生 JS 实现。",
    "standard": "用原生 HTML/CSS/JavaScript 实现 OTP 输入：\n1. 6 个 input（inputmode=numeric、maxlength=1、autocomplete=one-time-code），input 事件用 replace(/\\D/g, '').slice(-1) 只保留末位数字；\n2. 有值自动 focus 下一格；Backspace 在本格为空时 focus 并清空上一格再 preventDefault；\n3. ←/→ 方向键在格子间移动焦点；\n4. paste 事件 preventDefault，取粘贴文本中的数字 slice(0,6) 逐格分发，焦点落在最后填充的格子；\n5. 全满后延时校验，状态用 role=status + aria-live=polite 播报，失败清空全部并 focus 第一格。不要引入任何库。",
    "refined": "可配置 OTP 输入：6 格、单格 46×54px、圆角 11px、校验延时 500ms、演示正确码 123456、焦点环 3px rgba(15,118,110,0.15)。验收：① 粘贴 '45 67' 等含空格内容只取数字正确分发；② 第 1 格按 Backspace 无跳格且不清空别格；③ 错误码清空全部并 focus 第 1 格；④ 连续输入不叠加校验定时器（每次 clearTimeout）。"
  },
  "knobs": [
    {
      "name": "格数",
      "default": "6",
      "range": "4 – 8",
      "effect": "验证码位数，决定格子数量与分发上限。"
    },
    {
      "name": "校验延时",
      "default": "500ms",
      "range": "300 – 1000ms",
      "effect": "全满后到出结果前的模拟请求间隔。"
    },
    {
      "name": "单格尺寸",
      "default": "46×54px",
      "range": "40 – 56px",
      "effect": "格子点击热区与整体宽度。"
    },
    {
      "name": "圆角",
      "default": "11px",
      "range": "8 – 14px",
      "effect": "格子外观圆润程度。"
    },
    {
      "name": "演示正确码",
      "default": "123456",
      "range": "任意 6 位数字",
      "effect": "demo 判定成功/失败的基准值。"
    }
  ],
  "pitfalls": [
    "没拦截 paste 事件，粘贴 6 位全塞进第一格被 maxlength 截成 1 位，后面格子全空。",
    "input 事件没做 replace(/\\D/g,'') 数字过滤，字母和符号能直接进格子。",
    "Backspace 回退没判断本格是否为空，已填格退格时焦点跳到上一格导致删错位。",
    "自动前进放在 keydown 里，中文输入法或长按不触发字符 keydown 时焦点不动；应挂在 input 事件。",
    "全满校验没先 clearTimeout，连续改动叠加多个 setTimeout 导致结果错乱。",
    "格子用 div 而非 input，无法聚焦也没有 inputmode=numeric 的数字软键盘。"
  ],
  "effectTags": [
    "验证码",
    "分格输入",
    "粘贴分发",
    "表单"
  ]
};
