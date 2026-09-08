import type { ResourceAILayer } from "@/types/resource";

/** Handwritten AI layer — split from metadata.ts, imported only by the server registry barrel. */
export const ai: ResourceAILayer = {
  "terms": {
    "zh": "发票卡",
    "en": "Invoice Card",
    "aliases": [
      "账单卡",
      "付款卡",
      "invoice item"
    ],
    "pattern": "Invoice · Billing Row",
    "principle": "上下两层：上层发票号 + 状态徽章 + 金额；下层到期日与操作按钮；状态徽章三色系（已付绿 / 待付琥珀 / 逾期红）；明细行用 grid-rows 0fr→1fr 展开，箭头旋转。"
  },
  "prompts": {
    "short": "做一组发票卡：发票号 + 已付/待付/逾期三色徽章 + 金额大字，可展开查看费用明细，操作按钮下载/重试。",
    "standard": "用原生 JS 实现发票卡列表：\n1. 结构：卡头（INV-2026-0812 号 + 日期）、状态徽章（10.5px 白字圆角：已付 #16a34a / 待付 #d97706 / 逾期 #dc2626）、金额 20px/750 右对齐；\n2. 展开：点击卡身切换明细区（grid-template-rows 0fr↔1fr 过渡），明细行 = 项目名 + 单价，底部合计行加粗；箭头 chevron rotate(180deg)；\n3. 操作：已付→下载 PDF；待付→立即支付（主色小按钮）；逾期→重试扣款 + 深红描边；\n4. 逾期徽章可加缓慢 pulse；\n5. 无障碍：徽章文字直读状态，展开按钮 aria-expanded。",
    "refined": "扩展 InvoiceList：按状态过滤 tab + 金额合计栏；逾期天数计算（date diff）；支付成功乐观更新徽章与合计；导出 CSV。验收：① 三种状态视觉一眼区分；② 展开动画无跳变；③ 金额 tabular-nums 不跳动。"
  },
  "knobs": [
    {
      "name": "徽章样式 badgeStyle",
      "default": "实底白字",
      "effect": "状态徽章配色方案。"
    },
    {
      "name": "展开时长 expandMs",
      "default": "260ms",
      "range": "180 – 400ms",
      "effect": "明细展开过渡。"
    },
    {
      "name": "金额色 amountColor",
      "default": "随状态",
      "effect": "逾期金额可染红提醒。"
    }
  ],
  "pitfalls": [
    "状态只用浅色底深色字，扫读时区分度不够——实底徽章更醒目。",
    "展开用 max-height 写死，明细行数多被裁切——0fr→1fr 免量高。",
    "金额没有右对齐与等宽数字，列表扫读困难。",
    "逾期卡没有视觉加重，和待付混在一起。",
    "发票号用变量字体导致相似字符混淆（0/O、1/l）。"
  ],
  "effectTags": [
    "发票",
    "账单",
    "状态"
  ]
};
