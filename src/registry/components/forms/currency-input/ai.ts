import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "金额输入框",
    "en": "Currency Input",
    "aliases": [
      "千分位输入",
      "金额格式化",
      "money input"
    ],
    "pattern": "Currency · Formatted Numeric Input",
    "principle": "input 监听里剥离非数字字符、限制一位小数点与两位小数，再把整数部分按千分位重插逗号；真正的数值存 data-value，显示与存储分离避免格式化干扰光标。"
  },
  "prompts": {
    "short": "做一个金额输入框：实时千分位格式化、¥ 前缀、最多两位小数、非法字符直接拦截、失焦显示大写金额。",
    "standard": "用原生 JS 实现金额输入框：\n1. 结构：input 外包容器，¥ 符号 absolute 左置，input padding-left 避让，type=text + inputmode=decimal；\n2. 输入处理：value.replace(/[^d.]/g,'') 清洗 → 去多余小数点 → 小数截断 2 位 → 整数部分 toLocaleString 加千分位；\n3. 光标：格式化后光标会跳到末尾——记录格式化前光标左侧的字符数（忽略逗号），格式化后按净字符数恢复位置；\n4. 约束：maxlength 不适用（含逗号），最大 999,999,999.99 超出截断；失焦时空值或 '.' 归零显示占位；\n5. 失焦附加：下方显示「壹拾贰万…」人民币大写（0-9 与单位的映射表）。",
    "refined": "实现 CurrencyInput 类：支持币种切换（¥/$/€，符号宽度自适应）、负数（预算场景）、粘贴清洗（多段数字智能拼接）、受控 getValue() 返回 Number；空值、0、纯小数点三种边界都要稳。验收：① 中文输入法下无法输入非法字符；② 光标在中间编辑时不错位；③ 大写金额与数字完全一致。"
  },
  "knobs": [
    {
      "name": "小数位 decimals",
      "default": "2",
      "range": "0 – 4",
      "effect": "锁定的小数位数。"
    },
    {
      "name": "最大值 maxValue",
      "default": "999999999.99",
      "effect": "超出即截断，防溢出。"
    },
    {
      "name": "大写提示 showCnUppercase",
      "default": "开启",
      "effect": "失焦后显示人民币大写。"
    }
  ],
  "pitfalls": [
    "每次 input 都重设 value 导致光标跳到末尾——必须做光标位置补偿。",
    "用 type=number，浏览器本地化格式与千分位冲突。",
    "粘贴 '1,234.5.6' 之类脏数据没清洗，出现两个小数点。",
    "千分位逗号被算进数值转 Number 时报错——存储值要单独维护。",
    "中文输入法 composition 期间格式化打断候选词。"
  ],
  "effectTags": [
    "金额",
    "格式化",
    "表单"
  ]
};
