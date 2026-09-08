import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "结算页",
    "en": "Checkout Page",
    "aliases": [
      "收银台",
      "下单页",
      "结账页"
    ],
    "pattern": "Commerce · 表单 + 订单摘要双栏",
    "principle": "左 1.4fr 收货与支付表单、右 1fr 订单摘要；支付方式用隐藏 radio + :checked + 相邻选择器实现卡片高亮（零 JS 状态）；运费按满 ¥1000 免邮规则在 JS 里计算；提交时校验必填并聚焦第一个缺失项。"
  },
  "prompts": {
    "short": "做一个电商结算页：左侧收货地址+支付方式卡片单选、右侧订单摘要（小计/运费/合计、满额免邮），必填缺失自动聚焦。原生 HTML/CSS/JS 单文件。",
    "standard": "用原生 HTML/CSS/JavaScript 实现单文件结算页：\n1. 双栏 min(760px, 100%) 内 1.4fr/1fr，640px 以下折单列；\n2. 支付方式用 label 包裹隐藏 radio，选中态靠 input:checked + .pay-box 相邻选择器描边+内阴影，focus-visible 有 outline；\n3. 摘要由 JS 从商品数组渲染：缩略图用纯渐变色块、小计、运费（满 ¥1000 免邮否则 ¥12）、合计；\n4. 提交校验姓名/手机/地址三个必填，缺失时聚焦第一个空项，全部通过显示成功反馈。",
    "refined": "实现结算页：输入框高 40px、边框 1.5px 圆角 10px；提交按钮高 44px 深色 #0f172a；免邮门槛 SHIPPING_FREE_FROM=1000、运费 12；商品示例机械键盘 ¥399 / 降噪耳机 ¥1299 / 台灯 ¥168。验收标准：① 单选卡片支持键盘方向键切换且有 focus-visible 样式；② 缺失必填时焦点落在第一个空字段；③ 合计 = 小计 + 运费，免邮时显示「免运费」。"
  },
  "knobs": [
    {
      "name": "双栏比例",
      "default": "1.4fr / 1fr，容器 min(760px, 100%)",
      "range": "1fr–2fr，宽 640 – 900px",
      "effect": "表单与摘要的宽度分配，640px 以下折单列。"
    },
    {
      "name": "免邮门槛与运费",
      "default": "满 ¥1000 免邮，否则 ¥12",
      "range": "门槛 0 – 2000，运费 0 – 30",
      "effect": "摘要中的运费行与合计金额。"
    },
    {
      "name": "必填校验字段",
      "default": "姓名 / 手机 / 地址（ck-name, ck-phone, ck-addr）",
      "range": "按业务增减",
      "effect": "提交前聚焦校验的目标集合。"
    },
    {
      "name": "选中卡片高亮",
      "default": "描边 + inset 0 0 0 1px + 底色 #f8fafc",
      "range": "描边 1 – 2px",
      "effect": "支付方式被选中时的可见反馈强度。"
    },
    {
      "name": "主题色",
      "default": "#0f172a（accent）/ #16a34a（成功）",
      "range": "任意色对",
      "effect": "提交按钮、聚焦边框与成功提示的颜色。"
    }
  ],
  "pitfalls": [
    "必填校验只 focus 不给任何错误提示文案，用户不知道为什么提交没反应。",
    "支付方式 radio 设 opacity:0 隐藏后不写 :focus-visible 样式，键盘用户完全失去焦点指示。",
    "运费规则写死在 CSS 或文案里，摘要合计没有真正按门槛重算，展示与逻辑不符。",
    "手机号只校验非空不校验格式，收货信息区域形同虚设。",
    "640px 折单列时只改了外层双栏，漏改表单内部 1fr 1fr 的姓名/手机行，输入框被压成两半。"
  ],
  "effectTags": [
    "结算",
    "表单校验",
    "订单摘要",
    "卡片单选",
    "满额免邮"
  ]
};
