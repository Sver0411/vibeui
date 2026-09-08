import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "多步骤表单",
    "en": "Multi-Step Form",
    "aliases": [
      "分步表单",
      "向导表单",
      "Wizard Form"
    ],
    "pattern": "Wizard · Stepped Form",
    "principle": "每步一个 section[hidden] 切换；Continue 时只对当前步的 input/select 跑 checkValidity，错误写入 data-error-for 段落并标 aria-invalid；切换方向参数决定 slide 动画从左还是右入场，最后一步用 FormData 生成 dt/dd 回显清单。"
  },
  "prompts": {
    "short": "做一个三步注册表单：分步校验、前进/后退方向性滑动过渡、最后一步汇总确认后再提交。原生 JS 实现。",
    "standard": "用原生 HTML/CSS/JavaScript 实现多步骤表单：\n1. form 设 novalidate，每步一个 section[hidden]，进度条宽度 = step/总步数×100%；\n2. Continue 时只校验当前步的 input/select（checkValidity），错误文案写入对应 data-error-for 段落并给输入框设 aria-invalid；\n3. 切换时记录方向：前进 translateX(24px) 入场、后退 -24px，动画 0.3s cubic-bezier(0.22,1,0.36,1)；\n4. 最后一步用 FormData 生成回显清单（空值字段过滤掉），提交按钮变为提交文案并 disabled 防重复；\n5. Back 在第一步隐藏，步骤标签用 role=status 播报。不要引入任何库。",
    "refined": "可配置多步骤表单：3 步、进度条 4px 高 / 过渡 0.35s、面板滑动 24px / 0.3s、输入框高 44px、焦点环 3px rgba(15,118,110,0.13)、演示提交延时 900ms。验收：① 第 1 步留空点 Continue 不切步且错误定位到对应字段；② 后退再前进的动画方向正确；③ 回显清单与输入一致且空值字段不出现；④ 提交进行中按钮 disabled 不可连点。"
  },
  "knobs": [
    {
      "name": "步数",
      "default": "3",
      "range": "2 – 6",
      "effect": "面板数量、进度条分母与步骤标签。"
    },
    {
      "name": "进度条过渡",
      "default": "0.35s cubic-bezier(0.22, 1, 0.36, 1)",
      "range": "0.2 – 0.5s",
      "effect": "宽度增长的顺滑程度。"
    },
    {
      "name": "面板滑动距离",
      "default": "24px",
      "range": "16 – 40px",
      "effect": "切换动画的位移幅度。"
    },
    {
      "name": "输入框高度",
      "default": "44px",
      "range": "40 – 52px",
      "effect": "字段行高与整体密度。"
    },
    {
      "name": "提交延时",
      "default": "900ms",
      "range": "500 – 2000ms",
      "effect": "演示模式下模拟请求时长。"
    }
  ],
  "pitfalls": [
    "切步时不校验当前步，或直接 form.reportValidity() 把隐藏步骤的错误一起吐出来。",
    "滑动动画不分方向，后退时面板也往右滑，方向感错乱。",
    "面板切换只改 display 或只改 hidden，导致 CSS 动画与读屏可见性不一致。",
    "提交按钮没 disabled，动画或请求期间可连点造成重复提交。",
    "错误信息只写文案，没给输入框设 aria-invalid 也没关联错误段落，读屏用户不知道哪里错了。",
    "最后一步按钮文案没换成提交语义、Back 在第一步没隐藏，边界状态漏处理。"
  ],
  "effectTags": [
    "多步骤",
    "分步校验",
    "向导",
    "表单"
  ]
};
