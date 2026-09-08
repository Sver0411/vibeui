import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "联系表单区块",
    "en": "Contact Form Section",
    "aliases": [
      "联系表单",
      "留言表单",
      "咨询表单区块"
    ],
    "pattern": "Contact · Validated Form",
    "principle": "左右分栏卡片：左侧价值介绍、右侧 novalidate 表单由 RULES 映射表驱动校验（blur 失焦即查、已有错误的字段 input 时实时复检），错误通过 aria-invalid + data-err-for 关联的错误段落展示，提交失败聚焦首个出错字段，成功后 form/done 面板互换 hidden。"
  },
  "prompts": {
    "short": "做一个联系表单区块：左侧价值介绍右侧表单（称呼/邮箱/描述），失焦即校验、出错实时复检并聚焦首个错误项，成功后切换成功面板可再发一条。原生 JS。",
    "standard": "用原生 HTML/CSS/JS 实现联系表单区块：\n1. 卡片宽 min(760px, 100%)、圆角 20px，grid-template-columns: 1fr 1.25fr，左列标题 + 说明（含 mailto 链接）+ auto 底部卖点列表，右列表单；\n2. 称呼/邮箱一行两列（.ct-row），描述 textarea rows=4；每个字段配 <p class=\"ct-err\" data-err-for=\"字段id\" hidden> 错误段落；\n3. 校验用 RULES 对象映射字段 id → 校验函数（称呼非空、邮箱正则、描述至少 10 字）；blur 时校验，input 时仅当 aria-invalid=\"true\" 才复检；\n4. 错误态：input 设 aria-invalid + aria-describedby，错误段落显示；提交失败时 form.querySelector('[aria-invalid=\"true\"]').focus()；\n5. 成功后 form.hidden = true、成功面板显示（0.3s 入场动画），\"再发一条\"按钮 reset 表单、清错误态并聚焦首字段；\n6. 640px 以下改单列、字段行改一列。",
    "refined": "实现联系表单区块，暴露参数：卡片宽 min(760px, 100%) 列比 1fr/1.25fr、输入框 1.5px 描边圆角 10px、focus 光圈 rgba(13,148,136,0.12)、错误色 #dc2626、描述最少 10 字、成功面板入场 0.3s、断点 640px。验收标准：① 每条错误文案与字段一一对应（data-err-for）；② 提交失败焦点自动落到第一个错误字段；③ 出过错的字段修正后错误提示即时消失；④ \"再发一条\"后表单干净且焦点在称呼框；⑤ 错误段落用 hidden 切换而非删除，屏幕阅读器可感知。"
  },
  "knobs": [
    {
      "name": "分栏列比",
      "default": "grid-template-columns: 1fr 1.25fr",
      "range": "1fr/1fr – 1fr/2fr",
      "effect": "介绍区与表单区的宽度分配。"
    },
    {
      "name": "校验规则 RULES",
      "default": "称呼非空 / 邮箱正则 /^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/ / 描述 ≥ 10 字",
      "range": "按业务增删",
      "effect": "每个字段的校验逻辑与错误文案，以字段 id 为键的映射表。"
    },
    {
      "name": "错误色 --ct-danger",
      "default": "#dc2626，描边 1.5px",
      "range": "语义红系",
      "effect": "校验失败时输入框描边与错误文字颜色。"
    },
    {
      "name": "focus 光圈",
      "default": "0 0 0 3px rgba(13,148,136,0.12)",
      "range": "透明度 0.08 – 0.2",
      "effect": "聚焦字段的品牌色光晕。"
    },
    {
      "name": "单列断点",
      "default": "max-width: 640px（卡片与字段行同时改单列）",
      "range": "560 – 720px",
      "effect": "左右分栏改上下堆叠的阈值。"
    }
  ],
  "pitfalls": [
    "只做提交时校验，用户填完三个字段才知道哪错；应 blur 即校验、出错字段 input 时实时复检。",
    "错误提示没和输入框建立 aria-describedby / aria-invalid 关联，屏幕阅读器读不到错误内容。",
    "提交失败不聚焦首个错误字段，键盘用户要自己 Tab 找错。",
    "错误段落直接 innerHTML 清空或删除，无法用 hidden 切换保持占位；切换时布局跳动。",
    "再次填写时不复检已出错字段，错误提示残留到合法输入上；需在 input 事件里按 aria-invalid 状态复检。",
    "成功面板只是把表单 display:none，没有入场动画或焦点管理；应切换 hidden 并考虑把焦点移入成功面板。",
    "640px 断点只改了卡片没改 .ct-row，两列字段行在窄屏挤爆。"
  ],
  "effectTags": [
    "联系表单",
    "表单校验",
    "无障碍",
    "成功态",
    "转化"
  ]
};
