import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "自适应文本域",
    "en": "Auto-Growing Textarea",
    "aliases": [
      "自动增高文本域",
      "自增高 textarea",
      "Autosize Textarea"
    ],
    "pattern": "Textarea · Autosize",
    "principle": "input 时先把 height 置回 auto 让内容自然收缩，再读 scrollHeight 取 min(scrollHeight, maxHeight) 赋回，高度因此可增可减；超过 maxHeight 后加 is-overflow 切换内部滚动。"
  },
  "prompts": {
    "short": "做一个随内容自动增高的 textarea：先收缩再测量保证高度可增可减，超过上限后转内部滚动，右下角实时字数计数。原生 JS 实现。",
    "standard": "用原生 HTML/CSS/JavaScript 实现自适应文本域：\n1. textarea 设 resize:none、overflow:hidden，input 事件里先 style.height='auto' 再读 scrollHeight，取 min(scrollHeight, maxHeight) 赋回高度；\n2. scrollHeight 超过 maxHeight 时切 overflow-y:auto 转内部滚动；\n3. 右下角绝对定位计数角标实时更新；带 maxlength 的变体达上限时外框变红并用 role=status 提示；\n4. 高度与计数都挂在 input 事件上（粘贴也生效）。不要引入任何库。",
    "refined": "可配置自适应文本域：maxHeight 220px（带错误反馈的变体 160px）、计数上限 200 / 30、初始 rows 3 / 2、行高 1.6、底部 padding-bottom 28px 给计数角标留位。验收：① 删行后高度同步收缩（不只增不减）；② 达 maxHeight 后内部滚动且外框高度不再变化；③ 达 30 字上限时外框与计数变红并出现提示；④ 粘贴大段文本高度一步到位。"
  },
  "knobs": [
    {
      "name": "高度上限 maxHeight",
      "default": "220px（错误示例 160px）",
      "range": "120 – 400px",
      "effect": "超过后转内部滚动的临界高度。"
    },
    {
      "name": "计数上限",
      "default": "200 / 30",
      "range": "任意正整数",
      "effect": "计数分母与变红阈值。"
    },
    {
      "name": "初始行数 rows",
      "default": "3 / 2",
      "range": "1 – 6",
      "effect": "空态时的初始高度。"
    },
    {
      "name": "行高 line-height",
      "default": "1.6",
      "range": "1.4 – 2",
      "effect": "每增一行的高度增量。"
    },
    {
      "name": "角标预留",
      "default": "padding-bottom: 28px",
      "range": "20 – 36px",
      "effect": "计数角标不被内容遮挡的留白。"
    }
  ],
  "pitfalls": [
    "只把 scrollHeight 赋回高度而不先收缩到 auto，高度只增不减，删掉内容也不回缩。",
    "监听 keyup 而不是 input 事件，粘贴、剪切、输入法上屏都不触发高度更新。",
    "忘了 box-sizing:border-box，padding 参与高度计算导致 scrollHeight 测量偏大、越量越高。",
    "达到上限后没把 overflow 从 hidden 换成 auto，超出内容直接被裁掉不可见。",
    "计数角标绝对定位在右下但 textarea 没留 padding-bottom，长文本滚到最后一行时压住计数。",
    "误以为 rows 属性能限高——rows 只决定初始高度，上限必须由脚本 maxHeight 控制。"
  ],
  "effectTags": [
    "自动增高",
    "文本域",
    "字数统计",
    "表单"
  ]
};
